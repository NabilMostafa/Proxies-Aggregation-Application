from rest_framework import serializers
from proxy_api.models import *


class ProxySerializer(serializers.ModelSerializer):
    class Meta:
        model = Proxy
        fields = '__all__'
