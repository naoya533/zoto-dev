import Link from 'next/link';
import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <h1>トップページ</h1>
      <ul className={styles.menu}>
        <li>
          <Link href="/register">
            顧客情報登録
          </Link>
        </li>
        <li>
          <Link href="/customers">
            顧客情報一覧
          </Link>
        </li>
        <li>
          <Link href="/edit">
            顧客情報編集
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
