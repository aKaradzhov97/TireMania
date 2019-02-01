import React, { Component } from 'react';
import guard from '../../utils/guard';
import requester from '../../utils/requester';
import notificator from '../../utils/notificator';
import SingleOrder from './SingleOrder';
import unauthorizedImg from '../../images/unauthorized.png';

export default class Orders extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orders: []
        }
    }

    callbackForStateUpdate = (shouldUpdateState) => {
        if (shouldUpdateState) {
            this.getAllOrders()
                .then(res => {
                    this.setState({
                        orders: res
                    });
                })
                .catch(res => {
                    notificator.showError('Loading orders unsuccessful!');
                });
        }
    };

    noOrders = () => {
        return this.state.orders.length === 0;
    };

    getAllOrders = () => {
        const ENDPOINT = 'orders';
        return requester.get('appdata', ENDPOINT, 'kinvey');
    };

    componentDidMount() {
        if (!guard.isAdmin()) {
            notificator.showError('You are not authorized!');
            return;
        }
        this.getAllOrders()
            .then((res) => {
                this.setState({
                    orders: res
                });
                notificator.showInfo('Orders are loaded successfully!');
            }).catch((res) => {
                notificator.showError('Loading orders unsuccessful!');
            });
    }

    render = () => {
        let noOrdersSection = (
            <main>
                <section className="section-title">
                    <h3 className="title">Orders</h3>
                </section>
                <section className="unauthorized-section">
                    <section className="unauthorized-inner">
                        <p className="body-text">There is no orders at this moment!</p>
                        <img src={unauthorizedImg} title="No orders!" alt="No orders.." />
                    </section>
                </section>
            </main>
        );

        const unauthorized = (
            <main>
                <section className="section-title">
                    <h3 className="title">Sneaking?</h3>
                </section>
                <section className="unauthorized-section">
                    <section className="unauthorized-inner">
                        <p className="body-text">Please login to access that page!</p>
                        <img src={unauthorizedImg} title="Unauthorized!" alt="Unauthorized.." />
                    </section>
                </section>
            </main>
        );

        const notAdmin = (
            <main>
                <section className="section-title">
                    <h3 className="title">Sneaking?</h3>
                </section>
                <section className="unauthorized-section">
                    <section className="unauthorized-inner">
                        <p className="body-text">You have no rights to access that page!</p>
                        <img src={unauthorizedImg} title="Unauthorized!" alt="Unauthorized.." />
                    </section>
                </section>
            </main>
        );

        return (

                            (!guard.isAuthenticated())
                                ? unauthorized
                                : (!guard.isAdmin())
                                ? notAdmin
                                : this.noOrders()
                                ? noOrdersSection
                                : (
                                    <main>
                                        <section className="section-title">
                                            <h3 className="title">Orders</h3>
                                        </section>
                                        <section className="catalog">
                                            {this.state.orders.map((order, index) => <SingleOrder key={order._id} index={index} callbackForStateUpdate={this.callbackForStateUpdate} {...order} />)}
                                        </section>
                                    </main>
                                    )
        )
    }
}