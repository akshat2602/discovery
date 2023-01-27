from django.db import models
from django.contrib.auth.models import AbstractUser
import enum
import uuid

from common.enums import StatusChoice, ApplicationStepChoice

# Create your models here.
class RoleChoice(enum.enum):
    """Enum for user roles."""

    ADMIN = 1
    HR = 2
    TECH = 3


class User(AbstractUser):
    role = models.IntegerField(choices=[(tag, tag.value) for tag in RoleChoice])


class JobPosting(models.Model):
    """Model for job posting."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100)
    description = models.TextField()
    status = models.IntegerField(choices=[(tag, tag.value) for tag in StatusChoice])
    created_by = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="job_postings"
    )
    steps = models.ArrayField(
        models.IntegerField(choices=[(tag, tag.value) for tag in ApplicationStepChoice])
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
