# myapi/urls.py
from django.urls import include, path
from rest_framework.authtoken import views
from . import views as main_view


urlpatterns = [
    path('agent_upload/', main_view.api_upload_agent_results, name="agent_upload"),
    path('heartbeat/', main_view.api_heartbeat, name="heartbeat"),
    path('download_policy/', main_view.download_policy, name="download_policy"),
    path('api-token-auth/', views.obtain_auth_token)
]