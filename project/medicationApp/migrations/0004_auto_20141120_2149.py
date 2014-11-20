# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('medicationApp', '0003_auto_20141120_2104'),
    ]

    operations = [
        migrations.AlterField(
            model_name='medication',
            name='recordedDoses',
            field=models.ManyToManyField(to='medicationApp.RecordedTaken', blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='medication',
            name='setAlarms',
            field=models.ManyToManyField(to='medicationApp.SetAlarm', blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='patient',
            name='medications',
            field=models.ManyToManyField(to='medicationApp.Medication', blank=True),
            preserve_default=True,
        ),
    ]
