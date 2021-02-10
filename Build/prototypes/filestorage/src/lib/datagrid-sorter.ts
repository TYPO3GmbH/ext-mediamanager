/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

import { Schema } from '../types/schema';
import { find, has } from 'lodash-es';

export class DatagridSorter {
  static getDatagridSorters(schema: Schema): { [key: string]: Function } {
    const stringSorter = (columnName: string, direction: string) => {
      const asc = direction === 'asc';
      return (a: { [key: string]: string }, b: { [key: string]: string }) => {
        // sort by folder/file
        if (a.sysType != b.sysType) {
          return '_FILE' === a.sysType ? 0 : 1;
        }

        const valueA = a[columnName];
        const valueB = b[columnName];

        if (valueA === undefined || valueA === null) {
          return 1;
        }
        if (valueB === undefined || valueB === null) {
          return 0;
        }

        const columnDef = find(schema, ['name', columnName]);
        if (columnDef && has(columnDef, 'sortField')) {
          const sortField = columnDef.sortField as string;

          const sortFieldValueA = parseInt(a[sortField], 10);
          const sortFieldValueB = parseInt(b[sortField], 10);

          return asc
            ? sortFieldValueA - sortFieldValueB
            : sortFieldValueB - sortFieldValueA;
        }

        if (asc) {
          if (!valueA.localeCompare) {
            return 1;
          }
          return valueA.localeCompare(valueB);
        }
        if (!valueB.localeCompare) {
          return 1;
        }
        return valueB.localeCompare(valueA);
      };
    };

    return {
      string: stringSorter,
    };
  }
}
