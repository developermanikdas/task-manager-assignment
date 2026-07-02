export const getErrorMessage = (err) => {
  // Server responded with an error
  if (err.response) {
    switch (err.response.status) {
      case 400:
        return err.response.data?.message || "Bad Request.";

      case 401:
        return "Your session has expired. Please login again.";

      case 403:
        return "You don't have permission to perform this action.";

      case 404:
        return err.response.data?.message || "Resource not found.";

      case 500:
        return "Internal Server Error.";

      default:
        return (
          err.response.data?.message ||
          "Something went wrong."
        );
    }
  }

  // Request sent but no response
  if (err.request) {
    return "Unable to connect to the server. Please check your internet connection.";
  }

  // Unexpected error
  return err.message || "Unexpected error occurred.";
};