import React from 'react';
import { Product } from '../typedef';
import './cart-list.css';

type Props = {
    items: Product[];
    onRemove: (id: string) => void;
};

export const CartList = (props: Props) => {
    const total = props.items.reduce((sum, item) => sum + item.price, 0);

    return (
        <div>
            Корзина
            <ul className="list-group">
                {props.items.map(product => (
                    <div
                        className='list-group-item d-flex justify-content-between align-items-center"'
                        key={product.id}
                    >
                        <h5>{product.name}</h5>
                        <span className="badge badge-primary badge-pill">
                            Price: ${product.price}{' '}
                        </span>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => props.onRemove(product.id)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </ul>
            <div className="sum-box">
                <div className="sum">Items: {props.items.length}</div>
                <div className="sum">Total: $ {total}</div>
            </div>
        </div>
    );
};
