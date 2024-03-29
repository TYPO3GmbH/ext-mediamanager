/**
 Copyright 2020 Google Inc. All Rights Reserved.
 */
import { MDCFoundation } from '@material/base/foundation';
import { MDCListAdapter } from './mwc-list-adapter.js';
export declare type MWCListIndex = number | Set<number>;
export interface IndexDiff {
  added: number[];
  removed: number[];
}
export interface SelectedDetail<T extends MWCListIndex = MWCListIndex> {
  index: T;
  diff: T extends Set<number> ? IndexDiff : undefined;
}
export interface ActionDetail {
  index: number;
}
export declare type SingleSelectedEvent = CustomEvent<SelectedDetail<number>>;
export declare type MultiSelectedEvent = CustomEvent<
  SelectedDetail<Set<number>>
>;
export declare type SelectedEvent = SingleSelectedEvent | MultiSelectedEvent;
export declare function isIndexSet(
  selectedIndex: MWCListIndex
): selectedIndex is Set<number>;
export declare function isEventMulti(
  evt: SelectedEvent
): evt is MultiSelectedEvent;
export declare const createSetFromIndex: (index: MWCListIndex) => Set<number>;
export declare class MDCListFoundation extends MDCFoundation<MDCListAdapter> {
  static get strings(): {
    ACTION_EVENT: string;
    ARIA_CHECKED: string;
    ARIA_CHECKED_CHECKBOX_SELECTOR: string;
    ARIA_CHECKED_RADIO_SELECTOR: string;
    ARIA_CURRENT: string;
    ARIA_DISABLED: string;
    ARIA_ORIENTATION: string;
    ARIA_ORIENTATION_HORIZONTAL: string;
    ARIA_ROLE_CHECKBOX_SELECTOR: string;
    ARIA_SELECTED: string;
    CHECKBOX_RADIO_SELECTOR: string;
    CHECKBOX_SELECTOR: string;
    CHILD_ELEMENTS_TO_TOGGLE_TABINDEX: string;
    FOCUSABLE_CHILD_ELEMENTS: string;
    RADIO_SELECTOR: string;
  };
  static get numbers(): {
    UNSET_INDEX: number;
    TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS: number;
  };
  static get defaultAdapter(): MDCListAdapter;
  private isMulti_;
  private wrapFocus_;
  private isVertical_;
  private selectedIndex_;
  private focusedItemIndex_;
  private useActivatedClass_;
  private ariaCurrentAttrValue_;
  constructor(adapter?: Partial<MDCListAdapter>);
  /**
   * Sets the private wrapFocus_ variable.
   */
  setWrapFocus(value: boolean): void;
  /**
   * Sets the private wrapFocus_ variable.
   */
  setMulti(value: boolean): void;
  /**
   * Sets the isVertical_ private variable.
   */
  setVerticalOrientation(value: boolean): void;
  /**
   * Sets the useActivatedClass_ private variable.
   */
  setUseActivatedClass(useActivated: boolean): void;
  getSelectedIndex(): MWCListIndex;
  setSelectedIndex(index: MWCListIndex): void;
  /**
   * Focus in handler for the list items.
   */
  handleFocusIn(_: FocusEvent, listItemIndex: number): void;
  /**
   * Focus out handler for the list items.
   */
  handleFocusOut(_: FocusEvent, listItemIndex: number): void;
  /**
   * Key handler for the list.
   */
  handleKeydown(
    event: KeyboardEvent,
    isRootListItem: boolean,
    listItemIndex: number
  ): void;
  /**
   * Click handler for the list.
   */
  handleSingleSelection(
    index: number,
    isInteraction: boolean,
    force?: boolean
  ): void;
  /**
   * Focuses the next element on the list.
   */
  focusNextElement(index: number): number;
  /**
   * Focuses the previous element on the list.
   */
  focusPrevElement(index: number): number;
  focusFirstElement(): number;
  focusLastElement(): number;
  /**
   * @param itemIndex Index of the list item
   * @param isEnabled Sets the list item to enabled or disabled.
   */
  setEnabled(itemIndex: number, isEnabled: boolean): void;
  /**
   * Ensures that preventDefault is only called if the containing element
   * doesn't consume the event, and it will cause an unintended scroll.
   */
  private preventDefaultEvent;
  private setSingleSelectionAtIndex_;
  private setMultiSelectionAtIndex_;
  /**
   * Sets aria attribute for single selection at given index.
   */
  private setAriaForSingleSelectionAtIndex_;
  private setTabindexAtIndex_;
  private setTabindexToFirstSelectedItem_;
  private isIndexValid_;
  private isIndexInRange_;
  /**
   * Sets selected index on user action, toggles checkbox / radio based on
   * toggleCheckbox value. User interaction should not toggle list item(s) when
   * disabled.
   */
  private setSelectedIndexOnAction_;
  toggleMultiAtIndex(
    index: number,
    force?: boolean,
    isInteraction?: boolean
  ): void;
}
export default MDCListFoundation;
