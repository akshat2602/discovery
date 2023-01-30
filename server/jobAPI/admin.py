from django.contrib import admin

# Register your models here.
from .models import (
    JobPosting,
    JobPostingSteps,
    CandidateApplication,
    CandidateStatus,
)


class JobPostingStepsInline(admin.TabularInline):
    model = JobPostingSteps
    verbose_name = "JobPostingStep"
    verbose_name_plural = "JobPostingSteps"


class JobPostingAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "title",
        "description",
        "status",
        "created_at",
        "updated_at",
    ]
    inlines = [JobPostingStepsInline]


class JobPostingStepsAdmin(admin.ModelAdmin):
    list_display = ["fk_job_posting", "step", "created_at"]


class CandidateApplicationAdmin(admin.ModelAdmin):
    list_display = [
        "email",
        "name",
        "fk_job_posting",
        "rejected",
        "applied_at",
    ]


class CandidateStatusAdmin(admin.ModelAdmin):
    list_display = ["__str__", "created_at"]


admin.site.register(JobPosting, JobPostingAdmin)
admin.site.register(JobPostingSteps, JobPostingStepsAdmin)
admin.site.register(CandidateApplication, CandidateApplicationAdmin)
admin.site.register(CandidateStatus, CandidateStatusAdmin)
