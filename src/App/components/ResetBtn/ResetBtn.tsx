import styles from './ResetBtn.module.scss';

type TProps = {
  isResetActive: boolean;
  onReset: () => Promise<void>;
};

function ResetBtn({ isResetActive, onReset }: TProps) {
  return (
    <button className={styles.control_btns} disabled={isResetActive} type="button" onClick={onReset}>
      reset
    </button>
  );
}

export default ResetBtn;
