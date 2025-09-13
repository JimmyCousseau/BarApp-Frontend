export interface Products {
    _id: number;
    name: string;
    price_sold: number;
    price_bought: number;
    section: string | null;
    amount: number;
    need_preparation: boolean;
}
