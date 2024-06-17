import { useEffect, useState } from 'react';
import styles from '../styles/Customers.module.css';

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('トークンがありません');
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/customers', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('ネットワーク応答が正常ではありません');
        }

        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className={styles.container}>
    <h1 className={styles.title}>顧客情報一覧</h1>
    <table className={styles.table}>
      <thead>
        <tr>
          <th>名前</th>
          <th>名前（カナ）</th>
          <th>住所</th>
          <th>郵便番号</th>
          <th>メールアドレス</th>
          <th>電話番号</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <tr key={customer.id}>
            <td>{customer.name}</td>
            <td>{customer.nameKana}</td>
            <td>{customer.address}</td>
            <td>{customer.postalCode}</td>
            <td>{customer.email}</td>
            <td>{customer.phoneNumber}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default Customers;
