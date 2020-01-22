import React, { useState } from 'react';
import { Product } from '../typedef';
import uniq from 'lodash/uniq';
import get from 'lodash/get';
import pull from 'lodash/pull';
import pickBy from 'lodash/pickBy';
import isEmpty from 'lodash/isEmpty';
import _filter from 'lodash/filter';
import { ProductAllowedValue } from '../typedef';

type Props = {
    products: Array<Product>;
    onFilterChange: (filter: SelectedFilters) => void;
};

type Filter = {
    title: string;
    code: string;
    type: string;
};

export interface SelectedFilters {
    [key: string]: Array<string>;
}

type State = {
    selectedFilters: SelectedFilters;
};

const filters: Array<Filter> = [
    {
        title: 'Company',
        code: 'company',
        type: 'checkbox',
    },
    {
        title: 'Are available',
        code: 'isAvailable',
        type: 'radio',
    },
];

export const FilterPanel = (props: Props) => {
    const [state, setState] = useState<State>({
        selectedFilters: {},
    });

    const formatValue = (value: ProductAllowedValue): ProductAllowedValue => {
        if (typeof value === 'boolean') {
            return value ? 'Yes' : 'No';
        }

        return value;
    };

    const isSelected = (filerCode: string, value: string): boolean => {
        const selectedFilters = get(state, `selectedFilters[${filerCode}]`, []);
        return selectedFilters.includes(value);
    };
    const formatFilters = (filters: SelectedFilters) =>
        pickBy(filters, value => !isEmpty(value));

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        filter: Filter,
        value: ProductAllowedValue
    ) => {
        const isChecked = get(e, 'nativeEvent.target.checked');
        const nextFilterValues =
            filter.type === 'radio'
                ? [value]
                : [...get(state, `selectedFilters.${filter.code}`, []), value];
        const selectedFilters = formatFilters({
            ...state.selectedFilters,
            [filter.code]: isChecked
                ? nextFilterValues
                : pull(nextFilterValues, value),
        });

        setState({
            ...state,
            selectedFilters,
        });

        props.onFilterChange && props.onFilterChange(selectedFilters);
    };

    const renderFiltersList = () => {
        const filtersList = filters.map(filter => {
            const productsWithFilter = uniq(
                props.products.map((product: Product) => product[filter.code])
            );

            if (productsWithFilter.length) {
                return (
                    <form>
                        <span>{filter.title}</span>

                        {productsWithFilter.map(filterValue => {
                            const isChecked = isSelected(
                                filter.code,
                                filterValue as string
                            );
                            return (
                                <div>
                                    <input
                                        type={filter.type}
                                        name={filter.code}
                                        value={filterValue as string}
                                        checked={isChecked}
                                        onChange={e =>
                                            onChange(e, filter, filterValue)
                                        }
                                    />
                                    {formatValue(filterValue)}
                                </div>
                            );
                        })}
                    </form>
                );
            }
        });

        return isEmpty(_filter(filtersList)) ? (
            <span>No items to filter</span>
        ) : (
            filtersList
        );
    };

    return <div>{renderFiltersList()}</div>;
};
