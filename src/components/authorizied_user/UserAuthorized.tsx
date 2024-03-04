import React  from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IState } from '../../common/types';

const UserAuthorized = () => {
    const userAuth = useNavigate();

    const userIsAuth = useSelector((state: IState) => state.userAuth);


        return (
            <div>
                userAuth
            </div>
        );


};

export default UserAuthorized;