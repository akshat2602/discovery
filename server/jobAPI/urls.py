from .views import JobPostingViewSet, JobPostingStepViewSet
from rest_framework import routers

router = routers.DefaultRouter()

router.register(r"posting", JobPostingViewSet, basename="jobposting")
router.register(r"steps", JobPostingStepViewSet, basename="jobpostingsteps")

urlpatterns = router.urls
