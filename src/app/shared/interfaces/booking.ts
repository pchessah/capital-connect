
export interface CreateBookingRequest {
    calendlyEventId: string;
}

export interface CreateBookingResponse {
    bookingId: number;
    orderTrackingId: string;
    redirectUrl: string;
    paymentId: number;
}


export interface Payment {
    id: number;
    currency: string;
    amount: number;
    description: string;
    status: 'initiated' | 'completed' | 'failed'; 
    orderTrackingId: string;
    createdAt: string; 
    updatedAt: string; 
  }

  export interface Booking {
    id: number;
    calendlyEventId: string;
    createdAt: string; 
    updatedAt: string; 
    payments: Payment[];
  }