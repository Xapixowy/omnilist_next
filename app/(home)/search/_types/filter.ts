import { FilterType } from './filter-type';

type FilterToggle = {
  type: 'toggle';
  options?: {
    true: string;
    false: string;
  };
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
  value?: string;
} & (FilterToggle | FilterSelect | FilterMultiSelect | FilterRange | FilterSlider);
