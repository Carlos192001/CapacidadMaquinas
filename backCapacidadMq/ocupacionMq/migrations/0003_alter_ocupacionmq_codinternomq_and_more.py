# Generated by Django 5.0.4 on 2024-05-08 15:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ocupacionMq', '0002_rename_idmaquina_ocupacionmq_codinternomq_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ocupacionmq',
            name='codInternoMq',
            field=models.CharField(max_length=255, verbose_name='codInternoMq'),
        ),
        migrations.AlterField(
            model_name='ocupacionmq',
            name='numParte',
            field=models.CharField(max_length=255, verbose_name='numParte'),
        ),
    ]
