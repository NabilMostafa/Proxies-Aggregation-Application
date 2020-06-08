from rest_framework import serializers
from proxy_api.models import *


class ProxySerializer(serializers.ModelSerializer):
    proxyUrl = serializers.SerializerMethodField('get_proxy_url')
    providerName = serializers.SerializerMethodField('get_provider_name')

    def get_proxy_url(self, obj):
        return obj.provider.provider_url

    def get_provider_name(self, obj):
        return obj.provider.provider_name

    class Meta:
        model = Proxy
        fields = '__all__'
