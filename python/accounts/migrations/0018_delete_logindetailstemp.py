# Generated by Django 5.0.6 on 2024-06-20 03:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0017_alter_logindetailstemp_table'),
    ]

    operations = [
        migrations.DeleteModel(
            name='LoginDetailsTemp',
        ),
    ]
