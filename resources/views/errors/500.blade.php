@extends('errors::layout')

@section('code', '500')
@section('title', app()->getLocale() == 'ar' ? 'خطأ في الخادم' : 'Server Error')
@section('description', app()->getLocale() == 'ar' ? 'عذراً، حدث خطأ في الخادم. نعمل على إصلاحه في أقرب وقت.' : 'Sorry, something went wrong on our end. We are working to fix it as soon as possible.')
