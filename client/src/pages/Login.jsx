import { ArrowRight, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { authApi } from '../services/api';

export default function Login({ onLogin, onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function submit(event) {
    event.preventDefault();
    setError('');

    try {
      const { user } = await authApi.login({ email, password });
      onLogin(user);
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Your thinking space is ready."
      footer={
        <>
          New to Nexora? <button onClick={onRegister}>Create an account</button>
        </>
      }
    >
      <form className="auth-form" onSubmit={submit}>
        <label>
          Email address
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>

        {error && <p className="form-error">{error}</p>}

        <button className="primary-button" type="submit">
          Enter workspace <ArrowRight size={17} />
        </button>
      </form>
    </AuthLayout>
  );
}

function AuthLayout({ title, subtitle, footer, children }) {
  return (
    <div className="auth-page">
      <div className="auth-art">
        <div className="art-top">
          <div className="brand">
            <div className="brand-symbol">N</div>
            <span>Nexora</span>
          </div>
          <span className="art-tag">A clearer way forward</span>
        </div>

        <div className="art-quote">
          <Sparkles size={19} />
          <p>“The best ideas arrive when there is room to notice them.”</p>
          <small>Nexora intelligence studio</small>
        </div>

        <div className="art-grid" />
      </div>

      <div className="auth-panel">
        <div className="auth-content">
          <span className="eyebrow">Nexora AI</span>
          <h1>{title}</h1>
          <p className="auth-subtitle">{subtitle}</p>
          {children}
          <p className="auth-footer">{footer}</p>
        </div>
      </div>
    </div>
  );
}

