import React, {
    ChangeEvent,
    FormEventHandler,
    useState,
} from 'react';

import './style.css';
import {
    useDispatch,
} from 'react-redux';

import axios from 'axios';

import { actionUserAuth } from '../../redux/actions/actionsAuth';

import spinner from '../../source/spinners/Iphone-spinner-2.gif';
import { useNavigate } from 'react-router-dom';

import { IRegistrationForm } from './types';

const Registration = () => {

    const dispatchUser = useDispatch();

    const navigate = useNavigate();

    const [resError, setResError] = useState('');
    const [dataUser, setDataUser] = useState<IRegistrationForm>({
        username: '',
        lastUserName: '',
        email: '',
        password: '',
    });
    const [isLoad, setLoad] = useState(false);

    const regDataUser = (e: ChangeEvent<HTMLInputElement> , value: keyof IRegistrationForm) => {
        setDataUser({
            ...dataUser,
            [value]: e.target.value,
        });
    };

    const registrationUser: FormEventHandler = async (e) => {
        e.preventDefault();
        setLoad(true);
        setResError('');

        const url = 'http://localhost:3000/api/create-user';

        const postData = {
            username: dataUser.username,
            lastUserName: dataUser.lastUserName,
            email: dataUser.email,
            password: dataUser.password,
        };

        const configData = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        await axios.post(url, postData, configData).then(res => {
            dispatchUser(actionUserAuth({
                token: res.data.token,
            }));

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('emailUser', res.data.email);

            setLoad(false);
            setResError('');
            navigate('/study');
        }).catch(err => {
            setLoad(false);
            setResError(err.response.data);
        });

    };

    return (
        <div className='c__authorization'>
            <h3>Регистрация</h3>
            <div>{resError}</div>
            {isLoad && <img
                src={spinner}
                alt='spinner'
            />}
            {!isLoad &&
                <form
                    onSubmit={registrationUser}
                    action='online_store/src/components/authorization/Registration.tsx'
                    className='form__authorization'
                >
                    <input
                        type='text'
                        required
                        value={dataUser.username}
                        placeholder='name'
                        onChange={(e) => regDataUser(e, 'username')}
                    />
                    <input
                        type='text'
                        placeholder='last_name'
                        value={dataUser.lastUserName}
                        onChange={(e) => regDataUser(e, 'lastUserName')}
                    />
                    <input
                        type='text'
                        required
                        placeholder='email'
                        value={dataUser.email}
                        onChange={(e) => regDataUser(e, 'email')}
                    />
                    <input
                        type='password'
                        required
                        placeholder='password'
                        value={dataUser.password}
                        onChange={(e) => regDataUser(e, 'password')}
                    />
                    <input
                        type='hidden'
                        value={'hidden'}
                    />
                    <input
                        type='submit'
                        value={'Регистрация'}
                    />
                </form>}
        </div>
    );
};

export default Registration;