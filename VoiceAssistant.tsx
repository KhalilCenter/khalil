import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { Mic, MicOff, Activity, X, Loader2 } from 'lucide-react';
import { createPcmBlob, base64ToUint8Array, decodeAudioData } from '../utils/audio';

const SYSTEM_INSTRUCTION = `
You are a helpful, professional, and friendly medical receptionist assistant for 'Al-Khalil Medical Center' (مركز الخليل الطبي).
You speak primarily in Arabic.
Your goal is to assist users by answering questions about the clinic, its location, specialties, and services.
If a user wants to book an appointment, guide them to use the WhatsApp buttons on the site or provide the contact numbers.

Key Information:
- Address: Emtedad Ahmed Orabi St, In front of National Bank, Al-Fardous City, Al-Baradil.
- Phone Numbers: 01040538124, 01101586178, 0237059816.
- Specialties: Neurology, Dermatology, ENT, Dental, OBGYN, Pediatrics, Orthopedics, Internal Medicine, Nutrition.
- Lab: Available all week, all day.
- Operations: Coming soon.
- Values: Quality healthcare, professionalism, safety.

Keep responses concise and helpful.
`;

export const VoiceAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [volume, setVolume] = useState(0);

  // Refs for audio handling to avoid re-renders
  const audioContextRef = useRef<AudioContext | null>(null);
  const inputContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null); // Type is complex for LiveSession, keeping as any for simplicity in this snippet

  // Cleanup function
  const stopSession = async () => {
    if (sessionRef.current) {
      sessionRef.current = null;
    }

    if (inputContextRef.current) {
      await inputContextRef.current.close();
      inputContextRef.current = null;
    }
    if (audioContextRef.current) {
      await audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    // Stop all playing sources
    sourcesRef.current.forEach(source => {
      try { source.stop(); } catch (e) { /* ignore */ }
    });
    sourcesRef.current.clear();
    
    setIsActive(false);
    setIsConnecting(false);
    setVolume(0);
  };

  const startSession = async () => {
    try {
      setIsConnecting(true);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Initialize Audio Contexts
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const inputCtx = new AudioContextClass({ sampleRate: 16000 });
      const outputCtx = new AudioContextClass({ sampleRate: 24000 });
      
      inputContextRef.current = inputCtx;
      audioContextRef.current = outputCtx;
      nextStartTimeRef.current = outputCtx.currentTime;

      // Microphone Stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const source = inputCtx.createMediaStreamSource(stream);
      const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
      
      // Volume visualization helper
      const analyzer = inputCtx.createAnalyser();
      source.connect(analyzer);
      const dataArray = new Uint8Array(analyzer.frequencyBinCount);
      
      const updateVolume = () => {
        if (!inputContextRef.current) return;
        analyzer.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
        const average = sum / dataArray.length;
        setVolume(Math.min(100, average * 2)); // Scale up a bit
        requestAnimationFrame(updateVolume);
      };
      updateVolume();

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
          },
          systemInstruction: SYSTEM_INSTRUCTION,
        },
        callbacks: {
          onopen: () => {
            console.log("Gemini Live Connected");
            setIsConnecting(false);
            setIsActive(true);
          },
          onmessage: async (message: LiveServerMessage) => {
             // Handle Audio Output
             const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
             if (base64Audio && audioContextRef.current) {
                const ctx = audioContextRef.current;
                // Sync start time
                nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
                
                const audioBytes = base64ToUint8Array(base64Audio);
                const audioBuffer = await decodeAudioData(audioBytes, ctx, 24000, 1);
                
                const sourceNode = ctx.createBufferSource();
                sourceNode.buffer = audioBuffer;
                sourceNode.connect(ctx.destination);
                
                sourceNode.addEventListener('ended', () => {
                  sourcesRef.current.delete(sourceNode);
                });
                
                sourceNode.start(nextStartTimeRef.current);
                nextStartTimeRef.current += audioBuffer.duration;
                sourcesRef.current.add(sourceNode);
             }

             // Handle Interruption
             if (message.serverContent?.interrupted) {
                sourcesRef.current.forEach(s => {
                   try { s.stop(); } catch(e) {/* ignore */}
                });
                sourcesRef.current.clear();
                if (audioContextRef.current) {
                    nextStartTimeRef.current = audioContextRef.current.currentTime;
                }
             }
          },
          onclose: () => {
            console.log("Gemini Live Closed");
            stopSession();
          },
          onerror: (err) => {
            console.error("Gemini Live Error", err);
            stopSession();
          }
        }
      });

      sessionRef.current = sessionPromise;

      // Audio Processing Loop
      scriptProcessor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        const pcmBlob = createPcmBlob(inputData);
        sessionPromise.then(session => {
          session.sendRealtimeInput({ media: pcmBlob });
        });
      };

      source.connect(scriptProcessor);
      scriptProcessor.connect(inputCtx.destination);

    } catch (error) {
      console.error("Failed to start session:", error);
      setIsConnecting(false);
      setIsActive(false);
      alert("تعذر الوصول إلى الميكروفون أو الاتصال بالخادم. يرجى التحقق من الإعدادات.");
    }
  };

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      stopSession();
    };
  }, []);

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-50 bg-accent text-white p-4 rounded-full shadow-[0_4px_14px_0_rgba(14,165,233,0.39)] hover:shadow-accent/50 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label="Talk to AI Assistant"
      >
        <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-20 group-hover:opacity-40"></div>
        <Mic className="w-8 h-8" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end animate-fadeIn">
      <div className="bg-white/90 backdrop-blur-xl border border-white/60 p-6 rounded-2xl shadow-2xl w-80 mb-4 text-center relative overflow-hidden ring-1 ring-slate-900/5">
        
        {/* Close Button */}
        <button 
          onClick={() => {
            stopSession();
            setIsOpen(false);
          }}
          className="absolute top-2 left-2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-accent mb-2">المساعد الصوتي</h3>
        <p className="text-sm text-slate-500 mb-6">
          تحدث معي للاستفسار عن العيادات أو المواعيد.
        </p>

        <div className="flex justify-center items-center mb-6 h-24 relative">
          {isConnecting ? (
             <div className="flex flex-col items-center gap-2 text-accent">
               <Loader2 className="w-10 h-10 animate-spin" />
               <span className="text-sm text-slate-500">جاري الاتصال...</span>
             </div>
          ) : isActive ? (
            <div className="relative flex items-center justify-center">
               {/* Visualizer Circles */}
               <div 
                  className="absolute w-20 h-20 bg-accent/20 rounded-full transition-all duration-75 ease-out"
                  style={{ transform: `scale(${1 + volume/50})` }}
               />
               <div 
                  className="absolute w-16 h-16 bg-accent/30 rounded-full transition-all duration-75 ease-out"
                  style={{ transform: `scale(${1 + volume/80})` }}
               />
               <div className="relative z-10 bg-white p-4 rounded-full border-2 border-accent shadow-sm">
                 <Activity className="w-8 h-8 text-accent animate-pulse" />
               </div>
            </div>
          ) : (
            <div className="text-slate-400 text-sm">
              اضغط على الميكروفون للتحدث
            </div>
          )}
        </div>

        <button 
          onClick={isActive ? stopSession : startSession}
          disabled={isConnecting}
          className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
            isActive 
              ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30' 
              : 'bg-accent hover:bg-sky-500 text-white shadow-lg shadow-sky-500/30'
          }`}
        >
          {isActive ? (
            <>
              <MicOff className="w-5 h-5" />
              إنهاء المحادثة
            </>
          ) : (
            <>
              <Mic className="w-5 h-5" />
              ابدأ التحدث
            </>
          )}
        </button>

      </div>
    </div>
  );
};