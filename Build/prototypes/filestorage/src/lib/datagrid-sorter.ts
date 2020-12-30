import { Schema } from '../types/schema';
import { find, has } from 'lodash-es';

export class DatagridSorter {
  static getDatagridSorters(schema: Schema): { [key: string]: Function } {
    const stringSorter = (columnName: string, direction: string) => {
      const asc = direction === 'asc';
      return (a: { [key: string]: string }, b: { [key: string]: string }) => {
        if (a[columnName] === undefined || a[columnName] === null) {
          return 1;
        }
        if (b[columnName] === undefined || b[columnName] === null) {
          return 0;
        }

        // sort by folder/file
        if (a.sysType != b.sysType) {
          if ('_FILE' === a.sysType) {
            return 0;
          } else {
            return 1;
          }
        }

        const columnDef = find(schema, ['name', columnName]);
        if (columnDef && has(columnDef, 'sortField')) {
          const sortField = columnDef.sortField as string;

          const valueA = parseInt(a[sortField], 10);
          const valueB = parseInt(b[sortField], 10);

          if (asc) {
            return valueA - valueB;
          }
          return valueB - valueA;
        }

        if (asc) {
          if (!a[columnName].localeCompare) {
            return 1;
          }
          return a[columnName].localeCompare(b[columnName]);
        }
        if (!b[columnName].localeCompare) {
          return 1;
        }
        return b[columnName].localeCompare(a[columnName]);
      };
    };

    return {
      string: stringSorter,
    };
  }
}
