"use client";
import React, { useState } from "react";
import axios from 'axios';
import { TracingBeam } from "./ui/tracing-beam";
import ReactMarkdown from "react-markdown";

const dummyContent = [
    {
        title: "Task 2 - DHL API `Location Finder-Unified` Implementation",
        description: `
### Overview
This component allows users to find DHL service points within a specified radius around a given city. Users can input a country code, city name, and an optional radius to search for service points.

### Example Usage
1. Enter country code: \`DE\`
2. Enter city name: \`Berlin\`
3. Enter radius: \`2000\` (Optional. 5000 by default.)
4. Click 'Search'

### Features
- **Input Fields**: Allows users to enter the country code, city name, and radius.
- **Search Button**: Initiates the search process.
- **Loading Indicator**: Shows a loading spinner while fetching data.
- **Error Handling**: Displays detailed error messages in case of failed requests.
- **Service Point List**: Displays the retrieved service points with details.

### Functionality
1. **Fetch Service Points**:
    - Makes an API request to \`/api/service-points\` with the provided inputs.
    - Displays the list of service points if successful.
    - Shows a detailed error message if the request fails.

2. **Error Handling**:
    - Captures and displays error messages with status code, title, and detailed description.

### Usage
1. **Enter country code**, city name, and an optional radius in the input fields.
2. **Click the 'Search' button** to fetch service point details.
3. **View the list of service points** or any error messages.

        `,
        image: null
    }
];

interface ServicePoint {
    name: string;
    place: {
        address: {
            streetAddress: string;
            postalCode: string;
            addressLocality: string;
            countryCode: string;
        };
    };
    distance: number;
    openingHours: Array<{
        dayOfWeek: string;
        opens: string;
        closes: string;
    }>;
    serviceTypes: string[];
}

export const Solution2 = () => {
    const [countryCode, setCountryCode] = useState('DE');
    const [city, setCity] = useState('Berlin');
    const [radius, setRadius] = useState('2000');
    const [servicePoints, setServicePoints] = useState<ServicePoint[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const fetchServicePoints = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('/api/service-points', {
                params: { countryCode, city, radius },
            });
            setServicePoints(response.data.locations as ServicePoint[]);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const status = error.response?.data.status;
                const title = error.response?.data.title;
                const detail = error.response?.data.detail;
                setError(`Status ${status}: ${title} - ${detail}`);
            } else {
                setError('An unexpected error occurred');
            }
            setServicePoints([]);
        } finally {
            setLoading(false);
        }
    };

    const toggleDetails = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="max-w-2xl backdrop-blur-lg mx-auto antialiased pt-4 relative">
            {dummyContent.map((item, index) => (
                <div key={`content-${index}`} className="mb-20 rounded-md p-4">
                    <div className="flex flex-row items-center space-x-4 pb-4">
                        <h2 className="bg-black text-white dark:bg-white dark:text-black rounded-full text-md w-fit px-4 py-1">
                            {item.title}
                        </h2>
                    </div>
                    <div className="mb-6 py-10">
                        <input
                            type="text"
                            placeholder="Country Code"
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            className="border border-gray-400 p-2 rounded w-full mb-4"
                        />
                        <input
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="border border-gray-400 p-2 rounded w-full mb-4"
                        />
                        <input
                            type="text"
                            placeholder="Radius (optional)"
                            value={radius}
                            onChange={(e) => setRadius(e.target.value)}
                            className="border border-gray-400 p-2 rounded w-full mb-4"
                        />
                        <button
                            onClick={fetchServicePoints}
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
                                'Search'
                            )}
                        </button>
                        {error && <p className="mt-4 text-red-500">{error}</p>}
                        {servicePoints.length > 0 && (
                            <div className="mt-4 bg-gray-100 p-4 rounded">
                                <h3 className="text-lg font-semibold">Service Points (sorted: Nearest first)</h3>
                                <ul>
                                    {servicePoints.map((point, index) => (
                                        <li key={index}>
                                            <div
                                                className="cursor-pointer flex justify-between items-center"
                                                onClick={() => toggleDetails(index)}
                                            >
                                                <span>{point.name || 'Postbox'} - {point.place.address?.addressLocality}</span>
                                                <span>{expandedIndex === index ? '▲' : '▼'}</span>
                                            </div>
                                            {expandedIndex === index && (
                                                <div className="pl-4">
                                                    <p><strong>Address:</strong> {point.place.address.streetAddress}, {point.place.address.postalCode} {point.place.address.addressLocality}, {point.place.address.countryCode}</p>
                                                    <p><strong>Distance:</strong> {point.distance} meters</p>
                                                    <p><strong>Opening Hours:</strong></p>
                                                    <ul>
                                                        {point.openingHours.map((hours, idx) => {
                                                            const dayOfWeek = hours.dayOfWeek.split('/').pop(); // Extract the day name
                                                            return (
                                                                <li key={idx}>- {dayOfWeek}: {hours.opens} - {hours.closes}</li>
                                                            );
                                                        })}
                                                    </ul>

                                                    <p><strong>Service Types:</strong></p>
                                                    <ul>
                                                        {point.serviceTypes.map((type, idx) => (
                                                            <li key={idx}>- {type}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
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
