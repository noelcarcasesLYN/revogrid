// filter.indexed.ts

import eq, { notEq } from './conditions/equal';
import gtThan from './conditions/number/greaterThan';
import gtThanEq from './conditions/number/greaterThanOrEqual';
import lt from './conditions/number/lessThan';
import lsEq from './conditions/number/lessThanOrEqual';
import set, { notSet } from './conditions/set';
import beginsWith from './conditions/string/beginswith';
import contains, { notContains } from './conditions/string/contains';
import { LogicFunction } from './filter.types';


export const filterCoreFunctionsIndexedByType: Record<FilterType, LogicFunction> = {
  none: () => true,
  empty: notSet,
  notEmpty: set,
  eq: eq,
  notEq: notEq,
  begins: beginsWith,
  contains: contains,
  notContains: notContains,

  eqN: eq,
  neqN: notEq,
  gt: gtThan,
  gte: gtThanEq,
  lt: lt,
  lte: lsEq,
};

export const filterTypes: Record<string, FilterType[]> = {
  string: ['notEmpty', 'empty', 'eq', 'notEq', 'begins', 'contains', 'notContains'],
  number: ['notEmpty', 'empty', 'eqN', 'neqN', 'gt', 'gte', 'lt', 'lte'],
};

export const filterNames = {
  none: 'Vacío',
  empty: 'Sin valor',
  notEmpty: 'Con valor',

  eq: 'Igual',
  notEq: 'No es igual',
  begins: 'Comienza por',
  contains: 'Contiene',
  notContains: 'No contiene',

  eqN: '=',
  neqN: '!=',
  gt: '>',
  gte: '>=',
  lt: '<',
  lte: '<=',
};

export type FilterType = keyof typeof filterNames;
