import React, { Component } from 'react';
import notificator from '../../utils/notificator';

import guard from '../../utils/guard';
import userController from '../../controllers/user-controller';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
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

        if (userController.isValidInput("login", this.state)) {
            userController.login(this.state)
                .then(res => {
                    userController.saveSession(res);
                    notificator.showInfo('Successfully logged in!');
                    this.props.history.push('/catalog');
                }).catch((res) => {
                if (res.responseJSON.description === 'Invalid credentials. Please retry your request with correct credentials.') {
                    notificator.showError('Invalid username and / or password! Please try again!');
                }
                this.setState({ username: '', password: '' });
            });
        }
    };

    render = () => {
        const anonymousSection = (
            <main>
                <section className="section-title">
                    <h3 className="title">Login</h3>
                </section>
                <section className="container">
                    <form onSubmit={this.handleSubmit} className="form">
                        <div>Username:</div>
                        <div className="label">
                            <input type="text" onChange={this.handleChange} value={this.state.username} name="username" />
                            <i className="fas fa-user"></i>
                        </div>
                        <div>Password:</div>
                        <div className="label">
                            <input type="password" onChange={this.handleChange} value={this.state.password} name="password" />
                            <i className="fas fa-key"></i>
                        </div>
                        <div className="label">
                            <input type="submit" value="Login!" />
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
                            ? <p className="body-text">You are already logged in your account!</p>
                            : null
                    }
                    <article id="bg-img">

                    </article>
                </section>
            </main>
        );

        return (
            (!guard.isAuthenticated())
                ? anonymousSection
                : homeSection
        )
    }
}