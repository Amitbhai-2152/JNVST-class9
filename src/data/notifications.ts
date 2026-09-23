export interface SiteNotification {
  id: string;
  title: string;
  body: string;
  tag: string;
  date: string;
}

export const siteNotifications: SiteNotification[] = [
  {
    id: 'nav-refresh-2026-09-23',
    title: 'Navbar update',
    body: 'Dashboard navigation, Student Account और responsive mobile menu को बेहतर किया गया है।',
    tag: 'Update',
    date: '23 Sep 2026',
  },
  {
    id: 'auth-refresh-2026-09-23',
    title: 'Account experience update',
    body: 'Login/signup readability, email confirmation और account controls को polish किया गया है।',
    tag: 'Update',
    date: '23 Sep 2026',
  },
];
