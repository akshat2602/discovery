import os
from django.core.exceptions import ValidationError
from rest_framework import serializers
from dj_rest_auth.serializers import LoginSerializer


class CustomErrorSerializer(serializers.Serializer):
    """Custom error serializer"""

    status = serializers.CharField()
    message = serializers.JSONField()


class UserLoginSerializer(LoginSerializer):
    """Login serializer"""

    username = None
    email = serializers.EmailField()
    password = serializers.CharField(style={"input_type": "password"})


def validate_doc(value):
    """Checking if the uploaded resume has valid extension"""
    ext = os.path.splitext(value.name)[1]  # [0] returns path+filename
    valid_extensions = [".pdf", ".doc", ".docx"]
    if not ext.lower() in valid_extensions:
        raise ValidationError("Unsupported file extension, only pdf or doc allowed")


def validate_dockerfile(value):
    "Checking if the uploaded file is a Dockerfile by name or not"
    print(value)
    ext = value.name.split(".")[-1]
    if ext.lower() != "dockerfile":
        raise ValidationError("The uploaded file is not a dockerfile")


def error_message(serializer, status_code):
    """Error message for serializer"""
    if isinstance(serializer, str):
        return CustomErrorSerializer(
            {"status": status_code, "message": serializer}
        ).data

    return CustomErrorSerializer(
        {"status": status_code, "message": serializer.errors}
    ).data


def resume_upload_path(instance, filename):
    """Resume upload path"""
    ext = os.path.splitext(filename)[1]
    path = "resumes/job_{}/candidate_{}.{}".format(
        instance.fk_job_posting.id, instance.id, ext
    )

    return path


def dockerfile_upload_path(instance, filename):
    "Dockerfile upload path"
    path = "dockerfiles/assignment_type_{}/Dockerfile".format(instance.pk)
    return path
