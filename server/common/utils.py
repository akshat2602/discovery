import os
from django.core.exceptions import ValidationError
from rest_framework import serializers


class CustomErrorSerializer(serializers.Serializer):
    """Custom error serializer"""

    status = serializers.CharField()
    message = serializers.JSONField()


def validate_doc(value):
    """Checking if the uploaded resume has valid extension"""
    ext = os.path.splitext(value.name)[1]  # [0] returns path+filename
    valid_extensions = [".pdf", ".doc", ".docx"]
    if not ext.lower() in valid_extensions:
        raise ValidationError("Unsupported file extension, only pdf or doc allowed")


def error_message(serializer, status_code):
    """Error message for serializer"""
    if isinstance(serializer, serializers.BaseSerializer):
        return CustomErrorSerializer(
            {"status": status_code, "message": "Not found"}
        ).data

    return CustomErrorSerializer(
        {"status": status_code, "message": serializer.errors}
    ).data
