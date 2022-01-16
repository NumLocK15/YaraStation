from django.urls import path
from . import views

# URLConf
app_name="yara_parser"

urlpatterns = [
    # path('upload/', views.yara_parser),
    path('submit_upload/', views.submit_upload, name= "submit_upload"),
    path('file_upload/', views.yara_parser, name= "file_upload"),
    path('add_entity/', views.add_entity, name= "add_entity"),
    path('heart_beat/', views.heart_beat, name= "heart_beat"),
    path('upload_agent_results/', views.upload_agent_results, name= "upload_agent_results")
]
