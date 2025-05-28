// dummy API requests (can be replaced with real backend)
export const loginUser = async ({ email, password }) => {
    const res = await fetch('https://api.cherrfy.com/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error('Login failed');
    const data = await res.json(); 
    console.log(data);
    return data;

  };
  
  export const registerUser = async ({ name, email, password }) => {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) throw new Error('Registration failed');
    return res.json();
  };
  