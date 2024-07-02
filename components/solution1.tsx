"use client";
import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const dummyContent = [
    {
        title: "Task 1 - DHL API `Shipment Tracking-Unified` Implementation",
        description: `
### Overview
This component allows users to track DHL shipments using the \`Shipment Tracking-Unified\` API. Users can input a tracking number to retrieve the latest tracking event for a shipment. The implementation includes error handling to show detailed error messages to the user.

### Example Usage
1. Enter tracking number: \`777777777\`
2. Click ‘Track’

### Features
- **Input Field**: Allows users to enter a tracking number.
- **Track Button**: Initiates the tracking process.
- **Loading Indicator**: Shows a loading spinner while fetching data.
- **Error Handling**: Displays detailed error messages in case of failed requests.
- **Tracking Details**: Shows the latest tracking event for the entered tracking number.

### Functionality
1. **Fetch Tracking Information**:
    - Makes an API request to \`/api/track/[trackingNumber]\`.
    - Displays the last tracking event if successful.
    - Shows a detailed error message if the request fails.

2. **Error Handling**:
    - Captures and displays error messages with status code, title, and detailed description.

### Usage
1. **Enter a tracking number** in the input field.
2. **Click the 'Track' button** to fetch tracking details.
3. **View the latest tracking event** or any error messages.
        `
    }
];

interface TrackingEvent {
    timestamp: string;
    location: {
        address: {
            addressLocality: string;
            countryCode: string | null;
        };
    };
    statusCode: string;
    status: string;
    description: string;
}

interface ShipmentDetails {
    id: string;
    service: string;
    status: TrackingEvent;
    details: {
        product: {
            productName: string;
        } | null;
        references: {
            number: string;
            type: string;
        }[];
    } | null;
    events: TrackingEvent[];
}

const formatDateTime = (dateTime: string) => new Date(dateTime).toLocaleString();

export const Solution1 = () => {
    const [trackingNumber, setTrackingNumber] = useState("777777777");
    const [shipment, setShipment] = useState<ShipmentDetails | null>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchTrackingInfo = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await axios.get(`/api/track/${trackingNumber}`);
            setShipment(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const status = error.response?.data.status;
                const title = error.response?.data.title;
                const detail = error.response?.data.detail;
                setError(`Status ${status}: ${title} - ${detail}`);
            } else {
                setError("An unexpected error occurred");
            }
            setShipment(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl dark:bg-neutral-800 p-2 rounded backdrop-blur-lg mx-auto antialiased pt-2 relative">
            {dummyContent.map((item, index) => (
                <div key={`content-${index}`} className="mb-20 rounded-md p-4">
                    <div className="flex flex-row items-center space-x-4 pb-4">
                        <h2 className="bg-black text-white dark:bg-white dark:text-black rounded-full text-lg w-fit px-4 py-1">
                            {item.title}
                        </h2>
                    </div>
                    <div className="my-10 dark:bg-neutral-700 backdrop-blur-lg p-6 rounded">
                        <input
                            type="text"
                            placeholder="Enter tracking number"
                            value={trackingNumber}
                            onChange={(e) => setTrackingNumber(e.target.value)}
                            className="border text-neutral-600 border-gray-400 p-2 rounded w-full mb-4"
                        />
                        <button
                            onClick={fetchTrackingInfo}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="flex items-center">
                                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C6.477 0 0 6.477 0 12h4z"
                                        ></path>
                                    </svg>
                                    Loading...
                                </div>
                            ) : (
                                "Track"
                            )}
                        </button>
                        {error && <p className="mt-4 text-red-500">{error}</p>}
                        {shipment && (
                            <div className="mt-4 bg-gray-100 dark:bg-neutral-700 p-4 rounded">
                                <h3 className="text-lg font-semibold">Tracking Information</h3>
                                <div className="mt-4">
                                    <h4 className="text-md font-semibold">Latest Tracking Event</h4>
                                    <p>Status: {shipment.status?.status || "Unknown"}</p>
                                    <p>Description: {shipment.status?.description || "No description"}</p>
                                    <p>Timestamp: {shipment.status?.timestamp ? formatDateTime(shipment.status.timestamp) : "Unknown"}</p>
                                </div>
                                <div className="mt-4">
                                    <h4 className="text-md font-semibold">Product Details</h4>
                                    {shipment.details?.product ? (
                                        <p>Product Name: {shipment.details.product.productName}</p>
                                    ) : (
                                        <p>Product details not available</p>
                                    )}
                                </div>
                                <div className="mt-4">
                                    <h4 className="text-md font-semibold">References</h4>
                                    {shipment.details?.references?.length ? (
                                        shipment.details.references.map((ref, idx) => (
                                            <p key={idx}>
                                                {ref.type}: {ref.number}
                                            </p>
                                        ))
                                    ) : (
                                        <p>No references available</p>
                                    )}
                                </div>
                                <div className="mt-4">
                                    <h4 className="text-md font-semibold">Event History</h4>
                                    {shipment.events?.length ? (
                                        shipment.events.map((event, idx) => (
                                            <div key={idx} className="mb-2 p-2 border rounded">
                                                <p>Status: {event.status}</p>
                                                <p>Description: {event.description}</p>
                                                <p>Timestamp: {formatDateTime(event.timestamp)}</p>
                                                <p>Location: {event.location?.address?.addressLocality || "Unknown"}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No events available</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="text-sm prose prose-sm dark:prose-invert">
                        <ReactMarkdown>{item.description}</ReactMarkdown>
                    </div>
                </div>
            ))}
        </div>
    );
};
