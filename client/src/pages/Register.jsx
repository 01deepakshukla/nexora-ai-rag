import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { authApi } from '../services/api';

export default function Register({ onRegister, onLogin }) {
  const [name, setName] = useState('Maya Chen');
  const [email, setEmail] = useState('maya@nexora.ai');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function submit(event) {
    event.preventDefault();
    setError('');
    try { const { user } = await authApi.register({ name, email, password }); onRegister(user); } catch (requestError) { setError(requestError.message); }
  }

  return <div className="auth-page"><div className="auth-art"><div className="art-top"><div className="brand"><div className="brand-symbol">N</div><span>Nexora</span></div><span className="art-tag">A clearer way forward</span></div><div className="art-quote"><p>“Build a thinking space that meets you where you are.”</p><small>Nexora intelligence studio</small></div><div className="art-grid" /></div><div className="auth-panel"><div className="auth-content"><span className="eyebrow">Start your studio</span><h1>Create your account</h1><p className="auth-subtitle">A calm place for ambitious ideas.</p><form className="auth-form" onSubmit={submit}><label>Your name<input value={name} onChange={(event) => setName(event.target.value)} required /></label><label>Email address<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label><label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>{error && <p className="form-error">{error}</p>}<button className="primary-button" type="submit">Create workspace <ArrowRight size={17} /></button></form><p className="auth-footer">Already have an account? <button onClick={onLogin}>Sign in</button></p></div></div></div>;
}
