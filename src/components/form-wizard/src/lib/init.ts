import * as previewDialog from './preview-dialog';
import * as form from './form';
import * as generator from './generator';
import { sample } from 'effector';

sample({
  clock: form.previewButtonClicked,
  target: previewDialog.showPreviewClicked,
});

sample({
  clock: form.formSubmitClicked,
  target: generator.pdfGenerateRequired,
});
