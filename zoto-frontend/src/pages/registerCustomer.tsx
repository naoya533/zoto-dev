import { useState } from 'react';
import styles from '../styles/RegisterCustomer.module.css';

const RegisterCustomer = () => {
  const [formData, setFormData] = useState({
    name: '',
    nameKana: '',
    address: '',
    postalCode: '',
    email: '',
    phoneNumber: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('トークンがありません');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/customers', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('ネットワーク応答が正常ではありません');
      }

      const data = await response.json();
      console.log('顧客情報が登録されました:', data);

      // フォームをリセット
      setFormData({
        name: '',
        nameKana: '',
        address: '',
        postalCode: '',
        email: '',
        phoneNumber: '',
      });

      // 成功メッセージを設定
      setSuccessMessage('顧客情報が登録されました');
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>顧客情報登録</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="name">名前</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="nameKana">名前（カナ）</label>
          <input
            type="text"
            id="nameKana"
            name="nameKana"
            value={formData.nameKana}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="address">住所</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="postalCode">郵便番号</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="email">メールアドレス</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="phoneNumber">電話番号</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className={styles.button}>登録</button>
      </form>
      {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
    </div>
  );
};

export default RegisterCustomer;
