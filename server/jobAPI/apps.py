from django.apps import AppConfig


class JobapiConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "jobAPI"

    def ready(self):
        import jobAPI.signals  # noqa
