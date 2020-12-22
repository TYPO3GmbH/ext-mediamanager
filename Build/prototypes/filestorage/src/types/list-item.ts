interface ListItem {
  uid: string;
  identifier: string;
  icon: string;
  name: string;
  modified: string;
  size: string;
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
}
