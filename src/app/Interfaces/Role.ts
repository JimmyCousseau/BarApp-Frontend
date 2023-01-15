export interface Role {
    role: string;
    access_menu: boolean;
    access_orders: boolean;
    access_checkout: boolean;
    access_history: boolean;
    access_administration_panel: boolean;
    access_statistics: boolean;
    access_kitchen: boolean;
}

export enum Permission {
    ACCESS_MENU = "access_menu",
    ACCESS_ORDERS = "access_orders",
    ACCESS_CHECKOUT = "access_checkout",
    ACCESS_HISTORY = "access_history",
    ACCESS_ADMIN_PANEL = "access_administration_panel",
    ACCESS_STATISTICS = "access_statistics",
    ACCESS_KITCHEN = "access_kitchen",
}
