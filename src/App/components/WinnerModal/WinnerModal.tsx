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
        <h3>
          THE WINNER IS {data.name} {data.time}s
        </h3>
      </div>
    );
  }
  return null;
}

export default WinnerModal;
