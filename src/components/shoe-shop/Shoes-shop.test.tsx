import React from 'react';
import ReactDOM from 'react-dom';
import { ShoesShop } from './Shoes-shop';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ShoesShop />, div);
    ReactDOM.unmountComponentAtNode(div);
});
