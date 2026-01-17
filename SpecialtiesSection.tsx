import React, { useState } from 'react';
import { DoctorCard } from '../components/DoctorCard';
import { SpecialtyData } from '../types';

const specialtiesData: SpecialtyData[] = [
  {
    id: 'neurology',
    label: 'المخ والأعصاب',
    doctors: [
      {
        name: 'د/ مصطفى أبو الليل',
        specialty: 'استشاري جراحة المخ والأعصاب والعمود الفقري',
        schedule: ['الثلاثاء, الجمعة', 'الساعة ٧ مساءً'],
        whatsappMessage: 'أرغب في حجز موعد مع د/ مصطفى أبو الليل - تخصص المخ والأعصاب'
      }
    ]
  },
  {
    id: 'dermatology',
    label: 'الجلدية والتجميل',
    doctors: [
      {
        name: 'د/ محمد عماد الدين',
        specialty: 'اخصائي الجلدية بمستشفى الحوض المرصود',
        schedule: ['الأحد', 'الساعة ٧ مساءً'],
        whatsappMessage: 'أرغب في حجز موعد مع د/ محمد عماد الدين - تخصص الجلدية'
      }
    ]
  },
  {
    id: 'ent',
    label: 'الأنف والأذن',
    doctors: [
      {
        name: 'د/ معتصم طُبال',
        specialty: 'اخصائي الأنف والأذن والحنجرة بمستشفى الطلبة جامعة القاهرة',
        schedule: ['الأحد، الأربعاء، الجمعة', 'الساعة ٨ مساءً'],
        whatsappMessage: 'أرغب في حجز موعد مع د/ معتصم طُبال - تخصص الأنف والأذن والحنجرة'
      }
    ]
  },
  {
    id: 'teeth',
    label: 'الاسنان',
    doctors: [
      {
        name: 'د/ عبدالرحمن يوسف',
        specialty: 'اخصائي الوجه و الفكيين',
        schedule: ['السبت, الثلاثاء, الجمعة', 'الساعة ٦ مساءً'],
        whatsappMessage: 'أرغب في حجز موعد مع د/ عبدالرحمن يوسف - تخصص الاسنان'
      },
      {
        name: 'د/ عبدالرحمن علي',
        specialty: 'اخصائي الوجه و الفكيين',
        schedule: ['الاحد, الخميس', 'الساعة ٦ مساءً'],
        whatsappMessage: 'أرغب في حجز موعد مع د/ عبدالرحمن علي - تخصص الاسنان'
      }
    ]
  },
  {
    id: 'woman',
    label: 'النساء والتوليد',
    doctors: [
      {
        name: 'د/ سمر سيد صالح',
        specialty: 'اخصائية النساء و التوليد',
        schedule: ['الاربعاء', 'الساعة ٦ مساءً'],
        whatsappMessage: 'أرغب في حجز موعد مع د/ سمر سيد صالح - تخصص النساء و التوليد'
      },
      {
        name: 'د/ فاتن يوسف',
        specialty: 'اخصائية النساء و التوليد',
        schedule: ['السبت, الاثنين, الجمعة', 'الساعة ٧ مساءً'],
        whatsappMessage: 'أرغب في حجز موعد مع د/ فاتن يوسف - تخصص النساء و التوليد'
      }
    ]
  },
  {
    id: 'child',
    label: 'الاطفال',
    doctors: [
      {
        name: 'د/ عبدالله محمود',
        specialty: 'طبيب الاطفال و حديثي الولادة بمستشفى تبارك',
        schedule: ['الاحد, الثلاثاء', 'الساعة ٨ مساءً'],
        whatsappMessage: 'أرغب في حجز موعد مع د/ عبدالله محمود - تخصص الاطفال و حديثي الولادة'
      }
    ]
  },
  {
    id: 'bones',
    label: 'العظام',
    doctors: [
      {
        name: 'د/ محمد ناصر',
        specialty: 'اخصائي العظام و العمود الفقري',
        schedule: ['السبت, الثلاثاء, الخميس', 'الساعة ٨ مساءً'],
        whatsappMessage: 'أرغب في حجز موعد مع د/ محمد ناصر - تخصص العظام'
      }
    ]
  },
  {
    id: 'internal',
    label: 'الباطنة العامة',
    doctors: [
      {
        name: 'د/ مصطفى خالد',
        specialty: 'اخصائي الباطنة العامة',
        schedule: ['الاثنين, الخميس', 'الساعة ٧ مساءً'],
        whatsappMessage: 'أرغب في حجز موعد مع د/ مصطفى خالد - تخصص الباطنة العامة'
      }
    ]
  },
  {
    id: 'feeding',
    label: 'التغذية العلاجية',
    doctors: [
      {
        name: 'د/ نهى أبوالعلا',
        specialty: 'اخصائية التغذية العلاجية',
        schedule: ['الاثنين, الاربعاء', 'الساعة ٦ مساءً'],
        whatsappMessage: 'أرغب في حجز موعد مع د/ نهى أبوالعلا - تخصص التغذية العلاجية'
      }
    ]
  }
];

export const SpecialtiesSection: React.FC = () => {
  const [activeSpecialty, setActiveSpecialty] = useState<string>('neurology');

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-4">
        <h2 className="text-3xl font-bold text-slate-800">
          التخصصات الطبية
        </h2>
        <span className="text-sm text-slate-600 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
           {specialtiesData.length} تخصصات
        </span>
      </div>
      
      {/* Scrollable Filters */}
      <div className="mb-8 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
        <div className="flex space-x-2 space-x-reverse min-w-max">
          {specialtiesData.map((spec) => (
            <button
              key={spec.id}
              onClick={() => setActiveSpecialty(spec.id)}
              className={`px-5 py-2.5 rounded-full transition-all duration-300 text-sm font-bold border ${
                activeSpecialty === spec.id
                  ? 'bg-accent text-white border-accent shadow-[0_4px_14px_0_rgba(14,165,233,0.3)]'
                  : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-slate-800 hover:border-slate-300'
              }`}
            >
              {spec.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {specialtiesData.find(s => s.id === activeSpecialty)?.doctors.map((doctor, index) => (
          <DoctorCard key={index} doctor={doctor} />
        ))}
      </div>
    </div>
  );
};