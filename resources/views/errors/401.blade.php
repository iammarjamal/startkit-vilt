@extends('errors::layout')

@section('code', '401')
@section('title', app()->getLocale() == 'ar' ? 'غير مصرح' : 'Unauthorized')
@section('description', app()->getLocale() == 'ar' ? 'عذراً، ليس لديك صلاحية الوصول إلى هذه الصفحة. يرجى تسجيل الدخول للمتابعة.' : 'Sorry, you are not authorized to access this page. Please log in to continue.')
