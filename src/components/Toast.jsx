
import React from 'react';
import { useToast } from '../context/ToastContext';
import { LuCircleCheckBig as CheckCircle, LuCircleX as XCircle, LuInfo as Info, LuTriangleAlert as AlertTriangle, LuX as X } from 'react-icons/lu';

export default function Toast() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-20 right-4 z-[100] flex flex-col gap-3 pointer-events-none w-full max-w-sm">
      {toasts.map((toast) => (
        <div 
          key={toast.id} 
          className={`pointer-events-auto bg-white border-l-4 rounded shadow-lg p-4 flex items-start gap-3 animate-[slideInRight_0.3s_ease-out_forwards] transition-all ${
            toast.type === 'success' ? 'border-green-500' :
            toast.type === 'error' ? 'border-red-500' :
            toast.type === 'warning' ? 'border-accent-500' :
            'border-primary-500'
          }`}
        >
          {toast.type === 'success' && <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={20} />}
          {toast.type === 'error' && <XCircle className="text-red-500 shrink-0 mt-0.5" size={20} />}
          {toast.type === 'warning' && <AlertTriangle className="text-accent-500 shrink-0 mt-0.5" size={20} />}
          {toast.type === 'info' && <Info className="text-primary-500 shrink-0 mt-0.5" size={20} />}
          
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-800">{toast.message}</p>
          </div>
          
          <button onClick={() => removeToast(toast.id)} className="text-slate-400 hover:text-slate-600">
            <X size={16} />
          </button>
        </div>
      ))}
      <style>{'\
        @keyframes slideInRight {\
          from { transform: translateX(100%); opacity: 0; }\
          to { transform: translateX(0); opacity: 1; }\
        }\
      '}</style>
    </div>
  );
}
