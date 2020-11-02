export function addSlotToRawHtml(html: string, slotName: string): string {
  return html.replace(/(<\w*)(.*)/, '$1 slot="' + slotName + '"$2');
}
