import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class AdminTire extends Component {
    render = () => {
        let editEndpoint = `/edit/${this.props._id}`;
        let deleteEndpoint = `/delete/${this.props._id}`;

        return (
            <li>
                <div className="productActions">
                    <Link to={editEndpoint}>
                        <button className="editLink">
                            <i className="fas fa-pencil-alt"></i>
                        </button>
                    </Link>
                </div>
                <div className="productActions">
                    <Link to={deleteEndpoint}>
                        <button className="deleteLink">
                            <i className="fas fa-times"></i>
                        </button>
                    </Link>
                </div>
                <Link to={"/details/" + this.props._id}>
                    <div className="productBrand">{this.props.brand}</div>
                    <div className="productModel">{this.props.model}</div>
                    <div className="productPicture">
                        <img src={this.props.picName} alt="Product" />
                    </div>
                    <div className="productSize">{this.props.width}/{this.props.height} R{this.props.diameter}</div>
                    <div className="productInfo">{this.props.season} {this.props.weightIndex}{this.props.speedIndex}</div>
                    <div className="productPrice">{Number(this.props.price).toFixed(2)}€</div>
                </Link>
            </li>
        )
    }
}