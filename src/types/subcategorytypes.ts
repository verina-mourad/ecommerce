export interface category {
    results:  number;
    metadata: Metadata;
    data:     subcategories[];
}

export interface subcategories {
    _id:       string;
    name:      string;
    slug:      string;
    category:  Category;
    createdAt: Date;
    updatedAt: Date;
}

export enum Category {
    The6439D2F467D9Aa4Ca97064A8 = "6439d2f467d9aa4ca97064a8",
}

export interface Metadata {
    currentPage:   number;
    numberOfPages: number;
    limit:         number;
}
