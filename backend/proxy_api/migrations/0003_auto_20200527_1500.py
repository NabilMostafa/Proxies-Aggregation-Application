# Generated by Django 3.0.6 on 2020-05-27 13:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('proxy_api', '0002_auto_20200527_1448'),
    ]

    operations = [
        migrations.AlterField(
            model_name='proxy',
            name='createdAt',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='proxy',
            name='updatedAt',
            field=models.DateTimeField(),
        ),
    ]