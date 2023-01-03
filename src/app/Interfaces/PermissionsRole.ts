export interface PermissionsRole {
    role_id: number;

    can_access_menu?: boolean;
    can_access_orders?: boolean;
    can_access_checkout?: boolean;
    can_access_history?: boolean;
    can_access_administration_panel?: boolean;
    can_access_statistics?: boolean;
    can_access_kitchen?: boolean;
}
