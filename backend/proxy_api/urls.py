from django.urls import path
from proxy_api import views

urlpatterns = [
    path('proxies/', views.proxies_list),
    path('provider-list/<int:id>', views.provider_list),
    path('check/', views.check_proxy),
    path('check_test_url/', views.check_test_url),
]
