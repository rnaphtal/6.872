from django.conf.urls import patterns, url

from medicationApp import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
)
