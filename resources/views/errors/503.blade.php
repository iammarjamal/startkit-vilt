@extends('errors::layout')

@section('code', '503')
@section('title', app()->getLocale() == 'ar' ? 'الخدمة غير متاحة' : 'Service Unavailable')
@section('description', app()->getLocale() == 'ar' ? 'عذراً، الموقع تحت الصيانة حالياً. يرجى العودة لاحقاً.' : 'Sorry, the site is currently under maintenance. Please check back later.')
