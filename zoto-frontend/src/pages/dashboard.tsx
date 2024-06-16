import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchCustomers = async () => {
      const response = await fetch('http://localhost:3000/customers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
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
