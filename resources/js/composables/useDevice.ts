import { computed } from 'vue';
import { useMediaQuery } from '@vueuse/core';

export function useDevice() {
    const isMobile = useMediaQuery('(max-width: 767px)');
    const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
    const isDesktop = useMediaQuery('(min-width: 1024px)');

    const deviceType = computed(() => {
        if (isMobile.value) return 'mobile';
        if (isTablet.value) return 'tablet';
        return 'desktop';
    });

    // Operating System Detection
    const userAgent = navigator.userAgent;

    const isIOS = computed(() => /iPad|iPhone|iPod/.test(userAgent));
    const isAndroid = computed(() => /Android/.test(userAgent));
    const isWindows = computed(() => /Windows/.test(userAgent));
    const isMacOS = computed(() => /Mac OS X/.test(userAgent));
    const isLinux = computed(() => /Linux/.test(userAgent));

    // Browser Detection
    const isSafari = computed(() => /Safari/.test(userAgent) && !/Chrome/.test(userAgent));
    const isChrome = computed(() => /Chrome/.test(userAgent));
    const isFirefox = computed(() => /Firefox/.test(userAgent));
    const isEdge = computed(() => /Edg/.test(userAgent));

    return {
        isMobile,
        isTablet,
        isDesktop,
        deviceType,
        isIOS,
        isAndroid,
        isWindows,
        isMacOS,
        isLinux,
        isSafari,
        isChrome,
        isFirefox,
        isEdge,
    };
}
