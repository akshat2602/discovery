import os
from django.contrib.auth import get_user_model
import logging

logger = logging.getLogger(__name__)

User = get_user_model()

DJANGO_SUPERUSER_USERNAME = os.environ.get("DJANGO_SUPERUSER_USERNAME")
DJANGO_SUPERUSER_EMAIL = os.environ.get("DJANGO_SUPERUSER_EMAIL")
DJANGO_SUPERUSER_PASSWORD = os.environ.get("DJANGO_SUPERUSER_PASSWORD")

if User.objects.filter(username=DJANGO_SUPERUSER_USERNAME).exists():
    logger.info("Superuser is already initialized!")
else:
    logger.info("Initializing superuser...")
    try:
        superuser = User.objects.create_superuser(
            username=DJANGO_SUPERUSER_USERNAME,
            email=DJANGO_SUPERUSER_EMAIL,
            password=DJANGO_SUPERUSER_PASSWORD,
        )
        superuser.save()
        logger.info("Superuser initialized!")
    except Exception as e:
        logger.error(e)
