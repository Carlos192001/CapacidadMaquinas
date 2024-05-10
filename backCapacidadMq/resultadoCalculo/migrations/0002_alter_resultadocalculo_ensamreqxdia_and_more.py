# Generated by Django 5.0.4 on 2024-05-10 11:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resultadoCalculo', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='resultadocalculo',
            name='ensamReqXdia',
            field=models.DecimalField(decimal_places=3, max_digits=10, verbose_name='ensamReqXdia'),
        ),
        migrations.AlterField(
            model_name='resultadocalculo',
            name='ensamXdiaMasScrap',
            field=models.DecimalField(decimal_places=3, max_digits=10, verbose_name='ensamXdiaMasScrap'),
        ),
        migrations.AlterField(
            model_name='resultadocalculo',
            name='ensamblesXhora',
            field=models.DecimalField(decimal_places=3, max_digits=10, verbose_name='ensamblesXhora'),
        ),
        migrations.AlterField(
            model_name='resultadocalculo',
            name='ensamblesXminuto',
            field=models.DecimalField(decimal_places=3, max_digits=10, verbose_name='ensamblesXminuto'),
        ),
        migrations.AlterField(
            model_name='resultadocalculo',
            name='horaSemanaTurno',
            field=models.DecimalField(decimal_places=3, max_digits=10, verbose_name='horaSemanaTurno'),
        ),
        migrations.AlterField(
            model_name='resultadocalculo',
            name='horneadoXpzaPrimerDummy',
            field=models.DecimalField(decimal_places=3, max_digits=10, verbose_name='horneadoXpzaPrimerDummy'),
        ),
        migrations.AlterField(
            model_name='resultadocalculo',
            name='horneadoXpzaProducto',
            field=models.DecimalField(decimal_places=3, max_digits=10, verbose_name='horneadoXpzaProducto'),
        ),
        migrations.AlterField(
            model_name='resultadocalculo',
            name='horneadoXpzaRestoDummys',
            field=models.DecimalField(decimal_places=3, max_digits=10, verbose_name='horneadoXpzaRestoDummys'),
        ),
        migrations.AlterField(
            model_name='resultadocalculo',
            name='hrsEfectivasXturno',
            field=models.DecimalField(decimal_places=3, max_digits=10, verbose_name='hrsEfectivasXturno'),
        ),
        migrations.AlterField(
            model_name='resultadocalculo',
            name='hrsNcesRequeDiario',
            field=models.DecimalField(decimal_places=3, max_digits=10, verbose_name='hrsNcesRequeDiario'),
        ),
        migrations.AlterField(
            model_name='resultadocalculo',
            name='hrsXdiaRequeriSemanal',
            field=models.DecimalField(decimal_places=3, max_digits=10, verbose_name='hrsXdiaRequeriSemanal'),
        ),
        migrations.AlterField(
            model_name='resultadocalculo',
            name='longTotalJigDummy',
            field=models.DecimalField(decimal_places=3, max_digits=10, verbose_name='longTotalJigDummy'),
        ),
        migrations.AlterField(
            model_name='resultadocalculo',
            name='longTotalJigProducto',
            field=models.DecimalField(decimal_places=3, max_digits=10, verbose_name='longTotalJigProducto'),
        ),
        migrations.AlterField(
            model_name='resultadocalculo',
            name='numColDummys',
            field=models.DecimalField(decimal_places=3, max_digits=10, verbose_name='numColDummys'),
        ),
        migrations.AlterField(
            model_name='resultadocalculo',
            name='numColJigProducto',
            field=models.DecimalField(decimal_places=3, max_digits=10, verbose_name='numColJigProducto'),
        ),
        migrations.AlterField(
            model_name='resultadocalculo',
            name='numTurnosRequeridos',
            field=models.DecimalField(decimal_places=3, max_digits=10, verbose_name='numTurnosRequeridos'),
        ),
        migrations.AlterField(
            model_name='resultadocalculo',
            name='ocupacionPrimerDummy',
            field=models.DecimalField(decimal_places=3, max_digits=10, verbose_name='ocupacionPrimerDummy'),
        ),
        migrations.AlterField(
            model_name='resultadocalculo',
            name='ocupacionProducto',
            field=models.DecimalField(decimal_places=3, max_digits=10, verbose_name='ocupacionProducto'),
        ),
        migrations.AlterField(
            model_name='resultadocalculo',
            name='ocupacionRestoDummys',
            field=models.DecimalField(decimal_places=3, max_digits=10, verbose_name='ocupacionRestoDummys'),
        ),
        migrations.AlterField(
            model_name='resultadocalculo',
            name='proyectadoOcupAnual',
            field=models.DecimalField(decimal_places=3, max_digits=10, verbose_name='proyectadoOcupAnual'),
        ),
        migrations.AlterField(
            model_name='resultadocalculo',
            name='pzaProdEnTurnos',
            field=models.DecimalField(decimal_places=3, max_digits=10, verbose_name='pzaProdEnTurnos'),
        ),
        migrations.AlterField(
            model_name='resultadocalculo',
            name='pzaTeoricasXprimerTurno',
            field=models.DecimalField(decimal_places=3, max_digits=10, verbose_name='pzaTeoricasXprimerTurno'),
        ),
        migrations.AlterField(
            model_name='resultadocalculo',
            name='pzaTeoricasXsegundoTurno',
            field=models.DecimalField(decimal_places=3, max_digits=10, verbose_name='pzaTeoricasXsegundoTurno'),
        ),
        migrations.AlterField(
            model_name='resultadocalculo',
            name='pzaXhora',
            field=models.DecimalField(decimal_places=3, max_digits=10, verbose_name='pzaXhora'),
        ),
        migrations.AlterField(
            model_name='resultadocalculo',
            name='pzaXturno',
            field=models.DecimalField(decimal_places=3, max_digits=10, verbose_name='pzaXturno'),
        ),
        migrations.AlterField(
            model_name='resultadocalculo',
            name='requerimientoDiario',
            field=models.DecimalField(decimal_places=3, max_digits=10, verbose_name='requerimientoDiario'),
        ),
        migrations.AlterField(
            model_name='resultadocalculo',
            name='requerimientoSem',
            field=models.DecimalField(decimal_places=3, max_digits=10, verbose_name='requerimientoSem'),
        ),
        migrations.AlterField(
            model_name='resultadocalculo',
            name='tiempDispoXturno',
            field=models.DecimalField(decimal_places=3, max_digits=10, verbose_name='tiempDispoXturno'),
        ),
        migrations.AlterField(
            model_name='resultadocalculo',
            name='tiempDisponibleHornoAlDia',
            field=models.DecimalField(decimal_places=3, max_digits=10, verbose_name='tiempDisponibleHornoAlDia'),
        ),
        migrations.AlterField(
            model_name='resultadocalculo',
            name='tiempRecorriPrimerDummy',
            field=models.DecimalField(decimal_places=3, max_digits=10, verbose_name='tiempRecorriPrimerDummy'),
        ),
        migrations.AlterField(
            model_name='resultadocalculo',
            name='tiempRecorriRestoDummys',
            field=models.DecimalField(decimal_places=3, max_digits=10, verbose_name='tiempRecorriRestoDummys'),
        ),
        migrations.AlterField(
            model_name='resultadocalculo',
            name='tiempRecorridoProducto',
            field=models.DecimalField(decimal_places=3, max_digits=10, verbose_name='tiempRecorridoProducto'),
        ),
        migrations.AlterField(
            model_name='resultadocalculo',
            name='tiempoCiclo',
            field=models.DecimalField(decimal_places=3, max_digits=10, verbose_name='tiempoCiclo'),
        ),
        migrations.AlterField(
            model_name='resultadocalculo',
            name='tiempoEfecDiario',
            field=models.DecimalField(decimal_places=3, max_digits=10, verbose_name='tiempoEfecDiario'),
        ),
        migrations.AlterField(
            model_name='resultadocalculo',
            name='timeCicloXgolpe',
            field=models.DecimalField(decimal_places=3, max_digits=10, verbose_name='timeCicloXgolpe'),
        ),
        migrations.AlterField(
            model_name='resultadocalculo',
            name='timeMuertoPrimeraColum',
            field=models.DecimalField(decimal_places=3, max_digits=10, verbose_name='timeMuertoPrimeraColum'),
        ),
    ]
