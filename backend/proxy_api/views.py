import requests
import json
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from proxy_api.models import *
from proxy_api.serializers import *
import time
import threading
from datetime import datetime


# Create your views here.

@csrf_exempt
def proxies_list(request):
    if request.method == 'GET':
        proxies = Proxy.objects.all()
        serializer = ProxySerializer(proxies, many=True)
        proxy_list()
        return JsonResponse([serializer.data], safe=False)


def proxy_list():
    proxy_11()


# def proxy_spider():
#     threading.Timer(60, proxy_spider).start()
#
#     url = 'https://proxy-spider.com/api/proxies.json'
#     data = {
#         'api_key': '01-29e391a999a65dec5a431757a876524',
#     }
#     response = requests.post(url, data)
#     answer = json.loads(response.text)
#     return answer['data']


def proxy_11():
    threading.Timer(600, proxy_11).start()
    url = 'https://proxy11.com/api/proxy.json'
    data = {
        'key': 'MTI2Mw.XswYVw.w4tBzZRqNF1zS8fdW4PFNE9pmG4',
    }
    response = requests.get(url, data)
    answer = json.loads(response.text)
    try:
        for proxy in answer['data']:
            Proxy.objects.update_or_create(
                ip=proxy['ip'],
                defaults={
                    'country': proxy['country'],
                    'country_code': proxy['country_code'],
                    'createdAt': datetime.strptime(proxy['createdAt'], '%a, %d %B %Y %H:%M:%S  %Z'),
                    'port': proxy['port'],
                    'updatedAt': datetime.strptime(proxy['updatedAt'], '%a, %d %B %Y %H:%M:%S  %Z'),
                    'provider': 'https://proxy11.com/'
                }
            )
    except Exception as e:
        print('Error in This list: ', e)

    return answer
