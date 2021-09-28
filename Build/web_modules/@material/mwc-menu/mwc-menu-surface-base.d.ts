/**
Copyright 2020 Google Inc. All Rights Reserved.
*/
import { MDCMenuSurfaceAdapter } from '@material/menu-surface/adapter';
import { Corner as CornerEnum } from '@material/menu-surface/constants';
import MDCMenuSurfaceFoundation from '@material/menu-surface/foundation.js';
import { BaseElement } from '@material/mwc-base/base-element.js';
export declare type Corner = keyof typeof CornerEnum;
export declare type AnchorableElement = HTMLElement & {
  anchor: Element | null;
};
export declare type MenuCorner = 'START' | 'END';
/**
 * @fires opened
 * @fires closed
 */
export declare abstract class MenuSurfaceBase extends BaseElement {
  protected mdcFoundation: MDCMenuSurfaceFoundation;
  protected readonly mdcFoundationClass: typeof MDCMenuSurfaceFoundation;
  mdcRoot: HTMLDivElement;
  slotElement: HTMLSlotElement | null;
  absolute: boolean;
  fullwidth: boolean;
  fixed: boolean;
  x: number | null;
  y: number | null;
  quick: boolean;
  open: boolean;
  protected bitwiseCorner: CornerEnum;
  protected previousMenuCorner: MenuCorner | null;
  menuCorner: MenuCorner;
  corner: Corner;
  anchor: HTMLElement | null;
  protected previouslyFocused: HTMLElement | Element | null;
  protected previousAnchor: HTMLElement | null;
  protected onBodyClickBound: (evt: MouseEvent) => void;
  render(): import('lit-element').TemplateResult;
  createAdapter(): MDCMenuSurfaceAdapter;
  protected onKeydown(evt: KeyboardEvent): void;
  protected onBodyClick(evt: MouseEvent): void;
  protected registerBodyClick(): void;
  protected deregisterBodyClick(): void;
  close(): void;
  show(): void;
}
