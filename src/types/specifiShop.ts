export interface Product {
    data: ProductDetails;
}

export interface ProductDetails {
    sold:            number;
    images:          string[];
    subcategory:     Brand[];
    ratingsQuantity: number;
    _id:             string;
    title:           string;
    slug:            string;
    description:     string;
    quantity:        number;
    price:           number;
    imageCover:      string;
    category:        Brand;
    brand:           Brand;
    ratingsAverage:  number;
    createdAt:       Date;
    updatedAt:       Date;
    __v:             number;
    reviews:         Review[];
    id:              string;
}

export interface Brand {
    _id:       string;
    name:      string;
    slug:      string;
    image?:    string;
    category?: string;
}

export interface Review {
    _id:       string;
    review:    string;
    rating:    number;
    product:   string;
    user:      User;
    createdAt: Date;
    updatedAt: Date;
    __v:       number;
}

export interface User {
    _id:  string;
    name: string;
}
