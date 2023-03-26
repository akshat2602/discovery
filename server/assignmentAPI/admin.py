from django.contrib import admin
from .models import CandidateAssignment, CandidateAssignmentResult, AssignmentType

# Register your models here.


class CandidateAssignmentAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "fk_job_posting_step",
        "fk_assignment_type",
        "total_test_cases",
        "cutoff_test_cases",
        "duration",
        "expired",
        "active_from",
        "active_upto",
        "created_at",
        "updated_at",
    ]
    list_filter = ["fk_assignment_type"]
    sortable_by = ["active_from", "active_upto"]


class CandidateAssignmentResultAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "fk_candidate_application",
        "fk_candidate_assignment",
        "container_id",
        "test_cases_passed",
        "attempted",
        "start_time",
        "end_time",
        "created_at",
        "updated_at",
    ]
    list_filter = ["attempted", "fk_candidate_assignment"]


class AssignmentTypeAdmin(admin.ModelAdmin):
    list_display = ["name", "docker_file", "created_at", "updated_at"]


admin.site.register(CandidateAssignment, CandidateAssignmentAdmin)
admin.site.register(CandidateAssignmentResult, CandidateAssignmentResultAdmin)
admin.site.register(AssignmentType, AssignmentTypeAdmin)
