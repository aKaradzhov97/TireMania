import React, {Component} from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';

import guard from '../../utils/guard';
import logo from '../../images/logo.png';

export default class Header extends Component {
    cartItems = () => {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart')).length;
        }
        return 0;
    };

    hideNotification = () => {
        $("#errorBox").hide();
        $("#infoBox").hide();
        $("#loadingBox").hide();
    };

    render = () => {
        const guestSection = (
            <nav className="navigation main">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                </ul>
            </nav>
        );

        const loggedInSection = (
            <nav className="navigation main">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/catalog">Catalog</Link>
                    </li>
                    <li>
                        <Link to="/account">{guard.isAdmin() ? "Admin panel" : "My account"}</Link>
                    </li>
                    <li>
                        <Link to="/cart">Cart ({this.cartItems()})</Link>
                    </li>
                    <li>
                        <Link to="/logout">Logout</Link>
                    </li>
                </ul>
            </nav>
        );

        return (
            <header className="site-header">
                <input type="checkbox" name="main-nav-toggle" id="main-nav-toggle"/>
                <div className="wrapper">
                    <Link to="/">
                        <img src={logo} alt="Site Logo" className="site-logo" />
                    </Link>

                    <label htmlFor="main-nav-toggle" id="toggle" onClick={this.hideNotification}>
                        <i className="fas fa-bars"></i>
                        <i className="fas fa-times" id="times-icon"></i>
                    </label>
                    {guard.isAuthenticated() ? loggedInSection : guestSection}
                </div>
            </header>
        )
    }
}