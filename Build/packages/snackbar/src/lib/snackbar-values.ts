import { SnackbarVariants } from './snackbar-variants';

export class SnackbarValues {
  message = null;
  variant: SnackbarVariants = 'default';
  buttonText = 'OK';
  duration = null; // if null snackbar will no fade out
  dismissible = false;
}
