/**
 * Configurable Notifications context for libcss layout components.
 * 
 * Consuming apps provide their own notification data via the provider.
 */

import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

export interface LibcssNotification {
  id: string | number;
  title?: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  read?: boolean;
  createdAt?: string | Date;
  [key: string]: unknown;
}

export interface LibcssNotificationsValue {
  notifications: LibcssNotification[];
  unreadCount: number;
  markAsRead?: (id: string | number) => void;
  markAllRead?: () => void;
  dismiss?: (id: string | number) => void;
}

const NotificationsContext = createContext<LibcssNotificationsValue>({
  notifications: [],
  unreadCount: 0,
});

export function LibcssNotificationsProvider({
  value,
  children,
}: {
  value: LibcssNotificationsValue;
  children: ReactNode;
}) {
  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications(): LibcssNotificationsValue {
  return useContext(NotificationsContext);
}
