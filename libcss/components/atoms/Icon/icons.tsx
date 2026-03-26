/**
 * @file SVG Icon Collection
 * @description ~100 inline SVG icons built on top of BaseIcon.
 * All icons are stylizable via CSS (color, size, className).
 * Stroked icons use `currentColor` + `stroke-width: 2` by default.
 *
 * Usage:
 *   import { TableIcon, BoardIcon } from '@libcss/components/atoms/Icon/icons';
 *   <TableIcon size="md" className="my-class" />
 */

import type { JSX } from 'react';
import { BaseIcon } from './BaseIcon';
import type { BaseIconProps } from './Icon.types';

// ─── Helper ──

function I({ children, ...props }: BaseIconProps & { children: React.ReactNode }): JSX.Element {
  return <BaseIcon {...props}>{children}</BaseIcon>;
}

// Stroked-icon default attrs
const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

// ─── Navigation / UI ──────────────────────────────────

export function ChevronLeftIcon(p: BaseIconProps) {
  return <I {...p}><polyline {...S} points="15 18 9 12 15 6" /></I>;
}
export function ChevronRightIcon(p: BaseIconProps) {
  return <I {...p}><polyline {...S} points="9 18 15 12 9 6" /></I>;
}
export function ChevronUpIcon(p: BaseIconProps) {
  return <I {...p}><polyline {...S} points="18 15 12 9 6 15" /></I>;
}
export function ChevronDownIcon(p: BaseIconProps) {
  return <I {...p}><polyline {...S} points="6 9 12 15 18 9" /></I>;
}
export function ArrowLeftIcon(p: BaseIconProps) {
  return <I {...p}><line {...S} x1="19" y1="12" x2="5" y2="12" /><polyline {...S} points="12 19 5 12 12 5" /></I>;
}
export function ArrowRightIcon(p: BaseIconProps) {
  return <I {...p}><line {...S} x1="5" y1="12" x2="19" y2="12" /><polyline {...S} points="12 5 19 12 12 19" /></I>;
}
export function ArrowUpIcon(p: BaseIconProps) {
  return <I {...p}><line {...S} x1="12" y1="19" x2="12" y2="5" /><polyline {...S} points="5 12 12 5 19 12" /></I>;
}
export function ArrowDownIcon(p: BaseIconProps) {
  return <I {...p}><line {...S} x1="12" y1="5" x2="12" y2="19" /><polyline {...S} points="19 12 12 19 5 12" /></I>;
}
export function MenuIcon(p: BaseIconProps) {
  return <I {...p}><line {...S} x1="3" y1="12" x2="21" y2="12" /><line {...S} x1="3" y1="6" x2="21" y2="6" /><line {...S} x1="3" y1="18" x2="21" y2="18" /></I>;
}
export function MoreHorizontalIcon(p: BaseIconProps) {
  return <I {...p}><circle fill="currentColor" cx="12" cy="12" r="1.5" /><circle fill="currentColor" cx="19" cy="12" r="1.5" /><circle fill="currentColor" cx="5" cy="12" r="1.5" /></I>;
}
export function MoreVerticalIcon(p: BaseIconProps) {
  return <I {...p}><circle fill="currentColor" cx="12" cy="12" r="1.5" /><circle fill="currentColor" cx="12" cy="5" r="1.5" /><circle fill="currentColor" cx="12" cy="19" r="1.5" /></I>;
}
export function XIcon(p: BaseIconProps) {
  return <I {...p}><line {...S} x1="18" y1="6" x2="6" y2="18" /><line {...S} x1="6" y1="6" x2="18" y2="18" /></I>;
}
export function CheckIcon(p: BaseIconProps) {
  return <I {...p}><polyline {...S} points="20 6 9 17 4 12" /></I>;
}
export function PlusIcon(p: BaseIconProps) {
  return <I {...p}><line {...S} x1="12" y1="5" x2="12" y2="19" /><line {...S} x1="5" y1="12" x2="19" y2="12" /></I>;
}
export function MinusIcon(p: BaseIconProps) {
  return <I {...p}><line {...S} x1="5" y1="12" x2="19" y2="12" /></I>;
}
export function ExternalLinkIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline {...S} points="15 3 21 3 21 9" /><line {...S} x1="10" y1="14" x2="21" y2="3" /></I>;
}
export function MaximizeIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" /></I>;
}
export function MinimizeIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" /></I>;
}
export function RefreshIcon(p: BaseIconProps) {
  return <I {...p}><polyline {...S} points="23 4 23 10 17 10" /><polyline {...S} points="1 20 1 14 7 14" /><path {...S} d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></I>;
}
export function HomeIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline {...S} points="9 22 9 12 15 12 15 22" /></I>;
}
export function SettingsIcon(p: BaseIconProps) {
  return <I {...p}><circle {...S} cx="12" cy="12" r="3" /><path {...S} d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></I>;
}

// ─── Database / View Icons ────────────────────────────

export function TableIcon(p: BaseIconProps) {
  return <I {...p}><rect {...S} x="3" y="3" width="18" height="18" rx="2" /><line {...S} x1="3" y1="9" x2="21" y2="9" /><line {...S} x1="3" y1="15" x2="21" y2="15" /><line {...S} x1="9" y1="3" x2="9" y2="21" /></I>;
}
export function BoardIcon(p: BaseIconProps) {
  return <I {...p}><rect {...S} x="3" y="3" width="5" height="18" rx="1" /><rect {...S} x="10" y="3" width="5" height="12" rx="1" /><rect {...S} x="17" y="3" width="4" height="15" rx="1" /></I>;
}
export function ListIcon(p: BaseIconProps) {
  return <I {...p}><line {...S} x1="8" y1="6" x2="21" y2="6" /><line {...S} x1="8" y1="12" x2="21" y2="12" /><line {...S} x1="8" y1="18" x2="21" y2="18" /><line {...S} x1="3" y1="6" x2="3.01" y2="6" /><line {...S} x1="3" y1="12" x2="3.01" y2="12" /><line {...S} x1="3" y1="18" x2="3.01" y2="18" /></I>;
}
export function GalleryIcon(p: BaseIconProps) {
  return <I {...p}><rect {...S} x="3" y="3" width="7" height="7" rx="1" /><rect {...S} x="14" y="3" width="7" height="7" rx="1" /><rect {...S} x="3" y="14" width="7" height="7" rx="1" /><rect {...S} x="14" y="14" width="7" height="7" rx="1" /></I>;
}
export function CalendarIcon(p: BaseIconProps) {
  return <I {...p}><rect {...S} x="3" y="4" width="18" height="18" rx="2" /><line {...S} x1="16" y1="2" x2="16" y2="6" /><line {...S} x1="8" y1="2" x2="8" y2="6" /><line {...S} x1="3" y1="10" x2="21" y2="10" /></I>;
}
export function TimelineIcon(p: BaseIconProps) {
  return <I {...p}><line {...S} x1="2" y1="6" x2="22" y2="6" /><rect {...S} x="4" y="3" width="8" height="6" rx="1" /><rect {...S} x="8" y="10" width="10" height="6" rx="1" /><rect {...S} x="3" y="17" width="6" height="5" rx="1" /></I>;
}
export function ChartBarIcon(p: BaseIconProps) {
  return <I {...p}><rect {...S} x="3" y="12" width="4" height="9" rx="1" /><rect {...S} x="10" y="6" width="4" height="15" rx="1" /><rect {...S} x="17" y="3" width="4" height="18" rx="1" /></I>;
}
export function FeedIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M4 11a9 9 0 0 1 9 9" /><path {...S} d="M4 4a16 16 0 0 1 16 16" /><circle fill="currentColor" cx="5" cy="19" r="2" /></I>;
}
export function MapPinIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle {...S} cx="12" cy="10" r="3" /></I>;
}
export function DashboardIcon(p: BaseIconProps) {
  return <I {...p}><rect {...S} x="3" y="3" width="7" height="9" rx="1" /><rect {...S} x="14" y="3" width="7" height="5" rx="1" /><rect {...S} x="14" y="12" width="7" height="9" rx="1" /><rect {...S} x="3" y="16" width="7" height="5" rx="1" /></I>;
}
export function DatabaseIcon(p: BaseIconProps) {
  return <I {...p}><ellipse {...S} cx="12" cy="5" rx="9" ry="3" /><path {...S} d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path {...S} d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></I>;
}

// ─── Actions / CRUD ───────────────────────────────────

export function SearchIcon(p: BaseIconProps) {
  return <I {...p}><circle {...S} cx="11" cy="11" r="8" /><line {...S} x1="21" y1="21" x2="16.65" y2="16.65" /></I>;
}
export function FilterIcon(p: BaseIconProps) {
  return <I {...p}><polygon {...S} points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></I>;
}
export function SortAscIcon(p: BaseIconProps) {
  return <I {...p}><line {...S} x1="12" y1="19" x2="12" y2="5" /><polyline {...S} points="5 12 12 5 19 12" /></I>;
}
export function SortDescIcon(p: BaseIconProps) {
  return <I {...p}><line {...S} x1="12" y1="5" x2="12" y2="19" /><polyline {...S} points="19 12 12 19 5 12" /></I>;
}
export function GroupIcon(p: BaseIconProps) {
  return <I {...p}><rect {...S} x="3" y="3" width="18" height="6" rx="1" /><rect {...S} x="3" y="15" width="18" height="6" rx="1" /><line {...S} x1="3" y1="12" x2="21" y2="12" /></I>;
}
export function EditIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path {...S} d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></I>;
}
export function TrashIcon(p: BaseIconProps) {
  return <I {...p}><polyline {...S} points="3 6 5 6 21 6" /><path {...S} d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></I>;
}
export function CopyIcon(p: BaseIconProps) {
  return <I {...p}><rect {...S} x="9" y="9" width="13" height="13" rx="2" /><path {...S} d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></I>;
}
export function ClipboardIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect {...S} x="8" y="2" width="8" height="4" rx="1" /></I>;
}
export function SaveIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline {...S} points="17 21 17 13 7 13 7 21" /><polyline {...S} points="7 3 7 8 15 8" /></I>;
}
export function DownloadIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline {...S} points="7 10 12 15 17 10" /><line {...S} x1="12" y1="15" x2="12" y2="3" /></I>;
}
export function UploadIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline {...S} points="17 8 12 3 7 8" /><line {...S} x1="12" y1="3" x2="12" y2="15" /></I>;
}
export function ShareIcon(p: BaseIconProps) {
  return <I {...p}><circle {...S} cx="18" cy="5" r="3" /><circle {...S} cx="6" cy="12" r="3" /><circle {...S} cx="18" cy="19" r="3" /><line {...S} x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line {...S} x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></I>;
}
export function PrintIcon(p: BaseIconProps) {
  return <I {...p}><polyline {...S} points="6 9 6 2 18 2 18 9" /><path {...S} d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect {...S} x="6" y="14" width="12" height="8" /></I>;
}

// ─── Files / Media ────────────────────────────────────

export function FileIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><polyline {...S} points="13 2 13 9 20 9" /></I>;
}
export function FileTextIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline {...S} points="14 2 14 8 20 8" /><line {...S} x1="16" y1="13" x2="8" y2="13" /><line {...S} x1="16" y1="17" x2="8" y2="17" /><polyline {...S} points="10 9 9 9 8 9" /></I>;
}
export function ImageIcon(p: BaseIconProps) {
  return <I {...p}><rect {...S} x="3" y="3" width="18" height="18" rx="2" /><circle {...S} cx="8.5" cy="8.5" r="1.5" /><polyline {...S} points="21 15 16 10 5 21" /></I>;
}
export function VideoIcon(p: BaseIconProps) {
  return <I {...p}><polygon {...S} points="23 7 16 12 23 17 23 7" /><rect {...S} x="1" y="5" width="15" height="14" rx="2" /></I>;
}
export function MusicIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M9 18V5l12-2v13" /><circle {...S} cx="6" cy="18" r="3" /><circle {...S} cx="18" cy="16" r="3" /></I>;
}
export function FolderIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></I>;
}
export function FolderOpenIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v1" /><path {...S} d="M2 10h20l-2 9H4z" /></I>;
}
export function AttachmentIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></I>;
}
export function LinkIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path {...S} d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></I>;
}

// ─── Communication ────────────────────────────────────

export function MailIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline {...S} points="22 6 12 13 2 6" /></I>;
}
export function PhoneIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></I>;
}
export function MessageCircleIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></I>;
}
export function BellIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path {...S} d="M13.73 21a2 2 0 0 1-3.46 0" /></I>;
}
export function GlobeIcon(p: BaseIconProps) {
  return <I {...p}><circle {...S} cx="12" cy="12" r="10" /><line {...S} x1="2" y1="12" x2="22" y2="12" /><path {...S} d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></I>;
}

// ─── Users / People ───────────────────────────────────

export function UserIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle {...S} cx="12" cy="7" r="4" /></I>;
}
export function UsersIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle {...S} cx="9" cy="7" r="4" /><path {...S} d="M23 21v-2a4 4 0 0 0-3-3.87" /><path {...S} d="M16 3.13a4 4 0 0 1 0 7.75" /></I>;
}
export function UserPlusIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle {...S} cx="8.5" cy="7" r="4" /><line {...S} x1="20" y1="8" x2="20" y2="14" /><line {...S} x1="23" y1="11" x2="17" y2="11" /></I>;
}

// ─── Status / State ───────────────────────────────────

export function CheckCircleIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline {...S} points="22 4 12 14.01 9 11.01" /></I>;
}
export function XCircleIcon(p: BaseIconProps) {
  return <I {...p}><circle {...S} cx="12" cy="12" r="10" /><line {...S} x1="15" y1="9" x2="9" y2="15" /><line {...S} x1="9" y1="9" x2="15" y2="15" /></I>;
}
export function AlertCircleIcon(p: BaseIconProps) {
  return <I {...p}><circle {...S} cx="12" cy="12" r="10" /><line {...S} x1="12" y1="8" x2="12" y2="12" /><line {...S} x1="12" y1="16" x2="12.01" y2="16" /></I>;
}
export function AlertTriangleIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line {...S} x1="12" y1="9" x2="12" y2="13" /><line {...S} x1="12" y1="17" x2="12.01" y2="17" /></I>;
}
export function InfoIcon(p: BaseIconProps) {
  return <I {...p}><circle {...S} cx="12" cy="12" r="10" /><line {...S} x1="12" y1="16" x2="12" y2="12" /><line {...S} x1="12" y1="8" x2="12.01" y2="8" /></I>;
}
export function HelpCircleIcon(p: BaseIconProps) {
  return <I {...p}><circle {...S} cx="12" cy="12" r="10" /><path {...S} d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line {...S} x1="12" y1="17" x2="12.01" y2="17" /></I>;
}
export function ClockIcon(p: BaseIconProps) {
  return <I {...p}><circle {...S} cx="12" cy="12" r="10" /><polyline {...S} points="12 6 12 12 16 14" /></I>;
}
export function LoaderIcon(p: BaseIconProps) {
  return <I {...p}><line {...S} x1="12" y1="2" x2="12" y2="6" /><line {...S} x1="12" y1="18" x2="12" y2="22" /><line {...S} x1="4.93" y1="4.93" x2="7.76" y2="7.76" /><line {...S} x1="16.24" y1="16.24" x2="19.07" y2="19.07" /><line {...S} x1="2" y1="12" x2="6" y2="12" /><line {...S} x1="18" y1="12" x2="22" y2="12" /><line {...S} x1="4.93" y1="19.07" x2="7.76" y2="16.24" /><line {...S} x1="16.24" y1="7.76" x2="19.07" y2="4.93" /></I>;
}

// ─── Form / Data ──────────────────────────────────────

export function HashIcon(p: BaseIconProps) {
  return <I {...p}><line {...S} x1="4" y1="9" x2="20" y2="9" /><line {...S} x1="4" y1="15" x2="20" y2="15" /><line {...S} x1="10" y1="3" x2="8" y2="21" /><line {...S} x1="16" y1="3" x2="14" y2="21" /></I>;
}
export function TypeIcon(p: BaseIconProps) {
  return <I {...p}><polyline {...S} points="4 7 4 4 20 4 20 7" /><line {...S} x1="9" y1="20" x2="15" y2="20" /><line {...S} x1="12" y1="4" x2="12" y2="20" /></I>;
}
export function ToggleLeftIcon(p: BaseIconProps) {
  return <I {...p}><rect {...S} x="1" y="5" width="22" height="14" rx="7" /><circle {...S} cx="8" cy="12" r="3" /></I>;
}
export function ToggleRightIcon(p: BaseIconProps) {
  return <I {...p}><rect {...S} x="1" y="5" width="22" height="14" rx="7" /><circle {...S} cx="16" cy="12" r="3" /></I>;
}
export function CheckSquareIcon(p: BaseIconProps) {
  return <I {...p}><polyline {...S} points="9 11 12 14 22 4" /><path {...S} d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></I>;
}
export function SquareIcon(p: BaseIconProps) {
  return <I {...p}><rect {...S} x="3" y="3" width="18" height="18" rx="2" /></I>;
}
export function CircleIcon(p: BaseIconProps) {
  return <I {...p}><circle {...S} cx="12" cy="12" r="10" /></I>;
}
export function SliderIcon(p: BaseIconProps) {
  return <I {...p}><line {...S} x1="4" y1="21" x2="4" y2="14" /><line {...S} x1="4" y1="10" x2="4" y2="3" /><line {...S} x1="12" y1="21" x2="12" y2="12" /><line {...S} x1="12" y1="8" x2="12" y2="3" /><line {...S} x1="20" y1="21" x2="20" y2="16" /><line {...S} x1="20" y1="12" x2="20" y2="3" /><line {...S} x1="1" y1="14" x2="7" y2="14" /><line {...S} x1="9" y1="8" x2="15" y2="8" /><line {...S} x1="17" y1="16" x2="23" y2="16" /></I>;
}
export function CalendarDateIcon(p: BaseIconProps) {
  return <I {...p}><rect {...S} x="3" y="4" width="18" height="18" rx="2" /><line {...S} x1="16" y1="2" x2="16" y2="6" /><line {...S} x1="8" y1="2" x2="8" y2="6" /><line {...S} x1="3" y1="10" x2="21" y2="10" /><rect fill="currentColor" x="7" y="13" width="3" height="3" rx="0.5" /></I>;
}

// ─── Layout / Structure ───────────────────────────────

export function ColumnsIcon(p: BaseIconProps) {
  return <I {...p}><rect {...S} x="3" y="3" width="18" height="18" rx="2" /><line {...S} x1="12" y1="3" x2="12" y2="21" /></I>;
}
export function LayoutIcon(p: BaseIconProps) {
  return <I {...p}><rect {...S} x="3" y="3" width="18" height="18" rx="2" /><line {...S} x1="3" y1="9" x2="21" y2="9" /><line {...S} x1="9" y1="21" x2="9" y2="9" /></I>;
}
export function SidebarIcon(p: BaseIconProps) {
  return <I {...p}><rect {...S} x="3" y="3" width="18" height="18" rx="2" /><line {...S} x1="9" y1="3" x2="9" y2="21" /></I>;
}
export function GridIcon(p: BaseIconProps) {
  return <I {...p}><rect {...S} x="3" y="3" width="7" height="7" /><rect {...S} x="14" y="3" width="7" height="7" /><rect {...S} x="14" y="14" width="7" height="7" /><rect {...S} x="3" y="14" width="7" height="7" /></I>;
}
export function LayersIcon(p: BaseIconProps) {
  return <I {...p}><polygon {...S} points="12 2 2 7 12 12 22 7 12 2" /><polyline {...S} points="2 17 12 22 22 17" /><polyline {...S} points="2 12 12 17 22 12" /></I>;
}
export function BoxIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline {...S} points="3.27 6.96 12 12.01 20.73 6.96" /><line {...S} x1="12" y1="22.08" x2="12" y2="12" /></I>;
}

// ─── Coding / Tech ────────────────────────────────────

export function CodeIcon(p: BaseIconProps) {
  return <I {...p}><polyline {...S} points="16 18 22 12 16 6" /><polyline {...S} points="8 6 2 12 8 18" /></I>;
}
export function TerminalIcon(p: BaseIconProps) {
  return <I {...p}><polyline {...S} points="4 17 10 11 4 5" /><line {...S} x1="12" y1="19" x2="20" y2="19" /></I>;
}
export function CpuIcon(p: BaseIconProps) {
  return <I {...p}><rect {...S} x="4" y="4" width="16" height="16" rx="2" /><rect {...S} x="9" y="9" width="6" height="6" /><line {...S} x1="9" y1="1" x2="9" y2="4" /><line {...S} x1="15" y1="1" x2="15" y2="4" /><line {...S} x1="9" y1="20" x2="9" y2="23" /><line {...S} x1="15" y1="20" x2="15" y2="23" /><line {...S} x1="20" y1="9" x2="23" y2="9" /><line {...S} x1="20" y1="14" x2="23" y2="14" /><line {...S} x1="1" y1="9" x2="4" y2="9" /><line {...S} x1="1" y1="14" x2="4" y2="14" /></I>;
}

// ─── Text / Formatting ────────────────────────────────

export function BoldIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" /><path {...S} d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" /></I>;
}
export function ItalicIcon(p: BaseIconProps) {
  return <I {...p}><line {...S} x1="19" y1="4" x2="10" y2="4" /><line {...S} x1="14" y1="20" x2="5" y2="20" /><line {...S} x1="15" y1="4" x2="9" y2="20" /></I>;
}
export function UnderlineIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" /><line {...S} x1="4" y1="21" x2="20" y2="21" /></I>;
}
export function AlignLeftIcon(p: BaseIconProps) {
  return <I {...p}><line {...S} x1="17" y1="10" x2="3" y2="10" /><line {...S} x1="21" y1="6" x2="3" y2="6" /><line {...S} x1="21" y1="14" x2="3" y2="14" /><line {...S} x1="17" y1="18" x2="3" y2="18" /></I>;
}
export function AlignCenterIcon(p: BaseIconProps) {
  return <I {...p}><line {...S} x1="18" y1="10" x2="6" y2="10" /><line {...S} x1="21" y1="6" x2="3" y2="6" /><line {...S} x1="21" y1="14" x2="3" y2="14" /><line {...S} x1="18" y1="18" x2="6" y2="18" /></I>;
}
export function AlignRightIcon(p: BaseIconProps) {
  return <I {...p}><line {...S} x1="21" y1="10" x2="7" y2="10" /><line {...S} x1="21" y1="6" x2="3" y2="6" /><line {...S} x1="21" y1="14" x2="3" y2="14" /><line {...S} x1="21" y1="18" x2="7" y2="18" /></I>;
}

// ─── Misc / Objects ───────────────────────────────────

export function StarIcon(p: BaseIconProps) {
  return <I {...p}><polygon {...S} points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></I>;
}
export function HeartIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></I>;
}
export function BookmarkIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></I>;
}
export function TagIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line {...S} x1="7" y1="7" x2="7.01" y2="7" /></I>;
}
export function FlagIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line {...S} x1="4" y1="22" x2="4" y2="15" /></I>;
}
export function ZapIcon(p: BaseIconProps) {
  return <I {...p}><polygon {...S} points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></I>;
}
export function AwardIcon(p: BaseIconProps) {
  return <I {...p}><circle {...S} cx="12" cy="8" r="7" /><polyline {...S} points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></I>;
}
export function TrendingUpIcon(p: BaseIconProps) {
  return <I {...p}><polyline {...S} points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline {...S} points="17 6 23 6 23 12" /></I>;
}
export function TrendingDownIcon(p: BaseIconProps) {
  return <I {...p}><polyline {...S} points="23 18 13.5 8.5 8.5 13.5 1 6" /><polyline {...S} points="17 18 23 18 23 12" /></I>;
}
export function ActivityIcon(p: BaseIconProps) {
  return <I {...p}><polyline {...S} points="22 12 18 12 15 21 9 3 6 12 2 12" /></I>;
}
export function BarChart2Icon(p: BaseIconProps) {
  return <I {...p}><line {...S} x1="18" y1="20" x2="18" y2="10" /><line {...S} x1="12" y1="20" x2="12" y2="4" /><line {...S} x1="6" y1="20" x2="6" y2="14" /></I>;
}
export function PieChartIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path {...S} d="M22 12A10 10 0 0 0 12 2v10z" /></I>;
}
export function TargetIcon(p: BaseIconProps) {
  return <I {...p}><circle {...S} cx="12" cy="12" r="10" /><circle {...S} cx="12" cy="12" r="6" /><circle {...S} cx="12" cy="12" r="2" /></I>;
}
export function CrosshairIcon(p: BaseIconProps) {
  return <I {...p}><circle {...S} cx="12" cy="12" r="10" /><line {...S} x1="22" y1="12" x2="18" y2="12" /><line {...S} x1="6" y1="12" x2="2" y2="12" /><line {...S} x1="12" y1="6" x2="12" y2="2" /><line {...S} x1="12" y1="22" x2="12" y2="18" /></I>;
}
export function ShieldIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></I>;
}
export function LockIcon(p: BaseIconProps) {
  return <I {...p}><rect {...S} x="3" y="11" width="18" height="11" rx="2" /><path {...S} d="M7 11V7a5 5 0 0 1 10 0v4" /></I>;
}
export function UnlockIcon(p: BaseIconProps) {
  return <I {...p}><rect {...S} x="3" y="11" width="18" height="11" rx="2" /><path {...S} d="M7 11V7a5 5 0 0 1 9.9-1" /></I>;
}
export function KeyIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" /></I>;
}
export function EyeIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle {...S} cx="12" cy="12" r="3" /></I>;
}
export function EyeOffIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line {...S} x1="1" y1="1" x2="23" y2="23" /></I>;
}
export function SunIcon(p: BaseIconProps) {
  return <I {...p}><circle {...S} cx="12" cy="12" r="5" /><line {...S} x1="12" y1="1" x2="12" y2="3" /><line {...S} x1="12" y1="21" x2="12" y2="23" /><line {...S} x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line {...S} x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line {...S} x1="1" y1="12" x2="3" y2="12" /><line {...S} x1="21" y1="12" x2="23" y2="12" /><line {...S} x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line {...S} x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></I>;
}
export function MoonIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></I>;
}
export function CloudIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" /></I>;
}
export function RocketIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path {...S} d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path {...S} d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path {...S} d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></I>;
}
export function CoffeeIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M18 8h1a4 4 0 0 1 0 8h-1" /><path {...S} d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line {...S} x1="6" y1="1" x2="6" y2="4" /><line {...S} x1="10" y1="1" x2="10" y2="4" /><line {...S} x1="14" y1="1" x2="14" y2="4" /></I>;
}
export function ThumbsUpIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" /></I>;
}
export function ThumbsDownIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" /></I>;
}
export function DollarSignIcon(p: BaseIconProps) {
  return <I {...p}><line {...S} x1="12" y1="1" x2="12" y2="23" /><path {...S} d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></I>;
}
export function PercentIcon(p: BaseIconProps) {
  return <I {...p}><line {...S} x1="19" y1="5" x2="5" y2="19" /><circle {...S} cx="6.5" cy="6.5" r="2.5" /><circle {...S} cx="17.5" cy="17.5" r="2.5" /></I>;
}
export function PackageIcon(p: BaseIconProps) {
  return <I {...p}><line {...S} x1="16.5" y1="9.4" x2="7.5" y2="4.21" /><path {...S} d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline {...S} points="3.27 6.96 12 12.01 20.73 6.96" /><line {...S} x1="12" y1="22.08" x2="12" y2="12" /></I>;
}
export function HashtagIcon(p: BaseIconProps) {
  return <I {...p}><line {...S} x1="4" y1="9" x2="20" y2="9" /><line {...S} x1="4" y1="15" x2="20" y2="15" /><line {...S} x1="10" y1="3" x2="8" y2="21" /><line {...S} x1="16" y1="3" x2="14" y2="21" /></I>;
}
export function AtSignIcon(p: BaseIconProps) {
  return <I {...p}><circle {...S} cx="12" cy="12" r="4" /><path {...S} d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" /></I>;
}
export function PaletteIcon(p: BaseIconProps) {
  return <I {...p}><circle {...S} cx="12" cy="12" r="10" /><circle fill="currentColor" cx="12" cy="7" r="1.5" /><circle fill="currentColor" cx="7.5" cy="11" r="1.5" /><circle fill="currentColor" cx="9" cy="16" r="1.5" /><circle fill="currentColor" cx="16.5" cy="11" r="1.5" /></I>;
}
export function WrenchIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></I>;
}
export function BugIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="M8 2l1.88 1.88" /><path {...S} d="M14.12 3.88L16 2" /><path {...S} d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" /><path {...S} d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6" /><path {...S} d="M12 20v-9" /><path {...S} d="M6.53 9C4.6 8.8 3 7.1 3 5" /><path {...S} d="M6 13H2" /><path {...S} d="M3 21c0-2.1 1.7-3.9 3.8-4" /><path {...S} d="M20.97 5c0 2.1-1.6 3.8-3.5 4" /><path {...S} d="M22 13h-4" /><path {...S} d="M17.2 17c2.1.1 3.8 1.9 3.8 4" /></I>;
}
export function SparklesIcon(p: BaseIconProps) {
  return <I {...p}><path {...S} d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /><path {...S} d="M5 3v4" /><path {...S} d="M19 17v4" /><path {...S} d="M3 5h4" /><path {...S} d="M17 19h4" /></I>;
}
export function CompassIcon(p: BaseIconProps) {
  return <I {...p}><circle {...S} cx="12" cy="12" r="10" /><polygon {...S} points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></I>;
}
export function AnchorIcon(p: BaseIconProps) {
  return <I {...p}><circle {...S} cx="12" cy="5" r="3" /><line {...S} x1="12" y1="22" x2="12" y2="8" /><path {...S} d="M5 12H2a10 10 0 0 0 20 0h-3" /></I>;
}
