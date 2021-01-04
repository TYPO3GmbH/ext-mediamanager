import { Color } from '../../../../packages/button/src/typo3-base-button';
import { SnackbarVariants } from '../../../../packages/snackbar/src/lib/snackbar-variants';

export interface SnackbarButton {
  label: string;
  color: Color;
  action: string;
  data?: Record<string, unknown>;
}

export interface SnackbarData {
  message?: string;
  title?: string;
  variant: SnackbarVariants;
  buttons?: SnackbarButton[];
  duration: number;
}
