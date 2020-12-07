import { SnackbarVariants } from './snackbar-variants';

export class SnackbarValues {
  message: string | null = null;
  title: string | null = null;
  variant: SnackbarVariants = SnackbarVariants.default;
  buttonText = 'OK';
  duration = 2500; // if null snackbar will no fade out
  dismissible = false;
}
