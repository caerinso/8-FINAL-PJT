# Generated by Django 3.2.13 on 2022-11-17 03:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0003_remove_movie_actors'),
    ]

    operations = [
        migrations.AddField(
            model_name='movie',
            name='actors',
            field=models.ManyToManyField(to='movies.Actor'),
        ),
    ]
