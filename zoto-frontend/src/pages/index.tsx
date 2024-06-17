import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

const Home = () => {
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className={styles.container}>
      <h1>メニュー</h1>
      <ul className={styles.menu}>
        <li>
          <Link href="/registerCustomer">
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
      <button onClick={handleSignOut} className={styles.signOutButton}>サインアウト</button>
    </div>
  );
};

export default Home;
