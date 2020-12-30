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
  thumbnailWidth?: string;
  contextMenuUrl: string;
  clipboardIdentifier: string;
  metaDataUrl?: string;
  parentIdentifier: string;
  notSelectable?: boolean;
  disabled?: boolean;
}
