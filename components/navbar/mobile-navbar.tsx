"use client";
import { ModeToggle } from "../mode-toggle";
import { IconBrandGithub } from '@tabler/icons-react';

export const MobileNavbar = () => {
    return (
        <div className="flex flex-col space-y-1 items-center fixed top-3 right-0 z-50">
            <ModeToggle/>
            <a href="https://github.com/dobsonddev/DG-SE-Test" target="_blank" rel="noopener noreferrer">
                <IconBrandGithub stroke={2}/>
            </a>
        </div>
    );
};
