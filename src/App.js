import React, { Component } from 'react';
import './App.css';
import Table from './components/Table';
import Register from './components/Register';


class App extends Component {
    state = {
        registerProduct: "",
        registerPrice: "",
        products: [],
        success: true,
        storageProducts: [],
        show: false,
    }

    componentDidMount() {
        fetch("http://localhost:8000/api/products", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                if (data.success) {
                    this.setState({ products: data.products })
                }
                else {
                    console.log((err) => err);
                }
            })
    }

    fetchRegister = (event) => {
        event.preventDefault();
        fetch("http://localhost:8000/api/products", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product: this.state.registerProduct,
                price: this.state.registerPrice,
            })
        },
        )
            .then(response => response.json())
            .then(data => {
                console.log(data, "data")
                if (data.success) {
                    this.setState((prevState) => {
                        const currentProduct = [...prevState.products];
                        const myNewProduct = {
                            product: data.product,
                            price: data.price,
                            id: data.id,
                        };
                        currentProduct.push(myNewProduct)
                        return {
                            products: currentProduct
                        }
                    })
                    console.log("Receive from Backend");
                }
                else {
                    console.log("error");
                }
            })
            .catch(err => console.log(err, "FetchRegister"));
    }

    fetchModify = (event) => {
        event.preventDefault();
        fetch("http://localhost:8000/api/products/" + this.state.selectedProdId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product: this.state.registerProduct,
                price: this.state.registerPrice,
            })
        }).then(response => response.json())
            .then(data => {
                console.log(data, "PUT DATA");
                if (data.success) {
                    this.setState((prevState) => {
                        const currentProduct = [...prevState.products];
                        const id = parseInt(data.product.id);
                        const productIndex = currentProduct.findIndex((pro) => pro.id === id);
                        currentProduct[productIndex] = data.product;
                        return {
                            products: currentProduct
                        }
                    })
                    console.log("PUT: Receive from Backend");
                }
                else {
                    console.log("error");
                }
            })
            .catch(err => console.log(err, "FetchModify"));
    }

    fetchDelete = (productid) => {
        fetch("http://localhost:8000/api/products/" + productid, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
            .then(data => {
                if (data.success) {
                    this.setState((prevState) => {
                        const currentProduct  = prevState.products.filter(pro => pro.id !== productid);
                        return {
                            products: currentProduct,
                        }
                    })
                    console.log("DELETE: Receive from Backend");
                }
                else {
                    console.log("error");
                }
            })
            .catch(err => console.log(err, "FetchDelete"));
    }

    onProductChange = (event) => {
        this.setState({ registerProduct: event.target.value })
    }

    onPriceChange = (event) => {
        this.setState({ registerPrice: event.target.value })
    }

    handlenEdit = (product) => {
        this.setState({
            registerProduct: product.product,
            registerPrice: product.price,
            show: true,
            selectedProdId: product.id,
        });
        console.log(product, "product");
    }
    cancel = () => {
        this.setState({ show: false, registerProduct: "", registerPrice: "", selectedProdId: null });
    }


    render() {
        return (
            <div className="App">
                <Register show={this.state.show} registerPrice={this.state.registerPrice} registerProduct={this.state.registerProduct} 
                onProductChange={this.onProductChange} onPriceChange={this.onPriceChange} onFetchModify={this.fetchModify} 
                cancel={this.cancel} onFetchRegister={this.fetchRegister}/>

                <Table products={this.state.products} onEdit={this.handlenEdit} onFetchDelete={this.fetchDelete} />
            </div>
        );
    }

}

export default App;