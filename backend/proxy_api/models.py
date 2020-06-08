from django.db import models


# Create your models here.

class ProxyProvider(models.Model):
    provider_url = models.CharField(max_length=100, default='', unique=True)
    last_time_update = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    provider_name = models.CharField(max_length=100, default='')


class Proxy(models.Model):
    provider = models.ForeignKey(ProxyProvider, on_delete=models.CASCADE, related_name="proxy_provider")
    country = models.CharField(max_length=100, default='')
    country_code = models.CharField(max_length=100, default='')
    createdAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    ip = models.CharField(max_length=50, default=0, unique=True)
    port = models.CharField(max_length=5, default=0)
    updatedAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    working = models.BooleanField(default=True)
