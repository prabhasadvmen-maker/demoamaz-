
import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LuUser as User, LuPackage as Package, LuHeart as Heart, LuMapPin as MapPin, LuCreditCard as CreditCard, LuLogOut as LogOut } from 'react-icons/lu';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-black text-slate-900 mb-8">My Account</h1>

        <div className="grid sm:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="sm:col-span-1">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm text-center">
              <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-4 border-primary-100 shadow-md">
                {user.avatar
                  ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  : <div className="w-full h-full bg-primary-100 flex items-center justify-center text-3xl font-black text-primary-600">{user.name[0]}</div>
                }
              </div>
              <h2 className="text-xl font-black text-slate-900 mb-1">{user.name}</h2>
              <p className="text-sm text-slate-500 mb-1">{user.email}</p>
              {user.phone && <p className="text-sm text-slate-500 mb-3">{user.phone}</p>}
              <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {user.role}
              </span>
              <button
                onClick={() => { logout(); navigate('/login'); }}
                className="mt-6 w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 border border-red-200 py-2.5 rounded-xl font-bold text-sm hover:bg-red-100 transition-colors"
              >
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="sm:col-span-2 grid grid-cols-2 gap-4 content-start">
            {[
              { icon: Package, label: 'My Orders', sub: 'Track & manage orders', to: '/orders', color: 'text-blue-600 bg-blue-50' },
              { icon: Heart, label: 'My Wishlist', sub: 'Saved items', to: '/wishlist', color: 'text-red-500 bg-red-50' },
              { icon: MapPin, label: 'Addresses', sub: 'Manage delivery addresses', to: '/profile', color: 'text-green-600 bg-green-50' },
              { icon: CreditCard, label: 'Payments', sub: 'Cards & UPI', to: '/profile', color: 'text-purple-600 bg-purple-50' },
            ].map(item => (
              <Link key={item.label} to={item.to}
                className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md hover:border-primary-200 transition-all group">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${item.color}`}>
                  <item.icon size={20} />
                </div>
                <p className="font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{item.label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{item.sub}</p>
              </Link>
            ))}

            {/* Demo Info Box */}
            <div className="col-span-2 bg-primary-50 border border-primary-100 rounded-2xl p-5">
              <p className="font-bold text-primary-800 mb-1 text-sm">Demo Account</p>
              <p className="text-xs text-primary-600">This is a demo marketplace. No real data is stored. Use the demo login to explore all features.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
