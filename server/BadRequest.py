class BadRequest(Exception):
    """Custom exception class to be thrown when local error occurs."""

    def __init__(self, message, status=400, payload=None):
        self.message = message
        self.status = status
        self.payload = payload