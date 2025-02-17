# Generated by Django 5.0.4 on 2024-05-15 16:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('datosAcalcular', '0004_alter_datosacalcular_cambioherramental_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='datosacalcular',
            name='cambioHerramental',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True, verbose_name='cambioHerramental'),
        ),
        migrations.AlterField(
            model_name='datosacalcular',
            name='cantidadDummys',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True, verbose_name='cantidadDummys'),
        ),
        migrations.AlterField(
            model_name='datosacalcular',
            name='cavidades',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True, verbose_name='cavidades'),
        ),
        migrations.AlterField(
            model_name='datosacalcular',
            name='cortesXminuto',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True, verbose_name='cortesXminuto'),
        ),
        migrations.AlterField(
            model_name='datosacalcular',
            name='demorasInevitables',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True, verbose_name='demorasInevitables'),
        ),
        migrations.AlterField(
            model_name='datosacalcular',
            name='diasAlaborarSemana',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True, verbose_name='diasAlaborarSemana'),
        ),
        migrations.AlterField(
            model_name='datosacalcular',
            name='espacioEntrePza',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True, verbose_name='espacioEntrePza'),
        ),
        migrations.AlterField(
            model_name='datosacalcular',
            name='filasDummysSimultaneas',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True, verbose_name='filasDummysSimultaneas'),
        ),
        migrations.AlterField(
            model_name='datosacalcular',
            name='filasJigsSimultaneas',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True, verbose_name='filasJigsSimultaneas'),
        ),
        migrations.AlterField(
            model_name='datosacalcular',
            name='golpesXminutos',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True, verbose_name='golpesXminutos'),
        ),
        migrations.AlterField(
            model_name='datosacalcular',
            name='horasDelTurno',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True, verbose_name='horasDelTurno'),
        ),
        migrations.AlterField(
            model_name='datosacalcular',
            name='longDePza',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True, verbose_name='longDePza'),
        ),
        migrations.AlterField(
            model_name='datosacalcular',
            name='longEfectivoBanda',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True, verbose_name='longEfectivoBanda'),
        ),
        migrations.AlterField(
            model_name='datosacalcular',
            name='longTotalBanda',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True, verbose_name='longTotalBanda'),
        ),
        migrations.AlterField(
            model_name='datosacalcular',
            name='longTrabajoBanda',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True, verbose_name='longTrabajoBanda'),
        ),
        migrations.AlterField(
            model_name='datosacalcular',
            name='longitudDummy',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True, verbose_name='longitudDummy'),
        ),
        migrations.AlterField(
            model_name='datosacalcular',
            name='longitudEntreDummys',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True, verbose_name='longitudEntreDummys'),
        ),
        migrations.AlterField(
            model_name='datosacalcular',
            name='longitudEntreJigs',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True, verbose_name='longitudEntreJigs'),
        ),
        migrations.AlterField(
            model_name='datosacalcular',
            name='longitudJig',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True, verbose_name='longitudJig'),
        ),
        migrations.AlterField(
            model_name='datosacalcular',
            name='numCambiosReceta',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True, verbose_name='numCambiosReceta'),
        ),
        migrations.AlterField(
            model_name='datosacalcular',
            name='numDeCambiosHerra',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True, verbose_name='numDeCambiosHerra'),
        ),
        migrations.AlterField(
            model_name='datosacalcular',
            name='numLadosAfluxear',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True, verbose_name='numLadosAfluxear'),
        ),
        migrations.AlterField(
            model_name='datosacalcular',
            name='observaciones',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='observaciones'),
        ),
        migrations.AlterField(
            model_name='datosacalcular',
            name='paradasProgramadas',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True, verbose_name='paradasProgramadas'),
        ),
        migrations.AlterField(
            model_name='datosacalcular',
            name='pzaRequeridas',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True, verbose_name='pzaRequeridas'),
        ),
        migrations.AlterField(
            model_name='datosacalcular',
            name='requeriAnualAutilizar',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True, verbose_name='requeriAnualAutilizar'),
        ),
        migrations.AlterField(
            model_name='datosacalcular',
            name='scrapLiberado',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True, verbose_name='scrapLiberado'),
        ),
        migrations.AlterField(
            model_name='datosacalcular',
            name='semanasAlaborar',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True, verbose_name='semanasAlaborar'),
        ),
        migrations.AlterField(
            model_name='datosacalcular',
            name='tiempoCicloXpza',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True, verbose_name='tiempoCicloXpza'),
        ),
        migrations.AlterField(
            model_name='datosacalcular',
            name='tiempoSetUp',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True, verbose_name='tiempoSetUp'),
        ),
        migrations.AlterField(
            model_name='datosacalcular',
            name='turnoConsecutivo',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True, verbose_name='turnoConsecutivo'),
        ),
        migrations.AlterField(
            model_name='datosacalcular',
            name='turnoInicial',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True, verbose_name='turnoInicial'),
        ),
        migrations.AlterField(
            model_name='datosacalcular',
            name='turnosAlDia',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True, verbose_name='turnosAlDia'),
        ),
        migrations.AlterField(
            model_name='datosacalcular',
            name='velocidadBanda',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True, verbose_name='velocidadBanda'),
        ),
    ]
