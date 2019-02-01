import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Footer extends Component {
    render = () => {
        return (
            <footer className="site-footer">
                <section>
                    <span>Copyright © 2018. All rights reserved | Design & developed by <a href="https://www.github.com/akaradzhov97" className="dev-credits">aKaradzhov97</a></span>
                </section>
                <section>
                    <span>Follow TireMania: </span>
                    <Link to="#" className="fab fa-facebook-f"></Link>
                    <Link to="#" className="fab fa-twitter"></Link>
                    <Link to="#" className="fab fa-linkedin-in"></Link>
                    <Link to="#" className="fab fa-google-plus-g"></Link>
                </section>
            </footer>
        )
    }
}