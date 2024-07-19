import * as template from './template.json';
import font from './Baskervville-Regular.ttf?arraybuffer';

export const FONT_DATA = {
  baskervville: {
    data: font,
    fallback: true,
  },
};

export const TEMPLATE_DATA = template;

export type TemplateData = {
  [K in keyof (typeof TEMPLATE_DATA)['schemas'][number]]: string;
};
