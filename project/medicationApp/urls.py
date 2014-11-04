from django.conf.urls import patterns, url

from medicationApp import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
    url(r'^pete/', views.pete, name='pete'),
)
