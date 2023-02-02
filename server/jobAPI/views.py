from rest_framework import viewsets, status as http_status
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema


from common.utils import CustomErrorSerializer, error_message
from .serializers import JobPostingCreateSerializer, JobPostingFetchSerializer
from .models import JobPosting

# Create your views here.


class JobPostingViewSet(viewsets.ViewSet):
    # TODO: Add permission class for checking if Job Posting is created by HR

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
            http_status.HTTP_404_NOT_FOUND: CustomErrorSerializer,
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
        },
    )
    def update(self, request, pk=None):
        """
        Update a job posting
        """
        try:
            posting_id = request.data["id"]

        except KeyError:
            return Response(
                error_message(
                    "Please specify ID for updation", http_status.HTTP_404_NOT_FOUND
                ),
                status=http_status.HTTP_404_NOT_FOUND,
            )
        try:
            query = JobPosting.objects.get(pk=posting_id)
        except JobPosting.DoesNotExist:
            return Response(
                error_message("Job Posting not found", http_status.HTTP_404_NOT_FOUND),
                status=http_status.HTTP_404_NOT_FOUND,
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
        },
    )
    def destroy(self, request, pk=None):
        """
        Delete a job posting
        """
        try:
            posting_id = request.data["id"]

        except KeyError:
            return Response(
                error_message(
                    "Please specify ID for deletion", http_status.HTTP_404_NOT_FOUND
                ),
                status=http_status.HTTP_404_NOT_FOUND,
            )
        try:
            query = JobPosting.objects.get(pk=posting_id)
        except JobPosting.DoesNotExist:
            return Response(
                error_message("Job Posting not found", http_status.HTTP_404_NOT_FOUND),
                status=http_status.HTTP_404_NOT_FOUND,
            )
        query.delete()
        return Response(status=http_status.HTTP_204_NO_CONTENT)
