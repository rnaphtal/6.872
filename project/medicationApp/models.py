from django.db import models

# Create your models here.
class SetAlarm (models.Model):
 #   medication = models.ForeignKey(Medication)
    dateSetFor = models.DateField()
    

class RecordedTaken (models.Model):
 #   medication = models.ForeignKey(Medication)
    dateTaken = models.DateField()

class Medication(models.Model):
    drugName = models.CharField(max_length=50)
    instructions= models.CharField(max_length=50)
    startDate = models.DateField()
    freqValue = models.IntegerField()
    freqUnit = models.CharField(max_length=50)
    quantityValue = models.IntegerField()
    quantityUnit = models.CharField(max_length=50)
    setAlarms= models.ManyToManyField(SetAlarm, blank=True)
    recordedDoses= models.ManyToManyField(RecordedTaken, blank=True)

class Patient(models.Model):
    name = models.CharField(max_length=50)
    patient_id = models.CharField(max_length=8)
    medications= models.ManyToManyField(Medication, blank=True)

    def __unicode__(self):
        return self.name+":"+self.patient_id
