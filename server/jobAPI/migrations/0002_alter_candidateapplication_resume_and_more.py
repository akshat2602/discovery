# Generated by Django 4.1.5 on 2023-02-04 07:52

import common.utils
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("jobAPI", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="candidateapplication",
            name="resume",
            field=models.FileField(
                upload_to=common.utils.resume_upload_path,
                validators=[common.utils.validate_doc],
            ),
        ),
        migrations.AlterUniqueTogether(
            name="jobpostingsteps",
            unique_together={("fk_job_posting", "step_number")},
        ),
    ]
