from rest_framework import serializers

from .models import JobPosting, JobPostingSteps, CandidateApplication, CandidateStatus


class JobPostingFetchSerializer(serializers.ModelSerializer):
    """Fetch Serializer for job posting model."""

    created_by = serializers.CharField(source="fk_created_by.username", read_only=True)

    class Meta:
        model = JobPosting
        fields = ["title", "description", "status", "created_by"]
        read_only_fields = ("id", "created_at", "updated_at")


class JobPostingCreateSerializer(serializers.ModelSerializer):
    """Create Serializer for job posting model."""

    class Meta:
        model = JobPosting
        fields = ["title", "description", "status", "fk_created_by"]
        read_only_fields = ("id", "created_at", "updated_at")


class JobPostingStepsFetchSerializer(serializers.ModelSerializer):
    """Fetch Serializer for job posting steps model."""

    job_posting = serializers.CharField(source="fk_job_posting.title", read_only=True)

    class Meta:
        model = JobPostingSteps
        fields = ["step", "step_number", "job_posting"]
        read_only_fields = ("id", "created_at", "updated_at")


class JobPostingStepsCreateSerializer(serializers.ModelSerializer):
    """Create Serializer for job posting steps model."""

    class Meta:
        model = JobPostingSteps
        fields = ["step", "step_number", "fk_job_posting"]
        read_only_fields = ("id", "created_at", "updated_at")


class CandidateApplicationFetchSerializer(serializers.ModelSerializer):
    """Fetch Serializer for candidate model."""

    first_name = serializers.CharField(source="fname", read_only=True)
    last_name = serializers.CharField(source="lname", read_only=True)
    phone_number = serializers.CharField(source="phone", read_only=True)
    job_posting = serializers.CharField(source="fk_job_posting.title", read_only=True)

    class Meta:
        model = CandidateApplication
        fields = [
            "first_name",
            "last_name",
            "email",
            "phone_number",
            "job_posting",
            "rejected",
            "resume",
        ]
        read_only_fields = ("id", "applied_at", "updated_at")


class CandidateApplicationCreateSerializer(serializers.ModelSerializer):
    """Create Serializer for candidate model."""

    class Meta:
        model = CandidateApplication
        fields = [
            "fname",
            "lname",
            "email",
            "phone",
            "fk_job_posting",
            "resume",
        ]
        read_only_fields = ("id", "applied_at", "updated_at", "rejected")


class CandidateStatusFetchSerializer(serializers.ModelSerializer):
    """Fetch Serializer for candidate status model."""

    job_posting = serializers.CharField(
        source="fk_job_posting_candidate.fk_job_posting.title", read_only=True
    )
    candidate = serializers.CharField(
        source="fk_job_posting_candidate.fname", read_only=True
    )
    step = serializers.CharField(source="fk_job_step.step", read_only=True)

    class Meta:
        model = CandidateStatus
        fields = ["job_posting", "candidate", "step"]
        read_only_fields = ("id", "created_at", "updated_at")


class JobPostingFilterSerializer(serializers.Serializer):
    """Query parameter Serializer for Job Posting Filter"""

    status = serializers.IntegerField(required=False)
    created_by = serializers.IntegerField(required=False)
