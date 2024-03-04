import React, {
    ChangeEvent,
    useState,
} from 'react';
import {
    useDispatch,
} from 'react-redux';

import { actionUserAuth } from '../../redux/actions/actionsAuth';
import spinner from '../../source/spinners/Iphone-spinner-2.gif';
import { ISignUpUser } from './types';

const SignUp = () => {

    const dispatch = useDispatch();

    const [reg, setReg] = useState<ISignUpUser>({
        email: '',
        password: '',
    });

    const getLogin = (e: ChangeEvent<HTMLInputElement>, name: keyof ISignUpUser) => {
        setReg({
            ...reg,
            [name]: e.target.value,
        });
    };


    return (
        <div>
            <form

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
                    onChange={(e) => getLogin(e, 'email')}
                    placeholder='Почта'
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
            </form>

        </div>
    );
};

export default SignUp;