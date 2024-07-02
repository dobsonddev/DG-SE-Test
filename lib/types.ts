// types.ts
export interface Address {
    addressLocality: string;
    countryCode: string | null;
}

export interface Location {
    address: Address;
}

export interface Event {
    timestamp: string;
    location: Location;
    statusCode: string;
    status: string;
    description: string;
}

export interface Reference {
    number: string;
    type: string;
}

export interface Details {
    product: {
        productName: string;
    };
    references: Reference[];
}

export interface Status {
    timestamp: string;
    location: Location;
    statusCode: string;
    status: string;
    description: string;
}

export interface Shipment {
    id: string;
    service: string;
    status: Status;
    details: Details;
    events: Event[];
}

export interface ApiResponse {
    shipments: Shipment[];
}
