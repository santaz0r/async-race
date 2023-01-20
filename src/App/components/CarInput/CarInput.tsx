import React from 'react';

type TProps = {
  placeholder: string;
  description: string;
  name: string;
  color: string;
  onAction: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (target: { name: string; value: string }) => void;
  disabledInput: boolean;
  isRace: boolean;
};

function CarForm({ placeholder, description, name, color, onAction, onChange, disabledInput, isRace }: TProps) {
  const handleChange = ({ currentTarget }: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ name: currentTarget.name, value: currentTarget.value });
  };
  return (
    <form onSubmit={onAction}>
      <input
        disabled={disabledInput || isRace}
        placeholder={placeholder}
        value={name}
        name="name"
        onChange={handleChange}
      />
      <input disabled={disabledInput || isRace} type="color" value={color} name="color" onChange={handleChange} />
      <button disabled={disabledInput || isRace} type="submit">
        {description}
      </button>
    </form>
  );
}

export default CarForm;
