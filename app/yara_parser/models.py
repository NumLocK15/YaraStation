from django.db import models
from django.db.models.fields import related
from django.conf import settings

# Create your models here.
class Entities (models.Model):
    entity_name = models.CharField(max_length=255, primary_key=True)
    cat_level = models.IntegerField(default=0)

class Scans (models.Model):
    upload_date = models.DateTimeField(auto_now_add=True)
    scan_date  = models.DateTimeField()
    host_name = models.CharField(max_length=255)
    drive_name = models.CharField(max_length=255)
    number_of_yara_scanned = models.IntegerField()
    is_admin = models.IntegerField()
    is_completed = models.IntegerField()
    number_of_alerts = models.IntegerField()
    number_of_warning = models.IntegerField()
    number_of_notices = models.IntegerField()
    file_base64 = models.TextField()
    added_by = models.CharField(max_length=255, default='N/A')
    processed_by  = models.CharField(max_length=255,default='Not_processed_yet')
    entity_name = models.ForeignKey(Entities, on_delete=models.CASCADE)
    scan_type = models.CharField(max_length=255, null=True)

    # def __str__(self) -> str:
    #     return self.entity_name


class file_scan (models.Model):
    TRIGGER_TYPES = [
        ('Warning', 'Warning'),
        ('Alert', 'Alert'),
        ('info', 'info'),
    ]

    INCEDENT_STATUS = [
        ('Pending', 'Pending'),
        ('Confirmed_incident', 'Confirmed_incident'),
        ('False_Positive', 'notice'),
    ]
    trigger_type = models.CharField(max_length=255, choices=TRIGGER_TYPES)
    modelue_type  = models.CharField(max_length=255)
    file_name = models.CharField(max_length=255)
    score = models.IntegerField()
    md5 = models.TextField()
    sha1 = models.TextField()
    sha256 = models.TextField()
    incident_status = models.CharField(max_length=255, choices=INCEDENT_STATUS, default='Pending')
    related_scan = models.ForeignKey(Scans, on_delete=models.CASCADE)
    analyst_comment = models.TextField(null=True)
    
class Process_Scan (models.Model):
    Process_TYPES = [
        ('Warning', 'Warning'),
        ('Alert', 'Alert'),
        ('info', 'info'),
    ]
    INCEDENT_STATUS = [
        ('Pending', 'Pending'),
        ('Confirmed_incident', 'Confirmed_incident'),
        ('False_Positive', 'notice'),
    ]
    process_inf_type = models.CharField(max_length=255, choices=Process_TYPES)
    process_name = models.CharField(max_length=255)
    process_path = models.TextField()
    cmd = models.TextField()
    owner = models.TextField()
    incident_status = models.CharField(max_length=255, choices=INCEDENT_STATUS, default='Pending')
    related_scan = models.ForeignKey(Scans, on_delete=models.CASCADE)
    analyst_comment = models.TextField(null=True)

class Reasons (models.Model):
    sub_score = models.IntegerField()
    reason = models.TextField()
    descreption = models.TextField()
    string_1 = models.TextField(null=True)
    string_2 = models.TextField(null=True)
    string_3 = models.TextField(null=True)
    realted_trigger = models.ForeignKey(file_scan, on_delete=models.CASCADE)


class client (models.Model):
    host_name = models.TextField()
    ip_add = models.TextField()
    mac_add = models.TextField()
    os = models.TextField()
    status = models.TextField()
    upload_date = models.DateTimeField(auto_now_add=True)
    last_update = models.DateTimeField(auto_now_add=True)

class policy_scan (models.Model):
    name = models.TextField()
    path = models.TextField()
    link = models.TextField()
    descreption = models.TextField()

class schedualled_scan (models.Model):
    policy_name = models.TextField()
    target_machine = models.TextField()
    target_mac = models.TextField()
    status = models.TextField()
