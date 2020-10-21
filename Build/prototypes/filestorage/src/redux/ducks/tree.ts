export type TreeState = Readonly<{
  nodes: object[];
}>;

const initialState: TreeState = {
  nodes: [
    {
      stateIdentifier: '0_0',
      identifier: 0,
      depth: 0,
      tip: 'id=0',
      icon: 'apps-pagetree-page-shortcut-root',
      name: 'New TYPO3 site',
      nameSourceField: 'title',
      mountPoint: 0,
      workspaceId: 0,
      siblingsCount: 1,
      siblingsPosition: 1,
      allowDelete: true,
      allowEdit: true,
      hasChildren: true,
      isMountPoint: true,
      loaded: true,
    },
    {
      stateIdentifier: '0_1',
      identifier: 1,
      depth: 1,
      tip: 'id=1 - Hidden',
      icon: 'apps-pagetree-folder-default',
      name: 'Dummy Page',
      nameSourceField: 'title',
      mountPoint: 0,
      workspaceId: 1,
      siblingsCount: 1,
      siblingsPosition: 1,
      allowDelete: true,
      allowEdit: true,
      overlayIcon: 'overlay-hidden',
    },
  ],
};

export const treeReducer = (
  state = initialState,
  action: { type: string }
): TreeState => {
  switch (action.type) {
    default:
      return state;
  }
};
