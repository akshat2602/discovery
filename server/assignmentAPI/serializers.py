from rest_framework import serializers


from .models import CandidateAssignment, AssignmentType, CandidateAssignmentResult


class AssignmentTypeSerializer(serializers.ModelSerializer):
    """Create Serializer for Assignment Type"""

    class Meta:
        model = AssignmentType
        fields = ["name", "docker_file", "created_at", "updated_at"]


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
        fields = [
            "job_posting_step",
            "assignment_type",
            "id",
            "total_test_cases",
            "cutoff_test_cases",
            "active_from",
            "active_upto",
            "duration",
            "expired",
            "created_at",
            "updated_at",
        ]


class CandidateAssignmentResultCreateSerializer(serializers.ModelSerializer):
    """Create Serializer for Candidate Assignment Result"""

    class Meta:
        model = CandidateAssignmentResult
        fields = [
            "fk_candidate_application",
            "fk_candidate_assignment",
            "assignment_files",
            "container_id",
        ]
        read_only_fields = (
            "id",
            "test_cases_passed",
            "attempted",
            "start_time",
            "end_time",
            "created_at",
            "updated_at",
        )


class CandidateAssignmentResultFetchSerializer(serializers.ModelSerializer):
    """Fetch Serializer for Candidate Assignment Result"""

    candidate = serializers.CharField(
        source="fk_candidate_application.fname", read_only=True
    )

    class Meta:
        model = CandidateAssignmentResult
        fields = [
            "candidate",
            "fk_candidate_assignment",
            "assignment_files",
            "container_id",
            "id",
            "test_cases_passed",
            "attempted",
            "start_time",
            "end_time",
            "created_at",
            "updated_at",
        ]
