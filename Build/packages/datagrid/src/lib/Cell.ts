export interface Cell {
  formattedValue: string;
  type: string;
  rowIndex: number;
  value: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isGrid: boolean;
  isHeader: boolean;
  header: {
    name: string;
  };
  data: {};
}
