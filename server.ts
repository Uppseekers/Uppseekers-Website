import express, { Request, Response } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.resolve(__dirname, 'data/siteData.json');

// Helper to safely load data
function getSiteData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading siteData.json:', err);
  }
  return null;
}

// Helper to safely write data
function saveSiteData(data: unknown) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing siteData.json:', err);
    return false;
  }
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProduction = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // API Health
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // ADMIN AUTH & PASSWORD MANAGEMENT
  app.post('/api/admin/verify', (req: Request, res: Response) => {
    const { password } = req.body;
    const data = getSiteData();
    const correctPassword = data?.adminPassword || 'uppseekers2026';
    if (password && password === correctPassword) {
      return res.json({ success: true, message: 'Authentication successful' });
    }
    return res.status(401).json({ success: false, error: 'Incorrect administrator password' });
  });

  app.post('/api/admin/change-password', (req: Request, res: Response) => {
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
    const saved = saveSiteData(data);
    if (!saved) {
      return res.status(500).json({ success: false, error: 'Failed to save new password' });
    }
    return res.json({ success: true, message: 'Password updated successfully' });
  });

  // GET Full Content
  app.get('/api/content', (_req: Request, res: Response) => {
    const data = getSiteData();
    if (!data) {
      return res.status(500).json({ error: 'Could not load site data' });
    }
    res.json(data);
  });

  // PUT Full Content
  app.put('/api/content', (req: Request, res: Response) => {
    const success = saveSiteData(req.body);
    if (!success) {
      return res.status(500).json({ error: 'Failed to save site data' });
    }
    res.json({ success: true, data: req.body });
  });

  // PUT Page Copy
  app.put('/api/pages/:pageKey', (req: Request, res: Response) => {
    const data = getSiteData();
    if (!data) return res.status(500).json({ error: 'Could not load site data' });
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
  app.get('/api/blogs', (_req: Request, res: Response) => {
    const data = getSiteData();
    res.json(data?.blogs || []);
  });

  app.post('/api/blogs', (req: Request, res: Response) => {
    const data = getSiteData();
    if (!data) return res.status(500).json({ error: 'Could not load site data' });
    const newBlog = {
      id: `art-${Date.now()}`,
      title: req.body.title || 'Untitled Article',
      subtitle: req.body.subtitle || '',
      category: req.body.category || 'Admissions Strategy',
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

  app.put('/api/blogs/:id', (req: Request, res: Response) => {
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

  app.delete('/api/blogs/:id', (req: Request, res: Response) => {
    const data = getSiteData();
    if (!data) return res.status(500).json({ error: 'Could not load site data' });
    const { id } = req.params;
    data.blogs = (data.blogs || []).filter((b: { id: string }) => b.id !== id);
    saveSiteData(data);
    res.json({ success: true });
  });

  // UNIVERSITIES CRUD
  app.get('/api/universities', (_req: Request, res: Response) => {
    const data = getSiteData();
    res.json(data?.universities || []);
  });

  app.post('/api/universities', (req: Request, res: Response) => {
    const data = getSiteData();
    if (!data) return res.status(500).json({ error: 'Could not load site data' });
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

  app.put('/api/universities/:id', (req: Request, res: Response) => {
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

  app.delete('/api/universities/:id', (req: Request, res: Response) => {
    const data = getSiteData();
    if (!data) return res.status(500).json({ error: 'Could not load site data' });
    const { id } = req.params;
    data.universities = (data.universities || []).filter((u: { id: string }) => u.id !== id);
    saveSiteData(data);
    res.json({ success: true });
  });

  // PROFILE ACTIVITIES CRUD
  app.get('/api/profile-activities', (_req: Request, res: Response) => {
    const data = getSiteData();
    res.json(data?.profileActivities || []);
  });

  app.put('/api/profile-activities', (req: Request, res: Response) => {
    const data = getSiteData();
    if (!data) return res.status(500).json({ error: 'Could not load site data' });
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ error: 'Body must be an array of activities' });
    }
    data.profileActivities = req.body;
    saveSiteData(data);
    res.json({ success: true, profileActivities: data.profileActivities });
  });

  // RESEARCH TOPICS CRUD
  app.get('/api/research-topics', (_req: Request, res: Response) => {
    const data = getSiteData();
    res.json(data?.researchTopics || []);
  });

  app.put('/api/research-topics', (req: Request, res: Response) => {
    const data = getSiteData();
    if (!data) return res.status(500).json({ error: 'Could not load site data' });
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ error: 'Body must be an array of research topics' });
    }
    data.researchTopics = req.body;
    saveSiteData(data);
    res.json({ success: true, researchTopics: data.researchTopics });
  });

  // COUNSELLORS CRUD
  app.get('/api/counsellors', (_req: Request, res: Response) => {
    const data = getSiteData();
    res.json(data?.counsellors || []);
  });

  app.put('/api/counsellors', (req: Request, res: Response) => {
    const data = getSiteData();
    if (!data) return res.status(500).json({ error: 'Could not load site data' });
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ error: 'Body must be an array of counsellors' });
    }
    data.counsellors = req.body;
    saveSiteData(data);
    res.json({ success: true, counsellors: data.counsellors });
  });

  // LEADS POST & GET
  app.post('/api/leads', (req: Request, res: Response) => {
    const data = getSiteData();
    if (!data) return res.status(500).json({ error: 'Could not load site data' });
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

  app.get('/api/leads', (_req: Request, res: Response) => {
    const data = getSiteData();
    res.json(data?.leads || []);
  });

  // Mount Vite or serve static
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Uppseekers backend server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});
