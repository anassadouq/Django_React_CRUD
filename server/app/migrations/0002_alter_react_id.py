# Generated by Django 5.0.4 on 2024-04-13 20:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='react',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
