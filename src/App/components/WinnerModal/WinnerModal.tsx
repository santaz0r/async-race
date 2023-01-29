import ResetBtn from '../ResetBtn/ResetBtn';
import styles from './WinnerModal.module.scss';

type TPorps = {
  data: {
    name: string;
    time: number;
  } | null;
  isResetActive: boolean;
  onReset: () => Promise<void>;
};

function WinnerModal({ data, isResetActive, onReset }: TPorps) {
  if (data?.name) {
    return (
      <div className={styles.winner}>
        <div>
          <h3>THE WINNER IS</h3>
          <p>
            {data.name} with time {data.time}s
          </p>
        </div>
        <ResetBtn isResetActive={isResetActive} onReset={onReset} />
        <p className={styles.descr}>*please press the &apos;reset&apos; button after the race is over</p>
      </div>
    );
  }
  return null;
}

export default WinnerModal;
