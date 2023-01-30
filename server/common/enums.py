import enum


class StatusChoice(enum.enum):
    """Enum for any inactive/active status."""

    ACTIVE = 1
    INACTIVE = 2


# TODO: Move these when assignment app is created
class AssignmentStatusChoice(enum.enum):
    """Enum for assignment status."""

    PENDING = "PENDING"
    STARTED = "STARTED"
    SUBMITTED = "SUBMITTED"


class AssignmentTypeChoice(enum.enum):
    """Enum for assignment type."""

    LIVECODING = 1
    TAKEHOME = 2
