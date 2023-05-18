# Generated by Django 3.2.18 on 2023-05-18 05:24

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('overview', models.CharField(blank=True, max_length=200)),
                ('poster_path', models.CharField(blank=True, max_length=200)),
                ('release_date', models.CharField(blank=True, max_length=200)),
                ('title', models.CharField(blank=True, max_length=200)),
                ('vote_average', models.FloatField(blank=True)),
            ],
        ),
    ]
