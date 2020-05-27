from django.db import models


# Create your models here.


class Proxy(models.Model):
    provider = models.CharField(max_length=100, default='')
    country = models.CharField(max_length=100, default='')
    country_code = models.CharField(max_length=100, default='')
    createdAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    ip = models.CharField(max_length=50, default=0)
    port = models.CharField(max_length=5, default=0)
    updatedAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
