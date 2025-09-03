"""smth

Revision ID: 64df537bbea8
Revises: 0b8beca9ac3e
Create Date: 2025-08-27 23:42:06.260538

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '64df537bbea8'
down_revision: Union[str, Sequence[str], None] = '0b8beca9ac3e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
