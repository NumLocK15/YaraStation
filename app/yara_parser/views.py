import base64
from datetime import datetime
import re
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.messages.storage.base import Message
from yara_parser.models import Entities, Process_Scan, Reasons, Scans, file_scan, client,schedualled_scan
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.utils.decorators import method_decorator


MESSAGE_TAGS = {
    messages.ERROR: 'danger'
}


# Create your views here.

# def yara_parser(request):
  
#     # Getting the Entity Names for the drop down list. 
#     QuerySet =  Entities.objects.all().order_by('entity_name') 
  
#     return render(request, 'upload.html', {'entities' : list(QuerySet)})

@login_required(login_url="/login/")
def yara_parser(request):
    # Getting the Entity Names for the drop down list. 
    QuerySet =  Entities.objects.all().order_by('entity_name') 
    return render(request, 'file-upload.html', {'entities' : list(QuerySet)})

@login_required(login_url="/login/")
def submit_upload(request): # this function will cover the parsing of a newlly updated yara results into the database.. 

    if(request.POST.get('upload_button')): # checking if the button was clicked.

        # Reading the results and parsing them into the database.
        files = request.FILES.getlist('yara_results')
        entity_name  = request.POST.get('entites')
        scan_type  = "Yara_station"

        print (files)     

        for file in files:# looping through all the uploaded files.          
            if (file.name).endswith('.txt') or (file.name).endswith('.log'):
            #    try:
                    parse_txt (file, entity_name,scan_type, request)
            #    except:
            #        messages.error(request, "Parsing error... file (" +file.name + ") is not supported... The file has been saved without parsing")

            elif (file.name).endswith('.CSV') or (file.name).endswith('.csv'):
            #    try:
                    parse_csv (file, entity_name,scan_type, request)
            #    except:
            #        messages.error(request, "Parsing error... file (" +file.name + ") is not supported... The file has been saved without parsing")
        
        # finishing the function and redirecting the user to the success page..
        # Getting the Entity Names for the drop down list. 
        QuerySet =  Entities.objects.all().order_by('entity_name') 

        return render(request, 'file-upload.html', {'entities' : list(QuerySet)})

    else:
        # finishing the function and redirecting the user to the success page..
        # Getting the Entity Names for the drop down list. 
        QuerySet =  Entities.objects.all().order_by('entity_name') 
        return render(request, 'file-upload.html', {'entities' : list(QuerySet)})

def parse_txt (file, entity_name,sc_type, request): #function for parsing txt files. 

    # intilizing the variables.
    #-----------------
    # converting the document to base64 
    content_bytes = file.read()
    base64_bytes = base64.b64encode(content_bytes)
    base64_content = base64_bytes.decode('ascii')

    # converting content to string for processing
    content_string = content_bytes.decode('ascii')
    
    # Extracting the content.
    #-----------------

    #splited_content_string = content_string.split('\n')

    # Extracting if the program ran as an administrator
    admin_not_found = content_string.find("Program should be run 'as Administrator'")
    if admin_not_found == -1:
        is_admin = 1
    else:
        is_admin = 0

    # Extracting if the scan is complete
    complete_found = content_string.find("Finished LOKI Scan")
    if complete_found == -1:
        is_complete = 0
    else:
        is_complete=1
    
    # Extracting scan date and host_name
    substring = re.search('SYSTEM: (.+?) TIME: (.+?) ', content_string)
    if substring is None: # if one of them is missing?
        host_name = "N/A"
        scan_date = None
    else:
        host_name = substring.group(1)
        scan_date = datetime.strptime(substring.group(2), '%Y%m%dT%H:%M:%SZ')
        print (scan_date)

    # Extracting the scanned drive
    if content_string.find("Info: MODULE: FileScan MESSAGE: Scanning") != -1:
        drive = re.split('Info: MODULE: FileScan MESSAGE: Scanning ', content_string)
        drive.remove(drive[0])
        drive=drive[0]
        drive=drive[:drive.find("\n")-1]
        if drive.find("Path")!=-1:
            drive= drive[drive.find("Path")+5:]
    else:
        drive = "N/A"

    # Extracting number of yara rules scanned.
    substring = re.search('Initialized (.+?) Yara rules', content_string)
    if substring is None:
        yara_rules_number = 0 
    else:
        yara_rules_number = int(substring.group(1))

    # Extracting alerts, warnings, notices
    substring = re.search('Results: (.+?) alerts.+? (.+?) warnings.+? (.+?) notices', content_string)
    if substring is None:
        alerts = 0
        warnings = 0
        notices = 0
    else:
        alerts=int(substring.group(1))
        warnings=int(substring.group(2))
        notices=int(substring.group(3)) 


    # print ("---------------Testing Block--------------------\n\n")
    # print ("date:", scan_date)
    # print ("entity_name:", entity_name)
    # print ("host_name:", host_name)
    # print ("yara_rules_number:", yara_rules_number)
    # print ("is_admin:", is_admin)
    # print ("alerts:", alerts)
    # print ("warnings:", warnings)
    # print ("notices:", notices)
    # print ("is_complete:", is_complete)
    # print ("-----------------------------------\n\n")


    # Creating the scan object
    new_scan = Scans()
    new_scan.scan_date = scan_date
    new_scan.entity_name = Entities(entity_name)
    new_scan.host_name = host_name
    new_scan.is_admin = is_admin
    new_scan.is_completed = is_complete
    new_scan.number_of_yara_scanned = yara_rules_number
    new_scan.number_of_alerts = alerts
    new_scan.number_of_notices = notices
    new_scan.number_of_warning = warnings
    new_scan.file_base64 = base64_content
    new_scan.added_by = request.user.username
    new_scan.drive_name = drive
    new_scan.scan_type = sc_type

    # inserting scan information to database.
    new_scan.save() 
    
    messages.success(request, "Record has been updated successfully...")

    #-----------------------------------------------------------------------------------------------------------------------
    #       At this point the scan infomration is added to the DB, now we check if there is any results to register. 
    #-----------------------------------------------------------------------------------------------------------------------
    
    if alerts > 0 or warnings > 0:
      
        # split the content of the file by rows to get each alert by itself. 
        splited_content_string = content_string.split('\n')
        
        for line in splited_content_string:

            if line.find("LOKI: Alert: MODULE: FileScan") != -1 or line.find("LOKI: Warning: MODULE: FileScan") != -1 :  

                if line.find("LOKI: Alert: MODULE: FileScan") != -1: # filescan alert was found
                    print("******************FILESCAN ALERT************************")    
                    alert_type = "Alert"
                    alert_module = "FileScan"
                    
                elif line.find("LOKI: Warning: MODULE: FileScan") != -1: # filescan Warning was found
                    print("******************FILESCAN warning************************")
                    alert_type = "Warning"
                    alert_module = "FileScan"

                #Extract filename
                substring = re.search('FILE: (.+?) SCORE:', line)
                if substring is None:
                    filename = "N/A"
                else:
                    filename = substring.group(1)

                #Extract score
                substring = re.search('SCORE: (.+?) ', line)
                if substring is None:
                    score = 0
                else:
                    score = int(substring.group(1)) 
                
                #Extract MD5                       
                substring = re.search('MD5: (.+?) ', line)
                if substring is None:
                    MD5="N/A"
                else:
                    MD5=substring.group(1)

                    
                #Extract SHA1                        
                substring = re.search('SHA1: (.+?) ', line)
                if substring is None:
                    SHA1="N/A"
                else:
                    SHA1=substring.group(1)

                #Extract SHA256                        
                substring = re.search('SHA256: (.+?) ', line)
                if substring is None:
                    SHA256="N/A"
                else:
                    SHA256=substring.group(1)

                # Testing Block
                # print("_________________Alert Info_________________")
                # print("type:",type)
                # print("module:",module)
                # print("filename:",filename)
                # print("score:",score)

                # print("MD5:",MD5)
                # print("SHA1:",SHA1)
                # print("SHA256:",SHA256)
                # print("__________________________________________\n")

                # Creating the Trigger object
                new_trigger = file_scan()
                new_trigger.modelue_type = alert_module
                new_trigger.trigger_type = alert_type
                new_trigger.file_name = filename
                new_trigger.score = score
                new_trigger.md5 = MD5
                new_trigger.sha1 = SHA1
                new_trigger.sha256 = SHA256
                new_trigger.related_scan = new_scan

                # saving the trigger
                new_trigger.save()
                

                #-----------------------------------------------------------------------------------------------------------------------
                #       After saving the scans now we loop throught the reasons to save them.  
                #-----------------------------------------------------------------------------------------------------------------------

                # full reason
                full_reasons = re.split ("REASON_\d+?:",line)
                full_reasons.remove(full_reasons[0])

                for reason in full_reasons: 
                    reason_name = reason[reason.find(" ")+1:reason.find("SUBSCORE:")]
                    subscore = int (reason[reason.find("SUBSCORE: ")+9:reason.find("DESC")-1])
                    
                    if reason.find("DESCRIPTION:")!=-1:
                        description = re.findall('DESCRIPTION: (.+?) REF:', reason)
                        if len(description)!=0:
                            description = description[0]
                        else:
                            description = "N/A"
                    else:
                        description = reason[reason.find("DESC:")+6:]

                    ## now we collect the related strings.
                    strings = re.split("Str\d+?:",reason)
                    strings.remove(strings[0])

                    try:
                        reason_string_1 = strings[0] [strings[0].find(" ")+1:]
                    except:
                        reason_string_1 = 'N/A'
                    
                    try:
                        reason_string_2 = strings[1] [strings[1].find(" ")+1:]
                    except:
                        reason_string_2 = 'N/A'

                    try:
                        reason_string_3 = strings[2] [strings[2].find(" ")+1:]
                    except:
                        reason_string_3 = 'N/A'

                    # Creating the Reason object
                    new_reason = Reasons()
                    new_reason.sub_score = subscore
                    new_reason.reason = reason_name
                    new_reason.descreption = description
                    new_reason.string_1 = reason_string_1
                    new_reason.string_2 = reason_string_2
                    new_reason.string_3 = reason_string_3
                    new_reason.realted_trigger = new_trigger
                    
                    # saving the reason
                    new_reason.save()

            elif line.find("LOKI: Alert: MODULE: ProcessScan") != -1 or line.find("LOKI: Warning: MODULE: ProcessScan") != -1 or line.find("LOKI: Info: MODULE: ProcessScan") != -1 :
                
                if (line.find("LOKI: Alert: MODULE: ProcessScan") != -1):
                    print("\n\n****************** PROCESS SCAN ALERT************************\n")
                    type="Alert"

                elif line.find("LOKI: Warning: MODULE: ProcessScan") != -1:
                    print("\n\n****************** PROCESS SCAN Warning************************\n")
                    type="Warning"

                elif line.find("LOKI: Info: MODULE: ProcessScan") != -1:
                    print("\n\n****************** PROCESS SCAN Warning************************\n")
                    type="info"


                #initializing variables                        
                path = ""
                     
                #Extract name
                substring = re.search('NAME: (.+?) OWNER:', line)
                if substring is None:
                    name = "N/A"
                else:
                    name = substring.group(1)   

                #Extract owner
                substring = re.search('OWNER: (.+?) CMD:', line)
                if substring is None:
                    owner="N/A"
                else:
                    owner=substring.group(1)                         
                
                #Extract cmd 
                substring = re.search('CMD: (.+?) PATH:', line)
                if substring is None:
                    cmd = "N/A"
                else:
                    cmd = substring.group(1)
                    
                #Extract path
                path = (line.split("PATH:")) [1][1:]
                
                if path.find("IMPLANTED") != -1:
                    path = path [:path.find("IMPLANTED")-1]

                # print ("---------------Testing Block--------------------")
                # print ("_________________Alert Info_________________")
                # print  ("type:",type)
                # print ("module:",module)
                # print ("name:",name)
                # print ("owner:",owner)
                # print ("cmd:",cmd)
                # print ("path:",path)
                # print ("__________________________________________\n")  

                # Creating the process scan object
                new_process_info = Process_Scan ()
                new_process_info.process_inf_type = type
                new_process_info.process_name = name
                new_process_info.owner = owner
                new_process_info.cmd = cmd
                new_process_info.process_path = path
                new_process_info.related_scan = new_scan

                # saving the process scan
                new_process_info.save()

 
def parse_csv (file, entity_name,sc_type, request): #function for parsing csv files. 
    # intilizing the variables.
    #-----------------
    # converting the document to base64 
    content_bytes = file.read()
    base64_bytes = base64.b64encode(content_bytes)
    base64_content = base64_bytes.decode('ascii')

    # converting content to string for processing
    content_string = content_bytes.decode('ascii')
    
    # Extracting the content.
    #-----------------

    #file_lines = base64_content.split('\n')

    # Extracting if the program ran as an administrator
    admin_not_found = content_string.find("Program should be run 'as Administrator'")
    if admin_not_found == -1:
        is_admin = 1
    else:
        is_admin = 0

    # Extracting if the scan is complete
    complete_found = content_string.find("Finished LOKI Scan")
    if complete_found == -1:
        is_complete = 0
    else:
        is_complete=1

    # Extracting scan date and host_name
    substring = re.search('SYSTEM: (.+?) TIME: (.+?) ', content_string)
    if substring is None: # if one of them is missing?
        host_name = "N/A"
        scan_date = None
    else:
        host_name = substring.group(1)
        scan_date = datetime.strptime(substring.group(2), '%Y%m%dT%H:%M:%SZ')
        print (scan_date)


    # Extracting the scanned drive
    if content_string.find("Scanning Path") != -1:
        drive = re.split('INFO,FileScan,Scanning', content_string)
        drive.remove(drive[0])
        drive=drive[0]
        drive=drive[:drive.find("\n")-1]
        if drive.find("Path")!=-1:
            drive= drive[drive.find("Path")+5:]
    else:
        drive = "N/A"

    # Extracting number of yara rules scanned.
    substring = re.search('Initialized (.+?) Yara rules', content_string)
    if substring is None:
        yara_rules_number = 0 
    else:
        yara_rules_number = int(substring.group(1))

    # Extracting alerts, warnings, notices
    substring = re.search('Results: (.+?) alerts.+? (.+?) warnings.+? (.+?) notices', content_string)
    if substring is None:
        alerts = 0
        warnings = 0
        notices = 0
    else:
        alerts=int(substring.group(1))
        warnings=int(substring.group(2))
        notices=int(substring.group(3)) 
    
    # Creating the scan object
    new_scan = Scans()
    new_scan.scan_date = scan_date
    new_scan.entity_name = Entities(entity_name)
    new_scan.host_name = host_name
    new_scan.is_admin = is_admin
    new_scan.is_completed = is_complete
    new_scan.number_of_yara_scanned = yara_rules_number
    new_scan.number_of_alerts = alerts
    new_scan.number_of_notices = notices
    new_scan.number_of_warning = warnings
    new_scan.file_base64 = base64_content
    new_scan.added_by = request.user.username
    new_scan.drive_name = drive
    new_scan.scan_type = sc_type

    # inserting scan information to database.
    new_scan.save() 
    
    messages.success(request, "Record has been updated successfully...")

    #-----------------------------------------------------------------------------------------------------------------------
    #       At this point the scan infomration is added to the DB, now we check if there is any results to register. 
    #-----------------------------------------------------------------------------------------------------------------------

    if alerts > 0 or warnings > 0:
        # split the content of the file by rows to get each alert by itself. 
        splited_content_string = content_string.split('\n')
        
        for line in splited_content_string:
            if line.find("ALERT,FileScan") != -1 or line.find("WARNING,FileScan") != -1 :  

                if line.find("ALERT,FileScan") != -1: # filescan alert was found
                    print("******************FILESCAN ALERT************************")    
                    alert_type = "Alert"
                    alert_module = "FileScan"
                    
                elif line.find("WARNING,FileScan") != -1: # filescan Warning was found
                    print("******************FILESCAN warning************************")
                    alert_type = "Warning"
                    alert_module = "FileScan"

                #Extract filename
                substring = re.search('FILE: (.+?) SCORE:', line)
                if substring is None:
                    filename = "N/A"
                else:
                    filename = substring.group(1)

                #Extract score
                substring = re.search('SCORE: (.+?) ', line)
                if substring is None:
                    score = 0
                else:
                    score = int(substring.group(1)) 
                
                #Extract MD5                       
                substring = re.search('MD5: (.+?) ', line)
                if substring is None:
                    MD5="N/A"
                else:
                    MD5=substring.group(1)

                    
                #Extract SHA1                        
                substring = re.search('SHA1: (.+?) ', line)
                if substring is None:
                    SHA1="N/A"
                else:
                    SHA1=substring.group(1)

                #Extract SHA256                        
                substring = re.search('SHA256: (.+?) ', line)
                if substring is None:
                    SHA256="N/A"
                else:
                    SHA256=substring.group(1)

                # Creating the FileScan object
                new_trigger = file_scan()
                new_trigger.modelue_type = alert_module
                new_trigger.trigger_type = alert_type
                new_trigger.file_name = filename
                new_trigger.score = score
                new_trigger.md5 = MD5
                new_trigger.sha1 = SHA1
                new_trigger.sha256 = SHA256
                new_trigger.related_scan = new_scan

                # saving the trigger
                new_trigger.save()
            
                #-----------------------------------------------------------------------------------------------------------------------
                #       After saving the scans now we loop throught the reasons to save them.  
                #-----------------------------------------------------------------------------------------------------------------------

                # full reason
                full_reasons = re.split ("REASON_\d+?:",line)
                full_reasons.remove(full_reasons[0])

                for reason in full_reasons: 
                    reason_name = reason[reason.find(" ")+1:reason.find("SUBSCORE:")]
                    subscore = int (reason[reason.find("SUBSCORE: ")+9:reason.find("DESC")-1])
                    
                    if reason.find("DESCRIPTION:")!=-1:
                        description = re.findall('DESCRIPTION: (.+?) REF:', reason)
                        if len(description)!=0:
                            description = description[0]
                        else:
                            description = "N/A"
                    else:
                        description = reason[reason.find("DESC:")+6:]

                    ## now we collect the related strings.
                    strings = re.split("Str\d+?:",reason)
                    strings.remove(strings[0])

                    try:
                        reason_string_1 = strings[0] [strings[0].find(" ")+1:]
                    except:
                        reason_string_1 = 'N/A'
                    
                    try:
                        reason_string_2 = strings[1] [strings[1].find(" ")+1:]
                    except:
                        reason_string_2 = 'N/A'

                    try:
                        reason_string_3 = strings[2] [strings[2].find(" ")+1:]
                    except:
                        reason_string_3 = 'N/A'

                    # Creating the Reason object
                    new_reason = Reasons()
                    new_reason.sub_score = subscore
                    new_reason.reason = reason_name
                    new_reason.descreption = description
                    new_reason.string_1 = reason_string_1
                    new_reason.string_2 = reason_string_2
                    new_reason.string_3 = reason_string_3
                    new_reason.realted_trigger = new_trigger
                    
                    # saving the reason
                    new_reason.save()

            elif line.find("LOKI: Alert: MODULE: ProcessScan") != -1 or line.find("LOKI: Warning: MODULE: ProcessScan") != -1 or line.find("LOKI: Info: MODULE: ProcessScan") != -1 :
                
                if (line.find("LOKI: Alert: MODULE: ProcessScan") != -1):
                    print("\n\n****************** PROCESS SCAN ALERT************************\n")
                    type="Alert"

                elif line.find("LOKI: Warning: MODULE: ProcessScan") != -1:
                    print("\n\n****************** PROCESS SCAN Warning************************\n")
                    type="Warning"

                elif line.find("LOKI: Info: MODULE: ProcessScan") != -1:
                    print("\n\n****************** PROCESS SCAN Warning************************\n")
                    type="info"


                #initializing variables                        
                path = ""
                     
                #Extract name
                substring = re.search('NAME: (.+?) OWNER:', line)
                if substring is None:
                    name = "N/A"
                else:
                    name = substring.group(1)   

                #Extract owner
                substring = re.search('OWNER: (.+?) CMD:', line)
                if substring is None:
                    owner="N/A"
                else:
                    owner=substring.group(1)                         
                
                #Extract cmd 
                substring = re.search('CMD: (.+?) PATH:', line)
                if substring is None:
                    cmd = "N/A"
                else:
                    cmd = substring.group(1)
                    
                #Extract path
                path = (line.split("PATH:")) [1][1:]
                
                if path.find("IMPLANTED") != -1:
                    path = path [:path.find("IMPLANTED")-1]

                # print ("---------------Testing Block--------------------")
                # print ("_________________Alert Info_________________")
                # print  ("type:",type)
                # print ("module:",module)
                # print ("name:",name)
                # print ("owner:",owner)
                # print ("cmd:",cmd)
                # print ("path:",path)
                # print ("__________________________________________\n")  

                # Creating the process scan object
                new_process_info = Process_Scan ()
                new_process_info.process_inf_type = type
                new_process_info.process_name = name
                new_process_info.owner = owner
                new_process_info.cmd = cmd
                new_process_info.process_path = path
                new_process_info.related_scan = new_scan

                # saving the process scan
                new_process_info.save()


def add_entity(request):   
    if request.POST.get('recipient-name'): # checking if the call was from changing the date or first entry
        # adding the entity 
        new_entity = Entities ()
        new_entity.entity_name = request.POST.get('recipient-name')
        new_entity.cat_level = 1
        new_entity.save()
        messages.success(request, "Entity has been updated successfully...")

    # Getting the Entity Names for the drop down list. 
    QuerySet =  Entities.objects.all().order_by('entity_name') 
    return render(request, 'file-upload.html', {'entities' : list(QuerySet)})


def heart_beat (request):
    if request.POST.get('mac_add'): ## checking if there is a mac address or exit.
        found = client.objects.filter(mac_add=request.POST.get('mac_add'))
      
        if found.first() == None: ## Case new client 
            print ("<< registering new client >>")
            try:
                print("Mac: " + request.POST.get('mac_add'))
                print("ip: " + request.POST.get('ip_add'))
                print("host: " + request.POST.get('host_name'))
                print("os: " + request.POST.get('os'))
                print("status: " + request.POST.get('status'))

                new_client = client ()
                new_client.mac_add = request.POST.get('mac_add')
                new_client.ip_add =  request.POST.get('ip_add')
                new_client.host_name = request.POST.get('host_name')
                new_client.os = request.POST.get('os')
                new_client.status = request.POST.get('status')

                new_client.save()
            except:
                print(" Failed ... ")
                return render(request, 'basic_response_failure.html', {'test' : "testing-Sux"})
        else:
            print ("<< Updating exisiting client >>")
            found.update(last_update=datetime.now())

            print("<<Checking the schedualled tasks>>")
            schedualled_jobs =  schedualled_scan.objects.filter(status='intialized')
            for task in schedualled_jobs:
                if request.POST.get('mac_add') == task.target_mac:
                    context = {
                        'state' : "2",
                        'policy_name' : task.policy_name,
                        'upload_completed' : "N/A"
                    }
                    return render(request, 'basic_response.html', context)

    else: 
        print("nothing to do..")


    return render(request, 'basic_response.html', {'test' : "testing-Sux"})

def upload_agent_results (request):
    if request.POST.get('entites'): ## checking if there is a mac address or exit.
        print ("<<Starting Upload function from agent>>")

        # Reading the results and parsing them into the database.
        files = request.FILES.getlist('yara_results')
        entity_name  = "agent_results"
        scan_type  = request.POST.get('sc_type')

        for file in files:# looping through all the uploaded files.          
            try:
                if (file.name).endswith('.txt') or (file.name).endswith('.log'):    
                    parse_txt (file, entity_name,scan_type, request)
    
                elif (file.name).endswith('.CSV') or (file.name).endswith('.csv'):
                    parse_csv (file, entity_name,scan_type, request)
            except:
                messages.error(request, "Parsing error... file (" +file.name + ") is not supported... The file has been saced without parsing")

        context = {
            'state' : "3",
            'policy_name' : "N/A",
            'upload_completed' : "1"
        }
        return render(request, 'basic_response.html', context)
    else:
        print ("!!!!")