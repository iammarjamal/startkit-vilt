@extends('errors::layout')

@section('code', '419')
@section('title', app()->getLocale() == 'ar' ? 'انتهت الجلسة' : 'Page Expired')
@section('description', app()->getLocale() == 'ar' ? 'عذراً، انتهت صلاحية الجلسة. يرجى تحديث الصفحة والمحاولة مرة أخرى.' : 'Sorry, your session has expired. Please refresh the page and try again.')
