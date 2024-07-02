"use client";
import { DesktopNavbar } from "./desktop-navbar";
import { MobileNavbar } from "./mobile-navbar";
import { motion } from "framer-motion";


const navItems = [
    {
        title: "Solutions",
        link: "/",
    },

];



export function NavBar() {

    return (
        <div className="fixed z-50 w-full">
                <div className="hidden lg:block w-full">
                    <DesktopNavbar />
                </div>
                <div className="flex h-full w-full items-center lg:hidden">
                    <MobileNavbar />
                </div>
        </div>
    );
}
