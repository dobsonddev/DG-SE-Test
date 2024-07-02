import type {Metadata} from "next";
import "./globals.css";
import {GeistSans} from "geist/font/sans";
import {cn} from "@/lib/utils";
import {ViewTransitions} from "next-view-transitions";
import {ThemeProvider} from "@/context/theme-provider";
import {NavBar} from "@/components/navbar";

export const metadata: Metadata = {
    title: "DHL API Test",
    description:
        "Leveraging DHL's \"Shipment Tracking-Unified\" API in order to receive shipment tracking information.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ViewTransitions>
            <html lang="en">
            <body
                className={cn(
                    GeistSans.className,
                    "bg-white dark:bg-black antialiased h-full w-full"
                )}
            >
            <ThemeProvider
                attribute="class"
                enableSystem
                disableTransitionOnChange
                defaultTheme="light"
            >
                <NavBar/>
                    {children}
            </ThemeProvider>
            </body>
            </html>
        </ViewTransitions>
    );
}
