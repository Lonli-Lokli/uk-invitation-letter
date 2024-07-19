import { generate } from '@pdfme/generator';
import { createEffect, createEvent, sample, Unit } from 'effector';
import { FONT_DATA, TEMPLATE_DATA, TemplateData } from './shapes';
import FileSaver from 'file-saver';
import dayjs from 'dayjs';
import { isDefined, UnitOf } from '../utils';
import { Address, FormValues } from '../shapes';

// events

export const pdfGenerateRequired = createEvent<FormValues>();

// effects

const generatePdfFx = createEffect<Record<string, any>[], void>();

// logic
sample({
  clock: pdfGenerateRequired,
  fn: createLetter,
  target: generatePdfFx,
});

generatePdfFx.use(async (inputs) => {
  const pdf = await generate({
    template: TEMPLATE_DATA,
    inputs,
    options: { font: FONT_DATA },
  });
  const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
  FileSaver.saveAs(blob, 'UK-Invitation-Letter.pdf');
});
generatePdfFx.failData.watch(console.error);

const dateFormat = 'DD MMM YYYY';

function createLetter(
  args: UnitOf<typeof pdfGenerateRequired>
): Array<TemplateData> {
  return [
    {
      Address: buildFullAddress(args.personUK.address),
      ConsulateAddress: `${args.embassy.name}\n ${buildFullAddress(
        args.embassy.address
      )}`,
      Date: dayjs().format(dateFormat),
      Email: args.personUK.email,
      FullName: args.personUK.fullName,
      Phone: args.personUK.phone,
      Signature: args.personUK.fullName,
      Text: buildText(args),
    },
  ];
}

function buildFullAddress(address: Address): string {
  return `${address.flatNumber} ${address.street}\n${address.city}, ${address.postcode}, ${address.country}`;
}

function buildShortAddress(address: Address): string {
  return `${address.flatNumber} ${address.street}, ${address.city}`;
}

function addIfElse(condition: boolean, ifTrue: string, ifFalse: string) {
  return condition ? ifTrue : ifFalse;
}

const defaultValues = ['they', 'them', 'their'];
function parsePronoun(pronoun: string, part: 1 | 2 | 3) {
  return pronoun.split('/')[part - 1] ?? defaultValues[part - 1];
}

function capitalize(input: string) {
  return input.replace(/^\w/, (c) => c.toUpperCase());
}

function extractShortNames(fullName: string) {
  return fullName
    .split(',')
    .map((s) => s.trim().split(' ')[0] ?? s.trim())
    .join(' and ');
}
function buildText(args: UnitOf<typeof pdfGenerateRequired>): string {
  return `
    Dear Visa Officer,
I would like to confirm that my ${
    args.personOutsideUK.relationship
  }, ${args.personOutsideUK.fullName}, will apply for a UK Visitor visa. ${parsePronoun(
    args.personOutsideUK.pronoun,
    1
  )} will travel to the United Kingdom from ${args.trip.arrivalDate?.format(
    dateFormat
  )} until ${args.trip.departureDate?.format(dateFormat)} for ${
    args.trip.reason
  }.
${addIfElse(
  args.trip.accomodation,
  `I am able to accommodate ${
    extractShortNames(args.personOutsideUK.fullName)
  } at my place, ${buildShortAddress(args.personUK.address)}.`,
  ''
)}
${addIfElse(
  args.trip.financialSupport,
  `${capitalize(
    parsePronoun(args.personOutsideUK.pronoun, 1)
  )} will be in receipt of a return ticket and all of the expenses for ${parsePronoun(
    args.personOutsideUK.pronoun,
    2
  )} journey will be met by me.`,
  `${capitalize(
    parsePronoun(args.personOutsideUK.pronoun, 1)
  )} will use ${parsePronoun(
    args.personOutsideUK.pronoun,
    3
  )} savings for the trip, and I will assist ${parsePronoun(
    args.personOutsideUK.pronoun,
    2
  )} to cover any additional expenses.`
)}

While in the UK, ${parsePronoun(
    args.personOutsideUK.pronoun,
    1
  )} will not engage in gainful employment.

${addIfElse(
  isDefined(args.trip.returnCountry) || isDefined(args.trip.returnReason),
  `After ${parsePronoun(
    args.personOutsideUK.pronoun,
    3
  )} trip to the UK ${extractShortNames(args.personOutsideUK.fullName)} will ` +
    addIfElse(
      isDefined(args.trip.returnCountry),
      `return to ${args.trip.returnCountry}`,
      `leave the UK ${args.trip.returnReason}`
    ),
  ''
)}

I am currently employed at ${args.personUK.employer.name}, ${buildShortAddress(
    args.personUK.employer.address
  )}.

I have enclosed the following documents:
  * residence permit;
  * employment reference;
  ${addIfElse(args.trip.financialSupport, '* latest payslip', '')}
  * proof of address

Should you wish to discuss this application further, please do not hesitate to contact me.
`;
}
