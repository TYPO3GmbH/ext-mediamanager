/**
 * TODO: Move logic into typo3-filestorage element
 */
var Typo3FileStorageAdapter = {
    fileActionUrl: '',
    flashMessagesUrl: '',
    fileStorageElement: null
};

Typo3FileStorageAdapter.init = function(fileActionUrl, flashMessagesUrl) {
    this.fileActionUrl = fileActionUrl;
    this.flashMessagesUrl = flashMessagesUrl;

    const self = this;
    window.addEventListener('typo3-context-menu-item-click', function(e) {
        const contextItem = e.detail.contextItem;
        const type = contextItem.hasOwnProperty('type') && contextItem.type !== 'Folder' ? '_FILE' : '_FOLDER';
        const uid = contextItem.hasOwnProperty('identifier') ? contextItem.identifier : contextItem.uid;

        const option = e.detail.option;

        if (option.callbackAction === 'openInfoPopUp') {
            top.TYPO3.InfoWindow.showItem(type, uid);
        }

        if (option.callbackAction === 'deleteFile') {
            self.onDelete([uid]);
        }
    });

    this.fileStorageElement = document.querySelector('typo3-filestorage');

    this.fileStorageElement.addEventListener('typo3-action-button-click', function(event) {
        const uids = event.detail.items.map(item => item.uid);
        if (event.detail.action === 'delete') {
            self.onDelete(uids);
        }
    });
};

Typo3FileStorageAdapter.loadFlashMessages = function() {
    fetch(this.flashMessagesUrl).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    }).then(messages => {

        messages.forEach(messageData => {
            window.dispatchEvent(new CustomEvent('typo3-add-snackbar', {
                detail: {
                    message: messageData.message,
                    title: messageData.title,
                    variant: messageData.severity === 0 ? 'success' : 'danger'
                }
            }));
        });
    });
}

Typo3FileStorageAdapter.onDelete = function(uids) {
    const self = this;
    const deleteData = uids.map(uid => {
        return {data: uid};
    });

    const data = {'data': {'delete': deleteData}};

    const formData = new FormData();
    buildFormData(formData, data);

    // Typo3-ServerRequestFactory cant handle json data :-(
    fetch(this.fileActionUrl, {
        method: 'POST',
        body: formData
    }).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    }).then(data => {
        const hasDeletedentries = data.delete.filter(value => value === true).length > 0;
        if (hasDeletedentries) {
            self.fileStorageElement.refresh();
        }
    }).catch((error) => {
        console.warn('todo: handle error. catched error');
    }).then(data => {
        self.loadFlashMessages();
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

