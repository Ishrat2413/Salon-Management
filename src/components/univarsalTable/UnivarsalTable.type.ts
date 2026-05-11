export type StatusConfig = {
  label?: string;
  className?: string;
  color?: string;
  bg?: string;
};

export type ColumnDef<T> = {
  key: keyof T | string;
  header: string;
  width?: string;
  align?: "left" | "center" | "right";
  className?: string;
  sortable?: boolean;
  render?: (value: unknown, row: T, rowIndex: number) => React.ReactNode;
  statusMap?: Record<string, StatusConfig>;
};
export type SortDirection = "asc" | "desc" | null;
export type ActionDef<T> = {
  label: string;
  icon?: React.ReactNode;
  className?: string;
  onClick: (row: T, rowIndex: number) => void;
  show?: (row: T) => boolean;
};
export type UniversalTableProps<T extends Record<string, unknown>> = {
  data: T[];
  columns: ColumnDef<T>[];
  actions?: ActionDef<T>[];
  title?: string;
  loading?: boolean;
  pageSize?: number;
  className?: string;
  tableClassName?: string;
  rowClassName?: (row: T, index: number) => string;
  onRowClick?: (row: T, index: number) => void;
  emptyMessage?: string;
  showPagination?: boolean;
};
