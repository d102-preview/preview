from pydantic import Field, MariaDBDsn
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    API_V1_STR: str = Field("/ai")

    DATABASE_DSN: MariaDBDsn

    TZ: str = "Asia/Seoul"


settings = Settings()
