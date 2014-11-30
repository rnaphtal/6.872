# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('medicationApp', '0004_auto_20141120_2149'),
    ]

    operations = [
        migrations.AlterField(
            model_name='medication',
            name='drugName',
            field=models.CharField(max_length=200),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='medication',
            name='instructions',
            field=models.CharField(max_length=200),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='patient',
            name='name',
            field=models.CharField(max_length=200),
            preserve_default=True,
        ),
    ]
