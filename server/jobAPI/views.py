from rest_framework import viewsets, status as http_status
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from django.core.exceptions import ValidationError


from common.utils import CustomErrorSerializer, error_message
from .serializers import (
    JobPostingCreateSerializer,
    JobPostingFetchSerializer,
    JobPostingStepsCreateSerializer,
    JobPostingStepsFetchSerializer,
)
from .models import JobPosting, JobPostingSteps

# Create your views here.
# TODO: @Burhan Job Posting Step CRUD
# TODO: @Burhan Filter route for job postings which will filter on status and created by
# TODO: @Akshat Candidate Application CRUD
class JobPostingViewSet(viewsets.ViewSet):
    # TODO: @Akshat Add permission class for checking if Job Posting is created by HR

    @swagger_auto_schema(
        operation_description="Create a new job posting",
        responses={
            http_status.HTTP_201_CREATED: JobPostingCreateSerializer,
            http_status.HTTP_400_BAD_REQUEST: CustomErrorSerializer,
        },
    )
    def create(self, request):
        """
        Create a new Job Posting
        """
        serialized = JobPostingCreateSerializer(data=request.data, many=True)
        if serialized.is_valid():
            serialized.save()
            return Response(serialized.data, status=http_status.HTTP_201_CREATED)

        return Response(
            error_message(serialized, http_status.HTTP_400_BAD_REQUEST),
            status=http_status.HTTP_400_BAD_REQUEST,
        )

    @swagger_auto_schema(
        operation_description="Fetch a job posting",
        responses={
            http_status.HTTP_200_OK: JobPostingFetchSerializer,
            http_status.HTTP_404_NOT_FOUND: CustomErrorSerializer,
            http_status.HTTP_400_BAD_REQUEST: CustomErrorSerializer,
        },
    )
    def retrieve(self, request, pk=None):
        """
        Fetch a job posting
        """
        try:
            job_posting = JobPosting.objects.get(pk=pk)
        except JobPosting.DoesNotExist:
            return Response(
                error_message("Job Posting not found", http_status.HTTP_404_NOT_FOUND),
                status=http_status.HTTP_404_NOT_FOUND,
            )
        except ValidationError:
            return Response(
                error_message("Invalid ID", http_status.HTTP_400_BAD_REQUEST),
                status=http_status.HTTP_400_BAD_REQUEST,
            )

        fields = request.query_params.getlist("fields", "")

        if fields:
            serialized = JobPostingFetchSerializer(job_posting, fields=fields)
        else:
            serialized = JobPostingFetchSerializer(job_posting)

        return Response(serialized.data, status=http_status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_description="Fetch all job postings",
        responses={
            http_status.HTTP_200_OK: JobPostingFetchSerializer,
        },
    )
    def list(self, request):
        """
        Fetch all job postings
        """
        postings = JobPosting.objects.all()
        fields = request.query_params.getlist("fields", "")

        if fields:
            serialized = JobPostingFetchSerializer(postings, fields=fields, many=True)
        else:
            serialized = JobPostingFetchSerializer(postings, many=True)

        return Response(serialized.data, status=http_status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_description="Update a job posting",
        responses={
            http_status.HTTP_200_OK: JobPostingCreateSerializer,
            http_status.HTTP_404_NOT_FOUND: CustomErrorSerializer,
            http_status.HTTP_400_BAD_REQUEST: CustomErrorSerializer,
        },
    )
    def update(self, request, pk=None):
        """
        Update a job posting
        """
        posting_id = pk
        try:
            query = JobPosting.objects.get(pk=posting_id)
        except JobPosting.DoesNotExist:
            return Response(
                error_message("Job Posting not found", http_status.HTTP_404_NOT_FOUND),
                status=http_status.HTTP_404_NOT_FOUND,
            )
        except ValidationError:
            return Response(
                error_message("Invalid ID", http_status.HTTP_400_BAD_REQUEST),
                status=http_status.HTTP_400_BAD_REQUEST,
            )
        serialized = JobPostingCreateSerializer(query, data=request.data, partial=True)

        if serialized.is_valid():
            serialized.save()
            return Response(serialized.data, status=http_status.HTTP_200_OK)

        return Response(
            error_message(serialized, http_status.HTTP_400_BAD_REQUEST),
            status=http_status.HTTP_400_BAD_REQUEST,
        )

    @swagger_auto_schema(
        operation_description="Delete a job posting",
        responses={
            http_status.HTTP_204_NO_CONTENT: "Job Posting deleted successfully",
            http_status.HTTP_404_NOT_FOUND: CustomErrorSerializer,
            http_status.HTTP_400_BAD_REQUEST: CustomErrorSerializer,
        },
    )
    def destroy(self, request, pk=None):
        """
        Delete a job posting
        """
        posting_id = pk

        try:
            query = JobPosting.objects.get(pk=posting_id)
        except JobPosting.DoesNotExist:
            return Response(
                error_message("Job Posting not found", http_status.HTTP_404_NOT_FOUND),
                status=http_status.HTTP_404_NOT_FOUND,
            )
        except ValidationError:
            return Response(
                error_message("Invalid ID", http_status.HTTP_400_BAD_REQUEST),
                status=http_status.HTTP_400_BAD_REQUEST,
            )
        query.delete()
        return Response(status=http_status.HTTP_204_NO_CONTENT)


class JobPostingStepViewSet(viewsets.ViewSet):
    @swagger_auto_schema(
        operation_description="Create a new job posting step",
        responses={
            http_status.HTTP_201_CREATED: JobPostingStepsCreateSerializer,
            http_status.HTTP_400_BAD_REQUEST: CustomErrorSerializer,
        },
    )
    def create(self, request):
        """
        Create a new Job Posting Step
        """
        serialized = JobPostingStepsCreateSerializer(data=request.data, many=True)
        if serialized.is_valid():
            serialized.save()
            return Response(serialized.data, status=http_status.HTTP_201_CREATED)

        return Response(
            error_message(serialized, http_status.HTTP_400_BAD_REQUEST),
            status=http_status.HTTP_400_BAD_REQUEST,
        )

    @swagger_auto_schema(
        operation_description="Fetch a job posting steps",
        responses={
            http_status.HTTP_200_OK: JobPostingStepsFetchSerializer,
            http_status.HTTP_404_NOT_FOUND: CustomErrorSerializer,
            http_status.HTTP_400_BAD_REQUEST: CustomErrorSerializer,
        },
    )
    def retrieve(self, request, pk=None):
        """
        Fetch a job posting steps
        """
        try:
            job_posting_steps = JobPostingSteps.objects.get(pk=pk)
        except JobPostingSteps.DoesNotExist:
            return Response(
                error_message(
                    "Job Posting Steps not found", http_status.HTTP_404_NOT_FOUND
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
            serialized = JobPostingStepsFetchSerializer(
                job_posting_steps, fields=fields
            )
        else:
            serialized = JobPostingStepsFetchSerializer(job_posting_steps)

        return Response(serialized.data, status=http_status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_description="Fetch all job postings",
        responses={
            http_status.HTTP_200_OK: JobPostingStepsFetchSerializer,
        },
    )
    def list(self, request):
        """
        Fetch all job postings
        """
        posting_steps = JobPostingSteps.objects.all()
        fields = request.query_params.getlist("fields", "")

        if fields:
            serialized = JobPostingStepsFetchSerializer(
                posting_steps, fields=fields, many=True
            )
        else:
            serialized = JobPostingStepsFetchSerializer(posting_steps, many=True)

        return Response(serialized.data, status=http_status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_description="Update a job posting step",
        responses={
            http_status.HTTP_200_OK: JobPostingStepsCreateSerializer,
            http_status.HTTP_404_NOT_FOUND: CustomErrorSerializer,
            http_status.HTTP_400_BAD_REQUEST: CustomErrorSerializer,
        },
    )
    def update(self, request, pk=None):
        """
        Update a job posting step
        """
        posting_id = pk
        try:
            query = JobPostingSteps.objects.get(pk=posting_id)
        except JobPostingSteps.DoesNotExist:
            return Response(
                error_message(
                    "Job Posting Step not found", http_status.HTTP_404_NOT_FOUND
                ),
                status=http_status.HTTP_404_NOT_FOUND,
            )
        except ValidationError:
            return Response(
                error_message("Invalid ID", http_status.HTTP_400_BAD_REQUEST),
                status=http_status.HTTP_400_BAD_REQUEST,
            )
        serialized = JobPostingStepsCreateSerializer(
            query, data=request.data, partial=True
        )

        if serialized.is_valid():
            serialized.save()
            return Response(serialized.data, status=http_status.HTTP_200_OK)

        return Response(
            error_message(serialized, http_status.HTTP_400_BAD_REQUEST),
            status=http_status.HTTP_400_BAD_REQUEST,
        )

    @swagger_auto_schema(
        operation_description="Delete a job posting step",
        responses={
            http_status.HTTP_204_NO_CONTENT: "Job Posting step deleted successfully",
            http_status.HTTP_404_NOT_FOUND: CustomErrorSerializer,
            http_status.HTTP_400_BAD_REQUEST: CustomErrorSerializer,
        },
    )
    def destroy(self, request, pk=None):
        """
        Delete a job posting step
        """
        posting_step_id = pk

        try:
            query = JobPostingSteps.objects.get(pk=posting_step_id)
        except JobPostingSteps.DoesNotExist:
            return Response(
                error_message(
                    "Job Posting Step not found", http_status.HTTP_404_NOT_FOUND
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
