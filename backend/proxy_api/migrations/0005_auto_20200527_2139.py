# Generated by Django 2.1.7 on 2020-05-27 19:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('proxy_api', '0004_remove_proxy_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='proxy',
            name='createdAt',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='proxy',
            name='updatedAt',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
