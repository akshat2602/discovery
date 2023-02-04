from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
import uuid
from common.utils import validate_doc, resume_upload_path


# Create your models here.
# TODO: @Burhan Verbose names for fields for all models


class JobPosting(models.Model):
    """Model for job posting."""

    class StatusChoice(models.IntegerChoices):
        """Enum for any inactive/active status."""

        ACTIVE = 1, _("Active")
        INACTIVE = 2, _("Inactive")

    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, verbose_name="ID"
    )
    title = models.CharField(max_length=100, verbose_name="Title")
    description = models.TextField(verbose_name="Description")
    status = models.IntegerField(
        choices=StatusChoice.choices,
        default=StatusChoice.INACTIVE,
        verbose_name="Status",
    )
    fk_created_by = models.ForeignKey(
        to=get_user_model(),
        on_delete=models.CASCADE,
        related_name="job_postings",
        verbose_name="Created By",
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Updated At")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Job Posting"
        verbose_name_plural = "Job Postings"


class JobPostingSteps(models.Model):
    """Model for job posting steps."""

    class ApplicationStepChoice(models.IntegerChoices):
        """Enum for job posting steps."""

        APPLIED = 1, _("Applied")
        ASSIGNMENT = 2, _("Assignment")
        INTERVIEW = 3, _("Interview")
        OFFER = 4, _("Offer")
        HIRED = 5, _("Hired")

    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, verbose_name="ID"
    )
    fk_job_posting = models.ForeignKey(
        to=JobPosting,
        on_delete=models.CASCADE,
        related_name="steps",
        verbose_name="Job Posting",
    )
    step = models.IntegerField(
        choices=ApplicationStepChoice.choices,
        default=ApplicationStepChoice.APPLIED,
        verbose_name="Step",
    )
    step_number = models.PositiveIntegerField(verbose_name="Step Number")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Updated At")

    def __str__(self):
        return (
            self.fk_job_posting.title
            + " - "
            + self.ApplicationStepChoice(self.step).label
        )

    class Meta:
        verbose_name = "Job Posting Step"
        verbose_name_plural = "Job Posting Steps"
        unique_together = ("fk_job_posting", "step_number")


class CandidateApplication(models.Model):
    """
    Model for maintaining data for candidates applying to a job posting.
    """

    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, verbose_name="ID"
    )
    fname = models.CharField(max_length=100, verbose_name="First Name")
    lname = models.CharField(max_length=100, verbose_name="Last Name")
    email = models.EmailField(verbose_name="Email")
    phone = models.CharField(max_length=20, verbose_name="Phone Number")
    fk_job_posting = models.ForeignKey(
        to=JobPosting,
        on_delete=models.CASCADE,
        related_name="candidates",
        verbose_name="Job Posting",
    )
    rejected = models.BooleanField(default=False, verbose_name="Rejected")
    resume = models.FileField(
        upload_to=resume_upload_path, validators=[validate_doc], verbose_name="Resume"
    )
    applied_at = models.DateTimeField(auto_now_add=True, verbose_name="Applied At")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Updated At")

    def __str__(self):
        return self.fname + "-" + self.lname + "-" + self.fk_job_posting.title

    class Meta:
        verbose_name = "Candidate Application"
        verbose_name_plural = "Candidate Applications"


class CandidateStatus(models.Model):
    """
    Model for maintaining the status of each candidate for each job posting.
    """

    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, verbose_name="ID"
    )
    fk_job_posting_candidate = models.ForeignKey(
        to=CandidateApplication,
        on_delete=models.CASCADE,
        related_name="statuses",
        verbose_name="Candidate",
    )
    fk_job_step = models.ForeignKey(
        to=JobPostingSteps, on_delete=models.CASCADE, verbose_name="Job Step"
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Updated At")

    def __str__(self):
        return (
            self.fk_job_posting_candidate.fname
            + "-"
            + self.fk_job_posting_candidate.lname
            + "-"
            + self.fk_job_posting_candidate.fk_job_posting.title
            + "-"
            + self.fk_job_step.ApplicationStepChoice(self.fk_job_step.step).label
        )

    class Meta:
        verbose_name = "Candidate Status"
        verbose_name_plural = "Candidate Statuses"
