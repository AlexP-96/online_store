import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import uniqid from 'uniqid';

const SignUp = () => {
    const url = 'http://localhost:3000/';

    const dispatch = useDispatch();

    const [reg, setReg] = useState({ id: '', login: '', password: '' });

    const getLogin = (e) => {
        setReg({
            ...reg,
            login: e.target.value
        })
    }
    const getPassword = (e) => {
        setReg({
            ...reg,
            password: e.target.value
        })
    }

    const submitDataReg = (e) => {
        e.preventDefault();

        const response = fetch(url + 'test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(reg)
        })
        setReg.login = '';
        setReg.password = '';
    }

    return (
        <div>
            <form action="" style={{ maxWidth: '400px', margin: 'auto' }}>
                <h1>Введите логин и пароль:</h1>
                <input
                    className='form-control m-w200px'
                    type="text"
                    onChange={getLogin}
                    placeholder='логин' />
                <input
                    className='form-control pb-20'
                    onChange={getPassword}
                    type="password" placeholder='пароль' />
                <button
                    onClick={(e) => submitDataReg(e)}
                    className='btn btn-primary'>Войти</button>
            </form>
            <div>all {submitDataReg}</div>
            
        </div>
    );
};

export default SignUp;