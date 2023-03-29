from rest_framework import viewsets, status as http_status
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from django.core.exceptions import ValidationError
from common.utils import CustomErrorSerializer, error_message
from .serializers import (
    CandidateAssignmentFetchSerializer,
    CandidateAssignmentCreateSerializer,
    AssignmentTypeSerializer,
    CandidateAssignmentResultCreateSerializer,
    CandidateAssignmentResultFetchSerializer,
)
from .models import CandidateAssignment, AssignmentType, CandidateAssignmentResult


# TODO: Add authentication and permission management
# TODO: fix Patch and Delete requests (currently not allowed in ViewSet)


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
        operation_description="Fetch a candidate assignment",
        responses={
            http_status.HTTP_200_OK: CandidateAssignmentFetchSerializer,
            http_status.HTTP_404_NOT_FOUND: CustomErrorSerializer,
            http_status.HTTP_400_BAD_REQUEST: CustomErrorSerializer,
        },
    )
    def retrieve(self, request, pk=None):
        """
        Fetch a Candidate Assignment
        """
        try:
            candidate_assignment = CandidateAssignment.objects.get(pk=pk)
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

        fields = request.query_params.getlist("fields", "")

        if fields:
            serialized = CandidateAssignmentFetchSerializer(
                candidate_assignment, fields=fields
            )
        else:
            serialized = CandidateAssignmentFetchSerializer(candidate_assignment)

        return Response(serialized.data, status=http_status.HTTP_200_OK)

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
            candidate_assignments, many=True
        )
        return Response(data=serialized.data, status=http_status.HTTP_200_OK)

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


class AssignmentTypeViewSet(viewsets.ViewSet):
    """Viewset for Assignment Type"""

    @swagger_auto_schema(
        operation_description="Create a new Assignment Type",
        request_body=AssignmentTypeSerializer,
        responses={
            http_status.HTTP_201_CREATED: AssignmentTypeSerializer,
            http_status.HTTP_400_BAD_REQUEST: CustomErrorSerializer,
        },
    )
    def create(self, request):
        """
        Create a new Assignment Type
        """

        serialized = AssignmentTypeSerializer(data=request.data, many=True)
        if serialized.is_valid():
            serialized.save()
            return Response(data=serialized.data, status=http_status.HTTP_201_CREATED)
        return Response(
            error_message(serialized, http_status.HTTP_400_BAD_REQUEST),
            status=http_status.HTTP_400_BAD_REQUEST,
        )

    @swagger_auto_schema(
        operation_description="Fetch an assignment type",
        responses={
            http_status.HTTP_200_OK: AssignmentTypeSerializer,
            http_status.HTTP_404_NOT_FOUND: CustomErrorSerializer,
            http_status.HTTP_400_BAD_REQUEST: CustomErrorSerializer,
        },
    )
    def retrieve(self, request, pk=None):
        """
        Fetch an Assignment Type
        """
        try:
            assignment_type = AssignmentType.objects.get(pk=pk)
        except AssignmentType.DoesNotExist:
            return Response(
                error_message(
                    "Assignment Type not found", http_status.HTTP_404_NOT_FOUND
                ),
                status=http_status.HTTP_404_NOT_FOUND,
            )
        except ValidationError:
            return Response(
                error_message("Invalid ID", http_status.HTTP_400_BAD_REQUEST),
                status=http_status.HTTP_400_BAD_REQUEST,
            )

        fields = request.query_params.getlist("fields", "")

        if fields:
            serialized = AssignmentTypeSerializer(assignment_type, fields=fields)
        else:
            serialized = AssignmentTypeSerializer(assignment_type)

        return Response(serialized.data, status=http_status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_description="Fetch all assignment types",
        responses={
            http_status.HTTP_200_OK: AssignmentTypeSerializer(many=True),
            http_status.HTTP_400_BAD_REQUEST: CustomErrorSerializer,
        },
    )
    def list(self, request):
        """
        Fetch all Assignment Types
        """

        assignment_types = AssignmentType.objects.all()
        serialized = AssignmentTypeSerializer(assignment_types, many=True)
        return Response(data=serialized.data, status=http_status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_description="Update a Assignment Type",
        responses={
            http_status.HTTP_200_OK: AssignmentTypeSerializer,
            http_status.HTTP_404_NOT_FOUND: CustomErrorSerializer,
            http_status.HTTP_400_BAD_REQUEST: CustomErrorSerializer,
        },
    )
    def update(self, request, pk=None):
        """
        Update a Assignment Type
        """
        assignment_type_id = pk
        try:
            query = AssignmentType.objects.get(pk=assignment_type_id)
        except AssignmentType.DoesNotExist:
            return Response(
                error_message(
                    "Assignment Type not found", http_status.HTTP_404_NOT_FOUND
                ),
                status=http_status.HTTP_404_NOT_FOUND,
            )
        except ValidationError:
            return Response(
                error_message("Invalid ID", http_status.HTTP_400_BAD_REQUEST),
                status=http_status.HTTP_400_BAD_REQUEST,
            )

        serialized = AssignmentTypeSerializer(query, data=request.data, partial=True)
        if serialized.is_valid():
            serialized.save()
            return Response(data=serialized.data, status=http_status.HTTP_200_OK)
        return Response(
            error_message(serialized, http_status.HTTP_400_BAD_REQUEST),
            status=http_status.HTTP_400_BAD_REQUEST,
        )

    @swagger_auto_schema(
        operation_description="Delete a Assignment Type",
        responses={
            http_status.HTTP_204_NO_CONTENT: "",
            http_status.HTTP_404_NOT_FOUND: CustomErrorSerializer,
            http_status.HTTP_400_BAD_REQUEST: CustomErrorSerializer,
        },
    )
    def destroy(self, request, pk=None):
        """
        Delete a Assignment Type
        """

        assignment_type_id = pk

        try:
            query = AssignmentType.objects.get(pk=assignment_type_id)
        except AssignmentType.DoesNotExist:
            return Response(
                error_message(
                    "Assignment Type not found", http_status.HTTP_404_NOT_FOUND
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


class CandidateAssignmentResultViewSet(viewsets.ViewSet):
    """Viewset for Candidate Assignment Result"""

    @swagger_auto_schema(
        operation_description="Create a new Candidate Assignment Result",
        request_body=CandidateAssignmentResultCreateSerializer,
        responses={
            http_status.HTTP_201_CREATED: CandidateAssignmentResultCreateSerializer,
            http_status.HTTP_400_BAD_REQUEST: CustomErrorSerializer,
        },
    )
    def create(self, request):
        """
        Create a new Candidate Assignment Result (*not required)
        """

        serialized = CandidateAssignmentResultCreateSerializer(
            data=request.data, many=True
        )
        if serialized.is_valid():
            serialized.save()
            return Response(data=serialized.data, status=http_status.HTTP_201_CREATED)
        return Response(
            error_message(serialized, http_status.HTTP_400_BAD_REQUEST),
            status=http_status.HTTP_400_BAD_REQUEST,
        )

    @swagger_auto_schema(
        operation_description="Fetch a candidate assignment",
        responses={
            http_status.HTTP_200_OK: CandidateAssignmentResultFetchSerializer,
            http_status.HTTP_404_NOT_FOUND: CustomErrorSerializer,
            http_status.HTTP_400_BAD_REQUEST: CustomErrorSerializer,
        },
    )
    def retrieve(self, request, pk=None):
        """
        Fetch a Candidate Assignment Result
        """
        try:
            candidate_assignment_result = CandidateAssignmentResult.objects.get(pk=pk)
        except CandidateAssignmentResult.DoesNotExist:
            return Response(
                error_message(
                    "Candidate Assignment Result not found",
                    http_status.HTTP_404_NOT_FOUND,
                ),
                status=http_status.HTTP_404_NOT_FOUND,
            )
        except ValidationError:
            return Response(
                error_message("Invalid ID", http_status.HTTP_400_BAD_REQUEST),
                status=http_status.HTTP_400_BAD_REQUEST,
            )

        fields = request.query_params.getlist("fields", "")

        if fields:
            serialized = CandidateAssignmentResultFetchSerializer(
                candidate_assignment_result, fields=fields
            )
        else:
            serialized = CandidateAssignmentResultFetchSerializer(
                candidate_assignment_result
            )

        return Response(serialized.data, status=http_status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_description="Fetch all candidate assignment results",
        responses={
            http_status.HTTP_200_OK: CandidateAssignmentResultFetchSerializer(
                many=True
            ),
            http_status.HTTP_400_BAD_REQUEST: CustomErrorSerializer,
        },
    )
    def list(self, request):
        """
        Fetch all Candidate Assignment Results
        """

        candidate_assignment_results = CandidateAssignmentResult.objects.all()
        serialized = CandidateAssignmentResultFetchSerializer(
            candidate_assignment_results, many=True
        )
        return Response(data=serialized.data, status=http_status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_description="Update a Candidate Assignment Results",
        responses={
            http_status.HTTP_200_OK: CandidateAssignmentResultCreateSerializer,
            http_status.HTTP_404_NOT_FOUND: CustomErrorSerializer,
            http_status.HTTP_400_BAD_REQUEST: CustomErrorSerializer,
        },
    )
    def update(self, request, pk=None):
        """
        Update a Candidate Assignment Result
        """
        candidate_assignment_result_id = pk
        try:
            query = CandidateAssignmentResult.objects.get(
                pk=candidate_assignment_result_id
            )
        except CandidateAssignmentResult.DoesNotExist:
            return Response(
                error_message(
                    "Candidate Assignment Results not found",
                    http_status.HTTP_404_NOT_FOUND,
                ),
                status=http_status.HTTP_404_NOT_FOUND,
            )
        except ValidationError:
            return Response(
                error_message("Invalid ID", http_status.HTTP_400_BAD_REQUEST),
                status=http_status.HTTP_400_BAD_REQUEST,
            )

        serialized = CandidateAssignmentResultCreateSerializer(
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
        operation_description="Delete a Candidate Assignment Result",
        responses={
            http_status.HTTP_204_NO_CONTENT: "",
            http_status.HTTP_404_NOT_FOUND: CustomErrorSerializer,
            http_status.HTTP_400_BAD_REQUEST: CustomErrorSerializer,
        },
    )
    def destroy(self, request, pk=None):
        """
        Delete a Candidate Assignment Result
        """

        candidate_assignment_result_id = pk

        try:
            query = CandidateAssignmentResult.objects.get(
                pk=candidate_assignment_result_id
            )
        except CandidateAssignmentResult.DoesNotExist:
            return Response(
                error_message(
                    "Candidate Assignment Result not found",
                    http_status.HTTP_404_NOT_FOUND,
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
