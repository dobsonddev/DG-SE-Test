"use client";

import React, { useState, ComponentType } from 'react';
import CustomCursor from './ui/custom-cursor';

interface WithCustomCursorProps {
}

const withCustomCursor = <P extends object>(WrappedComponent: ComponentType<P>) => {
    const HOC: React.FC<P & WithCustomCursorProps> = (props) => {
        const [cursorVisible, setCursorVisible] = useState(false);

        const handleMouseEnter = () => {
            setCursorVisible(true);
        };

        const handleMouseLeave = () => {
            setCursorVisible(false);
        };

        return (
            <div className={`relative ${cursorVisible ? 'hide-default-cursor' : ''}`} onMouseEnter={handleMouseEnter}
                 onMouseLeave={handleMouseLeave}>
                <CustomCursor isVisible={cursorVisible}/>
                <WrappedComponent {...props} />
            </div>
        );
    };

    return HOC;
};

export default withCustomCursor;
