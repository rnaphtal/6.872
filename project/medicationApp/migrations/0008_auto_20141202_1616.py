# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('medicationApp', '0007_auto_20141130_2023'),
    ]

    operations = [
        migrations.AddField(
            model_name='setalarm',
            name='email',
            field=models.EmailField(default=b'medreminder@gmail.com', max_length=75),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='medication',
            name='quantityUnit',
            field=models.CharField(max_length=50, blank=True),
            preserve_default=True,
        ),
    ]
