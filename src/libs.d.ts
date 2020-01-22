declare module 'react-slideshow-image' {
    interface SliderProps {
        children?: any;
        duration?: number;
        transitionDuration?: number;
        infinite?: boolean;
        indicators?: boolean;
        arrows?: boolean;
        autoplay?: boolean;
    }

    export class Slide extends React.Component<SliderProps, any> {}
}

declare module 'react-js-pagination' {
    interface PaginationProps {
        activePage: number;
        itemsCountPerPage: number;
        totalItemsCount: number;
        pageRangeDisplayed: number;
        onChange: (activePage: number) => void;
    }

    export default class Pagination extends React.Component<
        PaginationProps,
        any
    > {}
}
