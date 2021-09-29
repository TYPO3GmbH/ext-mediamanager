/**
Copyright 2020 Google Inc. All Rights Reserved.
*/
import '@material/mwc-list';
import './mwc-menu-surface';
import { MDCMenuAdapter } from '@material/menu/adapter';
import { DefaultFocusState as DefaultFocusStateEnum } from '@material/menu/constants';
import MDCMenuFoundation from '@material/menu/foundation';
import { BaseElement } from '@material/mwc-base/base-element';
import { List, MWCListIndex } from '@material/mwc-list';
import { ActionDetail } from '@material/mwc-list/mwc-list-foundation';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';
import { MenuSurface } from './mwc-menu-surface';
import { Corner, MenuCorner } from './mwc-menu-surface-base';
export {
  createSetFromIndex,
  isEventMulti,
  isIndexSet,
  MWCListIndex,
} from '@material/mwc-list/mwc-list-foundation';
export { Corner, MenuCorner } from './mwc-menu-surface-base';
export declare type DefaultFocusState = keyof typeof DefaultFocusStateEnum;
/**
 * @fires selected {SelectedDetail}
 * @fires action {ActionDetail}
 * @fires items-updated
 * @fires opened
 * @fires closed
 */
export declare abstract class MenuBase extends BaseElement {
  protected mdcFoundation: MDCMenuFoundation;
  protected readonly mdcFoundationClass: typeof MDCMenuFoundation;
  protected listElement_: List | null;
  mdcRoot: MenuSurface;
  slotElement: HTMLSlotElement | null;
  anchor: HTMLElement | null;
  open: boolean;
  quick: boolean;
  wrapFocus: boolean;
  innerRole: 'menu' | 'listbox';
  corner: Corner;
  x: number | null;
  y: number | null;
  absolute: boolean;
  multi: boolean;
  activatable: boolean;
  fixed: boolean;
  forceGroupSelection: boolean;
  fullwidth: boolean;
  menuCorner: MenuCorner;
  defaultFocus: DefaultFocusState;
  protected _listUpdateComplete: null | Promise<unknown>;
  protected get listElement(): List | null;
  get items(): ListItemBase[];
  get index(): MWCListIndex;
  get selected(): ListItemBase | ListItemBase[] | null;
  render(): import('lit-element').TemplateResult;
  protected createAdapter(): MDCMenuAdapter;
  protected onKeydown(evt: KeyboardEvent): void;
  protected onAction(evt: CustomEvent<ActionDetail>): void;
  protected onOpened(): void;
  protected onClosed(): void;
  protected _getUpdateComplete(): Promise<void>;
  protected firstUpdated(): Promise<void>;
  select(index: MWCListIndex): void;
  close(): void;
  show(): void;
  getFocusedItemIndex(): number;
  focusItemAtIndex(index: number): void;
  layout(updateItems?: boolean): void;
}
