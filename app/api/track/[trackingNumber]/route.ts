import { NextResponse } from 'next/server';
import axios from 'axios';

const API_KEY = process.env.API_KEY;

export async function GET(request: Request, { params }: { params: { trackingNumber: string } }) {
    const { trackingNumber } = params;

    try {
        const response = await axios.get(
            `https://api-eu.dhl.com/track/shipments?trackingNumber=${trackingNumber}`,
            {
                headers: {
                    'DHL-API-Key': API_KEY,
                },
            }
        );

        // console.log('Received response from DHL API:', JSON.stringify(response.data, null, 2));

        const trackingData = response.data.shipments[0];
        return NextResponse.json(trackingData);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status || 500;
            const title = error.response?.data.title || 'Error';
            const detail = error.response?.data.detail || 'Error fetching tracking information';
            return NextResponse.json({ status, title, detail }, { status });
        }
        return NextResponse.json({ status: 500, title: 'Error', detail: 'An unexpected error occurred' }, { status: 500 });
    }
}
