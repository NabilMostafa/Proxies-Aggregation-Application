# Generated by Django 2.1.7 on 2020-06-25 23:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('proxy_api', '0013_auto_20200625_2153'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='proxy',
            name='country',
        ),
        migrations.RemoveField(
            model_name='proxy',
            name='country_code',
        ),
    ]
