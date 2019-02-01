import React, { Component } from 'react';
import notificator from "../../utils/notificator";

import guard from '../../utils/guard';
import userController from '../../controllers/user-controller';
import User from '../../models/User';

export default class RegisterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            repeatPassword: '',
            email: ''
        }
    }

    handleChange = (event) => {
        let fieldName = event.target.name;
        let fieldValue = event.target.value;

        this.setState({
            [fieldName]: fieldValue
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        let userInput = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            repeatPassword: this.state.repeatPassword
        };

        if (userController.isValidInput('register', userInput)) {
            let user = new User(this.state.username, this.state.email, this.state.password);

            userController.register(user)
                .then((res) => {
                    notificator.showInfo('Successfully registered! Welcome to Tire Mania!');
                    userController.saveSession(res);
                    this.props.history.push('/account');
                }).catch((res) => {
                notificator.handleError(res);

                this.setState({
                    username: '',
                    password: '',
                    repeatPassword: '',
                    email: ''
                });
            });
        }

        this.setState({
            username: '',
            password: '',
            repeatPassword: '',
            email: ''
        });
    };

    render = () => {
        const anonymousSection = (
            <main>
                <section className="section-title">
                    <h3 className="title">Register</h3>
                </section>
                <section className="container">
                    <form onSubmit={this.handleSubmit} className="form">
                        <div>Username:</div>
                        <div className="label">
                            <input type="text" onChange={this.handleChange} value={this.state.username} name="username" />
                            <i className="fas fa-user"></i>
                        </div>
                        <div>Email:</div>
                        <div className="label">
                            <input type="email" onChange={this.handleChange} value={this.state.email} name="email" />
                            <i className="fas fa-envelope"></i>
                        </div>
                        <div>Password:</div>
                        <div className="label">
                            <input type="password" onChange={this.handleChange} value={this.state.password} name="password" />
                            <i className="fas fa-key"></i>
                        </div>
                        <div>Repeat password:</div>
                        <div className="label">
                            <input type="password" onChange={this.handleChange} value={this.state.repeatPassword} name="repeatPassword" />
                            <i className="fas fa-key"></i>
                        </div>
                        <div className="label">
                            <input type="submit" value="Register!" />
                        </div>
                    </form>
                </section>
            </main>
        );

        const homeSection = (
            <main className="home">
                <section className="view-home">
                    <p className="site-title">Tire Mania {new Date(Date.now()).getFullYear()}</p>
                    <p className="site-desc">Online tire shop.</p>
                    {
                        guard.isAuthenticated()
                            ? <p className="body-text">You are already registered user and you are logged in your account!</p>
                            : null
                    }
                    <article id="bg-img">

                    </article>
                </section>
            </main>
        );

        //TODO CONST HOME SECTIOn & IN LOGIN COMPONENT
        return (
            (!guard.isAuthenticated())
                ? anonymousSection
                : homeSection
        );
    }
}