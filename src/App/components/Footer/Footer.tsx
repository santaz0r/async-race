import styles from './Footer.module.scss';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_content}>
        <a className={styles.footer_link} href="https://github.com/santaz0r" target="_blank" rel="noopener noreferrer">
          <span className={styles.footer_logo} />
        </a>
        <p>© 2023</p>
        <a className={styles.footer_link} href="https://rs.school/js/" target="_blank" rel="noopener noreferrer">
          <span className={styles.footer_rss_logo} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
