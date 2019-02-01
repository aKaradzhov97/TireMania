import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import userController from '../../controllers/user-controller';
import notificator from "../../utils/notificator";
import guard from "../../utils/guard";
import AdminPanel from '../../images/AdminPanel.svg';
import unauthorizedImg from '../../images/unauthorized.png';

export default class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            surname: '',
            phone: '',
            city: '',
            quarter: '',
            street: '',
            postCode: '',
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

        userController.updateUser(this.state)
            .then((res) => {
                this.props.history.push('/catalog');
                notificator.showInfo('Changes saved successfully!')
            }).catch((res) => {
                notificator.showError('An error occurred while saving your information!');
            });
    };

    componentDidMount = () => {
        //Do when component is rendered...
        userController.getUserById(sessionStorage.getItem('userId'))
            .then((res) => {
                this.setState({
                    name: res.name,
                    surname: res.surname,
                    phone: res.phone,
                    city: res.city,
                    quarter: res.quarter,
                    street: res.street,
                    postCode: res.postCode,
                    email: res.email
                });
            }).catch(() => {
                notificator.showError('Error! Could not load information!');
            });
    };

    render = () => {
        const userView = (
            <main>
                <section className="section-title">
                    <h3 className="title">My account</h3>
                </section>
                <section className="container account">
                    <form className="form" onSubmit={this.handleSubmit}>
                        <div className="additional-info">Please fill all fields with valid information!</div>
                        <div className="additional-info">All fields are required!</div>
                        <div>Account: {sessionStorage.getItem("username")}</div>
                        <hr/>
                        <div>Name</div>
                        <div className="label">
                            <input type="text" onChange={this.handleChange} defaultValue={this.state.name} className="inputModel" name="name" minLength="1" />
                            <i className="fas fa-user"></i>
                        </div>
                        <div>Surname</div>
                        <div className="label">
                            <input type="text" onChange={this.handleChange} defaultValue={this.state.surname} className="inputModel" name="surname" minLength="1" />
                            <i className="fas fa-user"></i>
                        </div>
                        <div>Phone</div>
                        <div className="label">
                            <input type="text" onChange={this.handleChange} defaultValue={this.state.phone} className="inputModel" name="phone" minLength='10' maxLength="18" />
                            <i className="fas fa-phone"></i>
                        </div>
                        <div>City</div>
                        <div className="label">
                            <input type="text" onChange={this.handleChange} defaultValue={this.state.city} className="inputModel" name="city" minLength="1" />
                            <i className="fas fa-university"></i>
                        </div>
                        <div>Quarter</div>
                        <div className="label">
                            <input type="text" onChange={this.handleChange} defaultValue={this.state.quarter} className="inputModel" name="quarter" />
                            <i className="fas fa-map-marker-alt"></i>
                        </div>
                        <div>Street</div>
                        <div className="label">
                            <input type="text" onChange={this.handleChange} defaultValue={this.state.street} className="inputModel" name="street" />
                            <i className="fas fa-road"></i>
                        </div>
                        <div>Post code</div>
                        <div className="label">
                            <input type="text" onChange={this.handleChange} defaultValue={this.state.postCode} className="inputModel" name="postCode" />
                            <i className="far fa-list-alt"></i>
                        </div>
                        <div>Email</div>
                        <div className="label">
                            <input type="text" onChange={this.handleChange} defaultValue={this.state.email} className="inputModel" name="email" disabled />
                            <i className="fas fa-envelope"></i>
                        </div>
                        <div className="additional-info">*If you want to change your email, please contact us: +359 893123456.</div>
                        <div className="label">
                            <input type="submit" value="Save changes!" />
                        </div>
                    </form>
                </section>
            </main>
        );

        const adminView = (
            <main>
                <section className="section-title">
                    <h3 className="title">Admin panel</h3>
                </section>
                <section className="container panel">
                    <section className="panel-links">
                        <Link to="/create" className="panel-link">Create product</Link>
                        <Link to="/orders" className="panel-link">View orders</Link>
                    </section>
                    <div>
                        <img src={AdminPanel} className="svg-gear-panel" alt="Gear logo." />
                    </div>
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
                        <p className="body-text">Please login or register to access that page!</p>
                        <img src={unauthorizedImg} title="Unauthorized!" alt="Unauthorized.." />
                    </section>
                </section>
            </main>
        );

        return (
                (guard.isAdmin())
                    ? adminView
                    : guard.isAuthenticated()
                    ? userView
                    : unauthorized
        );
    }
}