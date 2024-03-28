import uvicorn


def load_config():
    """
    References:
      - https://docs.python.org/ko/3/library/logging.html#logrecord-attributes
    """
    config = uvicorn.config.LOGGING_CONFIG

    msg_format = (
        "%(asctime)s | %(levelname)-8s | %(name)s:%(funcName)s:%(lineno)s - %(message)s"
    )

    config["formatters"]["default"]["fmt"] = msg_format
    config["formatters"]["access"]["fmt"] = msg_format

    return config
