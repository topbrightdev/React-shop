import React, { useState } from 'react';
import { Slide } from 'react-slideshow-image';
import reverse from 'lodash/reverse';
import sortBy from 'lodash/sortBy';
import isEmpty from 'lodash/isEmpty';
import some from 'lodash/some';
import { Product, ProductAllowedValue } from '../typedef';
import './item-list.css';
import { Option } from 'react-dropdown';
import { Options } from '../sort-panel/Sort-panel';
import { SelectedFilters } from '../filter-panel/filter-panel';
import Pagination from 'react-js-pagination';
import { usePagination } from '../../use-pagination';


type Props = {
    items: Product[];
    onAdd: (id: string) => void;
    sortType: Option;
    filters: SelectedFilters;
};

interface State {
    activePage: number;
}

const PAGINATION_ITEMS_PER_PAGE: number = 3;

export const ItemList = (props: Props) => {
    const [state, setState] = useState<State>({
        activePage: 1,
    });

    const handlePageChange = (activePage: number): void =>
        setState({ activePage });

    const sortProducts = ({
        products,
        sortType,
    }: {
        products: Product[];
        sortType: Option;
    }) => {
        if (sortType.value === Options[0].value) {
            return products;
        }

        if (sortType.value === Options[1].value) {
            return reverse(sortBy(products, ['price']));
        }

        if (sortType.value === Options[2].value) {
            return sortBy(products, ['price']);
        }
        return [];
    };

    const sortedProducts: Product[] = sortProducts({
        products: props.items,
        sortType: props.sortType,
    });

    const filterProducts = (products: Array<Product>) => {
        if (!isEmpty(props.filters)) {
            return products.filter((product: Product) => {
                return some(
                    props.filters,
                    (
                        selectedValues: Array<ProductAllowedValue>,
                        filterCode
                    ) => {
                        const productValue: ProductAllowedValue =
                            product[filterCode];

                        return selectedValues.includes(productValue);
                    }
                );
            });
        }

        return products;
    };

    const filteredProducts = filterProducts(sortedProducts);

    const sliceFromIndex = (state.activePage - 1) * PAGINATION_ITEMS_PER_PAGE;

    const itemsToShow = filteredProducts.slice(
        sliceFromIndex,
        sliceFromIndex + PAGINATION_ITEMS_PER_PAGE
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <ul className="list-group">
                {itemsToShow.map((product: Product) => {
                    return (
                        <div key={product.id}>
                            <div className="col-md-4">
                                <div className="thumbnail text-center">
                                    <Slide
                                        transitionDuration={300}
                                        autoplay={false}
                                    >
                                        {product.images.map(image => (
                                            <img
                                                className="product__image"
                                                src={image}
                                                alt={product.name}
                                            />
                                        ))}
                                    </Slide>
                                    <h5>{product.name}</h5>
                                    <h6>{product.description}</h6>
                                    <h6>{product.company}</h6>
                                    <strong>${product.price}</strong>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => props.onAdd(product.id)}
                                    >
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </ul>

            <div style={{ width: '100%' }}>
                <Pagination
                    activePage={state.activePage}
                    itemsCountPerPage={PAGINATION_ITEMS_PER_PAGE}
                    totalItemsCount={filteredProducts.length}
                    pageRangeDisplayed={PAGINATION_ITEMS_PER_PAGE}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    );
};
