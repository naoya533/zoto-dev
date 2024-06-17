import Link from 'next/link';
import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <h1>トップページ</h1>
      <ul className={styles.menu}>
        <li>
          <Link href="/register">
            <a>顧客情報登録</a>
          </Link>
        </li>
        <li>
          <Link href="/customers">
            <a>顧客情報一覧</a>
          </Link>
        </li>
        <li>
          <Link href="/edit">
            <a>顧客情報編集</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
