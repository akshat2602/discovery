import enum


# TODO: Move these when assignment app is created
class AssignmentStatusChoice(enum.Enum):
    """Enum for assignment status."""

    PENDING = "PENDING"
    STARTED = "STARTED"
    SUBMITTED = "SUBMITTED"


class AssignmentTypeChoice(enum.Enum):
    """Enum for assignment type."""

    LIVECODING = 1
    TAKEHOME = 2
