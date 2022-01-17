# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

import base64
import datetime
from django.contrib.auth.decorators import login_required
from django.db.models.expressions import Value
from django.db.models.query import QuerySet
from django.db.models import Q, F
from django.shortcuts import render, get_object_or_404, redirect
from django.template import loader
from django.http import HttpResponse
from django import template
from yara_parser import models 
from django.db.models.aggregates import Count, Max , Min, Avg
from dateutil.relativedelta import relativedelta
from tkinter import Tk, filedialog
import time
import os
import zipfile
from django.views.static import serve 
from django.contrib import messages


@login_required(login_url="/login/")
def index(request):
    
    context = {}
    context['segment'] = 'index'

    html_template = loader.get_template( 'index.html' )
    return HttpResponse(html_template.render(context, request))

@login_required(login_url="/login/")
def pages(request):
    context = {}
    # All resource paths end in .html.
    # Pick out the html file name from the url. And load that template.
    try:
        
        load_template      = request.path.split('/')[-1]
        context['segment'] = load_template
        
        html_template = loader.get_template( load_template )
        return HttpResponse(html_template.render(context, request))
        
    except template.TemplateDoesNotExist:

        html_template = loader.get_template( 'page-404.html' )
        return HttpResponse(html_template.render(context, request))

    except:
    
        html_template = loader.get_template( 'page-500.html' )
        return HttpResponse(html_template.render(context, request))


# this function will will be used to populate the exploration dashboard for the scan
@login_required(login_url="/login/")
def scan_list(request):

    number_of_scans = models.Scans.objects.all().count()
    unprocessed_scans = models.Scans.objects.filter(processed_by = 'Not_processed_yet').count
    processed_scanns  = models.Scans.objects.filter(~Q(processed_by = 'Not_processed_yet')).count
    QuerySet =  models.Scans.objects.all().order_by('upload_date').reverse()
  

    if (request.POST.get('scan_update_status')):
        # update Proccessed by
        updated_scan_id = request.POST.get('scan_update_status')
        models.Scans.objects.filter(pk=updated_scan_id).update(processed_by= request.user.username) 
        
        #updating all the statuses
        selected_status = request.POST.get('new-status')

        if (request.POST.get('check_all_alerts')):
            print("1111")
            models.file_scan.objects.filter(related_scan_id=updated_scan_id).update(incident_status=selected_status) 
        else: # replace only the pending statuses
            print("2222")
            models.file_scan.objects.filter(related_scan_id=updated_scan_id).filter(incident_status="Pending").update(incident_status=selected_status) 

    return render(request, 'dashboard_Explore_scans.html', {'results' : number_of_scans , 'unprocessed' : unprocessed_scans , 'processed' : processed_scanns, 'Scans' : list(QuerySet) })

@login_required(login_url="/login/")
def alert_list(request):

    number_of_alerts = models.file_scan.objects.all().count()
    unprocessed_scans = models.file_scan.objects.filter(incident_status = 'Pending').count
    processed_scanns  = models.file_scan.objects.filter(~Q(incident_status = 'Pending')).count
    QuerySet2 =  models.Entities.objects.all().order_by('entity_name')  # Getting the Entity Names for the drop down list. 

    # intilizing variables
    history = 250
    search_entity = -1
    type_search = -1
    filter_status = -1
    

    if request.POST.get('idForm1'): # request generated from the refreash button  
        if (int(request.POST.get('idForm1')) != 1):
            history = int(request.POST.get('idForm1'))
        else:
            history = -1

        if (request.POST.get('entites') != "all-entitiesx15"):
            search_entity = request.POST.get('entites')
            print (search_entity)

        if (request.POST.get('typefilter') != "-1"):
            type_search = request.POST.get('typefilter')
            print (type_search)
        
        if (request.POST.get('statusfilter') != "-1"):
            filter_status = request.POST.get('statusfilter')
            print (filter_status)

        
    elif request.POST.get('update_status_alert'):
        checked_boxes = request.POST.getlist('trigger_check')
        
        if checked_boxes != None:
            
            for id in checked_boxes: ## Updating the Status of the alert
                models.file_scan.objects.filter(pk=id).update(incident_status= request.POST.getlist('new-status')[0])
            
            ## Collecting and remove scan id duplicated ###
            scan_id = request.POST.getlist('scan_ids')
            scan_id_unique = [] 
            
            for scan in scan_id: # remove duplicate 
                if scan not in scan_id_unique:
                    scan_id_unique.append(scan)

            ## Finish Collecting and remove scan id duplicated ###

            for sid in scan_id_unique: # updateting the Status of the scan
                models.Scans.objects.filter(pk=sid).update(processed_by= request.user.username)


    ###### Running the Query based on the filtersb####### 
    
    ## Base Query  
    QuerySet =  models.Reasons.objects.all().select_related('realted_trigger').select_related('realted_trigger__related_scan').order_by('-id')

    ##Entity Filter 
    if search_entity != -1 : 
        QuerySet = QuerySet.filter(realted_trigger__related_scan__entity_name=search_entity)

    ## Type Filter 
    if type_search != -1 : 
        QuerySet = QuerySet.filter(realted_trigger__trigger_type=type_search)

    ## Status Filter
    if filter_status != -1: # checking if there is a type filter
        QuerySet = QuerySet.filter(realted_trigger__incident_status=filter_status)

    ## Record Filter
    if (history != -1):
        QuerySet = QuerySet[:history]
    else:
        QuerySet =QuerySet[:250]

    # print(QuerySet.query)
    
    ###### End --- Running the Query based on the filters ####### 
    # if search_entity == -1 and type_search == -1: # Case no filter
    #     if (history != -1):
            
    #         QuerySet =  models.Reasons.objects.all().select_related('realted_trigger').select_related('realted_trigger__related_scan').order_by('-id')[:history] # 250 is the default

    #         # QuerySet =  models.Reasons.objects.raw(" \
    #         # SELECT * FROM 'yara_parser_reasons' \
    #         # INNER JOIN 'yara_parser_file_scan' ON ('yara_parser_reasons'.'realted_trigger_id' = 'yara_parser_file_scan'.'id') \
    #         # INNER JOIN 'yara_parser_scans' ON ('yara_parser_file_scan'.'related_scan_id' = 'yara_parser_scans'.id) \
    #         # ORDER BY 'yara_parser_reasons'.'id' DESC  LIMIT " + str(history) ) 

    #     else: # Getting all records

    #         QuerySet =  models.Reasons.objects.all().select_related('realted_trigger').select_related('realted_trigger__related_scan').order_by('-id')
    #         # QuerySet =  models.Reasons.objects.raw(" \
    #         # SELECT * FROM 'yara_parser_reasons' \
    #         # INNER JOIN 'yara_parser_file_scan' ON ('yara_parser_reasons'.'realted_trigger_id' = 'yara_parser_file_scan'.'id') \
    #         # INNER JOIN 'yara_parser_scans' ON ('yara_parser_file_scan'.'related_scan_id' = 'yara_parser_scans'.id) \
    #         # ORDER BY 'yara_parser_reasons'.'id' DESC")

    # elif search_entity != -1 and type_search == -1: # Case only entity
    #     if (history != -1):
            
    #         QuerySet =  models.Reasons.objects.all().select_related('realted_trigger').select_related('realted_trigger__related_scan').filter(realted_trigger__related_scan__entity_name=search_entity).order_by('-id')[:history] # 250 is the default
            
    #         # QuerySet =  models.Reasons.objects.raw(" \
    #         # SELECT * FROM 'yara_parser_reasons'  \
    #         # INNER JOIN 'yara_parser_file_scan' ON ('yara_parser_reasons'.'realted_trigger_id' = 'yara_parser_file_scan'.'id') \
    #         # INNER JOIN 'yara_parser_scans' ON ('yara_parser_file_scan'.'related_scan_id' = 'yara_parser_scans'.id) \
    #         # where 'yara_parser_scans'.'entity_name_id' = '" + search_entity + "' \
    #         # ORDER BY 'yara_parser_reasons'.'id' DESC  LIMIT " + str(history) )

    #     else: # Getting all records
            
    #         QuerySet =  models.Reasons.objects.all().select_related('realted_trigger').select_related('realted_trigger__related_scan').filter(realted_trigger__related_scan__entity_name=search_entity).order_by('-id')

    #         # QuerySet =  models.Reasons.objects.raw(" \
    #         # SELECT * FROM 'yara_parser_reasons' \
    #         # INNER JOIN 'yara_parser_file_scan' ON ('yara_parser_reasons'.'realted_trigger_id' = 'yara_parser_file_scan'.'id') \
    #         # INNER JOIN 'yara_parser_scans' ON ('yara_parser_file_scan'.'related_scan_id' = 'yara_parser_scans'.id) \
    #         # where 'yara_parser_scans'.'entity_name_id' = '" + search_entity + "' \
    #         # ORDER BY 'yara_parser_reasons'.'id' DESC")

    # elif search_entity == -1 and type_search != -1: # Case only Type
    #     if (history != -1):
    #         # QuerySet =  models.Reasons.objects.select_related('realted_trigger').order_by('-id')[:history] # 250 is the default
    #         QuerySet =  models.Reasons.objects.all().select_related('realted_trigger').select_related('realted_trigger__related_scan').filter(realted_trigger__trigger_type=type_search).order_by('-id')[:history] # 250 is the default

            
    #         # QuerySet =  models.Reasons.objects.raw(" \
    #         # SELECT * FROM 'yara_parser_reasons'  \
    #         # INNER JOIN 'yara_parser_file_scan' ON ('yara_parser_reasons'.'realted_trigger_id' = 'yara_parser_file_scan'.'id') \
    #         # INNER JOIN 'yara_parser_scans' ON ('yara_parser_file_scan'.'related_scan_id' = 'yara_parser_scans'.id) \
    #         # where 'yara_parser_file_scan'.'trigger_type' = '" + type_search + "' \
    #         # ORDER BY 'yara_parser_reasons'.'id' DESC  LIMIT " + str(history) )

    #     else: # Getting all records
            
    #         QuerySet =  models.Reasons.objects.all().select_related('realted_trigger').select_related('realted_trigger__related_scan').filter(realted_trigger__trigger_type=type_search).order_by('-id')

    #         # QuerySet =  models.Reasons.objects.raw(" \
    #         # SELECT * FROM 'yara_parser_reasons'  \
    #         # INNER JOIN 'yara_parser_file_scan' ON ('yara_parser_reasons'.'realted_trigger_id' = 'yara_parser_file_scan'.'id') \
    #         # INNER JOIN 'yara_parser_scans' ON ('yara_parser_file_scan'.'related_scan_id' = 'yara_parser_scans'.id) \
    #         # where 'yara_parser_file_scan'.'trigger_type' = '" + type_search + "' \
    #         # ORDER BY 'yara_parser_reasons'.'id' DESC") 

    # elif search_entity != -1 and type_search != -1: # Case Type and Entity
    #     if (history != -1):
    #         QuerySet =  models.Reasons.objects.all().select_related('realted_trigger').select_related('realted_trigger__related_scan').filter(realted_trigger__related_scan__entity_name=search_entity).filter(realted_trigger__trigger_type=type_search).order_by('-id')[:history] # 250 is the default

    #         # QuerySet =  models.Reasons.objects.raw(" \
    #         # SELECT * FROM 'yara_parser_reasons'  \
    #         # INNER JOIN 'yara_parser_file_scan' ON ('yara_parser_reasons'.'realted_trigger_id' = 'yara_parser_file_scan'.'id') \
    #         # INNER JOIN 'yara_parser_scans' ON ('yara_parser_file_scan'.'related_scan_id' = 'yara_parser_scans'.id) \
    #         # where 'yara_parser_file_scan'.'trigger_type' = '" + type_search + "' \
    #         # and 'yara_parser_scans'.'entity_name_id' = '" + search_entity + "' \
    #         # ORDER BY 'yara_parser_reasons'.'id' DESC  LIMIT " + str(history) )

    #     else: # Getting all records
    #         QuerySet =  models.Reasons.objects.all().select_related('realted_trigger').select_related('realted_trigger__related_scan').filter(realted_trigger__related_scan__entity_name=search_entity).filter(realted_trigger__trigger_type=type_search).order_by('-id')

    #         # QuerySet =  models.Reasons.objects.raw(" \
    #         # SELECT * FROM 'yara_parser_reasons'  \
    #         # INNER JOIN 'yara_parser_file_scan' ON ('yara_parser_reasons'.'realted_trigger_id' = 'yara_parser_file_scan'.'id') \
    #         # INNER JOIN 'yara_parser_scans' ON ('yara_parser_file_scan'.'related_scan_id' = 'yara_parser_scans'.id) \
    #         # where 'yara_parser_file_scan'.'trigger_type' = '" + type_search + "' \
    #         # and 'yara_parser_scans'.'entity_name_id' = '" + search_entity + "' \
    #         # ORDER BY 'yara_parser_reasons'.'id' DESC")


    # if filter_status != -1: # checking if there is a type filter
    #     QuerySet.filter(realted_trigger__incident_status=filter_status)


    return render(request, 'dashboard_Explore_alerts.html', {'results' : number_of_alerts , 'unprocessed' : unprocessed_scans , 'processed' : processed_scanns, 'Alerts' : list(QuerySet), 'entities' : list(QuerySet2), 'limit' : history, 'search_type': type_search, 'entity_filter' :  search_entity, 'filter_status' :filter_status })

@login_required(login_url="/login/")
def single_scan(request):

    upload_success = 0

    if (request.POST.get('export-btn')): # if the request is generated by an export function  fuction
        
        #get the base64 data
        scan_id = request.POST.get('scan_id')
        encoded_file = models.Scans.objects.filter(id=scan_id).values_list('file_base64', flat=True)[0]
        
        ###--- Setting up the file chooser ---###
        root = Tk()
        root.withdraw()
        root.attributes('-topmost', True)
        export_location = filedialog.askdirectory()
        #export_location = "/Users/" #
        ###--- END Setting up the file chooser ---###

        ## Export
        if (export_location):
            file1 = open(export_location+"/Exported_results.txt", "wb") 
            file1.write(base64.b64decode(encoded_file))
            file1.close()
            upload_success = 1


    elif (request.POST.get('message-text-update')): # if the request is generated by an update file scan  fuction
        desc = request.POST.get('message-text-update')
        new_status = request.POST.get('new-status')
        target_trigger_id = request.POST.get('trigger-id')

        models.file_scan.objects.filter(pk=target_trigger_id).update(incident_status= new_status)
        models.file_scan.objects.filter(pk=target_trigger_id).update(analyst_comment= desc)

        # if the status of the scan is unproccessed the value will be updated by the user name
        scan_id = request.POST.get('scan_id')
        if (models.Scans.objects.filter(id=scan_id).values_list('processed_by', flat=True)[0] == "Not_processed_yet"):
            models.Scans.objects.filter(pk=scan_id).update(processed_by= request.user.username)
        

    elif (request.POST.get('message-text-update2')): # if the request is generated by an update proccess scan fuction
        desc = request.POST.get('message-text-update2')
        new_status = request.POST.get('new-status')
        target_trigger_id = request.POST.get('trigger-id')

        models.Process_Scan.objects.filter(pk=target_trigger_id).update(incident_status= new_status)
        models.Process_Scan.objects.filter(pk=target_trigger_id).update(analyst_comment= desc)
        

        # if the status of the scan is unproccessed the value will be updated by the user name
        scan_id = request.POST.get('scan_id')
        if (models.Scans.objects.filter(id=scan_id).values_list('processed_by', flat=True)[0] == "Not_processed_yet"):
            models.Scans.objects.filter(pk=scan_id).update(processed_by= request.user.username)


    # Start the function of redndering the page.. 

    scan_id = request.POST.get('scan_id')
    targeted_scan = models.Scans.objects.filter(id=scan_id)
    queryset_file_scan =  models.file_scan.objects.filter(related_scan_id__in = targeted_scan)
    queryset_proccess_info =  models.Process_Scan.objects.filter(related_scan_id__in = targeted_scan)
    queryset_Reasons = None

    context = {
        'scan' : targeted_scan.first,
        'triggers' : queryset_file_scan,
        'proccess_scans' : queryset_proccess_info,
        'reasons' : queryset_Reasons,
        'upload_success' : upload_success
    }

    return render(request, 'dashboard_explore_specific_scan.html', context)

@login_required(login_url="/login/")
def get_reasons(request):

    trigger_id = request.POST.get('trigger_id', None )
    scan_id =  request.POST.get('scan_id')
    print (scan_id)
    print (trigger_id)

    targeted_scan = models.Scans.objects.filter(id=scan_id)
    queryset_file_scan =  models.file_scan.objects.filter(related_scan_id__in = targeted_scan)
    queryset_proccess_info =  models.Process_Scan.objects.filter(related_scan_id__in = targeted_scan)
    queryset_Reasons =  models.Reasons.objects.filter(realted_trigger_id = trigger_id)

    #print(queryset_Triggers.values_list)

    context = {
        'scan' : targeted_scan.first,
        'triggers' : queryset_file_scan,
        'proccess_scans' : queryset_proccess_info,
        'reasons' : queryset_Reasons
    }

    return render(request, 'dashboard_explore_specific_scan.html', context)

@login_required(login_url="/login/")
def main_dashboard(request):

    # Set Daterange start #  

    target_date = (datetime.datetime.now() - relativedelta(years=100)).strftime("%Y-%m-%d")
    target_range_name = "0"

    if request.POST.get('idForm1'): # checking if the call was from changing the date or first entry
    
        if request.POST.get('idForm1') == '1':   ## last year
            target_date = (datetime.datetime.now() - relativedelta(years=1)).strftime("%Y-%m-%d")
            target_range_name = "1"

        elif request.POST.get('idForm1') == '2': ## last month
            target_date = (datetime.datetime.now() - relativedelta(months=1)).strftime("%Y-%m-%d")
            target_range_name = "2"

        elif request.POST.get('idForm1') == '3': ## last week
            target_date = (datetime.datetime.now() - relativedelta(weeks=1)).strftime("%Y-%m-%d")
            target_range_name = "3"

        elif request.POST.get('idForm1') == '4': ## last day
            target_date = (datetime.datetime.now() - relativedelta(days=1)).strftime("%Y-%m-%d")
            target_range_name = "4"


    # Set Daterange End #

    # Statistics start #
    scan_all = models.Scans.objects.filter(scan_date__range=[target_date, datetime.datetime.now()])
    scan_count = scan_all.count()

    file_scan_notices = 0 # intialized will be calculated though loop from the scan table since the trigger table only collects alerts and wornings

    if scan_count > 0 : # this will check if there is even a scan first before doing the calculations.
        entity_scanned = scan_all.values_list('entity_name_id').distinct().count()
        system_scanned = scan_all.values_list('host_name').distinct().count()

        # Statistics start #

        # Trigger Statistics start #
        file_scan_alerts = models.file_scan.objects.filter(trigger_type = 'Alert').filter(related_scan_id__in = scan_all).count()
        file_scan_warning = models.file_scan.objects.filter(trigger_type = 'Warning').filter(related_scan_id__in = scan_all).count()
        file_scan_notices = 0 # intialized will be calculated though loop from the scan table since the trigger table only collects alerts and wornings

        Proccess_scan_count  = models.Process_Scan.objects.values_list('process_inf_type').filter(related_scan_id__in = scan_all).count()
        Proccess_scan_alerts = models.Process_Scan.objects.filter(process_inf_type = 'Alert').filter(related_scan_id__in = scan_all).count()
        Process_scan_warning = models.Process_Scan.objects.filter(process_inf_type = 'Warning').filter(related_scan_id__in = scan_all).count()
        Process_scan_info = models.Process_Scan.objects.filter(process_inf_type = 'info').filter(related_scan_id__in = scan_all).count()


        
        for scan in scan_all:
            file_scan_notices += scan.number_of_notices

        file_scan_count = file_scan_notices + file_scan_alerts + file_scan_warning
        total_file_scan = file_scan_count + Proccess_scan_count
        # Trigger Statistics End #

        # infected / completetion / is admin  Statistics start #
        infected_entities = scan_all.filter(Q(number_of_alerts__gte = 1) | Q(number_of_warning__gte=1)).values_list('entity_name_id').distinct().count()

        completed_scans = scan_all.filter(is_completed = 1).count()
        intrupted_scans = scan_all.filter(is_completed = 0).count()
        intrupted_scans_presentage = (intrupted_scans/(scan_count)) * 100
        completed_scans_precentage = 100 - intrupted_scans_presentage

        admin_scans = scan_all.filter(is_admin = 1).count()
        not_admin_scans = scan_count - admin_scans
        # infected / completetion / is admin  Statistics end #

        # most common users #
        most_upload = scan_all.values('added_by').annotate(count=Count('added_by')).order_by('-count').first()
        most_processed = scan_all.values('processed_by').annotate(count=Count('processed_by')).order_by('-count').first()
    
    else: 
        file_scan_count = 0
        total_file_scan = 0 
        infected_entities = 0
        completed_scans = 0
        intrupted_scans = 0
        completed_scans_precentage = 0
        intrupted_scans_presentage = 0
        admin_scans = 0
        not_admin_scans = 0
        most_upload = 0
        most_processed = 0
        entity_scanned =0
        system_scanned = 0
        file_scan_alerts = 0
        file_scan_warning = 0
        Proccess_scan_count = 0
        Proccess_scan_alerts = 0
        Process_scan_warning = 0
        Process_scan_info = 0
    
    context = {
        'target_range_name' : target_range_name,
        'scan_count' : scan_count,
        'entity_scanned' : entity_scanned,
        'System_scanned' : system_scanned,
        'file_scan_count' : file_scan_count,
        'file_scan_alert' : file_scan_alerts,
        'file_scan_warning' : file_scan_warning,
        'file_scan_notices' : file_scan_notices,
        'proccess_scan_count' : Proccess_scan_count, 
        'proccess_scan_alert' : Proccess_scan_alerts, 
        'proccess_scan_warning' : Process_scan_warning, 
        'proccess_scan_info' : Process_scan_info, 
        'total_triggers' : total_file_scan, 
        'infected_entities' : infected_entities,
        'completed_scans' : completed_scans, 
        'intrupted_scans' : intrupted_scans,
        'completed_scans_precentage' : str(round(completed_scans_precentage, 2)),
        'intrupted_scans_presentage' : str(round(intrupted_scans_presentage, 2)),
        'admin_scans' : admin_scans, 
        'not_admin_scans' : not_admin_scans,
        'most_upload' : most_upload,
        'most_processed' : most_processed,
    }

    return render(request, 'dashboard-analytics.html', context)

@login_required(login_url="/login/")
def main_dashboard_entity(request):

    # Set Daterange start #  
    target_date = (datetime.datetime.now() - relativedelta(years=100)).strftime("%Y-%m-%d")
    target_range_name = "0"
    selected_entity_index = "Select.."
    entity_list_for_select = models.Scans.objects.values('entity_name_id').distinct().order_by('entity_name')

    if request.POST.get('idForm1'): # checking if the call was from changing the date or first entry
    
        if request.POST.get('idForm1') == '1':   ## last year
            target_date = (datetime.datetime.now() - relativedelta(years=1)).strftime("%Y-%m-%d")
            target_range_name = "1"

        elif request.POST.get('idForm1') == '2': ## last month
            target_date = (datetime.datetime.now() - relativedelta(months=1)).strftime("%Y-%m-%d")
            target_range_name = "2"

        elif request.POST.get('idForm1') == '3': ## last week
            target_date = (datetime.datetime.now() - relativedelta(weeks=1)).strftime("%Y-%m-%d")
            target_range_name = "3"

        elif request.POST.get('idForm1') == '4': ## last day
            target_date = (datetime.datetime.now() - relativedelta(days=1)).strftime("%Y-%m-%d")
            target_range_name = "4"

    if request.POST.get('entites'):
        selected_entity_index = request.POST.get('entites')

    # Set Daterange End #

    # Statistics start #
    scan_all = models.Scans.objects.filter(scan_date__range=[target_date, datetime.datetime.now()], entity_name_id = selected_entity_index)
    scan_count = scan_all.count()
    entity_list = models.Scans.objects.filter(entity_name_id = selected_entity_index).values('entity_name_id').distinct().order_by('entity_name') 

    file_scan_notices = 0 # intialized will be calculated though loop from the scan table since the trigger table only collects alerts and wornings

    if scan_count > 0 : # this will check if there is even a scan first before doing the calculations.
        entity_scanned = scan_all.values_list('entity_name_id').distinct().count()
        system_scanned = scan_all.values_list('host_name').distinct().count()

        # Statistics start #

        # Trigger Statistics start #
        file_scan_alerts = models.file_scan.objects.filter(trigger_type = 'Alert').filter(related_scan_id__in = scan_all).count()
        file_scan_warning = models.file_scan.objects.filter(trigger_type = 'Warning').filter(related_scan_id__in = scan_all).count()
        file_scan_notices = 0 # intialized will be calculated though loop from the scan table since the trigger table only collects alerts and wornings

        Proccess_scan_count  = models.Process_Scan.objects.values_list('process_inf_type').filter(related_scan_id__in = scan_all).count()
        Proccess_scan_alerts = models.Process_Scan.objects.filter(process_inf_type = 'Alert').filter(related_scan_id__in = scan_all).count()
        Process_scan_warning = models.Process_Scan.objects.filter(process_inf_type = 'Warning').filter(related_scan_id__in = scan_all).count()
        Process_scan_info = models.Process_Scan.objects.filter(process_inf_type = 'info').filter(related_scan_id__in = scan_all).count()
        
        for scan in scan_all:
            file_scan_notices += scan.number_of_notices

        file_scan_count = file_scan_notices + file_scan_alerts + file_scan_warning
        total_file_scan = file_scan_count + Proccess_scan_count
        # Trigger Statistics End #

        # infected / completetion / is admin  Statistics start #
        infected_entities = scan_all.filter(Q(number_of_alerts__gte = 1) | Q(number_of_warning__gte=1)).values_list('entity_name_id').distinct().count()

        completed_scans = scan_all.filter(is_completed = 1).count()
        intrupted_scans = scan_all.filter(is_completed = 0).count()
        intrupted_scans_presentage = (intrupted_scans/scan_count) * 100
        completed_scans_precentage = 100 - intrupted_scans_presentage

        admin_scans = scan_all.filter(is_admin = 1).count()
        not_admin_scans = scan_count - admin_scans
        # infected / completetion / is admin  Statistics end #

        # most common users #
        most_upload = scan_all.values('added_by').annotate(count=Count('added_by')).order_by('-count').first()
        most_processed = scan_all.values('processed_by').annotate(count=Count('processed_by')).order_by('-count').first()
    
    else: 
        file_scan_count = 0
        total_file_scan = 0 
        infected_entities = 0
        completed_scans = 0
        intrupted_scans = 0
        completed_scans_precentage = 0
        intrupted_scans_presentage = 0
        admin_scans = 0
        not_admin_scans = 0
        most_upload = 0
        most_processed = 0
        entity_scanned =0
        system_scanned = 0
        file_scan_alerts = 0
        file_scan_warning = 0
        Proccess_scan_count = 0
        Proccess_scan_alerts = 0
        Process_scan_warning = 0
        Process_scan_info = 0
    
    context = {
        'target_range_name' : target_range_name,
        'selected_entity_index' : selected_entity_index,
        'scan_count' : scan_count,
        'entity_list' : list(entity_list),
        'entity_list_for_select' : list(entity_list_for_select),
        'entity_scanned' : entity_scanned,
        'System_scanned' : system_scanned,
        'file_scan_count' : file_scan_count,
        'file_scan_alert' : file_scan_alerts,
        'file_scan_warning' : file_scan_warning,
        'file_scan_notices' : file_scan_notices,
        'proccess_scan_count' : Proccess_scan_count, 
        'proccess_scan_alert' : Proccess_scan_alerts, 
        'proccess_scan_warning' : Process_scan_warning, 
        'proccess_scan_info' : Process_scan_info, 
        'total_triggers' : total_file_scan, 
        'infected_entities' : infected_entities,
        'completed_scans' : completed_scans, 
        'intrupted_scans' : intrupted_scans,
        'completed_scans_precentage' : str(round(completed_scans_precentage, 2)),
        'intrupted_scans_presentage' : str(round(intrupted_scans_presentage, 2)),
        'admin_scans' : admin_scans, 
        'not_admin_scans' : not_admin_scans,
        'most_upload' : most_upload,
        'most_processed' : most_processed,
    }
  
    return render(request, 'dashboard-Entity.html', context)
@login_required(login_url="/login/")
def client_managment (request):

    if (request.GET.get('cl_id')): ## case removing an agent
        models.client.objects.filter(pk=request.GET.get('cl_id')).delete()
        print ("<<Agent Deleted>>")

    elif (request.GET.get('sch_id')): ## Case removing a schedualled job
        models.schedualled_scan.objects.filter(pk=request.GET.get('sch_id')).delete()
        print ("<<Job Deleted>>")

    elif (request.POST.get('RunScan_button')):#case running new scan 
        
        checked_boxes = request.POST.getlist('client_check')
        if checked_boxes != None:
            for id in checked_boxes:
                new_schedual = models.schedualled_scan ()
                new_schedual.target_machine= models.client.objects.filter(pk=id).values_list('host_name').first()[0]
                new_schedual.target_mac= models.client.objects.filter(pk=id).values_list('mac_add').first()[0]
                new_schedual.policy_name= (request.POST.getlist('scanning_policy')[0])
                new_schedual.status = 'intialized'
                new_schedual.save()

    client_list = models.client.objects.all()
    policies = models.policy_scan.objects.all()
    schedualled = models.schedualled_scan.objects.all()

    
    context = {
        'tasks' : schedualled.count(),
        'disconnected' : "3",
        'registered' : client_list.count(),
        'clients' : client_list,
        'policies' :  policies,
        'schedualled' : schedualled
    }
    return render(request, 'client_managment.html', context)


@login_required(login_url="/login/")
def scan_polcies (request):

    if (request.GET.get('pol_id')): ## case removing an agent

        # Deletes file from filesystem.
        path = models.policy_scan.objects.filter(pk=request.GET.get('pol_id')).values_list('path').first()[0]

        if os.path.isfile(path):
            os.remove(path)
            models.policy_scan.objects.filter(pk=request.GET.get('pol_id')).delete()
            print ("<<Policy  Deleted>>")
        else:
            print ("<<wrong Path>>")



    if request.POST.get('policy_name'): # checking if the call was from adding a policy

        #check if the name exist
        policy_all = models.policy_scan.objects.all().values_list('name', flat=True)
        print (policy_all)

        new_name = request.POST.get('policy_name').replace(" " , "_") 
        print(new_name)

        if (new_name in policy_all):
            print ("<<policy name is used.. abort>>")
            messages.error(request, 'Failed adding a new poilcy,  name is already used.')

        else :
            print ("<< adding policy >>")
            files = request.FILES.getlist('uploaded_rules')

            for f in files: # saving all yara files.
                open('Yara_policies/tmp/' + f.name, 'wb').write(f.read())
                print('The file ' + f.name + ' was uploaded successfully')


            # Compressing all the files 
            policy_path = 'Yara_policies/' + new_name + '.zip'
            compressed = zipfile.ZipFile(policy_path , 'w')
            for folder, subfolders, files in os.walk('Yara_policies/tmp/'):
                for file in files:
                    compressed.write(os.path.join(folder, file), os.path.relpath(os.path.join(folder,file), 'Yara_policies/tmp/'), compress_type = zipfile.ZIP_DEFLATED)

            compressed.close()
            
            # delete all  tmp files
            for folder, subfolders, files in os.walk('Yara_policies/tmp/'):
                for file in files:
                    os.remove(os.path.join(folder, file))

            #Adding the database record
            new_policy = models.policy_scan()
            new_policy.name = new_name
            new_policy.descreption = request.POST.get('policy_desc') 
            new_policy.path = policy_path
            new_policy.save()

    # Statistics start #
    policy_list = models.policy_scan.objects.all()
    count = policy_list.count()
    
    context = {
        'total' : count ,
        'disconnected' : "3",
        'registered' : "4",
        'policies' : policy_list
    }
    return render(request, 'client_scan_polcies.html', context)

def download_file (request):
    if request.GET.get('policy_name'):
        filename =  str(request.GET.get('policy_name'))
        filepath = 'Yara_policies/' + filename
        print(filepath)
        return serve(request, os.path.basename(filepath),os.path.dirname(filepath))
    else:
        print("error Found .....")


