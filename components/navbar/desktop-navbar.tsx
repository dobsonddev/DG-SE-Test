"use client";
import {ModeToggle} from "../mode-toggle";
import {IconBrandGithub} from '@tabler/icons-react';

export const DesktopNavbar = () => {
    return (
        <div className="flex flex-row space-x-2 items-center fixed top-10 right-72 z-50">
            <div
                className="w-10 h-10 flex hover:bg-gray-50 dark:hover:bg-white/[0.1] rounded-lg items-center justify-center outline-none focus:ring-0 focus:outline-none active:ring-0 active:outline-none overflow-hidden"
            >
                <a href="https://github.com/dobsonddev/DG-SE-Test" target="_blank" rel="noopener noreferrer">
                    <IconBrandGithub stroke={2}/>
                </a>
            </div>
            <ModeToggle/>
        </div>
    );
};