import React, { useState } from 'react';
import {
  PageRoute,
  DestinationCountry,
  SHEET_STUDENTS_DATA,
  IMAGES,
  OFFICIAL_ADMISSIONS_COUNT,
} from '../data/uppseekersData';
import { EditorialImage, FinalCTA } from '../components/SharedComponents';
import { ArrowRight } from 'lucide-react';

interface PageProps {
  onNavigate: (page: PageRoute, filterCountry?: DestinationCountry) => void;
}

/* ============================================================================
 * /approach — OUR APPROACH PAGE
 * ============================================================================ */
export const ApproachPage: React.FC<PageProps> = ({ onNavigate }) => {
  const [selectedGrade, setSelectedGrade] = useState<'8' | '9' | '10' | '11' | '12'>('9');

  const gradeBlueprints: Record<
    '8' | '9' | '10' | '11' | '12',
    {
      phase: string;
      headline: string;
      summary: string;
      priorities: string[];
      avoid: string[];
    }
  > = {
    '8': {
      phase: 'DISCOVER · CLASS 8',
      headline: 'Cultivating intellectual curiosity and foundational habits before curriculum lock-in.',
      summary:
        'In Class 8, the objective is never to force a narrow career choice. Instead, we observe how the student learns, introduce structured reading beyond school textbooks, and build mathematical and writing fluency.',
      priorities: [
        'Diagnostic mapping of natural academic strengths across quantitative, scientific, and humanities domains',
        'Curated independent reading lists and guided reflection sessions',
        'Early exposure to problem-solving competitions and creative synthesis projects',
        'Guidance for parents on selecting Class 9–10 curriculum tracks (IGCSE, ICSE, CBSE, MYP)',
      ],
      avoid: [
        'Prematurely locking into a rigid major without real exposure',
        'Enrolling in high-stress test coaching meant for older students',
      ],
    },
    '9': {
      phase: 'EXPLORE · CLASS 9',
      headline: 'Translating broad curiosity into initial projects and disciplined exploration.',
      summary:
        'Class 9 marks the beginning of the high school transcript evaluated by US and Canadian universities. We establish strong classroom grades while testing 2–3 potential academic directions through hands-on work.',
      priorities: [
        'Protecting high school GPA / internal school performance from the very first semester',
        'Designing a foundational project or community initiative around a genuine interest',
        'Entering age-appropriate academic competitions (AMC 10, Junior Science/Economics challenges)',
        'Mapping how different subjects connect to university degree structures',
      ],
      avoid: [
        'Joining ten unrelated school clubs just to collect participation certificates',
        'Neglecting school exam fundamentals in favour of external activities',
      ],
    },
    '10': {
      phase: 'DEEPEN · CLASS 10',
      headline: 'Crucial subject selection, narrowing academic focus, and baseline diagnostic planning.',
      summary:
        'Decisions made at the end of Class 10 directly govern eligibility for UK, Singaporean, German, and US Engineering/Business programmes. We align Class 11–12 subjects and launch deeper academic inquiry.',
      priorities: [
        'Strategic selection of IBDP HL/SL, A-Level, CBSE, or ISC subject combinations',
        'Completing Class 10 board examinations with top-decile consistency',
        'Initiating structured summer job simulations, industry shadowing, or preliminary research',
        'Taking a baseline SAT / admissions test diagnostic after board exams conclude',
      ],
      avoid: [
        'Choosing Class 11 subjects without verifying UK/European/Singapore prerequisite matrices',
        'Waiting until Class 12 to start standardized test preparation',
      ],
    },
    '11': {
      phase: 'POSITION · CLASS 11',
      headline: 'Independent research, standardized testing execution, and university shortlisting.',
      summary:
        'Class 11 is the most intellectually demanding year of the journey. Because our students have built foundations earlier, they can execute research, SAT testing, and leadership without sacrificing predicted grades.',
      priorities: [
        'Authoring an independent research paper or advanced technical portfolio with mentor guidance',
        'Completing Digital SAT sittings and preparing for UK admissions assessments (TMUA, ESAT, LNAT)',
        'Finalising a balanced, data-backed shortlist of target, reach, and foundational universities',
        'Beginning summer essay architecture before Class 12 school workloads peak',
      ],
      avoid: [
        'Starting five brand-new extracurriculars in Class 11 that appear last-minute to admissions readers',
        'Allowing Class 11 internal marks to dip during testing months',
      ],
    },
    '12': {
      phase: 'APPLY · CLASS 12',
      headline: 'Articulating a coherent intellectual narrative across applications, essays, and interviews.',
      summary:
        'In Class 12, every element of the roadmap comes together. We guide the student through Early Action/Decision, UCAS, Singapore, Canadian, and European cycles with calm precision.',
      priorities: [
        'Drafting and refining authentic personal statements and university-specific supplemental essays',
        'Briefing school referees and aligning recommendation evidence with the student’s core narrative',
        'Conducting mock academic and alumni interviews (Oxbridge, Imperial, SMU, Ivy League)',
        'Evaluating admission offers, scholarship awards, and final matriculation decisions',
      ],
      avoid: [
        'Generic essays that repeat the resume instead of revealing how the student thinks',
        'Missing early scholarship or portfolio submission deadlines',
      ],
    },
  };

  const activeBlueprint = gradeBlueprints[selectedGrade];

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#071A33] pt-32 pb-20 text-[#F7F5F0] lg:pt-40 lg:pb-28">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-[12px] font-medium tracking-[0.18em] text-[#C4A56A] uppercase">
              OUR METHODOLOGY · CLASS 8–12
            </p>
            <h1 className="mt-4 font-serif text-[38px] leading-[1.08] text-[#FFFFFF] sm:text-[50px] lg:text-[58px]">
              START WITH THE DESTINATION. WORK BACKWARDS.
            </h1>
            <p className="mt-6 text-[17px] leading-[1.65] text-[#E9F0F6]/85 sm:text-[18px]">
              We don&apos;t just prepare applications. We prepare students for the journey that
              leads to them—connecting academic direction, profile building, research, work
              experience, and testing into one coherent multi-year strategy.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => onNavigate('/contact')}
                className="inline-flex items-center gap-3 bg-[#C4A56A] px-7 py-4 text-[13px] font-semibold tracking-[0.08em] text-[#071A33] uppercase whitespace-nowrap hover:bg-[#d4b77e]"
              >
                <span>BUILD MY CHILD&apos;S ROADMAP</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/results')}
                className="inline-flex items-center gap-2 border border-white/25 px-7 py-4 text-[13px] font-medium tracking-[0.08em] text-[#FFFFFF] uppercase whitespace-nowrap hover:border-white"
              >
                <span>VIEW {OFFICIAL_ADMISSIONS_COUNT}+ ADMISSIONS</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Stage Explorer */}
      <section className="bg-[#F7F5F0] py-20 text-[#1C2630] lg:py-28">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="text-[12px] font-semibold tracking-[0.16em] text-[#164A78] uppercase">
                STAGE-BY-STAGE ARCHITECTURE
              </p>
              <h2 className="mt-3 font-serif text-[34px] leading-[1.12] text-[#071A33] md:text-[44px]">
                WHAT YOUR CHILD SHOULD FOCUS ON RIGHT NOW.
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {(['8', '9', '10', '11', '12'] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setSelectedGrade(g)}
                  className={`border px-5 py-2.5 text-[13px] font-semibold tracking-wider uppercase transition-colors ${
                    selectedGrade === g
                      ? 'border-[#071A33] bg-[#071A33] text-[#FFFFFF]'
                      : 'border-[#1C2630]/20 bg-[#FFFFFF] text-[#071A33] hover:border-[#071A33]'
                  }`}
                >
                  Class {g}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 border border-[#1C2630]/15 bg-[#FFFFFF] p-8 sm:p-12">
            <p className="text-[12px] font-semibold tracking-[0.16em] text-[#164A78] uppercase">
              {activeBlueprint.phase}
            </p>
            <h3 className="mt-3 font-serif text-[28px] leading-snug text-[#071A33] md:text-[36px]">
              {activeBlueprint.headline}
            </h3>
            <p className="mt-4 max-w-3xl text-[16px] leading-relaxed text-[#1C2630]/80">
              {activeBlueprint.summary}
            </p>

            <div className="mt-10 grid grid-cols-1 gap-8 border-t border-[#1C2630]/15 pt-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <h4 className="text-[12px] font-semibold tracking-[0.14em] text-[#071A33] uppercase">
                  Key Developmental Priorities in Class {selectedGrade}
                </h4>
                <ul className="mt-4 space-y-3">
                  {activeBlueprint.priorities.map((p, idx) => (
                    <li key={p} className="flex items-start gap-3 text-[15px] text-[#1C2630]/90">
                      <span className="font-mono text-[12px] text-[#164A78] tabular-nums">
                        0{idx + 1}.
                      </span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-[#1C2630]/15 pt-6 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
                <h4 className="text-[12px] font-semibold tracking-[0.14em] text-[#9A3412] uppercase">
                  Common Pitfalls We Help Families Avoid
                </h4>
                <ul className="mt-4 space-y-3">
                  {activeBlueprint.avoid.map((a) => (
                    <li key={a} className="text-[14px] leading-relaxed text-[#1C2630]/75">
                      — {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Backward Engineering Diagram */}
      <section className="bg-[#0D2947] py-20 text-[#F7F5F0] lg:py-28">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <p className="text-[12px] font-semibold tracking-[0.16em] text-[#C4A56A] uppercase">
                REVERSE-ENGINEERED PLANNING
              </p>
              <h2 className="mt-3 font-serif text-[34px] leading-[1.12] text-[#FFFFFF] md:text-[44px]">
                WHY WORKING BACKWARDS CHANGES EVERYTHING.
              </h2>
              <p className="mt-5 text-[16px] leading-relaxed text-[#E9F0F6]/85">
                Most students accumulate activities forward without knowing where they lead, only to
                discover in Class 12 that their subjects, projects, and testing do not fit the
                courses they want to apply for.
              </p>
              <p className="mt-4 text-[16px] leading-relaxed text-[#E9F0F6]/85">
                At Uppseekers, we begin with the destination—the country, university culture, and
                academic discipline—and map backwards to determine what the student should read,
                build, research, and test each semester.
              </p>
            </div>
            <div className="lg:col-span-6">
              <EditorialImage
                src={IMAGES.counsellingSession}
                alt="Counsellor and student mapping a multi-year academic plan"
                aspectClass="aspect-[4/3]"
                caption="Individual roadmap sessions align academic choices with long-term university expectations."
              />
            </div>
          </div>
        </div>
      </section>

      <FinalCTA onNavigate={onNavigate} />
    </div>
  );
};

/* ============================================================================
 * 27 — /admissions — UNDERGRADUATE ADMISSIONS PAGE
 * ============================================================================ */
export const AdmissionsPage: React.FC<PageProps> = ({ onNavigate }) => {
  const chapters = [
    {
      num: '01',
      title: 'UNDERSTAND THE STUDENT',
      desc: 'We start by understanding the student’s academic strengths, intellectual curiosities, learning style, personality, and family expectations before naming a single university.',
    },
    {
      num: '02',
      title: 'ACADEMIC DIRECTION',
      desc: 'Aligning school subject choices (IBDP, A-Levels, CBSE, ISC) with emerging academic interests—whether pure STEM, quantitative economics, architecture, or interdisciplinary liberal arts.',
    },
    {
      num: '03',
      title: 'COUNTRY & COURSE',
      desc: 'Evaluating the structural differences across the US, UK, Singapore, Germany, Canada, Australia, Hong Kong, and Europe so families choose the right education systems.',
    },
    {
      num: '04',
      title: 'UNIVERSITY SHORTLIST',
      desc: 'Building a balanced, evidence-backed university shortlist across ambitious reach, strong-fit target, and foundational institutions.',
    },
    {
      num: '05',
      title: 'APPLICATION STRATEGY',
      desc: 'Structuring Early Decision, Early Action, Restrictive Early Action, UCAS, and rolling international timelines to maximise strategic advantage.',
    },
    {
      num: '06',
      title: 'ESSAYS & RECOMMENDATIONS',
      desc: 'Guiding students to articulate authentic, intellectually mature Common App essays, UCAS personal statements, university supplements, and referee briefings.',
    },
    {
      num: '07',
      title: 'INTERVIEWS',
      desc: 'Rigorous preparation for Oxbridge & Imperial technical interviews, SMU seminar discussions, Rotman video assessments, and US alumni conversations.',
    },
    {
      num: '08',
      title: 'SCHOLARSHIPS',
      desc: 'Identifying merit scholarships and institutional financial aid opportunities, and crafting dedicated scholarship essays and dossiers.',
    },
    {
      num: '09',
      title: 'FINAL DECISION',
      desc: 'Comparing admission offers, curriculum flexibility, faculty access, and long-term career outcomes to make the final matriculation decision with clarity.',
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#071A33] pt-32 pb-20 text-[#F7F5F0] lg:pt-40 lg:pb-28">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-[12px] font-medium tracking-[0.18em] text-[#C4A56A] uppercase">
                UNDERGRADUATE ADMISSIONS COUNSELLING
              </p>
              <h1 className="mt-4 font-serif text-[38px] leading-[1.08] text-[#FFFFFF] sm:text-[50px] lg:text-[58px]">
                UNIVERSITY ADMISSIONS ARE A STRATEGIC JOURNEY.
              </h1>
              <p className="mt-6 max-w-2xl text-[17px] leading-[1.65] text-[#E9F0F6]/85 sm:text-[18px]">
                From choosing the right course and country to building the application itself, we
                help families navigate the decisions that matter.
              </p>
              <div className="mt-10">
                <button
                  type="button"
                  onClick={() => onNavigate('/contact')}
                  className="inline-flex items-center gap-3 bg-[#C4A56A] px-7 py-4 text-[13px] font-semibold tracking-[0.08em] text-[#071A33] uppercase whitespace-nowrap hover:bg-[#d4b77e]"
                >
                  <span>BUILD MY CHILD&apos;S ROADMAP</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="lg:col-span-5">
              <EditorialImage
                src={IMAGES.counsellingSession}
                alt="Counsellor and student discussing university shortlists"
                aspectClass="aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 01 to 09 Strategic Architecture */}
      <section className="bg-[#F7F5F0] py-20 text-[#1C2630] lg:py-28">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-[12px] font-semibold tracking-[0.16em] text-[#164A78] uppercase">
              NINE-STAGE ADMISSIONS ARCHITECTURE
            </p>
            <h2 className="mt-3 font-serif text-[34px] leading-[1.12] text-[#071A33] md:text-[44px]">
              EVERY DECISION CONNECTED. EVERY STEP DELIBERATE.
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 border-t border-l border-[#1C2630]/15 md:grid-cols-2 lg:grid-cols-3">
            {chapters.map((ch) => (
              <div
                key={ch.num}
                className="flex flex-col justify-between border-r border-b border-[#1C2630]/15 bg-[#FFFFFF] p-8"
              >
                <div>
                  <span className="font-mono text-[13px] font-medium text-[#C4A56A]">
                    {ch.num}
                  </span>
                  <h3 className="mt-3 font-serif text-[25px] text-[#071A33]">{ch.title}</h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-[#1C2630]/80">{ch.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA onNavigate={onNavigate} />
    </div>
  );
};

/* ============================================================================
 * 28 — /profile-building — PROFILE BUILDING PAGE
 * ============================================================================ */
export const ProfileBuildingPage: React.FC<PageProps> = ({ onNavigate }) => {
  const pillars = [
    {
      title: 'Projects',
      desc: 'Long-term technical builds, community platforms, policy journals, or design portfolios that demonstrate sustained initiative and problem-solving.',
    },
    {
      title: 'Competitions',
      desc: 'Selective preparation for subject olympiads, essay prizes (John Locke, Marshall Society), mathematics contests (AMC, UKMT), and science fairs.',
    },
    {
      title: 'Leadership',
      desc: 'Moving beyond nominal school titles to measurable institutional or community responsibility.',
    },
    {
      title: 'Career Exploration',
      desc: 'Understanding how academic disciplines translate into real-world professions before committing to a university degree.',
    },
    {
      title: 'Independent Work',
      desc: 'Self-directed reading tracks, open-source repositories, archival studies, and creative bodies of work.',
    },
    {
      title: 'Industry Exposure',
      desc: 'Structured job simulations, technical shadowing, and summer internships in relevant sectors.',
    },
    {
      title: 'Academic Enrichment',
      desc: 'University summer seminars, advanced coursework, and targeted super-curricular exploration beyond the school syllabus.',
    },
  ];

  const profileExamples = SHEET_STUDENTS_DATA.filter((s) => s.projects).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#071A33] pt-32 pb-20 text-[#F7F5F0] lg:pt-40 lg:pb-28">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-[12px] font-medium tracking-[0.18em] text-[#C4A56A] uppercase">
              AUTHENTIC STUDENT DEVELOPMENT
            </p>
            <h1 className="mt-4 font-serif text-[38px] leading-[1.08] text-[#FFFFFF] sm:text-[50px] lg:text-[58px]">
              BUILD A PROFILE THAT FEELS LIKE THE STUDENT.
            </h1>
            <p className="mt-6 text-[18px] leading-[1.65] text-[#E9F0F6]/90">
              The goal isn&apos;t to collect activities. The goal is to develop depth around
              genuine interests.
            </p>
            <div className="mt-10">
              <button
                type="button"
                onClick={() => onNavigate('/contact')}
                className="inline-flex items-center gap-3 bg-[#C4A56A] px-7 py-4 text-[13px] font-semibold tracking-[0.08em] text-[#071A33] uppercase whitespace-nowrap hover:bg-[#d4b77e]"
              >
                <span>BUILD MY CHILD&apos;S ROADMAP</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Seven Pillars of Profile Building */}
      <section className="bg-[#F7F5F0] py-20 text-[#1C2630] lg:py-28">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-[12px] font-semibold tracking-[0.16em] text-[#164A78] uppercase">
              DIMENSIONS OF DEPTH
            </p>
            <h2 className="mt-3 font-serif text-[34px] leading-[1.12] text-[#071A33] md:text-[44px]">
              BUILD A STRONGER PROFILE, NOT A LONGER RESUME.
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 border-t border-l border-[#1C2630]/15 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p, idx) => (
              <div
                key={p.title}
                className={`border-r border-b border-[#1C2630]/15 bg-[#FFFFFF] p-8 ${
                  idx === 6 ? 'md:col-span-2 lg:col-span-3' : ''
                }`}
              >
                <span className="font-mono text-[12px] text-[#164A78]">0{idx + 1}</span>
                <h3 className="mt-2 font-serif text-[26px] text-[#071A33]">{p.title}</h3>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#1C2630]/80">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real Student Profile Examples */}
      <section className="border-t border-[#1C2630]/15 bg-[#FFFFFF] py-20 text-[#1C2630] lg:py-28">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-[12px] font-semibold tracking-[0.16em] text-[#164A78] uppercase">
              VERIFIED STUDENT EXAMPLES
            </p>
            <h2 className="mt-3 font-serif text-[34px] leading-[1.12] text-[#071A33] md:text-[44px]">
              HOW REAL STUDENTS BUILT DEPTH OVER TIME.
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {profileExamples.map((ex) => (
              <div key={ex.id} className="border border-[#1C2630]/15 bg-[#F7F5F0] p-8">
                <div className="flex items-center justify-between text-[12px] font-medium tracking-wider text-[#164A78] uppercase">
                  <span>{ex.name} ({ex.displayName})</span>
                  <span>Class of {ex.classOf}</span>
                </div>
                <h3 className="mt-2 font-serif text-[24px] text-[#071A33]">
                  {ex.university} — {ex.course}
                </h3>
                <p className="mt-1 text-[13px] font-semibold text-[#C4A56A]">
                  Academics: {ex.academicPerformance}
                </p>
                <div className="mt-5 space-y-3 border-t border-[#1C2630]/15 pt-4 text-[14px]">
                  {ex.projects && (
                    <p>
                      <strong className="text-[#071A33]">Project:</strong> {ex.projects}
                    </p>
                  )}
                  {ex.competitionsAwards && (
                    <p>
                      <strong className="text-[#071A33]">Competitions:</strong>{' '}
                      {ex.competitionsAwards}
                    </p>
                  )}
                  {ex.research && (
                    <p>
                      <strong className="text-[#071A33]">Research:</strong> {ex.research}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA onNavigate={onNavigate} />
    </div>
  );
};

/* ============================================================================
 * 29 — /research — RESEARCH MENTORSHIP PAGE
 * ============================================================================ */
export const ResearchPage: React.FC<PageProps> = ({ onNavigate }) => {
  const researchSteps = [
    {
      step: '01',
      label: 'INTEREST',
      desc: 'Identifying a genuine subject area—from computational biology or fluid dynamics to development economics or cognitive psychology.',
    },
    {
      step: '02',
      label: 'QUESTION',
      desc: 'Narrowing a broad field into a focused, testable research question through structured literature review.',
    },
    {
      step: '03',
      label: 'MENTOR',
      desc: 'Pairing the student one-on-one with an experienced researcher or PhD scholar in their discipline.',
    },
    {
      step: '04',
      label: 'METHODOLOGY',
      desc: 'Learning quantitative, experimental, computational, or archival research methods appropriate to the question.',
    },
    {
      step: '05',
      label: 'RESEARCH',
      desc: 'Executing data collection, simulation modeling, primary source investigation, or empirical analysis.',
    },
    {
      step: '06',
      label: 'ANALYSIS',
      desc: 'Evaluating findings critically, testing statistical or logical validity, and understanding limitations.',
    },
    {
      step: '07',
      label: 'PAPER',
      desc: 'Writing a rigorous, properly cited academic paper in the student’s own scholarly voice.',
    },
    {
      step: '08',
      label: 'PRESENTATION / PUBLICATION WHERE APPROPRIATE',
      desc: 'Preparing conference presentations, research abstracts, or academic submissions where appropriate to the student’s work.',
    },
  ];

  const researchRecords = SHEET_STUDENTS_DATA.filter((s) => s.research).slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#071A33] pt-32 pb-20 text-[#F7F5F0] lg:pt-40 lg:pb-28">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-[12px] font-medium tracking-[0.18em] text-[#C4A56A] uppercase">
                SCHOLARLY MENTORSHIP
              </p>
              <h1 className="mt-4 font-serif text-[38px] leading-[1.08] text-[#FFFFFF] sm:text-[50px] lg:text-[58px]">
                RESEARCH STARTS WITH CURIOSITY.
              </h1>
              <p className="mt-6 max-w-2xl text-[17px] leading-[1.65] text-[#E9F0F6]/85 sm:text-[18px]">
                Students can work with experienced researchers and PhD scholars to explore
                questions beyond the school curriculum.
              </p>
              <div className="mt-10">
                <button
                  type="button"
                  onClick={() => onNavigate('/contact')}
                  className="inline-flex items-center gap-3 bg-[#C4A56A] px-7 py-4 text-[13px] font-semibold tracking-[0.08em] text-[#071A33] uppercase whitespace-nowrap hover:bg-[#d4b77e]"
                >
                  <span>BUILD MY CHILD&apos;S ROADMAP</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="lg:col-span-5">
              <EditorialImage
                src={IMAGES.researchLab}
                alt="Student researcher working in laboratory with notebooks"
                aspectClass="aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Research Journey */}
      <section className="bg-[#F7F5F0] py-20 text-[#1C2630] lg:py-28">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-[12px] font-semibold tracking-[0.16em] text-[#164A78] uppercase">
              THE RESEARCH JOURNEY
            </p>
            <h2 className="mt-3 font-serif text-[34px] leading-[1.12] text-[#071A33] md:text-[44px]">
              FROM INITIAL WONDER TO RIGOROUS ACADEMIC INQUIRY.
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-[#1C2630]/80">
              Our focus is intellectual integrity: teaching students how to frame a meaningful
              question, apply sound methodology, and articulate what they discovered.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 border-t border-l border-[#1C2630]/15 md:grid-cols-2 lg:grid-cols-4">
            {researchSteps.map((st) => (
              <div
                key={st.step}
                className="flex flex-col justify-between border-r border-b border-[#1C2630]/15 bg-[#FFFFFF] p-7"
              >
                <div>
                  <span className="font-mono text-[12px] text-[#C4A56A]">{st.step}</span>
                  <h3 className="mt-3 font-serif text-[22px] text-[#071A33]">{st.label}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-[#1C2630]/80">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Examples of Student Research */}
          <div className="mt-20">
            <h3 className="font-serif text-[28px] text-[#071A33] md:text-[34px]">
              Selected Student Research Inquiries
            </h3>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {researchRecords.map((rec) => (
                <div
                  key={rec.id}
                  className="border border-[#1C2630]/15 bg-[#FFFFFF] p-7"
                >
                  <div className="flex items-center justify-between text-[11px] font-semibold tracking-[0.14em] text-[#164A78] uppercase">
                    <span>{rec.country}</span>
                    <span>Class of {rec.classOf}</span>
                  </div>
                  <h4 className="mt-2 font-serif text-[20px] text-[#071A33]">
                    {rec.university}
                  </h4>
                  <p className="text-[13px] font-medium text-[#0D2947]">{rec.course}</p>
                  <p className="mt-3 text-[14px] leading-relaxed text-[#1C2630]/85">
                    {rec.research}
                  </p>
                  <div className="mt-5 border-t border-[#1C2630]/10 pt-3 text-[12px] text-[#1C2630]/65">
                    {rec.name} ({rec.displayName}) · Academics: {rec.academicPerformance}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FinalCTA onNavigate={onNavigate} />
    </div>
  );
};

/* ============================================================================
 * 30 — /work-experience — WORK EXPERIENCE PAGE
 * ============================================================================ */
export const WorkExperiencePage: React.FC<PageProps> = ({ onNavigate }) => {
  const workPillars = [
    {
      title: 'Job Simulations',
      desc: 'Structured role simulations in engineering, quantitative finance, policy analysis, and product design that teach practical problem-solving.',
    },
    {
      title: 'Internships',
      desc: 'Guided summer placements with startups, research foundations, architecture studios, and industrial firms where students contribute to real deliverables.',
    },
    {
      title: 'Professional Projects',
      desc: 'Scoped analytical or technical projects—such as data dashboards, supply-chain audits, or clinical observation logs—supervised by practitioners.',
    },
    {
      title: 'Industry Exposure',
      desc: 'First-hand observation of professional environments so students understand the daily realities of the careers they aspire to enter.',
    },
    {
      title: 'Career Exploration',
      desc: 'Connecting classroom subjects with emerging global industries before finalising university major declarations.',
    },
  ];

  const workExamples = SHEET_STUDENTS_DATA.filter((s) => s.internshipWork).slice(0, 8);

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#071A33] pt-32 pb-20 text-[#F7F5F0] lg:pt-40 lg:pb-28">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-[12px] font-medium tracking-[0.18em] text-[#C4A56A] uppercase">
              BEYOND THE CLASSROOM
            </p>
            <h1 className="mt-4 font-serif text-[38px] leading-[1.08] text-[#FFFFFF] sm:text-[50px] lg:text-[58px]">
              EXPERIENCE THE WORLD YOU&apos;RE PREPARING TO ENTER.
            </h1>
            <p className="mt-6 text-[17px] leading-[1.65] text-[#E9F0F6]/85 sm:text-[18px]">
              Work experience is not about collecting a corporate logo on a resume. It is about
              meaningful learning—testing academic interests in real professional environments and
              maturing in perspective before university.
            </p>
            <div className="mt-10">
              <button
                type="button"
                onClick={() => onNavigate('/contact')}
                className="inline-flex items-center gap-3 bg-[#C4A56A] px-7 py-4 text-[13px] font-semibold tracking-[0.08em] text-[#071A33] uppercase whitespace-nowrap hover:bg-[#d4b77e]"
              >
                <span>BUILD MY CHILD&apos;S ROADMAP</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Five Pillars */}
      <section className="bg-[#F7F5F0] py-20 text-[#1C2630] lg:py-28">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 border-t border-l border-[#1C2630]/15 md:grid-cols-2 lg:grid-cols-3">
            {workPillars.map((w, idx) => (
              <div
                key={w.title}
                className={`border-r border-b border-[#1C2630]/15 bg-[#FFFFFF] p-8 ${
                  idx === 4 ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <span className="font-mono text-[12px] text-[#164A78]">0{idx + 1}</span>
                <h2 className="mt-3 font-serif text-[26px] text-[#071A33]">{w.title}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-[#1C2630]/80">{w.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-20">
            <h3 className="font-serif text-[28px] text-[#071A33] md:text-[34px]">
              How Students Integrated Work Experience Into Their Journey
            </h3>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              {workExamples.map((ex) => (
                <div key={ex.id} className="border border-[#1C2630]/15 bg-[#FFFFFF] p-7">
                  <div className="flex items-center gap-2 text-[12px] text-[#164A78]">
                    <span>{ex.displayName}</span>
                    <span>·</span>
                    <span>{ex.university}</span>
                  </div>
                  <p className="mt-2 font-serif text-[20px] text-[#071A33]">{ex.course}</p>
                  <p className="mt-3 text-[14px] leading-relaxed text-[#1C2630]/80">
                    {ex.internshipWork}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FinalCTA onNavigate={onNavigate} />
    </div>
  );
};

/* ============================================================================
 * 31 — /sat — SAT PREPARATION PAGE
 * ============================================================================ */
export const SatPage: React.FC<PageProps> = ({ onNavigate }) => {
  const satComponents = [
    {
      title: 'Live Classes',
      desc: 'Structured, concept-first instruction across Reading & Writing and Mathematics, taught by specialist faculty who understand the Digital SAT adaptive architecture.',
    },
    {
      title: 'Practice',
      desc: 'Curated question banks calibrated by difficulty tier and topic domain so students build accuracy before speed.',
    },
    {
      title: 'Mock Tests',
      desc: 'Full-length adaptive Digital SAT simulations conducted under timed testing conditions to build stamina and pacing discipline.',
    },
    {
      title: 'Doubt Sessions',
      desc: 'Dedicated one-on-one and small-group analytical clinics to resolve conceptual bottlenecks immediately.',
    },
    {
      title: 'Performance Review',
      desc: 'Granular post-mock error classification—distinguishing between conceptual gaps, trap-answer patterns, and time-management slips.',
    },
    {
      title: 'Progress Tracking',
      desc: 'Transparent milestone tracking shared with parents and integrated directly with the student’s broader admissions calendar.',
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#071A33] pt-32 pb-20 text-[#F7F5F0] lg:pt-40 lg:pb-28">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-[12px] font-medium tracking-[0.18em] text-[#C4A56A] uppercase">
              STANDARDIZED TESTING STRATEGY
            </p>
            <h1 className="mt-4 font-serif text-[38px] leading-[1.08] text-[#FFFFFF] sm:text-[50px] lg:text-[58px]">
              PREPARE WITH A PLAN. PRACTISE WITH PURPOSE.
            </h1>
            <p className="mt-6 text-[17px] leading-[1.65] text-[#E9F0F6]/85 sm:text-[18px]">
              SAT preparation works best when it is planned around your child&apos;s school
              curriculum and admissions timeline—not treated as an isolated, endless coaching loop.
            </p>
            <div className="mt-10">
              <button
                type="button"
                onClick={() => onNavigate('/contact')}
                className="inline-flex items-center gap-3 bg-[#C4A56A] px-7 py-4 text-[13px] font-semibold tracking-[0.08em] text-[#071A33] uppercase whitespace-nowrap hover:bg-[#d4b77e]"
              >
                <span>BUILD MY CHILD&apos;S ROADMAP</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Six Core SAT Pillars */}
      <section className="bg-[#F7F5F0] py-20 text-[#1C2630] lg:py-28">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-[12px] font-semibold tracking-[0.16em] text-[#164A78] uppercase">
              STRUCTURED PREPARATION SYSTEM
            </p>
            <h2 className="mt-3 font-serif text-[34px] leading-[1.12] text-[#071A33] md:text-[44px]">
              DISCIPLINED INSTRUCTION. MEASURED PROGRESS.
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 border-t border-l border-[#1C2630]/15 md:grid-cols-2 lg:grid-cols-3">
            {satComponents.map((comp, idx) => (
              <div
                key={comp.title}
                className="border-r border-b border-[#1C2630]/15 bg-[#FFFFFF] p-8"
              >
                <span className="font-mono text-[12px] text-[#C4A56A]">0{idx + 1}</span>
                <h3 className="mt-3 font-serif text-[26px] text-[#071A33]">{comp.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#1C2630]/80">{comp.desc}</p>
              </div>
            ))}
          </div>

          {/* Testing Timeline Integration */}
          <div className="mt-16 border border-[#1C2630]/15 bg-[#0D2947] p-8 text-[#F7F5F0] sm:p-12">
            <p className="text-[12px] font-semibold tracking-[0.16em] text-[#C4A56A] uppercase">
              TIMING THE SAT WITHIN THE ROADMAP
            </p>
            <h3 className="mt-3 font-serif text-[28px] text-[#FFFFFF] md:text-[34px]">
              Why We Synchronise SAT Preparation With Class 10 &amp; 11
            </h3>
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="border-l border-[#C4A56A]/60 pl-5">
                <p className="text-[12px] font-semibold tracking-wider text-[#C4A56A] uppercase">
                  PHASE 1 · LATE CLASS 10
                </p>
                <p className="mt-2 font-serif text-[20px] text-white">Diagnostic Baseline</p>
                <p className="mt-2 text-[14px] leading-relaxed text-[#E9F0F6]/80">
                  Establish baseline verbal and mathematical scores immediately after Class 10
                  boards, identifying foundational gaps early.
                </p>
              </div>
              <div className="border-l border-[#C4A56A]/60 pl-5">
                <p className="text-[12px] font-semibold tracking-wider text-[#C4A56A] uppercase">
                  PHASE 2 · CLASS 11
                </p>
                <p className="mt-2 font-serif text-[20px] text-white">
                  Structured Classes &amp; Mocks
                </p>
                <p className="mt-2 text-[14px] leading-relaxed text-[#E9F0F6]/80">
                  Complete live instruction, targeted practice sets, and full adaptive mock reviews
                  to sit the official Digital SAT with confidence.
                </p>
              </div>
              <div className="border-l border-[#C4A56A]/60 pl-5">
                <p className="text-[12px] font-semibold tracking-wider text-[#C4A56A] uppercase">
                  PHASE 3 · ENTERING CLASS 12
                </p>
                <p className="mt-2 font-serif text-[20px] text-white">
                  Clear Runway for Applications
                </p>
                <p className="mt-2 text-[14px] leading-relaxed text-[#E9F0F6]/80">
                  With testing completed ahead of senior year, the student dedicates Class 12 to
                  board exams, research completion, and university essays.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA onNavigate={onNavigate} />
    </div>
  );
};
