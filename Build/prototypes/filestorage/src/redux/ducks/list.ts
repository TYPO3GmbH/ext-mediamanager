export type ListState = Readonly<{
  data: object[];
}>;

const initialState: ListState = {
  data: [
    {
      id: 'folder-ck',
      icon:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" style="padding:4px;"><g><path fill="#FFC857" d="M16 4v10H0V2h7l1.33 2H16z"/><path fill="#E8A33D" d="M16 5H8.33L7 7H0V4h16v1z"/></g></svg>',
      name: 'CK-Editor',
      modified: '24 Feb 2015',
      size: '5 MB',
      type: 'Folder',
      variants: '-',
      references: '0',
      rw: 'R',
    },
    {
      id: 'folder-contrib',
      icon:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" style="padding:4px;"><g><path fill="#FFC857" d="M16 4v10H0V2h7l1.33 2H16z"/><path fill="#E8A33D" d="M16 5H8.33L7 7H0V4h16v1z"/></g></svg>',
      name: 'Contrib',
      modified: '24 Feb 2015',
      size: '118 KB',
      type: 'Folder',
      variants: '-',
      references: '0',
      rw: 'R',
    },
    {
      id: 'folder-css',
      icon:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" style="padding:4px;"><g><path fill="#FFC857" d="M16 4v10H0V2h7l1.33 2H16z"/><path fill="#E8A33D" d="M16 5H8.33L7 7H0V4h16v1z"/></g></svg>',
      name: 'Css',
      modified: '24 Feb 2015',
      size: '118 KB',
      type: 'Folder',
      variants: '-',
      references: '0',
      rw: 'R',
    },
    {
      id: 'file-xls',
      icon:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#1E7145" fill-opacity=".941" d="M2 0v16h12V4l-4-4H2z"/><path fill="#FFF" d="M4 6h2v1H4zM7 6h2v1H7zM10 6h2v1h-2zM4 8h2v1H4zM4 10h2v1H4zM4 12h2v1H4zM12.6 13.2h-1.9l-1.1-1.5-1.1 1.5H6.6l2-2.6-2-2.6h1.9l1.1 1.5L10.7 8h1.9l-2 2.5 2 2.7z"/><path opacity=".65" fill="#FFF" d="M10 4V0l4 4h-4z"/><path opacity=".15" d="M14 4v5l-4-5h4z"/></svg>',
      name: 'Microsoft Excel.xls',
      modified: '24 Feb 2015',
      size: '118 KB',
      type: 'xls',
      variants: '1',
      references: '0',
      rw: 'RW',
    },
    {
      id: 'file-docx',
      icon:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g><g><path d="M2 0v16h12V4l-4-4zm8 0z" fill="#2a569f" fill-opacity=".941" stroke="#b9b9b9" stroke-width="0" stroke-linejoin="round"/><path d="M10 3.98V0l4 4z" fill="#fff" stroke-width="0" stroke-linejoin="round" opacity=".65"/><path d="M14 4.024V9l-4-5z" opacity=".15" stroke-width="0" stroke-linejoin="round"/><g transform="translate(0 1)" fill="#fff"><rect ry="0" rx="0" y="5" x="4" height="1" width="8" stroke-linecap="square" stroke-miterlimit="0"/><rect width="8" height="1" x="4" y="7" rx="0" ry="0" stroke-linecap="square" stroke-miterlimit="0"/><rect ry="0" rx="0" y="9" x="4" height="1" width="2" stroke-linecap="square" stroke-miterlimit="0"/><rect width="2" height="1" x="4" y="11" rx="0" ry="0" stroke-linecap="square" stroke-miterlimit="0"/><text style="line-height:125%" x="7.539" y="11.382" transform="scale(.91287 1.09545)" font-weight="400" font-size="5.855" font-family="sans-serif" letter-spacing="0" word-spacing="0"><tspan x="7.539" y="11.382" style="-inkscape-font-specification:\'Verdana Bold\'" font-weight="700" font-family="Verdana">w</tspan></text></g></g></g></svg>',
      name: 'Microsoft Word.docx',
      modified: '24 Feb 2015',
      size: '118 KB',
      type: 'docx',
      variants: '1',
      references: '0',
      rw: 'RW',
    },
  ],
};

export const listReducer = (
  state = initialState,
  action: { type: string }
): ListState => {
  switch (action.type) {
    default:
      return state;
  }
};
