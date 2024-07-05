This is a [Next.js](https://nextjs.org/) project.

## [Live Demo + Explanation Here](https://dg-se-test.vercel.app/) (click)

## Quick overview

Within the repo, the API functions are defined at the below routes:
- Task 1: `.../app/api/track/[trackingNumber]/route.ts`
- Task 2: `.../app/api/service-points/route.ts`

These functions (both GET api calls), are being implemented and called in the below React components, respectively:
- Task 1: `.../components/solution1.tsx`
- Task2: `.../components/solution2.tsx`



## Local Run Instructions

To run locally, 
1. Create your own `.env.local` file
2. Copy the contents of `env.example` into it
3. Crete an `App` here [DHL API key here](https://developer.dhl.com/), this will generate an API key for you
4. Replace the `your-api-key-here` value in your `.env.local` file with it
5. In this same developer portal, sign up for both of the below APIs. This will allow DHL's system to authenticate and authorize your requests by seeing that your API Key has permissions to these endpoints:
  1. `Location Finder - Unified`
  2. [`Shipment Tracking - Unified`](https://developer.dhl.com/api-reference/shipment-tracking)
6. Execute the following commands in this project's root directory, in your terminal:
   
```bash
npm install
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
