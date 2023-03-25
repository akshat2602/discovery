from django.db import models
from server.jobAPI.models import CandidateApplication
import uuid

# Create your models here.
class AssignmentType(models.Model):
    name = models.CharField(max_length=256, verbose_name="Name")
    docker_file = models.FileField(
        upload_to="/docker_files", verbose_name="Docker File"
    )

    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Updated At")

    class Meta:
        verbose_name = "Assignment Type"
        verbose_name_plural = "Assignment Types"


class CandidateAssignment(models.Model):
    """Model for candidate assignment"""

    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, verbose_name="ID"
    )
    fk_candidate_application = models.ForeignKey(
        to=CandidateApplication,
        on_delete=models.CASCADE,
        related_name="candidate_application",
        verbose_name="Candidate Application",
    )
    assignment_type = models.ForeignKey(
        to=AssignmentType,
        on_delete=models.CASCADE,
        related_name="assignment_type",
        verbose_name="Assignment Type",
    )

    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Updated At")

    class Meta:
        verbose_name = "Candidate Assignment"
        verbose_name_plural = "Candidate Assignments"
