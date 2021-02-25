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

export interface Typo3File {
  name: string;
  id: number;
  uid: number;
  icon: string;
  extension: string;
  permissions: { read: boolean; write: boolean };
  size: number;
  date: string;

  mtime: Date;
  thumbUrl: string;
  type: string;
}

export interface ConflictFileDto {
  original: Typo3File;
  data: {
    name: string;
    lastModified: number;
    size: number;
  };
  file?: File;
}
