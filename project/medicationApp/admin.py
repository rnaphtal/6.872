from django.contrib import admin
from medicationApp.models import *

# Register your models here.
admin.site.register(Patient)
admin.site.register(SetAlarm)
admin.site.register(RecordedTaken)
admin.site.register(Medication)
