# Generated by Django 2.1.7 on 2020-06-25 23:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('proxy_api', '0014_auto_20200625_2349'),
    ]

    operations = [
        migrations.AlterField(
            model_name='proxyprovider',
            name='number_of_records',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
