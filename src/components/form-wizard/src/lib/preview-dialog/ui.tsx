import { FC, useCallback, useRef } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { useUnit } from 'effector-react';
import { Viewer } from '@pdfme/ui';

import { $viewModel, closePreviewClicked } from './model';
import { FONT_DATA, TEMPLATE_DATA } from '../generator';

const handleClose = () => {
  closePreviewClicked();
};

export const PreviewDialog: FC = () => {
  const { isOpen, inputs } = useUnit($viewModel);
  const containerRef = useCallback(
    (container: HTMLDivElement) => {
      if (!container) return;
      if (!viewerRef.current) {
        viewerRef.current = new Viewer({
          domContainer: container,
          inputs: inputs,
          template: TEMPLATE_DATA,
          options: {
            font: FONT_DATA,
          },
        });
      }

      viewerRef.current.setInputs(inputs);
    },
    [inputs]
  );
  const viewerRef = useRef<Viewer | null>(null);

  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <DialogTitle>PDF Preview</DialogTitle>
      <div ref={containerRef} id="pdfme-container"></div>
    </Dialog>
  );
};
