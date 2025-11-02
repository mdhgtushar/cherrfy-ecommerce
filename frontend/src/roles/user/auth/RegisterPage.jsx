import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [pass2, setPass2] = useState('');
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');

  const validate = () => {
    const ok = name.trim() && /.+@.+\..+/.test(email) && pass.length >= 6 && pass === pass2 && agree;
    setError(ok ? '' : 'Passwords must match and be at least 6 characters; all fields required.');
    return ok;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // TODO: submit to backend
  };

  return (
    <div className="antialiased text-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6 text-center">
        <Link to="/" className="text-3xl font-extrabold text-[#D2042D] tracking-tight">CHERRFY</Link>
          <p className="text-sm text-gray-500 mt-1">Create your account to start shopping.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="bg-white border border-[#E0E0E0] rounded-lg p-8 space-y-6 lg:col-span-2">
            <h1 className="text-2xl font-bold text-[#333333] text-center">Create your account</h1>
            <p className="text-sm text-gray-500 text-center -mt-4">Sign up with your details or continue with a provider below.</p>

            <form className="space-y-4" onSubmit={onSubmit}>
              {error && (
                <p className="p-3 text-sm text-red-700 bg-red-50 border border-red-300 rounded-lg">{error}</p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input className="mt-1 w-full border border-[#E0E0E0] rounded-lg px-4 py-2.5 text-base focus:outline-none focus:border-[#D2042D] focus:ring-1 focus:ring-[#D2042D]" placeholder="Your name" value={name} onChange={(e)=>setName(e.target.value)} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" className="mt-1 w-full border border-[#E0E0E0] rounded-lg px-4 py-2.5 text-base focus:outline-none focus:border-[#D2042D] focus:ring-1 focus:ring-[#D2042D]" placeholder="you@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input type="password" className="mt-1 w-full border border-[#E0E0E0] rounded-lg px-4 py-2.5 text-base focus:outline-none focus:border-[#D2042D] focus:ring-1 focus:ring-[#D2042D]" placeholder="Create a strong password" value={pass} onChange={(e)=>setPass(e.target.value)} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                  <input type="password" className="mt-1 w-full border border-[#E0E0E0] rounded-lg px-4 py-2.5 text-base focus:outline-none focus:border-[#D2042D] focus:ring-1 focus:ring-[#D2042D]" placeholder="Repeat password" value={pass2} onChange={(e)=>setPass2(e.target.value)} required />
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" className="rounded border-[#E0E0E0] text-[#D2042D] focus:ring-[#D2042D]" checked={agree} onChange={(e)=>setAgree(e.target.checked)} /> I agree to the <a href="#" className="text-[#D2042D] hover:underline">Terms</a> and <a href="#" className="text-[#D2042D] hover:underline">Privacy Policy</a>
              </label>

              <button type="submit" className="w-full bg-[#D2042D] hover:bg-[#FA0F3E] text-white font-bold py-3 px-5 rounded-lg text-lg transition-colors duration-150 shadow-lg mt-2">
                Create account
              </button>

              <p className="text-sm text-gray-500 text-center">Already have an account? <a href="login.php" className="text-[#D2042D] hover:underline font-medium">Sign in</a>.</p>
            </form>

            <div className="flex items-center gap-2 my-2">
              <span className="flex-1 h-px bg-gray-200"></span>
              <span className="text-xs text-gray-400 font-medium uppercase">or Sign up with</span>
              <span className="flex-1 h-px bg-gray-200"></span>
            </div>

            <div className="space-y-3">
              <a href="#" className="w-full inline-flex items-center justify-center gap-3 rounded-lg text-base bg-white border border-[#E0E0E0] py-3 hover:border-gray-300 hover:bg-gray-50">
                <span className="w-5 h-5">G</span>
                Sign up with Google
              </a>
              <a href="#" className="w-full inline-flex items-center justify-center gap-3 rounded-lg text-base bg-white border border-[#E0E0E0] py-3 hover:border-gray-300 hover:bg-gray-50">
                <span className="w-5 h-5">f</span>
                Sign up with Facebook
              </a>
            </div>
          </section>

          <aside className="bg-white border border-[#E0E0E0] rounded-lg p-6">
            <div className="border-b border-[#E0E0E0] pb-3 font-bold">Why join CHERRFY?</div>
            <div className="pt-4 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 text-green-600">●</span>
                <div>
                  <p className="font-semibold text-[#333333]">Your data is protected</p>
                  <p className="text-gray-600">We use industry-standard encryption and never sell your personal data.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 text-[#D2042D]">●</span>
                <div>
                  <p className="font-semibold text-[#333333]">Rewards & vouchers</p>
                  <p className="text-gray-600">Save more with loyalty perks, bonus vouchers, and members-only sales.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 text-blue-600">●</span>
                <div>
                  <p className="font-semibold text-[#333333]">Track every order</p>
                  <p className="text-gray-600">Live order tracking and lightning-fast updates at every step.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 text-yellow-600">●</span>
                <div>
                  <p className="font-semibold text-[#333333]">Easy returns</p>
                  <p className="text-gray-600">Hassle-free returns and quick refunds if something isn’t right.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
 
      </div>
    </div>
  );
}
