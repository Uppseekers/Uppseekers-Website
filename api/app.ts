import express, { Request, Response, Router } from 'express';
import fs from 'node:fs';
import path from 'node:path';

// Primary writable path for Vercel/Serverless is /tmp/siteData.json
const TMP_DATA_FILE = '/tmp/siteData.json';
// Fallback local file
const LOCAL_DATA_FILE = path.resolve(process.cwd(), 'data/siteData.json');

// In-memory cache for warm function invocations
let memoryCache: any = null;

// Helper to safely load data
export function getSiteData() {
  if (memoryCache) {
    return memoryCache;
  }

  // 1. Check /tmp if running on serverless
  try {
    if (fs.existsSync(TMP_DATA_FILE)) {
      const raw = fs.readFileSync(TMP_DATA_FILE, 'utf-8');
      memoryCache = JSON.parse(raw);
      return memoryCache;
    }
  } catch (err) {
    console.warn('Could not read from /tmp/siteData.json:', err);
  }

  // 2. Check local repo data/siteData.json
  try {
    if (fs.existsSync(LOCAL_DATA_FILE)) {
      const raw = fs.readFileSync(LOCAL_DATA_FILE, 'utf-8');
      memoryCache = JSON.parse(raw);
      return memoryCache;
    }
  } catch (err) {
    console.warn('Could not read from local siteData.json:', err);
  }

  return memoryCache;
}

// Helper to safely write data
export function saveSiteData(data: unknown) {
  memoryCache = data;

  let written = false;

  // Try writing to /tmp (always writable on Vercel Serverless)
  try {
    fs.writeFileSync(TMP_DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    written = true;
  } catch (err) {
    // Ignore if /tmp not accessible
  }

  // Also try writing to local data/siteData.json if writable (local dev)
  try {
    const dir = path.dirname(LOCAL_DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(LOCAL_DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    written = true;
  } catch (err) {
    // Expected on read-only environments like Vercel Lambda
  }

  return written || true;
}

const app = express();
app.use(express.json());

// CORS & Preflight headers for production deployment
app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (_req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

const router = Router();

// Health
router.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    environment: process.env.VERCEL ? 'vercel-serverless' : 'node-server',
    timestamp: new Date().toISOString(),
  });
});

// ADMIN AUTH & PASSWORD MANAGEMENT
router.post('/admin/verify', (req: Request, res: Response) => {
  const { password } = req.body;
  const data = getSiteData();
  const correctPassword = data?.adminPassword || 'uppseekers2026';
  if (password && password === correctPassword) {
    return res.json({ success: true, message: 'Authentication successful' });
  }
  return res.status(401).json({ success: false, error: 'Incorrect administrator password' });
});

router.post('/admin/change-password', (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  if (!newPassword || typeof newPassword !== 'string' || newPassword.trim().length < 4) {
    return res.status(400).json({ success: false, error: 'New password must be at least 4 characters long' });
  }
  const data = getSiteData() || {};
  const correctPassword = data?.adminPassword || 'uppseekers2026';
  if (currentPassword !== correctPassword) {
    return res.status(401).json({ success: false, error: 'Current password is incorrect' });
  }
  data.adminPassword = newPassword.trim();
  saveSiteData(data);
  return res.json({ success: true, message: 'Password updated successfully' });
});

// GET Full Content
router.get('/content', (_req: Request, res: Response) => {
  const data = getSiteData();
  if (!data) {
    return res.status(500).json({ error: 'Could not load site data' });
  }
  res.json(data);
});

// PUT Full Content
router.put('/content', (req: Request, res: Response) => {
  saveSiteData(req.body);
  res.json({ success: true, data: req.body });
});

// PUT Page Copy
router.put('/pages/:pageKey', (req: Request, res: Response) => {
  const data = getSiteData() || {};
  const { pageKey } = req.params;
  data.pagesContent = data.pagesContent || {};
  data.pagesContent[pageKey] = {
    ...(data.pagesContent[pageKey] || {}),
    ...req.body,
  };
  saveSiteData(data);
  res.json({ success: true, pageContent: data.pagesContent[pageKey] });
});

// BLOGS CRUD
router.get('/blogs', (_req: Request, res: Response) => {
  const data = getSiteData();
  res.json(data?.blogs || []);
});

router.post('/blogs', (req: Request, res: Response) => {
  const data = getSiteData() || {};
  const newBlog = {
    id: `art-${Date.now()}`,
    title: req.body.title || 'Untitled Article',
    subtitle: req.body.subtitle || '',
    category: req.body.category || 'Admissions',
    readTime: req.body.readTime || '5 min read',
    date: req.body.date || 'October 2026',
    author: req.body.author || 'Manika P',
    authorRole: req.body.authorRole || 'Senior Admissions Counsellor',
    featured: Boolean(req.body.featured),
    excerpt: req.body.excerpt || '',
    keyTakeaways: Array.isArray(req.body.keyTakeaways) ? req.body.keyTakeaways : [],
    bodyParagraphs: Array.isArray(req.body.bodyParagraphs) ? req.body.bodyParagraphs : [],
  };
  data.blogs = data.blogs || [];
  data.blogs.unshift(newBlog);
  saveSiteData(data);
  res.status(201).json({ success: true, blog: newBlog });
});

router.put('/blogs/:id', (req: Request, res: Response) => {
  const data = getSiteData();
  if (!data) return res.status(500).json({ error: 'Could not load site data' });
  const { id } = req.params;
  data.blogs = data.blogs || [];
  const index = data.blogs.findIndex((b: { id: string }) => b.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Blog not found' });
  }
  data.blogs[index] = { ...data.blogs[index], ...req.body };
  saveSiteData(data);
  res.json({ success: true, blog: data.blogs[index] });
});

router.delete('/blogs/:id', (req: Request, res: Response) => {
  const data = getSiteData();
  if (!data) return res.status(500).json({ error: 'Could not load site data' });
  const { id } = req.params;
  data.blogs = (data.blogs || []).filter((b: { id: string }) => b.id !== id);
  saveSiteData(data);
  res.json({ success: true });
});

// UNIVERSITIES CRUD
router.get('/universities', (_req: Request, res: Response) => {
  const data = getSiteData();
  res.json(data?.universities || []);
});

router.post('/universities', (req: Request, res: Response) => {
  const data = getSiteData() || {};
  const newUni = {
    id: `uni-${Date.now()}`,
    name: req.body.name || 'University Name',
    country: req.body.country || 'USA',
    city: req.body.city || '',
    admissionsCount: Number(req.body.admissionsCount) || 1,
    notableCourses: Array.isArray(req.body.notableCourses) ? req.body.notableCourses : [],
  };
  data.universities = data.universities || [];
  data.universities.push(newUni);
  saveSiteData(data);
  res.status(201).json({ success: true, university: newUni });
});

router.put('/universities/:id', (req: Request, res: Response) => {
  const data = getSiteData();
  if (!data) return res.status(500).json({ error: 'Could not load site data' });
  const { id } = req.params;
  data.universities = data.universities || [];
  const index = data.universities.findIndex((u: { id: string }) => u.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'University not found' });
  }
  data.universities[index] = { ...data.universities[index], ...req.body };
  saveSiteData(data);
  res.json({ success: true, university: data.universities[index] });
});

router.delete('/universities/:id', (req: Request, res: Response) => {
  const data = getSiteData();
  if (!data) return res.status(500).json({ error: 'Could not load site data' });
  const { id } = req.params;
  data.universities = (data.universities || []).filter((u: { id: string }) => u.id !== id);
  saveSiteData(data);
  res.json({ success: true });
});

// PROFILE ACTIVITIES CRUD
router.get('/profile-activities', (_req: Request, res: Response) => {
  const data = getSiteData();
  res.json(data?.profileActivities || []);
});

router.put('/profile-activities', (req: Request, res: Response) => {
  const data = getSiteData() || {};
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ error: 'Body must be an array of activities' });
  }
  data.profileActivities = req.body;
  saveSiteData(data);
  res.json({ success: true, profileActivities: data.profileActivities });
});

// RESEARCH TOPICS CRUD
router.get('/research-topics', (_req: Request, res: Response) => {
  const data = getSiteData();
  res.json(data?.researchTopics || []);
});

router.put('/research-topics', (req: Request, res: Response) => {
  const data = getSiteData() || {};
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ error: 'Body must be an array of research topics' });
  }
  data.researchTopics = req.body;
  saveSiteData(data);
  res.json({ success: true, researchTopics: data.researchTopics });
});

// COUNSELLORS CRUD
router.get('/counsellors', (_req: Request, res: Response) => {
  const data = getSiteData();
  res.json(data?.counsellors || []);
});

router.put('/counsellors', (req: Request, res: Response) => {
  const data = getSiteData() || {};
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ error: 'Body must be an array of counsellors' });
  }
  data.counsellors = req.body;
  saveSiteData(data);
  res.json({ success: true, counsellors: data.counsellors });
});

// LEADS POST & GET
router.post('/leads', (req: Request, res: Response) => {
  const data = getSiteData() || {};
  const newLead = {
    id: `lead-${Date.now()}`,
    timestamp: new Date().toISOString(),
    ...req.body,
  };
  data.leads = data.leads || [];
  data.leads.unshift(newLead);
  saveSiteData(data);
  res.status(201).json({ success: true, lead: newLead });
});

router.get('/leads', (_req: Request, res: Response) => {
  const data = getSiteData();
  res.json(data?.leads || []);
});

// Register router on both /api prefix and root for universal compatibility
app.use('/api', router);
app.use(router);

export default app;
