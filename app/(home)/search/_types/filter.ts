import { FilterType } from './filter-type';

type FilterCheckbox = {
  type: 'checkbox';
  options?: {
    true: string;
    false: string;
  };
};

type FilterInputNumber = {
  type: 'input-number';
  min: number;
  max: number;
};

type FilterSelect = {
  type: 'select';
  options: string[];
};

type FilterMultiSelect = {
  type: 'multi-select';
  options: string[];
};

type FilterRange = {
  type: 'range';
  min: number;
  max: number;
  step: number;
};

type FilterSlider = {
  type: 'slider';
  min: number;
  max: number;
  step: number;
};

export type Filter = {
  name: string;
  filter: string;
  type: FilterType;
  value: string | null;
} & (FilterCheckbox | FilterSelect | FilterInputNumber | FilterMultiSelect | FilterRange | FilterSlider);
