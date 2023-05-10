export interface ItemOptions {
    productId: number;
    quantity: number;
    price: number;
}

export interface CreateOrderOptions {
    items: ItemOptions[];
}

export enum PriceFilter {
    ASC = "asc",
    DESC = "desc",
}

export interface GetOrdersQueryOptions {
    page?: number;
    priceFilter?: PriceFilter;
}
