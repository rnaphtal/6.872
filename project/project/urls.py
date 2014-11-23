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
    
    url(r'^pete/', views.pete, name='pete'),
    url(r'^smartapp', views.index, name='test'),
    url(r'^getData/patient/(?P<patientId>[0-9]*)/(?P<patientName>[\w\s]*)', views.getPatient),
    url(r'^getData/medication/', views.getMedication),
    url(r'^$', views.index, name='index'),
    url(r'^my_calendar/', views.my_calendar, name='my_calendar')
)
