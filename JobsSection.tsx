import React, { useState } from 'react';
import { Send, Briefcase } from 'lucide-react';

const WHATSAPP_NUMBER = "201040538124";

export const JobsSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    type: 'استقبال'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.age) {
      alert("من فضلك املأ جميع البيانات");
      return;
    }

    const message = `طلب توظيف:\nالاسم: ${formData.name}\nرقم الهاتف: ${formData.phone}\nالسن: ${formData.age}\nنوع الوظيفة: ${formData.type}`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
  };

  return (
    <div className="animate-fadeIn max-w-lg mx-auto py-8">
      <div className="text-center mb-8">
         <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-accent/20">
           <Briefcase className="w-8 h-8 text-accent" />
         </div>
         <h2 className="text-3xl font-bold text-slate-800">انضم لفريقنا</h2>
         <p className="text-slate-500 mt-2">نبحث دائماً عن كفاءات مميزة للانضمام لعائلة مركز الخليل.</p>
      </div>

      <form onSubmit={handleSubmit} className="glass-card p-8 rounded-3xl space-y-5 bg-white/60">
        <div className="space-y-1">
          <label className="text-sm font-bold text-slate-700 mr-1">الاسم الكامل</label>
          <input 
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text" 
            className="w-full p-3.5 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all shadow-sm"
            placeholder="الاسم الثلاثي"
          />
        </div>
        
        <div className="space-y-1">
          <label className="text-sm font-bold text-slate-700 mr-1">رقم الهاتف</label>
          <input 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            type="tel" 
            className="w-full p-3.5 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all shadow-sm"
            placeholder="01xxxxxxxxx"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700 mr-1">السن</label>
            <input 
              name="age"
              value={formData.age}
              onChange={handleChange}
              type="number" 
              className="w-full p-3.5 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all shadow-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700 mr-1">نوع الوظيفة</label>
            <select 
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-3.5 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all shadow-sm"
            >
              <option value="استقبال">استقبال</option>
              <option value="نظافة">نظافة</option>
              <option value="تمريض">تمريض</option>
            </select>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-[#25d366] hover:bg-[#1da851] text-white font-bold py-4 px-6 rounded-xl shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.23)] transform active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4"
        >
          <Send className="w-5 h-5" />
          إرسال الطلب عبر واتساب
        </button>
      </form>
    </div>
  );
};