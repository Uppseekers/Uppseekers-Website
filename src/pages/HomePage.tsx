import React, { useState } from 'react';
import {
  PageRoute,
  DestinationCountry,
  DESTINATIONS,
  UNIVERSITY_MENTORS_DATA,
  SHEET_STUDENTS_DATA,
  IMAGES,
} from '../data/uppseekersData';
import { useSiteData } from '../context/SiteDataContext';
import { EditorialImage, FinalCTA } from '../components/SharedComponents';
import { ArrowRight } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageRoute, filterCountry?: DestinationCountry) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { universities, counsellors, counsellorsExpansionNote, pagesContent } = useSiteData();
  const pageCopy = pagesContent.home || {
    heroEyebrow: 'UNDERGRADUATE ADMISSIONS · CLASS 8–12',
    heroHeadline: 'THE JOURNEY TO A GREAT UNIVERSITY STARTS LONG BEFORE THE APPLICATION.',
    heroSubhead:
      'Uppseekers helps ambitious students build their academic direction, experiences, research, testing and application strategy for leading universities around the world.',
  };

  const [selectedCountry, setSelectedCountry] = useState<'All' | DestinationCountry>('All');
  const [activeStoryId, setActiveStoryId] = useState<string>(SHEET_STUDENTS_DATA[0].id);

  const filteredResults =
    selectedCountry === 'All'
      ? SHEET_STUDENTS_DATA.slice(0, 12)
      : SHEET_STUDENTS_DATA.filter((r) => r.country === selectedCountry);

  const approvedStories = SHEET_STUDENTS_DATA.slice(0, 6);
  const currentStory =
    approvedStories.find((s) => s.id === activeStoryId) || approvedStories[0];

  const journeyStages = [
    {
      grade: 'CLASS 8',
      phase: 'DISCOVER',
      items: ['Interests', 'Strengths', 'Academic direction'],
      detail: 'Broad intellectual exposure, foundational reading, and identifying natural curiosities without premature pressure.',
    },
    {
      grade: 'CLASS 9',
      phase: 'EXPLORE',
      items: ['Projects', 'Competitions', 'Experiences'],
      detail: 'Testing academic interests through structured projects, foundational olympiads, and subject selection alignment.',
    },
    {
      grade: 'CLASS 10',
      phase: 'DEEPEN',
      items: ['Research', 'Leadership', 'Work exposure'],
      detail: 'Transitioning from broad participation to focused inquiry, industry simulations, and diagnostic test planning.',
    },
    {
      grade: 'CLASS 11',
      phase: 'POSITION',
      items: ['SAT', 'University strategy', 'Profile development'],
      detail: 'Completing standardized testing, authoring independent research, and calibrating the global university shortlist.',
    },
    {
      grade: 'CLASS 12',
      phase: 'APPLY',
      items: ['Applications', 'Essays', 'Interviews', 'Scholarships'],
      detail: 'Synthesising multi-year growth into compelling essays, personal statements, interviews, and final admission decisions.',
    },
  ];

  const backwardSteps = [
    {
      step: '01',
      label: 'UNIVERSITY',
      desc: 'Target institutions across the US, UK, Singapore, Canada, Europe, Germany, Hong Kong, or Australia.',
    },
    {
      step: '02',
      label: 'COURSE / MAJOR',
      desc: 'Specific academic discipline, faculty structure, and interdisciplinary combinations.',
    },
    {
      step: '03',
      label: 'ADMISSIONS EXPECTATIONS',
      desc: 'What selectors in that country and department require as intellectual and personal evidence.',
    },
    {
      step: '04',
      label: 'STUDENT PROFILE',
      desc: 'The cohesive narrative connecting classroom rigor with independent thought.',
    },
    {
      step: '05',
      label: 'EXPERIENCES',
      desc: 'Sustained real-world engagement, job simulations, internships, and leadership.',
    },
    {
      step: '06',
      label: 'RESEARCH · PROJECTS · COMPETITIONS',
      desc: 'Original academic papers, technical builds, portfolios, and subject olympiads.',
    },
    {
      step: '07',
      label: 'ACADEMICS + TESTING',
      desc: 'IB, A-Level, CBSE, or ISC subject combinations paired with planned SAT and admissions testing.',
    },
    {
      step: '08',
      label: 'CLASS 8',
      desc: 'Where curiosity is first nurtured and the multi-year foundation quietly begins.',
    },
  ];

  return (
    <div>
      {/* 13 & 14 — HOMEPAGE HERO + HERO PROOF */}
      <section className="relative bg-[#071A33] pt-28 pb-16 text-[#F7F5F0] lg:pt-36 lg:pb-24">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <p className="text-[13px] font-medium tracking-[0.18em] text-[#C4A56A] uppercase">
                {pageCopy.heroEyebrow}
              </p>
              <h1 className="mt-5 font-serif text-[36px] leading-[1.08] font-normal text-[#FFFFFF] sm:text-[48px] lg:text-[58px]">
                {pageCopy.heroHeadline}
              </h1>
              <p className="mt-6 max-w-2xl text-[17px] leading-[1.65] text-[#E9F0F6]/85 sm:text-[18px]">
                {pageCopy.heroSubhead}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('/contact')}
                  className="inline-flex items-center gap-3 bg-[#C4A56A] px-7 py-4 text-[13px] font-semibold tracking-[0.08em] text-[#071A33] uppercase whitespace-nowrap transition-colors duration-150 hover:bg-[#d4b77e]"
                >
                  <span>BUILD MY CHILD&apos;S ROADMAP</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/approach')}
                  className="inline-flex items-center gap-2 border border-white/25 px-7 py-4 text-[13px] font-medium tracking-[0.08em] text-[#FFFFFF] uppercase whitespace-nowrap transition-colors duration-150 hover:border-white hover:bg-white/5"
                >
                  <span>EXPLORE OUR APPROACH</span>
                </button>
              </div>

              {/* Subtle bottom timeline strip */}
              <div className="mt-12 border-t border-white/10 pt-6">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px] tracking-[0.14em] text-[#E9F0F6]/65 uppercase">
                  <span>CLASS 8</span>
                  <span aria-hidden="true" className="text-[#C4A56A]">
                    →
                  </span>
                  <span>CLASS 9</span>
                  <span aria-hidden="true" className="text-[#C4A56A]">
                    →
                  </span>
                  <span>CLASS 10</span>
                  <span aria-hidden="true" className="text-[#C4A56A]">
                    →
                  </span>
                  <span>CLASS 11</span>
                  <span aria-hidden="true" className="text-[#C4A56A]">
                    →
                  </span>
                  <span>CLASS 12</span>
                  <span aria-hidden="true" className="text-[#C4A56A]">
                    →
                  </span>
                  <span className="font-medium text-[#FFFFFF]">UNIVERSITY</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="border border-white/15 bg-[#0D2947] p-2">
                <EditorialImage
                  src={IMAGES.heroQuad}
                  alt="Student walking through a historic university quadrangle at morning light"
                  aspectClass="aspect-[4/3] lg:aspect-[5/6]"
                  overlayClass="bg-gradient-to-t from-[#071A33]/60 via-transparent to-transparent"
                />
              </div>
            </div>
          </div>

          {/* 14 — HERO PROOF */}
          <div className="mt-16 border-t border-white/15 pt-10 lg:mt-20">
            <div className="grid grid-cols-1 items-baseline gap-8 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-4xl font-normal text-[#C4A56A] tabular-nums sm:text-5xl">
                    133+
                  </span>
                  <span className="text-[14px] font-semibold tracking-[0.16em] text-[#FFFFFF] uppercase">
                    ADMISSIONS
                  </span>
                </div>
                <p className="mt-2 text-[15px] text-[#E9F0F6]/85">
                  Across leading universities in the US, UK, Singapore, Germany, Australia, Hong
                  Kong and beyond.
                </p>
              </div>

              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] font-medium tracking-[0.16em] text-[#E9F0F6]/75 uppercase">
                  {DESTINATIONS.map((dest, idx) => (
                    <React.Fragment key={dest}>
                      <button
                        type="button"
                        onClick={() => onNavigate('/results', dest)}
                        className="transition-colors hover:text-[#C4A56A]"
                      >
                        {dest}
                      </button>
                      {idx < DESTINATIONS.length - 1 && (
                        <span aria-hidden="true" className="text-white/25">
                          ·
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 15 — HOMEPAGE PROOF SECTION */}
      <section className="bg-[#F7F5F0] py-20 text-[#1C2630] lg:py-28">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-[12px] font-semibold tracking-[0.16em] text-[#164A78] uppercase">
              UNIVERSITIES WHERE OUR STUDENTS HAVE BEEN ADMITTED
            </p>
            <h2 className="mt-3 font-serif text-[34px] leading-[1.12] text-[#071A33] md:text-[46px]">
              MASTERED UNIVERSITY ADMISSIONS.
            </h2>
            <p className="mt-3 font-serif text-[22px] italic text-[#0D2947] md:text-[26px]">
              133+ admissions across leading universities worldwide.
            </p>
            <p className="mt-4 text-[16px] leading-relaxed text-[#1C2630]/80">
              Our students have secured admissions across leading universities across multiple
              countries and education systems.
            </p>
          </div>

          {/* Editorial Typographic University Wall */}
          <div className="mt-12 grid grid-cols-2 border-t border-l border-[#1C2630]/15 sm:grid-cols-3 lg:grid-cols-4">
            {universities.slice(0, 24).map((uni) => (
              <button
                key={uni.name}
                type="button"
                onClick={() => onNavigate('/results', uni.country)}
                className="group flex flex-col justify-between border-r border-b border-[#1C2630]/15 bg-[#FFFFFF]/70 p-6 text-left transition-colors duration-150 hover:bg-[#071A33] hover:text-[#FFFFFF]"
              >
                <div className="flex items-center justify-between text-[11px] tracking-[0.14em] text-[#1C2630]/55 uppercase group-hover:text-[#C4A56A]">
                  <span>{uni.country}</span>
                  <span>{uni.city}</span>
                </div>
                <p className="mt-5 font-serif text-[20px] leading-snug font-medium text-[#071A33] group-hover:text-[#FFFFFF]">
                  {uni.name}
                </p>
                <p className="mt-3 text-[12px] text-[#1C2630]/65 group-hover:text-[#E9F0F6]/75">
                  {uni.notableCourses.slice(0, 2).join(' · ')}
                </p>
              </button>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="text-[13px] text-[#1C2630]/65">
              Verified student outcomes recorded across US, UK, Singapore, Canadian, European, and
              Australian admissions cycles.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('/results')}
              className="inline-flex items-center gap-2 text-[13px] font-semibold tracking-[0.08em] text-[#071A33] uppercase underline decoration-[#C4A56A] underline-offset-8 hover:text-[#164A78]"
            >
              <span>EXPLORE ALL 133+ ADMISSIONS</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 16 — HOMEPAGE: WHY START EARLY */}
      <section className="bg-[#071A33] py-20 text-[#F7F5F0] lg:py-28">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <p className="text-[12px] font-medium tracking-[0.16em] text-[#C4A56A] uppercase">
                THE CASE FOR TIME
              </p>
              <h2 className="mt-4 font-serif text-[34px] leading-[1.12] text-[#FFFFFF] md:text-[46px]">
                MOST FAMILIES START THINKING ABOUT UNIVERSITY TOO LATE.
              </h2>
              <p className="mt-6 text-[17px] leading-relaxed text-[#E9F0F6]/80">
                By Class 11 or 12, families often start asking:
              </p>

              <ul className="mt-6 space-y-3.5 border-l border-[#C4A56A]/50 pl-6">
                {[
                  'Which universities should we target?',
                  'Is my child’s profile strong enough?',
                  'Should they take the SAT?',
                  'Should they pursue research?',
                  'Which competitions matter?',
                  'What experiences should they have built?',
                  'What should they be doing right now?',
                ].map((question) => (
                  <li
                    key={question}
                    className="font-serif text-[21px] italic text-[#E9F0F6]/95"
                  >
                    &ldquo;{question}&rdquo;
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-white/15 bg-[#0D2947] p-8 sm:p-12 lg:col-span-6">
              <div className="h-[1px] w-16 bg-[#C4A56A]" />
              <h3 className="mt-6 font-serif text-[36px] leading-[1.1] text-[#FFFFFF] sm:text-[44px]">
                WE START EARLIER.
              </h3>
              <p className="mt-6 text-[18px] leading-relaxed text-[#E9F0F6]/90">
                Because the strongest profiles are not assembled in the final year.
              </p>
              <p className="mt-3 font-serif text-[24px] italic text-[#C4A56A]">
                They are developed over time.
              </p>
              <p className="mt-6 text-[15px] leading-relaxed text-[#E9F0F6]/75">
                Working with students from Class 8 onwards allows academic curiosity, reading habits,
                projects, research, and testing to unfold naturally—without last-minute panic or
                superficial resume padding.
              </p>
              <div className="mt-8 pt-4">
                <button
                  type="button"
                  onClick={() => onNavigate('/contact')}
                  className="inline-flex items-center gap-3 bg-[#C4A56A] px-6 py-3.5 text-[13px] font-semibold tracking-[0.08em] text-[#071A33] uppercase whitespace-nowrap transition-colors hover:bg-[#d4b77e]"
                >
                  <span>BUILD MY CHILD&apos;S ROADMAP</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 17 & 18 — HOMEPAGE: THE JOURNEY + UPPSEEKERS METHOD */}
      <section className="bg-[#F7F5F0] py-20 text-[#1C2630] lg:py-28">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-[12px] font-semibold tracking-[0.16em] text-[#164A78] uppercase">
              CLASS 8 TO CLASS 12 ROADMAP
            </p>
            <h2 className="mt-3 font-serif text-[34px] leading-[1.12] text-[#071A33] md:text-[46px]">
              ONE STUDENT. ONE STRATEGY. YEARS OF DIRECTION.
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-[#1C2630]/80">
              Every student has a different starting point. Different strengths. Different
              interests. Different ambitions. Different destinations. Our role is to understand the
              student and build a journey around them.
            </p>
          </div>

          {/* Subtle gold line connecting DISCOVER -> BUILD -> DEEPEN -> PREPARE -> APPLY */}
          <div className="mt-12 hidden lg:block">
            <div className="relative flex items-center justify-between border-t border-[#C4A56A] pt-4">
              {['DISCOVER', 'BUILD', 'DEEPEN', 'PREPARE', 'APPLY'].map((stage, i) => (
                <div key={stage} className="flex items-center gap-2">
                  <span className="font-mono text-[12px] text-[#164A78]">0{i + 1}</span>
                  <span className="text-[12px] font-semibold tracking-[0.16em] text-[#071A33] uppercase">
                    {stage}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Horizontal Timeline Grid */}
          <div className="mt-8 grid grid-cols-1 border-t border-l border-[#1C2630]/15 md:grid-cols-5">
            {journeyStages.map((stage) => (
              <div
                key={stage.grade}
                className="flex flex-col justify-between border-r border-b border-[#1C2630]/15 bg-[#FFFFFF] p-7"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-semibold tracking-[0.14em] text-[#164A78] uppercase">
                      {stage.grade}
                    </span>
                    <span className="h-1.5 w-1.5 bg-[#C4A56A]" />
                  </div>
                  <h3 className="mt-3 font-serif text-[26px] font-medium text-[#071A33]">
                    {stage.phase}
                  </h3>
                  <ul className="mt-5 space-y-2 border-t border-[#1C2630]/10 pt-4">
                    {stage.items.map((item) => (
                      <li
                        key={item}
                        className="text-[14px] font-medium text-[#0D2947]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="mt-6 text-[13px] leading-relaxed text-[#1C2630]/70">
                  {stage.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 19 — HOMEPAGE: SERVICES (Five Large Editorial Sections) */}
      <section className="border-t border-[#1C2630]/15 bg-[#FFFFFF] py-20 text-[#1C2630] lg:py-28">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-[12px] font-semibold tracking-[0.16em] text-[#164A78] uppercase">
              INTEGRATED STUDENT DEVELOPMENT
            </p>
            <h2 className="mt-3 font-serif text-[34px] leading-[1.12] text-[#071A33] md:text-[46px]">
              EVERYTHING YOUR CHILD NEEDS TO BUILD THE JOURNEY.
            </h2>
          </div>

          <div className="mt-16 divide-y divide-[#1C2630]/15">
            {/* 01 — UNDERGRADUATE COUNSELLING */}
            <div className="grid grid-cols-1 gap-10 py-14 first:pt-0 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <p className="text-[12px] font-semibold tracking-[0.16em] text-[#164A78] uppercase">
                  01. UNDERGRADUATE COUNSELLING
                </p>
                <h3 className="mt-3 font-serif text-[30px] leading-[1.15] text-[#071A33] md:text-[38px]">
                  KNOW WHERE YOU&apos;RE GOING BEFORE DECIDING WHAT TO DO.
                </h3>
                <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[#1C2630]/80">
                  Strategic guidance from early academic direction and country selection through
                  university shortlisting, essays, recommendations, interviews, and scholarships.
                </p>
                <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-[14px] text-[#0D2947]">
                  {[
                    'Country selection',
                    'University selection',
                    'Course selection',
                    'Academic direction',
                    'University shortlisting',
                    'Application planning',
                    'Essays',
                    'Recommendations',
                    'Interviews',
                    'Scholarships',
                  ].map((item, i, arr) => (
                    <React.Fragment key={item}>
                      <span>{item}</span>
                      {i < arr.length - 1 && (
                        <span aria-hidden="true" className="text-[#C4A56A]">
                          ·
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => onNavigate('/admissions')}
                    className="inline-flex items-center gap-2 text-[13px] font-semibold tracking-[0.08em] text-[#071A33] uppercase underline decoration-[#C4A56A] underline-offset-8 hover:text-[#164A78]"
                  >
                    <span>EXPLORE ADMISSIONS</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="lg:col-span-5">
                <EditorialImage
                  src={IMAGES.counsellingSession}
                  alt="Senior admissions counsellor reviewing an academic roadmap with a student"
                  aspectClass="aspect-[4/3]"
                />
              </div>
            </div>

            {/* 02 — PROFILE BUILDING */}
            <div className="grid grid-cols-1 gap-10 py-14 lg:grid-cols-12 lg:items-center">
              <div className="order-2 lg:order-1 lg:col-span-5">
                <EditorialImage
                  src={IMAGES.campusLibrary}
                  alt="Students collaborating on an academic initiative in a sunlit university library"
                  aspectClass="aspect-[4/3]"
                />
              </div>
              <div className="order-1 lg:order-2 lg:col-span-7">
                <p className="text-[12px] font-semibold tracking-[0.16em] text-[#164A78] uppercase">
                  02. PROFILE BUILDING
                </p>
                <h3 className="mt-3 font-serif text-[30px] leading-[1.15] text-[#071A33] md:text-[38px]">
                  BUILD A STRONGER PROFILE, NOT A LONGER RESUME.
                </h3>
                <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[#1C2630]/80">
                  Universities do not reward scattered busywork. We help students develop genuine
                  depth through independent projects, subject competitions, and meaningful
                  leadership.
                </p>
                <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-[14px] text-[#0D2947]">
                  {[
                    'Projects',
                    'Competitions',
                    'Leadership',
                    'Independent initiatives',
                    'Academic exploration',
                    'Career exploration',
                    'Extracurricular development',
                  ].map((item, i, arr) => (
                    <React.Fragment key={item}>
                      <span>{item}</span>
                      {i < arr.length - 1 && (
                        <span aria-hidden="true" className="text-[#C4A56A]">
                          ·
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => onNavigate('/profile-building')}
                    className="inline-flex items-center gap-2 text-[13px] font-semibold tracking-[0.08em] text-[#071A33] uppercase underline decoration-[#C4A56A] underline-offset-8 hover:text-[#164A78]"
                  >
                    <span>EXPLORE PROFILE BUILDING</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* 03 — RESEARCH MENTORSHIP */}
            <div className="grid grid-cols-1 gap-10 py-14 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <p className="text-[12px] font-semibold tracking-[0.16em] text-[#164A78] uppercase">
                  03. RESEARCH MENTORSHIP
                </p>
                <h3 className="mt-3 font-serif text-[30px] leading-[1.15] text-[#071A33] md:text-[38px]">
                  LET CURIOSITY BECOME RESEARCH.
                </h3>
                <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[#1C2630]/80">
                  Students work closely with experienced researchers and PhD scholars to formulate
                  testable questions, master research methodology, and author rigorous academic
                  papers.
                </p>
                <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-[14px] text-[#0D2947]">
                  {[
                    'Research question',
                    'Mentorship',
                    'Methodology',
                    'Research',
                    'Analysis',
                    'Paper writing',
                    'Presentation / publication guidance where appropriate',
                  ].map((item, i, arr) => (
                    <React.Fragment key={item}>
                      <span>{item}</span>
                      {i < arr.length - 1 && (
                        <span aria-hidden="true" className="text-[#C4A56A]">
                          ·
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => onNavigate('/research')}
                    className="inline-flex items-center gap-2 text-[13px] font-semibold tracking-[0.08em] text-[#071A33] uppercase underline decoration-[#C4A56A] underline-offset-8 hover:text-[#164A78]"
                  >
                    <span>EXPLORE RESEARCH MENTORSHIP</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="lg:col-span-5">
                <EditorialImage
                  src={IMAGES.researchLab}
                  alt="High school student conducting scientific inquiry in a research laboratory"
                  aspectClass="aspect-[4/3]"
                />
              </div>
            </div>

            {/* 04 & 05 — WORK EXPERIENCE & SAT PREPARATION */}
            <div className="grid grid-cols-1 gap-12 pt-14 lg:grid-cols-12">
              <div className="border border-[#1C2630]/15 bg-[#F7F5F0] p-8 sm:p-10 lg:col-span-6">
                <p className="text-[12px] font-semibold tracking-[0.16em] text-[#164A78] uppercase">
                  04. WORK EXPERIENCE
                </p>
                <h3 className="mt-3 font-serif text-[28px] leading-[1.15] text-[#071A33] md:text-[34px]">
                  EXPERIENCE THE WORLD BEYOND THE CLASSROOM.
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-[#1C2630]/80">
                  Meaningful career exploration and industry exposure help students test their
                  intended university major against real professional environments.
                </p>
                <div className="mt-6 flex flex-wrap gap-x-3 gap-y-2 text-[13px] font-medium text-[#0D2947]">
                  <span>Job simulations</span>
                  <span aria-hidden="true" className="text-[#C4A56A]">·</span>
                  <span>Internships</span>
                  <span aria-hidden="true" className="text-[#C4A56A]">·</span>
                  <span>Professional projects</span>
                  <span aria-hidden="true" className="text-[#C4A56A]">·</span>
                  <span>Industry exposure</span>
                  <span aria-hidden="true" className="text-[#C4A56A]">·</span>
                  <span>Career exploration</span>
                </div>
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => onNavigate('/work-experience')}
                    className="inline-flex items-center gap-2 text-[13px] font-semibold tracking-[0.08em] text-[#071A33] uppercase underline decoration-[#C4A56A] underline-offset-8 hover:text-[#164A78]"
                  >
                    <span>EXPLORE WORK EXPERIENCE</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="border border-[#1C2630]/15 bg-[#071A33] p-8 text-[#F7F5F0] sm:p-10 lg:col-span-6">
                <p className="text-[12px] font-semibold tracking-[0.16em] text-[#C4A56A] uppercase">
                  05. SAT PREPARATION
                </p>
                <h3 className="mt-3 font-serif text-[28px] leading-[1.15] text-[#FFFFFF] md:text-[34px]">
                  PREPARE WITH A PLAN.
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-[#E9F0F6]/80">
                  Structured SAT preparation synchronised with school exams and application
                  deadlines—combining live instruction, diagnostic analytics, and disciplined
                  practice.
                </p>
                <div className="mt-6 flex flex-wrap gap-x-3 gap-y-2 text-[13px] font-medium text-[#E9F0F6]">
                  <span>Live Classes</span>
                  <span aria-hidden="true" className="text-[#C4A56A]">·</span>
                  <span>Practice</span>
                  <span aria-hidden="true" className="text-[#C4A56A]">·</span>
                  <span>Mock Tests</span>
                  <span aria-hidden="true" className="text-[#C4A56A]">·</span>
                  <span>Doubt Sessions</span>
                  <span aria-hidden="true" className="text-[#C4A56A]">·</span>
                  <span>Performance Tracking</span>
                </div>
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => onNavigate('/sat')}
                    className="inline-flex items-center gap-2 text-[13px] font-semibold tracking-[0.08em] text-[#C4A56A] uppercase underline decoration-[#C4A56A] underline-offset-8 hover:text-white"
                  >
                    <span>EXPLORE SAT PREPARATION</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 20 — HOMEPAGE: BACKWARD ENGINEERING (Signature Section) */}
      <section className="bg-[#0D2947] py-20 text-[#F7F5F0] lg:py-28">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-[12px] font-semibold tracking-[0.16em] text-[#C4A56A] uppercase">
                THE UPPSEEKERS METHOD
              </p>
              <h2 className="mt-4 font-serif text-[34px] leading-[1.12] text-[#FFFFFF] md:text-[46px]">
                WE WORK BACKWARDS FROM THE UNIVERSITY.
              </h2>
              <p className="mt-6 text-[17px] leading-relaxed text-[#E9F0F6]/85">
                The objective isn&apos;t to fill a student&apos;s calendar.
              </p>
              <p className="mt-4 text-[16px] leading-relaxed text-[#E9F0F6]/75">
                It is to understand where they want to go and build experiences that make sense for
                who they are.
              </p>
              <div className="mt-10">
                <button
                  type="button"
                  onClick={() => onNavigate('/approach')}
                  className="inline-flex items-center gap-3 border border-[#C4A56A] px-6 py-3.5 text-[13px] font-semibold tracking-[0.08em] text-[#C4A56A] uppercase transition-colors hover:bg-[#C4A56A] hover:text-[#071A33]"
                >
                  <span>EXAMINE OUR METHODOLOGY</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="border-l border-[#C4A56A]/60 pl-6 sm:pl-10">
                {backwardSteps.map((b, idx) => (
                  <div
                    key={b.label}
                    className={`relative pb-7 ${
                      idx === backwardSteps.length - 1 ? 'pb-0' : ''
                    }`}
                  >
                    <span className="absolute top-1.5 -left-[29px] h-2.5 w-2.5 bg-[#C4A56A] sm:-left-[45px]" />
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                      <h3 className="font-serif text-[22px] tracking-wide text-[#FFFFFF] sm:text-[25px]">
                        {b.label}
                      </h3>
                      <span className="font-mono text-[12px] text-[#C4A56A]">
                        STEP {b.step}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[14px] text-[#E9F0F6]/75">{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 21 — HOMEPAGE: STUDENT RESULTS */}
      <section className="bg-[#F7F5F0] py-20 text-[#1C2630] lg:py-28">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-[12px] font-semibold tracking-[0.16em] text-[#164A78] uppercase">
                VERIFIED ADMISSIONS ARCHIVE
              </p>
              <h2 className="mt-3 font-serif text-[34px] leading-[1.12] text-[#071A33] md:text-[46px]">
                REAL STUDENTS. REAL JOURNEYS. REAL UNIVERSITIES.
              </h2>
              <p className="mt-3 text-[16px] text-[#1C2630]/80">
                133+ admissions across leading universities worldwide.
              </p>
            </div>

            {/* Interactive Country Filter */}
            <div className="flex flex-wrap gap-1.5">
              {(['All', ...DESTINATIONS] as const).map((country) => {
                const active = selectedCountry === country;
                return (
                  <button
                    key={country}
                    type="button"
                    onClick={() => setSelectedCountry(country)}
                    className={`border px-3.5 py-2 text-[12px] font-medium tracking-wider uppercase whitespace-nowrap transition-colors duration-150 ${
                      active
                        ? 'border-[#071A33] bg-[#071A33] text-[#FFFFFF]'
                        : 'border-[#1C2630]/20 bg-[#FFFFFF] text-[#1C2630] hover:border-[#071A33]'
                    }`}
                  >
                    {country}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 border-t border-l border-[#1C2630]/15 sm:grid-cols-2 lg:grid-cols-3">
            {filteredResults.map((record) => (
              <div
                key={record.id}
                className="flex flex-col justify-between border-r border-b border-[#1C2630]/15 bg-[#FFFFFF] p-7"
              >
                <div>
                  <div className="flex items-center justify-between text-[12px] text-[#1C2630]/60">
                    <span className="font-semibold text-[#164A78] uppercase">{record.country}</span>
                    <span>·</span>
                    <span className="tabular-nums">Class of {record.classOf}</span>
                  </div>
                  <h3 className="mt-4 font-serif text-[24px] leading-snug text-[#071A33]">
                    {record.university}
                  </h3>
                  <p className="mt-1.5 text-[15px] font-medium text-[#164A78]">
                    {record.course}
                  </p>
                  <p className="mt-3 text-[13px] leading-relaxed text-[#1C2630]/75 line-clamp-2">
                    {record.research || record.projects || record.internshipWork || record.competitionsAwards || 'Admitted Scholar'}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[#1C2630]/10 pt-4 text-[13px]">
                  <span className="font-semibold text-[#164A78] uppercase text-[11px]">Admitted Scholar</span>
                  <span className="font-mono text-[#1C2630]/60 text-xs">{record.academicPerformance}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-right">
            <button
              type="button"
              onClick={() => onNavigate('/results')}
              className="inline-flex items-center gap-2 text-[13px] font-semibold tracking-[0.08em] text-[#071A33] uppercase underline decoration-[#C4A56A] underline-offset-8 hover:text-[#164A78]"
            >
              <span>SEARCH FULL ADMISSIONS ARCHIVE</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 22 — HOMEPAGE: STUDENT STORIES */}
      <section className="border-t border-[#1C2630]/15 bg-[#FFFFFF] py-20 text-[#1C2630] lg:py-28">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-[12px] font-semibold tracking-[0.16em] text-[#164A78] uppercase">
                DOCUMENTED STUDENT PROFILES
              </p>
              <h2 className="mt-3 font-serif text-[34px] leading-[1.12] text-[#071A33] md:text-[46px]">
                EVERY ADMISSION HAS A STORY.
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {approvedStories.map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setActiveStoryId(st.id)}
                  className={`border px-4 py-2 text-[13px] font-medium whitespace-nowrap transition-colors ${
                    currentStory.id === st.id
                      ? 'border-[#071A33] bg-[#071A33] text-[#FFFFFF]'
                      : 'border-[#1C2630]/20 bg-[#F7F5F0] text-[#1C2630] hover:border-[#071A33]'
                  }`}
                >
                  {st.university.split(' (')[0]} ({st.classOf})
                </button>
              ))}
            </div>
          </div>

          {/* Active Student Story Detail */}
          <div className="mt-10 border border-[#1C2630]/15 bg-[#F7F5F0] p-8 sm:p-12">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <div className="flex items-center gap-2 text-[12px] tracking-[0.12em] text-[#164A78] uppercase">
                  <span>Admitted Scholar</span>
                  <span>·</span>
                  <span>{currentStory.country}</span>
                  <span>·</span>
                  <span>Class of {currentStory.classOf}</span>
                </div>
                <h3 className="mt-3 font-serif text-[32px] leading-tight text-[#071A33]">
                  {currentStory.university}
                </h3>
                <p className="mt-1 text-[16px] font-medium text-[#0D2947]">
                  Admitted Course: {currentStory.course}
                </p>

                <dl className="mt-6 space-y-4 border-t border-[#1C2630]/15 pt-6 text-[14px]">
                  <div>
                    <dt className="text-[11px] font-semibold tracking-wider text-[#1C2630]/60 uppercase">
                      Academic Standing
                    </dt>
                    <dd className="mt-1 text-[#1C2630] font-medium">{currentStory.academicPerformance}</dd>
                  </div>
                  {currentStory.summerPrograms && (
                    <div>
                      <dt className="text-[11px] font-semibold tracking-wider text-[#1C2630]/60 uppercase">
                        Summer Programs
                      </dt>
                      <dd className="mt-1 text-[#1C2630]">{currentStory.summerPrograms}</dd>
                    </div>
                  )}
                  {currentStory.otherActivities && (
                    <div>
                      <dt className="text-[11px] font-semibold tracking-wider text-[#1C2630]/60 uppercase">
                        Campus &amp; Co-Curricular Involvements
                      </dt>
                      <dd className="mt-1 text-[13px] leading-relaxed text-[#1C2630]/80">{currentStory.otherActivities}</dd>
                    </div>
                  )}
                </dl>
              </div>

              <div className="border-t border-[#1C2630]/15 pt-8 lg:col-span-7 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {currentStory.research && (
                    <div>
                      <h4 className="text-[12px] font-semibold tracking-wider text-[#164A78] uppercase">
                        Research &amp; Inquiry
                      </h4>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-[#1C2630]/80">
                        {currentStory.research}
                      </p>
                    </div>
                  )}
                  {currentStory.projects && (
                    <div>
                      <h4 className="text-[12px] font-semibold tracking-wider text-[#164A78] uppercase">
                        Technical Projects &amp; Builds
                      </h4>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-[#1C2630]/80">
                        {currentStory.projects}
                      </p>
                    </div>
                  )}
                  {currentStory.internshipWork && (
                    <div>
                      <h4 className="text-[12px] font-semibold tracking-wider text-[#164A78] uppercase">
                        Work Experience &amp; Internships
                      </h4>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-[#1C2630]/80">
                        {currentStory.internshipWork}
                      </p>
                    </div>
                  )}
                  {currentStory.competitionsAwards && (
                    <div>
                      <h4 className="text-[12px] font-semibold tracking-wider text-[#164A78] uppercase">
                        Competitions, Honors &amp; Awards
                      </h4>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-[#1C2630]/80">
                        {currentStory.competitionsAwards}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-[#1C2630]/15 pt-5">
                  <span className="text-[13px] text-[#1C2630]/70">
                    Verified Cohort Profile · Class of {currentStory.classOf}
                  </span>
                  <button
                    type="button"
                    onClick={() => onNavigate('/student-stories')}
                    className="inline-flex items-center gap-2 text-[13px] font-semibold tracking-[0.08em] text-[#071A33] uppercase underline decoration-[#C4A56A] underline-offset-8"
                  >
                    <span>READ MORE STUDENT PROFILES</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 23 — HOMEPAGE: COUNSELLORS (NO PICTURE SECTION — SIMPLE NAME & DETAILS) */}
      <section className="bg-[#071A33] py-20 text-[#F7F5F0] lg:py-28">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-[12px] font-medium tracking-[0.16em] text-[#C4A56A] uppercase">
              SENIOR ADVISORY COUNSELLORS
            </p>
            <h2 className="mt-3 font-serif text-[34px] leading-[1.12] text-[#FFFFFF] md:text-[46px]">
              EXPERIENCED COUNSELLORS. PERSONAL GUIDANCE.
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-[#E9F0F6]/85">
              The right decisions require more than information. They require context, experience
              and someone who understands the student.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-[#C4A56A]">
              <span>10+ years of counselling experience</span>
              <span aria-hidden="true">·</span>
              <span>UCLA College Counseling Certifications</span>
              <span aria-hidden="true">·</span>
              <span>British Council Certified Advisors</span>
            </div>
          </div>

          {/* Clean No-Picture Typographic Layout for Counsellors */}
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {counsellors.map((c) => (
              <div
                key={c.id}
                className="flex flex-col justify-between border border-white/15 bg-[#0D2947] p-8 sm:p-9"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-[12px] font-semibold tracking-[0.14em] text-[#C4A56A] uppercase">
                      {c.experience}
                    </span>
                    <span className="text-[11px] text-[#E9F0F6]/60 uppercase tracking-wider">Advisory</span>
                  </div>

                  <h3 className="mt-6 font-serif text-[30px] text-[#FFFFFF]">{c.name}</h3>
                  <p className="mt-1 text-[14px] font-medium text-[#C4A56A]">{c.role}</p>

                  <p className="mt-4 text-[14px] leading-relaxed text-[#E9F0F6]/85">
                    {c.bio}
                  </p>

                  <div className="mt-6 space-y-3 border-t border-white/10 pt-4 text-[13px]">
                    <div>
                      <p className="text-[11px] font-semibold tracking-wider text-[#C4A56A] uppercase">
                        Qualifications &amp; Certifications
                      </p>
                      <p className="mt-1 text-[#E9F0F6]/90">{c.certifications.join(' · ')}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold tracking-wider text-[#C4A56A] uppercase">
                        Focus &amp; Regions
                      </p>
                      <p className="mt-1 text-[#E9F0F6]/90">{c.specialisation}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-white/10 pt-5">
                  <p className="font-serif text-[15px] italic text-[#E9F0F6]">
                    &ldquo;{c.philosophy}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* + And many more — growing team card */}
          <div className="mt-8 border border-white/15 bg-gradient-to-r from-[#0D2947] via-[#10355D] to-[#0D2947] p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#C4A56A] font-serif text-2xl font-bold text-[#C4A56A]">
                {counsellorsExpansionNote.lead || '+'}
              </span>
              <div>
                <h3 className="font-serif text-[24px] text-white">{counsellorsExpansionNote.title}</h3>
                <p className="mt-1 text-[15px] text-[#E9F0F6]/85">
                  {counsellorsExpansionNote.description}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/counsellors')}
              className="inline-flex shrink-0 items-center gap-2 border border-[#C4A56A] px-5 py-3 text-[12px] font-semibold tracking-wider text-[#C4A56A] uppercase transition-colors hover:bg-[#C4A56A] hover:text-[#071A33]"
            >
              <span>MEET ALL COUNSELLORS</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-10">
            <button
              type="button"
              onClick={() => onNavigate('/counsellors')}
              className="inline-flex items-center gap-2 text-[13px] font-semibold tracking-[0.08em] text-[#C4A56A] uppercase underline decoration-[#C4A56A] underline-offset-8 hover:text-white"
            >
              <span>VIEW COUNSELLORS DETAILS</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 24 — HOMEPAGE: UNIVERSITY MENTORS */}
      <section className="bg-[#FFFFFF] py-20 text-[#1C2630] lg:py-28">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-[12px] font-semibold tracking-[0.16em] text-[#164A78] uppercase">
                CAMPUS PERSPECTIVE
              </p>
              <h2 className="mt-3 font-serif text-[34px] leading-[1.12] text-[#071A33] md:text-[46px]">
                INSIGHT FROM PEOPLE WHO HAVE BEEN THERE.
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-[#1C2630]/80">
                Students can also learn from university mentors who have experienced international
                university life themselves.
              </p>

              <div className="mt-6 border-t border-[#1C2630]/15 pt-6">
                <p className="text-[12px] font-semibold tracking-wider text-[#071A33] uppercase">
                  Mentors provide perspective on:
                </p>
                <ul className="mt-4 space-y-2.5 text-[15px] text-[#1C2630]/85">
                  <li>Academic culture &amp; seminar expectations</li>
                  <li>Student life &amp; residential communities</li>
                  <li>University environment &amp; accessibility</li>
                  <li>What students wish they knew earlier</li>
                  <li>What life after admission actually looks like</li>
                </ul>
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => onNavigate('/university-mentors')}
                  className="inline-flex items-center gap-2 text-[13px] font-semibold tracking-[0.08em] text-[#071A33] uppercase underline decoration-[#C4A56A] underline-offset-8 hover:text-[#164A78]"
                >
                  <span>EXPLORE UNIVERSITY MENTORS</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 border-t border-l border-[#1C2630]/15 sm:grid-cols-2">
                {UNIVERSITY_MENTORS_DATA.slice(0, 6).map((m) => (
                  <div
                    key={m.id}
                    className="flex flex-col justify-between border-r border-b border-[#1C2630]/15 bg-[#F7F5F0]/50 p-6"
                  >
                    <div>
                      <p className="text-[11px] font-semibold tracking-[0.14em] text-[#164A78] uppercase">
                        {m.country} · VERIFIED AFFILIATION
                      </p>
                      <h3 className="mt-2 font-serif text-[23px] text-[#071A33]">
                        {m.university}
                      </h3>
                      <p className="mt-1 text-[14px] font-medium text-[#0D2947]">
                        {m.name} — {m.course}
                      </p>
                      <p className="mt-3 text-[13px] leading-relaxed text-[#1C2630]/75">
                        {m.helpsUnderstand[0]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-[#1C2630]/70">
                <span className="font-semibold text-[#071A33]">Mentor Affiliations Include:</span>
                {[
                  'UPenn',
                  'Northwestern',
                  'Brown',
                  'Cornell',
                  'UCLA',
                  'SMU',
                  'ESSEC',
                  'Edinburgh',
                  'LSE',
                  'KCL',
                  'Heidelberg',
                  'Humboldt',
                  'Sydney',
                ].map((aff, i, arr) => (
                  <React.Fragment key={aff}>
                    <span>{aff}</span>
                    {i < arr.length - 1 && <span aria-hidden="true">·</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 25 — HOMEPAGE: PARENTS */}
      <section className="border-t border-[#1C2630]/10 bg-[#F7F5F0] py-20 text-[#1C2630] lg:py-28">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <p className="text-[12px] font-semibold tracking-[0.16em] text-[#164A78] uppercase">
                FOR PARENTS OF CLASSES 8–12
              </p>
              <h2 className="mt-3 font-serif text-[34px] leading-[1.12] text-[#071A33] md:text-[46px]">
                FOR PARENTS WHO WANT TO START WITH THE RIGHT QUESTIONS.
              </h2>
              <p className="mt-5 text-[16px] leading-relaxed text-[#1C2630]/80">
                Before committing your child’s time to extra classes, summer programmes, or
                competitions, start with a clear diagnostic conversation about where they are today
                and what genuinely matters.
              </p>
              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => onNavigate('/contact')}
                  className="inline-flex items-center gap-3 bg-[#071A33] px-7 py-4 text-[13px] font-semibold tracking-[0.08em] text-[#FFFFFF] uppercase whitespace-nowrap transition-colors hover:bg-[#0D2947]"
                >
                  <span>TALK TO AN ADVISOR</span>
                  <ArrowRight className="h-4 w-4 text-[#C4A56A]" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="grid grid-cols-1 border-t border-l border-[#1C2630]/15 sm:grid-cols-2">
                {[
                  'Is my child on the right path?',
                  'Are we starting early enough?',
                  'What should they focus on this year?',
                  'Which universities could suit them?',
                  'Should they pursue research?',
                  'Should they do internships?',
                  'Should they take the SAT?',
                  'Are their current activities meaningful?',
                  'What should they do next?',
                ].map((q, idx) => (
                  <div
                    key={q}
                    className={`border-r border-b border-[#1C2630]/15 bg-[#FFFFFF] p-6 ${
                      idx === 8 ? 'sm:col-span-2' : ''
                    }`}
                  >
                    <p className="font-serif text-[20px] italic text-[#071A33]">&ldquo;{q}&rdquo;</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 26 — HOMEPAGE: FINAL CTA */}
      <FinalCTA onNavigate={onNavigate} />
    </div>
  );
};
