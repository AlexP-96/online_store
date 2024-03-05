require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
// const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { decode } = require('jsonwebtoken');

const PORT = process.env.PORT || process.env.PORT_REZERVER;

const app = express();
app.use(cors());

// const DATA_FILE = './data_base/posts.json';
const USERS_FILE = './users/users.json';

const SECRET_KEY = process.env.SECRET_KEY;

app.use(express.json());

app.post('/api/create-user', async (req, res) => {

    const data = req.body;

    const regexEmail = await /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const regexPass = await /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

    if (!regexEmail.test(data.email)) {
        console.log('Не удалось зарегистрировать нового пользователя');
        return res.status(403).send('Данные email адрес недопустим, попробуйте еще раз');
    }

    if (!regexPass.test(data.password)) {
        console.log(`Пользователь ${data.username} ввел не корректный пароль`);
        return res.status(403)
            .send(
                'Пароль не соответствует требованиям безопасности, пароль должен содержать: не менее 8-ми символов, должен содеражть цифры, строчные и заглавные буквы, а также хотя бы один спецсимвол');
    }

    const hashedPass = await bcrypt.hash(data.password, 10);

    const token = jwt.sign({ email: data.email }, SECRET_KEY, { expiresIn: '24h' });

    const userWithHashedPass = {
        ...data,
        password: hashedPass,
        id: uuidv4(),
    };

    // Чтение и обновление файла
    try {
        await fs.readFile(USERS_FILE, (err, fileData) => {

            if (err && err.code === 'ENOENT' || fileData.length === 0) {
                // Если файла нет, создаем новый с массивом
                fs.writeFile(USERS_FILE, JSON.stringify([userWithHashedPass]), (err) => {
                    if (err) throw err;
                    console.log('Регистрационные данные о новом пользователе сохранены.');
                });
            } else if (err) {
                console.error('Ошибка при чтении файла:', err);
                res.status(500).send('Ошибка сервера');
                return;
            } else if (JSON.parse(fileData).find(u => u.email === data.email)) {
                console.log('Данный пользователь уже зарегистрирован');
                res.status(403).send('Данный email уже зарегистрирован, введите другой');
                return;
            } else {
                // Если файл есть, дописываем данные в массив
                const existingData = JSON.parse(fileData);
                existingData.push(userWithHashedPass);
                fs.writeFile(USERS_FILE, JSON.stringify(existingData), (err) => {
                    if (err) throw err;
                    console.log('Данные добавлены.');
                });
            }

            res.status(200)
                .send({
                    token,
                    email: data.email,
                });
        });
    } catch (err) {
        console.log('Не удалось добавить пользователя, ошибка сервера');
        res.status(500).send('Не удалось добавить пользователя, ошибка сервера');
    }

});

app.post('/api/is-token', async (req, res) => {

    try {
        const {
            token,
        } = req.body;
        try {
            const decodeToken = await jwt.verify(token, SECRET_KEY);
            console.log('Токен действителен. Декодированная информация:', decodeToken);
            await fs.readFile(USERS_FILE, async (err, data) => {
                if (err) return res.status(400).send('Ошибка при чтении файла');

                const users = JSON.parse(data);
                const user = users.find(u => u.email === decodeToken.email);

                if (!user) {
                    console.log(`Пользователь ${user} не найден.`);
                    return res.status(400).send('Пользователь не найден.');
                } else {
                    return user.email === decodeToken.email
                        ? res.status(200).send('Токены совпадают')
                        : res.status(400).send('Токены не совпадают');
                }

            });

        } catch (err) {
            console.error('Токен недействителен или произошла другая ошибка:', err.message);
        }

    } catch (err) {
        console.log('Ошибка проверки токена');
        res.status(500).send('Ошибка сервера при проверке токена');
    }
});

app.post('/api/login-user', async (req, res) => {
    const {
        email,
        password,
    } = req.body;

    await fs.readFile(USERS_FILE, async (err, data) => {
        if (err) return res.status(500).send('Ошибка при чтении файла пользователей.');

        const users = JSON.parse(data);
        const user = users.find(u => u.email === email);

        if (!user) {
            console.log(`Пользователь ${user} не найден.`);
            return res.status(400).send('Пользователь не найден.');
        }

        // Сравниваем предоставленный пароль с хешем
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            // Генерация токена при успешной авторизации
            const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '24h' });
            console.log(`Токен пользователю ${user} присвоен`);
            res.status(200).send({ token });
        } else {
            res.status(400).send('Неверный пароль.');

        }

    });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
