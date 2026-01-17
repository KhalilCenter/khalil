import React from 'react';
import { Doctor } from '../types';
import { MessageCircle, Phone, Calendar, Clock, User } from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
  whatsappNumber?: string;
}

const DEFAULT_PHONE = "201040538124";
const CALL_NUMBER = "01040538124";

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, whatsappNumber = DEFAULT_PHONE }) => {
  const openWhatsApp = () => {
    const message = doctor.whatsappMessage;
    if (message) {
      const encodedMessage = encodeURIComponent(message);
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      window.open(whatsappURL, '_blank');
    }
  };

  const handleCallClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `tel:${CALL_NUMBER}`;
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openWhatsApp();
  };

  return (
    <div 
      className="group relative glass-card rounded-2xl p-6 transition-all duration-300 flex flex-col items-center text-center hover:border-accent/30 hover:shadow-[0_20px_40px_-10px_rgba(14,165,233,0.15)] bg-white/70"
    >
      {/* Decorative avatar circle */}
      <div className="w-20 h-20 rounded-full bg-gradient-to-b from-slate-50 to-slate-100 border border-slate-200 flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform duration-300 group-hover:border-accent/40">
        <User className="w-10 h-10 text-slate-300 group-hover:text-accent transition-colors" />
      </div>

      <div className="w-full mb-2">
        <h3 className="text-xl font-bold text-slate-800 group-hover:text-accent transition-colors mb-1">
          {doctor.name}
        </h3>
        {doctor.specialty && (
          <p className="text-slate-500 text-sm font-medium line-clamp-2 min-h-[40px]">
            {doctor.specialty}
          </p>
        )}
      </div>

      {/* Action Buttons Row */}
      <div className="flex items-center justify-center gap-2 mb-6 w-full">
        <button 
          onClick={handleCallClick}
          className="flex-1 py-2 px-4 rounded-xl bg-slate-100 hover:bg-accent text-slate-600 hover:text-white border border-slate-200 hover:border-transparent transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group/btn shadow-sm"
        >
          <Phone className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
          <span className="text-xs font-bold">اتصال</span>
        </button>
        
        <button 
          onClick={handleWhatsAppClick}
          className="flex-1 py-2 px-4 rounded-xl bg-green-50 hover:bg-[#25d366] text-[#25d366] hover:text-white border border-green-100 hover:border-transparent transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group/btn shadow-sm"
        >
          <MessageCircle className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
          <span className="text-xs font-bold">واتساب</span>
        </button>
      </div>
      
      {/* Schedule Section */}
      <div className="mt-auto w-full bg-slate-50/80 rounded-xl p-3 space-y-2 border border-slate-100">
        {doctor.schedule.map((text, idx) => {
          const isTime = text.includes('الساعة') || (/\d/.test(text) && (text.includes('م') || text.includes('ص')));
          const Icon = isTime ? Clock : Calendar;
          
          return (
            <div key={idx} className="flex items-center gap-3 text-sm text-slate-600 border-b last:border-0 border-slate-200 pb-1 last:pb-0">
              <Icon className="w-3.5 h-3.5 text-accent shrink-0" />
              <span className="text-xs font-bold">{text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};