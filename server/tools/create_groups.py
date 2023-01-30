import logging
from django.contrib.auth.models import Group

logger = logging.getLogger(__name__)


if Group.objects.filter(name="HR").exists():
    logger.info("Group is already initialized!")
else:
    logger.info("Initializing group...")
    try:
        hr_group = Group.objects.create(
            name="HR",
        )
        hr_group.save()
        logger.info("HR Group initialized!")
    except Exception as e:
        logger.error(e)

if Group.objects.filter(name="Engineer").exists():
    logger.info("Group is already initialized!")
else:
    logger.info("Initializing group...")
    try:
        engineer_group = Group.objects.create(
            name="Engineer",
        )
        engineer_group.save()
        logger.info("Engineer Group initialized!")
    except Exception as e:
        logger.error(e)
