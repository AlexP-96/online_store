import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserAuthorized = () => {
    const userAuth = useNavigate();

    const userIsAuth = useSelector(state => state.userAuth);

    console.log(userIsAuth);

    let dataStorage = JSON.parse(localStorage.getItem('authUser'));

    useEffect(() => {
        // infoUser();
    }, []);

    const url = 'http://localhost:3000/';

    if (dataStorage) {

    }

    const infoUser = () => {
        if (dataStorage) {
            (async function () {
                let dataUser = await fetch(url + 'accounts');
                let response = await dataUser.json();
                // console.log(response);
            }());
        } else {
            alert('иди отсюда, пидор грязный');
        }
    };

    if (JSON.parse(localStorage.getItem('authUser'))) {
        return (
            <div>
                userAuth
            </div>
        );
    } else {
        return (userAuth('/authorization'));
    }

};

export default UserAuthorized;