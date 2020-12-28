import { Color } from '../../../../packages/button/src/typo3-base-button';
import { SnackbarVariants } from '../../../../packages/snackbar/src/lib/snackbar-variants';

export interface SnackbarButton {
  label: string;
  color: Color;
  action: string;
}

export interface SnackbarData {
  message: string | null;
  title: string | null;
  variant: SnackbarVariants;
  buttons?: SnackbarButton[];
}
