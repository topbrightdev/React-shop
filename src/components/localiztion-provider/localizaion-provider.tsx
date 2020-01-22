import React, { ReactNode, useState } from 'react';
import * as en from '../../locales/en.json';
import * as ru from '../../locales/ru.json';

const LANGUAGES: { [key: string]: { [key: string]: string } } = {
    en,
    ru,
};

export const USER_LANGUAGE =
    (navigator.languages && navigator.languages[0]) || navigator.language;

const LocalizationContext = React.createContext({
    t: (key: string): string => key,
});

type Props = {
    children: ReactNode;
};

type translator = (key: string) => string;

interface State {
    t: translator;
}

export const localizeCreator = (language: string = USER_LANGUAGE) => (
    key: string
): string => {
    const translates = LANGUAGES[language];

    if (!translates || !translates[key]) {
        return key;
    }

    return translates[key] as string;
};

export const LocalizationProvider = (props: Props) => {
    const [state] = useState<State>({ t: localizeCreator() });

    return (
        <LocalizationContext.Provider value={{ t: state.t as translator }}>
            {props.children}
        </LocalizationContext.Provider>
    );
};
