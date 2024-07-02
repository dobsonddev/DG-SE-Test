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
        <div className="fixed top-0 inset-x-0 z-50 w-full">
            <motion.nav
                initial={{
                    y: -80,
                    opacity: 0,
                }}
                animate={{
                    y: 0,
                    opacity: 1,
                }}
                transition={{
                    ease: [0.6, 0.05, 0.1, 0.9],
                    duration: 0.8,
                }}
                className="max-w-7xl mx-auto inset-x-0 w-[95%] lg:w-full"
            >
                <div className="hidden lg:block w-full">
                    <DesktopNavbar />
                </div>
                <div className="flex h-full w-full items-center lg:hidden">
                    <MobileNavbar />
                </div>
            </motion.nav>
        </div>
    );
}
