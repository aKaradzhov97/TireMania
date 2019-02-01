import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import guard from '../../../utils/guard';
import tireController from '../../../controllers/tire-controller';
import requester from '../../../utils/requester';
import notificator from '../../../utils/notificator';

export default class Delete extends Component {
    deleteAdById = () => {
        let tireId = this.props.match.params.id;
        const ENDPOINT = `tires/${tireId}`;

        return requester.remove('appdata', ENDPOINT, 'kinvey');
    };

    componentDidMount = () => {
        if (guard.isAdmin()) {
            tireController.deleteTire(this.props.match.params.id)
                .then((res) => {
                    notificator.showInfo('Successfully deleted product!');
                    this.props.history.push("/catalog");
                })
                .catch((res) => {
                    notificator.showError(res.responseJSON.description);
                });
        } else {
            notificator.showError('Unauthorized! Access denied!');
        }
        
    };
    render = () => {
        return (
            <Redirect to="/"/>
        )
    }
}