import React, {
    useEffect,
} from 'react';

import './css_default/bootstrap.min.css';
import './css_default/slick-theme.css';
import './css_default/fontawesome.min.css';
import './css_default/slick-theme.min.css';
import './css_default/slick.min.css';
import './css_default/templatemo.min.css';

import {
    Routes,
    Route,
    BrowserRouter,
} from 'react-router-dom';

import axios from 'axios';

import { useSelector } from 'react-redux';

import HeaderTop from './components/home/header/HeaderTop';
import HeaderBottom from './components/home/header/HeaderBottom';
import Home from './components/home/Home';
import FooterMain from './components/home/footer/FooterMain';
import About from './components/pages/about/About';
import Contacts from './components/contacts/Contacts';
import Shop from './components/shop/Shop';
import SignUp from './components/contacts/authorization/SignUp';
import Registration from './components/authorization/Registration';
import UserAuthorized from './components/authorizied_user/UserAuthorized';

const App = () => {

        const selectorAuthUser = useSelector(state => state.userAuth);

        useEffect(() => {
            const email = localStorage.getItem('emailUser');
            const token = localStorage.getItem('token');
            if (email !== null && token !== null) {
                const dataPostUserAuth = {
                    email: email,
                    token: token,
                };
                const configPost = {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
                axios.post('http://localhost:3000/api/is-token', dataPostUserAuth, configPost).then(res => {
                    console.log(res.data);
                });

            }
        }, []);

        return (
            <BrowserRouter>
                <div className='App'>
                    <HeaderTop />
                    <HeaderBottom />
                    <Routes>
                        <Route
                            path='/'
                            element={<Home />}
                        />
                        <Route
                            path='/about'
                            element={<About />}
                        />
                        <Route
                            path='/contacts'
                            element={<Contacts />}
                        />
                        <Route
                            path='/shop'
                            element={<Shop />}
                        />
                        {!selectorAuthUser.token &&
                            <>
                                <Route
                                    path='/sign_up'
                                    element={<SignUp />}
                                />
                                <Route
                                    path='/authorization'
                                    element={<Registration />}
                                />}
                            </>

                        }
                        {selectorAuthUser.token && <Route
                            path='/study'
                            element={<UserAuthorized />}
                        />}

                    </Routes>
                    <FooterMain />
                </div>
            </BrowserRouter>
        );
    }

;

export default App;
