import React from 'react';
import './Table.css';

const Table = (props) => {
    return (
        <table className="bording-table">
                    <tbody>
                        <tr>
                            <td><strong>Product</strong></td>
                            <td><strong>Price</strong></td>
                        </tr>
                        {props.products.map((product, index) => {
                            return (
                                <tr key={index}>
                                <td>{product.product}</td>
                                <td>{product.price}</td>
                                <td><button className='submit-buttom' type="button" onClick={() => props.onEdit(product)}>Edit</button></td>
                                <td><button className='submit-buttom' type="button">Delete</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
        </table>
    );
    
}

export default Table;