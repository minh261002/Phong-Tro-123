import { HttpStatus } from "@/constants/httpStatus";
import axios from "axios";

const handleAxiosError = (
  error: unknown,
  showToast: (message: string, type: "success" | "error") => void
): void => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const statusCode = error.response.status;
      if (statusCode == HttpStatus.BAD_REQUEST) {
        const messageValidate = error.response.data.message_validate;
        if (messageValidate) {
          for (const key in messageValidate) {
            if (Object.prototype.hasOwnProperty.call(messageValidate, key)) {
              const messages = messageValidate[key];
              if (Array.isArray(messages)) {
                messages.forEach((message) => {
                  showToast(message, "error");
                });
              }
            }
          }
        }
      }

      if (statusCode == HttpStatus.UNPROCESSABLE_ENTITY) {
        const errors = error.response.data.errors;
        if (errors) {
          for (const key in errors) {
            if (Object.prototype.hasOwnProperty.call(errors, key)) {
              const messages = errors[key];
              if (Array.isArray(messages)) {
                messages.forEach((message) => {
                  showToast(message, "error");
                });
              }
            }
          }
        }
      }
    } else if (error.request) {
      console.error("No response received from server.");
    } else {
      console.error(`Error Message: ${error.message}`);
    }
  } else {
    console.error("Lỗi không xác định:", error);
  }
};

export { handleAxiosError };
