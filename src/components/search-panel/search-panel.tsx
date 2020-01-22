import React, { useState } from 'react';

interface Props {
    onSearchTextChange: (text: string) => void;
}

interface State {
    searchText: string;
}

export const SearchPanel = (props: Props) => {
    const [state, setState] = useState<State>({
        searchText: '',
    });

    const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, searchText: e.target.value });
        props.onSearchTextChange && props.onSearchTextChange(e.target.value);
    };

    return (
        <div>
            <input
                type="text"
                value={state.searchText}
                placeholder="Type your text to search"
                onChange={onTextChange}
            />
        </div>
    );
};
