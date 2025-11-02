import React, { useState } from 'react';

function maskIdentifier(value) {
  const v = value.trim();
  if (/@/.test(v)) {
    const [user, domain] = v.split('@');
    const ui = user.length <= 1 ? '*' : user[0] + '*'.repeat(Math.max(1, user.length - 1));
    const parts = domain.split('.');
    const di = parts[0][0] + '*'.repeat(Math.max(1, parts[0].length - 1)) + (parts.length > 1 ? '.' + parts.slice(1).join('.') : '');
    return ui + '@' + di;
  }
  if (/^\+?\d/.test(v)) {
    const digits = v.replace(/\D/g, '');
    const tail = digits.slice(-3);
    return (v.startsWith('+') ? '+' : '') + '*** *** *' + tail;
  }
  if (v.length <= 2) return v[0] + '*';
  return v.slice(0, 2) + '*'.repeat(Math.max(1, v.length - 4)) + v.slice(-2);
}

export default function ForgotPassword() {
  const [identifier, setIdentifier] = useState('');
  const [method, setMethod] = useState('auto');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [kind, setKind] = useState('link');

  const submit = (e) => {
    e.preventDefault();
    const ok = identifier.trim().length >= 3;
    if (!ok) { setError('Please enter a valid identifier (min 3 characters).'); return; }
    setError('');
    const chosen = method === 'auto' ? (/@/.test(identifier) ? 'email' : 'sms') : method;
    setKind(chosen === 'sms' ? 'code via SMS' : 'link via Email');
    setSent(true);
    // TODO: call backend
  };

  return (
    <div className="bg-[#F8F8F8] min-h-screen antialiased text-gray-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6 text-center">
          <a href="profile.php" className="text-3xl font-extrabold text-[#D2042D] tracking-tight">CHERRFY</a>
          <p className="text-sm text-gray-500 mt-1">Recover your account by email, phone, or username.</p>
        </div>

        <section className="bg-white border border-[#E0E0E0] rounded p-6">
          <h1 className="text-lg font-semibold text-[#333333]">Forgot your password?</h1>
          <p className="text-xs text-gray-500">Enter your registered email, phone, or username and we'll send you a reset link or code.</p>

          {!sent ? (
            <form className="space-y-3 mt-4" onSubmit={submit}>
              {error && <p className="text-xs text-red-600">{error}</p>}
              <div>
                <label className="block text-sm font-medium text-gray-700">Email / Phone / Username</label>
                <input className="mt-1 w-full border border-[#E0E0E0] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#D2042D] focus:ring-1 focus:ring-[#D2042D]" placeholder="Email, phone or username" value={identifier} onChange={(e)=>setIdentifier(e.target.value)} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Preferred Method</label>
                  <select className="mt-1 w-full border border-[#E0E0E0] rounded-md px-3 py-2 text-sm" value={method} onChange={(e)=>setMethod(e.target.value)}>
                    <option value="auto">Auto (best available)</option>
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Country Code (for SMS)</label>
                  <input className="mt-1 w-full border border-[#E0E0E0] rounded-md px-3 py-2 text-sm" placeholder="e.g. +880" value={country} onChange={(e)=>setCountry(e.target.value)} />
                </div>
              </div>
              <button type="submit" className="w-full bg-[#D2042D] hover:bg-[#FA0F3E] text-white font-medium py-2 px-5 rounded-md text-sm">Send reset link / code</button>
            </form>
          ) : (
            <div className="mt-4">
              <div className="flex items-start gap-3 p-3 border border-[#E0E0E0] rounded-md bg-white">
                <span className="text-[#D2042D]">✔</span>
                <div className="text-sm">
                  <p className="font-medium text-gray-800">Check your inbox</p>
                  <p className="text-gray-600 text-xs mt-0.5">
                    We sent a reset {kind} to <span className="font-medium">{method === 'sms' ? (country ? country + ' ' : '') : ''}{maskIdentifier(identifier)}</span>. The code/link expires in 15 minutes.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <button type="button" className="px-3 py-1.5 rounded border border-[#E0E0E0] hover:bg-gray-50">Resend</button>
                    <button type="button" className="px-3 py-1.5 rounded border border-[#E0E0E0] hover:bg-gray-50" onClick={()=>setSent(false)}>Use a different method</button>
                    <a href="login.php" className="px-3 py-1.5 rounded bg-[#D2042D] hover:bg-[#FA0F3E] text-white">Return to login</a>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 text-xs text-gray-500">Remembered it? <a href="login.php" className="text-[#D2042D] hover:underline">Back to login</a> or <a href="register.php" className="hover:underline">create an account</a>.</div>
        </section>
      </div>
    </div>
  );
}
