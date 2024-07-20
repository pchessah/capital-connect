export interface AuthResponse {
    token: string;
    expiryDate: string;
}

export interface OrderRequest {
    id: string;
    currency: string;
    amount: number;
    description: string;
    callback_url: string;
    notification_id: string;
    branch?: string;
    billing_address: {
        phone_number?: string;
        email_address?: string;
        country_code?: string;
        first_name?: string;
        middle_name?: string;
        last_name?: string;
        line_1?: string;
        line_2?: string;
        city?: string;
        state?: string;
        postal_code?: string;
        zip_code?: string;
    };
}

export interface TransactionStatus {
    payment_method: string;
    amount: number;
    created_date: string;
    confirmation_code: string;
    payment_status_description: string;
    description: string;
    message: string;
    payment_account: string;
    call_back_url: string;
    status_code: number;
    merchant_reference: string;
    currency: string;
    status: string;
}

export interface OrderCancellation {
    order_tracking_id: string;
}

export interface RefundRequest {
    confirmation_code: string;
    amount: number;
    username: string;
    remarks: string;
}

export interface IPNRegistration {
    url: string;
    ipn_notification_type: string;
}
