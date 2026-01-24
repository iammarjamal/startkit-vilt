@extends('errors::layout')

@section('code', '429')
@section('title', app()->getLocale() == 'ar' ? 'طلبات كثيرة' : 'Too Many Requests')
@section('description', app()->getLocale() == 'ar' ? 'عذراً، لقد أرسلت طلبات كثيرة. يرجى الانتظار قليلاً ثم المحاولة مرة أخرى.' : 'Sorry, you have sent too many requests. Please wait a moment and try again.')
