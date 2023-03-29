from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import JobPostingSteps, CandidateStatus, CandidateApplication
from assignmentAPI.models import CandidateAssignmentResult


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


@receiver(post_save, sender=CandidateStatus)
def create_candidate_assignment_result(sender, instance, created, **kwargs):
    if instance.fk_job_step.step == 2:
        """if the step is assignment"""

        if (
            CandidateAssignmentResult.objects.filter(
                fk_candidate_assignment=instance.fk_job_step.candidate_assignment
            ).first()
            is None
        ):
            """Check if the job step is changed to assignment"""
            CandidateAssignmentResult.objects.create(
                fk_candidate_application=instance.fk_job_posting_candidate,
                fk_candidate_assignment=instance.fk_job_step.candidate_assignment,
            )
