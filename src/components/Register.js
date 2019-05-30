import React from 'react';
import './Register.css';

const Register = (props) => {
    return (
        <div className="register">
            <div className="title-flex">
                <img src="https://img.icons8.com/doodle/62/000000/watermelon.png"></img>
                <h1>Farm Storage</h1>
                <img src="https://img.icons8.com/doodle/62/000000/pear.png"></img>
            </div>
            <label>Product</label>
            <input
                className="input-nosubmit"
                type="name"
                onChange={props.onProductChange}
                value={props.registerProduct}
            />
            <label>Price</label>
            <input
                className="input-nosubmit"
                type="email"
                onChange={props.onPriceChange}
                value={props.registerPrice}
            />
            <button className='submit-buttom' type="button" onClick={props.show ? props.onFetchModify : props.onFetchRegister}>{props.show ? "Modificar" : "Register"}</button>
            {props.show && <button className='submit-buttom' type="button" onClick={props.cancel} >Cancel</button>}
        </div>
    );
}

export default Register;