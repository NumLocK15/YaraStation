# -*- encoding: utf-8 -*-

from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include  # add this

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),          # Django admin route
    path('yara_parser/', include('yara_parser.urls', namespace='yara_parser')),       
    path('api/', include('api.urls')),      
    path("", include("authentication.urls")), # Auth routes - login / register
    path("", include("app.urls")),             # UI Kits Html files
]

## remove this section of you are running standalone without a docker 
if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT,
    )
##################################################################### 