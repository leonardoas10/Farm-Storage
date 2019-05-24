import React from 'react';
import './Table.css';

const Table = (props) => {
    return (
        <table className="bording-table">
            <tbody className="margin-table">
                <tr>
                    <td className="withoutborder"><strong>Product</strong></td>
                    <td className="withoutborder"><strong>Price</strong></td>
                </tr>
                {props.products.map((product) => {
                    console.log(product, "product");
                    return (
                        <tr key={product.id}>
                            <td className="squares">{product.product}</td>
                            <td className="squares">${product.price}</td>
                            <td className="squares"><button className='submit-buttomaaa' type="button" onClick={() => props.onEdit(product)}>Edit</button></td>
                            <td className="delete-square"> <button className='submit-buttomaaa' type="button"onClick={() => props.onFetchDelete(product.id)}>Delete</button></td>
                        </tr>
                    )
                           })}
            </tbody>
        </table>
        );
        
    }
    
export default Table;