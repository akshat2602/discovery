from .views import JobPostingViewSet
from rest_framework import routers

router = routers.DefaultRouter()

router.register(r"posting", JobPostingViewSet, basename="jobposting")

urlpatterns = router.urls
