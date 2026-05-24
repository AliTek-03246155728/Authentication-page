import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import FormInput from '../components/FormInput';

const Login = () => {
  const { login, register } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    let result;
    if (isSignUp) {
      result = await register(name, email, password);
    } else {
      result = await login(email, password); }
    if (result.success) {
      window.location.href = '/dashboard';
    } else {
      setError(result.error);
      setLoading(false);  } };
  return (
    <div style={{ maxWidth: '400px', margin: '60px auto', padding: '30px', boxShadow: '0 0 15px rgba(0,0,0,0.1)', borderRadius: '8px', fontFamily: 'sans-serif' }}>
      <h2>{isSignUp ? 'Create an Account' : 'Sign In'}</h2>
      {error && (
        <div style={{ color: '#721c24', background: '#f8d7da', padding: '10px', borderRadius: '4px', marginBottom: '15px', fontSize: '14px', border: '1px solid #f5c6cb' }}>
          {error}
        </div> )}
      <form onSubmit={handleSubmit}>
        {isSignUp && (
          <FormInput label="Full Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />)}
        <FormInput label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <FormInput label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
          {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Login'}
        </button>
      </form>
      <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px' }}>
        <span style={{ color: '#666' }}>
          {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
        </span>
        <button type="button"  onClick={() => { setIsSignUp(!isSignUp); setError(''); }}  style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', fontWeight: 'bold', padding: 0, fontSize: '14px' }} >
          {isSignUp ? 'Sign In here' : 'Sign Up here'}  </button>
      </div>
    </div>
  );
};

export default Login;