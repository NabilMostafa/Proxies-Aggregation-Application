import os

import ipinfo
import requests
import json
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser

from proxy import settings
from proxy_api.models import *
from proxy_api.serializers import *
import time
import threading
from datetime import datetime, timedelta
from pytz import utc
import urllib.request as urllib
import urllib3


# Create your views here.

@csrf_exempt
def proxies_list(request):
    if request.method == 'GET':
        proxy_list()
        proxies = Proxy.objects.all()
        serializer = ProxySerializer(proxies, many=True)
        # --------------------------------------------------
        provider = ProxyProvider.objects.all()
        serializer2 = ProviderSerializer(provider, many=True)
        return JsonResponse({'proxies': serializer.data, 'providers': serializer2.data}, safe=False)


@csrf_exempt
def provider_list(request, id):
    if request.method == 'GET':
        proxies = Proxy.objects.filter(provider__id=id)
        serializer = ProxySerializer(proxies, many=True)
        # --------------------------------------------------

        provider = ProxyProvider.objects.get(id=id)
        serializer2 = ProviderSerializer(provider)
        return JsonResponse({'proxies': serializer.data, 'providers': serializer2.data}, safe=False)


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
def is_bad_proxy(proxy, url):
    try:
        print('HTTP han aho test')
        r = requests.get(url='http://httpbin.org/ip',
                         proxies={"http": '46.10.199.90:34607'})
        print(r.json()['origin'])

        return False
    except Exception as e:
        print(proxy, 'fail', e)
        return True


def is_proxy_working(pip):
    proxyparsed = "https://" + (pip)
    proxy = urllib3.ProxyManager(proxyparsed, timeout=3.0)
    try:
        r = proxy.request('GET', 'https://api.ipify.org/')
        print(r)
    except Exception:
        return False

    if r.status == 200 and r.data.decode("utf-8") == pip.split(':')[0]:
        return True

    else:
        return False

# ------------------------- TO BE REMOVED -
#
# def check_proxy_list():
#     proxylist = []
#     proxies = Proxy.objects.all()
#     for proxy in proxies:
#         # proxylist.append(proxy.ip + ':' + proxy.port)
#         proxylist.append(proxy.ip)
#     # test_url = 'https://ipinfo.io?token=abaf4461e138e8'
#     test_url = 'http://httpbin.org/ip'
#     # location()
#     for item in proxylist:
#         if is_bad_proxy(item, test_url):
#             # print("Bad Proxy", item)
#             print('')
#         else:
#             # print(item, "is working")
#             print('')

#     # return False
# except Exception as e:
#     print('Http Failed')
#     try:
#         proxyDict = {"https": '45.229.193.109'}
#         print('HTTPS han aho test')
#         r = requests.get(url=url, proxies=proxyDict)
#
#         print(r.json())
#     except Exception as e:
#         print('Error code: ', e)
# return True

#
# def get_ip_details(ip_address=None):
#     ipinfo_token = getattr(settings, "IPINFO_TOKEN", None)
#     ipinfo_settings = getattr(settings, "IPINFO_SETTINGS", {})
#     ip_data = ipinfo.getHandler(ipinfo_token, **ipinfo_settings)
#     ip_data = ip_data.getDetails(ip_address)
#     return ip_data

# def location():
#     ip_data = get_ip_details('202.147.207.253')

# response_string = 'The IP address {} is located at the coordinates {}, which is in the city {}.'.format(
#     ip_data.ip, ip_data.loc, ip_data.city)
# print(response_string)
# return HttpResponse(response_string)
# try:
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
# print('aho start')
# print(check('87.126.43.160:8080'))
# ok, error = await check('PROXY')
# if not ok:
#     print(error)
# if not ok:
#     print(error)
# except Exception as e:
#     print(e)
