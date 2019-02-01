import React, { Component } from 'react';
import Tire from './product/Tire';
import noProductsInCartImg from '../../images/noProducts.png';
import orderController from '../../controllers/order-controller';
import notificator from '../../utils/notificator';

export default class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            orderPrice: '0',
            cart: JSON.parse(localStorage.getItem('cart'))
        }
    }

    callbackForStateUpdate = (shouldParentUpdate) => {
        if (shouldParentUpdate) {
            this.setState({
                cart: JSON.parse(localStorage.getItem('cart'))
            });
        }
    };

    handleOrderPrice = () => {
        let orderPrice = 0;
        for (let i = 0; i < this.state.cart.length; i++) {
            let tire = this.state.cart[i];
            orderPrice += Number(tire.price) * Number (tire.count);
        }
        localStorage.setItem('orderPrice', orderPrice);
        return orderPrice;
    };

    cartIsNotEmpty = () => {
        return this.state.cart && this.state.cart.length > 0;
    };

    handleSubmit = (event) => {
        event.preventDefault();
        let orderPriceValue = localStorage.getItem('orderPrice');
        let username = sessionStorage.getItem('username');

        let data = this.state;

        for (let i = 0; i < data.cart.length; i++) {
            data.cart[i].totalPrice = Number(data.cart[i].price) * Number(data.cart[i].count);
        }

        data.orderPrice = orderPriceValue;
        data.username = username;

        orderController.createOrder(data)
            .then((res) => {
                notificator.showInfo('Order confirmed! We will contact you as soon as possible!');
                this.props.history.push('/');
                this.callbackForStateUpdate(true);
                localStorage.removeItem('cart');
                localStorage.removeItem('orderPrice');
            }).catch((res) => {
            notificator.showError(res.responseJSON.description);
        });
    };

    render = () => {
        const emptyCart = (
            <main>
                <section className="section-title">
                    <h3 className="title">Your cart</h3>
                </section>
                <section className="cart empty">
                    <section className="inner-empty-cart">
                        <p className="body-text">Your cart is empty!</p>
                        <img src={noProductsInCartImg} title="No products in cart!" alt="No products in cart." />
                    </section>
                </section>
            </main>
        );

        const cart = (
            <main>
                <section className="section-title">
                    <h3 className="title">Your cart</h3>
                </section>
                <section className="cart">
                    <ul>
                        {(this.cartIsNotEmpty() ? this.state.cart.map((t) => <Tire key={t._id} callbackForStateUpdate={this.callbackForStateUpdate} {...t}/>) : null)}
                    </ul>
                    <section className="submit-order">
                        <div className="total-price">Total price: {this.cartIsNotEmpty() ? this.handleOrderPrice() : null}EUR.</div>
                        <form onSubmit={this.handleSubmit} className="form">
                            <div className="label">
                                <input type="submit"  value="Confirm Order!"/>
                            </div>
                        </form>
                    </section>
                </section>
            </main>
        );

        return (
            this.cartIsNotEmpty()
                ? cart
                : emptyCart
        )
    }
}