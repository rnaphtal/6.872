# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('medicationApp', '0008_auto_20141202_1616'),
    ]

    operations = [
        migrations.AddField(
            model_name='medication',
            name='row',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
