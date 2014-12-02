from django.db import models

# Create your models here.
class SetAlarm (models.Model):
 #   medication = models.ForeignKey(Medication)
    dateSetFor = models.TimeField()
    email = models.EmailField(default="medreminder@gmail.com")
    def __unicode__(self):
        return str(self.dateSetFor)
    

class RecordedTaken (models.Model):
 #   medication = models.ForeignKey(Medication)
    dateTaken = models.TimeField()
    def __unicode__(self):
        return str(self.dateTaken)

class Medication(models.Model):
    drugName = models.CharField(max_length=200)
    instructions= models.CharField(max_length=200)
    startDate = models.DateField()
    freqValue = models.IntegerField()
    row = models.IntegerField()
    freqUnit = models.CharField(max_length=50)
    quantityValue = models.IntegerField()
    quantityUnit = models.CharField(max_length=50, blank=True)
    setAlarms= models.ManyToManyField(SetAlarm, blank=True)
    recordedDoses= models.ManyToManyField(RecordedTaken, blank=True)
    def __unicode__(self):
        return self.drugName

class Patient(models.Model):
    name = models.CharField(max_length=200)
    patient_id = models.CharField(max_length=8)
    medications= models.ManyToManyField(Medication, blank=True)

    def __unicode__(self):
        return self.name

    
