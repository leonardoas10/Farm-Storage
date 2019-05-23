import React, { Component } from 'react';
import './App.css';
import Table from './components/Table';


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
            if(data.success) {
                this.setState({ products: data.products})
            }
            else {
                console.log((err) => err);
            }
        })
    }

    fetchModificar = (event) => {
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
        }).then( response => response.json())
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
            .then(response => response.json() )
            .then(data => {
                console.log(data, "data")
                if (data.success) {
                    this.setState((prevState) => {
                        const currentProduct = [...prevState.products]; 
                        const myNewProduct = {
                            product: data.product,
                            price: data.price,
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
    }

    onProductChange = (event) => {
        this.setState({ registerProduct: event.target.value})
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
        this.setState({show: false, registerProduct: "", registerPrice: "", selectedProdId: null});
    }


    render() {
        return (
            <div className="App">
                <h1>Register</h1>
                <label>Product</label>
                <input
                    className="input-nosubmit"
                    type="name"
                    onChange={this.onProductChange}
                    value={this.state.registerProduct}
                />
                <label>Price</label>
                <input
                    className="input-nosubmit"
                    type="email"
                    onChange={this.onPriceChange}
                    value={this.state.registerPrice}
                />
                <button className='submit-buttom' type="button" onClick={this.state.show ? this.fetchModificar : this.fetchRegister}>{this.state.show ? "Modificar" : "Register"}</button>
                {this.state.show && <button className='submit-buttom' type="button" onClick={this.cancel} >Cancel</button>}

                <Table products={this.state.products} onEdit={this.handlenEdit}/>
            </div>
        );
    }

}

export default App;