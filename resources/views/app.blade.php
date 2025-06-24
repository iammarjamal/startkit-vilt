<!DOCTYPE html>
<html class="transition-all duration-500 scroll-smooth" lang="{{ str_replace('_', '-', app()->getLocale()) }}" dir="{{ app()->getLocale() === 'ar' ? 'rtl' : 'ltr' }}" @class(['dark'=> ($appearance ?? 'system') == 'dark'])>

<head>
    <!-- Base Meta -->
    @inertiaHead

    <meta property="og:image" content="{{ request()->getSchemeAndHttpHost() }}/assets/images/icons/icon.webp" />
    <meta property="og:type" content="website" />
    <meta property="twitter:image" content="{{ request()->getSchemeAndHttpHost() }}/assets/images/icons/icon.webp" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta property="og:url" content="{{ url()->current() }}" />
    <meta property="twitter:url" content="{{ url()->current() }}" />

    <meta charset="UTF-8" />
    <meta name="viewport"
        content="initial-scale=1, maximum-scale=5, minimum-scale=1, width=device-width" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <!-- Meta -->

    <!-- Favicon -->
    <link rel="apple-touch-icon" href="{{ request()->getSchemeAndHttpHost() }}/assets/images/icons/icon.webp" />
    <link rel="apple-touch-icon" sizes="57x57" href="{{ request()->getSchemeAndHttpHost() }}/assets/images/icons/icon.webp" />
    <link rel="apple-touch-icon" sizes="60x60" href="{{ request()->getSchemeAndHttpHost() }}/assets/images/icons/icon.webp" />
    <link rel="apple-touch-icon" sizes="72x72" href="{{ request()->getSchemeAndHttpHost() }}/assets/images/icons/icon.webp" />
    <link rel="apple-touch-icon" sizes="76x76" href="{{ request()->getSchemeAndHttpHost() }}/assets/images/icons/icon.webp" />
    <link rel="apple-touch-icon" sizes="114x114" href="{{ request()->getSchemeAndHttpHost() }}/assets/images/icons/icon.webp" />
    <link rel="apple-touch-icon" sizes="120x120" href="{{ request()->getSchemeAndHttpHost() }}/assets/images/icons/icon.webp" />
    <link rel="apple-touch-icon" sizes="144x144" href="{{ request()->getSchemeAndHttpHost() }}/assets/images/icons/icon.webp" />
    <link rel="apple-touch-icon" sizes="152x152" href="{{ request()->getSchemeAndHttpHost() }}/assets/images/icons/icon.webp" />
    <link rel="apple-touch-icon" sizes="180x180" href="{{ request()->getSchemeAndHttpHost() }}/assets/images/icons/icon.webp" />

    <link rel="icon" type="image/png" sizes="192x192" href="{{ request()->getSchemeAndHttpHost() }}/assets/images/icons/icon.webp" />
    <link rel="icon" type="image/png" sizes="32x32" href="{{ request()->getSchemeAndHttpHost() }}/assets/images/icons/icon.webp" />
    <link rel="icon" type="image/png" sizes="96x96" href="{{ request()->getSchemeAndHttpHost() }}/assets/images/icons/icon.webp" />
    <link rel="icon" type="image/png" sizes="16x16" href="{{ request()->getSchemeAndHttpHost() }}/assets/images/icons/icon.webp" />

    <link rel="shortcut icon" href="{{ request()->getSchemeAndHttpHost() }}/assets/images/icons/icon.webp" />
    <!-- Favicon -->

    <!-- Assets -->

    {{-- Inline script to detect system dark mode preference and apply it immediately --}}
    <script>
        (function() {
            const appearance = '{{ $appearance ?? "system" }}';

            if (appearance === 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                if (prefersDark) {
                    document.documentElement.classList.add('dark');
                }
            }
        })();
    </script>

    {{-- Inline style to set the HTML background color based on our theme in app.css --}}
    <style>
        html {
            background-color: oklch(1 0 0);
        }

        html.dark {
            background-color: oklch(0.145 0 0);
        }
    </style>
    @routes
    @vite(['resources/css/app.css', 'resources/js/app.ts'])
    @laravelPWA
    <!-- Assets -->
</head>

<body class="bg-light dark:bg-dark">
    @inertia
    <!-- OR -->
    @yield('slot')

    <NoScript>
        <div class="fixed top-16 ltr:left-0 rtl:right-0 z-[1000] w-full h-full">
            <p class="text-sm text-center ltr:hidden">يرجى تشغيل محرك الجافاسكربت ليعمل الموقع بنجاح.</p>
            <p class="text-sm text-center rtl:hidden">Please enable the JavaScript to run successfully.</p>
        </div>
    </NoScript>
</body>

</html>
