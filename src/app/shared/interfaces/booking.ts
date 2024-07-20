
export interface CreateBookingRequest {
    calendlyEventId: string;
}

export interface CreateBookingResponse {
    bookingId: number;
    orderTrackingId: string;
    redirectUrl: string;
    paymentId: number;
}
