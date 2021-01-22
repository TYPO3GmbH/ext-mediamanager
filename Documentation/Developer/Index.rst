.. include:: ../Includes.txt

.. _developer:

================
Developer Corner
================

With the filelist module there is also an alternative for displaying modal windows and snack bar notifications in the
topframe.

The postmessage api(https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) is used for the communication
between frames

.. _developer-api:

API
===

Open Simple Confirm Modal in top frame

.. code-block:: javascript

   top.postMessage({
      type: 'typo3-show-modal',
      data: {
         headline: 'Confirm delete',
         content: 'Do you really want to delete this file',
         modalButtons: [
             {
               label: 'Cancel',
               color: 'default',
               action: 'typo3-delete-cancel',
             },
             {
               label: 'Delete',
               color: 'danger',
               action: 'typo3-confirm-delete',
             },
           ],
      }
   }, window.origin);


In case you defined an action button you need to add a listener for the event (and remove if afterwards)

.. code-block:: javascript

   window.addEventListener('message', (event) => {
      if (event.data.type === 'typo3-modal-closed') {
         alert('Action ' + event.data.actionName + 'clicked');
      }
   });


Open Snackbar in top frame

.. code-block:: javascript

   top.postMessage({
      type: 'typo3-show-snackbar',
      data: {
         message: 'File deleted',
         title: 'Title',
         variant: 'success',
         duration: 2500,
         dismissible: true
      }
   }, window.origin);


Web components
==============

All html elements used for the file storage extension are built on top of Lit-Elements (https://lit-element.polymer-project.org/)
and are written in TypeScript.

We use Redux as our state container. Components are connected to the redux store using react-redux and connect calls.
Connect calls are curried and can be partially applied: we found this useful for sharing selector and bound action
creators between screens that had a different layout but the same or very similar functionality.

For all full overview of the web components you can generate the storybook

.. code-block:: bash

    (cd Build; npm run storybook)
