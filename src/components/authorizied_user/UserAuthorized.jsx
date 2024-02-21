import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserAuthorized = () => {
    const userAuth = useNavigate();

    if (JSON.parse(localStorage.getItem('authUser'))) {

        const infoUser = () => {
            (function () {

            }());
        };

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