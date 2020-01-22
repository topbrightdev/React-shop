import React, { useState } from 'react';
import Dropdown, { Option } from 'react-dropdown';
import 'react-dropdown/style.css';
import './sort-panel.css';

type Props = {
    onSortTypeChange: (type: Option) => void;
};

type State = {
    selectedSortType: Option;
};

export const Options = [
    {
        value: 'none',
        label: 'none',
    },
    {
        value: 'expensive',
        label: 'From expensive to cheap'
    },
    {
        value: 'cheap',
        label: 'From cheap to expensive'
    },
];

export const SortPanel = (props: Props) => {
    const [state, setState] = useState<State>({
        selectedSortType: Options[0],
    });

    const onChange = (sortType: Option) => {
        setState({ selectedSortType: sortType });
        props.onSortTypeChange(sortType);
    };

    return (
        <Dropdown
            className='dropdown'
            options={Options}
            onChange={onChange}
            value={state.selectedSortType}
            placeholder="Select an option"
        />
    );
};
