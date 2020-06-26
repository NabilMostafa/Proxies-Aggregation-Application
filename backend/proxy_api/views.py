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
        proxies = Proxy.objects.all().order_by('-id')
        for proxy in proxies:
            try:
                last_update_diff = (datetime.now() - proxy.updatedAt).days
            except:
                last_update_diff = 0
            last_found_diff = (datetime.now() - proxy.lastFoundAt).days
            if last_update_diff > 7 and last_found_diff > 7 and not proxy.working:
                proxy.delete()
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
    proxy_list_download()
    proxy_11()
    proxyscrape()
    awmproxy()


# ------------------------------------- Requesting proxies func -----------------------------

def proxy_list_download():
    threading.Timer(1900, proxy_list_download).start()
    proxyList = {"data": []}
    counter = 0

    # -------------------------------URL USA----------------------------
    url = 'https://www.proxy-list.download/api/v1/get?type=http&country=US'

    # -------------------------------URL Germany------------------------
    url2 = 'https://www.proxy-list.download/api/v1/get?type=http&country=DE'

    # ------------------------------- Getting time difference since last update -----------------------------------
    try:
        last_update_diff = (datetime.now() - ProxyProvider.objects.get(
            provider_name='proxy-list.download').last_time_update).seconds / 60
    except:
        last_update_diff = 11

    # ---------------------------------------------------------
    if last_update_diff > 10:
        response = requests.get(url)
        for ip in response.text.splitlines():
            proxyList["data"].append(
                {'ip': ip.split(':')[0], 'port': ip.split(':')[1]})

        response2 = requests.get(url2)
        for ip in response2.text.splitlines():
            proxyList["data"].append(
                {'ip': ip.split(':')[0], 'port': ip.split(':')[1]})
        provider = add_or_get_provider('https://www.proxy-list.download/api/v1/', 'proxy-list.download')
        try:
            provider.last_time_update = datetime.now()
            for proxy in proxyList['data']:
                counter += 1
                Proxy.objects.update_or_create(
                    ip=proxy['ip'],
                    defaults={
                        'provider': provider,
                        'createdAt': datetime.now(),
                        'port': proxy['port'],
                        'lastFoundAt': datetime.now(),
                    }
                )
            provider.number_of_records = counter
            provider.save()

        except Exception as e:
            print('Error in This list: ', e)


def proxy_11():
    threading.Timer(1900, proxy_11).start()
    url = 'https://proxy11.com/api/proxy.json'
    name = 'proxy11'
    counter = 0
    data = {
        'key': 'MTI2Mw.XswYVw.w4tBzZRqNF1zS8fdW4PFNE9pmG4',
    }
    # ------------------------------ Getting time difference since last update --------------------
    try:
        last_update_diff = (datetime.now() - ProxyProvider.objects.get(provider_name=name,
                                                                       provider_url=url).last_time_update).seconds / 60
    except:
        last_update_diff = 11
    # --------------------------------------------------------------------------------------------
    if last_update_diff > 10:
        provider = add_or_get_provider(url, name)
        response = requests.get(url, data)
        answer = json.loads(response.text)
        try:
            provider.last_time_update = datetime.now()
            for proxy in answer['data']:
                counter += 1
                Proxy.objects.update_or_create(
                    ip=proxy['ip'],
                    defaults={
                        'provider': provider,
                        'createdAt': datetime.strptime(proxy['createdAt'], '%a, %d %b %Y %H:%M:%S  %Z'),
                        'port': proxy['port'],
                        'lastFoundAt': datetime.now(),
                    }
                )
            provider.number_of_records = counter
            provider.save()

        except Exception as e:
            print('Error in This list: ', e)

        return answer


def proxyscrape():
    threading.Timer(1900, proxyscrape).start()
    proxyList = {"data": []}
    counter = 0

    # ------------------------------- URL ----------------------------
    url = 'https://api.proxyscrape.com/?request=getproxies&proxytype=http,https&limit=250'

    # ------------------------------- Getting time difference since last update -----------------------------------
    try:
        last_update_diff = (datetime.now() - ProxyProvider.objects.get(
            provider_name='proxyscrape').last_time_update).seconds / 60
    except:
        last_update_diff = 11

    # ---------------------------------------------------------
    if last_update_diff > 10:
        response = requests.get(url)
        for ip in response.text.splitlines():
            proxyList["data"].append(
                {'ip': ip.split(':')[0], 'port': ip.split(':')[1]})

        provider = add_or_get_provider('https://api.proxyscrape.com/?request=getproxies', 'proxyscrape')
        try:
            provider.last_time_update = datetime.now()
            for proxy in proxyList['data']:
                counter += 1
                Proxy.objects.update_or_create(
                    ip=proxy['ip'],
                    defaults={
                        'provider': provider,
                        'createdAt': datetime.now(),
                        'port': proxy['port'],
                        'lastFoundAt': datetime.now(),
                    }
                )
            provider.number_of_records = counter
            provider.save()

        except Exception as e:
            print('Error in This list: ', e)


def awmproxy():
    threading.Timer(1900, awmproxy).start()
    proxyList = {"data": []}

    # ------------------------------- URL ----------------------------
    url = 'https://awmproxy.net/freeproxy_5762d603d45c78e.txt'

    # ------------------------------- Getting time difference since last update -----------------------------------
    try:
        last_update_diff = (datetime.now() - ProxyProvider.objects.get(
            provider_name='awmproxy').last_time_update).seconds / 60
    except:
        last_update_diff = 11

    # ---------------------------------------------------------
    if last_update_diff > 10:
        for i in range(250):
            response = requests.get(url)
            ip = response.text.splitlines()[i]
            proxyList["data"].append(
                {'ip': ip.split(':')[0], 'port': ip.split(':')[1]})
        # add_new_proxies('https://awmproxy.net/', 'awmproxy', proxyList)


def add_new_proxies(url, name, proxyList):
    counter = 0

    provider = add_or_get_provider(url, name)
    try:
        provider.last_time_update = datetime.now()
        for proxy in proxyList['data']:
            counter += 1
            Proxy.objects.update_or_create(
                ip=proxy['ip'],
                defaults={
                    'provider': provider,
                    'createdAt': datetime.now(),
                    'port': proxy['port'],
                    'lastFoundAt': datetime.now(),
                }
            )
        provider.number_of_records = counter
        provider.save()

    except Exception as e:
        print('Error in This list: ', e)


# ----------------------------------------------------------------------------------------------------------------
def add_or_get_provider(url, name):
    try:
        provider = ProxyProvider.objects.get(provider_url=url)
        provider.save()
        return provider
    except:
        provider = ProxyProvider()
        provider.provider_url = url
        provider.provider_name = name
        provider.last_time_update = datetime.now()
        provider.save()
    return provider


@csrf_exempt
def check_test_url(request):
    try:
        data = json.loads(request.body)
        test_url = TestUrls.objects.filter(proxy__id=data['id'])
        serializer = TestUrlsSerializer(test_url, many=True)
        return JsonResponse(serializer.data, safe=False)
    except Exception as e:
        return JsonResponse({'error': True, 'errorText': e})


# -------------------testing-----------------------
@csrf_exempt
def check_proxy(request):
    data = json.loads(request.body)
    proxy = Proxy.objects.get(id=data['id'])
    test_url = data['test_url']
    if is_working_proxy(proxy, test_url):
        print(proxy.ip, "is working")
        proxy.working = True
        proxy.updatedAt = datetime.now()
        proxy.save()
        add_or_update_test_url(proxy, test_url, True)
        testurl = TestUrls.objects.get(test_url=test_url, proxy=proxy)
        serializer = TestUrlsSerializer(testurl)
        return JsonResponse({'error': False, 'working': True, 'test_url': serializer.data}, safe=False)
    else:
        print("Bad Proxy", proxy.ip)
        proxy.working = False
        proxy.save()
        return JsonResponse({'error': False, 'working': False})


def is_working_proxy(proxy, url):
    try:
        print(proxy.ip)
        print(url)
        proxy_ip = str(proxy.ip + ':' + proxy.port)

        r = requests.get(url=url,
                         proxies={"http": proxy_ip})
        print(r)
        print(r.text)

        return True
    except Exception as e:
        print(proxy, 'fail', e)
        return False


def add_or_update_test_url(proxy, url, working):
    TestUrls.objects.update_or_create(
        test_url=url,
        defaults={
            'proxy': proxy,
            'working': working,
            'checkedAt': datetime.now()
        }
    )
