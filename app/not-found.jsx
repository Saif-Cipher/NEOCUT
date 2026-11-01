import Link from 'next/link';
import { Film, Home, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: '404: Scene Not Found — NeoCut Digital',
  description: 'The requested frame or scene could not be found in our production timeline.',
};

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 bg-[#050B1F] text-[#FFFFFF] overflow-hidden">
      {/* Background ambient lighting */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#1D4ED8]/30 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true" 
      />
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#5CB2FF]/15 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true" 
      />

      <div className="relative z-10 max-w-xl text-center space-y-6 p-8 rounded-2xl border border-[#26407F]/50 bg-[#0D1B3E]/90 backdrop-blur-xl shadow-2xl">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#050B1F]/60 border border-[#26407F] text-[#5CB2FF]">
          <Film className="w-8 h-8 animate-pulse" />
        </div>

        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] font-mono text-[#5CB2FF]">
            Error Code 404
          </p>
          <h1 className="text-4xl sm:text-5xl font-serif tracking-tight text-[#FFFFFF]">
            Scene Not Found
          </h1>
        </div>

        <p className="text-sm sm:text-base text-[#DCE6FF] leading-relaxed font-sans max-w-md mx-auto">
          The sequence or frame you are trying to render does not exist in our production timeline or has been relocated.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#2563EB] text-[#FFFFFF] text-xs font-bold uppercase tracking-wider hover:bg-[#5CB2FF]/90 transition-all duration-300 shadow-lg hover:shadow-[#5CB2FF]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5CB2FF]"
          >
            <Home className="w-4 h-4" />
            <span>Return to Studio</span>
          </Link>

          <Link
            href="/portfolio"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#122556] text-[#FFFFFF] border border-[#26407F] text-xs font-semibold uppercase tracking-wider hover:bg-[#1A3377] hover:border-[#5CB2FF]/50 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5CB2FF]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Browse Portfolio</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
