import { onBeforeMount, onMounted, onBeforeUnmount } from 'vue';
import { initializeTheme } from './useAppearance';

export interface LifeCycleOptions {
    /** Called before component is mounted */
    onBeforeMount?: () => void | Promise<void>;
    /** Called when component is mounted */
    onMount?: () => void | Promise<void>;
    /** Called before component is unmounted */
    onBeforeUnmount?: () => void | Promise<void>;
}

/**
 * Composable for managing component lifecycle with theme initialization
 * Ensures theme is properly applied during SSR and CSR
 */
export function useLifeCycle(options: LifeCycleOptions = {}) {
    // Before mount - initialize theme early
    onBeforeMount(async () => {
        // Initialize theme before DOM is ready
        if (typeof window !== 'undefined') {
            initializeTheme();
        }

        // Call custom beforeMount handler
        await options.onBeforeMount?.();
    });

    // On mount - setup observers and finalize initialization
    onMounted(async () => {
        // Ensure theme is applied after hydration
        if (typeof window !== 'undefined') {
            initializeTheme();
        }

        // Call custom mount handler
        await options.onMount?.();
    });

    // Before unmount - cleanup
    onBeforeUnmount(async () => {
        // Call custom beforeUnmount handler
        await options.onBeforeUnmount?.();
    });
}

/**
 * Initialize app lifecycle (call once in app.ts)
 * Sets up theme before Vue app is created
 */
export function initializeAppLifeCycle() {
    if (typeof window !== 'undefined') {
        // Initialize theme immediately when script loads
        initializeTheme();
    }
}

export default useLifeCycle;
