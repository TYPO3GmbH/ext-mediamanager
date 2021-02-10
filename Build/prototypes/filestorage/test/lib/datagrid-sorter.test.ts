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

import { expect } from '@open-wc/testing';
import { DatagridSorter } from '../../src/lib/datagrid-sorter';
import { Schema } from '../../src/types/schema';

describe('DatagridSorter', () => {
  let sortFunction: Function;
  const headlines = [
    {
      name: 'name',
      title: 'Name',
      sortable: true,
    },
    {
      name: 'modified',
      title: 'Modified',
      width: '150',
      sortable: true,
      sortField: 'modifiedRaw',
    },
  ] as Schema;

  const data = [
    {
      name: 'Folder2',
      sysType: '_FOLDER',
      modified: '2020-11-01',
      modifiedRaw: '4',
    },
    {
      name: 'Folder1',
      sysType: '_FOLDER',
      modified: '2020-11-01',
      modifiedRaw: '3',
    },
    {
      name: 'File2',
      sysType: '_FILE',
      modified: '2020-10-01',
      modifiedRaw: '2',
    },
    {
      name: 'File1',
      sysType: '_FILE',
      modified: '2020-11-01',
      modifiedRaw: '1',
    },
  ] as ListItem[];

  beforeEach(async () => {
    sortFunction = DatagridSorter.getDatagridSorters(headlines).string;
  });

  it('will sort items by sys typ with priority', () => {
    const sortedData = data.sort(sortFunction('name', 'asc'));
    expect(sortedData[0].sysType).to.be.eq('_FOLDER');
    expect(sortedData[1].sysType).to.be.eq('_FOLDER');
    expect(sortedData[2].sysType).to.be.eq('_FILE');
    expect(sortedData[3].sysType).to.be.eq('_FILE');
  });

  it('can sort items by column asc', () => {
    const sortedData = data.sort(sortFunction('name', 'asc'));
    expect(sortedData[0].name).to.be.eq('Folder1');
    expect(sortedData[1].name).to.be.eq('Folder2');
    expect(sortedData[2].name).to.be.eq('File1');
    expect(sortedData[3].name).to.be.eq('File2');
  });

  it('can sort items by column desc', () => {
    const sortedData = data.sort(sortFunction('name', 'desc'));
    expect(sortedData[0].name).to.be.eq('Folder2');
    expect(sortedData[1].name).to.be.eq('Folder1');
    expect(sortedData[2].name).to.be.eq('File2');
    expect(sortedData[3].name).to.be.eq('File1');
  });

  it('can sort items by defined sort field asc', () => {
    const sortedData = data.sort(sortFunction('modified', 'asc'));
    expect(sortedData[0].name).to.be.eq('Folder1');
    expect(sortedData[1].name).to.be.eq('Folder2');
    expect(sortedData[2].name).to.be.eq('File1');
    expect(sortedData[3].name).to.be.eq('File2');
  });

  it('can sort items by defined sort field desc', () => {
    const sortedData = data.sort(sortFunction('modified', 'desc'));
    expect(sortedData[0].name).to.be.eq('Folder2');
    expect(sortedData[1].name).to.be.eq('Folder1');
    expect(sortedData[2].name).to.be.eq('File2');
    expect(sortedData[3].name).to.be.eq('File1');
  });
});
