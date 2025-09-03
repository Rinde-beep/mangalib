"""empty message

Revision ID: 0b8beca9ac3e
Revises: fc2038829457
Create Date: 2025-08-27 23:41:40.032117

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '0b8beca9ac3e'
down_revision: Union[str, Sequence[str], None] = 'fc2038829457'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
