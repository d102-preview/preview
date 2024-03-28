from pydantic import DirectoryPath, Field, MariaDBDsn
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    DEBUG: bool = False

    # Server variables
    API_V1_STR: str = Field("/ai")
    DATA_HOME: DirectoryPath

    TZ: str = "Asia/Seoul"

    # Analysis variables
    FPS: int = Field(1, ge=1)

    # Database variables
    DATABASE_DSN: MariaDBDsn

    # Build variables
    REGISTRY: str
    IMG_NAME: str
    TAG: str


settings = Settings()
