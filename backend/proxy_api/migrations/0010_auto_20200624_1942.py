# Generated by Django 2.1.7 on 2020-06-24 19:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('proxy_api', '0009_proxy_working'),
    ]

    operations = [
        migrations.CreateModel(
            name='TestUrls',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('checkedAt', models.DateTimeField(blank=True, null=True)),
                ('test_url', models.CharField(default='', max_length=100, unique=True)),
            ],
        ),
        migrations.AddField(
            model_name='proxy',
            name='lastFoundAt',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='testurls',
            name='Proxy',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='proxy_test_url', to='proxy_api.Proxy'),
        ),
    ]