import { toast } from "react-toastify";

class NotificationService {
    public success(message: string): void {
        toast.success(message);
    }

    public error(message: string): void {
        toast.error(message);
    }
}

export const notificationService = new NotificationService();
