/**
 * @file Database Type System
 * @description Core types for the Notion-like database component.
 * Defines property types, schema, records, views, filters, sorts,
 * groups, and conditional color rules.
 *
 * 27 property types matching Notion's property system —
 * each type enforces its own input constraints and display format.
 */

// ─── Property Types ──────────────────────────────────

/** All supported database property types. */
export type PropertyType =
  | 'text'
  | 'number'
  | 'select'
  | 'multi_select'
  | 'status'
  | 'date'
  | 'person'
  | 'files_media'
  | 'checkbox'
  | 'url'
  | 'email'
  | 'phone'
  | 'formula'
  | 'relation'
  | 'rollup'
  | 'created_time'
  | 'last_edited_time'
  | 'last_edited_by'
  | 'button'
  | 'place'
  | 'description'
  | 'priority'
  | 'assigned_to'
  | 'attachments'
  | 'number_id';

/** Display format for number property. */
export type NumberFormat = 'number' | 'currency' | 'percent' | 'bar';

/** Date display format. */
export type DateFormat = 'full' | 'short' | 'relative' | 'iso';

/** Select / multi-select option. */
export interface SelectOption {
  readonly id: string;
  readonly label: string;
  readonly color: string;
}

/** Status option extends select with a group (not started / in progress / done). */
export interface StatusOption extends SelectOption {
  readonly group: 'not_started' | 'in_progress' | 'done';
}

/** Per-type configuration (discriminated by PropertyType). */
export interface PropertyConfig {
  /** Select options (for select, multi_select, priority). */
  options?: readonly SelectOption[];
  /** Status options (for status). */
  statusOptions?: readonly StatusOption[];
  /** Number format (for number, number_id). */
  numberFormat?: NumberFormat;
  /** Currency code (for number with currency format). */
  currency?: string;
  /** Date format (for date, created_time, last_edited_time). */
  dateFormat?: DateFormat;
  /** Include time in date display. */
  includeTime?: boolean;
  /** Formula expression string. */
  formula?: string;
  /** Relation target database id. */
  relationTarget?: string;
  /** Rollup config. */
  rollup?: {
    relation: string;
    property: string;
    aggregate: 'sum' | 'count' | 'average' | 'min' | 'max' | 'median' | 'show_original';
  };
  /** Button label. */
  buttonLabel?: string;
  /** Button action url. */
  buttonUrl?: string;
  /** Max width in pixels (for display). */
  width?: number;
}

// ─── Schema ──────────────────────────────────────────

/** A single property definition in the schema. */
export interface PropertyDef {
  /** Unique property id. */
  readonly id: string;
  /** Human-readable name. */
  readonly name: string;
  /** Property type. */
  readonly type: PropertyType;
  /** Type-specific configuration. */
  readonly config?: PropertyConfig;
  /** Description / help text. */
  readonly description?: string;
  /** Whether this property is required. */
  readonly required?: boolean;
}

/** Database schema — defines the structure of a database. */
export interface DatabaseSchema {
  /** Unique database id. */
  readonly id: string;
  /** Database display name. */
  readonly name: string;
  /** Database description. */
  readonly description?: string;
  /** Icon emoji or url. */
  readonly icon?: string;
  /** Cover image url. */
  readonly cover?: string;
  /** All property definitions. */
  readonly properties: readonly PropertyDef[];
  /** Primary property id (used as row title). */
  readonly primaryProperty: string;
}

// ─── Records ─────────────────────────────────────────

/** A single value in a record — type depends on the property type. */
export type CellValue =
  | string
  | number
  | boolean
  | string[]
  | null
  | undefined
  | { url: string; name?: string }
  | { url: string; name?: string }[];

/** A map of property id → cell value. */
export type RecordValues = Record<string, CellValue>;

/** A single database record (row). */
export interface DatabaseRecord {
  /** Unique record id. */
  readonly id: string;
  /** Property values keyed by property id. */
  values: RecordValues;
  /** Auto-set creation timestamp (ISO string). */
  _created_time: string;
  /** Auto-set last edit timestamp (ISO string). */
  _last_edited_time: string;
  /** Auto-set last editor identifier. */
  _last_edited_by: string;
}

// ─── Database Source ─────────────────────────────────

/** Complete database: schema + records + views. */
export interface DatabaseSource {
  /** Schema definition. */
  schema: DatabaseSchema;
  /** All records. */
  records: DatabaseRecord[];
  /** View configurations. */
  views: ViewConfig[];
}

// ─── Views ───────────────────────────────────────────

/** The 10 supported view layout types. */
export type ViewType =
  | 'table'
  | 'board'
  | 'timeline'
  | 'calendar'
  | 'list'
  | 'gallery'
  | 'chart'
  | 'feed'
  | 'map'
  | 'dashboard';

/** Identifiers and labels for each view type. `icon` is a key for the icon map. */
export const VIEW_TYPE_META: Record<ViewType, { label: string; icon: string }> = {
  table:     { label: 'Table',     icon: 'table' },
  board:     { label: 'Board',     icon: 'board' },
  timeline:  { label: 'Timeline',  icon: 'timeline' },
  calendar:  { label: 'Calendar',  icon: 'calendar' },
  list:      { label: 'List',      icon: 'list' },
  gallery:   { label: 'Gallery',   icon: 'gallery' },
  chart:     { label: 'Chart',     icon: 'chart' },
  feed:      { label: 'Feed',      icon: 'feed' },
  map:       { label: 'Map',       icon: 'map' },
  dashboard: { label: 'Dashboard', icon: 'dashboard' },
};

/** Filter operator. */
export type FilterOperator =
  | 'eq'
  | 'neq'
  | 'contains'
  | 'not_contains'
  | 'starts_with'
  | 'ends_with'
  | 'is_empty'
  | 'is_not_empty'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'in'
  | 'not_in';

/** Sort direction. */
export type SortDirection = 'asc' | 'desc';

/** A single filter rule. */
export interface FilterRule {
  /** Property id to filter on. */
  readonly property: string;
  /** Comparison operator. */
  readonly operator: FilterOperator;
  /** Value to compare against. */
  readonly value: CellValue;
}

/** A single sort rule. */
export interface SortRule {
  /** Property id to sort on. */
  readonly property: string;
  /** Direction. */
  readonly direction: SortDirection;
}

/** Group-by rule. */
export interface GroupRule {
  /** Property id to group by. */
  readonly property: string;
  /** Whether to show empty groups. */
  readonly showEmpty?: boolean;
  /** Sort direction for group headers. */
  readonly sort?: SortDirection;
}

/** Conditional color rule. */
export interface ConditionalColorRule {
  /** Property id to evaluate. */
  readonly property: string;
  /** Comparison operator. */
  readonly operator: FilterOperator;
  /** Value to compare against. */
  readonly value: CellValue;
  /** CSS color to apply when condition matches. */
  readonly color: string;
}

/** Chart-specific view options. */
export interface ChartViewOptions {
  chartType?: string;
  xAxis?: string;
  yAxis?: string;
  groupBy?: string;
  palette?: string;
}

/** Board-specific view options. */
export interface BoardViewOptions {
  /** Property used for columns. */
  columnProperty?: string;
  /** Properties shown on cards. */
  cardProperties?: string[];
}

/** Calendar-specific view options. */
export interface CalendarViewOptions {
  /** Property used for date placement. */
  dateProperty?: string;
}

/** Timeline-specific view options. */
export interface TimelineViewOptions {
  /** Start date property. */
  startProperty?: string;
  /** End date property (optional). */
  endProperty?: string;
  /** Zoom level. */
  zoom?: 'day' | 'week' | 'month';
}

/** Gallery-specific view options. */
export interface GalleryViewOptions {
  /** Property used for cover image. */
  coverProperty?: string;
  /** Properties shown on cards. */
  cardProperties?: string[];
  /** Card size. */
  cardSize?: 'sm' | 'md' | 'lg';
}

/** Configuration for a single view of a database. */
export interface ViewConfig {
  /** Unique view id. */
  readonly id: string;
  /** View display name. */
  name: string;
  /** View layout type. */
  type: ViewType;
  /** Which properties are visible (property id → boolean). */
  propertyVisibility: Record<string, boolean>;
  /** Active filters. */
  filters: FilterRule[];
  /** Active sorts. */
  sorts: SortRule[];
  /** Group-by configuration. */
  groupBy?: GroupRule;
  /** Conditional color rules. */
  conditionalColors: ConditionalColorRule[];
  /** View-type specific options. */
  chartOptions?: ChartViewOptions;
  boardOptions?: BoardViewOptions;
  calendarOptions?: CalendarViewOptions;
  timelineOptions?: TimelineViewOptions;
  galleryOptions?: GalleryViewOptions;
}

// ─── Helpers ─────────────────────────────────────────

/** Operators valid for each general category. */
export const OPERATORS_BY_CATEGORY = {
  text:   ['eq', 'neq', 'contains', 'not_contains', 'starts_with', 'ends_with', 'is_empty', 'is_not_empty'] as FilterOperator[],
  number: ['eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'is_empty', 'is_not_empty'] as FilterOperator[],
  select: ['eq', 'neq', 'in', 'not_in', 'is_empty', 'is_not_empty'] as FilterOperator[],
  bool:   ['eq'] as FilterOperator[],
  date:   ['eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'is_empty', 'is_not_empty'] as FilterOperator[],
} as const;

/** Map each property type to its operator category. */
export const PROPERTY_TYPE_CATEGORY: Record<PropertyType, keyof typeof OPERATORS_BY_CATEGORY> = {
  text:             'text',
  number:           'number',
  select:           'select',
  multi_select:     'select',
  status:           'select',
  date:             'date',
  person:           'text',
  files_media:      'text',
  checkbox:         'bool',
  url:              'text',
  email:            'text',
  phone:            'text',
  formula:          'text',
  relation:         'text',
  rollup:           'number',
  created_time:     'date',
  last_edited_time: 'date',
  last_edited_by:   'text',
  button:           'text',
  place:            'text',
  description:      'text',
  priority:         'select',
  assigned_to:      'text',
  attachments:      'text',
  number_id:        'number',
};

/** Human-readable labels for property types. */
export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  text:             'Text',
  number:           'Number',
  select:           'Select',
  multi_select:     'Multi-select',
  status:           'Status',
  date:             'Date',
  person:           'Person',
  files_media:      'Files & Media',
  checkbox:         'Checkbox',
  url:              'URL',
  email:            'Email',
  phone:            'Phone',
  formula:          'Formula',
  relation:         'Relation',
  rollup:           'Rollup',
  created_time:     'Created time',
  last_edited_time: 'Last edited time',
  last_edited_by:   'Last edited by',
  button:           'Button',
  place:            'Place',
  description:      'Description',
  priority:         'Priority',
  assigned_to:      'Assigned to',
  attachments:      'Attachments',
  number_id:        'ID',
};

/** Operator human-readable labels. */
export const OPERATOR_LABELS: Record<FilterOperator, string> = {
  eq:            'is',
  neq:           'is not',
  contains:      'contains',
  not_contains:  'does not contain',
  starts_with:   'starts with',
  ends_with:     'ends with',
  is_empty:      'is empty',
  is_not_empty:  'is not empty',
  gt:            '>',
  gte:           '≥',
  lt:            '<',
  lte:           '≤',
  in:            'is any of',
  not_in:        'is none of',
};
