from .views import JobPostingViewSet, JobPostingStepViewSet, CandidateApplicationViewSet
from rest_framework import routers

router = routers.DefaultRouter()

router.register(r"posting", JobPostingViewSet, basename="jobposting")
router.register(r"steps", JobPostingStepViewSet, basename="jobpostingsteps")
router.register(
    r"application", CandidateApplicationViewSet, basename="candidateapplication"
)

urlpatterns = router.urls
