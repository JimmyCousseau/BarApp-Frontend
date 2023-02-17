export interface Order {
    id?: number
    date: Date
    name: string
    waiter: string
    table_id: number
    amount: number
    unit_price: number
    state: string
    note: string
}
