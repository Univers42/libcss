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
  type?: string;
  read?: boolean;
  is_read?: boolean;
  body?: string;
  createdAt?: string | Date;
  created_at?: string;
  [key: string]: unknown;
}

export interface LibcssNotificationsValue {
  notifications: LibcssNotification[];
  unreadCount: number;
  markAsRead?: (id: string | number) => void;
  markAllRead?: () => void;
  dismiss?: (id: string | number) => void;
  /** Toggle notification panel visibility */
  toggle?: () => void;
  /** Whether the notification panel is open */
  isOpen?: boolean;
  /** Set of dismissed notification IDs */
  dismissedIds?: Set<string | number>;
  /** Close the notification panel */
  close?: () => void;
  /** Mark a single notification as read */
  read?: (id: string | number) => void;
  /** Mark all notifications as read */
  readAll?: () => void;
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
  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
}

export function useNotifications(): LibcssNotificationsValue {
  return useContext(NotificationsContext);
}
