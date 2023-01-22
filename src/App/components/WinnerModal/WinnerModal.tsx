import styles from './WinnerModal.module.scss';

type TPorps = {
  data: {
    name: string;
    time: number;
  } | null;
};

function WinnerModal({ data }: TPorps) {
  console.log(data);
  if (data?.name) {
    return (
      <div className={styles.winner}>
        <div>
          <h3>THE WINNER IS</h3>
          <p>
            {data.name} with time {data.time}s
          </p>
        </div>
        <p className={styles.descr}>*please press the &apos;reset&apos; button after the race is over</p>
      </div>
    );
  }
  return null;
}

export default WinnerModal;
