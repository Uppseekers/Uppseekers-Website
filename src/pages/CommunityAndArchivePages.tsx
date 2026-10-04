import React, { useState, useEffect } from 'react';
import {
  PageRoute,
  DestinationCountry,
  DESTINATIONS,
  UNIVERSITY_MENTORS_DATA,
  SHEET_STUDENTS_DATA,
  SheetStudentAdmissionRecord,
  JOURNAL_CATEGORIES,
  JournalCategory,
  JournalArticle,
  IMAGES,
} from '../data/uppseekersData';
import { useSiteData } from '../context/SiteDataContext';
import { EditorialImage, FinalCTA, LeadForm } from '../components/SharedComponents';
import {
  ArrowRight,
  Search,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Layers,
  BookOpen,
  Users,
} from 'lucide-react';

interface PageProps {
  onNavigate: (page: PageRoute, filterCountry?: DestinationCountry) => void;
  initialCountryFilter?: DestinationCountry;
}

/* ============================================================================
 * 32 & 41 — /results — STUDENT RESULTS PAGE & VERIFIED DATA VISUALISATION
 * ============================================================================ */
export const ResultsPage: React.FC<PageProps> = ({ onNavigate, initialCountryFilter }) => {
  const { universities, profileActivities, researchTopics, pagesContent } = useSiteData();
  const pageCopy = pagesContent.results || {
    eyebrow: 'VERIFIED STUDENT OUTCOMES · ADMISSIONS ARCHIVE',
    headline: 'WHERE OUR STUDENTS HAVE BEEN ADMITTED.',
    subhead:
      'Explore verified university admissions, student numbers, key profile building tracks, and research inquiry topics across leading global universities.',
  };

  const [countryFilter, setCountryFilter] = useState<'All' | DestinationCountry>(
    initialCountryFilter || 'All'
  );
  const [uniCountryFilter, setUniCountryFilter] = useState<'All' | string>('All');
  const [yearFilter, setYearFilter] = useState<'All' | '2028' | '2029' | '2030'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedStudentId, setExpandedStudentId] = useState<string | null>(null);

  useEffect(() => {
    if (initialCountryFilter) {
      setCountryFilter(initialCountryFilter);
    }
  }, [initialCountryFilter]);

  // Filtered universities
  const filteredUniversities = universities.filter(
    (u) => uniCountryFilter === 'All' || u.country === uniCountryFilter
  );

  const totalAdmissionsCount = universities.reduce((acc, u) => acc + (u.admissionsCount || 1), 0);

  const filteredRecords = SHEET_STUDENTS_DATA.filter((rec) => {
    const matchesCountry = countryFilter === 'All' || rec.country === countryFilter;
    const matchesYear = yearFilter === 'All' || rec.classOf === yearFilter;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      rec.university.toLowerCase().includes(q) ||
      rec.course.toLowerCase().includes(q) ||
      rec.academicPerformance.toLowerCase().includes(q) ||
      (rec.research && rec.research.toLowerCase().includes(q)) ||
      (rec.internshipWork && rec.internshipWork.toLowerCase().includes(q)) ||
      (rec.projects && rec.projects.toLowerCase().includes(q)) ||
      (rec.competitionsAwards && rec.competitionsAwards.toLowerCase().includes(q)) ||
      (rec.summerPrograms && rec.summerPrograms.toLowerCase().includes(q));
    return matchesCountry && matchesYear && matchesSearch;
  });

  // Country counts calculated directly from sheet
  const countryCounts: Record<string, number> = {};
  SHEET_STUDENTS_DATA.forEach((s) => {
    countryCounts[s.country] = (countryCounts[s.country] || 0) + 1;
  });

  const countryTotals = DESTINATIONS.map((c) => ({
    country: c,
    count: countryCounts[c] || 0,
  })).sort((a, b) => b.count - a.count);

  const maxCountryCount = Math.max(...countryTotals.map((c) => c.count), 1);

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#071A33] pt-32 pb-20 text-[#F7F5F0] lg:pt-40 lg:pb-24">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="text-[12px] font-medium tracking-[0.18em] text-[#C4A56A] uppercase">
                {pageCopy.eyebrow}
              </p>
              <h1 className="mt-4 font-serif text-[38px] leading-[1.08] text-[#FFFFFF] sm:text-[50px] lg:text-[58px]">
                {pageCopy.headline}
              </h1>
              <p className="mt-5 max-w-2xl text-[17px] leading-[1.65] text-[#E9F0F6]/85">
                {pageCopy.subhead}
              </p>
            </div>
            <div className="border-l border-[#C4A56A]/60 pl-6 lg:col-span-4">
              <p className="font-serif text-[52px] leading-none text-[#C4A56A] tabular-nums">
                {totalAdmissionsCount}+
              </p>
              <p className="mt-2 text-[14px] font-semibold tracking-[0.14em] text-[#FFFFFF] uppercase">
                TOTAL STUDENT ADMISSIONS
              </p>
              <p className="mt-1 text-[13px] text-[#E9F0F6]/70">
                {universities.length}+ Universities · {SHEET_STUDENTS_DATA.length} Documented Trajectories
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 1. LIST OF UNIVERSITIES & NUMBER OF STUDENTS */}
      <section id="universities-list" className="border-b border-[#1C2630]/15 bg-[#FFFFFF] py-20 text-[#1C2630] lg:py-24">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="flex items-center gap-2 text-[12px] font-semibold tracking-[0.16em] text-[#164A78] uppercase">
                <GraduationCap className="h-4 w-4 text-[#C4A56A]" />
                <span>ADMITTED UNIVERSITIES &amp; PLACEMENT COUNTS</span>
              </div>
              <h2 className="mt-3 font-serif text-[32px] leading-[1.15] text-[#071A33] md:text-[42px]">
                List of Universities &amp; Number of Students
              </h2>
              <p className="mt-3 max-w-2xl text-[16px] text-[#1C2630]/80">
                Verified admissions numbers across top-tier institutions worldwide. Every placement represents documented multi-year preparation and authentic academic alignment.
              </p>
            </div>

            {/* Region Filter for Universities */}
            <div className="flex flex-wrap gap-1.5">
              {['All', 'USA', 'UK', 'Canada', 'Singapore', 'Australia', 'Hong Kong', 'Germany', 'Europe'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setUniCountryFilter(r)}
                  className={`border px-3.5 py-1.5 text-[12px] font-medium tracking-wider uppercase transition-colors ${
                    uniCountryFilter === r
                      ? 'border-[#071A33] bg-[#071A33] text-[#FFFFFF]'
                      : 'border-[#1C2630]/20 bg-[#F7F5F0] text-[#1C2630] hover:border-[#071A33]'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Universities Grid */}
          <div className="mt-10 grid grid-cols-1 border-t border-l border-[#1C2630]/15 sm:grid-cols-2 lg:grid-cols-4">
            {filteredUniversities.map((uni) => (
              <div
                key={uni.name}
                className="flex flex-col justify-between border-r border-b border-[#1C2630]/15 bg-[#FFFFFF] p-6 transition-all hover:bg-[#F7F5F0]/60"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#1C2630]/10 pb-3">
                    <span className="text-[11px] font-semibold tracking-wider text-[#164A78] uppercase">
                      {uni.country} {uni.city ? `· ${uni.city}` : ''}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded bg-[#071A33] px-2.5 py-0.5 font-mono text-[12px] font-bold text-white tabular-nums">
                      {uni.admissionsCount} {uni.admissionsCount === 1 ? 'Student' : 'Students'}
                    </span>
                  </div>
                  <h3 className="mt-4 font-serif text-[21px] leading-snug text-[#071A33]">
                    {uni.name}
                  </h3>
                </div>

                <div className="mt-6 border-t border-[#1C2630]/10 pt-3">
                  <p className="text-[10px] font-semibold tracking-wider text-[#1C2630]/60 uppercase">
                    Notable Admitted Courses
                  </p>
                  <p className="mt-1 text-[12px] leading-relaxed text-[#0D2947] font-medium">
                    {uni.notableCourses?.join(' · ') || 'Computer Science · Economics'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Aggregate Callout */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border border-[#1C2630]/15 bg-[#F7F5F0] p-6 text-[14px]">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#071A33] text-white">
                <Users className="h-4 w-4 text-[#C4A56A]" />
              </span>
              <span className="text-[#071A33]">
                Total of <strong>{totalAdmissionsCount} student admissions</strong> across <strong>{universities.length} world-renowned universities</strong>.
              </span>
            </div>
            <a
              href="#admitted-records"
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-wider text-[#164A78] uppercase hover:underline"
            >
              <span>Explore Student Trajectories Below</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* 2. PROFILE ACTIVITIES (4-5 TRACKS) */}
      <section className="border-b border-[#1C2630]/15 bg-[#F7F5F0] py-20 text-[#1C2630] lg:py-24">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div>
            <div className="flex items-center gap-2 text-[12px] font-semibold tracking-[0.16em] text-[#164A78] uppercase">
              <Layers className="h-4 w-4 text-[#C4A56A]" />
              <span>AUTHENTIC PROFILE ARCHITECTURE</span>
            </div>
            <h2 className="mt-3 font-serif text-[32px] leading-[1.15] text-[#071A33] md:text-[42px]">
              Profile Activities (4–5 Core Involvements)
            </h2>
            <p className="mt-3 max-w-2xl text-[16px] text-[#1C2630]/80">
              Rather than generic extracurricular lists, our students build depth across 4–5 rigorous profile tracks that provide clear evidence of sustained intellectual curiosity and leadership.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {profileActivities.slice(0, 5).map((act, idx) => (
              <div
                key={act.id || idx}
                className="flex flex-col justify-between border border-[#1C2630]/15 bg-[#FFFFFF] p-8 shadow-sm transition-shadow hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#1C2630]/10 pb-4">
                    <span className="text-[11px] font-semibold tracking-wider text-[#C4A56A] uppercase">
                      Track 0{idx + 1} · {act.category}
                    </span>
                    <span className="rounded bg-[#F7F5F0] px-2.5 py-1 text-[11px] font-medium text-[#164A78]">
                      {act.studentInvolvement}
                    </span>
                  </div>

                  <h3 className="mt-5 font-serif text-[23px] text-[#071A33] leading-snug">
                    {act.title}
                  </h3>

                  <p className="mt-3 text-[14px] leading-relaxed text-[#1C2630]/80">
                    {act.description}
                  </p>

                  <div className="mt-6 border-t border-[#1C2630]/10 pt-4">
                    <p className="text-[11px] font-semibold tracking-wider text-[#071A33] uppercase">
                      Verified Cohort Highlights:
                    </p>
                    <ul className="mt-3 space-y-2 text-[13px] text-[#1C2630]/85">
                      {act.highlights?.map((hl, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#164A78]" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 border-t border-[#1C2630]/10 pt-4 text-[12px] font-medium text-[#164A78]">
                  Verified Track Documentation · Classes 8–12
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. RESEARCH TOPICS (4-5 TOPICS) */}
      <section className="border-b border-[#1C2630]/15 bg-[#FFFFFF] py-20 text-[#1C2630] lg:py-24">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div>
            <div className="flex items-center gap-2 text-[12px] font-semibold tracking-[0.16em] text-[#164A78] uppercase">
              <BookOpen className="h-4 w-4 text-[#C4A56A]" />
              <span>SCHOLARLY INQUIRY &amp; FACULTY MENTORSHIP</span>
            </div>
            <h2 className="mt-3 font-serif text-[32px] leading-[1.15] text-[#071A33] md:text-[42px]">
              Research Topics (4–5 Academic Inquiries)
            </h2>
            <p className="mt-3 max-w-2xl text-[16px] text-[#1C2630]/80">
              Students conduct rigorous, faculty-mentored investigations beyond high school curricula. These inquiries demonstrate methodological discipline and intellectual readiness for top university seminars.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {researchTopics.slice(0, 5).map((topic, idx) => (
              <div
                key={topic.id || idx}
                className="flex flex-col justify-between border border-[#1C2630]/15 bg-[#F7F5F0] p-8 shadow-sm transition-shadow hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#1C2630]/10 pb-4">
                    <span className="text-[11px] font-semibold tracking-wider text-[#164A78] uppercase">
                      Topic 0{idx + 1}
                    </span>
                    <span className="rounded bg-white px-2.5 py-1 text-[11px] font-semibold text-[#071A33] border border-[#1C2630]/15">
                      {topic.field}
                    </span>
                  </div>

                  <h3 className="mt-5 font-serif text-[23px] text-[#071A33] leading-snug">
                    {topic.title}
                  </h3>

                  <p className="mt-3 text-[14px] leading-relaxed text-[#1C2630]/85">
                    {topic.description}
                  </p>

                  <div className="mt-6 border-t border-[#1C2630]/10 pt-4">
                    <p className="text-[11px] font-semibold tracking-wider text-[#071A33] uppercase">
                      Research Methodology:
                    </p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-[#1C2630]/80">
                      {topic.methodology}
                    </p>
                  </div>
                </div>

                <div className="mt-8 border-t border-[#1C2630]/10 pt-4">
                  <p className="text-[11px] font-semibold tracking-wider text-[#164A78] uppercase">
                    Admitted University Destinations:
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {topic.admittedUniversities?.map((u) => (
                      <span
                        key={u}
                        className="rounded bg-white px-2 py-0.5 text-[11px] font-medium text-[#071A33] border border-[#1C2630]/10"
                      >
                        {u}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SEARCHABLE ADMITTED SCHOLAR CATALOG (NO STUDENT NAMES, NO LINKEDIN LINKS) */}
      <section id="admitted-records" className="bg-[#F7F5F0] py-20 text-[#1C2630] lg:py-24">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-[12px] font-semibold tracking-[0.16em] text-[#164A78] uppercase">
              DOCUMENTED ADMISSIONS PROFILES
            </p>
            <h2 className="mt-2 font-serif text-[32px] text-[#071A33] md:text-[42px]">
              Searchable Student Admissions Catalog
            </h2>
            <p className="mt-2 text-[15px] text-[#1C2630]/75">
              Explore individual admissions records with full academic performance, degrees, research, internships, and project details. Student records are fully anonymized for privacy.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="mt-8 border border-[#1C2630]/15 bg-[#FFFFFF] p-6 shadow-sm">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-5">
                <label
                  htmlFor="archive-search"
                  className="block text-[11px] font-semibold tracking-[0.14em] text-[#071A33] uppercase"
                >
                  Search University, Course, Research or Topic
                </label>
                <div className="relative mt-2">
                  <Search className="pointer-events-none absolute top-3.5 left-3.5 h-4 w-4 text-[#1C2630]/45" />
                  <input
                    id="archive-search"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g. Stanford, UCL, Computer Science, Cryptography, Robotics..."
                    className="w-full border border-[#1C2630]/20 bg-[#F7F5F0]/50 py-2.5 pr-4 pl-10 text-[14px] text-[#1C2630] placeholder:text-[#1C2630]/45 focus:border-[#071A33] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="lg:col-span-5">
                <span className="block text-[11px] font-semibold tracking-[0.14em] text-[#071A33] uppercase">
                  Filter by Destination Country
                </span>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {(['All', ...DESTINATIONS] as const).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCountryFilter(c)}
                      className={`border px-3 py-1.5 text-[12px] font-medium whitespace-nowrap transition-colors ${
                        countryFilter === c
                          ? 'border-[#071A33] bg-[#071A33] text-[#FFFFFF]'
                          : 'border-[#1C2630]/20 bg-[#FFFFFF] text-[#1C2630] hover:border-[#071A33]'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-2">
                <span className="block text-[11px] font-semibold tracking-[0.14em] text-[#071A33] uppercase">
                  Class Cohort
                </span>
                <div className="mt-2 flex gap-1.5">
                  {(['All', '2028', '2029', '2030'] as const).map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setYearFilter(yr)}
                      className={`flex-1 border py-1.5 text-[12px] font-medium tabular-nums transition-colors ${
                        yearFilter === yr
                          ? 'border-[#0D2947] bg-[#0D2947] text-[#FFFFFF]'
                          : 'border-[#1C2630]/20 bg-[#FFFFFF] text-[#1C2630]'
                      }`}
                    >
                      {yr}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Table / Editorial Catalog (NO STUDENT NAMES, NO LINKEDIN LINKS) */}
          <div className="mt-10 border-t border-l border-[#1C2630]/15">
            {filteredRecords.length === 0 ? (
              <div className="border-r border-b border-[#1C2630]/15 bg-[#FFFFFF] p-12 text-center">
                <p className="font-serif text-2xl text-[#071A33]">
                  No admissions match your current filter selection.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setCountryFilter('All');
                    setYearFilter('All');
                    setSearchQuery('');
                  }}
                  className="mt-4 text-[13px] font-semibold tracking-wider text-[#164A78] uppercase underline"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredRecords.map((rec) => {
                  const isExpanded = expandedStudentId === rec.id;
                  return (
                    <div
                      key={rec.id}
                      className="flex flex-col justify-between border-r border-b border-[#1C2630]/15 bg-[#FFFFFF] p-7 transition-shadow hover:shadow-md"
                    >
                      <div>
                        {/* Header Badges */}
                        <div className="flex items-center justify-between text-[12px] text-[#1C2630]/60">
                          <span className="font-semibold text-[#164A78] uppercase">
                            {rec.country}
                          </span>
                          <span className="font-mono tabular-nums">Class of {rec.classOf}</span>
                        </div>

                        {/* University & Course */}
                        <h3 className="mt-3 font-serif text-[23px] leading-snug text-[#071A33]">
                          {rec.university}
                        </h3>
                        <p className="mt-1 text-[15px] font-medium text-[#0D2947]">{rec.course}</p>

                        {/* Academic Performance Tag */}
                        <div className="mt-3 flex items-center gap-2">
                          <span className="inline-block border border-[#C4A56A]/50 bg-[#F7F5F0] px-2.5 py-1 text-[12px] font-semibold text-[#071A33]">
                            Academics: {rec.academicPerformance}
                          </span>
                        </div>

                        {/* Core Involvements */}
                        <div className="mt-6 space-y-4 border-t border-[#1C2630]/10 pt-4 text-[13px]">
                          {rec.research && (
                            <div>
                              <p className="text-[11px] font-semibold tracking-wider text-[#164A78] uppercase">
                                Research &amp; Inquiry
                              </p>
                              <p className="mt-1 leading-relaxed text-[#1C2630]/85">
                                {rec.research}
                              </p>
                            </div>
                          )}

                          {rec.internshipWork && (
                            <div>
                              <p className="text-[11px] font-semibold tracking-wider text-[#164A78] uppercase">
                                Work Experience &amp; Internships
                              </p>
                              <p className="mt-1 leading-relaxed text-[#1C2630]/85">
                                {rec.internshipWork}
                              </p>
                            </div>
                          )}

                          {rec.projects && (
                            <div>
                              <p className="text-[11px] font-semibold tracking-wider text-[#164A78] uppercase">
                                Applied Builds &amp; Technical Projects
                              </p>
                              <p className="mt-1 leading-relaxed text-[#1C2630]/85">
                                {rec.projects}
                              </p>
                            </div>
                          )}

                          {rec.competitionsAwards && (
                            <div>
                              <p className="text-[11px] font-semibold tracking-wider text-[#164A78] uppercase">
                                Competitions &amp; Honors
                              </p>
                              <p className="mt-1 leading-relaxed text-[#1C2630]/85">
                                {rec.competitionsAwards}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Expandable Section */}
                        {isExpanded && (
                          <div className="mt-4 space-y-4 border-t border-[#1C2630]/10 pt-4 text-[13px]">
                            {rec.summerPrograms && (
                              <div>
                                <p className="text-[11px] font-semibold tracking-wider text-[#071A33] uppercase">
                                  Summer Programs
                                </p>
                                <p className="mt-1 leading-relaxed text-[#1C2630]/80">
                                  {rec.summerPrograms}
                                </p>
                              </div>
                            )}
                            {rec.certificates && (
                              <div>
                                <p className="text-[11px] font-semibold tracking-wider text-[#071A33] uppercase">
                                  Certificates &amp; MOOCs
                                </p>
                                <p className="mt-1 leading-relaxed text-[#1C2630]/80">
                                  {rec.certificates}
                                </p>
                              </div>
                            )}
                            {rec.otherActivities && (
                              <div>
                                <p className="text-[11px] font-semibold tracking-wider text-[#071A33] uppercase">
                                  Campus &amp; Co-Curricular
                                </p>
                                <p className="mt-1 leading-relaxed text-[#1C2630]/80">
                                  {rec.otherActivities}
                                </p>
                              </div>
                            )}
                            {rec.notes && (
                              <div>
                                <p className="text-[11px] font-semibold tracking-wider text-[#071A33] uppercase">
                                  Advisory Notes
                                </p>
                                <p className="mt-1 leading-relaxed text-[#1C2630]/80">{rec.notes}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Footer: Anonymous Scholar Label (NO STUDENT NAMES, NO LINKEDIN LINKS) */}
                      <div className="mt-6 border-t border-[#1C2630]/10 pt-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[12px] font-semibold tracking-wider text-[#164A78] uppercase">
                              Admitted Scholar
                            </span>
                            <span className="ml-2 text-[11px] text-[#1C2630]/60">
                              (Verified Offer)
                            </span>
                          </div>
                        </div>

                        {(rec.summerPrograms ||
                          rec.certificates ||
                          rec.otherActivities ||
                          rec.notes) && (
                          <button
                            type="button"
                            onClick={() => setExpandedStudentId(isExpanded ? null : rec.id)}
                            className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold tracking-wider text-[#164A78] uppercase hover:underline"
                          >
                            <span>{isExpanded ? 'Hide Extra Details' : 'View Full Involvements'}</span>
                            {isExpanded ? (
                              <ChevronUp className="h-3.5 w-3.5" />
                            ) : (
                              <ChevronDown className="h-3.5 w-3.5" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      <FinalCTA onNavigate={onNavigate} />
    </div>
  );
};

/* ============================================================================
 * 33 — /student-stories — STUDENT STORIES PAGE (VERIFIED SHEET ADMISSIONS)
 * ============================================================================ */
export const StudentStoriesPage: React.FC<PageProps> = ({ onNavigate }) => {
  const featuredStories = SHEET_STUDENTS_DATA.slice(0, 8);
  const remainingStories = SHEET_STUDENTS_DATA.slice(8);

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#071A33] pt-32 pb-20 text-[#F7F5F0] lg:pt-40 lg:pb-24">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-[12px] font-medium tracking-[0.18em] text-[#C4A56A] uppercase">
              STUDENT JOURNEY ARCHIVE · REAL ADMISSIONS PROFILES
            </p>
            <h1 className="mt-4 font-serif text-[38px] leading-[1.08] text-[#FFFFFF] sm:text-[50px] lg:text-[58px]">
              EVERY ADMISSION HAS A STORY.
            </h1>
            <p className="mt-6 text-[17px] leading-[1.65] text-[#E9F0F6]/85">
              Read how real students translated academic passion into verifiable excellence: from
              SAMS cryptography and MIT Beaver Works to FIRST Robotics, S&amp;P 500 research, and
              offers from Stanford, Caltech, UCL, HKU, and UChicago.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Deep-Dive Case Studies */}
      <section className="bg-[#F7F5F0] py-20 text-[#1C2630] lg:py-28">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="space-y-12">
            {featuredStories.map((story, index) => (
              <article
                key={story.id}
                className="border border-[#1C2630]/15 bg-[#FFFFFF] p-8 sm:p-12 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1C2630]/15 pb-6">
                  <div>
                    <div className="flex items-center gap-2.5 text-[12px] font-semibold tracking-[0.14em] text-[#164A78] uppercase">
                      <span>CASE STUDY 0{index + 1}</span>
                      <span>·</span>
                      <span>ADMITTED SCHOLAR · {story.university.split(' (')[0].toUpperCase()}</span>
                      <span>·</span>
                      <span>CLASS OF {story.classOf}</span>
                    </div>
                    <h2 className="mt-2 font-serif text-[30px] text-[#071A33] sm:text-[36px]">
                      {story.university} — {story.course}
                    </h2>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-[12px] font-semibold tracking-wider text-[#1C2630]/60 uppercase">
                      Destination &amp; Performance
                    </p>
                    <p className="mt-1 text-[14px] font-medium text-[#071A33]">
                      {story.country} · {story.academicPerformance}
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12">
                  {/* Left Column: Academic Profile & Involvements */}
                  <div className="space-y-6 lg:col-span-5">
                    <div>
                      <h3 className="text-[11px] font-semibold tracking-wider text-[#164A78] uppercase">
                        Academic Standing &amp; Metrics
                      </h3>
                      <p className="mt-1.5 font-serif text-[22px] font-medium text-[#071A33]">
                        {story.academicPerformance}
                      </p>
                    </div>

                    {story.summerPrograms && (
                      <div>
                        <h4 className="text-[11px] font-semibold tracking-wider text-[#164A78] uppercase">
                          Summer Programs &amp; Academies
                        </h4>
                        <p className="mt-1.5 text-[14px] leading-relaxed text-[#1C2630]/85">
                          {story.summerPrograms}
                        </p>
                      </div>
                    )}

                    {story.certificates && (
                      <div>
                        <h4 className="text-[11px] font-semibold tracking-wider text-[#164A78] uppercase">
                          Certifications &amp; MOOCs
                        </h4>
                        <p className="mt-1.5 text-[14px] leading-relaxed text-[#1C2630]/85">
                          {story.certificates}
                        </p>
                      </div>
                    )}

                    {story.otherActivities && (
                      <div>
                        <h4 className="text-[11px] font-semibold tracking-wider text-[#164A78] uppercase">
                          Leadership &amp; Extracurriculars
                        </h4>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-[#1C2630]/80">
                          {story.otherActivities}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Deep Intellectual Work */}
                  <div className="space-y-6 border-t border-[#1C2630]/15 pt-8 lg:col-span-7 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
                    {story.research && (
                      <div>
                        <h4 className="text-[12px] font-semibold tracking-wider text-[#164A78] uppercase">
                          Research &amp; Scholarly Inquiries
                        </h4>
                        <p className="mt-1.5 text-[14px] leading-relaxed text-[#1C2630]/85">
                          {story.research}
                        </p>
                      </div>
                    )}

                    {story.internshipWork && (
                      <div>
                        <h4 className="text-[12px] font-semibold tracking-wider text-[#164A78] uppercase">
                          Professional Experience &amp; Internships
                        </h4>
                        <p className="mt-1.5 text-[14px] leading-relaxed text-[#1C2630]/85">
                          {story.internshipWork}
                        </p>
                      </div>
                    )}

                    {story.projects && (
                      <div>
                        <h4 className="text-[12px] font-semibold tracking-wider text-[#164A78] uppercase">
                          Applied Systems &amp; Technical Builds
                        </h4>
                        <p className="mt-1.5 text-[14px] leading-relaxed text-[#1C2630]/85">
                          {story.projects}
                        </p>
                      </div>
                    )}

                    {story.competitionsAwards && (
                      <div>
                        <h4 className="text-[12px] font-semibold tracking-wider text-[#164A78] uppercase">
                          Honors, Awards &amp; Distinctions
                        </h4>
                        <p className="mt-1.5 text-[14px] leading-relaxed text-[#1C2630]/85">
                          {story.competitionsAwards}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Full Cohort Grid */}
          <div className="mt-20">
            <p className="text-[12px] font-semibold tracking-[0.16em] text-[#164A78] uppercase">
              COMPLETE COHORT PROFILES
            </p>
            <h2 className="mt-2 font-serif text-[28px] text-[#071A33] md:text-[36px]">
              More Admitted Student Trajectories
            </h2>
            <p className="mt-2 text-[14px] text-[#1C2630]/70">
              Every student profile reflects multi-year preparation, genuine exploration, and
              targeted university strategy.
            </p>

            <div className="mt-8 grid grid-cols-1 border-t border-l border-[#1C2630]/15 md:grid-cols-2 lg:grid-cols-3">
              {remainingStories.map((st) => (
                <div
                  key={st.id}
                  className="border-r border-b border-[#1C2630]/15 bg-[#FFFFFF] p-7"
                >
                  <div className="flex items-center justify-between text-[12px] text-[#164A78]">
                    <span className="font-semibold text-[#071A33]">Admitted Scholar</span>
                    <span>Class of {st.classOf}</span>
                  </div>
                  <h3 className="mt-3 font-serif text-[22px] text-[#071A33]">{st.university}</h3>
                  <p className="mt-1 text-[14px] font-medium text-[#0D2947]">{st.course}</p>
                  <p className="mt-2 text-[12px] font-semibold text-[#C4A56A]">
                    Academics: {st.academicPerformance}
                  </p>
                  <p className="mt-3 text-[13px] leading-relaxed text-[#1C2630]/80 line-clamp-3">
                    {st.research || st.projects || st.internshipWork || st.otherActivities}
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
 * 34 — /counsellors — COUNSELLORS PAGE (CLEAN NO-PICTURE SECTION)
 * ============================================================================ */
export const CounsellorsPage: React.FC<PageProps> = ({ onNavigate }) => {
  const { counsellors, counsellorsExpansionNote, pagesContent } = useSiteData();
  const pageCopy = pagesContent.counsellors || {
    eyebrow: 'SENIOR ADVISORY TEAM · EXPERIENCED COUNSELLORS',
    headline: 'EXPERIENCE THAT GUIDES BETTER DECISIONS.',
    subhead:
      'Our senior counsellors bring 8+ to 10+ years of international admissions advisory, verified UCLA & leading British counselling certifications, with 100+ students successfully placed worldwide.',
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#071A33] pt-32 pb-20 text-[#F7F5F0] lg:pt-40 lg:pb-24">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-[12px] font-medium tracking-[0.18em] text-[#C4A56A] uppercase">
              {pageCopy.eyebrow}
            </p>
            <h1 className="mt-4 font-serif text-[38px] leading-[1.08] text-[#FFFFFF] sm:text-[50px] lg:text-[58px]">
              {pageCopy.headline}
            </h1>
            <p className="mt-6 text-[17px] leading-[1.65] text-[#E9F0F6]/85">
              {pageCopy.subhead}
            </p>
          </div>
        </div>
      </section>

      {/* No Picture Section: Simple Name and Rich Details of the Counsellors */}
      <section className="bg-[#F7F5F0] py-20 text-[#1C2630] lg:py-28">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {counsellors.map((c) => (
              <div
                key={c.id}
                className="flex flex-col justify-between border border-[#1C2630]/15 bg-[#FFFFFF] p-8 sm:p-10 shadow-sm transition-shadow hover:shadow-md"
              >
                <div>
                  {/* Top Bar with Experience Badge */}
                  <div className="flex items-center justify-between border-b border-[#1C2630]/15 pb-4">
                    <span className="text-[12px] font-semibold tracking-[0.14em] text-[#164A78] uppercase">
                      {c.experience}
                    </span>
                    <span className="rounded bg-[#071A33] px-2.5 py-1 text-[11px] font-medium tracking-wider text-[#FFFFFF] uppercase">
                      Senior Advisor
                    </span>
                  </div>

                  {/* Counsellor Name & Role (Simple Name and Clean Details) */}
                  <h2 className="mt-6 font-serif text-[32px] text-[#071A33] sm:text-[36px]">
                    {c.name}
                  </h2>
                  <p className="mt-1 text-[15px] font-medium text-[#164A78]">{c.role}</p>

                  {/* Philosophy Quote */}
                  <div className="mt-6 border-l-2 border-[#C4A56A] bg-[#F7F5F0]/70 p-5">
                    <p className="font-serif text-[17px] leading-relaxed italic text-[#071A33]">
                      &ldquo;{c.philosophy}&rdquo;
                    </p>
                  </div>

                  {/* Biography */}
                  <p className="mt-6 text-[14px] leading-relaxed text-[#1C2630]/85">{c.bio}</p>

                  {/* Qualifications & Specialisations */}
                  <div className="mt-8 space-y-5 border-t border-[#1C2630]/15 pt-6">
                    <div>
                      <h3 className="text-[11px] font-semibold tracking-wider text-[#164A78] uppercase">
                        Verified Qualifications &amp; Certifications
                      </h3>
                      <ul className="mt-2 space-y-1.5 text-[14px] text-[#071A33]">
                        {c.certifications.map((cert) => (
                          <li key={cert} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#C4A56A]" />
                            <span>{cert}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-[11px] font-semibold tracking-wider text-[#164A78] uppercase">
                        Advisory Specialisation
                      </h3>
                      <p className="mt-1.5 text-[14px] font-medium text-[#071A33]">
                        {c.specialisation}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-[11px] font-semibold tracking-wider text-[#164A78] uppercase">
                        Admissions Regions
                      </h3>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {c.countries.map((country) => (
                          <span
                            key={country}
                            className="border border-[#1C2630]/15 bg-[#F7F5F0] px-2.5 py-1 text-[12px] font-medium text-[#071A33]"
                          >
                            {country}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Roadmap Call to Action */}
                <div className="mt-10 border-t border-[#1C2630]/15 pt-6">
                  <button
                    type="button"
                    onClick={() => onNavigate('/contact')}
                    className="inline-flex w-full items-center justify-center gap-2 bg-[#071A33] px-6 py-3.5 text-[12px] font-semibold tracking-wider text-white uppercase transition-colors hover:bg-[#0D2947]"
                  >
                    <span>CONSULT WITH {c.name.toUpperCase()}</span>
                    <ArrowRight className="h-4 w-4 text-[#C4A56A]" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* + And many more — growing team card */}
          <div className="mt-12 border border-[#1C2630]/15 bg-[#FFFFFF] p-8 sm:p-10 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-5">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-[#164A78] font-serif text-3xl font-bold text-[#164A78]">
                {counsellorsExpansionNote.lead || '+'}
              </span>
              <div>
                <h3 className="font-serif text-[26px] text-[#071A33]">{counsellorsExpansionNote.title}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-[#1C2630]/80">
                  {counsellorsExpansionNote.description}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/contact')}
              className="inline-flex shrink-0 items-center gap-2 bg-[#071A33] px-6 py-3.5 text-[12px] font-semibold tracking-wider text-white uppercase transition-colors hover:bg-[#0D2947]"
            >
              <span>CONNECT WITH AN ADVISOR</span>
              <ArrowRight className="h-4 w-4 text-[#C4A56A]" />
            </button>
          </div>
        </div>
      </section>

      <FinalCTA onNavigate={onNavigate} />
    </div>
  );
};

/* ============================================================================
 * 35 — /university-mentors — UNIVERSITY MENTORS PAGE
 * ============================================================================ */
export const UniversityMentorsPage: React.FC<PageProps> = ({ onNavigate }) => {
  const [regionFilter, setRegionFilter] = useState<'All' | DestinationCountry>('All');

  const filteredMentors =
    regionFilter === 'All'
      ? UNIVERSITY_MENTORS_DATA
      : UNIVERSITY_MENTORS_DATA.filter((m) => m.country === regionFilter);

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#071A33] pt-32 pb-20 text-[#F7F5F0] lg:pt-40 lg:pb-24">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-[12px] font-medium tracking-[0.18em] text-[#C4A56A] uppercase">
              INTERNATIONAL CAMPUS MENTOR NETWORK
            </p>
            <h1 className="mt-4 font-serif text-[38px] leading-[1.08] text-[#FFFFFF] sm:text-[50px] lg:text-[58px]">
              THE UNIVERSITY EXPERIENCE, FROM SOMEONE WHO HAS LIVED IT.
            </h1>
            <p className="mt-6 text-[17px] leading-[1.65] text-[#E9F0F6]/85">
              Alongside senior counsellors, our students gain perspective from mentors who have
              experienced academic culture, seminar life, and campus transition at leading
              universities worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Mentor Profiles */}
      <section className="bg-[#F7F5F0] py-20 text-[#1C2630] lg:py-28">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-serif text-[30px] text-[#071A33] md:text-[38px]">
              Verified Mentor Affiliations
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {(['All', 'USA', 'UK', 'Singapore', 'Germany', 'Australia'] as const).map((reg) => (
                <button
                  key={reg}
                  type="button"
                  onClick={() => setRegionFilter(reg)}
                  className={`border px-4 py-2 text-[12px] font-medium uppercase transition-colors ${
                    regionFilter === reg
                      ? 'border-[#071A33] bg-[#071A33] text-[#FFFFFF]'
                      : 'border-[#1C2630]/20 bg-[#FFFFFF] text-[#1C2630] hover:border-[#071A33]'
                  }`}
                >
                  {reg}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            {filteredMentors.map((mentor) => (
              <div
                key={mentor.id}
                className="flex flex-col justify-between border border-[#1C2630]/15 bg-[#FFFFFF] p-8"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-semibold tracking-[0.14em] text-[#164A78] uppercase">
                    <span>{mentor.verifiedAffiliation}</span>
                    <span>{mentor.country}</span>
                  </div>
                  <h3 className="mt-3 font-serif text-[28px] text-[#071A33]">
                    {mentor.university}
                  </h3>
                  <p className="mt-1 text-[15px] font-semibold text-[#0D2947]">
                    {mentor.name} · {mentor.course}
                  </p>
                  <p className="mt-4 text-[14px] leading-relaxed text-[#1C2630]/80">
                    {mentor.background}
                  </p>

                  <div className="mt-6 border-t border-[#1C2630]/15 pt-5">
                    <p className="text-[11px] font-semibold tracking-wider text-[#071A33] uppercase">
                      What {mentor.name} Helps Students Understand:
                    </p>
                    <ul className="mt-3 space-y-2 text-[14px] text-[#1C2630]/85">
                      {mentor.helpsUnderstand.map((pt) => (
                        <li key={pt}>— {pt}</li>
                      ))}
                    </ul>
                  </div>
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
 * 36 — /about — ABOUT UPPSEEKERS PAGE
 * ============================================================================ */
export const AboutPage: React.FC<PageProps> = ({ onNavigate }) => {
  const { pagesContent } = useSiteData();
  const pageCopy = pagesContent.about || {
    eyebrow: 'ABOUT UPPSEEKERS',
    headline: 'WE BELIEVE GREAT ADMISSIONS BEGIN WITH GREAT PREPARATION.',
    subhead:
      'Uppseekers was founded to bridge the gap between high school classrooms and the intellectual expectations of the world’s leading universities.',
  };

  const principles = [
    {
      num: '01',
      title: 'START EARLY',
      desc: 'Beginning in Class 8, 9, or 10 replaces last-minute anxiety with calm, multi-year intellectual maturation.',
    },
    {
      num: '02',
      title: 'UNDERSTAND THE STUDENT',
      desc: 'Every roadmap starts with the individual child’s strengths, temperament, and curiosities—never a generic template.',
    },
    {
      num: '03',
      title: 'BUILD WITH PURPOSE',
      desc: 'Every project, research paper, or summer commitment should serve the student’s genuine academic growth.',
    },
    {
      num: '04',
      title: 'DEVELOP DEPTH',
      desc: 'Leading universities value sustained inquiry in one or two meaningful directions over ten superficial school clubs.',
    },
    {
      num: '05',
      title: 'MAKE INFORMED DECISIONS',
      desc: 'From curriculum choices to country and course selection, families deserve clear, experienced, evidence-backed counsel.',
    },
    {
      num: '06',
      title: 'PLAN AHEAD',
      desc: 'By working backwards from university expectations, testing, research, and applications unfold on a disciplined schedule.',
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#071A33] pt-32 pb-20 text-[#F7F5F0] lg:pt-40 lg:pb-28">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-[12px] font-medium tracking-[0.18em] text-[#C4A56A] uppercase">
              {pageCopy.eyebrow}
            </p>
            <h1 className="mt-4 font-serif text-[38px] leading-[1.08] text-[#FFFFFF] sm:text-[50px] lg:text-[58px]">
              {pageCopy.headline}
            </h1>
            <p className="mt-6 text-[17px] leading-[1.65] text-[#E9F0F6]/85 sm:text-[18px]">
              {pageCopy.subhead}
            </p>
          </div>
        </div>
      </section>

      {/* Why Uppseekers Exists */}
      <section className="bg-[#FFFFFF] py-20 text-[#1C2630] lg:py-28">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <p className="text-[12px] font-semibold tracking-[0.16em] text-[#164A78] uppercase">
                OUR INSTITUTIONAL PHILOSOPHY
              </p>
              <h2 className="mt-3 font-serif text-[34px] leading-[1.12] text-[#071A33] md:text-[44px]">
                BEYOND LAST-MINUTE APPLICATION PROCESSING.
              </h2>
              <p className="mt-5 text-[16px] leading-relaxed text-[#1C2630]/80">
                For years, families had to choose between transactional study-abroad agencies that
                only stepped in during Class 12, or fragmented coaching institutes that treated
                testing, research, and counselling as disconnected silos.
              </p>
              <p className="mt-4 text-[16px] leading-relaxed text-[#1C2630]/80">
                Uppseekers brings together undergraduate admissions counselling, profile building,
                research mentorship, work experience, and SAT preparation under one roof—guided by
                senior advisors who work with families from Class 8 through university
                matriculation.
              </p>
            </div>
            <div className="lg:col-span-6">
              <EditorialImage
                src={IMAGES.campusLibrary}
                alt="University library reading room"
                aspectClass="aspect-[16/10]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Six Core Principles */}
      <section className="bg-[#F7F5F0] py-20 text-[#1C2630] lg:py-28">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <p className="text-[12px] font-semibold tracking-[0.16em] text-[#164A78] uppercase">
            GUIDING PRINCIPLES
          </p>
          <h2 className="mt-3 font-serif text-[34px] leading-[1.12] text-[#071A33] md:text-[44px]">
            THE SIX PRINCIPLES OF UPPSEEKERS.
          </h2>

          <div className="mt-12 grid grid-cols-1 border-t border-l border-[#1C2630]/15 md:grid-cols-2 lg:grid-cols-3">
            {principles.map((p) => (
              <div
                key={p.num}
                className="border-r border-b border-[#1C2630]/15 bg-[#FFFFFF] p-8"
              >
                <span className="font-mono text-[12px] text-[#C4A56A]">{p.num}</span>
                <h3 className="mt-3 font-serif text-[25px] text-[#071A33]">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#1C2630]/80">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Four Connected Pillars Links */}
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: 'Our Approach',
                sub: 'Backward Engineering from Class 8–12',
                path: '/approach' as PageRoute,
              },
              {
                label: 'Counsellors',
                sub: '10+ Years Experience & Certifications',
                path: '/counsellors' as PageRoute,
              },
              {
                label: 'University Mentors',
                sub: 'Perspective from Global Campuses',
                path: '/university-mentors' as PageRoute,
              },
              {
                label: 'Student Outcomes',
                sub: '133+ Verified Global Admissions',
                path: '/results' as PageRoute,
              },
            ].map((link) => (
              <button
                key={link.path}
                type="button"
                onClick={() => onNavigate(link.path)}
                className="group border border-[#1C2630]/15 bg-[#071A33] p-7 text-left text-[#F7F5F0] transition-colors hover:bg-[#0D2947]"
              >
                <p className="font-serif text-[24px] text-[#FFFFFF] group-hover:text-[#C4A56A]">
                  {link.label}
                </p>
                <p className="mt-2 text-[13px] text-[#E9F0F6]/75">{link.sub}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold tracking-wider text-[#C4A56A] uppercase">
                  <span>Explore</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA onNavigate={onNavigate} />
    </div>
  );
};

/* ============================================================================
 * 37 — /insights — ADMISSIONS JOURNAL PAGE
 * ============================================================================ */
export const InsightsPage: React.FC<PageProps> = ({ onNavigate }) => {
  const { blogs } = useSiteData();
  const [selectedCategory, setSelectedCategory] = useState<JournalCategory>('All');
  const [readingArticle, setReadingArticle] = useState<JournalArticle | null>(null);

  const featuredArticle = blogs.find((b) => b.featured) || blogs[0];
  const filteredArticles =
    selectedCategory === 'All'
      ? blogs
      : blogs.filter((a) => a.category === selectedCategory);

  if (readingArticle) {
    return (
      <div>
        <section className="bg-[#071A33] pt-32 pb-16 text-[#F7F5F0] lg:pt-40 lg:pb-20">
          <div className="mx-auto max-w-[920px] px-5 sm:px-8">
            <button
              type="button"
              onClick={() => setReadingArticle(null)}
              className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] text-[#C4A56A] uppercase hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>BACK TO THE UPPSEEKERS JOURNAL</span>
            </button>

            <div className="mt-6 flex items-center gap-3 text-[12px] tracking-[0.14em] text-[#E9F0F6]/70 uppercase">
              <span>{readingArticle.category}</span>
              <span>·</span>
              <span>{readingArticle.date}</span>
              <span>·</span>
              <span>{readingArticle.readTime}</span>
            </div>

            <h1 className="mt-4 font-serif text-[34px] leading-[1.12] text-[#FFFFFF] sm:text-[46px]">
              {readingArticle.title}
            </h1>
            <p className="mt-5 font-serif text-[21px] leading-relaxed italic text-[#E9F0F6]/85">
              {readingArticle.subtitle}
            </p>
            <div className="mt-6 border-t border-white/15 pt-4 text-[13px] text-[#E9F0F6]/75">
              By <strong className="text-white">{readingArticle.author}</strong> ·{' '}
              {readingArticle.authorRole}
            </div>
          </div>
        </section>

        <section className="bg-[#F7F5F0] py-16 text-[#1C2630] lg:py-24">
          <div className="mx-auto max-w-[920px] px-5 sm:px-8">
            <div className="border-l-2 border-[#C4A56A] bg-[#FFFFFF] p-7">
              <p className="text-[12px] font-semibold tracking-[0.14em] text-[#071A33] uppercase">
                Executive Summary for Parents
              </p>
              <ul className="mt-3 space-y-2 text-[15px] text-[#1C2630]/85">
                {readingArticle.keyTakeaways.map((tk) => (
                  <li key={tk}>— {tk}</li>
                ))}
              </ul>
            </div>

            <div className="mt-10 space-y-6 text-[17px] leading-[1.8] text-[#1C2630]">
              {readingArticle.bodyParagraphs.map((para, idx) => (
                <p
                  key={idx}
                  className={
                    idx === 0
                      ? 'first-letter:float-left first-letter:mt-1 first-letter:mr-3 first-letter:font-serif first-letter:text-5xl first-letter:font-semibold first-letter:text-[#071A33]'
                      : ''
                  }
                >
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-14 border border-[#1C2630]/15 bg-[#071A33] p-8 text-[#F7F5F0] sm:p-10">
              <p className="text-[12px] tracking-[0.14em] text-[#C4A56A] uppercase">
                DISCUSS THIS WITH AN ADVISOR
              </p>
              <h3 className="mt-2 font-serif text-[28px] text-white">
                How does this apply to your child&apos;s current class?
              </h3>
              <div className="mt-6 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('/contact')}
                  className="inline-flex items-center gap-2 bg-[#C4A56A] px-6 py-3 text-[12px] font-semibold tracking-wider text-[#071A33] uppercase"
                >
                  <span>BUILD MY CHILD&apos;S ROADMAP</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setReadingArticle(null)}
                  className="border border-white/25 px-6 py-3 text-[12px] font-medium tracking-wider text-white uppercase"
                >
                  More Journal Essays
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#071A33] pt-32 pb-20 text-[#F7F5F0] lg:pt-40 lg:pb-24">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <p className="text-[12px] font-medium tracking-[0.18em] text-[#C4A56A] uppercase">
            ADMISSIONS INTELLIGENCE &amp; PERSPECTIVES
          </p>
          <h1 className="mt-4 font-serif text-[38px] leading-[1.08] text-[#FFFFFF] sm:text-[50px] lg:text-[58px]">
            THE UPPSEEKERS JOURNAL
          </h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-[1.65] text-[#E9F0F6]/85">
            Editorial briefings for parents and students on international undergraduate admissions,
            early profile architecture, scholarly research, and standardized testing.
          </p>
        </div>
      </section>

      <section className="bg-[#F7F5F0] py-20 text-[#1C2630] lg:py-28">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          {/* Featured Lead Essay */}
          <div className="border border-[#1C2630]/15 bg-[#FFFFFF] p-8 sm:p-12">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] text-[#164A78] uppercase">
                  <span>FEATURED ESSAY</span>
                  <span>·</span>
                  <span>{featuredArticle.category}</span>
                  <span>·</span>
                  <span>{featuredArticle.readTime}</span>
                </div>
                <h2 className="mt-3 font-serif text-[30px] leading-tight text-[#071A33] sm:text-[38px]">
                  {featuredArticle.title}
                </h2>
                <p className="mt-4 text-[16px] leading-relaxed text-[#1C2630]/80">
                  {featuredArticle.excerpt}
                </p>
                <div className="mt-6 text-[13px] text-[#1C2630]/65">
                  By <strong className="text-[#071A33]">{featuredArticle.author}</strong> ·{' '}
                  {featuredArticle.authorRole}
                </div>
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => setReadingArticle(featuredArticle)}
                    className="inline-flex items-center gap-2 bg-[#071A33] px-6 py-3.5 text-[12px] font-semibold tracking-[0.08em] text-[#FFFFFF] uppercase transition-colors hover:bg-[#0D2947]"
                  >
                    <span>READ FULL ESSAY</span>
                    <ArrowRight className="h-4 w-4 text-[#C4A56A]" />
                  </button>
                </div>
              </div>
              <div className="lg:col-span-5">
                <EditorialImage
                  src={IMAGES.heroQuad}
                  alt={featuredArticle.title}
                  aspectClass="aspect-[4/3]"
                />
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="mt-14 flex flex-wrap gap-2">
            {JOURNAL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`border px-4 py-2 text-[12px] font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'border-[#071A33] bg-[#071A33] text-[#FFFFFF]'
                    : 'border-[#1C2630]/20 bg-[#FFFFFF] text-[#1C2630] hover:border-[#071A33]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Secondary Articles Grid */}
          <div className="mt-8 grid grid-cols-1 border-t border-l border-[#1C2630]/15 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="flex flex-col justify-between border-r border-b border-[#1C2630]/15 bg-[#FFFFFF] p-8"
              >
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] text-[#164A78] uppercase">
                    <span>{article.category}</span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="mt-3 font-serif text-[24px] leading-snug text-[#071A33]">
                    {article.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-[#1C2630]/80">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-8 border-t border-[#1C2630]/10 pt-4">
                  <p className="text-[12px] text-[#1C2630]/65">
                    {article.author} · {article.date}
                  </p>
                  <button
                    type="button"
                    onClick={() => setReadingArticle(article)}
                    className="mt-3 inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.08em] text-[#071A33] uppercase underline decoration-[#C4A56A] underline-offset-4 hover:text-[#164A78]"
                  >
                    <span>READ ARTICLE</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA onNavigate={onNavigate} />
    </div>
  );
};

/* ============================================================================
 * 38 — /contact — BUILD MY CHILD'S ROADMAP PAGE
 * ============================================================================ */
export const ContactPage: React.FC<PageProps> = ({ initialCountryFilter }) => {
  return (
    <div>
      <section className="bg-[#071A33] pt-32 pb-16 text-[#F7F5F0] lg:pt-40 lg:pb-20">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-[12px] font-medium tracking-[0.18em] text-[#C4A56A] uppercase">
              PRIVATE ADVISORY CONSULTATION
            </p>
            <h1 className="mt-4 font-serif text-[38px] leading-[1.08] text-[#FFFFFF] sm:text-[50px] lg:text-[56px]">
              LET&apos;S UNDERSTAND WHERE YOUR CHILD IS TODAY.
            </h1>
            <p className="mt-5 text-[17px] leading-[1.65] text-[#E9F0F6]/85 sm:text-[18px]">
              Tell us a little about your child&apos;s current stage and where you&apos;re hoping to
              go.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F5F0] py-16 text-[#1C2630] lg:py-24">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <LeadForm initialDestination={initialCountryFilter} />
            </div>

            <div className="space-y-8 lg:col-span-4">
              <div className="border border-[#1C2630]/15 bg-[#FFFFFF] p-8">
                <p className="text-[12px] font-semibold tracking-[0.14em] text-[#164A78] uppercase">
                  WHAT TO EXPECT
                </p>
                <h2 className="mt-2 font-serif text-[26px] text-[#071A33]">
                  How Our Initial Conversation Works
                </h2>
                <ol className="mt-5 space-y-4 text-[14px] leading-relaxed text-[#1C2630]/80">
                  <li>
                    <strong className="text-[#071A33]">01. Diagnostic Review:</strong> We review
                    your child&apos;s current class, curriculum, academic strengths, and existing
                    commitments.
                  </li>
                  <li>
                    <strong className="text-[#071A33]">02. Destination Calibration:</strong> We
                    discuss realistic university pathways across the US, UK, Singapore, Germany,
                    Canada, Australia, Hong Kong, and Europe.
                  </li>
                  <li>
                    <strong className="text-[#071A33]">03. Multi-Year Roadmap:</strong> We outline
                    what your child should focus on over the next 12 to 36 months—and what they can
                    safely ignore.
                  </li>
                </ol>
              </div>

              <div className="border border-[#1C2630]/15 bg-[#071A33] p-8 text-[#F7F5F0]">
                <p className="text-[12px] font-medium tracking-[0.14em] text-[#C4A56A] uppercase">
                  OUR ADVISORY STANDARD
                </p>
                <p className="mt-3 font-serif text-[21px] italic text-white">
                  &ldquo;We never push families into generic packages. Every roadmap begins with
                  understanding the student.&rdquo;
                </p>
                <p className="mt-4 text-[13px] text-[#E9F0F6]/75">
                  133+ verified admissions across leading international universities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
