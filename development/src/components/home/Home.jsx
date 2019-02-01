import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import guard from '../../utils/guard';

export default class Home extends Component {
    render = () => {
        return (
            <main className="home">
                <section className="view-home">
                    <p className="site-title">Tire Mania {new Date(Date.now()).getFullYear()}</p>
                    <p className="site-desc">Online tire shop.</p>
                    {
                        !guard.isAuthenticated()
                            ? <p className="body-text">Please register or login to your account to access the catalog!</p>
                            : <p className="body-text">Welcome {sessionStorage.getItem("username")}! You can visit our <Link to="/catalog" className="catalog-link">Catalog</Link>.</p>
                    }
                    <article id="bg-img">

                    </article>
                </section>
            </main>
        )
    }
}