import React, { useState } from 'react';

import './style.css';
import {
    useSelector,
    useDispatch,
} from 'react-redux';
import spinner from '../source/spinners/Iphone-spinner-2.gif'
import rootingReducer from '../reducers/authReduser';

const Authorization = () => {

    const url = 'http://localhost:3000/';

    const [registration, setRegistration] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        secret: '',
    });
    const [isLoad, setLoad] = useState(false);

    const validateEmail = (email) => {
        const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(email);
    };

    const regName = (e) => {
        setRegistration({
            ...registration,
            name: e.target.value,
        });
    };
    const regLastName = (e) => {
        setRegistration({
            ...registration,
            lastName: e.target.value,
        });
    };
    const regEmail = (e) => {
        setRegistration({
            ...registration,
            email: e.target.value,
        });
    };
    const setPassword = (e) => {
        setRegistration({
            ...registration,
            password: e.target.value,
        });
    };

    const submitData = (e) => {
        setLoad(true);
        e.preventDefault();

        if (validateEmail(registration.email)) {

            (async function () {
                try {

                    let response = await fetch(url + 'accounts');

                    let fetchUsers = await response.json();

                    let dataCurrent = fetchUsers.find(empty => (registration.email === empty.email));

                    if (dataCurrent === undefined) {
                        let postData = await fetch(url + 'accounts', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json;charset=utf-8',
                            },
                            body: JSON.stringify(registration),
                        });

                        let dataRes = await postData.json();
                        await setRegistration({
                            name: '',
                            lastName: '',
                            email: '',
                            password: '',
                            secret: '',
                        });
                        setLoad(false);
                        alert(`Пользователь с именем ${dataRes.name} изпешно зарегистрирован`)
                    } else {
                        alert('Данный email уже заргестрирован, попробуйде другой');
                        setLoad(false);
                    }
                } catch (err) {
                    alert(err);
                }
            })();

        }
    };

    const selectorName = useSelector(state => state.auth.name);

    const dispatch = useDispatch();

    return (
        <div className='c__authorization'>
            <h3>Регистрация</h3>
            {isLoad && <img
                src={spinner}
                alt='spinner'
            />}
            {!isLoad &&
                <form
                    onSubmit={submitData}
                    action=''
                    className='form__authorization'
                >
                    <input
                        type='text'
                        required
                        value={registration.name}
                        placeholder='name'
                        onChange={regName}
                    />
                    <input
                        type='text'
                        placeholder='last_name'
                        value={registration.lastName}
                        onChange={regLastName}
                    />
                    <input
                        type='text'
                        required
                        placeholder='email'
                        value={registration.email}
                        onChange={regEmail}
                    />
                    <input
                        type='password'
                        required
                        placeholder='password'
                        value={registration.password}
                        onChange={setPassword}
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

export default Authorization;