import os
from django.core.exceptions import ValidationError


def validate_doc(value):
    """Checking if the uploaded resume has valid extension"""
    ext = os.path.splitext(value.name)[1]  # [0] returns path+filename
    valid_extensions = [".pdf", ".doc", ".docx"]
    if not ext.lower() in valid_extensions:
        raise ValidationError("Unsupported file extension, only pdf or doc allowed")
