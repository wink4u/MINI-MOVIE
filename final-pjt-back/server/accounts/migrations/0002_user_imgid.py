# Generated by Django 3.2.18 on 2023-05-24 11:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='imgId',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
