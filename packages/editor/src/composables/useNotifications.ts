import { ref } from "vue";
import { backResponseCrud } from "@/api/medicalApi";
import type { GetNotificaciones, Result } from "@/types/api/auth/login";

// Global shared state for notifications so all components see the same data
const notifications = ref<Result[]>([]);
const hasMoreNotifications = ref(false);
const notificationsLoading = ref(false);
const notificationPage = ref(1);
const unreadCountNotification = ref(0);

export function useNotifications() {
  const getNotificationUser = async (reset = true) => {
    if (notificationsLoading.value && reset) return;
    notificationsLoading.value = true;
    try {
      if (reset) {
        notificationPage.value = 1;
      }
      const { data } = await backResponseCrud.get<GetNotificaciones>(
        `/notifications/?page=${notificationPage.value}`
      );
      if (reset) {
        notifications.value = data.results || [];
      } else {
        notifications.value = [...notifications.value, ...(data.results || [])];
      }
      unreadCountNotification.value = data.unread_counter || 0;
      hasMoreNotifications.value = !!data.next;
    } catch (error) {
      console.error("Error fetching notifications", error);
    } finally {
      notificationsLoading.value = false;
    }
  };

  const loadMoreNotifications = async () => {
    if (!hasMoreNotifications.value || notificationsLoading.value) return;
    notificationPage.value += 1;
    await getNotificationUser(false);
  };

  const toggleNotificationReadStatus = async (id: string) => {
    try {
      const notif = notifications.value.find((n) => n.id === id);
      if (notif && !notif.is_read) {
        await backResponseCrud.patch(`/notifications/${id}/read/`, {});
        notif.is_read = true;
        if (unreadCountNotification.value > 0) {
          unreadCountNotification.value -= 1;
        }
      }
    } catch (error) {
      console.error("Error toggling notification read status", error);
    }
  };

  const markAllNotificationsAsRead = async () => {
    try {
      const unread = notifications.value.filter((n) => !n.is_read);
      if (unread.length > 0) {
        await backResponseCrud.patch(`/notifications/mark-all-read/`);
        notifications.value.forEach((n) => {
          n.is_read = true;
        });
        unreadCountNotification.value = 0;
      }
    } catch (error) {
      console.error("Error marking all notifications as read", error);
    }
  };

  return {
    notifications,
    hasMoreNotifications,
    notificationsLoading,
    notificationPage,
    unreadCountNotification,
    getNotificationUser,
    loadMoreNotifications,
    toggleNotificationReadStatus,
    markAllNotificationsAsRead,
  };
}
