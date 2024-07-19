import { Unit } from 'effector';

export function identity<T>(value: T): T {
  return value;
}

export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}
export const unitOf = <Unit>(unit: Unit, item: UnitOf<typeof unit>) =>
  identity<UnitOf<typeof unit>>(item);

export type UnitOf<EffectorArgs> = EffectorArgs extends Unit<infer Args>
  ? Args
  : never;

export function isNonEmptyString(value: unknown) {
  return isDefined(value) && typeof value === 'string' && value.trim() !== '';
}
