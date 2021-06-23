# Generated by Django 3.2.4 on 2021-06-17 08:43

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='feedback',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('feed', models.TextField(default='')),
                ('name', models.TextField(default="")),
                ('phoneNo', models.CharField(max_length=12)),
                ('tag', models.BooleanField(default=True)),
                ('feed_time', models.TimeField(auto_now_add=True)),
            ],
        ),
    ]
