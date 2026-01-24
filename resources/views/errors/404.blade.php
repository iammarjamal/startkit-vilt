@extends('errors::layout')

@section('code', '404')
@section('title', app()->getLocale() == 'ar' ? 'الصفحة غير موجودة' : 'Page Not Found')
@section('description', app()->getLocale() == 'ar' ? 'عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.' : 'Sorry, the page you are looking for does not exist or has been moved.')
