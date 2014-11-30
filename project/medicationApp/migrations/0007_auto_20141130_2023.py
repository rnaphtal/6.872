# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('medicationApp', '0006_auto_20141130_2014'),
    ]

    operations = [
        migrations.AlterField(
            model_name='medication',
            name='quantityUnit',
            field=models.CharField(default=b' ', max_length=50),
            preserve_default=True,
        ),
    ]
