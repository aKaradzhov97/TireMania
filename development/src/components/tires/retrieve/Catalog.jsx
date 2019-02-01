import React, { Component } from 'react';
import tireController from '../../../controllers/tire-controller';
import AdminTire from "./product/AdminTire";
import Tire from './product/Tire';
import unauthorizedImg from '../../../images/unauthorized.png';
import emptyCatalogImg from '../../../images/noProducts.png';
import guard from '../../../utils/guard';

export default class Catalog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tires: []
        }
    }

    noProductsInDb = () => {
        return this.state.tires.length === 0;
    };

    componentDidMount = () => {
        tireController.getAllTires()
            .then(res => {
                this.setState({tires: res});
            });
    };

    render = () => {
        const emptyCatalog = (
            <main>
                <section className="section-title">
                    <h3 className="title">Catalog</h3>
                </section>
                <section className="catalog">
                    <section className="empty-catalog">
                        <p className="empty-catalog-text">No products available. Please come back later!</p>
                        <img src={emptyCatalogImg} alt=""/>
                    </section>
                </section>
            </main>
        );

        const catalog = (
            <main>
                <section className="section-title">
                    <h3 className="title">Catalog</h3>
                </section>
                <section className="catalog">
                    <ul>
                        {
                            guard.isAdmin()
                                ? (this.state.tires.map((t) => <AdminTire key={t._id} {...t} />))
                                : (this.state.tires.map((t) => <Tire key={t._id} {...t} />))
                        }
                    </ul>
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
                        <p className="body-text">Please login or register to access the catalog!</p>
                        <img src={unauthorizedImg} title="Unauthorized!" alt="Unauthorized.." />
                    </section>
                </section>
            </main>
        );

        return (
            (!guard.isAuthenticated())
                ? unauthorized
                : this.noProductsInDb()
                ? emptyCatalog
                : catalog
        )
    }
}