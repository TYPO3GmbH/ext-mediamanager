var Typo3FileStorageAdapter = {
    fileActionUrl: '',
    fileStorageElement: null
};

Typo3FileStorageAdapter.init = function(fileActionUrl) {
    this.fileActionUrl = fileActionUrl;
    const self = this;
    window.addEventListener('typo3-context-menu-item-click', function(e) {
        const contextItem = e.detail.contextItem;
        const type = contextItem.hasOwnProperty('type') && contextItem.type !== 'Folder' ? '_FILE' : '_FOLDER';
        const uid = contextItem.hasOwnProperty('identifier') ? contextItem.identifier : contextItem.uid;

        const option = e.detail.option;

        if (option.callbackAction === 'openInfoPopUp') {
            top.TYPO3.InfoWindow.showItem(type, uid);
        }
    });

    this.fileStorageElement = document.querySelector('typo3-filestorage');

    this.fileStorageElement.addEventListener('typo3-action-button-click', function(e) {

        if (e.detail.action === 'delete') {
            self.onDelete(e);

        }
    });
};

Typo3FileStorageAdapter.onDelete = function(event) {
    const self = this;
    const deleteData =event.detail.items.map(item => {
        return {data: item.uid};
    });

    const data = {'data': {'delete': deleteData}};

    const formData = new FormData();
    buildFormData(formData, data);

    // Typo3-ServerRequestFactory cant handle json data :-(
    fetch(this.fileActionUrl, {
        method: 'POST',
        body: formData
    }).then(res => {
        console.log("Request complete! Trigger refresh.. response:", res);
        self.fileStorageElement.refresh();
    });
}

function buildFormData(formData, data, parentKey) {
    if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
        Object.keys(data).forEach(key => {
            buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
        });
    } else {
        const value = data == null ? '' : data;
        formData.append(parentKey, value);
    }
}

