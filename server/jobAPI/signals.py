from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import JobPostingSteps, CandidateStatus, CandidateApplication


@receiver(post_save, sender=CandidateApplication)
def create_status(sender, instance, created, **kwargs):
    if created:
        step_instance = JobPostingSteps.objects.get(
            fk_job_posting=instance.fk_job_posting, step_number=1
        )
        CandidateStatus.objects.create(
            fk_job_posting_candidate=instance,
            fk_job_step=step_instance,
        )
