import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');//上手くいかないポイント
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchCustomers = async () => {
      const response = await fetch('http://localhost:3000/customers', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // 追加
        },
      });

      if (response.ok) {
        const data = await response.json();
        //alert(data);
        setCustomers(data);
      } else {
        alert('Failed to fetch customers');
      }
    };

    fetchCustomers();
  }, [router]);

  return (
    <div>
      <h1>Customers</h1>
      <ul>
        {customers.map((customer: any) => (
          <li key={customer.id}>{customer.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
