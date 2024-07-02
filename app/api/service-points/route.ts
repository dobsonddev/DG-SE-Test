import { NextResponse } from 'next/server';
import axios from 'axios';

const API_KEY = process.env.API_KEY;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const countryCode = searchParams.get('countryCode');
    const city = searchParams.get('city');
    const radius = searchParams.get('radius') || 5000; // Default radius if not provided

    if (!countryCode || !city) {
        return NextResponse.json({ status: 400, title: 'Bad Request', detail: 'CountryCode and city are required parameters' }, { status: 400 });
    }

    try {
        const response = await axios.get(
            `https://api.dhl.com/location-finder/v1/find-by-address`,
            {
                params: { countryCode, addressLocality: city, radius },
                headers: {
                    'DHL-API-Key': API_KEY,
                },
            }
        );

        // Debugging log: Print the entire response object
        console.log('Received response from DHL API:', JSON.stringify(response.data, null, 2));

        return NextResponse.json(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status || 500;
            const title = error.response?.data.title || 'Error';
            const detail = error.response?.data.detail || 'Error fetching service points';
            return NextResponse.json({ status, title, detail }, { status });
        }
        return NextResponse.json({ status: 500, title: 'Error', detail: 'An unexpected error occurred' }, { status: 500 });
    }
}
