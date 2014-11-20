# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Medication',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('drugName', models.CharField(max_length=50)),
                ('instructions', models.CharField(max_length=50)),
                ('startDate', models.DateField()),
                ('freqValue', models.IntegerField()),
                ('freqUnit', models.CharField(max_length=50)),
                ('quantityValue', models.IntegerField()),
                ('quantityUnit', models.CharField(max_length=50)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50)),
                ('patient_id', models.CharField(max_length=8)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='RecordedTaken',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('dateTaken', models.DateField()),
                ('medication', models.ForeignKey(to='medicationApp.Medication')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='SetAlarm',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('dateSetFor', models.DateField()),
                ('medication', models.ForeignKey(to='medicationApp.Medication')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='medication',
            name='patient',
            field=models.ForeignKey(to='medicationApp.Patient'),
            preserve_default=True,
        ),
    ]
