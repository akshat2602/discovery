from .views import CandidateAssignmentViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r"", CandidateAssignmentViewSet, basename="candidateassignment")

urlpatterns = router.urls
