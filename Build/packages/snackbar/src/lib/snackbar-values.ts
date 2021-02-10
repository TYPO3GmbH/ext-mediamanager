/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

import { SnackbarVariants } from './snackbar-variants';

export class SnackbarValues {
  message: string | null = null;
  title: string | null = null;
  variant: SnackbarVariants = SnackbarVariants.default;
  buttonText = 'OK';
  duration = 2500; // if null snackbar will no fade out
  dismissible = false;
}
