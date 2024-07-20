# Generated by Django 5.0.6 on 2024-06-20 04:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0018_delete_logindetailstemp'),
    ]

    operations = [
        migrations.CreateModel(
            name='LoginDetailsTemp',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('password', models.CharField(max_length=100)),
                ('status', models.IntegerField(default=1)),
            ],
        ),
    ]
