from django.contrib import admin
from . import models

# Register your models here.

@admin.register(models.Scans)
class ScansAdmin(admin.ModelAdmin):
    list_display = ['upload_date', 'scan_date' , 'entity_name', 'host_name', 'processed_by']
    list_per_page = 30
    ordering = ['upload_date', 'scan_date']