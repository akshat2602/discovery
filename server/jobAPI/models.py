from django.db import models
from django.contrib.auth.models import AbstractUser
import enum
import uuid

from common.enums import StatusChoice

# Create your models here.
class RoleChoice(enum.enum):
    """Enum for user roles."""

    ADMIN = 1
    HR = 2
    TECH = 3


class ApplicationStepChoice(enum.enum):
    """Enum for job posting steps."""

    APPLIED = 1
    ASSIGNMENT = 2
    INTERVIEW = 3
    OFFER = 4
    HIRED = 5


class User(AbstractUser):
    role = models.IntegerField(choices=[(tag, tag.value) for tag in RoleChoice])


class JobPosting(models.Model):
    """Model for job posting."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100)
    description = models.TextField()
    status = models.IntegerField(choices=[(tag, tag.value) for tag in StatusChoice])
    fk_created_by = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="job_postings"
    )
    # steps = models.ArrayField(
    #     models.IntegerField(choices=[(tag, tag.value) for tag in ApplicationStepChoice])
    # )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class JobPostingSteps(models.Model):
    """Model for job posting steps."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    fk_job_posting = models.ForeignKey(
        JobPosting, on_delete=models.CASCADE, related_name="steps"
    )
    step = models.IntegerField(
        choices=[(tag, tag.value) for tag in ApplicationStepChoice]
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.fk_job_posting.title + " - " + self.step


class CandidateApplication(models.Model):
    """
    Model for maintaining data for candidates applying to a job posting.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    fk_job_posting = models.ForeignKey(
        JobPosting, on_delete=models.CASCADE, related_name="candidates"
    )
    rejected = models.BooleanField(default=False)
    resume = models.FileField(upload_to="resumes/")
    applied_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name + " - " + self.fk_job_posting.title


class CandidateStatus(models.Model):
    """
    Model for maintaining the status of each candidate for each job posting.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    fk_job_posting_candidate = models.ForeignKey(
        CandidateApplication, on_delete=models.CASCADE, related_name="statuses"
    )
    fk_job_step = models.ForeignKey(JobPostingSteps, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return (
            self.fk_job_posting_candidate.name
            + " - "
            + self.fk_job_posting_candidate.fk_job_posting.title
            + " - "
            + self.step
        )
