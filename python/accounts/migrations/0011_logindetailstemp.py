# Generated by Django 5.0.6 on 2024-06-20 02:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0010_alter_annualincome_table_alter_birthstar_table_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='LoginDetailsTemp',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('status', models.IntegerField(default=0)),
            ],
            options={
                'db_table': 'logindetails_temp',
            },
        ),
    ]