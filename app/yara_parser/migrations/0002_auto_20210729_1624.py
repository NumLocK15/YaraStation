# Generated by Django 2.2.10 on 2021-07-29 16:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('yara_parser', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Triggers',
            new_name='file_scan',
        ),
    ]
