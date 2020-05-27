from django.urls import path
from proxy_api import views

urlpatterns = [
    path('proxies/', views.proxies_list),
]