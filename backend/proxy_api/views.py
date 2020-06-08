import os

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
from datetime import datetime, timedelta
from pytz import utc
import urllib.request as urllib
from proxy_check import check
import requests_async as requests

# Create your views here.

@csrf_exempt
def proxies_list(request):
    if request.method == 'GET':
        proxy_list()
        proxies = Proxy.objects.all()
        serializer = ProxySerializer(proxies, many=True)
        return JsonResponse([serializer.data], safe=False)


def proxy_list():
    # check_proxy_list()
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
    threading.Timer(1900, proxy_11).start()
    url = 'https://proxy11.com/api/proxy.json'
    name = 'proxy11'
    data = {
        'key': 'MTI2Mw.XswYVw.w4tBzZRqNF1zS8fdW4PFNE9pmG4',
    }
    last_update_diff = (datetime.now() - ProxyProvider.objects.get(provider_name=name,
                                                                   provider_url=url).last_time_update).seconds / 60
    if last_update_diff > 10:
        response = requests.get(url, data)
        answer = json.loads(response.text)
        provider = add_or_get_provider(url, name)
        try:

            for proxy in answer['data']:
                Proxy.objects.update_or_create(
                    ip=proxy['ip'],
                    defaults={
                        'provider': provider,
                        'country': proxy['country'],
                        'country_code': proxy['country_code'],
                        'createdAt': datetime.strptime(proxy['createdAt'], '%a, %d %b %Y %H:%M:%S  %Z'),
                        'port': proxy['port'],
                        'updatedAt': datetime.strptime(proxy['updatedAt'], '%a, %d %b %Y %H:%M:%S  %Z'),
                    }
                )
        except Exception as e:
            print('Error in This list: ', e)

        return answer


def add_or_get_provider(url, name):
    try:
        provider = ProxyProvider.objects.get(provider_url=url)
        provider.last_time_update = datetime.now()
        provider.save()
    except:
        provider = ProxyProvider()
        provider.provider_url = url
        provider.provider_name = name
        provider.last_time_update = datetime.now()
        provider.save()
    return provider


# -------------------testing-----------------------
@csrf_exempt
def check_proxy(request):
    data = json.loads(request.body)
    proxy = Proxy.objects.get(id=data['id'])
    test_url = 'https://httpbin.org/ip'
    if is_bad_proxy(proxy, test_url):
        print("Bad Proxy", proxy.ip)
        proxy.working = False
        proxy.save()
        return JsonResponse({'error': False, 'working': False})
    else:
        print(proxy.ip, "is working")
        proxy.working = True
        proxy.save()
        return JsonResponse({'error': False, 'working': True}, safe=False)


#
#
# def check_proxy_list():
#     proxylist = []
#     proxies = Proxy.objects.all()
#     for proxy in proxies:
#         proxylist.append(proxy.ip + ':' + proxy.port)
#     print(proxylist)
#     test_url = 'https://httpbin.org/ip'
#     for item in proxylist:
#         if is_bad_proxy(item, test_url):
#             print("Bad Proxy", item)
#         else:
#             print(item, "is working")


# def is_bad_proxy(proxy, url):
# try:
#     checker = ProxyChecker()
#     checker.check_proxy('13.66.88.8:3128')
#     print(type(checker))
    # proxyDict = {"http": '87.126.43.160:8080', 'https': '87.126.43.160:8080'}
    # print('han aho test')
    # r = requests.get(url='https://ipinfo.io/json', proxies=proxyDict,
    #                  headers={'User-Agent': 'Chrome'})
    #
    # print(r.json())
    # return False
# except Exception as e:
#     print('Error code: ', e)
    # return True

try:
    # http = "http://10.10.1.10:1080"
    # https = "https://10.10.1.11:3128"
    # ftp = "ftp://10.10.1.10:8080"
    #
    # proxy_dict = {
    #     "http": http,
    #     "https": https,
    #     "ftp": ftp
    # }
    #
    # proxiesDict = {
    #     'http': "socks5://87.126.43.160:8080",
    #     'https': "socks5://87.126.43.160:8080"
    # }
    # r = requests.get('https://httpbin.org/ip', proxies=proxiesDict)
    # print(r.json())
    print('aho start')
    print(check('87.126.43.160:8080'))
    ok, error = await check('PROXY')
    if not ok:
        print(error)
    # if not ok:
    #     print(error)
except Exception as e:
    print(e)