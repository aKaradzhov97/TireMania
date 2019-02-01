import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import userController from '../../controllers/user-controller';
import notificator from '../../utils/notificator';

export default class Logout extends Component {
    logout = () => {
        userController.logout()
            .then(res => {
                sessionStorage.clear();
                localStorage.clear();
                notificator.showInfo('Successfully logged out!');
                this.props.history.push('/');
            }).catch((res) => {
            notificator.showError(res.responseJSON.description);
        });
    };

    render = () => {
        this.logout();
        return (
            <Redirect to='/' />
        )
    }
}