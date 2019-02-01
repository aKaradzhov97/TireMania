import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import notificator from '../../../utils/notificator';

export default class Tire extends Component {
    handleRemoveItemFromCart = (event) => {
        let cart = JSON.parse(localStorage.getItem('cart'));
        let elementToBeRemoved = event.currentTarget.attributes.getNamedItem('data-id').value;

        for (let i = 0; i < cart.length; i++) {
            let currentElementId = cart[i]._id;
            if (currentElementId === elementToBeRemoved) {
                cart.splice(i, 1);
            }
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        if (JSON.parse(localStorage.getItem('cart')).length === 0) {
            localStorage.removeItem('cart');
            localStorage.removeItem('orderPrice');
        }

        notificator.showInfo('Successfully removed product from cart!');
        this.props.callbackForStateUpdate(true);
    };

    render = () => {
        return (
            <li>
                <div className="productActions">
                    <button onClick={this.handleRemoveItemFromCart} className="deleteLink" data-id={this.props._id} title="Delete!">
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <Link to={"/details/" + this.props._id}>
                    <div className="productPicture">
                        <img src={this.props.picName} alt="Product in cart." height="200" />
                    </div>
                    <div className="productBrand">{this.props.brand}</div>
                    <div className="productModel">{this.props.model}</div>
                    <div className="productSize">{this.props.width}/{this.props.height} R{this.props.diameter}</div>
                    <div className="productInfo">{this.props.season} {this.props.weightIndex}{this.props.speedIndex}</div>
                    <div className="productCount">Count: {this.props.count}</div>
                    <div className="productPrice">Sub-Total: {this.props.price * this.props.count}€</div>
                </Link>
            </li>
        )
    }
}