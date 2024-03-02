import React, { useState } from 'react';
import {
    useDispatch,
    useSelector,
} from 'react-redux';

import { actionUserAuth } from '../../../redux/actions/actionsAuth';
import spinner from '../../../source/spinners/Iphone-spinner-2.gif';

const SignUp = () => {
    const url = 'http://localhost:3000/';

    const selector = useSelector(state => state.userAuth);
    const dispatch = useDispatch();

    const [reg, setReg] = useState({
        id: '',
        login: '',
        password: '',
    });

    const getLogin = (e, name) => {
        setReg({
            ...reg,
            [name]: e.target.value,
        });
    };

    const submitDataReg = (e) => {
        e.preventDefault();

        const response = fetch(url + 'accounts')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Отклик сети был не в порядке');
                }
                return response.json();
            })
            .then(data => {

                let validEmail = data.find(user => user.email === reg.login);

                if (validEmail.password === reg.password) {
                    dispatch(actionUserAuth({
                        name: validEmail.name,
                        email: validEmail.email,
                    }));
                } else {
                    alert('Данный пользователь не зарегистрирован.');
                }
                return data;
            })
            .catch(err => alert(err));

    };

    return (
        <div>
            {selector.auth && `Вы авторизованы как ${selector.name}, ваша почта ${selector.email}`}
            {!selector.auth && <form
                onSubmit={submitDataReg}
                style={{
                    maxWidth: '400px',
                    width: '100%',
                    margin: 'auto',
                }}
            >
                <h1>Введите логин и пароль:</h1>
                <input
                    className='form-control m-w200px'
                    type='text'
                    onChange={(e) => getLogin(e, 'login')}
                    placeholder='логин'
                    required
                />
                <input
                    className='form-control pb-20'
                    onChange={(e) => getLogin(e, 'password')}
                    type='password'
                    placeholder='пароль'
                    required
                />
                <button
                    className='btn btn-primary'
                >Войти
                </button>
            </form>}

        </div>
    );
};

export default SignUp;