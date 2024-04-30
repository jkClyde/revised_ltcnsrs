# Generated by Django 4.2.11 on 2024-03-30 07:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ChildInformation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(blank=True, max_length=100, null=True)),
                ('last_name', models.CharField(blank=True, max_length=100, null=True)),
                ('middle_name', models.CharField(blank=True, max_length=100, null=True)),
                ('suffix', models.CharField(blank=True, max_length=10, null=True)),
                ('age', models.PositiveIntegerField(blank=True, null=True)),
                ('date_of_birth', models.DateField(blank=True, null=True)),
                ('gender', models.CharField(blank=True, max_length=100, null=True)),
                ('birth_weight', models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True)),
                ('birth_order', models.PositiveIntegerField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Parent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(blank=True, max_length=100, null=True)),
                ('last_name', models.CharField(blank=True, max_length=100, null=True)),
                ('middle_name', models.CharField(blank=True, max_length=100, null=True)),
                ('suffix', models.CharField(blank=True, max_length=10, null=True)),
                ('age', models.PositiveIntegerField(blank=True, null=True)),
                ('ethnicity', models.CharField(blank=True, max_length=100, null=True)),
                ('occupation', models.CharField(blank=True, max_length=100, null=True)),
                ('religion', models.CharField(blank=True, max_length=100, null=True)),
                ('contact_number', models.CharField(blank=True, max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='ParentInformation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('child', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_child_data.childinformation')),
                ('father', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='father_info', to='app_child_data.parent')),
                ('guardian', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='guardian_info', to='app_child_data.parent')),
                ('mother', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='mother_info', to='app_child_data.parent')),
            ],
        ),
        migrations.CreateModel(
            name='ChildHealthInformation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_of_weighing', models.DateField(blank=True, null=True)),
                ('weight', models.DecimalField(decimal_places=2, max_digits=5)),
                ('height', models.DecimalField(decimal_places=2, max_digits=5)),
                ('muac', models.DecimalField(decimal_places=2, max_digits=5)),
                ('bpe', models.CharField(max_length=20)),
                ('child', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_child_data.childinformation')),
            ],
        ),
    ]
