import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';

function Footer() {
  return (
        <footer className={styles.footer}>
            <Link className={styles.link} to={'https://github.com/Kavume'} target='_blank'>
                <p>my GitHub <span className={styles.name}>kavume</span>,</p>
            </Link>
          <p>2024</p>
        </footer>
  );
}

export default Footer;