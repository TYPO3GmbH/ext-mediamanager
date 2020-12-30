export interface Column {
  name: string;
  type?: string;
  width?: string;
  title: string;
  hidden?: boolean;
  sortable?: boolean;
  sortField?: string;
}

export type Schema = Column[];
