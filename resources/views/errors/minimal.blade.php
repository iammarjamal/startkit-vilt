@php $title = $__env->yieldContent('code'); @endphp
@extends('app')

@section('slot')
<div class="m-auto flex h-full min-h-screen w-full flex-col items-center justify-center gap-2">
    <div class="flex h-full min-h-screen flex-col place-content-center items-center justify-center px-4">
        <div class="flex w-full flex-col items-center justify-center gap-y-2">
            <h1 class="text-[7rem] leading-tight font-bold">@yield('code')</h1>

            <span class="font-medium">{{ __('error.' . $exception->getStatusCode() . '.title') }}</span>

            <p class="text-center text-muted-foreground">
                {{ __('error.' . $exception->getStatusCode() . '.desc') }}
            </p>
        </div>
        <div class="mt-6 flex gap-x-4">
            <a
                href="{{ route('home.index') }}"
                class="inline-flex h-9 cursor-pointer items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium whitespace-nowrap text-primary-foreground shadow transition-all duration-300 hover:bg-primary/90 hover:opacity-70 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50">
                {{ __('error.home') }}
            </a>

            <button
                onclick="window.history.back()"
                class="inline-flex h-9 cursor-pointer items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium whitespace-nowrap shadow-sm transition-all hover:bg-accent hover:text-accent-foreground hover:opacity-70 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50">
                {{ __('error.back') }}
            </button>
        </div>
    </div>
</div>
@endsection
