export type Product = {
    id: string;
    images: Array<string>;
    name: string;
    price: number;
    description: string;
    count: number;
    company: string;
    isAvailable: boolean;
    [key: string]: ProductAllowedValue;
};

export type ProductAllowedValue = boolean | string | number | Array<string>;
