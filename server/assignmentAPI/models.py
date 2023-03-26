from django.db import models
from server.jobAPI.models import CandidateApplication, JobPostingSteps
import uuid

# Create your models here.
class AssignmentType(models.Model):
    """Model for Assignment Type"""

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
    """Model for Candidate Assignment"""

    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, verbose_name="ID"
    )
    fk_job_posting_step = models.ForeignKey(
        to=JobPostingSteps,
        on_delete=models.CASCADE,
        related_name="job_posting_step",
        verbose_name="Job Posting Step",
    )
    assignment_type = models.ForeignKey(
        to=AssignmentType,
        on_delete=models.CASCADE,
        related_name="assignment_type",
        verbose_name="Assignment Type",
    )
    total_test_cases = models.IntegerField(
        default=100, null=False, blank=False, verbose_name="Total Test Cases"
    )
    cutoff_test_cases = models.IntegerField(
        default=75, null=False, blank=False, verbose_name="Cutoff Test Cases"
    )

    active_from = models.DateTimeField(verbose_name="Active From")
    active_upto = models.DateTimeField(verbose_name="Active Upto")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Updated At")

    class Meta:
        verbose_name = "Candidate Assignment"
        verbose_name_plural = "Candidate Assignments"


class CandidateAssignmentResult(models.Model):
    """Model for Candidate Assignment Result"""

    fk_candidate_application = models.ForeignKey(
        to=CandidateApplication,
        on_delete=models.CASCADE,
        related_name="candidate_application",
        verbose_name="Candidate Application",
    )
    fk_candidate_assignment = models.ForeignKey(
        to=CandidateAssignment,
        on_delete=models.CASCADE,
        related_name="candidate_assignment",
        verbose_name="Candidate Assignment",
    )
    container_id = models.CharField(max_length=256, null=True)
    test_cases_passed = models.IntegerField(default=0, verbose_name="Test Cases Passed")
    attempted = models.BooleanField(default=False, verbose_name="Attempted")
    start_time = models.DateTimeField(verbose_name="Start Time")
    end_time = models.DateTimeField(verbose_name="End Time")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Updated At")

    class Meta:
        verbose_name = "Candidate Assignment Result"
        verbose_name_plural = "Candidate Assignment Results"
