const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(path, options = {}) {
  const token = localStorage.getItem('nexora_token');

  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

function saveSession({ token, user }) {
  localStorage.setItem('nexora_token', token);
  localStorage.setItem('nexora_user', JSON.stringify(user));
}

export const authApi = {
  login: async (credentials) => {
    const data = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    saveSession(data);
    return data;
  },

  register: async (details) => {
    const data = await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(details),
    });

    saveSession(data);
    return data;
  },

  logout: () => {
    localStorage.removeItem('nexora_token');
    localStorage.removeItem('nexora_user');
  },
};

export const chatApi = {
  sendMessage: (payload) =>
    request('/chat/message', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  conversations: () => request('/chat/conversations'),
};

