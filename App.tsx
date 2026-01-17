import React, { useState } from 'react';
import { TabId } from './types';
import { SpecialtiesSection } from './sections/SpecialtiesSection';
import { JobsSection } from './sections/JobsSection';
import { VoiceAssistant } from './components/VoiceAssistant';
import { DoctorCard } from './components/DoctorCard';
import { MapPin, Building2, Beaker, Briefcase, Activity, Clock, Phone, Stethoscope, ArrowLeft } from 'lucide-react';

const NAV_ITEMS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'home', label: 'الرئيسية', icon: <Building2 className="w-4 h-4" /> },
  { id: 'specialties', label: 'العيادات', icon: <Stethoscope className="w-4 h-4" /> },
  { id: 'operations', label: 'العمليات', icon: <Activity className="w-4 h-4" /> },
  { id: 'lab', label: 'المعمل', icon: <Beaker className="w-4 h-4" /> },
  { id: 'jobs', label: 'التوظيف', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'contact', label: 'اتصل بنا', icon: <Phone className="w-4 h-4" /> },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="animate-fadeIn space-y-12">
            {/* Hero Section */}
            <div className="text-center space-y-6 py-10 relative">
              <div className="inline-block p-1 px-3 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold mb-2 shadow-sm">
                ✨ رعاية صحية متكاملة
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-800 drop-shadow-sm">
                مركز الخليل الطبي
              </h2>
              <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
                نجمع بين الخبرة الطبية المتميزة وأحدث التقنيات لضمان صحتك وسلامتك.
                <br/>
                <span className="text-accent font-medium">نحن هنا لأجلك..</span>
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <button 
                  onClick={() => setActiveTab('specialties')}
                  className="px-8 py-3 bg-accent hover:bg-accent-hover text-white font-bold rounded-full transition-all shadow-[0_4px_14px_0_rgba(14,165,233,0.39)] hover:shadow-[0_6px_20px_rgba(14,165,233,0.23)] hover:-translate-y-0.5 flex items-center gap-2"
                >
                  احجز موعد الآن <ArrowLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setActiveTab('contact')}
                  className="px-8 py-3 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-full transition-all border border-slate-200 shadow-sm hover:shadow-md"
                >
                  تواصل معنا
                </button>
              </div>
            </div>
            
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="glass-card p-8 rounded-2xl text-center group hover:border-accent/40 transition-all duration-500 hover:-translate-y-2">
                 <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-inner">
                    <Stethoscope className="w-8 h-8 text-accent" />
                 </div>
                 <h3 className="text-xl font-bold mb-3 text-slate-800">عيادات شاملة</h3>
                 <p className="text-sm text-slate-500 leading-relaxed">تغطية واسعة لكافة التخصصات الطبية بإشراف نخبة من الاستشاريين.</p>
               </div>
               
               <div className="glass-card p-8 rounded-2xl text-center group hover:border-emerald-300 transition-all duration-500 hover:-translate-y-2">
                 <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-inner">
                    <Beaker className="w-8 h-8 text-emerald-500" />
                 </div>
                 <h3 className="text-xl font-bold mb-3 text-slate-800">معمل متطور</h3>
                 <p className="text-sm text-slate-500 leading-relaxed">أحدث الأجهزة المخبرية لضمان دقة وسرعة نتائج التحاليل.</p>
               </div>
               
               <div className="glass-card p-8 rounded-2xl text-center group hover:border-rose-300 transition-all duration-500 hover:-translate-y-2">
                 <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-100 to-rose-50 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-inner">
                    <Clock className="w-8 h-8 text-rose-500" />
                 </div>
                 <h3 className="text-xl font-bold mb-3 text-slate-800">طوارئ 24/7</h3>
                 <p className="text-sm text-slate-500 leading-relaxed">جاهزية تامة لاستقبال حالات الطوارئ وتقديم الرعاية الفورية.</p>
               </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden mt-8 border border-white/60 shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-white pointer-events-none"></div>
              <div className="glass p-10 md:p-14 relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">قيمنا ورسالتنا</h2>
                <p className="text-slate-600 text-lg leading-relaxed max-w-4xl">
                  في مركز الخليل، نؤمن بأن الرعاية الصحية حق للجميع، ونسعى لتقديمها بأعلى معايير الجودة والإنسانية، موفرين بيئة آمنة ومريحة تساعد على الشفاء.
                </p>
              </div>
            </div>
          </div>
        );
      
      case 'contact':
        return (
          <div className="animate-fadeIn max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-800 mb-8 border-r-4 border-accent pr-4">
              تواصل معنا
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-card p-8 rounded-2xl space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg shrink-0 border border-blue-100">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">العنوان</h3>
                    <p className="text-slate-600">امتداد شارع أحمد عرابي - أمام البنك الأهلي<br/>مدينة الفردوس - البراجيل</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg shrink-0 border border-blue-100">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">أرقام الهاتف</h3>
                    <ul className="space-y-2 text-slate-600 font-mono text-lg" dir="ltr">
                      <li className="flex justify-end hover:text-accent transition-colors font-bold">01040538124</li>
                      <li className="flex justify-end hover:text-accent transition-colors font-bold">01101586178</li>
                      <li className="flex justify-end hover:text-accent transition-colors font-bold">0237059816</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="glass-card p-8 rounded-2xl flex flex-col justify-center items-center text-center">
                <div className="p-4 bg-slate-50 rounded-full mb-4 border border-slate-100">
                  <Building2 className="w-12 h-12 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">ساعات العمل</h3>
                <p className="text-slate-500">العيادات: حسب المواعيد</p>
                <p className="text-slate-500">الطوارئ: 24 ساعة</p>
                <p className="text-slate-500">المعمل: طوال أيام الأسبوع</p>
              </div>
            </div>
          </div>
        );

      case 'specialties':
        return <SpecialtiesSection />;

      case 'operations':
        return (
           <div className="animate-fadeIn flex flex-col items-center justify-center py-24 text-center">
             <div className="relative">
                <div className="absolute inset-0 bg-blue-200/40 blur-3xl rounded-full"></div>
                <Activity className="w-32 h-32 text-slate-300 relative z-10 mb-6" />
             </div>
             <h1 className="text-5xl font-black text-slate-800 mb-4 tracking-tight">قريباً</h1>
             <p className="text-xl text-slate-500 max-w-md mx-auto">نعمل حالياً على تجهيز غرف عمليات بأعلى المعايير العالمية لخدمتكم قريباً.</p>
           </div>
        );

      case 'lab':
        return (
          <div className="animate-fadeIn max-w-3xl mx-auto">
             <div className="flex items-center justify-between mb-8">
               <h2 className="text-3xl font-bold text-slate-800 border-r-4 border-accent pr-4">
                  المعمل الطبي
               </h2>
               <Beaker className="w-8 h-8 text-accent opacity-80" />
             </div>
            <DoctorCard 
              doctor={{
                name: 'المعمل المركزي',
                specialty: 'تحاليل طبية شاملة ودقيقة',
                schedule: ['مفتوح طوال اليوم', 'جميع أيام الأسبوع'],
                whatsappMessage: 'أرغب في الاستفسار عن التحاليل الطبية'
              }}
            />
          </div>
        );

      case 'jobs':
        return <JobsSection />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-right pb-24 md:pb-0">
      
      {/* Modern Header */}
      <header className="glass sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
           <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-50 to-white border border-slate-200 shadow-sm overflow-hidden shrink-0 flex items-center justify-center">
                {/* Logo Placeholder */}
                <Building2 className="w-6 h-6 text-accent" />
             </div>
             <div>
               <h1 className="text-2xl font-bold text-slate-800 tracking-wide">
                 مركز الخليل
               </h1>
               <p className="text-xs text-accent uppercase tracking-widest font-semibold">Medical Center</p>
             </div>
           </div>

           {/* Desktop Nav */}
           <div className="hidden md:flex bg-white/50 backdrop-blur-md rounded-full p-1.5 border border-white/40 shadow-sm">
             {NAV_ITEMS.map((item) => (
               <button
                 key={item.id}
                 onClick={() => setActiveTab(item.id)}
                 className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-300 text-sm font-bold ${
                   activeTab === item.id 
                     ? 'bg-accent text-white shadow-md shadow-blue-200' 
                     : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'
                 }`}
               >
                 {item.icon}
                 {item.label}
               </button>
             ))}
           </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white/60 backdrop-blur-sm py-8 text-center">
        <div className="container mx-auto px-4">
          <p className="text-slate-500 text-sm font-medium">&copy; {new Date().getFullYear()} مركز الخليل الطبي - جميع الحقوق محفوظة</p>
          <div className="flex justify-center gap-4 mt-4 opacity-70">
             <div className="w-2 h-2 rounded-full bg-accent"></div>
             <div className="w-2 h-2 rounded-full bg-accent"></div>
             <div className="w-2 h-2 rounded-full bg-accent"></div>
          </div>
        </div>
      </footer>

      {/* Mobile Nav Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-white/60 z-30 px-4 py-2 flex justify-between items-center pb-safe">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
              activeTab === item.id 
                ? 'text-accent bg-blue-50' 
                : 'text-slate-400'
            }`}
          >
            <div className={`p-1.5 rounded-full transition-all`}>
              {React.cloneElement(item.icon as React.ReactElement, { className: 'w-5 h-5' })}
            </div>
            <span className="text-[10px] font-bold">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Voice Assistant Overlay */}
      <VoiceAssistant />
    </div>
  );
};

export default App;