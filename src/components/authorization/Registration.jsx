import React, {
    useEffect,
    useState,
} from 'react';

import './style.css';
import {
    useSelector,
    useDispatch,
} from 'react-redux';

import { actionUserAuth } from '../../redux/actions/actionsAuth';

import spinner from '../../source/spinners/Iphone-spinner-2.gif';
import { useNavigate } from 'react-router-dom';

const Authorization = () => {

    const dispatchUser = useDispatch();

    const navigate = useNavigate();

    const url = 'http://localhost:3000/';

    const [registration, setRegistration] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        auth: false,
    });
    const [isLoad, setLoad] = useState(false);

    useEffect(() => {
        let authUser = JSON.parse(localStorage.getItem('authUser'));
        if (authUser) {
            navigate('/study');
        }
    }, [JSON.parse(localStorage.getItem('authUser'))]);

    const validateEmail = (email) => {
        const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(email);
    };

    const regDateUser = (e, value) => {
        setRegistration({
            ...registration,
            [value]: e.target.value,
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
                        await setRegistration({
                            ...registration,
                            auth: true,
                        });

                        let postData = await fetch(url + 'accounts', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json;charset=utf-8',
                            },
                            body: JSON.stringify({
                                ...registration,
                                auth: true,
                            }),
                        });

                        let dataRes = await postData.json();

                        await localStorage.setItem('authUser', true);

                        setLoad(false);

                        alert(`Пользователь с именем ${dataRes.name} успешно зарегистрирован`);

                        dispatchUser(actionUserAuth({
                            name: dataRes.name,
                            email: dataRes.email,
                        }));

                        navigate('/study');
                    } else {
                        alert(`Данный email уже заргестрирован, попробуйде другой`);
                        setLoad(false);
                    }
                } catch (err) {
                    alert(err);
                }
            })();
        }

    };

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
                    action='online_store/src/components/authorization/Registration'
                    className='form__authorization'
                >
                    <input
                        type='text'
                        required
                        value={registration.name}
                        placeholder='name'
                        onChange={(e) => regDateUser(e, 'name')}
                    />
                    <input
                        type='text'
                        placeholder='last_name'
                        value={registration.lastName}
                        onChange={(e) => regDateUser(e, 'lastName')}
                    />
                    <input
                        type='text'
                        required
                        placeholder='email'
                        value={registration.email}
                        onChange={(e) => regDateUser(e, 'email')}
                    />
                    <input
                        type='password'
                        required
                        placeholder='password'
                        value={registration.password}
                        onChange={(e) => regDateUser(e, 'password')}
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