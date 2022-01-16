# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from django.urls import path, re_path
from app import views

urlpatterns = [

    # The home page
    path('', views.index, name='home'),
    path('scan_list/', views.scan_list, name= "scan_list"),
    path('single_scan/', views.single_scan, name= "single_scan"),
    path('alert_list/', views.alert_list, name= "alert_list"),
    path('get_reasons/', views.get_reasons, name= "get_reasons"),
    path('client_managment/', views.client_managment, name= "client_managment"), 
    path('scan_polcies/', views.scan_polcies, name= "scan_polcies"),
    path('download_file/', views.download_file, name= "download_file"),
    path('main_dashboard/', views.main_dashboard, name= "main_dashboard"),
    path('main_dashboard_entity/', views.main_dashboard_entity, name= "main_dashboard_entity"),
        
    # Matches any html file
    re_path(r'^.*\.*', views.pages, name='pages'),

]
