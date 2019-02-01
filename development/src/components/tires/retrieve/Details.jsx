import React, { Component } from 'react';
import tireController from '../../../controllers/tire-controller';
import notificator from '../../../utils/notificator';

export default class Details extends Component {
    constructor(props) {
        super(props);

        this.state = {
            brand: '',
            model: '',
            width: '',
            height: '',
            diameter: '',
            season: '',
            weightIndex: '',
            speedIndex: '',
            price: '',
            picName: '',
            count: '',
            totalPrice: '0',
            _id: ''
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

        //Validation:
        if (this.state.count === '') {
            notificator.showError('Please select tire count!');
            return;
        }
        //End of validation!

        let data = {
            brand: this.state.brand,
            model: this.state.model,
            width: this.state.width,
            height: this.state.height,
            diameter: this.state.diameter,
            season: this.state.season,
            weightIndex: this.state.weightIndex,
            speedIndex: this.state.speedIndex,
            price: this.state.price,
            picName: this.state.picName,
            count: this.state.count,
            totalPrice: this.state.totalPrice,
            _id: this.state._id
        };
        //Lets save the cart info locally.

        let cart = localStorage.getItem('cart');

        let duplicateProduct = false;
        if (!cart) {
            cart = [];
            cart.push(data);
        } else {
            cart = JSON.parse(localStorage.getItem('cart'));
            for (let i = 0; i < cart.length; i++) {
                let currentItem = cart[i];
                if (currentItem._id === data._id) {
                    duplicateProduct = true;
                }
            }
            if (!duplicateProduct) {
                cart.push(data);
            }
        }
        if (!duplicateProduct) {
            localStorage.setItem('cart', JSON.stringify(cart));
            notificator.showInfo('Successfully added product to cart!');
            this.props.history.push('/catalog');
        } else {
            notificator.showError('Product not added to cart! You already added that product to your cart!');
        }

    };

    componentDidMount = () => {
        //Do when component is rendered...
        tireController.getTireById(this.props.match.params.id).then((res) => {
            this.setState({
                brand: res.brand,
                model: res.model,
                width: res.width,
                height: res.height,
                diameter: res.diameter,
                season: res.season,
                weightIndex: res.weightIndex,
                speedIndex: res.speedIndex,
                price: res.price,
                picName: res.picName,
                _id: res._id
            });
        });
    };

    render = () => {
        return (
            <main>
                <section className="section-title">
                    <h3 className="title">Product details</h3>
                </section>
                <section className="details">
                    <section className="product-image-section">
                        <img src={this.state.picName} alt="Product." />
                    </section>

                    <table>
                        <thead>
                        <tr>
                            <th colSpan="2">Tire details:</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="productDetail">Brand</td>
                            <td>
                                {this.state.brand}
                            </td>
                        </tr>
                        <tr>
                            <td className="productDetail">Model</td>
                            <td>
                                {this.state.model}
                            </td>
                        </tr>
                        <tr>
                            <td className="productDetail">Size</td>
                            <td>
                                {this.state.width}/{this.state.height} R{this.state.diameter}
                            </td>
                        </tr>
                        <tr>
                            <td className="productDetail">Season</td>
                            <td>
                                {this.state.season}
                            </td>
                        </tr>
                        <tr>
                            <td className="productDetail">Weight Index</td>
                            <td>
                                {this.state.weightIndex}
                            </td>
                        </tr>
                        <tr>
                            <td className="productDetail">Speed Index</td>
                            <td>
                                {this.state.speedIndex}
                            </td>
                        </tr>
                        <tr>
                            <td className="productDetail">Price per tire</td>
                            <td>
                                {Number(this.state.price).toFixed(2)}€.
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <section className="add-to-cart">
                        <form onSubmit={this.handleSubmit} className="form">
                            <div>Tire count:</div>
                            <div className="label">
                                <select name="count" onChange={this.handleChange} value={this.state.count}>
                                    <option value="" disabled>Tire count..</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                </select>
                                <i className="fas fa-chevron-circle-right"></i>
                            </div>
                            <div>Total price: {(Number(this.state.count) * Number(this.state.price)).toFixed(2)}€</div>
                            <div className="label">
                                <input type="submit" value="Add to cart!" />
                            </div>
                        </form>
                    </section>
                </section>
            </main>
        )
    }
}