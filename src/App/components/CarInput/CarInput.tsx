import React from 'react';
import styles from './CarInput.module.scss';

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
    <form className={styles.car_form} onSubmit={onAction}>
      <input
        className={styles.car_text_field}
        disabled={disabledInput || isRace}
        placeholder={placeholder}
        value={name}
        name="name"
        onChange={handleChange}
      />
      <input
        className={styles.car_color_field}
        disabled={disabledInput || isRace}
        type="color"
        value={color}
        name="color"
        onChange={handleChange}
      />
      <button className={styles.car_submit_btn} disabled={disabledInput || isRace} type="submit">
        {description}
      </button>
    </form>
  );
}

export default CarForm;
