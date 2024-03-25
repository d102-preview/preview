from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    API_V1_STR: str = "/ai"


settings = Settings()
