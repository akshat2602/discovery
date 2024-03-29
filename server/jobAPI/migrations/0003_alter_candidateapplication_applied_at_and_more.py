# Generated by Django 4.1.5 on 2023-02-05 07:22

import common.utils
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("jobAPI", "0002_alter_candidateapplication_resume_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="candidateapplication",
            name="applied_at",
            field=models.DateTimeField(auto_now_add=True, verbose_name="Applied At"),
        ),
        migrations.AlterField(
            model_name="candidateapplication",
            name="email",
            field=models.EmailField(max_length=254, verbose_name="Email"),
        ),
        migrations.AlterField(
            model_name="candidateapplication",
            name="fk_job_posting",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="candidates",
                to="jobAPI.jobposting",
                verbose_name="Job Posting",
            ),
        ),
        migrations.AlterField(
            model_name="candidateapplication",
            name="fname",
            field=models.CharField(max_length=100, verbose_name="First Name"),
        ),
        migrations.AlterField(
            model_name="candidateapplication",
            name="id",
            field=models.UUIDField(
                default=uuid.uuid4,
                editable=False,
                primary_key=True,
                serialize=False,
                verbose_name="ID",
            ),
        ),
        migrations.AlterField(
            model_name="candidateapplication",
            name="lname",
            field=models.CharField(max_length=100, verbose_name="Last Name"),
        ),
        migrations.AlterField(
            model_name="candidateapplication",
            name="phone",
            field=models.CharField(max_length=20, verbose_name="Phone Number"),
        ),
        migrations.AlterField(
            model_name="candidateapplication",
            name="rejected",
            field=models.BooleanField(default=False, verbose_name="Rejected"),
        ),
        migrations.AlterField(
            model_name="candidateapplication",
            name="resume",
            field=models.FileField(
                upload_to=common.utils.resume_upload_path,
                validators=[common.utils.validate_doc],
                verbose_name="Resume",
            ),
        ),
        migrations.AlterField(
            model_name="candidateapplication",
            name="updated_at",
            field=models.DateTimeField(auto_now=True, verbose_name="Updated At"),
        ),
        migrations.AlterField(
            model_name="candidatestatus",
            name="created_at",
            field=models.DateTimeField(auto_now_add=True, verbose_name="Created At"),
        ),
        migrations.AlterField(
            model_name="candidatestatus",
            name="fk_job_posting_candidate",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="statuses",
                to="jobAPI.candidateapplication",
                verbose_name="Candidate",
            ),
        ),
        migrations.AlterField(
            model_name="candidatestatus",
            name="fk_job_step",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                to="jobAPI.jobpostingsteps",
                verbose_name="Job Step",
            ),
        ),
        migrations.AlterField(
            model_name="candidatestatus",
            name="id",
            field=models.UUIDField(
                default=uuid.uuid4,
                editable=False,
                primary_key=True,
                serialize=False,
                verbose_name="ID",
            ),
        ),
        migrations.AlterField(
            model_name="candidatestatus",
            name="updated_at",
            field=models.DateTimeField(auto_now=True, verbose_name="Updated At"),
        ),
        migrations.AlterField(
            model_name="jobposting",
            name="created_at",
            field=models.DateTimeField(auto_now_add=True, verbose_name="Created At"),
        ),
        migrations.AlterField(
            model_name="jobposting",
            name="description",
            field=models.TextField(verbose_name="Description"),
        ),
        migrations.AlterField(
            model_name="jobposting",
            name="fk_created_by",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="job_postings",
                to=settings.AUTH_USER_MODEL,
                verbose_name="Created By",
            ),
        ),
        migrations.AlterField(
            model_name="jobposting",
            name="id",
            field=models.UUIDField(
                default=uuid.uuid4,
                editable=False,
                primary_key=True,
                serialize=False,
                verbose_name="ID",
            ),
        ),
        migrations.AlterField(
            model_name="jobposting",
            name="status",
            field=models.IntegerField(
                choices=[(1, "Active"), (2, "Inactive")],
                default=2,
                verbose_name="Status",
            ),
        ),
        migrations.AlterField(
            model_name="jobposting",
            name="title",
            field=models.CharField(max_length=100, verbose_name="Title"),
        ),
        migrations.AlterField(
            model_name="jobposting",
            name="updated_at",
            field=models.DateTimeField(auto_now=True, verbose_name="Updated At"),
        ),
        migrations.AlterField(
            model_name="jobpostingsteps",
            name="created_at",
            field=models.DateTimeField(auto_now_add=True, verbose_name="Created At"),
        ),
        migrations.AlterField(
            model_name="jobpostingsteps",
            name="fk_job_posting",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="steps",
                to="jobAPI.jobposting",
                verbose_name="Job Posting",
            ),
        ),
        migrations.AlterField(
            model_name="jobpostingsteps",
            name="id",
            field=models.UUIDField(
                default=uuid.uuid4,
                editable=False,
                primary_key=True,
                serialize=False,
                verbose_name="ID",
            ),
        ),
        migrations.AlterField(
            model_name="jobpostingsteps",
            name="step",
            field=models.IntegerField(
                choices=[
                    (1, "Applied"),
                    (2, "Assignment"),
                    (3, "Interview"),
                    (4, "Offer"),
                    (5, "Hired"),
                ],
                default=1,
                verbose_name="Step",
            ),
        ),
        migrations.AlterField(
            model_name="jobpostingsteps",
            name="step_number",
            field=models.PositiveIntegerField(verbose_name="Step Number"),
        ),
        migrations.AlterField(
            model_name="jobpostingsteps",
            name="updated_at",
            field=models.DateTimeField(auto_now=True, verbose_name="Updated At"),
        ),
    ]
