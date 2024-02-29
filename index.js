require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const bcrypt = require('bcrypt');

const PORT = process.env.PORT || process.env.PORT_REZERVER;

const app = express();

const DATA_FILE = './data_base/posts.json';
const USERS_FILE = './users/users.json';

const SECRET_KEY = process.env.SECRET_KEY;

app.use(express.json());

app.post('/api/create-user', async (req, res) => {
    try {

        const newUser = req.body;
        const hashedPass = await bcrypt.hash(newUser.password, 10);

        const userWithHasedPass = {
            ...newUser,
            password: hashedPass,
        };

        fs.readFile(USERS_FILE, (err, fileDate) => {
            if (err && err.code === 'ENOENT') {
                fs.writeFile(USERS_FILE, JSON.stringify([userWithHasedPass]), (err) => {
                    if (err) throw err;
                    console.log('Создан первый пользователь');
                });
            } else if (err) {
                console.error('Ошибка чтения файла:', err);
                res.status(500).send('Ошибка сервера');
                return;
            } else {
                console.log(fileDate);
                const users = JSON.parse(fileDate);
                users.push(userWithHasedPass);
                fs.writeFile(USERS_FILE, JSON.stringify(users), (err) => {
                    if (err) throw err;
                    console.log('Добавлен новый пользователь.');
                });
            }

            const token = jwt.sign({ username: newUser.username }, SECRET_KEY, { expiresIn: '24h' });
            res.status(200).send({ token });
        });
    } catch (err) {
        res.status(500).send('Ошибка при создании пользователя');
    }
});

app.post('/api/get-users', (req, res) => {

    const token = req.headers.authorization;
    if (!token) {
        return res.status(400).send('Токен не предоставлен');
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log('Декодирование данных токена: ', decoded);
    } catch (err) {
        return res.status(401).send('Неверный токен');
    }

    const data = req.body;

    // Чтение и обновление файла
    fs.readFile(USERS_FILE, (err, fileData) => {
        if (err && err.code === 'ENOENT') {
            // Если файла нет, создаем новый с массивом
            fs.writeFile(USERS_FILE, JSON.stringify([data]), (err) => {
                if (err) throw err;
                console.log('Данные сохранены.');
            });
        } else if (err) {
            // Если произошла другая ошибка
            console.error('Ошибка при чтении файла:', err);
            res.status(500).send('Ошибка сервера');
            return;
        } else {
            // Если файл есть, дописываем данные в массив
            const existingData = JSON.parse(fileData);
            existingData.push(data);
            fs.writeFile(USERS_FILE, JSON.stringify(existingData), (err) => {
                if (err) throw err;
                console.log('Данные добавлены.');
            });
        }

        // Отправка ответа клиенту
        res.status(200).send('Данные успешно сохранены');
    });
});

app.post('api/login-user', (req, res) => {
    const {
        username,
        password,
    } = req.body;

    fs.readFile(USERS_FILE, async (err, data) => {
        if (err) return res.status(500).send('Ошибка при чтении файла пользователей.');

        const users = JSON.parse(data);
        const user = users.find(u => u.username === username);

        if (!user) {
            return res.status(400).send('Пользователь не найден.');
        }

        // Сравниваем предоставленный пароль с хешем
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            // Генерация токена при успешной авторизации
            const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY, { expiresIn: '24h' });
            res.status(200).send({ token });
        } else {
            res.status(400).send('Неверный пароль.');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Сервер запушен на порту ${PORT}`);
});
