import React, { useState, useEffect } from 'react';
import {
  PageRoute,
  ADMITTED_UNIVERSITIES,
  COUNSELLORS_DATA,
  JOURNAL_ARTICLES,
  PROFILE_ACTIVITIES,
  RESEARCH_TOPICS,
  JournalArticle,
  AdmittedUniversityInfo,
  ProfileActivityTrack,
  ResearchTopicTrack,
  CounsellorProfile,
} from '../data/uppseekersData';
import { useSiteData } from '../context/SiteDataContext';
import {
  FileText,
  Plus,
  Trash2,
  Edit3,
  Save,
  CheckCircle,
  ExternalLink,
  BookOpen,
  GraduationCap,
  Users,
  Compass,
  Layers,
  ArrowLeft,
  X,
  RefreshCw,
} from 'lucide-react';

interface AdminPageProps {
  onNavigate: (page: PageRoute) => void;
}

type AdminTab = 'pages' | 'blogs' | 'universities' | 'activities' | 'counsellors' | 'leads';

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const siteData = useSiteData();
  const [activeTab, setActiveTab] = useState<AdminTab>('pages');
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Editable states initialized from siteData
  const [blogs, setBlogs] = useState<JournalArticle[]>(siteData?.blogs || JOURNAL_ARTICLES);
  const [universities, setUniversities] = useState<AdmittedUniversityInfo[]>(
    siteData?.universities || ADMITTED_UNIVERSITIES
  );
  const [activities, setActivities] = useState<ProfileActivityTrack[]>(
    siteData?.profileActivities || PROFILE_ACTIVITIES
  );
  const [researchTopics, setResearchTopics] = useState<ResearchTopicTrack[]>(
    siteData?.researchTopics || RESEARCH_TOPICS
  );
  const [counsellors, setCounsellors] = useState<CounsellorProfile[]>(
    siteData?.counsellors || COUNSELLORS_DATA
  );
  const [leads, setLeads] = useState<any[]>(siteData?.leads || []);

  // Pages Copy State
  const [selectedPageKey, setSelectedPageKey] = useState<string>('home');
  const [pagesContent, setPagesContent] = useState<Record<string, Record<string, string>>>(() => {
    const base: Record<string, Record<string, string>> = {
      home: {
        heroEyebrow: 'UNDERGRADUATE ADMISSIONS & STUDENT DEVELOPMENT · CLASS 8 TO 12',
        heroHeadline: 'THE JOURNEY TO A GREAT UNIVERSITY STARTS LONG BEFORE THE APPLICATION.',
        heroSubhead:
          'We work with students from Class 8 onwards to discover their strengths, build genuine academic depth, and navigate admissions to the world’s leading universities.',
      },
      approach: {
        eyebrow: 'OUR CORE METHODOLOGY',
        headline: 'BACKWARD ENGINEERING FROM UNIVERSITY EXPECTATIONS.',
        subhead:
          'Beginning in Class 8, 9, or 10 replaces senior-year panic with calm, multi-year intellectual maturation.',
      },
      admissions: {
        eyebrow: 'STRATEGIC ADMISSIONS COUNSELLING',
        headline: 'EVERY APPLICATION IS THE PRODUCT OF YEARS OF DECISIONS.',
        subhead:
          'Navigating US holistic admissions, UK course-first evaluations, and global university requirements with clarity and experience.',
      },
      profileBuilding: {
        eyebrow: 'AUTHENTIC STUDENT DEVELOPMENT',
        headline: 'BUILD A PROFILE THAT FEELS LIKE THE STUDENT.',
        subhead:
          'The goal isn’t to collect activities. The goal is to develop depth around genuine intellectual and creative interests.',
      },
      research: {
        eyebrow: 'SCHOLARLY MENTORSHIP',
        headline: 'RESEARCH STARTS WITH CURIOSITY.',
        subhead:
          'Students work with experienced researchers and PhD scholars to explore rigorous questions beyond the school curriculum.',
      },
      workExperience: {
        eyebrow: 'BEYOND THE CLASSROOM',
        headline: 'EXPERIENCE THE WORLD YOU’RE PREPARING TO ENTER.',
        subhead:
          'Work experience is not about collecting a corporate logo. It is about testing academic interests in real professional environments.',
      },
      sat: {
        eyebrow: 'STANDARDIZED TESTING EXCELLENCE',
        headline: 'PREPARE WITH A PLAN. PRACTISE WITH PURPOSE.',
        subhead:
          'Diagnostic evaluations, live concept classes, and targeted Digital SAT prep integrated directly into the admissions timeline.',
      },
      results: {
        eyebrow: 'VERIFIED STUDENT OUTCOMES',
        headline: 'WHERE OUR STUDENTS HAVE BEEN ADMITTED.',
        subhead:
          'Explore verified university admissions, student numbers, key profile building tracks, and research inquiry topics across leading global universities.',
      },
      counsellors: {
        eyebrow: 'SENIOR ADVISORY TEAM · EXPERIENCED COUNSELLORS',
        headline: 'EXPERIENCE THAT GUIDES BETTER DECISIONS.',
        subhead:
          'Our senior counsellors bring 8+ to 10+ years of international admissions advisory, verified UCLA & leading British counselling certifications, with 100+ students successfully placed worldwide.',
      },
      about: {
        eyebrow: 'ABOUT UPPSEEKERS',
        headline: 'WE BELIEVE GREAT ADMISSIONS BEGIN WITH GREAT PREPARATION.',
        subhead:
          'Uppseekers was founded to bridge the gap between high school classrooms and the intellectual expectations of the world’s leading universities.',
      },
    };
    if (siteData?.pagesContent) {
      Object.assign(base, siteData.pagesContent);
    }
    return base;
  });

  // Keep in sync with siteData changes
  useEffect(() => {
    if (siteData?.blogs) setBlogs(siteData.blogs);
    if (siteData?.universities) setUniversities(siteData.universities);
    if (siteData?.profileActivities) setActivities(siteData.profileActivities);
    if (siteData?.researchTopics) setResearchTopics(siteData.researchTopics);
    if (siteData?.counsellors) setCounsellors(siteData.counsellors);
    if (siteData?.pagesContent) {
      setPagesContent((prev) => ({ ...prev, ...siteData.pagesContent }));
    }
    if (siteData?.leads) setLeads(siteData.leads);
  }, [siteData]);

  // Modal State for Blog Add/Edit
  const [editingBlog, setEditingBlog] = useState<Partial<JournalArticle> | null>(null);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);

  // Modal State for University Add/Edit
  const [editingUni, setEditingUni] = useState<Partial<AdmittedUniversityInfo> | null>(null);
  const [isUniModalOpen, setIsUniModalOpen] = useState(false);

  // Fetch initial data from backend if available
  useEffect(() => {
    fetch('/api/content')
      .then((res) => {
        if (!res.ok) throw new Error('API not active');
        return res.json();
      })
      .then((data) => {
        if (data.blogs && Array.isArray(data.blogs)) setBlogs(data.blogs);
        if (data.universities && Array.isArray(data.universities)) setUniversities(data.universities);
        if (data.profileActivities && Array.isArray(data.profileActivities)) setActivities(data.profileActivities);
        if (data.researchTopics && Array.isArray(data.researchTopics)) setResearchTopics(data.researchTopics);
        if (data.counsellors && Array.isArray(data.counsellors)) setCounsellors(data.counsellors);
        if (data.pagesContent) setPagesContent((prev) => ({ ...prev, ...data.pagesContent }));
        if (data.leads && Array.isArray(data.leads)) setLeads(data.leads);
      })
      .catch((err) => {
        console.warn('Backend API loaded from initial defaults:', err.message);
      });
  }, []);

  const triggerToast = (msg: string) => {
    setSaveSuccess(msg);
    setTimeout(() => setSaveSuccess(null), 3500);
  };

  // Sync entire state to backend
  const syncToBackend = async (partialUpdate?: any) => {
    setLoading(true);
    try {
      const payload = {
        universities,
        profileActivities: activities,
        researchTopics,
        counsellors,
        blogs,
        pagesContent,
        leads,
        ...partialUpdate,
      };
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        triggerToast('Saved changes successfully to backend storage.');
      } else {
        triggerToast('Updated locally (backend API returned non-200).');
      }
    } catch {
      triggerToast('Updated locally.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Page Copy Change
  const handlePageContentChange = (field: string, val: string) => {
    setPagesContent((prev) => ({
      ...prev,
      [selectedPageKey]: {
        ...(prev[selectedPageKey] || {}),
        [field]: val,
      },
    }));
  };

  // Save Page Copy
  const savePageCopy = async () => {
    await syncToBackend();
  };

  // Save Blog (Add or Edit)
  const saveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog?.title) return;

    let updatedBlogs: JournalArticle[];
    if (editingBlog.id) {
      // Edit
      updatedBlogs = blogs.map((b) =>
        b.id === editingBlog.id ? ({ ...b, ...editingBlog } as JournalArticle) : b
      );
    } else {
      // Add
      const newArticle: JournalArticle = {
        id: `art-${Date.now()}`,
        title: editingBlog.title,
        subtitle: editingBlog.subtitle || '',
        category: (editingBlog.category as any) || 'Admissions',
        readTime: editingBlog.readTime || '5 min read',
        date: editingBlog.date || 'October 2026',
        author: editingBlog.author || 'Manika P',
        authorRole: editingBlog.authorRole || 'Senior Admissions Counsellor',
        featured: Boolean(editingBlog.featured),
        excerpt: editingBlog.excerpt || '',
        keyTakeaways: editingBlog.keyTakeaways || [
          'Multi-year preparation produces authentic depth.',
          'Early roadmap planning prevents application stress.',
        ],
        bodyParagraphs: editingBlog.bodyParagraphs || [
          editingBlog.excerpt || 'Article body content.',
        ],
      };
      updatedBlogs = [newArticle, ...blogs];
    }
    setBlogs(updatedBlogs);
    setIsBlogModalOpen(false);
    setEditingBlog(null);
    await syncToBackend({ blogs: updatedBlogs });
  };

  // Delete Blog
  const deleteBlog = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this blog article?')) return;
    const updated = blogs.filter((b) => b.id !== id);
    setBlogs(updated);
    await syncToBackend({ blogs: updated });
  };

  // Save University
  const saveUniversity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUni?.name) return;

    let updatedUnis: AdmittedUniversityInfo[];
    if (editingUni.name && universities.some((u) => u.name === editingUni.name)) {
      updatedUnis = universities.map((u) =>
        u.name === editingUni.name ? ({ ...u, ...editingUni } as AdmittedUniversityInfo) : u
      );
    } else {
      const newUni: AdmittedUniversityInfo = {
        name: editingUni.name,
        country: (editingUni.country as any) || 'USA',
        city: editingUni.city || '',
        admissionsCount: Number(editingUni.admissionsCount) || 1,
        notableCourses: editingUni.notableCourses || ['Computer Science', 'Economics'],
      };
      updatedUnis = [newUni, ...universities];
    }
    setUniversities(updatedUnis);
    setIsUniModalOpen(false);
    setEditingUni(null);
    await syncToBackend({ universities: updatedUnis });
  };

  // Delete University
  const deleteUniversity = async (name: string) => {
    if (!window.confirm(`Delete ${name} from admitted universities?`)) return;
    const updated = universities.filter((u) => u.name !== name);
    setUniversities(updated);
    await syncToBackend({ universities: updated });
  };

  return (
    <div className="min-h-screen bg-[#071A33] text-[#F7F5F0]">
      {/* Top Banner & Navigation */}
      <header className="border-b border-white/15 bg-[#0D2947] px-6 py-4">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="inline-flex items-center gap-2 rounded border border-white/20 bg-[#071A33] px-3 py-1.5 text-xs font-semibold text-white uppercase hover:bg-white/10"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Website</span>
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl font-bold tracking-wide text-white">
                  UPPSEEKERS
                </span>
                <span className="rounded bg-[#C4A56A] px-2 py-0.5 text-[10px] font-bold text-[#071A33] uppercase">
                  CMS Backend
                </span>
              </div>
              <p className="text-xs text-[#E9F0F6]/70">
                Site Content, Blogs, Universities &amp; Student Numbers Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {saveSuccess && (
              <div className="flex items-center gap-2 rounded bg-emerald-900/80 border border-emerald-500/50 px-3 py-1.5 text-xs font-medium text-emerald-200">
                <CheckCircle className="h-3.5 w-3.5" />
                <span>{saveSuccess}</span>
              </div>
            )}
            <button
              type="button"
              disabled={loading}
              onClick={() => syncToBackend()}
              className="inline-flex items-center gap-2 rounded bg-[#C4A56A] px-4 py-2 text-xs font-semibold text-[#071A33] uppercase transition-colors hover:bg-[#d4b77e]"
            >
              <Save className="h-3.5 w-3.5" />
              <span>{loading ? 'Saving...' : 'Save All Changes'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main CMS Layout */}
      <div className="mx-auto max-w-[1400px] px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-white/15 pb-4">
          {[
            { id: 'pages', label: 'Page Copy Editor', icon: FileText },
            { id: 'blogs', label: 'Blog & Journal CMS', icon: BookOpen },
            { id: 'universities', label: 'Universities & Student Numbers', icon: GraduationCap },
            { id: 'activities', label: '4-5 Profile Activities & Research', icon: Layers },
            { id: 'counsellors', label: 'Counsellors Advisory', icon: Users },
            { id: 'leads', label: 'Parent Consultation Inquiries', icon: Compass },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`flex items-center gap-2.5 rounded-t px-4 py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors ${
                  active
                    ? 'border-b-2 border-[#C4A56A] bg-[#0D2947] text-[#C4A56A]'
                    : 'text-[#E9F0F6]/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: PAGE COPY EDITOR */}
        {activeTab === 'pages' && (
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Page Selector Sidebar */}
            <div className="space-y-1.5 lg:col-span-3">
              <p className="text-[11px] font-semibold tracking-wider text-[#C4A56A] uppercase mb-3">
                Select Page to Edit
              </p>
              {[
                { key: 'home', label: 'Homepage', route: '/' as PageRoute },
                { key: 'approach', label: 'Our Approach', route: '/approach' as PageRoute },
                { key: 'admissions', label: 'Admissions Counselling', route: '/admissions' as PageRoute },
                { key: 'profileBuilding', label: 'Profile Building', route: '/profile-building' as PageRoute },
                { key: 'research', label: 'Research Mentorship', route: '/research' as PageRoute },
                { key: 'workExperience', label: 'Work Experience', route: '/work-experience' as PageRoute },
                { key: 'sat', label: 'SAT Preparation', route: '/sat' as PageRoute },
                { key: 'results', label: 'Student Results', route: '/results' as PageRoute },
                { key: 'counsellors', label: 'Counsellors', route: '/counsellors' as PageRoute },
                { key: 'about', label: 'About Uppseekers', route: '/about' as PageRoute },
              ].map((p) => (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => setSelectedPageKey(p.key)}
                  className={`w-full text-left rounded px-4 py-3 text-xs font-semibold tracking-wide uppercase transition-colors ${
                    selectedPageKey === p.key
                      ? 'border border-[#C4A56A]/50 bg-[#0D2947] text-white font-bold'
                      : 'border border-transparent bg-white/5 text-[#E9F0F6]/75 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Page Content Form */}
            <div className="rounded border border-white/15 bg-[#0D2947] p-8 lg:col-span-9">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <h2 className="font-serif text-2xl text-white">
                    Editing Page: {selectedPageKey.toUpperCase()}
                  </h2>
                  <p className="text-xs text-[#E9F0F6]/70 mt-1">
                    Updates to headlines and descriptions reflect immediately across the website.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const pageMap: Record<string, PageRoute> = {
                        home: '/',
                        approach: '/approach',
                        admissions: '/admissions',
                        profileBuilding: '/profile-building',
                        research: '/research',
                        workExperience: '/work-experience',
                        sat: '/sat',
                        results: '/results',
                        counsellors: '/counsellors',
                        about: '/about',
                      };
                      const route = pageMap[selectedPageKey] || '/';
                      onNavigate(route);
                    }}
                    className="inline-flex items-center gap-1.5 rounded border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white uppercase hover:bg-white/20 transition-colors"
                  >
                    <ExternalLink className="h-3.5 w-3.5 text-[#C4A56A]" />
                    <span>Preview Live Page</span>
                  </button>
                  <button
                    type="button"
                    onClick={savePageCopy}
                    className="inline-flex items-center gap-2 rounded bg-[#C4A56A] px-4 py-2 text-xs font-semibold text-[#071A33] uppercase hover:bg-[#d4b77e]"
                  >
                    <Save className="h-3.5 w-3.5" />
                    <span>Save Page Copy</span>
                  </button>
                </div>
              </div>

              <div className="mt-6 space-y-6">
                <div>
                  <label className="block text-[11px] font-semibold tracking-wider text-[#C4A56A] uppercase">
                    Section Eyebrow / Category Tag
                  </label>
                  <input
                    type="text"
                    value={
                      pagesContent[selectedPageKey]?.heroEyebrow ||
                      pagesContent[selectedPageKey]?.eyebrow ||
                      ''
                    }
                    onChange={(e) =>
                      handlePageContentChange(
                        pagesContent[selectedPageKey]?.heroEyebrow !== undefined
                          ? 'heroEyebrow'
                          : 'eyebrow',
                        e.target.value
                      )
                    }
                    className="mt-2 w-full rounded border border-white/20 bg-[#071A33] px-4 py-2.5 text-sm text-white focus:border-[#C4A56A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold tracking-wider text-[#C4A56A] uppercase">
                    Main Headline (Serif H1 / H2)
                  </label>
                  <textarea
                    rows={2}
                    value={
                      pagesContent[selectedPageKey]?.heroHeadline ||
                      pagesContent[selectedPageKey]?.headline ||
                      ''
                    }
                    onChange={(e) =>
                      handlePageContentChange(
                        pagesContent[selectedPageKey]?.heroHeadline !== undefined
                          ? 'heroHeadline'
                          : 'headline',
                        e.target.value
                      )
                    }
                    className="mt-2 w-full rounded border border-white/20 bg-[#071A33] px-4 py-2.5 text-sm text-white focus:border-[#C4A56A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold tracking-wider text-[#C4A56A] uppercase">
                    Subhead &amp; Core Positioning Statement
                  </label>
                  <textarea
                    rows={4}
                    value={
                      pagesContent[selectedPageKey]?.heroSubhead ||
                      pagesContent[selectedPageKey]?.subhead ||
                      ''
                    }
                    onChange={(e) =>
                      handlePageContentChange(
                        pagesContent[selectedPageKey]?.heroSubhead !== undefined
                          ? 'heroSubhead'
                          : 'subhead',
                        e.target.value
                      )
                    }
                    className="mt-2 w-full rounded border border-white/20 bg-[#071A33] px-4 py-2.5 text-sm text-white focus:border-[#C4A56A] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BLOG & JOURNAL CMS */}
        {activeTab === 'blogs' && (
          <div className="mt-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-6">
              <div>
                <h2 className="font-serif text-3xl text-white">The Uppseekers Journal &amp; Blogs</h2>
                <p className="text-xs text-[#E9F0F6]/75 mt-1">
                  Publish new admissions briefings, edit existing articles, or delete entries.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditingBlog({
                    title: '',
                    subtitle: '',
                    category: 'Admissions',
                    readTime: '5 min read',
                    date: 'October 2026',
                    author: 'Manika P',
                    authorRole: 'Senior Admissions Counsellor',
                    excerpt: '',
                    featured: false,
                    keyTakeaways: ['Key takeaway for parents and students.'],
                    bodyParagraphs: ['Write your essay paragraph here...'],
                  });
                  setIsBlogModalOpen(true);
                }}
                className="inline-flex items-center gap-2 rounded bg-[#C4A56A] px-4 py-2.5 text-xs font-semibold text-[#071A33] uppercase hover:bg-[#d4b77e]"
              >
                <Plus className="h-4 w-4" />
                <span>Write New Article</span>
              </button>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((b) => (
                <div
                  key={b.id}
                  className="flex flex-col justify-between rounded border border-white/15 bg-[#0D2947] p-6 shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-[#C4A56A] font-medium uppercase">
                      <span>{b.category}</span>
                      <span>{b.readTime}</span>
                    </div>
                    <h3 className="mt-3 font-serif text-xl font-bold text-white line-clamp-2">
                      {b.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#E9F0F6]/80 line-clamp-3">
                      {b.excerpt}
                    </p>
                    <p className="mt-4 border-t border-white/10 pt-3 text-[11px] text-[#E9F0F6]/60">
                      By <strong className="text-white">{b.author}</strong> · {b.date}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-3 border-t border-white/10 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingBlog(b);
                        setIsBlogModalOpen(true);
                      }}
                      className="inline-flex items-center gap-1 text-xs text-[#C4A56A] hover:underline"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteBlog(b.id)}
                      className="inline-flex items-center gap-1 text-xs text-rose-400 hover:underline"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: UNIVERSITIES & STUDENT NUMBERS */}
        {activeTab === 'universities' && (
          <div className="mt-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-6">
              <div>
                <h2 className="font-serif text-3xl text-white">Admitted Universities &amp; Student Counts</h2>
                <p className="text-xs text-[#E9F0F6]/75 mt-1">
                  Manage the official list of universities, exact numbers of students admitted, destination countries, and courses.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditingUni({
                    name: '',
                    country: 'USA',
                    city: '',
                    admissionsCount: 1,
                    notableCourses: ['Computer Science', 'Economics'],
                  });
                  setIsUniModalOpen(true);
                }}
                className="inline-flex items-center gap-2 rounded bg-[#C4A56A] px-4 py-2.5 text-xs font-semibold text-[#071A33] uppercase hover:bg-[#d4b77e]"
              >
                <Plus className="h-4 w-4" />
                <span>Add University</span>
              </button>
            </div>

            <div className="mt-8 overflow-hidden rounded border border-white/15 bg-[#0D2947]">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#E9F0F6]">
                  <thead className="border-b border-white/15 bg-[#071A33] uppercase text-[#C4A56A]">
                    <tr>
                      <th className="px-6 py-4">University Name</th>
                      <th className="px-6 py-4">Country &amp; City</th>
                      <th className="px-6 py-4">Number of Students Admitted</th>
                      <th className="px-6 py-4">Notable Courses</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {universities.map((u) => (
                      <tr key={u.name} className="hover:bg-white/5">
                        <td className="px-6 py-4 font-serif text-sm font-semibold text-white">
                          {u.name}
                        </td>
                        <td className="px-6 py-4">
                          <span className="rounded bg-white/10 px-2 py-0.5 text-[11px] font-medium text-white mr-2">
                            {u.country}
                          </span>
                          <span className="text-[#E9F0F6]/70">{u.city}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-mono text-sm font-bold text-[#C4A56A]">
                            {u.admissionsCount} {u.admissionsCount === 1 ? 'Student' : 'Students'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-[#E9F0F6]/80">
                          {u.notableCourses?.join(' · ') || '—'}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="inline-flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingUni(u);
                                setIsUniModalOpen(true);
                              }}
                              className="text-[#C4A56A] hover:underline"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteUniversity(u.name)}
                              className="text-rose-400 hover:underline"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: 4-5 PROFILE ACTIVITIES & RESEARCH TOPICS */}
        {activeTab === 'activities' && (
          <div className="mt-8 space-y-12">
            <div>
              <div className="border-b border-white/15 pb-4">
                <h2 className="font-serif text-2xl text-white">4-5 Core Profile Building Activities</h2>
                <p className="text-xs text-[#E9F0F6]/75 mt-1">
                  The primary activity categories representing our students&apos; high school trajectories.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                {activities.map((act, index) => (
                  <div
                    key={act.id}
                    className="rounded border border-white/15 bg-[#0D2947] p-6 shadow-sm"
                  >
                    <div className="flex items-center justify-between text-xs text-[#C4A56A]">
                      <span className="font-semibold uppercase">{act.category}</span>
                      <span className="font-mono">{act.studentInvolvement}</span>
                    </div>
                    <h3 className="mt-2 font-serif text-lg font-bold text-white">
                      Track 0{index + 1}: {act.title}
                    </h3>
                    <p className="mt-2 text-xs text-[#E9F0F6]/80 leading-relaxed">
                      {act.description}
                    </p>
                    <div className="mt-4 border-t border-white/10 pt-3">
                      <p className="text-[11px] font-semibold text-[#C4A56A] uppercase">
                        Key Projects &amp; Accomplishments
                      </p>
                      <ul className="mt-2 space-y-1 text-xs text-[#E9F0F6]/85">
                        {act.highlights.map((h, i) => (
                          <li key={i}>• {h}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="border-b border-white/15 pb-4">
                <h2 className="font-serif text-2xl text-white">4-5 Core Research Topics</h2>
                <p className="text-xs text-[#E9F0F6]/75 mt-1">
                  The primary scholarly research inquiries conducted by our students.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                {researchTopics.map((res, index) => (
                  <div
                    key={res.id}
                    className="rounded border border-white/15 bg-[#0D2947] p-6 shadow-sm"
                  >
                    <div className="flex items-center justify-between text-xs text-[#C4A56A]">
                      <span className="font-semibold uppercase">{res.field}</span>
                      <span>Topic 0{index + 1}</span>
                    </div>
                    <h3 className="mt-2 font-serif text-lg font-bold text-white">
                      {res.title}
                    </h3>
                    <p className="mt-2 text-xs text-[#E9F0F6]/80 leading-relaxed">
                      {res.description}
                    </p>
                    <div className="mt-4 border-t border-white/10 pt-3 text-xs">
                      <p className="text-[11px] font-semibold text-[#C4A56A] uppercase">
                        Methodology &amp; Implementation
                      </p>
                      <p className="mt-1 text-[#E9F0F6]/85">{res.methodology}</p>
                    </div>
                    <div className="mt-3 text-xs">
                      <p className="text-[11px] font-semibold text-[#C4A56A] uppercase">
                        Admitted Institutions
                      </p>
                      <p className="mt-1 text-[#E9F0F6]/70">
                        {res.admittedUniversities.join(' · ')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: COUNSELLORS ADVISORY */}
        {activeTab === 'counsellors' && (
          <div className="mt-8">
            <div className="border-b border-white/15 pb-6">
              <h2 className="font-serif text-3xl text-white">Senior Advisory Counsellors</h2>
              <p className="text-xs text-[#E9F0F6]/75 mt-1">
                Advisory team profiles (Manika P, Palak S, Rucha Tawde). Follows strict clean no-picture format.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
              {counsellors.map((c) => (
                <div
                  key={c.id}
                  className="rounded border border-white/15 bg-[#0D2947] p-6 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs">
                      <span className="text-[#C4A56A] font-semibold uppercase">{c.experience}</span>
                      <span className="text-[#E9F0F6]/60">Advisor</span>
                    </div>
                    <h3 className="mt-4 font-serif text-2xl font-bold text-white">{c.name}</h3>
                    <p className="mt-1 text-xs font-semibold text-[#C4A56A]">{c.role}</p>

                    <p className="mt-4 text-xs italic text-[#E9F0F6]/85 bg-white/5 p-3 rounded border-l-2 border-[#C4A56A]">
                      &ldquo;{c.philosophy}&rdquo;
                    </p>

                    <p className="mt-4 text-xs text-[#E9F0F6]/80 leading-relaxed">{c.bio}</p>

                    <div className="mt-6 space-y-2 border-t border-white/10 pt-4 text-xs">
                      <p className="text-[11px] font-semibold text-[#C4A56A] uppercase">
                        Qualifications
                      </p>
                      <p className="text-[#E9F0F6]/85">{c.certifications.join(' · ')}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: PARENT CONSULTATION INQUIRIES */}
        {activeTab === 'leads' && (
          <div className="mt-8">
            <div className="border-b border-white/15 pb-6">
              <h2 className="font-serif text-3xl text-white">Parent Consultation Inquiries</h2>
              <p className="text-xs text-[#E9F0F6]/75 mt-1">
                Consultation submissions received via the Build My Child&apos;s Roadmap contact builder.
              </p>
            </div>

            {leads.length === 0 ? (
              <div className="mt-8 rounded border border-white/15 bg-[#0D2947] p-12 text-center">
                <Compass className="mx-auto h-8 w-8 text-[#C4A56A]" />
                <p className="mt-3 font-serif text-xl text-white">No consultation inquiries yet</p>
                <p className="mt-1 text-xs text-[#E9F0F6]/70">
                  Submissions through the roadmap builder on /contact will appear here in real time.
                </p>
              </div>
            ) : (
              <div className="mt-8 overflow-hidden rounded border border-white/15 bg-[#0D2947]">
                <table className="w-full text-left text-xs text-[#E9F0F6]">
                  <thead className="border-b border-white/15 bg-[#071A33] uppercase text-[#C4A56A]">
                    <tr>
                      <th className="px-6 py-4">Parent Name</th>
                      <th className="px-6 py-4">Email / Phone</th>
                      <th className="px-6 py-4">Student Grade</th>
                      <th className="px-6 py-4">Academic Interests</th>
                      <th className="px-6 py-4">Target Regions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {leads.map((l) => (
                      <tr key={l.id} className="hover:bg-white/5">
                        <td className="px-6 py-4 font-semibold text-white">{l.parentName || 'Parent'}</td>
                        <td className="px-6 py-4">
                          <div>{l.parentEmail}</div>
                          <div className="text-[11px] text-[#E9F0F6]/60">{l.parentPhone}</div>
                        </td>
                        <td className="px-6 py-4">{l.studentGrade || 'Class 9'}</td>
                        <td className="px-6 py-4">{l.academicField || 'STEM / Economics'}</td>
                        <td className="px-6 py-4">{l.destinations?.join(', ') || 'USA, UK'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* BLOG EDIT / CREATE MODAL */}
      {isBlogModalOpen && editingBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded border border-white/20 bg-[#071A33] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <h3 className="font-serif text-xl font-bold text-white">
                {editingBlog.id ? 'Edit Blog Article' : 'Write New Blog Article'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsBlogModalOpen(false);
                  setEditingBlog(null);
                }}
                className="text-white/60 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={saveBlog} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold tracking-wider text-[#C4A56A] uppercase">
                  Article Title
                </label>
                <input
                  type="text"
                  required
                  value={editingBlog.title || ''}
                  onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                  className="mt-1.5 w-full rounded border border-white/20 bg-[#0D2947] px-4 py-2 text-sm text-white focus:border-[#C4A56A] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold tracking-wider text-[#C4A56A] uppercase">
                    Category
                  </label>
                  <select
                    value={editingBlog.category || 'Admissions'}
                    onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value as any })}
                    className="mt-1.5 w-full rounded border border-white/20 bg-[#0D2947] px-3 py-2 text-sm text-white focus:border-[#C4A56A] focus:outline-none"
                  >
                    <option value="Admissions">Admissions</option>
                    <option value="University Intelligence">University Intelligence</option>
                    <option value="Parent Guides">Parent Guides</option>
                    <option value="Student Guides">Student Guides</option>
                    <option value="Class 8–10">Class 8–10</option>
                    <option value="Class 11–12">Class 11–12</option>
                    <option value="SAT">SAT</option>
                    <option value="Research">Research</option>
                    <option value="Profile Building">Profile Building</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-wider text-[#C4A56A] uppercase">
                    Author
                  </label>
                  <select
                    value={editingBlog.author || 'Manika P'}
                    onChange={(e) => setEditingBlog({ ...editingBlog, author: e.target.value })}
                    className="mt-1.5 w-full rounded border border-white/20 bg-[#0D2947] px-3 py-2 text-sm text-white focus:border-[#C4A56A] focus:outline-none"
                  >
                    <option value="Manika P">Manika P</option>
                    <option value="Palak S">Palak S</option>
                    <option value="Rucha Tawde">Rucha Tawde</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-wider text-[#C4A56A] uppercase">
                  Short Excerpt / Executive Summary
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingBlog.excerpt || ''}
                  onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                  className="mt-1.5 w-full rounded border border-white/20 bg-[#0D2947] px-4 py-2 text-sm text-white focus:border-[#C4A56A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-wider text-[#C4A56A] uppercase">
                  Article Body Paragraph (or first paragraph)
                </label>
                <textarea
                  rows={4}
                  required
                  value={editingBlog.bodyParagraphs?.[0] || ''}
                  onChange={(e) =>
                    setEditingBlog({
                      ...editingBlog,
                      bodyParagraphs: [e.target.value],
                    })
                  }
                  className="mt-1.5 w-full rounded border border-white/20 bg-[#0D2947] px-4 py-2 text-sm text-white focus:border-[#C4A56A] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-white/15 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsBlogModalOpen(false);
                    setEditingBlog(null);
                  }}
                  className="rounded border border-white/25 px-4 py-2 text-xs font-medium text-white hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-[#C4A56A] px-5 py-2 text-xs font-semibold text-[#071A33] uppercase hover:bg-[#d4b77e]"
                >
                  Save &amp; Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* UNIVERSITY ADD / EDIT MODAL */}
      {isUniModalOpen && editingUni && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded border border-white/20 bg-[#071A33] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <h3 className="font-serif text-xl font-bold text-white">
                {editingUni.name ? 'Edit University' : 'Add University Record'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsUniModalOpen(false);
                  setEditingUni(null);
                }}
                className="text-white/60 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={saveUniversity} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold tracking-wider text-[#C4A56A] uppercase">
                  University Name
                </label>
                <input
                  type="text"
                  required
                  value={editingUni.name || ''}
                  onChange={(e) => setEditingUni({ ...editingUni, name: e.target.value })}
                  className="mt-1.5 w-full rounded border border-white/20 bg-[#0D2947] px-4 py-2 text-sm text-white focus:border-[#C4A56A] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold tracking-wider text-[#C4A56A] uppercase">
                    Country
                  </label>
                  <select
                    value={editingUni.country || 'USA'}
                    onChange={(e) => setEditingUni({ ...editingUni, country: e.target.value as any })}
                    className="mt-1.5 w-full rounded border border-white/20 bg-[#0D2947] px-3 py-2 text-sm text-white focus:border-[#C4A56A] focus:outline-none"
                  >
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Germany">Germany</option>
                    <option value="Australia">Australia</option>
                    <option value="Hong Kong">Hong Kong</option>
                    <option value="Canada">Canada</option>
                    <option value="Europe">Europe</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-wider text-[#C4A56A] uppercase">
                    Number of Students Admitted
                  </label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={editingUni.admissionsCount || 1}
                    onChange={(e) =>
                      setEditingUni({ ...editingUni, admissionsCount: Number(e.target.value) })
                    }
                    className="mt-1.5 w-full rounded border border-white/20 bg-[#0D2947] px-4 py-2 text-sm text-white focus:border-[#C4A56A] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-wider text-[#C4A56A] uppercase">
                  City / Location
                </label>
                <input
                  type="text"
                  value={editingUni.city || ''}
                  onChange={(e) => setEditingUni({ ...editingUni, city: e.target.value })}
                  placeholder="e.g. London, Cambridge, Stanford, CA"
                  className="mt-1.5 w-full rounded border border-white/20 bg-[#0D2947] px-4 py-2 text-sm text-white focus:border-[#C4A56A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-wider text-[#C4A56A] uppercase">
                  Notable Courses (comma-separated)
                </label>
                <input
                  type="text"
                  value={editingUni.notableCourses?.join(', ') || ''}
                  onChange={(e) =>
                    setEditingUni({
                      ...editingUni,
                      notableCourses: e.target.value.split(',').map((s) => s.trim()),
                    })
                  }
                  placeholder="e.g. Computer Science, Economics, Mathematics"
                  className="mt-1.5 w-full rounded border border-white/20 bg-[#0D2947] px-4 py-2 text-sm text-white focus:border-[#C4A56A] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-white/15 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsUniModalOpen(false);
                    setEditingUni(null);
                  }}
                  className="rounded border border-white/25 px-4 py-2 text-xs font-medium text-white hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-[#C4A56A] px-5 py-2 text-xs font-semibold text-[#071A33] uppercase hover:bg-[#d4b77e]"
                >
                  Save University
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
