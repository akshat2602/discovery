import logging
from datetime import datetime
from celery import shared_task

from common.extractor import ResumeExtractor
from .models import CandidateApplication


logger = logging.getLogger(__name__)


@shared_task
def send_email_to_candidate(candidate_id):
    # TODO: Add actual email sending logic
    candidate = CandidateApplication.objects.get(id=candidate_id)
    logger.info("Sending email to candidate: ", candidate.fname)
    logger.info("Email sent at: ", datetime.now())


@shared_task
def extract_keywords_from_resume(candidate_id):
    candidate = CandidateApplication.objects.get(id=candidate_id)

    logger.info("Extracting keywords from resume for candidate: ", candidate.fname)

    extractor = ResumeExtractor(candidate.resume)
    keywords = extractor.extract_keywords()
    if keywords == "":
        logger.info("No keywords found for candidate: ", candidate.fname)
    else:
        candidate.resume_keywords = keywords
        candidate.save()
        logger.info("Keywords extracted for candidate: ", candidate.fname)
        logger.info("Keywords: ", keywords)
