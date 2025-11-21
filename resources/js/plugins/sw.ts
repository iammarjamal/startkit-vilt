/// <reference lib="webworker" />

const sw = self as unknown as ServiceWorkerGlobalScope & { registration: ServiceWorkerRegistration };

sw.skipWaiting();

const CACHE_NAME = 'static-cache-v1';

sw.addEventListener('install', (event) => {
    console.log('[SW] Installing...');
    event.waitUntil(Promise.resolve());
});

sw.addEventListener('activate', (event) => {
    event.waitUntil(
        (async () => {
            // Clean old caches
            const cacheNames = await caches.keys();
            await Promise.all(cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name)));

            if (sw.registration.navigationPreload) {
                await sw.registration.navigationPreload.enable();
            }
            await sw.clients.claim();

            console.log('[SW] Activated');
        })(),
    );
});

sw.addEventListener('fetch', (event: any) => {
    const { request } = event;

    // Ignore non-GET requests
    if (request.method !== 'GET') return;

    // Ignore chrome-extension, browser extensions, and other non-http(s) schemes
    const url = new URL(request.url);
    if (!url.protocol.startsWith('http')) return;

    // Handle navigation requests (pages)
    if (request.mode === 'navigate') {
        event.respondWith(
            (async () => {
                try {
                    const preloadResponse = await event.preloadResponse;
                    if (preloadResponse) {
                        return preloadResponse;
                    }

                    return await fetch(request);
                } catch (error) {
                    // Offline HTML page (auto-generated from offline.blade.php)
                    return new Response(
                        `<!DOCTYPE html>
<html lang="ar" dir="rtl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>لا يوجد اتصال بالإنترنت</title>
    <style>
        /* إعادة تعيين بسيطة */
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            /* ألوان داكنة رسمية */
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            color: #ffffff;
        }

        .container {
            text-align: center;
            max-width: 32rem;
            width: 100%;
        }

        .icon {
            font-size: 6rem;
            margin-bottom: 1.25rem;
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        h1 {
            font-size: 1.875rem;
            font-weight: 700;
            margin-bottom: 1rem;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        p {
            font-size: 1.125rem;
            margin-bottom: 2rem;
            opacity: 0.9;
            line-height: 1.625;
            color: #cbd5e1;
        }

        .retry-btn {
            background-color: #ffffff;
            color: #0f172a;
            border: none;
            padding: 14px 32px;
            font-size: 1rem;
            font-weight: 600;
            border-radius: 0.5rem;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .retry-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            background-color: #f8fafc;
        }

        .retry-btn:active {
            transform: translateY(0);
        }

        .footer-text {
            margin-top: 1.5rem;
            font-size: 0.875rem;
            opacity: 0.7;
            color: #94a3b8;
        }

        @keyframes pulse {

            0%,
            100% {
                opacity: 1;
            }

            50% {
                opacity: .5;
            }
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="icon">📡</div>
        <h1 id="main-title">لا يوجد اتصال بالإنترنت</h1>
        <p id="description">يبدو أنك غير متصل بالإنترنت. يرجى التحقق من اتصالك والمحاولة مرة أخرى.</p>

        <button onclick="window.location.reload()" class="retry-btn" id="retry-btn">
            إعادة المحاولة
        </button>

        <div class="footer-text" id="footer-text">
            سيتم إعادة الاتصال تلقائياً عند توفر الإنترنت
        </div>
    </div>

    <script>
        (function() {
            // نصوص الترجمة
            const translations = {
                ar: {
                    pageTitle: "لا يوجد اتصال بالإنترنت",
                    title: "لا يوجد اتصال بالإنترنت",
                    desc: "يبدو أنك غير متصل بالإنترنت. يرجى التحقق من اتصالك والمحاولة مرة أخرى.",
                    btn: "إعادة المحاولة",
                    footer: "سيتم إعادة الاتصال تلقائياً عند توفر الإنترنت"
                },
                en: {
                    pageTitle: "No Internet Connection",
                    title: "No Internet Connection",
                    desc: "It seems you are offline. Please check your network connection and try again.",
                    btn: "Try Again",
                    footer: "Connection will be restored automatically when available"
                }
            };

            // اكتشاف لغة المتصفح
            // إذا كانت اللغة تبدأ بـ "ar" نعتبرها عربية، وإلا نعتبرها إنجليزية
            const userLang = navigator.language || navigator.userLanguage;
            const isArabic = userLang.startsWith('ar');
            const currentLang = isArabic ? 'ar' : 'en';
            const content = translations[currentLang];

            // تطبيق الإعدادات
            document.documentElement.lang = currentLang;
            document.documentElement.dir = isArabic ? 'rtl' : 'ltr';

            // تحديث النصوص
            document.title = content.pageTitle;
            document.getElementById('main-title').textContent = content.title;
            document.getElementById('description').textContent = content.desc;
            document.getElementById('retry-btn').textContent = content.btn;
            document.getElementById('footer-text').textContent = content.footer;
        })();
    </script>
</body>
</html>`,
                        {
                            headers: { 'Content-Type': 'text/html; charset=utf-8' },
                            status: 503,
                            statusText: 'Service Unavailable',
                        },
                    );
                }
            })(),
        );
    }
});
