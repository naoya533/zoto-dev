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
      {customers.length === 0 ? (
        <p className={styles.emptyMessage}>顧客情報がありません</p>
      ) : (
        <div className={styles.customerList}>
          {customers.map((customer) => (
            <div key={customer.id} className={styles.customerItem}>
              <span className={styles.customerName}>{customer.name}</span>
              <span className={styles.customerEmail}>{customer.email}</span>
              <span className={styles.customerEmail}>{customer.postalCode}</span>
              <span className={styles.customerEmail}>{customer.address}</span>
              <span className={styles.customerEmail}>{customer.phoneNumber}</span>
              <span className={styles.customerEmail}>{customer.companyCode}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Customers;
