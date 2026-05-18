export interface addresses {
    status:  string;
    message: string;
    data:    product[];
}

export interface product {
    _id:     string;
    name:    string;
    details: string;
    phone:   string;
    city:    string;
}
