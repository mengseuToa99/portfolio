import { useState, useEffect } from 'react';

export interface DeviceDetection {
    isSmallMobile: boolean;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
}

export function useDeviceDetection(): DeviceDetection {
    const [deviceState, setDeviceState] = useState<DeviceDetection>({
        isSmallMobile: false,
        isMobile: false,
        isTablet: false,
        isDesktop: true,
    });

    useEffect(() => {
        const checkDevice = () => {
            const width = window.innerWidth;
            setDeviceState({
                isSmallMobile: width < 480,
                isMobile: width < 768,
                isTablet: width >= 768 && width < 1024,
                isDesktop: width >= 1024,
            });
        };

        checkDevice();
        window.addEventListener('resize', checkDevice);
        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    return deviceState;
}