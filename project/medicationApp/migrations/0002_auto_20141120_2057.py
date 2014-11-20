# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('medicationApp', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='recordedtaken',
            name='medication',
        ),
        migrations.RemoveField(
            model_name='setalarm',
            name='medication',
        ),
        migrations.AddField(
            model_name='medication',
            name='recordedDoses',
            field=models.ManyToManyField(to='medicationApp.RecordedTaken'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='medication',
            name='setAlarms',
            field=models.ManyToManyField(to='medicationApp.SetAlarm'),
            preserve_default=True,
        ),
    ]
