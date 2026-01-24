<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}" dir="{{ app()->getLocale() == 'ar' ? 'rtl' : 'ltr' }}"
    x-data
    x-init="
        const appearance = localStorage.getItem('appearance');
        const isDark = appearance === 'dark' ||
            (appearance === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches) ||
            (!appearance && window.matchMedia('(prefers-color-scheme: dark)').matches);
        if (isDark) document.documentElement.classList.add('dark');
    ">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex, nofollow">

    <title>@yield('title') - {{ config('app.name') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=ibm-plex-sans-arabic:100,200,300,400,500,600,700" rel="stylesheet" />

    <!-- AlpineJS -->
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

    <style>
        :root {
            --background: oklch(1 0 0);
            --foreground: oklch(0.141 0.005 285.823);
            --muted-foreground: oklch(0.552 0.016 285.938);
            --primary: oklch(0.21 0.006 285.885);
            --primary-foreground: oklch(0.985 0 0);
            --secondary: oklch(0.967 0.001 286.375);
            --secondary-foreground: oklch(0.21 0.006 285.885);
            --border: oklch(0.92 0.004 286.32);
        }

        .dark {
            --background: oklch(0.141 0.005 285.823);
            --foreground: oklch(0.985 0 0);
            --muted-foreground: oklch(0.705 0.015 286.067);
            --primary: oklch(0.985 0 0);
            --primary-foreground: oklch(0.21 0.006 285.885);
            --secondary: oklch(0.274 0.006 286.033);
            --secondary-foreground: oklch(0.985 0 0);
            --border: oklch(0.274 0.006 286.033);
        }

        *, *::before, *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        html, body {
            font-family: 'IBM Plex Sans Arabic', ui-sans-serif, system-ui, sans-serif;
            background-color: var(--background);
            color: var(--foreground);
            min-height: 100vh;
            line-height: 1.5;
        }

        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 1.5rem;
            text-align: center;
        }

        .code {
            font-size: 6rem;
            font-weight: 700;
            line-height: 1;
            color: var(--muted-foreground);
            opacity: 0.5;
        }

        .title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-top: 1rem;
        }

        .message {
            font-size: 0.875rem;
            color: var(--muted-foreground);
            margin-top: 0.5rem;
            max-width: 24rem;
        }

        .actions {
            display: flex;
            gap: 0.75rem;
            margin-top: 2rem;
        }

        .btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
            font-weight: 500;
            border-radius: 0.375rem;
            text-decoration: none;
            cursor: pointer;
            border: none;
            transition: opacity 0.15s;
        }

        .btn-primary {
            background-color: var(--primary);
            color: var(--primary-foreground);
        }

        .btn-secondary {
            background-color: var(--secondary);
            color: var(--secondary-foreground);
            border: 1px solid var(--border);
        }

        .btn:hover { opacity: 0.8; }

        .icon {
            width: 1rem;
            height: 1rem;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="code">@yield('code')</div>
        <h1 class="title">@yield('title')</h1>
        <p class="message">@yield('description')</p>

        <div class="actions">
            <a type="button" href="{{ url('/') }}" class="btn btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                {{ app()->getLocale() == 'ar' ? 'الرئيسية' : 'Home' }}
            </a>
            <button type="button" onclick="history.back()" class="btn btn-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon" style="{{ app()->getLocale() == 'ar' ? 'transform: scaleX(-1);' : '' }}">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                {{ app()->getLocale() == 'ar' ? 'العودة' : 'Go Back' }}
            </button>
        </div>
    </div>
</body>
</html>
