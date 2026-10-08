import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AdmittedUniversityInfo,
  ADMITTED_UNIVERSITIES,
  COUNSELLORS_DATA,
  CounsellorProfile,
  JOURNAL_ARTICLES,
  JournalArticle,
  PROFILE_ACTIVITIES,
  ProfileActivityTrack,
  RESEARCH_TOPICS,
  ResearchTopicTrack,
  COUNSELLORS_EXPANSION_NOTE,
} from '../data/uppseekersData';

export interface SitePagesContent {
  home: {
    heroEyebrow: string;
    heroHeadline: string;
    heroSubhead: string;
    statsTag?: string;
  };
  approach: {
    eyebrow: string;
    headline: string;
    subhead: string;
  };
  admissions: {
    eyebrow: string;
    headline: string;
    subhead: string;
  };
  profileBuilding: {
    eyebrow: string;
    headline: string;
    subhead: string;
  };
  research: {
    eyebrow: string;
    headline: string;
    subhead: string;
  };
  workExperience: {
    eyebrow: string;
    headline: string;
    subhead: string;
  };
  sat: {
    eyebrow: string;
    headline: string;
    subhead: string;
  };
  results: {
    eyebrow: string;
    headline: string;
    subhead: string;
  };
  counsellors: {
    eyebrow: string;
    headline: string;
    subhead: string;
  };
  about: {
    eyebrow: string;
    headline: string;
    subhead: string;
  };
  [key: string]: Record<string, string>;
}

export const DEFAULT_PAGES_CONTENT: SitePagesContent = {
  home: {
    heroEyebrow: 'UNDERGRADUATE ADMISSIONS & STUDENT DEVELOPMENT · CLASS 8 TO 12',
    heroHeadline: 'THE JOURNEY TO A GREAT UNIVERSITY STARTS LONG BEFORE THE APPLICATION.',
    heroSubhead:
      'We work with students from Class 8 onwards to discover their strengths, build genuine academic depth, and navigate admissions to the world’s leading universities.',
    statsTag: 'DOCUMENTED STUDENT DEVELOPMENT',
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

export interface SiteDataContextType {
  universities: AdmittedUniversityInfo[];
  totalAdmissionsCount: number;
  officialStudentCount: number;
  profileActivities: ProfileActivityTrack[];
  researchTopics: ResearchTopicTrack[];
  counsellors: CounsellorProfile[];
  counsellorsExpansionNote: typeof COUNSELLORS_EXPANSION_NOTE;
  blogs: JournalArticle[];
  pagesContent: SitePagesContent;
  leads: any[];
  isLoading: boolean;
  updatePagesContent: (pageKey: string, field: string, value: string) => Promise<boolean>;
  saveBlog: (blogData: Partial<JournalArticle>) => Promise<boolean>;
  deleteBlog: (id: string) => Promise<boolean>;
  saveUniversity: (uniData: Partial<AdmittedUniversityInfo>) => Promise<boolean>;
  deleteUniversity: (name: string) => Promise<boolean>;
  updateActivities: (activities: ProfileActivityTrack[]) => Promise<boolean>;
  updateResearchTopics: (topics: ResearchTopicTrack[]) => Promise<boolean>;
  updateCounsellors: (counsellors: CounsellorProfile[]) => Promise<boolean>;
  submitLead: (leadData: Record<string, any>) => Promise<boolean>;
  resetToDefaults: () => Promise<boolean>;
  syncAllToBackend: (overrideData?: any) => Promise<boolean>;
  verifyAdminPassword: (password: string) => Promise<boolean>;
  changeAdminPassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
}

const SiteDataContext = createContext<SiteDataContextType | null>(null);

const STORAGE_KEY = 'uppseekers_site_data_v2';

export const SiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [universities, setUniversities] = useState<AdmittedUniversityInfo[]>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed.universities) && parsed.universities.length > 0) {
          return parsed.universities;
        }
      }
    } catch {
      // fallback
    }
    return ADMITTED_UNIVERSITIES;
  });

  const [profileActivities, setProfileActivities] = useState<ProfileActivityTrack[]>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed.profileActivities) && parsed.profileActivities.length > 0) {
          return parsed.profileActivities;
        }
      }
    } catch {
      // fallback
    }
    return PROFILE_ACTIVITIES;
  });

  const [researchTopics, setResearchTopics] = useState<ResearchTopicTrack[]>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed.researchTopics) && parsed.researchTopics.length > 0) {
          return parsed.researchTopics;
        }
      }
    } catch {
      // fallback
    }
    return RESEARCH_TOPICS;
  });

  const [counsellors, setCounsellors] = useState<CounsellorProfile[]>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed.counsellors) && parsed.counsellors.length > 0) {
          return parsed.counsellors;
        }
      }
    } catch {
      // fallback
    }
    return COUNSELLORS_DATA;
  });

  const [blogs, setBlogs] = useState<JournalArticle[]>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed.blogs) && parsed.blogs.length > 0) {
          return parsed.blogs;
        }
      }
    } catch {
      // fallback
    }
    return JOURNAL_ARTICLES;
  });

  const [pagesContent, setPagesContent] = useState<SitePagesContent>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.pagesContent) {
          return { ...DEFAULT_PAGES_CONTENT, ...parsed.pagesContent };
        }
      }
    } catch {
      // fallback
    }
    return DEFAULT_PAGES_CONTENT;
  });

  const [leads, setLeads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Sync state with localStorage
  const saveToLocalCache = (data: any) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  };

  // Sync state to Express backend
  const syncAllToBackend = async (overrideData?: any): Promise<boolean> => {
    const payload = {
      universities: overrideData?.universities ?? universities,
      profileActivities: overrideData?.profileActivities ?? profileActivities,
      researchTopics: overrideData?.researchTopics ?? researchTopics,
      counsellors: overrideData?.counsellors ?? counsellors,
      counsellorsExpansionNote: COUNSELLORS_EXPANSION_NOTE,
      blogs: overrideData?.blogs ?? blogs,
      pagesContent: overrideData?.pagesContent ?? pagesContent,
      leads: overrideData?.leads ?? leads,
    };

    saveToLocalCache(payload);

    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return res.ok;
    } catch {
      return true; // Still true locally
    }
  };

  // Fetch on mount
  useEffect(() => {
    setIsLoading(true);
    fetch('/api/content')
      .then((res) => {
        if (!res.ok) throw new Error('API offline');
        return res.json();
      })
      .then((data) => {
        if (data.universities && Array.isArray(data.universities)) {
          setUniversities(data.universities);
        }
        if (data.profileActivities && Array.isArray(data.profileActivities)) {
          setProfileActivities(data.profileActivities);
        }
        if (data.researchTopics && Array.isArray(data.researchTopics)) {
          setResearchTopics(data.researchTopics);
        }
        if (data.counsellors && Array.isArray(data.counsellors)) {
          setCounsellors(data.counsellors);
        }
        if (data.blogs && Array.isArray(data.blogs)) {
          setBlogs(data.blogs);
        }
        if (data.pagesContent) {
          setPagesContent((prev) => ({ ...prev, ...data.pagesContent }));
        }
        if (data.leads && Array.isArray(data.leads)) {
          setLeads(data.leads);
        }
        saveToLocalCache(data);
      })
      .catch((err) => {
        console.warn('Using client cached/default state:', err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const updatePagesContent = async (pageKey: string, field: string, value: string): Promise<boolean> => {
    const updated = {
      ...pagesContent,
      [pageKey]: {
        ...(pagesContent[pageKey] || {}),
        [field]: value,
      },
    };
    setPagesContent(updated);
    return syncAllToBackend({ pagesContent: updated });
  };

  const saveBlog = async (blogData: Partial<JournalArticle>): Promise<boolean> => {
    let updated: JournalArticle[];
    if (blogData.id) {
      updated = blogs.map((b) => (b.id === blogData.id ? ({ ...b, ...blogData } as JournalArticle) : b));
    } else {
      const newArticle: JournalArticle = {
        id: `art-${Date.now()}`,
        title: blogData.title || 'Untitled Strategy Article',
        subtitle: blogData.subtitle || '',
        category: (blogData.category as any) || 'Admissions',
        readTime: blogData.readTime || '5 min read',
        date: blogData.date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        author: blogData.author || 'Manika P',
        authorRole: blogData.authorRole || 'Senior Admissions Counsellor',
        featured: Boolean(blogData.featured),
        excerpt: blogData.excerpt || '',
        keyTakeaways: blogData.keyTakeaways || [
          'Authentic multi-year trajectory over last-minute tactics.',
          'Early preparation creates intellectual calm and distinctive narrative.',
        ],
        bodyParagraphs: blogData.bodyParagraphs || [
          blogData.excerpt || 'Article analysis and advisory insights.',
        ],
      };
      updated = [newArticle, ...blogs];
    }
    setBlogs(updated);
    return syncAllToBackend({ blogs: updated });
  };

  const deleteBlog = async (id: string): Promise<boolean> => {
    const updated = blogs.filter((b) => b.id !== id);
    setBlogs(updated);
    return syncAllToBackend({ blogs: updated });
  };

  const saveUniversity = async (uniData: Partial<AdmittedUniversityInfo>): Promise<boolean> => {
    if (!uniData.name) return false;
    let updated: AdmittedUniversityInfo[];
    const exists = universities.some((u) => u.name.toLowerCase() === uniData.name!.toLowerCase());
    if (exists) {
      updated = universities.map((u) =>
        u.name.toLowerCase() === uniData.name!.toLowerCase() ? ({ ...u, ...uniData } as AdmittedUniversityInfo) : u
      );
    } else {
      const newUni: AdmittedUniversityInfo = {
        name: uniData.name,
        country: uniData.country || 'USA',
        city: uniData.city || 'Campus Location',
        admissionsCount: Number(uniData.admissionsCount) || 1,
        notableCourses: Array.isArray(uniData.notableCourses) ? uniData.notableCourses : ['Computer Science', 'Economics'],
      };
      updated = [newUni, ...universities];
    }
    setUniversities(updated);
    return syncAllToBackend({ universities: updated });
  };

  const deleteUniversity = async (name: string): Promise<boolean> => {
    const updated = universities.filter((u) => u.name !== name);
    setUniversities(updated);
    return syncAllToBackend({ universities: updated });
  };

  const updateActivities = async (newActivities: ProfileActivityTrack[]): Promise<boolean> => {
    setProfileActivities(newActivities);
    return syncAllToBackend({ profileActivities: newActivities });
  };

  const updateResearchTopics = async (newTopics: ResearchTopicTrack[]): Promise<boolean> => {
    setResearchTopics(newTopics);
    return syncAllToBackend({ researchTopics: newTopics });
  };

  const updateCounsellors = async (newCounsellors: CounsellorProfile[]): Promise<boolean> => {
    setCounsellors(newCounsellors);
    return syncAllToBackend({ counsellors: newCounsellors });
  };

  const submitLead = async (leadData: Record<string, any>): Promise<boolean> => {
    const newLead = {
      id: `lead-${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...leadData,
    };
    const updated = [newLead, ...leads];
    setLeads(updated);
    return syncAllToBackend({ leads: updated });
  };

  const totalAdmissionsCount = universities.reduce(
    (sum, u) => sum + (Number(u.admissionsCount) || 1),
    0
  );
  const officialStudentCount = 147;

  const verifyAdminPassword = async (password: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        const data = await res.json();
        return Boolean(data.success);
      }
    } catch {
      // offline fallback
    }
    const saved = localStorage.getItem('uppseekers_admin_pass') || 'uppseekers2026';
    return password === saved;
  };

  const changeAdminPassword = async (
    currentPassword: string,
    newPassword: string
  ): Promise<{ success: boolean; error?: string }> => {
    if (!newPassword || newPassword.trim().length < 4) {
      return { success: false, error: 'Password must be at least 4 characters long' };
    }
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      if (res.ok) {
        localStorage.setItem('uppseekers_admin_pass', newPassword.trim());
        return { success: true };
      }
      const data = await res.json().catch(() => ({}));
      if (data.error) {
        return { success: false, error: data.error };
      }
    } catch {
      // offline fallback
    }
    const saved = localStorage.getItem('uppseekers_admin_pass') || 'uppseekers2026';
    if (currentPassword !== saved) {
      return { success: false, error: 'Current password is incorrect' };
    }
    localStorage.setItem('uppseekers_admin_pass', newPassword.trim());
    return { success: true };
  };

  const resetToDefaults = async (): Promise<boolean> => {
    localStorage.removeItem(STORAGE_KEY);
    setUniversities(ADMITTED_UNIVERSITIES);
    setProfileActivities(PROFILE_ACTIVITIES);
    setResearchTopics(RESEARCH_TOPICS);
    setCounsellors(COUNSELLORS_DATA);
    setBlogs(JOURNAL_ARTICLES);
    setPagesContent(DEFAULT_PAGES_CONTENT);
    return syncAllToBackend({
      universities: ADMITTED_UNIVERSITIES,
      profileActivities: PROFILE_ACTIVITIES,
      researchTopics: RESEARCH_TOPICS,
      counsellors: COUNSELLORS_DATA,
      blogs: JOURNAL_ARTICLES,
      pagesContent: DEFAULT_PAGES_CONTENT,
    });
  };

  return (
    <SiteDataContext.Provider
      value={{
        universities,
        totalAdmissionsCount,
        officialStudentCount,
        profileActivities,
        researchTopics,
        counsellors,
        counsellorsExpansionNote: COUNSELLORS_EXPANSION_NOTE,
        blogs,
        pagesContent,
        leads,
        isLoading,
        updatePagesContent,
        saveBlog,
        deleteBlog,
        saveUniversity,
        deleteUniversity,
        updateActivities,
        updateResearchTopics,
        updateCounsellors,
        submitLead,
        resetToDefaults,
        syncAllToBackend,
        verifyAdminPassword,
        changeAdminPassword,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
};

export const useSiteData = () => {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
};
