import functools
import time
from datetime import timedelta

from loguru import logger


def elapsed(f):
    @functools.wraps(f)
    def wrapper(*args, **kwargs):
        start = time.time()

        result = f(*args, **kwargs)

        elapsed_time = timedelta(seconds=(time.time() - start))
        logger.debug(f"{f.__name__}: Elapsed {elapsed_time}")

        return result

    return wrapper
