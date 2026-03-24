import type { PropControl, PropControlType } from '../../core/types';
import { SelectControl } from './SelectControl';
import { TextControl } from './TextControl';
import { BooleanControl } from './BooleanControl';
import { NumberControl } from './NumberControl';
import { ColorControl } from './ColorControl';
import { RangeControl } from './RangeControl';

interface ControlFactoryProps {
  control: PropControl;
  value: unknown;
  onChange: (key: string, value: unknown) => void;
}

type ControlComponent = React.FC<{ control: PropControl; value: unknown; onChange: (key: string, value: unknown) => void }>;

const CONTROL_MAP: Record<PropControlType, ControlComponent> = {
  select: SelectControl,
  text: TextControl,
  boolean: BooleanControl,
  number: NumberControl,
  color: ColorControl,
  range: RangeControl,
};

export function ControlFactory({ control, value, onChange }: ControlFactoryProps) {
  const Comp = CONTROL_MAP[control.type];
  if (!Comp) return null;
  return <Comp control={control} value={value} onChange={onChange} />;
}
