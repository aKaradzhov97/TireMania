import React, { Component } from 'react';
import requester from '../../utils/requester';
import notificator from '../../utils/notificator';
import SingleProduct from './SingleProduct';

export default class SingleOrder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userDetails: {}
        }
    }

    handleDeleteOrder = (event) => {
        let orderId = event.currentTarget.getAttribute('data-orderid');

        const ENDPOINT = `orders/${orderId}`;

        requester.remove('appdata', ENDPOINT, 'kinvey')
            .then((res) => {
                notificator.showInfo('Successfully deleted order!');
                this.props.callbackForStateUpdate(true);
            }).catch((res) => {
            notificator.showError(res);
        });
    };

    handleCheckOutOrder = (event) => {
        let orderId = event.currentTarget.getAttribute('data-orderid');
        let userId = event.currentTarget.getAttribute('data-userid');

        let data = {
            user: {},
            order: {}
        };

        requester.get('user', userId, 'kinvey')
            .then((res) => {
                data['user'] = res;

                let ENDPOINT = `orders/${orderId}`;
                requester.get('appdata', ENDPOINT, 'kinvey')
                    .then((res) => {
                        data['order'] = res;

                        let ENDPOINT = `orders/${orderId}`;
                        requester.remove('appdata', ENDPOINT, 'kinvey')
                            .then((res) => {
                                requester.post('appdata', 'ordersArchive', 'kinvey', data)
                                    .then((res) => {
                                        notificator.showInfo('Order confirmed & saved to archive!');
                                        this.props.callbackForStateUpdate(true);
                                    })
                                    .catch((res) => {
                                        notificator.showError('Order loading unsuccessful!');
                                    });
                            })
                            .catch((res) => {
                                notificator.showError('Deleting order not successful!');
                            });
                    })
                    .catch((res) => {
                        notificator.showError('Could not get order information!');
                    });
            })
            .catch((res) => {
                notificator.showError('Could not get user information!');
            });
    };

    getUserById = () => {
        const userId = this.props._acl.creator;

        requester.get('user', userId, 'kinvey')
            .then((res) => {
                this.setState({
                    userDetails: res
                });
            }).catch((res) => {
            notificator.showError('Could not load user data!');
        });
    };

    componentDidMount() {
        this.getUserById();
    }

    render = () => {
        let userInfoTable = (
            <table className="userInfoTable">
                <thead>
                <tr>
                    <td className="productDetail">Username</td>
                    <td>
                        {this.props.username}
                    </td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="productDetail">Name</td>
                    <td>
                        {this.state.userDetails.name}
                    </td>
                </tr>
                <tr>
                    <td className="productDetail">Surname</td>
                    <td>
                        {this.state.userDetails.surname}
                    </td>
                </tr>
                <tr>
                    <td className="productDetail">Phone</td>
                    <td>
                        {this.state.userDetails.phone}
                    </td>
                </tr>
                <tr>
                    <td className="productDetail">Email</td>
                    <td>
                        {this.state.userDetails.email}
                    </td>
                </tr>
                <tr>
                    <td className="productDetail">City</td>
                    <td>
                        {this.state.userDetails.city}
                    </td>
                </tr>
                <tr>
                    <td className="productDetail">Quarter</td>
                    <td>
                        {this.state.userDetails.quarter}
                    </td>
                </tr>
                <tr>
                    <td className="productDetail">Street</td>
                    <td>
                        {this.state.userDetails.street}
                    </td>
                </tr>
                <tr>
                    <td className="productDetail">Post Code</td>
                    <td>
                        {this.state.userDetails.postCode}
                    </td>
                </tr>
                </tbody>
            </table>
        );

        return (
            <table>
                <thead>
                <tr>
                    <th colSpan="2">Order {this.props.index + 1}: ID {this.props._id}</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="productDetail">User ID</td>
                    <td>
                        {this.props._acl.creator}
                    </td>
                </tr>
                <tr>
                    <td>
                        {this.props.cart.map((product, index) => <SingleProduct key={product._id} index={index} {...product} />)}
                    </td>
                    <td>
                        {userInfoTable}
                    </td>
                </tr>
                <tr>
                    <td className="productDetail">TOTAL PRICE</td>
                    <td className="totalOrderPrice">
                        {this.props.orderPrice} EUR.
                    </td>
                </tr>
                <tr>
                    <td className="productDetail">Actions</td>
                    <td className="totalOrderPrice">
                        <section className="order-actions">
                            <button onClick={this.handleCheckOutOrder} className="submit-order-link" data-orderid={this.props._id} data-userid={this.props._acl.creator} title="Confirm order!">
                                <i className="far fa-check-circle"></i>
                            </button>
                            <button onClick={this.handleDeleteOrder} className="delete-order-link" data-orderid={this.props._id} title="Delete order!">
                                <i className="far fa-times-circle"></i>
                            </button>
                        </section>
                    </td>
                </tr>
                </tbody>
            </table>
        )
    }
}