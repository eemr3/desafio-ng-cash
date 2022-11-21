import React, { FC, InputHTMLAttributes } from 'react';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

export const CustomInput: FC<IInputProps> = ({ id, label, ...rest }) => {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input id={id} {...rest} />
    </div>
  );
};
