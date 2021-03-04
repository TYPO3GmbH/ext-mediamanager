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

interface ListItem {
  uid: string;
  extension: string;
  identifier: string;
  icon: string;
  name: string;
  modified: string;
  modifiedRaw: string;
  size: string;
  sizeRaw: string;
  type: string;
  sysType: '_FILE' | '_FOLDER';
  variants: string;
  references: string;
  rw: string;
  thumbnailUrl?: string;
  cardFolderIcon?: string;
  clipboardIdentifier: string;
  metaDataUrl?: string;
  parentIdentifier: string;
  notSelectable?: boolean;
  disabled?: boolean;
  contextMenuType: string;
}
