<!DOCTYPE html>
<html class="transition-all duration-1000 scroll-smooth" lang="{{ str_replace('_', '-', app()->getLocale()) }}"
    dir="{{ app()->getLocale() === 'ar' ? 'rtl' : 'ltr' }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>

<head>
    <!-- Base Meta -->
    @if(!empty($page))
        @inertiaHead
    @endif

    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta property="og:url" content="{{ url()->current() }}" />
    <meta property="twitter:url" content="{{ url()->current() }}" />

    <meta charset="UTF-8" />
    <meta name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <!-- Base Meta -->

    <!-- Favicon -->
    <meta property="og:image" content="{{ asset('build/apple-touch-icon-180x180.png') }}" />
    <meta property="twitter:image" content="{{ asset('build/apple-touch-icon-180x180.png') }}" />
    <link rel="icon" href="{{ asset('build/favicon.ico') }}" sizes="any">
    <link rel="icon" href="{{ asset('build/favicon-32x32.png') }}" type="image/png">
    <link rel="apple-touch-icon" href="{{ asset('build/apple-touch-icon-180x180.png') }}">
    <!-- Favicon -->

    <!-- PWA Meta -->
    <link rel="manifest" href="{{ asset('build/manifest.webmanifest') }}">
    <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
    <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />

    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="{{ env('APP_NAME') }}">
    <!-- PWA Meta -->

    <!-- Assets -->

    {{-- Inline script to detect system dark mode preference and apply it immediately --}}
    <script>
        (function () {
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
    @vite(['resources/js/app.ts', "resources/js/pages/{$page['component']}.vue"])
    <!-- Assets -->
</head>

<body class="font-sans antialiased bg-light dark:bg-dark">
    @if(!empty($page))
        @inertia
    @endif
    <!-- OR -->
    @yield('slot')

    <NoScript>
        <div class="fixed top-16 ltr:left-0 rtl:right-0 z-1000 w-full h-full">
            <p class="text-sm text-center ltr:hidden">يرجى تشغيل محرك الجافاسكربت ليعمل الموقع بنجاح.</p>
            <p class="text-sm text-center rtl:hidden">Please enable the JavaScript to run successfully.</p>
        </div>
    </NoScript>
</body>

</html>