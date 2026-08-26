import { Field, Switch } from '@headlessui/react';

type SwitchButtonProps = {
  onChange: (val: boolean) => void;
  checked: boolean;

  variant?: keyof typeof styleBg;
};

const styleBg = {
  primary: `
    switch-active-background-color
    // bg-adaptive-button-background-color
    data-checked:!bg-[var(--primary-accent-color)]
  `,
  secondary: `
    bg-gray-200
    data-checked:!bg-blue-600
  `,
};

const styleBtn = {
  primary:
    'group-data-checked:!bg-[var(--switch-active-background-color)] bg-primary-accent-color',
  secondary:
    'group-data-checked:bg-red-600  bg-adaptive-button-background-color ',
};

export const SwitchButton = ({
  checked,
  onChange,
  variant = 'secondary',
}: SwitchButtonProps) => {
  return (
    <Field>
      <Switch
        checked={checked}
        onChange={onChange}
        className={`group inline-flex h-6 w-11 items-center rounded-full  transition   ${styleBg[variant]}`}
      >
        <span
          className={`size-4 translate-x-1 rounded-full  transition   group-data-checked:translate-x-6 ${styleBtn[variant]}`}
        />
      </Switch>
    </Field>
  );
};
