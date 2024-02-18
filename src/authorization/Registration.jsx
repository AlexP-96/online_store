import React, { useState } from 'react';

import './style.css';
import { useSelector, useDispatch } from 'react-redux';
import rootingReducer from '../reducers/authReduser';

const Authorization = () => {

    const url = 'http://localhost:3000/';

    const [registration, setRegistration] = useState({ name: '', lastName: '', email: '', password: '', secret: '' });
    const [isValid, setIsValid] = useState(true);

    const validateEmail = (email) => {
        const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(email);
    };


    const regName = (e) => {
        setRegistration({
            ...registration,
            name: e.target.value
        })
    }
    const regLastName = (e) => {
        setRegistration({
            ...registration,
            lastName: e.target.value
        })
    }
    const regEmail = (e) => {
        setRegistration({
            ...registration,
            email: e.target.value
        })
    }
    const setPassword = (e) => {
        setRegistration({
            ...registration,
            password: e.target.value
        })
    }

    const submitData = (e) => {

        e.preventDefault();

        if (validateEmail(registration.email)) {
            setIsValid(true);
            // Код для отправки данных на сервер
            const response = fetch(url + 'accounts/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(registration)
            }).then(res => console.log(res))
            setRegistration({
                name: '',
                lastName: '',
                email: '',
                password: ''
            })

        } else {
            setIsValid(false);
            alert('email введен неккорктно')
        }


        
    }


    const selectorName = useSelector(state => state.auth.name);

    const dispatch = useDispatch();

    return (
        <div className='c__authorization'>
            <h3>Регистрация</h3>
            <form action="" className='form__authorization'>
                <input type="text"
                    required
                    value={registration.name}
                    placeholder='name'
                    onChange={regName}
                />
                <input type="text"
                    placeholder='last_name'
                    value={registration.lastName}
                    onChange={regLastName} />
                <input type="text"
                    required
                    placeholder='email'
                    value={registration.email}
                    onChange={regEmail}
                />
                <input type="password"
                    required
                    placeholder='password'
                    value={registration.password}
                    onChange={setPassword}
                />
                <input type="hidden" value={'hidden'} />
                <input type='submit'
                    value={'Регистрация'}
                    onClick={(e) => submitData(e)} />
            </form>
        </div>
    );
};

export default Authorization;