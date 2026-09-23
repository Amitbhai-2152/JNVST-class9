import notificationFeed from './notifications.json';

export interface SiteNotification {
  id: string;
  title: string;
  body: string;
  tag: string;
  date: string;
}

export const siteNotifications = notificationFeed as SiteNotification[];
