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

export class FileSizeHelper {
  static formatFileSize(size: number): string {
    const sizeKB: number = size / 1024;
    let str = '';

    if (sizeKB > 1024) {
      str = (sizeKB / 1024).toFixed(1) + ' MB';
    } else {
      str = sizeKB.toFixed(1) + ' KB';
    }
    return str;
  }
}
