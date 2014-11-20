# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('medicationApp', '0002_auto_20141120_2057'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='medication',
            name='patient',
        ),
        migrations.AddField(
            model_name='patient',
            name='medications',
            field=models.ManyToManyField(to='medicationApp.Medication'),
            preserve_default=True,
        ),
    ]
