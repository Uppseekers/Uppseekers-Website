import React, { useState, useEffect } from 'react';
import {
  PageRoute,
  DestinationCountry,
  PAGE_SEO,
} from './data/uppseekersData';
import { SiteDataProvider } from './context/SiteDataContext';
import { Navbar, Footer } from './components/SharedComponents';
import { HomePage } from './pages/HomePage';
import {
  ApproachPage,
  AdmissionsPage,
  ProfileBuildingPage,
  ResearchPage,
  WorkExperiencePage,
  SatPage,
} from './pages/ProgramPages';
import {
  ResultsPage,
  StudentStoriesPage,
  CounsellorsPage,
  UniversityMentorsPage,
  AboutPage,
  InsightsPage,
  ContactPage,
} from './pages/CommunityAndArchivePages';
import { AdminPage } from './pages/AdminPage';

const VALID_ROUTES: PageRoute[] = [
  '/',
  '/approach',
  '/admissions',
  '/profile-building',
  '/research',
  '/work-experience',
  '/sat',
  '/results',
  '/student-stories',
  '/counsellors',
  '/university-mentors',
  '/about',
  '/insights',
  '/contact',
  '/admin',
];

function resolvePathToRoute(pathname: string): PageRoute {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (VALID_ROUTES.includes(clean as PageRoute)) {
    return clean as PageRoute;
  }
  return '/';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>(() =>
    typeof window !== 'undefined' ? resolvePathToRoute(window.location.pathname) : '/'
  );
  const [countryFilter, setCountryFilter] = useState<DestinationCountry | undefined>(undefined);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(resolvePathToRoute(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update SEO metadata on every page change
  useEffect(() => {
    const seo = PAGE_SEO[currentPage] || PAGE_SEO['/'];
    document.title = seo.title;

    const updateMeta = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) {
        el.setAttribute('content', content);
      }
    };

    updateMeta('meta[name="description"]', seo.description);
    updateMeta('meta[property="og:title"]', seo.title);
    updateMeta('meta[property="og:description"]', seo.description);
    updateMeta('meta[name="twitter:title"]', seo.title);
    updateMeta('meta[name="twitter:description"]', seo.description);
  }, [currentPage]);

  const handleNavigate = (page: PageRoute, filterCountry?: DestinationCountry) => {
    if (filterCountry) {
      setCountryFilter(filterCountry);
    } else if (page !== '/results') {
      setCountryFilter(undefined);
    }
    setCurrentPage(page);
    try {
      window.history.pushState({}, '', page);
    } catch {
      // Fallback if running in restricted iframe history mode
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <SiteDataProvider>
      <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#1C2630]">
        {currentPage !== '/admin' && (
          <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
        )}

        <main className="flex-1">
          {currentPage === '/' && <HomePage onNavigate={handleNavigate} />}
          {currentPage === '/approach' && <ApproachPage onNavigate={handleNavigate} />}
          {currentPage === '/admissions' && <AdmissionsPage onNavigate={handleNavigate} />}
          {currentPage === '/profile-building' && <ProfileBuildingPage onNavigate={handleNavigate} />}
          {currentPage === '/research' && <ResearchPage onNavigate={handleNavigate} />}
          {currentPage === '/work-experience' && <WorkExperiencePage onNavigate={handleNavigate} />}
          {currentPage === '/sat' && <SatPage onNavigate={handleNavigate} />}
          {currentPage === '/results' && (
            <ResultsPage onNavigate={handleNavigate} initialCountryFilter={countryFilter} />
          )}
          {currentPage === '/student-stories' && <StudentStoriesPage onNavigate={handleNavigate} />}
          {currentPage === '/counsellors' && <CounsellorsPage onNavigate={handleNavigate} />}
          {currentPage === '/university-mentors' && (
            <UniversityMentorsPage onNavigate={handleNavigate} />
          )}
          {currentPage === '/about' && <AboutPage onNavigate={handleNavigate} />}
          {currentPage === '/insights' && <InsightsPage onNavigate={handleNavigate} />}
          {currentPage === '/contact' && (
            <ContactPage onNavigate={handleNavigate} initialCountryFilter={countryFilter} />
          )}
          {currentPage === '/admin' && <AdminPage onNavigate={handleNavigate} />}
        </main>

        {currentPage !== '/admin' && <Footer onNavigate={handleNavigate} />}
      </div>
    </SiteDataProvider>
  );
}
