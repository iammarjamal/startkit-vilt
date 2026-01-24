@extends('errors::layout')

@section('code', '403')
@section('title', app()->getLocale() == 'ar' ? 'محظور' : 'Forbidden')
@section('description', app()->getLocale() == 'ar' ? 'عذراً، ليس لديك صلاحية الوصول إلى هذا المحتوى.' : 'Sorry, you do not have permission to access this content.')
