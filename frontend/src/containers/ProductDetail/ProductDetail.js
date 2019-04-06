import React, {Component} from 'react';
import {loadProductDetails} from "../../store/actions/product-details";
import connect from "react-redux/es/connect/connect";
import axios from "axios";
import {CATEGORIES_URL} from "../../api-urls";


class ProductDetails extends Component {

    state = {
        category: []
    };
    
    componentDidMount() {
        this.props.loadProductDetails(this.props.match.params.id);

        axios.get(CATEGORIES_URL)
            .then(response => {
                const category = response.data;
                console.log(category);
                this.setState(prevState => {
                    let newState = {...prevState};
                    newState.category = category;
                    return newState;
                });
            })
            .catch(error => {
                console.log(error);
                console.log(error.response)
            });
    }

    render() {

        console.log(this.props, "props");
        console.log(this.props.productDetails, 'productDetails');

        if (!this.props.productDetails.product) return null;

        console.log(this.props.productDetails.product.category, 'this.props.productDetails.product.category');
        const categories = this.props.productDetails.product.categories;
        const photos = this.props.productDetails.product.photos;
        return (
            <div className="card m-3" style={{"width": "50rem"}}>
                <div className="card-body">
                    <h3 className="card-title">{this.props.productDetails.product.name}</h3>
                    <h6 className="card-subtitle mb-2 text-muted">Дата: {this.props.productDetails.product.date}</h6>
                    <p className="img">Фотографии:{photos.map(photo => <img src={photo.photo} alt=""/>)}</p>
                    <p className="card-text text-muted">Категория: {categories.map(cat=><span>{cat.name}</span>)}</p>
                    <p className="card-text">Описание: {this.props.productDetails.product.description}</p>
                    <h4 className="card-subtitle mb-2 text-bold">Цена: {this.props.productDetails.product.price} сом.</h4>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        productDetails: state.productDetails,
        auth: state.auth
    }
};

const mapDispatchProps = dispatch => {
    return {
        loadProductDetails: (id) => dispatch(loadProductDetails(id)),

    }
};
export default connect(mapStateToProps, mapDispatchProps)(ProductDetails);