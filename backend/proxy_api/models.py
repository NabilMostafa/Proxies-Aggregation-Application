from django.db import models


# Create your models here.

class ProxyProvider(models.Model):
    provider_url = models.CharField(max_length=100, default='', unique=True)
    last_time_update = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    provider_name = models.CharField(max_length=100, default='')
    provider_details = models.CharField(max_length=500, default='')
    number_of_records = models.IntegerField(null=True,blank=True)


class Proxy(models.Model):
    provider = models.ForeignKey(ProxyProvider, on_delete=models.CASCADE, related_name="proxy_provider")
    ip = models.CharField(max_length=50, default=0, unique=True)
    port = models.CharField(max_length=5, default=0)
    createdAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    updatedAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    lastFoundAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    working = models.BooleanField(default=True)


class TestUrls(models.Model):
    proxy = models.ForeignKey(Proxy, on_delete=models.CASCADE, related_name="proxy_test_url")
    checkedAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    test_url = models.CharField(max_length=100, default='', unique=True)
    working = models.BooleanField(default=True)
