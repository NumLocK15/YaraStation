# Generated by Django 2.2.10 on 2021-07-29 16:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('yara_parser', '0002_auto_20210729_1624'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Process_info',
            new_name='Process_Scan',
        ),
    ]
