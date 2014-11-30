# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('medicationApp', '0005_auto_20141130_2007'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recordedtaken',
            name='dateTaken',
            field=models.TimeField(),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='setalarm',
            name='dateSetFor',
            field=models.TimeField(),
            preserve_default=True,
        ),
    ]
