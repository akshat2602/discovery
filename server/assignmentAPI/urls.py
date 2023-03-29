from .views import (
    CandidateAssignmentViewSet,
    AssignmentTypeViewSet,
    CandidateAssignmentResultViewSet,
)
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r"type", AssignmentTypeViewSet, basename="assignmenttype")
router.register(
    r"result", CandidateAssignmentResultViewSet, basename="candidateassignmentresult"
)
router.register(r"", CandidateAssignmentViewSet, basename="candidateassignment")

urlpatterns = router.urls
