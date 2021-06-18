from django.conf.urls import url
from core import views

urlpatterns =[
    url(r'^api/core$',views.core_list),
    url(r'^api/core/(?P<pk>[0-9]+)$', views.core_detail),
    url(r'^api/core/tag$', views.core_list_tag)
]