@extends('errors::layout')

@section('code', '402')
@section('title', app()->getLocale() == 'ar' ? 'الدفع مطلوب' : 'Payment Required')
@section('description', app()->getLocale() == 'ar' ? 'عذراً، يتطلب الوصول إلى هذه الصفحة اشتراكاً أو دفعاً.' : 'Sorry, access to this page requires a subscription or payment.')
