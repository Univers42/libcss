/**
 * Global ambient declarations for libcss
 *
 * These declare external modules used by components so TypeScript is satisfied
 * without installing every runtime dependency. Consuming apps must provide
 * these packages themselves (peer-dependencies).
 */

declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}

interface ImportMeta {
  glob<T = unknown>(
    pattern: string | string[],
    options?: { eager?: boolean },
  ): Record<string, () => Promise<T>>;
}

declare module 'lucide-react' {
  import type { FC, SVGProps } from 'react';
  type Icon = FC<SVGProps<SVGSVGElement> & { size?: number | string }>;
  export const ArrowRight: Icon;
  export const Award: Icon;
  export const Bell: Icon;
  export const Calendar: Icon;
  export const Check: Icon;
  export const CheckCircle: Icon;
  export const AlertCircle: Icon;
  export const ChefHat: Icon;
  export const ChevronDown: Icon;
  export const ChevronRight: Icon;
  export const Clock: Icon;
  export const Copy: Icon;
  export const Mail: Icon;
  export const Megaphone: Icon;
  export const Phone: Icon;
  export const Send: Icon;
  export const Settings: Icon;
  export const ShoppingCart: Icon;
  export const Sparkles: Icon;
  export const Star: Icon;
  export const Tag: Icon;
  export const Users: Icon;
  export const X: Icon;
  export const CheckCheck: Icon;
  export const Search: Icon;
  export const Menu: Icon;
  export const Home: Icon;
  export const User: Icon;
  export const LogOut: Icon;
  export const LogIn: Icon;
  export const Heart: Icon;
  export const Shield: Icon;
  export const Briefcase: Icon;
  export const BarChart3: Icon;
  export const MessageSquare: Icon;
  export const Gift: Icon;
  export const Ticket: Icon;
  export const FileText: Icon;
  export const ExternalLink: Icon;
  export const RefreshCw: Icon;
  export const Loader2: Icon;
  export const Brain: Icon;
  export const Bot: Icon;
  export const Wand2: Icon;
  export const Utensils: Icon;
  export const Plus: Icon;
  export const Minus: Icon;
  export const Trash2: Icon;
  export const Edit: Icon;
  export const Eye: Icon;
  export const EyeOff: Icon;
  export const Upload: Icon;
  export const Download: Icon;
  export const Filter: Icon;
  export const SortAsc: Icon;
  export const SortDesc: Icon;
  export const MoreHorizontal: Icon;
  export const MoreVertical: Icon;
  export const Pencil: Icon;
  export const Save: Icon;
  export const XCircle: Icon;
  export const Info: Icon;
  export const AlertTriangle: Icon;
  export const ChevronUp: Icon;
  export const ChevronLeft: Icon;
  export const ChevronsLeft: Icon;
  export const ChevronsRight: Icon;
  export const ArrowLeft: Icon;
  export const ArrowUp: Icon;
  export const ArrowDown: Icon;
  export const RotateCcw: Icon;
  export const Clipboard: Icon;
  export const MapPin: Icon;
  export const Image: Icon;
  export const Camera: Icon;
  export const Video: Icon;
  export const Mic: Icon;
  export const Volume2: Icon;
  export const VolumeX: Icon;
  export const Wifi: Icon;
  export const WifiOff: Icon;
  export const Globe: Icon;
  export const Lock: Icon;
  export const Unlock: Icon;
  export const Key: Icon;
  export const Zap: Icon;
  export const Sun: Icon;
  export const Moon: Icon;
  export const Monitor: Icon;
  export const Smartphone: Icon;
  export const Tablet: Icon;
  export const Code: Icon;
  export const Terminal: Icon;
  export const Database: Icon;
  export const Server: Icon;
  export const Cloud: Icon;
  export const Folder: Icon;
  export const File: Icon;
  export const Inbox: Icon;
  export const Archive: Icon;
  export const Bookmark: Icon;
  export const Flag: Icon;
  export const MessageCircle: Icon;
  export const GripVertical: Icon;
  export const Euro: Icon;
  export const UtensilsCrossed: Icon;
  export const Leaf: Icon;
  export const ThumbsUp: Icon;
  export const ThumbsDown: Icon;
  export const Share2: Icon;
  export const Link: Icon;
  export const Paperclip: Icon;
  export const CalendarDays: Icon;
  export const ClockIcon: Icon;
  export const Play: Icon;
  export const Pause: Icon;
  export const SkipForward: Icon;
  export const SkipBack: Icon;
  export const Maximize2: Icon;
  export const Minimize2: Icon;
  export const Columns: Icon;
  export const Layout: Icon;
  export const Grid: Icon;
  export const List: Icon;
  export const Hash: Icon;
  export const AtSign: Icon;
  export const Percent: Icon;
  export const DollarSign: Icon;
  export const CreditCard: Icon;
  export const ShoppingBag: Icon;
  export const Package: Icon;
  export const Truck: Icon;
}

declare module '@xterm/xterm' {
  export class Terminal {
    constructor(options?: Record<string, unknown>);
    open(container: HTMLElement): void;
    write(data: string): void;
    writeln(data: string): void;
    clear(): void;
    focus(): void;
    dispose(): void;
    loadAddon(addon: any): void;
    onData(callback: (data: string) => void): { dispose(): void };
    onTitleChange(callback: (title: string) => void): { dispose(): void };
    options: Record<string, unknown>;
    element?: HTMLElement;
    cols: number;
    rows: number;
  }
}

declare module '@xterm/addon-fit' {
  import type { Terminal } from '@xterm/xterm';
  export class FitAddon {
    activate(terminal: Terminal): void;
    fit(): void;
    dispose(): void;
    proposeDimensions(): { cols: number; rows: number } | undefined;
  }
}

declare module 'socket.io-client' {
  export interface Socket {
    id: string;
    connected: boolean;
    on(event: string, callback: (...args: any[]) => void): Socket;
    off(event: string, callback?: (...args: any[]) => void): Socket;
    emit(event: string, ...args: any[]): Socket;
    connect(): Socket;
    disconnect(): Socket;
  }
  export function io(url?: string, options?: Record<string, unknown>): Socket;
  export type { Socket };
}

declare module 'd3-shape' {
  export function line<_T = [number, number]>(): any;
  export function area<_T = [number, number]>(): any;
  export function arc<_T = any>(): any;
  export function pie<_T = any>(): any;
  export function stack(): any;
  export const curveLinear: any;
  export const curveMonotoneX: any;
  export const curveBasis: any;
  export const curveCardinal: any;
  export const curveStep: any;
  export const curveNatural: any;
  export const curveCatmullRom: any;
  export interface PieArcDatum<T> {
    data: T;
    value: number;
    index: number;
    startAngle: number;
    endAngle: number;
    padAngle: number;
  }
}

declare module 'd3-scale' {
  export interface ScaleLinear<Range = number, Output = number> {
    (value: number): Output;
    domain(): number[];
    domain(domain: number[]): this;
    range(range: Range[]): this;
    nice(count?: number): this;
    ticks(count?: number): number[];
    tickFormat(count?: number, specifier?: string): (d: number) => string;
    copy(): this;
    invert(value: Range): number;
    clamp(clamp: boolean): this;
  }
  export interface ScaleBand<Domain extends { toString(): string } = string> {
    (value: Domain): number | undefined;
    domain(): Domain[];
    domain(domain: Domain[]): this;
    range(range: [number, number]): this;
    rangeRound(range: [number, number]): this;
    bandwidth(): number;
    step(): number;
    padding(padding: number): this;
    paddingInner(padding: number): this;
    paddingOuter(padding: number): this;
    align(align: number): this;
    copy(): this;
  }
  export interface ScaleOrdinal<Domain extends { toString(): string } = string, Range = string> {
    (value: Domain): Range;
    domain(): Domain[];
    domain(domain: Domain[]): this;
    range(range: Range[]): this;
    copy(): this;
  }
  export function scaleLinear<Range = number, Output = number>(): ScaleLinear<Range, Output>;
  export function scaleBand<Domain extends { toString(): string } = string>(): ScaleBand<Domain>;
  export function scaleOrdinal<Domain extends { toString(): string } = string, Range = string>(
    range?: readonly Range[],
  ): ScaleOrdinal<Domain, Range>;
  export function scalePoint(): any;
  export function scaleTime(): any;
  export function scaleLog(): any;
  export function scalePow(): any;
  export function scaleSqrt(): any;
}

declare module 'd3-selection' {
  export function select(selector: string | Element): any;
  export function selectAll(selector: string): any;
}

declare module 'd3-axis' {
  export function axisBottom(scale: any): any;
  export function axisLeft(scale: any): any;
  export function axisRight(scale: any): any;
  export function axisTop(scale: any): any;
}

declare module 'd3-interpolate' {
  export function interpolateRgb(a: string, b: string): (t: number) => string;
  export function interpolateHsl(a: string, b: string): (t: number) => string;
  export function interpolateHcl(a: string, b: string): (t: number) => string;
  export function interpolateLab(a: string, b: string): (t: number) => string;
  export function interpolate(a: any, b: any): (t: number) => any;
  export function quantize(interpolator: (t: number) => any, n: number): any[];
}

declare module 'd3-color' {
  export function rgb(color: string): {
    r: number;
    g: number;
    b: number;
    opacity: number;
    toString(): string;
  };
  export function hsl(color: string): {
    h: number;
    s: number;
    l: number;
    opacity: number;
    toString(): string;
  };
  export function hcl(color: string): {
    h: number;
    c: number;
    l: number;
    opacity: number;
    toString(): string;
  };
  export function color(
    specifier: string,
  ): { rgb(): { r: number; g: number; b: number }; toString(): string } | null;
}
