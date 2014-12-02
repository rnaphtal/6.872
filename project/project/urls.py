from django.conf.urls import patterns, include, url
from django.contrib import admin
from medicationApp import views

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'project.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^medication', include('medicationApp.urls')),
    #url(r'^$', include('medicationApp.urls')),
    
    url(r'^smartapp', views.frontPage, name='test'),
    url(r'^getData/patient/(?P<patientId>[0-9]*)/(?P<patientName>[\w\s:]*)', views.getPatient),
    url(r'^getData/getAlarm/(?P<alarmId>[0-9]*)/', views.getAlarm),
    url(r'^getData/medication/', views.getMedication),
    url(r'^$', views.frontPage, name='index'),
    url(r'^my_calendar/', views.my_calendar, name='my_calendar'),
    url(r'^record/', views.record, name='my_calendar'),
    url(r'^alarms/', views.index, name='alarms'),
    url(r'^getalarms/', views.getAllAlarms, name='my_calendar'),
    url(r'^addAlarm/(?P<alarmId>[0-9]*)/', views.addAlarm, name='my_calendar'),
    url(r'^deleteAlarm/(?P<medicationId>[0-9]*)/', views.deleteAlarm)
                       
)
