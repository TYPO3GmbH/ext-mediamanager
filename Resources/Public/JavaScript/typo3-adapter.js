window.addEventListener('typo3-context-menu-item-click', function(e) {
    const contextItem = e.detail.contextItem;
    const type = contextItem.hasOwnProperty('type') && contextItem.type !== 'Folder' ? '_FILE' : '_FOLDER';
    const uid = contextItem.hasOwnProperty('identifier') ? contextItem.identifier : contextItem.uid;

    const option = e.detail.option;

    if (option.callbackAction === 'openInfoPopUp') {
        top.TYPO3.InfoWindow.showItem(type, uid);
    }
});
