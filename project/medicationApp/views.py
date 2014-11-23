from django.shortcuts import render
from django.http import HttpResponse
from django.template import RequestContext, loader
from django.core.mail import send_mail
from .models import *
from django.core import serializers
import json

X_FRAME_OPTIONS = 'ALLOW'

# Create your views here.
def index(request):
   # return HttpResponse("Hello, world. You're at the medicaiton app index.")
    template = loader.get_template('medicationApp/index.html')
    context = RequestContext(request, {
    })
    return HttpResponse(template.render(context))

def pete(request):
   # return HttpResponse("Hello, world. You're at the medicaiton app index.")
    template = loader.get_template('medicationApp/pete.html')
    context = RequestContext(request, {
    })
    return HttpResponse(template.render(context))

def getPatient(request, patientId, patientName):
   print patientId, patientName
   currentPatient=Patient.objects.filter(patient_id=patientId)
   #print currentPatient
   #print request
   if (not currentPatient):
       currentPatient = Patient(patient_id=patientId, name=patientName)
       currentPatient.save()
       currentPatient=Patient.objects.filter(patient_id=patientId)
   data = serializers.serialize('json', currentPatient)
   return HttpResponse(data, content_type="application/json")

def getMedication(request):
   #print request
   parameters=request.GET.dict()
   currentMedication=Medication.objects.filter(drugName=parameters["drugname"]).filter(startDate=parameters["startDate"])
   print currentMedication
   if (not currentMedication):
       currentMedication = Medication(drugName=parameters["drugname"],
                                      instructions=parameters["instructions"],
                                      startDate=parameters["startDate"],
                                      freqValue=parameters["freqvalue"],
                                      freqUnit=parameters["frequnit"],
                                      quantityValue=parameters["quantityvalue"],
                                      quantityUnit=parameters["quantityunit"])
       currentMedication.save()
       currentMedication= Medication.objects.filter(drugName=parameters["drugname"]).filter(startDate=parameters["startDate"])
   data = serializers.serialize('json', currentMedication)
   return HttpResponse(data, content_type="application/json")

def test(request):
   # return HttpResponse("Hello, world. You're at the medicaiton app index.")
    template = loader.get_template('medicationApp/test.html')
    context = RequestContext(request, {
    })
    print "hilary is awesome!!! <3 Rach"
##    send_mail('Subject here', 'Here is the message.', 'rnaphtal@gmail.com',
##    ['mymeds@mit.edu'], fail_silently=False)
##    print "email"
    return HttpResponse(template.render(context))

def my_calendar(request):
   # return HttpResponse("Hello, world. You're at the medicaiton app index.")
    template = loader.get_template('medicationApp/my_calendar.html')
    context = RequestContext(request, {
    })
    return HttpResponse(template.render(context))
