'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Film, Sparkles, Wand2, Eye, Compass } from 'lucide-react';
import StretchSnapText from '../motion/StretchSnapText';
import { TransitionLink } from '../motion/TransitionProvider';

const SERVICES = [
  {
    number: '01',
    title: 'Brand Promotion',
    subtitle: 'Commercial videos for companies',
    description: 'Transform complex products, e-commerce collections, and SaaS platforms into high-converting commercial brand films engineered for modern social feeds.',
    icon: Film,
    metric: 'Commercial & E-Commerce',
    gradient: 'from-[#195052]/40 to-[#103638]/60',
  },
  {
    number: '02',
    title: 'Kids Animation',
    subtitle: 'Educational and storytelling animation videos',
    description: 'Whimsical 3D character animation, educational musical series, and engaging preschool narratives designed to captivate young global audiences.',
    icon: Sparkles,
    metric: '3D Character & Educational',
    gradient: 'from-[#103638]/70 to-[#174448]/50',
  },
  {
    number: '03',
    title: 'Storytelling / Product Ads',
    subtitle: 'Narrative marketing videos',
    description: 'Cinematic storytelling that connects on a human level. Narrative brand documentaries, founder journeys, and emotionally resonant product spots.',
    icon: Wand2,
    metric: 'Narrative & Documentary',
    gradient: 'from-[#195052]/30 to-[#103638]/60',
  },
  {
    number: '04',
    title: 'Cinematography',
    subtitle: 'Cinematic editing and visual storytelling',
    description: 'Breathtaking drone captures, dynamic color grading, precision rhythmic cutting, and high-production-value landscape filmmaking.',
    icon: Compass,
    metric: '4K Aerial & Color Grading',
    gradient: 'from-[#174448]/60 to-[#103638]/70',
  },
  {
    number: '05',
    title: 'Explanation Videos',
    subtitle: 'AI-powered explainer videos',
    description: 'Intricate 3D anatomical, medical, and scientific visualization videos that explain difficult concepts with viral clarity and mathematical precision.',
    icon: Eye,
    metric: '3D Scientific & Anatomical',
    gradient: 'from-[#195052]/50 to-[#174448]/60',
  },
];

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, idx) => {
        if (!card) return;
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-4 bg-transparent border-t border-[#254845] overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute top-1/2 -right-40 w-96 h-96 bg-[#195052]/15 rounded-full blur-[140px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <StretchSnapText
              as="h2"
              level="display"
              className="font-editorial text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F7FCFA] leading-none"
            >
              Services <span className="text-[#65C6B5] italic font-normal">&amp; Verticals</span>
            </StretchSnapText>
          </div>
          <StretchSnapText
            as="p"
            level="subtle"
            split="words"
            className="text-[#D9F0EA] max-w-md text-sm sm:text-base leading-relaxed"
          >
            Five specialized creative pipelines fusing advanced AI modeling, cinematic camera craft, and narrative pacing.
          </StretchSnapText>
        </div>

        {/* Asymmetric Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((srv, index) => {
            const Icon = srv.icon;
            const isLarge = index === 0 || index === 4;

            return (
              <div
                key={srv.number}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`group relative rounded-3xl p-8 border border-[#315B58]/50 bg-gradient-to-br ${srv.gradient} bg-[#103638]/85 backdrop-blur-xl hover:border-[#65C6B5] hover:bg-[#174448] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#195052]/30 flex flex-col justify-between ${
                  isLarge ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Card Top: Number & Category Icon */}
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-[#254845]">
                    <span className="font-mono text-xs font-bold tracking-widest text-[#65C6B5]">
                      {srv.number}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-[#071F22]/70 border border-[#315B58] flex items-center justify-center group-hover:border-[#65C6B5]/60 transition-colors">
                      <Icon className="w-5 h-5 text-[#65C6B5]" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <StretchSnapText
                    as="h3"
                    level="secondary"
                    className="font-editorial text-2xl sm:text-3xl font-bold text-[#F7FCFA] mt-6 group-hover:text-[#65C6B5] transition-colors leading-tight"
                  >
                    {srv.title}
                  </StretchSnapText>
                  <div className="text-xs uppercase font-mono tracking-wider text-[#B5CEC7] mt-1 font-medium">
                    {srv.subtitle}
                  </div>

                  {/* Description */}
                  <StretchSnapText
                    as="p"
                    level="subtle"
                    split="words"
                    className="text-[#D9F0EA] text-sm mt-4 leading-relaxed"
                  >
                    {srv.description}
                  </StretchSnapText>
                </div>

                {/* Card Footer: Metric & Action */}
                <div className="pt-8 mt-8 border-t border-[#254845] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#B5CEC7]">
                    {srv.metric}
                  </span>
                  <TransitionLink
                    href="/services"
                    className="w-8 h-8 rounded-full bg-[#071F22]/70 border border-[#315B58] flex items-center justify-center text-[#D9F0EA] group-hover:bg-[#65C6B5] group-hover:text-[#071F22] group-hover:rotate-45 transition-all duration-300"
                    aria-label={`View ${srv.title} service details`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </TransitionLink>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Bottom CTA to Dedicated Services Route */}
        <div className="mt-16 text-center">
          <TransitionLink
            href="/services"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#103638] hover:bg-[#174448] text-[#F7FCFA] font-semibold text-xs uppercase tracking-wider border border-[#315B58] hover:border-[#65C6B5]/50 transition-all duration-300 shadow-xl group"
          >
            <StretchSnapText as="span" level="subtle" split="words" interactive>
              View All Services
            </StretchSnapText>
            <ArrowUpRight className="w-4 h-4 text-[#65C6B5] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </TransitionLink>
        </div>
      </div>
    </section>
  );
}
