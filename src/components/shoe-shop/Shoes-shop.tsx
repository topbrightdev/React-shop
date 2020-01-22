import React, { useState } from 'react';
import { ItemList } from '../item-list/item-list';
import { data } from '../data';
import { CartList } from '../cart-list/cart-list';
import { Options, SortPanel } from '../sort-panel/Sort-panel';
import { Option } from 'react-dropdown';
import { FilterPanel, SelectedFilters } from '../filter-panel/filter-panel';
import { SearchPanel } from '../search-panel/search-panel';
import { Product } from '../typedef';
import { LocalizationProvider } from '../localiztion-provider/localizaion-provider';

type CartItems = {
    [id: string]: number;
};

type State = {
    cartItems: CartItems;
    sortType: Option;
    filters: SelectedFilters;
    searchText: string;
};

export const ShoesShop = () => {
    const [state, setState] = useState<State>({
        cartItems: {} as CartItems,
        sortType: Options[0],
        filters: {},
        searchText: '',
    });

    const addItem = (id: string) => {
        const cartItems = {
            ...state.cartItems,
            [id]: state.cartItems[id] ? state.cartItems[id] + 1 : 1,
        };
        setState({ ...state, cartItems });
    };

    const onSortTypeChange = (sortType: Option) =>
        setState({ ...state, sortType });

    const removeItem = (id: string) => {
        const cartItems = { ...state.cartItems };
        delete cartItems[id];
        setState({ ...state, cartItems });
    };

    const cartData = data.filter(item =>
        Object.keys(state.cartItems).includes(item.id)
    );

    const onFilterChange = (filters: SelectedFilters): void => {
        setState({ ...state, filters });
    };

    const onSearchTextChange = (text: string): void =>
        setState({ ...state, searchText: text });

    const getData = (): Array<Product> => {
        if (!state.searchText) {
            return data;
        }

        return data.filter(
            product => !!~product.name.search(new RegExp(state.searchText, 'i'))
        );
    };

    return (
        <LocalizationProvider>
            <div className="container">
                <h1> React Boots Shop </h1>
                <hr />
                <div>
                    <SearchPanel onSearchTextChange={onSearchTextChange} />
                    <br/>
                    <SortPanel onSortTypeChange={onSortTypeChange} />
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <FilterPanel
                            products={getData()}
                            onFilterChange={onFilterChange}
                        />
                    </div>

                    <div className="col-md-7">
                        <hr />

                        <ItemList
                            items={getData()}
                            onAdd={addItem}
                            sortType={state.sortType}
                            filters={state.filters}
                        />
                    </div>
                    <div className="col-md-3">
                        <CartList items={cartData} onRemove={removeItem} />
                    </div>
                </div>
            </div>
        </LocalizationProvider>
    );
};
