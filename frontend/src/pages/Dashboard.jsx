import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Access Denied</h2>
        <p>Please <a href="/login">login</a> to view your dashboard.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '30px auto', padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee' }}>
        <h2>User Dashboard</h2>
        <button onClick={logout} style={{ padding: '8px 15px', cursor: 'pointer' }}>Logout</button>
      </header>

      <main style={{ marginTop: '20px' }}>
        <h3>Welcome back, {user.name}!</h3>
        
        <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '5px', marginTop: '15px' }}>
          <h4>Account Details</h4>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Account Type:</strong> {user.role || 'Customer'}</p>
          <p><strong>Member Since:</strong>{" "}{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;