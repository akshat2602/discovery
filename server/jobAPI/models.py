from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
import uuid


# Create your models here.


class JobPosting(models.Model):
    """Model for job posting."""

    class StatusChoice(models.IntegerChoices):
        """Enum for any inactive/active status."""

        ACTIVE = 1, _("Active")
        INACTIVE = 2, _("Inactive")

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100)
    description = models.TextField()
    status = models.IntegerField(
        choices=StatusChoice.choices, default=StatusChoice.INACTIVE
    )
    fk_created_by = models.ForeignKey(
        to=get_user_model(), on_delete=models.CASCADE, related_name="job_postings"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

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

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    fk_job_posting = models.ForeignKey(
        to=JobPosting, on_delete=models.CASCADE, related_name="steps"
    )
    step = models.IntegerField(
        choices=ApplicationStepChoice.choices, default=ApplicationStepChoice.APPLIED
    )
    step_number = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return (
            self.fk_job_posting.title
            + " - "
            + self.ApplicationStepChoice(self.step).label
        )

    class Meta:
        verbose_name = "Job Posting Step"
        verbose_name_plural = "Job Posting Steps"


class CandidateApplication(models.Model):
    """
    Model for maintaining data for candidates applying to a job posting.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    fk_job_posting = models.ForeignKey(
        to=JobPosting, on_delete=models.CASCADE, related_name="candidates"
    )
    rejected = models.BooleanField(default=False)
    resume = models.FileField(upload_to="resumes/")
    applied_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name + " - " + self.fk_job_posting.title

    class Meta:
        verbose_name = "Candidate Application"
        verbose_name_plural = "Candidate Applications"


class CandidateStatus(models.Model):
    """
    Model for maintaining the status of each candidate for each job posting.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    fk_job_posting_candidate = models.ForeignKey(
        to=CandidateApplication, on_delete=models.CASCADE, related_name="statuses"
    )
    fk_job_step = models.ForeignKey(to=JobPostingSteps, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return (
            self.fk_job_posting_candidate.name
            + " - "
            + self.fk_job_posting_candidate.fk_job_posting.title
            + " - "
            + self.fk_job_step.ApplicationStepChoice(self.fk_job_step.step).label
        )

    class Meta:
        verbose_name = "Candidate Status"
        verbose_name_plural = "Candidate Statuses"
