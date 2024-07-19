import { combine, createEvent, createStore, sample } from 'effector';
import { TemplateData } from '../generator';

// events
export const showPreviewClicked = createEvent();
export const closePreviewClicked = createEvent();

// stores
const $isOpen = createStore(false);
const $inputs = createStore<Array<TemplateData>>([
  {
    Address: '',
    ConsulateAddress: '',
    Date: '',
    Email: '',
    FullName: '',
    Phone: '',
    Signature: '',
    Text: '',
  },
]);

export const $viewModel = combine({ isOpen: $isOpen, inputs: $inputs });

// logic
sample({
  clock: showPreviewClicked,
  fn: () => true,
  target: $isOpen,
});

sample({
  clock: closePreviewClicked,
  fn: () => false,
  target: $isOpen,
});
