import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';
import { dropDownItemStyles } from './typo3-dropdown-item-styles';

export class Typo3DropDownItem extends ListItemBase {
  static get styles() {
    return [dropDownItemStyles];
  }
}
