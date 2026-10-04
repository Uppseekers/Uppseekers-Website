import React, { useState, useEffect } from 'react';
import {
  PageRoute,
  DestinationCountry,
  DESTINATIONS,
} from '../data/uppseekersData';
import { ArrowRight, Menu, X, Check, ChevronDown } from 'lucide-react';

interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClass?: string;
  caption?: string;
  overlayClass?: string;
}

export const EditorialImage: React.FC<EditorialImageProps> = ({
  src,
  alt,
  className = '',
  aspectClass = 'aspect-[16/9]',
  caption,
  overlayClass = '',
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <figure className="w-full">
      <div className={`relative overflow-hidden bg-[#0D2947] ${aspectClass} ${className}`}>
        {!hasError ? (
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className="h-full w-full object-cover object-center transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="flex h-full w-full flex-col justify-between bg-gradient-to-br from-[#071A33] via-[#0D2947] to-[#164A78] p-8 text-[#F7F5F0]">
            <div className="h-[1px] w-12 bg-[#C4A56A]" />
            <div>
              <p className="font-serif text-xl italic text-[#F7F5F0]/90">{alt}</p>
              <p className="mt-2 text-xs tracking-wider text-[#E9F0F6]/60 uppercase">
                Uppseekers Editorial Archive
              </p>
            </div>
          </div>
        )}
        {overlayClass && <div className={`pointer-events-none absolute inset-0 ${overlayClass}`} />}
      </div>
      {caption && (
        <figcaption className="mt-2.5 font-serif text-xs italic text-[#1C2630]/65">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute, filterCountry?: DestinationCountry) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMoreOpen(false);
  }, [currentPage]);

  const primaryLinks: { label: string; path: PageRoute }[] = [
    { label: 'Approach', path: '/approach' },
    { label: 'Admissions', path: '/admissions' },
    { label: 'Profile Building', path: '/profile-building' },
    { label: 'Research', path: '/research' },
    { label: 'SAT', path: '/sat' },
    { label: 'Results', path: '/results' },
    { label: 'Insights', path: '/insights' },
  ];

  const secondaryLinks: { label: string; path: PageRoute }[] = [
    { label: 'Work Experience', path: '/work-experience' },
    { label: 'Student Stories', path: '/student-stories' },
    { label: 'Counsellors', path: '/counsellors' },
    { label: 'University Mentors', path: '/university-mentors' },
    { label: 'About Uppseekers', path: '/about' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-colors duration-200 ${
          scrolled || mobileMenuOpen
            ? 'border-b border-white/10 bg-[#071A33]/95 backdrop-blur-md'
            : 'border-b border-white/10 bg-[#071A33]/85 backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1360px] items-center justify-between px-5 sm:px-8 lg:h-20 lg:px-12">
          {/* Zone 1: Single text element wordmark */}
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="text-left font-serif text-xl font-semibold tracking-[0.18em] text-[#FFFFFF] uppercase transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-[#C4A56A]"
          >
            UPPSEEKERS
          </button>

          {/* Zone 2: Clean text navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex lg:items-center lg:gap-7"
          >
            {primaryLinks.map((item) => {
              const isActive = currentPage === item.path;
              return (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => onNavigate(item.path)}
                  className={`relative py-1 text-[14px] font-normal whitespace-nowrap transition-colors duration-150 ${
                    isActive
                      ? 'text-[#FFFFFF] underline decoration-[#C4A56A] decoration-1 underline-offset-8'
                      : 'text-[#E9F0F6]/80 hover:text-[#FFFFFF] hover:underline hover:decoration-white/40 hover:underline-offset-8'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            <div className="relative">
              <button
                type="button"
                onClick={() => setMoreOpen((prev) => !prev)}
                onBlur={() => setTimeout(() => setMoreOpen(false), 180)}
                className={`flex items-center gap-1 py-1 text-[14px] font-normal whitespace-nowrap transition-colors duration-150 ${
                  secondaryLinks.some((l) => l.path === currentPage)
                    ? 'text-[#FFFFFF] underline decoration-[#C4A56A] decoration-1 underline-offset-8'
                    : 'text-[#E9F0F6]/80 hover:text-[#FFFFFF]'
                }`}
              >
                <span>Advisory</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-75" />
              </button>

              {moreOpen && (
                <div className="absolute top-full right-0 mt-3 w-52 border border-white/15 bg-[#071A33] py-2 shadow-xl">
                  {secondaryLinks.map((sub) => (
                    <button
                      key={sub.path}
                      type="button"
                      onMouseDown={() => onNavigate(sub.path)}
                      className={`block w-full px-4 py-2.5 text-left text-[13px] whitespace-nowrap transition-colors ${
                        currentPage === sub.path
                          ? 'bg-[#0D2947] text-[#C4A56A]'
                          : 'text-[#E9F0F6]/85 hover:bg-[#0D2947] hover:text-white'
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Zone 3: Primary action */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('/contact')}
              className="hidden border border-[#C4A56A]/70 bg-transparent px-5 py-2.5 text-[13px] font-medium tracking-[0.08em] text-[#F7F5F0] uppercase whitespace-nowrap transition-colors duration-150 hover:border-[#C4A56A] hover:bg-[#C4A56A] hover:text-[#071A33] sm:inline-flex"
            >
              TALK TO AN ADVISOR
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Menu"
              className="inline-flex items-center gap-2 py-2 text-[13px] font-medium tracking-[0.14em] text-[#F7F5F0] uppercase lg:hidden"
            >
              <span>{mobileMenuOpen ? 'CLOSE' : 'MENU'}</span>
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Full Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-[#071A33] px-6 py-8 lg:hidden">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[...primaryLinks, ...secondaryLinks].map((item) => (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => onNavigate(item.path)}
                  className={`border-b border-white/10 py-3 text-left text-[15px] transition-colors ${
                    currentPage === item.path
                      ? 'font-medium text-[#C4A56A]'
                      : 'text-[#F7F5F0]/90 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => onNavigate('/contact')}
                className="w-full bg-[#C4A56A] px-5 py-3.5 text-center text-[13px] font-semibold tracking-[0.08em] text-[#071A33] uppercase"
              >
                BUILD MY CHILD&apos;S ROADMAP →
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Sticky Bottom CTA (compact to stay well within 15% mobile viewport cap) */}
      {currentPage !== '/contact' && (
        <div className="fixed right-0 bottom-0 left-0 z-40 border-t border-white/15 bg-[#071A33]/95 px-4 py-2.5 backdrop-blur-md lg:hidden">
          <button
            type="button"
            onClick={() => onNavigate('/contact')}
            className="flex w-full items-center justify-center gap-2 bg-[#C4A56A] px-4 py-2.5 text-[12px] font-semibold tracking-[0.08em] text-[#071A33] uppercase whitespace-nowrap"
          >
            <span>BUILD MY CHILD&apos;S ROADMAP</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </>
  );
};

interface FinalCTAProps {
  onNavigate: (page: PageRoute) => void;
  eyebrow?: string;
  headline?: string;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  onNavigate,
  eyebrow = 'START WITH THE DESTINATION',
  headline = "DON'T WAIT FOR APPLICATION SEASON.",
}) => {
  return (
    <section className="border-t border-white/10 bg-[#071A33] py-20 text-[#F7F5F0] lg:py-28">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <p className="text-[13px] tracking-[0.16em] text-[#C4A56A] uppercase">{eyebrow}</p>
          <h2 className="mt-4 font-serif text-[32px] leading-[1.12] font-normal text-[#FFFFFF] md:text-[44px]">
            {headline}
          </h2>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[17px] text-[#E9F0F6]/85">
            <span>Start earlier.</span>
            <span aria-hidden="true" className="text-[#C4A56A]">
              ·
            </span>
            <span>Understand the destination.</span>
            <span aria-hidden="true" className="text-[#C4A56A]">
              ·
            </span>
            <span>Build deliberately.</span>
            <span aria-hidden="true" className="text-[#C4A56A]">
              ·
            </span>
            <span>Prepare with confidence.</span>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('/contact')}
              className="inline-flex items-center gap-3 bg-[#C4A56A] px-7 py-4 text-[13px] font-semibold tracking-[0.08em] text-[#071A33] uppercase whitespace-nowrap transition-colors duration-150 hover:bg-[#d3b67d]"
            >
              <span>BUILD MY CHILD&apos;S ROADMAP</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/contact')}
              className="inline-flex items-center gap-2 border border-white/25 px-7 py-4 text-[13px] font-medium tracking-[0.08em] text-[#F7F5F0] uppercase whitespace-nowrap transition-colors duration-150 hover:border-white hover:bg-white/5"
            >
              <span>TALK TO AN ADVISOR</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

interface FooterProps {
  onNavigate: (page: PageRoute, filterCountry?: DestinationCountry) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | 'consent' | null>(null);

  const navItems: { label: string; path: PageRoute }[] = [
    { label: 'Approach', path: '/approach' },
    { label: 'Admissions', path: '/admissions' },
    { label: 'Profile Building', path: '/profile-building' },
    { label: 'Research', path: '/research' },
    { label: 'Work Experience', path: '/work-experience' },
    { label: 'SAT', path: '/sat' },
    { label: 'Results', path: '/results' },
    { label: 'Student Stories', path: '/student-stories' },
    { label: 'Counsellors', path: '/counsellors' },
    { label: 'University Mentors', path: '/university-mentors' },
    { label: 'Insights', path: '/insights' },
    { label: 'About', path: '/about' },
  ];

  return (
    <footer className="border-t border-white/10 bg-[#071A33] pb-20 text-[#F7F5F0] lg:pb-16">
      <div className="mx-auto max-w-[1360px] px-5 pt-16 sm:px-8 lg:px-12 lg:pt-20">
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-16 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="font-serif text-2xl font-semibold tracking-[0.18em] text-[#FFFFFF] uppercase"
            >
              UPPSEEKERS
            </button>
            <p className="mt-4 font-serif text-xl italic text-[#E9F0F6]/90">
              Undergraduate admissions.
              <br />
              Built earlier.
            </p>
            <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-[#E9F0F6]/70">
              Private international admissions advisory and longitudinal student development for
              families in Classes 8 to 12.
            </p>
            <div className="mt-8">
              <button
                type="button"
                onClick={() => onNavigate('/contact')}
                className="inline-flex items-center gap-2.5 border border-[#C4A56A] px-6 py-3 text-[12px] font-semibold tracking-[0.08em] text-[#C4A56A] uppercase whitespace-nowrap transition-colors duration-150 hover:bg-[#C4A56A] hover:text-[#071A33]"
              >
                <span>BUILD MY CHILD&apos;S ROADMAP</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-5">
            <p className="text-[12px] font-medium tracking-[0.14em] text-[#C4A56A] uppercase">
              Navigation
            </p>
            <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => onNavigate(item.path)}
                  className="text-left text-[14px] text-[#E9F0F6]/75 transition-colors hover:text-white"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Destinations Column */}
          <div className="lg:col-span-3">
            <p className="text-[12px] font-medium tracking-[0.14em] text-[#C4A56A] uppercase">
              Destinations
            </p>
            <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
              {DESTINATIONS.map((country) => (
                <button
                  key={country}
                  type="button"
                  onClick={() => onNavigate('/results', country)}
                  className="text-left text-[14px] text-[#E9F0F6]/75 transition-colors hover:text-white"
                >
                  {country}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Legal Row */}
        <div className="flex flex-col items-start justify-between gap-4 pt-8 text-[13px] text-[#E9F0F6]/60 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Uppseekers Advisory. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() => setLegalModal('privacy')}
              className="hover:text-white"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => setLegalModal('terms')}
              className="hover:text-white"
            >
              Terms
            </button>
            <button
              type="button"
              onClick={() => setLegalModal('consent')}
              className="hover:text-white"
            >
              Student Data &amp; Consent
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/admin')}
              className="rounded border border-[#C4A56A]/40 bg-[#071A33] px-2.5 py-1 text-[11px] font-semibold text-[#C4A56A] uppercase tracking-wider hover:border-[#C4A56A] hover:text-white transition-colors"
            >
              Admin / CMS Portal
            </button>
          </div>
        </div>
      </div>

      {/* Legal Policy Modal */}
      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="max-w-xl border border-white/15 bg-[#0D2947] p-8 text-[#F7F5F0]">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-serif text-2xl text-white">
                {legalModal === 'privacy' && 'Privacy Policy'}
                {legalModal === 'terms' && 'Terms of Advisory'}
                {legalModal === 'consent' && 'Student Data & Consent Standard'}
              </h3>
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                className="p-1 text-[#E9F0F6]/70 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 space-y-3 text-[14px] leading-relaxed text-[#E9F0F6]/85">
              {legalModal === 'privacy' && (
                <p>
                  Family contact details shared through our Roadmap Builder are used exclusively by
                  senior Uppseekers advisors to prepare for your initial consultation. We never sell,
                  rent, or distribute parent or student contact records to third-party institutions.
                </p>
              )}
              {legalModal === 'terms' && (
                <p>
                  Uppseekers provides educational counselling, academic roadmap planning, research
                  mentorship, and test preparation. University admissions decisions rest solely with
                  the admitting institutions; Uppseekers does not guarantee admission or journal
                  publication.
                </p>
              )}
              {legalModal === 'consent' && (
                <p>
                  In strict accordance with our student privacy standard, detailed student journeys
                  are published only where explicit family approval is recorded, using First Name
                  and Last Initial. Unapproved student records are anonymised as Student A, B, etc.,
                  with all personal contact and application identifiers removed.
                </p>
              )}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                className="bg-[#C4A56A] px-5 py-2 text-[12px] font-semibold tracking-wider text-[#071A33] uppercase"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

interface LeadFormProps {
  embedded?: boolean;
  initialDestination?: DestinationCountry;
}

export const LeadForm: React.FC<LeadFormProps> = ({ embedded = false, initialDestination }) => {
  const [selectedClass, setSelectedClass] = useState<string>('9');
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(
    initialDestination ? [initialDestination] : ['USA', 'UK']
  );
  const [lookingFor, setLookingFor] = useState<string[]>(['Complete Roadmap']);
  const [parentName, setParentName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const classOptions = ['8', '9', '10', '11', '12'];
  const destinationOptions = [
    'USA',
    'UK',
    'Singapore',
    'Germany',
    'Australia',
    'Hong Kong',
    'Canada',
    'Europe',
    'Not sure',
  ];
  const serviceOptions = [
    'Admissions',
    'Profile Building',
    'Research',
    'SAT',
    'Complete Roadmap',
    'Not Sure Yet',
  ];

  const toggleItem = (list: string[], setList: (v: string[]) => void, item: string) => {
    if (list.includes(item)) {
      if (list.length > 1) {
        setList(list.filter((i) => i !== item));
      }
    } else {
      setList([...list, item]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName.trim()) {
      setError('Please enter the parent or guardian’s name.');
      return;
    }
    if (!whatsapp.trim() || whatsapp.trim().length < 7) {
      setError('Please provide a valid WhatsApp contact number.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  const getStageRecommendation = (cls: string) => {
    switch (cls) {
      case '8':
        return 'Stage: DISCOVER — Focus on academic curiosity, reading breadth, foundational quantitative strength, and early interest discovery.';
      case '9':
        return 'Stage: EXPLORE — Audit subject choices, initiate 1–2 meaningful projects or competitions, and map potential interdisciplinary directions.';
      case '10':
        return 'Stage: DEEPEN — Finalise Class 11–12 curriculum choices, plan independent research or work exposure, and establish a baseline SAT diagnostic.';
      case '11':
        return 'Stage: POSITION — Execute research mentorship, complete SAT testing, and calibrate the international university & course shortlist.';
      case '12':
      default:
        return 'Stage: APPLY — Synthesise the student’s intellectual story across personal statements, supplemental essays, interviews, and final university selections.';
    }
  };

  if (submitted) {
    return (
      <div className="border border-[#1C2630]/15 bg-[#FFFFFF] p-8 sm:p-12">
        <div className="inline-flex h-10 w-10 items-center justify-center bg-[#071A33] text-[#C4A56A]">
          <Check className="h-5 w-5" />
        </div>
        <p className="mt-6 text-[12px] font-medium tracking-[0.14em] text-[#164A78] uppercase">
          ROADMAP BRIEF REGISTERED
        </p>
        <h3 className="mt-2 font-serif text-3xl text-[#071A33]">
          Thank you, {parentName}. A Senior Advisor will reach out shortly.
        </h3>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#1C2630]/80">
          We have recorded your child&apos;s stage and target destinations. Before our conversation,
          here is the initial developmental focus for a student in{' '}
          <strong className="font-semibold text-[#071A33]">Class {selectedClass}</strong>:
        </p>

        <div className="mt-8 border-l-2 border-[#C4A56A] bg-[#F7F5F0] p-6">
          <p className="text-[13px] font-semibold tracking-wider text-[#071A33] uppercase">
            Preliminary Stage Brief · Class {selectedClass}
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-[#1C2630]">
            {getStageRecommendation(selectedClass)}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#1C2630]/10 pt-4 text-[13px] text-[#1C2630]/75">
            <span>
              <strong>Destinations:</strong> {selectedDestinations.join(', ')}
            </span>
            <span>
              <strong>Focus Areas:</strong> {lookingFor.join(', ')}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-8 text-[13px] font-medium tracking-wider text-[#164A78] uppercase underline underline-offset-4 hover:text-[#071A33]"
        >
          Update Roadmap Details
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`border border-[#1C2630]/15 bg-[#FFFFFF] ${
        embedded ? 'p-7 sm:p-10' : 'p-8 sm:p-12'
      }`}
    >
      {/* Step 1 */}
      <div>
        <label className="block text-[12px] font-semibold tracking-[0.14em] text-[#071A33] uppercase">
          01. Child&apos;s Current Class
        </label>
        <div className="mt-3 grid grid-cols-5 gap-2.5">
          {classOptions.map((cls) => {
            const active = selectedClass === cls;
            return (
              <button
                key={cls}
                type="button"
                onClick={() => setSelectedClass(cls)}
                className={`border py-3 text-center text-[14px] font-medium transition-colors duration-150 ${
                  active
                    ? 'border-[#071A33] bg-[#071A33] text-[#FFFFFF]'
                    : 'border-[#1C2630]/20 bg-[#F7F5F0]/60 text-[#1C2630] hover:border-[#071A33]'
                }`}
              >
                Class {cls}
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2 */}
      <div className="mt-8">
        <label className="block text-[12px] font-semibold tracking-[0.14em] text-[#071A33] uppercase">
          02. Destinations Under Consideration
        </label>
        <div className="mt-3 flex flex-wrap gap-2">
          {destinationOptions.map((dest) => {
            const active = selectedDestinations.includes(dest);
            return (
              <button
                key={dest}
                type="button"
                onClick={() => toggleItem(selectedDestinations, setSelectedDestinations, dest)}
                className={`border px-4 py-2 text-[13px] font-medium whitespace-nowrap transition-colors duration-150 ${
                  active
                    ? 'border-[#0D2947] bg-[#0D2947] text-[#FFFFFF]'
                    : 'border-[#1C2630]/20 bg-[#FFFFFF] text-[#1C2630] hover:border-[#0D2947]'
                }`}
              >
                {dest}
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 3 */}
      <div className="mt-8">
        <label className="block text-[12px] font-semibold tracking-[0.14em] text-[#071A33] uppercase">
          03. What Are You Looking For?
        </label>
        <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {serviceOptions.map((srv) => {
            const active = lookingFor.includes(srv);
            return (
              <button
                key={srv}
                type="button"
                onClick={() => toggleItem(lookingFor, setLookingFor, srv)}
                className={`border px-3.5 py-2.5 text-left text-[13px] font-medium whitespace-nowrap transition-colors duration-150 ${
                  active
                    ? 'border-[#164A78] bg-[#E9F0F6] text-[#071A33]'
                    : 'border-[#1C2630]/20 bg-[#FFFFFF] text-[#1C2630] hover:border-[#164A78]'
                }`}
              >
                {srv}
              </button>
            );
          })}
        </div>
      </div>

      {/* Steps 4, 5, 6 */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div>
          <label
            htmlFor="parent-name"
            className="block text-[12px] font-semibold tracking-[0.12em] text-[#071A33] uppercase"
          >
            04. Parent Name
          </label>
          <input
            id="parent-name"
            type="text"
            value={parentName}
            onChange={(e) => setParentName(e.target.value)}
            placeholder="e.g. Rajesh Mehta"
            className="mt-2 w-full border border-[#1C2630]/25 bg-[#F7F5F0]/40 px-4 py-3 text-[15px] text-[#1C2630] placeholder:text-[#1C2630]/40 focus:border-[#071A33] focus:bg-white focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="whatsapp-number"
            className="block text-[12px] font-semibold tracking-[0.12em] text-[#071A33] uppercase"
          >
            05. WhatsApp Number
          </label>
          <input
            id="whatsapp-number"
            type="tel"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="+91 98200 00000"
            className="mt-2 w-full border border-[#1C2630]/25 bg-[#F7F5F0]/40 px-4 py-3 text-[15px] text-[#1C2630] placeholder:text-[#1C2630]/40 focus:border-[#071A33] focus:bg-white focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="parent-email"
            className="block text-[12px] font-semibold tracking-[0.12em] text-[#071A33] uppercase"
          >
            06. Email Address
          </label>
          <input
            id="parent-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="parent@domain.com"
            className="mt-2 w-full border border-[#1C2630]/25 bg-[#F7F5F0]/40 px-4 py-3 text-[15px] text-[#1C2630] placeholder:text-[#1C2630]/40 focus:border-[#071A33] focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-5">
        <label
          htmlFor="optional-context"
          className="block text-[12px] font-medium tracking-[0.1em] text-[#1C2630]/70 uppercase"
        >
          Optional Context (School curriculum or current academic interests)
        </label>
        <input
          id="optional-context"
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g. IBDP / CBSE, interested in Economics, Computer Science, or Design"
          className="mt-2 w-full border border-[#1C2630]/20 bg-[#F7F5F0]/40 px-4 py-2.5 text-[14px] text-[#1C2630] placeholder:text-[#1C2630]/40 focus:border-[#071A33] focus:bg-white focus:outline-none"
        />
      </div>

      {error && (
        <p className="mt-4 text-[13px] font-medium text-[#9A3412]" role="alert">
          {error}
        </p>
      )}

      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-[#1C2630]/10 pt-6 sm:flex-row sm:items-center">
        <p className="max-w-md text-[13px] leading-relaxed text-[#1C2630]/70">
          We&apos;ll use these details to understand your goals and connect you with the
          appropriate Uppseekers advisor.
        </p>
        <button
          type="submit"
          className="inline-flex items-center gap-3 bg-[#071A33] px-8 py-4 text-[13px] font-semibold tracking-[0.08em] text-[#FFFFFF] uppercase whitespace-nowrap transition-colors duration-150 hover:bg-[#0D2947]"
        >
          <span>BUILD MY CHILD&apos;S ROADMAP</span>
          <ArrowRight className="h-4 w-4 text-[#C4A56A]" />
        </button>
      </div>
    </form>
  );
};
