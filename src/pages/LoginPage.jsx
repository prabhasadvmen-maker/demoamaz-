
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { LuUser as User, LuStore as Store, LuShield as Shield } from 'react-icons/lu';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleDemoLogin = (role) => {
    if(login(role)) {
      showToast(`Logged in as ${role.toUpperCase()}`, 'success');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-200 w-full max-w-md relative overflow-hidden">
        
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100 rounded-bl-full -mr-10 -mt-10 blur-xl opacity-50 pointer-events-none"></div>

        <div className="text-center mb-10">
          <div className="text-4xl font-black tracking-tight flex items-baseline justify-center mb-2">
            <span className="text-primary-600">Bazaar</span>
            <span className="text-slate-900">Hub</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
          <p className="text-slate-500 font-medium">Sign in to your account</p>
        </div>
        
        <form className="space-y-4 mb-8" onSubmit={e => { e.preventDefault(); handleDemoLogin('customer'); }}>
          <div>
             <input type="email" placeholder="Email Address" className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none font-medium" />
          </div>
          <div>
             <input type="password" placeholder="Password" className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none font-medium" />
          </div>
          <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary-200 hover:-translate-y-0.5">Login Securely</button>
        </form>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
          <div className="relative flex justify-center text-sm"><span className="px-4 bg-white text-slate-500 font-bold uppercase tracking-wider text-xs">Demo Accounts</span></div>
        </div>

        <div className="space-y-3">
          <button onClick={() => handleDemoLogin('customer')} className="w-full border-2 border-primary-100 bg-primary-50 hover:bg-primary-100 text-primary-700 py-3 rounded-xl font-bold flex items-center justify-center gap-3 transition-colors">
            <User size={18} /> Customer Demo
          </button>
          <button onClick={() => handleDemoLogin('vendor')} className="w-full border-2 border-orange-100 bg-orange-50 hover:bg-orange-100 text-orange-700 py-3 rounded-xl font-bold flex items-center justify-center gap-3 transition-colors">
            <Store size={18} /> Vendor Demo
          </button>
          <button onClick={() => handleDemoLogin('admin')} className="w-full border-2 border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 py-3 rounded-xl font-bold flex items-center justify-center gap-3 transition-colors">
            <Shield size={18} /> Admin Demo
          </button>
        </div>
        
        <div className="text-center mt-8 text-sm font-medium text-slate-600">
          Don't have an account? <Link to="/register" className="text-primary-600 hover:underline font-bold">Register here</Link>
        </div>
      </div>
    </div>
  );
}
