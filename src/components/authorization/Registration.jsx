import React, {
    useEffect,
    useState,
} from 'react';

import './style.css';
import {
    useSelector,
    useDispatch,
} from 'react-redux';

import axios from 'axios';

import { actionUserAuth } from '../../redux/actions/actionsAuth';

import spinner from '../../source/spinners/Iphone-spinner-2.gif';
import { useNavigate } from 'react-router-dom';

const Registration = () => {

    const dispatchUser = useDispatch();
    const selector = useSelector(state => state.userAuth);

    const navigate = useNavigate();

    const [resError, setResError] = useState('');
    const [dataUser, setDataUser] = useState({
        username: '',
        lastUserName: '',
        email: '',
        password: '',
    });
    const [isLoad, setLoad] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            dispatchUser(actionUserAuth({ token: localStorage.getItem('token') }));
        }

    }, [localStorage.getItem('token')]);

    const regDateUser = (e, value) => {
        setDataUser({
            ...dataUser,
            [value]: e.target.value,
        });
    };

    const registrationUser = async (e) => {
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
                name: dataUser.username,
                email: dataUser.email,
                token: res.data.token,
            }));
            localStorage.setItem('token', selector.token);
            setLoad(false);
            setResError('');
        }).catch(err => {
            setLoad(false);
            setResError(err.response.data);
        });

    };

    // const submitData = (e) => {
    //     setLoad(true);
    //     e.preventDefault();
    //
    //     if (validateEmail(registration.email)) {
    //
    //         (async function () {
    //             try {
    //
    //                 let response = await fetch(url + 'accounts');
    //
    //                 let fetchUsers = await response.json();
    //
    //                 let dataCurrent = fetchUsers.find(empty => (registration.email === empty.email));
    //
    //                 if (dataCurrent === undefined) {
    //                     await setRegistration({
    //                         ...registration,
    //                         auth: true,
    //                     });
    //
    //                     let postData = await fetch(url + 'accounts', {
    //                         method: 'POST',
    //                         headers: {
    //                             'Content-Type': 'application/json;charset=utf-8',
    //                         },
    //                         body: JSON.stringify({
    //                             ...registration,
    //                             auth: true,
    //                         }),
    //                     });
    //
    //                     let dataRes = await postData.json();
    //
    //                     await localStorage.setItem('authUser', true);
    //
    //                     setLoad(false);
    //
    //                     alert(`Пользователь с именем ${dataRes.name} успешно зарегистрирован`);
    //
    //                     dispatchUser(actionUserAuth({
    //                         name: dataRes.name,
    //                         email: dataRes.email,
    //                     }));
    //
    //                     if (selector.auth) {
    //                         navigate('/study');
    //                     }
    //
    //                 } else {
    //                     alert(`Данный email уже заргестрирован, попробуйде другой`);
    //                     setLoad(false);
    //                 }
    //             } catch (err) {
    //                 alert(err);
    //             }
    //         })();
    //     }
    //
    // };

    return (
        <div className='c__authorization'>
            <div>Ваш токен: {selector.token}</div>
            <h3>Регистрация</h3>
            <div>{resError}</div>
            {isLoad && <img
                src={spinner}
                alt='spinner'
            />}
            {!isLoad &&
                <form
                    onSubmit={registrationUser}
                    action='online_store/src/components/authorization/Registration'
                    className='form__authorization'
                >
                    <input
                        type='text'
                        required
                        value={dataUser.username}
                        placeholder='name'
                        onChange={(e) => regDateUser(e, 'username')}
                    />
                    <input
                        type='text'
                        placeholder='last_name'
                        value={dataUser.lastUserName}
                        onChange={(e) => regDateUser(e, 'lastUserName')}
                    />
                    <input
                        type='text'
                        required
                        placeholder='email'
                        value={dataUser.email}
                        onChange={(e) => regDateUser(e, 'email')}
                    />
                    <input
                        type='password'
                        required
                        placeholder='password'
                        value={dataUser.password}
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

export default Registration;