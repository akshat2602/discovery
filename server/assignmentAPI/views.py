from rest_framework import viewsets, status as http_status
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from django.core.exceptions import ValidationError
from common.utils import CustomErrorSerializer, error_message
from .serializers import (
    CandidateAssignmentFetchSerializer,
    CandidateAssignmentCreateSerializer,
)
from .models import CandidateAssignment


# TODO: Add authentication and permission management
# TODO: Fix the error in list api (serializer issue)


class CandidateAssignmentViewSet(viewsets.ViewSet):
    """Viewset for Candidate Assignment"""

    @swagger_auto_schema(
        operation_description="Create a new Candidate Assignment",
        request_body=CandidateAssignmentCreateSerializer,
        responses={
            http_status.HTTP_201_CREATED: CandidateAssignmentCreateSerializer,
            http_status.HTTP_400_BAD_REQUEST: CustomErrorSerializer,
        },
    )
    def create(self, request):
        """
        Create a new Candidate Assignment for a Job Step
        """

        serialized = CandidateAssignmentCreateSerializer(data=request.data, many=True)
        if serialized.is_valid():
            serialized.save()
            return Response(data=serialized.data, status=http_status.HTTP_201_CREATED)
        return Response(
            error_message(serialized, http_status.HTTP_400_BAD_REQUEST),
            status=http_status.HTTP_400_BAD_REQUEST,
        )

    @swagger_auto_schema(
        operation_description="Fetch all candidate assignment",
        responses={
            http_status.HTTP_200_OK: CandidateAssignmentFetchSerializer(many=True),
            http_status.HTTP_400_BAD_REQUEST: CustomErrorSerializer,
        },
    )
    def list(self, request):
        """
        Fetch all Candidate Assignments
        """

        candidate_assignments = CandidateAssignment.objects.all()
        serialized = CandidateAssignmentFetchSerializer(
            data=candidate_assignments, many=True
        )
        if serialized.is_valid():
            return Response(data=serialized.data, status=http_status.HTTP_200_OK)
        return Response(
            error_message(serialized, http_status.HTTP_400_BAD_REQUEST),
            status=http_status.HTTP_400_BAD_REQUEST,
        )

    @swagger_auto_schema(
        operation_description="Update a Candidate Assignment",
        responses={
            http_status.HTTP_200_OK: CandidateAssignmentCreateSerializer,
            http_status.HTTP_404_NOT_FOUND: CustomErrorSerializer,
            http_status.HTTP_400_BAD_REQUEST: CustomErrorSerializer,
        },
    )
    def update(self, request, pk=None):
        """
        Update a Candidate Assignment
        """
        candidate_assignment_id = pk
        try:
            query = CandidateAssignment.objects.get(pk=candidate_assignment_id)
        except CandidateAssignment.DoesNotExist:
            return Response(
                error_message(
                    "Candidate Assignment not found", http_status.HTTP_404_NOT_FOUND
                ),
                status=http_status.HTTP_404_NOT_FOUND,
            )
        except ValidationError:
            return Response(
                error_message("Invalid ID", http_status.HTTP_400_BAD_REQUEST),
                status=http_status.HTTP_400_BAD_REQUEST,
            )

        serialized = CandidateAssignmentCreateSerializer(
            query, data=request.data, partial=True
        )
        if serialized.is_valid():
            serialized.save()
            return Response(data=serialized.data, status=http_status.HTTP_200_OK)
        return Response(
            error_message(serialized, http_status.HTTP_400_BAD_REQUEST),
            status=http_status.HTTP_400_BAD_REQUEST,
        )

    @swagger_auto_schema(
        operation_description="Delete a Candidate Assignment",
        responses={
            http_status.HTTP_204_NO_CONTENT: "",
            http_status.HTTP_404_NOT_FOUND: CustomErrorSerializer,
            http_status.HTTP_400_BAD_REQUEST: CustomErrorSerializer,
        },
    )
    def destroy(self, request, pk=None):
        """
        Delete a Candidate Assignment
        """

        candidate_assignment_id = pk

        try:
            query = CandidateAssignment.objects.get(pk=candidate_assignment_id)
        except CandidateAssignment.DoesNotExist:
            return Response(
                error_message(
                    "Candidate Assignment not found", http_status.HTTP_404_NOT_FOUND
                ),
                status=http_status.HTTP_404_NOT_FOUND,
            )

        except ValidationError:
            return Response(
                error_message("Invalid ID", http_status.HTTP_400_BAD_REQUEST),
                status=http_status.HTTP_400_BAD_REQUEST,
            )
        query.delete()
        return Response(status=http_status.HTTP_204_NO_CONTENT)
