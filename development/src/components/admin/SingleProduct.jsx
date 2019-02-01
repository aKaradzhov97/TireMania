import React, { Component } from 'react';

export default class SingleProduct extends Component {
    render = () => {
        return (
            <table className="singleProductTable">
                <thead>
                <tr>
                    <td className="productDetail">Product number</td>
                    <td>
                        {this.props.index + 1}
                    </td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="productDetail">Brand</td>
                    <td>
                        {this.props.brand}
                    </td>
                </tr>
                <tr>
                    <td className="productDetail">Model</td>
                    <td>
                        {this.props.model}
                    </td>
                </tr>
                <tr>
                    <td className="productDetail">Size</td>
                    <td>
                        {this.props.width}/{this.props.height} R{this.props.diameter}
                    </td>
                </tr>
                <tr>
                    <td className="productDetail">Season</td>
                    <td>
                        {this.props.season}
                    </td>
                </tr>
                <tr>
                    <td className="productDetail">Weight index</td>
                    <td>
                        {this.props.weightIndex}
                    </td>
                </tr>
                <tr>
                    <td className="productDetail">Speed index</td>
                    <td>
                        {this.props.speedIndex}
                    </td>
                </tr>
                <tr>
                    <td className="productDetail">Count</td>
                    <td>
                        {this.props.count}
                    </td>
                </tr>
                <tr>
                    <td className="productDetail">Price</td>
                    <td>
                        {this.props.totalPrice}
                    </td>
                </tr>
                </tbody>
            </table>
        )
    }
}