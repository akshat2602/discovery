from rest_framework import serializers


from .models import CandidateAssignment, AssignmentType


class AssignmentTypeCreateSerializer(serializers.ModelSerializer):
    """Create Serializer for Assignment Type"""

    class Meta:
        model = AssignmentType
        fields = ["name", "docker_file"]


class CandidateAssignmentCreateSerializer(serializers.ModelSerializer):
    """Create Serializer for Candidate Assignment model"""

    class Meta:
        model = CandidateAssignment
        fields = [
            "fk_job_posting_step",
            "fk_assignment_type",
            "total_test_cases",
            "cutoff_test_cases",
            "active_from",
            "active_upto",
            "duration",
        ]
        read_only_fields = ("id", "expired", "created_at", "updated_at")


class CandidateAssignmentFetchSerializer(serializers.ModelSerializer):
    """
    Fetch Serializer for Candidate Assignment
    """

    job_posting_step = serializers.IntegerField(
        source="fk_job_posting_step.step", read_only=True
    )
    assignment_type = serializers.CharField(
        source="fk_assignment_type.name", read_only=True
    )

    class Meta:
        model = CandidateAssignment
        fields = ["candidate_application", "candidate_assignment", "assignment_type"]
        read_only_fields = (
            "id",
            "total_test_cases",
            "cutoff_test_cases",
            "active_from",
            "active_upto",
            "duration",
            "expired",
            "created_at",
            "updated_at",
        )
