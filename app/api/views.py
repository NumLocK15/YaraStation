from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from yara_parser import models, views
import base64

from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from django.views.static import serve 
import os

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_upload_agent_results(request):
    
    if request.method == 'POST':
        print('<< Starting upload from Agent >>')
        
        #intitlizing data
        content = base64.b64decode(request.POST.get('results'))
        sc_scan = request.POST.get('sc_scan')
        entity = request.POST.get('entity')
        mac_add = request.POST.get('mac_add')
        
        if (not content or not sc_scan or not entity or not mac_add):
            print('!! wrong arguments !!')
            return Response ("wrong arguments !! ")

        try:
            #upload the results
            views.parse_txt (content, entity, sc_scan, request)

            # change the status of the scan 
            schedualled_jobs =  models.schedualled_scan.objects.filter(target_mac=mac_add).update(status='Completed')
        except:
            return Response ("Upload failed... please report the issue in the github page ")

        return Response ("Upload Sucess")

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_heartbeat(request):

    if request.method == 'POST':
        print('<< Heartbeat recived>>')

        #intitlizing data
        mac_add = request.POST.get('mac_add')
        ip_add = request.POST.get('ip_add')
        host_name = request.POST.get('host_name')
        os = request.POST.get('os')
        status = request.POST.get('status')

        if (not mac_add or not ip_add or not host_name or not os or not status):
            print('!! wrong arguments !!')
            return Response ("wrong arguments !! ")
        
        try:
            response = views.heart_beat(mac_add, ip_add,host_name, os, status)
            
        except:
            return Response ("Heartbeat failed ... ")

        return Response ("Hearbeat success: " + str(response)) 

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def download_policy (request):
    if request.POST.get('policy_name'):
        filename =  str(request.POST.get('policy_name'))
        filepath = 'yara_policies/' + filename
        print(filepath)
        return serve(request, os.path.basename(filepath),os.path.dirname(filepath))
    
    elif request.POST.get('loki_agent'):
        filename = 'loki_0.44.2_3.zip'
        filepath = 'yara_policies/' + filename
        return serve(request, os.path.basename(filepath),os.path.dirname(filepath))
    else:
        print("!! Download arguments are missing !!")
        return Response ("download failed ... ")