# Generated by Django 2.1.7 on 2020-06-24 20:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('proxy_api', '0011_testurls_working'),
    ]

    operations = [
        migrations.RenameField(
            model_name='testurls',
            old_name='Proxy',
            new_name='proxy',
        ),
    ]
