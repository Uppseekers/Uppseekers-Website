export type PageRoute =
  | '/'
  | '/approach'
  | '/admissions'
  | '/profile-building'
  | '/research'
  | '/work-experience'
  | '/sat'
  | '/results'
  | '/student-stories'
  | '/counsellors'
  | '/university-mentors'
  | '/about'
  | '/insights'
  | '/contact'
  | '/admin';

export type DestinationCountry =
  | 'USA'
  | 'UK'
  | 'Singapore'
  | 'Germany'
  | 'Australia'
  | 'Hong Kong'
  | 'Canada'
  | 'Europe';

export const IMAGES = {
  heroQuad: '/src/assets/images/hero_university_quad_1791135392677.jpg',
  counsellingSession: '/src/assets/images/counselling_advisory_session_1791135407335.jpg',
  researchLab: '/src/assets/images/student_research_laboratory_1791135419131.jpg',
  campusLibrary: '/src/assets/images/campus_library_reading_room_1791135430096.jpg',
  counsellorPortrait: '/src/assets/images/counsellor_portrait_editorial_1791135441983.jpg',
};

export interface PageSEO {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<PageRoute, PageSEO> = {
  '/': {
    title: 'Uppseekers — Undergraduate Admissions & Student Development (Class 8–12)',
    description:
      'The journey to a great university starts long before the application. Uppseekers guides students in Classes 8–12 across admissions, profile building, research, and SAT.',
  },
  '/approach': {
    title: 'Our Approach — Backward Engineering University Admissions | Uppseekers',
    description:
      'Start with the destination and work backwards. Discover how Uppseekers builds multi-year undergraduate roadmaps from Class 8 to Class 12.',
  },
  '/admissions': {
    title: 'Undergraduate Admissions Counselling — US, UK, Singapore & Global | Uppseekers',
    description:
      'Strategic undergraduate admissions guidance from course and country selection to university shortlisting, essays, interviews, and final decisions.',
  },
  '/profile-building': {
    title: 'Student Profile Building — Depth Over Resume Padding | Uppseekers',
    description:
      'Build a profile that feels like the student through meaningful projects, academic enrichment, competitions, independent initiatives, and leadership.',
  },
  '/research': {
    title: 'High School Research Mentorship & Academic Inquiry | Uppseekers',
    description:
      'Work with experienced researchers and PhD scholars to formulate original research questions, master methodology, and write academic papers.',
  },
  '/work-experience': {
    title: 'Work Experience, Internships & Job Simulations | Uppseekers',
    description:
      'Experience the professional world before university through structured internships, job simulations, industry projects, and career exploration.',
  },
  '/sat': {
    title: 'SAT Preparation — Diagnostic Strategy, Live Classes & Practice | Uppseekers',
    description:
      'Prepare with a plan and practise with purpose. Structured SAT preparation integrated directly into your child’s undergraduate admissions timeline.',
  },
  '/results': {
    title: 'Student Results — 147+ International University Admissions | Uppseekers',
    description:
      'Explore 147+ verified student admissions across leading universities in the USA, UK, Singapore, Germany, Australia, Hong Kong, Canada, and Europe.',
  },
  '/student-stories': {
    title: 'Student Stories — Real Multi-Year Admissions Journeys | Uppseekers',
    description:
      'Read how Uppseekers students developed their academic direction, research, projects, testing, and applications from Class 8–12 to university admission.',
  },
  '/counsellors': {
    title: 'Our Counsellors — Experienced International Admissions Advisors | Uppseekers',
    description:
      'Meet our senior admissions counsellors with 8+ to 10+ years of experience, UCLA and leading British counselling certifications, and deep international insight.',
  },
  '/university-mentors': {
    title: 'University Mentors — Perspective From International Campuses | Uppseekers',
    description:
      'Connect with mentors who have lived the academic culture and student life at UPenn, Cornell, Brown, UCL, LSE, Edinburgh, NUS, and beyond.',
  },
  '/about': {
    title: 'About Uppseekers — Built Earlier, Built With Purpose',
    description:
      'Why Uppseekers exists: we believe great university admissions begin years before application season with deliberate student development.',
  },
  '/insights': {
    title: 'The Uppseekers Journal — Admissions Intelligence & Parent Guides',
    description:
      'In-depth essays and briefings for parents and students on international undergraduate admissions, profile building, research, and testing.',
  },
  '/contact': {
    title: 'Build My Child’s Roadmap — Speak With an Uppseekers Advisor',
    description:
      'Share your child’s current class, academic interests, and target destinations to build a tailored multi-year undergraduate roadmap.',
  },
  '/admin': {
    title: 'Uppseekers Management CMS — Edit Pages, Blogs & Universities',
    description: 'Internal content management system to edit page copy, publish blogs, and update student numbers and universities.',
  },
};

export interface ProfileActivityTrack {
  id: string;
  title: string;
  category: string;
  description: string;
  highlights: string[];
  studentInvolvement: string;
}

export const PROFILE_ACTIVITIES: ProfileActivityTrack[] = [
  {
    id: 'act-1',
    title: 'Autonomous Systems & Applied Software Builds',
    category: 'Engineering & Computer Science',
    description: 'Building functional, end-to-end computational and robotic platforms rather than passive classroom theory.',
    highlights: [
      'FIRST Robotics Championship hardware architecture and autonomous navigation algorithms',
      'Nilos: Autonomous Nile-cleaning robot built with recycled materials and custom PCB integration',
      'Driver safety vision systems with real-time drowsiness detection and onboard computer vision inference',
    ],
    studentInvolvement: '18+ Admitted Students',
  },
  {
    id: 'act-2',
    title: 'Industry Internships & Technical Apprenticeships',
    category: 'Professional Immersion',
    description: 'Testing academic theory in production corporate environments across software, finance, and industrial engineering before university.',
    highlights: [
      'IBM Z Xplore mainframe computing and quantitative data pipeline development',
      'Software Engineering internships building Retrieval-Augmented Generation (RAG) platforms',
      'Data analysis and automated dashboard pipelines at global industrial engineering firms',
    ],
    studentInvolvement: '24+ Admitted Students',
  },
  {
    id: 'act-3',
    title: 'Competitive Olympiads & International Distinctions',
    category: 'Academic Honors',
    description: 'Disciplined preparation for high-rigour subject challenges demonstrating top-percentile mastery.',
    highlights: [
      'UK Mathematics Trust (UKMT) Senior Maths Challenge Gold Awards',
      'CBSE City Toppers & JEE Advanced top-tier percentiles (99.72+ percentile)',
      'National Merit Scholar distinctions and university research scholarship awards',
    ],
    studentInvolvement: '30+ Admitted Students',
  },
  {
    id: 'act-4',
    title: 'Selective Summer Academies & Lab Fellowships',
    category: 'Scholarly Preparation',
    description: 'Participating in highly selective, fully funded summer academies focused on intensive research methodology.',
    highlights: [
      'Carnegie Mellon University SAMS (Summer Academy for Math and Science ~7% admit rate)',
      'MIT Beaver Works Summer Institute (Semiconductor & ASIC design implementation)',
      'Boston University RISE cross-institutional electrical engineering research',
    ],
    studentInvolvement: '15+ Admitted Students',
  },
  {
    id: 'act-5',
    title: 'Student-Led Educational & Community Initiatives',
    category: 'Leadership & Impact',
    description: 'Initiatives founded and scaled by students to mentor younger peers and solve local challenges.',
    highlights: [
      'Peer mentorship initiatives tutoring 150+ students in GCSE Maths & Computer Science',
      'Non-profit educational resource platforms providing open STEM curricula',
      'Environmental sustainability and digital literacy outreach programs',
    ],
    studentInvolvement: '22+ Admitted Students',
  },
];

export interface ResearchTopicTrack {
  id: string;
  title: string;
  field: string;
  description: string;
  methodology: string;
  admittedUniversities: string[];
}

export const RESEARCH_TOPICS: ResearchTopicTrack[] = [
  {
    id: 'res-1',
    title: 'Applied Cryptography & Zero-Knowledge Verification',
    field: 'Computer Science & Pure Mathematics',
    description: 'Investigating cryptographic primitives, hashing structures, and computational zero-knowledge proofs under university faculty mentorship.',
    methodology: 'Algorithmic complexity analysis, Python/C++ implementations, peer-reviewed abstract synthesis.',
    admittedUniversities: ['Stanford University', 'UCL', 'Caltech'],
  },
  {
    id: 'res-2',
    title: 'Quantitative Financial Modeling & Congressional Performance',
    field: 'Computational Economics & Data Science',
    description: 'Analyzing whether political officials outperform S&P 500 benchmarks using public trading datasets and automated API pipelines.',
    methodology: 'Quiver Quant API, yFinance time-series regression, statistical significance testing.',
    admittedUniversities: ['UCL', 'University of Chicago', 'Cornell University'],
  },
  {
    id: 'res-3',
    title: 'Astrophysics: Mass Distribution & Galactic Rotational Curves',
    field: 'Astrophysics & Applied Mathematics',
    description: 'Modeling stellar rotational velocities in the Milky Way to evaluate mass distribution correlations in the observable universe.',
    methodology: 'Astrophysical datasets, rotational curve fitting, published in the Journal of Student Research.',
    admittedUniversities: ['University of Chicago', 'Brown University', 'Caltech'],
  },
  {
    id: 'res-4',
    title: 'Semiconductor Architecture & ASIC Hardware Prototyping',
    field: 'Electrical Engineering & Microelectronics',
    description: 'Investigating chip architecture, PCB/ASIC design trade-offs, and microelectronic modeling.',
    methodology: 'Verilog/VHDL simulations, FPGA synthesis, cross-institutional research (BU RISE & MIT BWSI).',
    admittedUniversities: ['Caltech', 'Imperial College London', 'Cornell University'],
  },
  {
    id: 'res-5',
    title: 'Autonomous Robotics & Computer Vision for Driver Safety',
    field: 'Robotics & Artificial Intelligence',
    description: 'Real-time computer vision inference on low-power edge hardware to detect micro-sleep patterns and improve vehicle safety.',
    methodology: 'OpenCV, lightweight convolutional networks, embedded microcontroller sensor integration.',
    admittedUniversities: ['University of Chicago', 'National University of Singapore', 'ETH Zurich'],
  },
];

export const DESTINATIONS: DestinationCountry[] = [
  'USA',
  'UK',
  'Singapore',
  'Germany',
  'Australia',
  'Hong Kong',
  'Canada',
  'Europe',
];

export interface AdmittedUniversityInfo {
  name: string;
  country: DestinationCountry;
  city: string;
  admissionsCount: number;
  notableCourses: string[];
}

export const OFFICIAL_ADMISSIONS_COUNT = 147;

export const ADMITTED_UNIVERSITIES: AdmittedUniversityInfo[] = [
  {
    name: 'Stanford University',
    country: 'USA',
    city: 'Stanford, CA',
    admissionsCount: 3,
    notableCourses: ['Computer Science', 'Economics', 'Symbolic Systems'],
  },
  {
    name: 'California Institute of Technology (Caltech)',
    country: 'USA',
    city: 'Pasadena, CA',
    admissionsCount: 2,
    notableCourses: ['Computer Science', 'Electrical Engineering', 'Applied Physics'],
  },
  {
    name: 'The University of Hong Kong (HKU)',
    country: 'Hong Kong',
    city: 'Hong Kong',
    admissionsCount: 6,
    notableCourses: ['Computer Science', 'Data Science & AI', 'Quantitative Finance'],
  },
  {
    name: 'Cornell University',
    country: 'USA',
    city: 'Ithaca, NY',
    admissionsCount: 4,
    notableCourses: ['Computer Science', 'Mechanical Engineering', 'Applied Economics & Management'],
  },
  {
    name: 'Brown University',
    country: 'USA',
    city: 'Providence, RI',
    admissionsCount: 2,
    notableCourses: ['Cognitive Neuroscience', 'Applied Mathematics-Economics'],
  },
  {
    name: 'University of Pennsylvania',
    country: 'USA',
    city: 'Philadelphia, PA',
    admissionsCount: 3,
    notableCourses: ['Economics', 'Bioengineering', 'Philosophy, Politics & Economics'],
  },
  {
    name: 'University of Chicago',
    country: 'USA',
    city: 'Chicago, IL',
    admissionsCount: 3,
    notableCourses: ['Economics', 'Mathematics & Computer Science'],
  },
  {
    name: 'Duke University',
    country: 'USA',
    city: 'Durham, NC',
    admissionsCount: 3,
    notableCourses: ['Public Policy', 'Biomedical Engineering', 'Economics'],
  },
  {
    name: 'University of Cambridge',
    country: 'UK',
    city: 'Cambridge',
    admissionsCount: 2,
    notableCourses: ['Natural Sciences', 'Economics'],
  },
  {
    name: 'Imperial College London',
    country: 'UK',
    city: 'London',
    admissionsCount: 6,
    notableCourses: ['Computing', 'Aeronautical Engineering', 'Electrical & Electronic Engineering'],
  },
  {
    name: 'UCL (University College London)',
    country: 'UK',
    city: 'London',
    admissionsCount: 11,
    notableCourses: ['Economics', 'Architecture', 'Computer Science', 'Biomedical Sciences'],
  },
  {
    name: 'London School of Economics (LSE)',
    country: 'UK',
    city: 'London',
    admissionsCount: 4,
    notableCourses: ['Economics', 'Management', 'Politics and International Relations'],
  },
  {
    name: 'National University of Singapore (NUS)',
    country: 'Singapore',
    city: 'Singapore',
    admissionsCount: 6,
    notableCourses: ['Computer Science', 'Business Administration', 'Data Science & Economics'],
  },
  {
    name: 'University of Michigan',
    country: 'USA',
    city: 'Ann Arbor, MI',
    admissionsCount: 7,
    notableCourses: ['Computer Science Engineering', 'Business (Ross)', 'Aerospace Engineering'],
  },
  {
    name: 'University of Edinburgh',
    country: 'UK',
    city: 'Edinburgh',
    admissionsCount: 7,
    notableCourses: ['Artificial Intelligence & CS', 'International Relations', 'Economics & Mathematics'],
  },
  {
    name: "King's College London",
    country: 'UK',
    city: 'London',
    admissionsCount: 8,
    notableCourses: ['Business Management', 'Psychology', 'Computer Science', 'Law'],
  },
  {
    name: 'New York University (NYU)',
    country: 'USA',
    city: 'New York, NY',
    admissionsCount: 6,
    notableCourses: ['Finance & Economics', 'Data Science', 'Interactive Media Arts'],
  },
  {
    name: 'University of Washington',
    country: 'USA',
    city: 'Seattle, WA',
    admissionsCount: 6,
    notableCourses: ['Computer Science', 'Informatics', 'Bioengineering'],
  },
  {
    name: 'Purdue University',
    country: 'USA',
    city: 'West Lafayette, IN',
    admissionsCount: 7,
    notableCourses: ['First-Year Engineering', 'Computer Science', 'Aerospace Engineering'],
  },
  {
    name: 'University of Toronto',
    country: 'Canada',
    city: 'Toronto, ON',
    admissionsCount: 9,
    notableCourses: ['Rotman Commerce', 'Computer Science', 'Engineering Science'],
  },
  {
    name: 'University of British Columbia (UBC)',
    country: 'Canada',
    city: 'Vancouver, BC',
    admissionsCount: 6,
    notableCourses: ['Sauder Commerce', 'Applied Science', 'Environmental Sciences'],
  },
  {
    name: 'McGill University',
    country: 'Canada',
    city: 'Montreal, QC',
    admissionsCount: 5,
    notableCourses: ['Desautels Management', 'Software Engineering', 'Neuroscience'],
  },
  {
    name: 'HKUST',
    country: 'Hong Kong',
    city: 'Hong Kong',
    admissionsCount: 5,
    notableCourses: ['Quantitative Finance', 'Engineering', 'Global Business'],
  },
  {
    name: 'University of Melbourne',
    country: 'Australia',
    city: 'Melbourne',
    admissionsCount: 5,
    notableCourses: ['Commerce', 'Biomedicine', 'Design'],
  },
  {
    name: 'University of Sydney',
    country: 'Australia',
    city: 'Sydney',
    admissionsCount: 4,
    notableCourses: ['Economics', 'Advanced Computing', 'Law & Commerce'],
  },
  {
    name: 'Monash University',
    country: 'Australia',
    city: 'Melbourne',
    admissionsCount: 3,
    notableCourses: ['Engineering', 'Pharmaceutical Science'],
  },
  {
    name: 'Technical University of Munich (TUM)',
    country: 'Germany',
    city: 'Munich',
    admissionsCount: 3,
    notableCourses: ['Management & Technology', 'Mechanical Engineering'],
  },
  {
    name: 'Heidelberg University',
    country: 'Germany',
    city: 'Heidelberg',
    admissionsCount: 2,
    notableCourses: ['Molecular Biotechnology', 'Physics'],
  },
  {
    name: 'Humboldt University of Berlin',
    country: 'Germany',
    city: 'Berlin',
    admissionsCount: 2,
    notableCourses: ['Economics & Management Science'],
  },
  {
    name: 'ESSEC Business School',
    country: 'Europe',
    city: 'Cergy / Singapore',
    admissionsCount: 3,
    notableCourses: ['Global BBA'],
  },
  {
    name: 'Singapore Management University (SMU)',
    country: 'Singapore',
    city: 'Singapore',
    admissionsCount: 4,
    notableCourses: ['Quantitative Economics', 'Business Management'],
  },
];

export interface StudentAdmissionRecord {
  id: string;
  displayName: string; // First Name + Last Initial OR Student A/B
  publicApproval: boolean;
  university: string;
  country: DestinationCountry;
  course: string;
  classJoined: 'Class 8' | 'Class 9' | 'Class 10' | 'Class 11' | 'Class 12';
  classOf: string;
  curriculum: 'IBDP' | 'A-Levels' | 'CBSE' | 'ISC';
  schoolType: string;
  academicPerformance: string;
  academicDirection: string;
  research?: string;
  internshipWork?: string;
  competitionsAwards?: string;
  projects?: string;
  summerPrograms?: string;
  satPrepared: boolean;
  applicationStrategy: string;
  startingPoint?: string;
  journeyNarrative?: string;
}

export const STUDENT_ADMISSIONS_DATA: StudentAdmissionRecord[] = [
  {
    id: 'stu-01',
    displayName: 'Admitted Scholar',
    publicApproval: true,
    university: 'Cornell University',
    country: 'USA',
    course: 'Computer Science (College of Engineering)',
    classJoined: 'Class 9',
    classOf: '2025',
    curriculum: 'IBDP',
    schoolType: 'International School, Mumbai',
    academicPerformance: '42/45 Predicted IB · HL Math AA, Physics, CS',
    academicDirection: 'Computational Systems & Assistive Robotics',
    research:
      'Authored a 18-page research paper on low-latency computer vision algorithms for navigation in visually impaired environments under a PhD mentor.',
    internshipWork:
      'Summer engineering intern at an industrial robotics automation startup; built Python sensor calibration tools.',
    competitionsAwards:
      'USACO Gold Division qualifier; National Finalist in IRIS National Science Fair.',
    projects:
      'Designed an open-source ultrasonic wearable navigation aid tested with a local blind welfare association.',
    summerPrograms: 'University engineering summer seminar in Class 10',
    satPrepared: true,
    startingPoint:
      'Joined in Class 9 with strong mathematics grades and an interest in coding, but fragmented extracurriculars and no clear thematic thread.',
    applicationStrategy:
      'Connected theoretical algorithm research with tangible hardware deployment in assistive technology, positioning Cornell Engineering as the natural next step.',
    journeyNarrative:
      'Over three years, the student moved from recreational coding to structured inquiry. In Class 9, we audited his subject choices and introduced competitive programming. In Class 10, he prototyped a wearable navigation unit. By Class 11, he paired his SAT preparation with formal research mentorship in computer vision.',
  },
  {
    id: 'stu-02',
    displayName: 'Admitted Scholar',
    publicApproval: true,
    university: 'University of Pennsylvania',
    country: 'USA',
    course: 'Philosophy, Politics and Economics (PPE)',
    classJoined: 'Class 8',
    classOf: '2025',
    curriculum: 'IBDP',
    schoolType: 'Private Day School, New Delhi',
    academicPerformance: '43/45 Predicted IB · HL Economics, History, Math AA',
    academicDirection: 'Development Economics & Urban Public Policy',
    research:
      'Independent empirical study examining micro-credit repayment resilience among women-led informal enterprises across three peri-urban markets.',
    internshipWork:
      'Policy research intern at an economic policy think tank; compiled municipal sanitation budget briefs.',
    competitionsAwards:
      'John Locke Institute Essay Prize Shortlist (Economics); Best Delegate at Harvard MUN India.',
    projects:
      'Founded a student policy journal publishing 24 peer-reviewed high school essays on urban governance and financial literacy.',
    satPrepared: true,
    startingPoint:
      'Started in Class 8 as an avid debater and reader who wanted to understand how humanities and quantitative analysis intersect.',
    applicationStrategy:
      'Built an interdisciplinary narrative bridging field-based microeconomics with institutional policy design.',
    journeyNarrative:
      'Starting in Class 8 allowed the student to explore without pressure. She spent Class 8 and 9 reading foundational political economy and launching a school policy review. In Class 10, she designed field surveys for local vendors, culminating in a rigorous Class 11 research paper and a shortlisted John Locke essay.',
  },
  {
    id: 'stu-03',
    displayName: 'Admitted Scholar',
    publicApproval: true,
    university: 'Imperial College London',
    country: 'UK',
    course: 'MEng Aeronautical Engineering',
    classJoined: 'Class 10',
    classOf: '2025',
    curriculum: 'A-Levels',
    schoolType: 'Cambridge Curriculum School, Bengaluru',
    academicPerformance: '4 A* Predicted (Mathematics, Further Mathematics, Physics, Chemistry)',
    academicDirection: 'Fluid Dynamics & Sustainable Propulsion Architecture',
    research:
      'Computational fluid dynamics (CFD) analysis of blended-wing-body airfoil efficiency at subsonic speeds.',
    internshipWork:
      'Completed an engineering job simulation and a 4-week technical shadow placement at an aerospace component manufacturer.',
    competitionsAwards:
      'British Physics Olympiad (BPhO) Silver Award; Senior Mathematical Challenge Gold.',
    projects:
      'Designed and wind-tunnel tested 3D-printed winglet geometries using a custom laminar flow rig built in school lab.',
    satPrepared: false,
    startingPoint:
      'Joined in Class 10 aiming for UK engineering programs, needing super-curricular depth for UCAS personal statement and ESAT readiness.',
    applicationStrategy:
      'Focused entirely on mathematical rigor, experimental physics validation, and technical interview preparation for Imperial.',
    journeyNarrative:
      'UK admissions demand deep academic alignment with the chosen course. We guided the student to focus on Further Mathematics, enter the British Physics Olympiad, and conduct an independent CFD investigation that became the centerpiece of his Imperial personal statement and technical interview.',
  },
  {
    id: 'stu-04',
    displayName: 'Admitted Scholar',
    publicApproval: true,
    university: 'Brown University',
    country: 'USA',
    course: 'Cognitive Neuroscience',
    classJoined: 'Class 9',
    classOf: '2025',
    curriculum: 'ISC',
    schoolType: 'Cathedral & John Connon / ISC School, Mumbai',
    academicPerformance: '97.4% Class 10 ICSE · 96.5% Class 11 ISC (Biology, Chemistry, Psychology, Math)',
    academicDirection: 'Bilingual Language Acquisition & Neuroplasticity',
    research:
      'Literature and behavioural latency study on executive function switching in trilingual adolescents.',
    internshipWork:
      'Clinical observation and assessment assistant at a pediatric speech and neuro-rehabilitation clinic.',
    competitionsAwards:
      'International Brain Bee Regional Finalist; New York Academy of Sciences Junior Academy Member.',
    projects:
      'Created a vernacular early-screening picture workbook for childhood dyslexia indicators in Marathi and Hindi.',
    satPrepared: true,
    startingPoint:
      'Joined in Class 9 fascinated by both biology and linguistics, unsure whether to pursue medicine in India or neuroscience abroad.',
    applicationStrategy:
      'Demonstrated how Brown’s Open Curriculum uniquely supported her cross-disciplinary work across cognitive science, linguistics, and community health.',
    journeyNarrative:
      'In Class 9, the student explored both wet-lab biology and behavioural psychology. Discovering cognitive neuroscience gave her a clear North Star. She combined clinical shadowing at a speech centre with an original study on trilingual cognition.',
  },
  {
    id: 'stu-05',
    displayName: 'Admitted Scholar',
    publicApproval: true,
    university: 'National University of Singapore (NUS)',
    country: 'Singapore',
    course: 'Data Science and Economics (Cross-Disciplinary Programme)',
    classJoined: 'Class 10',
    classOf: '2025',
    curriculum: 'CBSE',
    schoolType: 'DPS R.K. Puram, New Delhi',
    academicPerformance: '98.2% Class 10 CBSE · 97.6% Class 12 Predicted (Math, Economics, Physics, Chemistry, English)',
    academicDirection: 'Econometric Modeling & Agricultural Supply Chains',
    research:
      'Time-series econometric analysis of monsoon rainfall variance and wholesale pulse price volatility in Northern India.',
    internshipWork:
      'Data analytics intern at an agri-fintech platform mapping cold-storage utilization rates.',
    competitionsAwards:
      'Indian National Mathematical Olympiad (INMO) camp nominee; Wharton Global High School Investment Competition Regional Semifinalist.',
    projects:
      'Built an interactive district-level crop price forecasting dashboard in R and Python.',
    satPrepared: true,
    startingPoint:
      'Joined in Class 10 with exceptional mathematics scores, seeking a quantitative degree in Asia and the UK.',
    applicationStrategy:
      'Combined top-percentile CBSE board preparation with quantitative economics research tailored for NUS’s XDP selection.',
    journeyNarrative:
      'For Singapore and UK applications, academic excellence is foundational. the student paired disciplined CBSE and SAT execution with applied econometric modeling on Indian agricultural markets.',
  },
  {
    id: 'stu-06',
    displayName: 'Admitted Scholar',
    publicApproval: true,
    university: 'UCL (University College London)',
    country: 'UK',
    course: 'BSc Architecture (The Bartlett)',
    classJoined: 'Class 9',
    classOf: '2024',
    curriculum: 'IBDP',
    schoolType: 'International School, Hyderabad',
    academicPerformance: '41/45 IB Diploma · HL Visual Arts, Physics, Math AA',
    academicDirection: 'Vernacular Passive Cooling & Sustainable Urban Housing',
    research:
      'Architectural case study comparing traditional lime-plaster courtyards with contemporary high-density concrete housing thermal performance.',
    internshipWork:
      '6-week studio apprenticeship at an ecological architecture practice documenting heritage restoration blueprints.',
    competitionsAwards:
      ' Sovereign Art Foundation Students Prize Shortlist; CTBUH International Student Design Honorable Mention.',
    projects:
      'Curated a 15-piece mixed-media spatial portfolio combining hand-drafted charcoal perspectives, timber structural models, and thermal studies.',
    satPrepared: false,
    startingPoint:
      'Joined in Class 9 with strong fine-art talent, needing technical physics grounding and architectural portfolio curation.',
    applicationStrategy:
      'Crafted a cohesive Bartlett portfolio rooted in Indian vernacular climate architecture rather than generic CAD renders.',
    journeyNarrative:
      'Architecture admissions at UCL hinge on portfolio originality and spatial thinking. Over three years, Zoya documented historic stepwells and courtyard homes, translating her sketches into physical basswood models and environmental studies.',
  },
  {
    id: 'stu-07',
    displayName: 'Admitted Scholar',
    publicApproval: true,
    university: 'University of Chicago',
    country: 'USA',
    course: 'Economics & Mathematics',
    classJoined: 'Class 10',
    classOf: '2025',
    curriculum: 'IBDP',
    schoolType: 'Oberoi International School, Mumbai',
    academicPerformance: '44/45 Predicted IB · HL Math AA, Economics, Further Math module',
    academicDirection: 'Game Theory, Mechanism Design & Public Goods Allocation',
    research:
      'Research paper modeling congestion pricing mechanisms and commuter elasticity in suburban rail networks.',
    internshipWork:
      'Quantitative research summer analyst simulation and urban transit data project.',
    competitionsAwards:
      'AMC 12 Distinction & AIME Qualifier; International Economics Olympiad (IEO) National Top 10.',
    projects:
      'Published an interactive simulation demonstrating Braess’s Paradox in urban traffic networks.',
    satPrepared: true,
    startingPoint:
      'Joined in Class 10 with deep love for pure mathematics and philosophical inquiry.',
    applicationStrategy:
      'Aligned his intellectual curiosity with UChicago’s Core curriculum and quantitative economics tradition through distinctive uncommon essays.',
    journeyNarrative:
      'The student thrived on abstract problems. We channelled his mathematical curiosity into mechanism design research and prepared intensively for UChicago’s intellectual essay prompts.',
  },
  {
    id: 'stu-08',
    displayName: 'Admitted Scholar',
    publicApproval: true,
    university: 'Technical University of Munich (TUM)',
    country: 'Germany',
    course: 'BSc Management and Technology',
    classJoined: 'Class 10',
    classOf: '2025',
    curriculum: 'IBDP',
    schoolType: 'Pathways World School, Gurugram',
    academicPerformance: '40/45 IB Diploma · HL Math AA, Physics, Economics',
    academicDirection: 'Industrial Decarbonization & Renewable Grid Storage',
    research:
      'Techno-economic assessment of second-life EV lithium-ion battery packs for solar microgrids.',
    internshipWork:
      'Operations & sustainability intern at an automotive tier-1 component supplier in Pune.',
    competitionsAwards:
      'Goethe-Zertifikat B2 Distinction; Conrad Challenge Energy & Environment Semifinalist.',
    projects:
      'Built a solar charge-controller telemetry prototype and led school campus energy audit.',
    satPrepared: true,
    startingPoint:
      'Joined in Class 10 specifically targeting European technical universities in Germany and the Netherlands.',
    applicationStrategy:
      'Combined IB HL subject compliance for German Abitur equivalence with early German language proficiency and industrial energy research.',
    journeyNarrative:
      'German university admissions require strict subject-combination compliance starting in Class 10. We ensured the student’s IB subjects met TUM equivalence while building his technical profile in clean energy.',
  },
  {
    id: 'stu-09',
    displayName: 'Admitted Scholar',
    publicApproval: false,
    university: 'Duke University',
    country: 'USA',
    course: 'Biomedical Engineering',
    classJoined: 'Class 9',
    classOf: '2025',
    curriculum: 'IBDP',
    schoolType: 'International School, Bengaluru',
    academicPerformance: '43/45 Predicted IB',
    academicDirection: 'Point-of-Care Diagnostics & Microfluidics',
    research: 'Paper-based microfluidic assay design for low-cost waterborne pathogen detection.',
    internshipWork: 'Biotech diagnostic laboratory summer intern.',
    competitionsAwards: 'Regeneron ISEF Regional Finalist; iGEM High School Silver Medal.',
    projects: 'Designed a 3D-printed smartphone colorimetry attachment for rural clinic test strips.',
    satPrepared: true,
    applicationStrategy: 'Interdisciplinary biomedical engineering focus combining wet-lab research with low-cost device prototyping.',
  },
  {
    id: 'stu-10',
    displayName: 'Admitted Scholar',
    publicApproval: false,
    university: 'University of Cambridge',
    country: 'UK',
    course: 'BA Economics',
    classJoined: 'Class 10',
    classOf: '2024',
    curriculum: 'A-Levels',
    schoolType: 'International School, Mumbai',
    academicPerformance: '4 A* Achieved',
    academicDirection: 'Macroeconomic Policy & Sovereign Debt Markets',
    research: 'Comparative paper on central bank digital currencies and monetary transmission.',
    competitionsAwards: 'Marshall Society Essay Competition Shortlist; TMUA Top Decile.',
    satPrepared: false,
    applicationStrategy: 'Intensive TMUA preparation, reading-led academic exploration, and mock supervision interviews.',
  },
  {
    id: 'stu-11',
    displayName: 'Admitted Scholar',
    publicApproval: true,
    university: 'University of Michigan',
    country: 'USA',
    course: 'BBA (Ross School of Business)',
    classJoined: 'Class 9',
    classOf: '2025',
    curriculum: 'CBSE',
    schoolType: 'Modern School, New Delhi',
    academicPerformance: '96.8% CBSE Class 10 · 96.0% Predicted Class 12',
    academicDirection: 'Supply Chain Strategy & Consumer Ventures',
    research: 'Case study on direct-to-consumer cold-chain logistics for artisanal dairy cooperatives.',
    internshipWork: 'Commercial operations intern at a regional logistics aggregator.',
    competitionsAwards: 'DECA International Career Development Finalist; Diamond Challenge Semifinalist.',
    projects: 'Co-founded a zero-waste school textbook and lab-equipment recirculation marketplace across 6 schools.',
    satPrepared: true,
    startingPoint: 'Joined in Class 9 interested in entrepreneurship, needing structured business fundamentals and quantifiable impact.',
    applicationStrategy: 'Built a real operational venture alongside supply chain research tailored for Ross Action-Based Learning.',
    journeyNarrative: 'Instead of a superficial school club, the student built a functional book-recirculation supply chain serving 1,400 students, documenting unit economics and logistics lessons for his Ross portfolio.',
  },
  {
    id: 'stu-12',
    displayName: 'Admitted Scholar',
    publicApproval: true,
    university: 'London School of Economics (LSE)',
    country: 'UK',
    course: 'BSc Politics and International Relations',
    classJoined: 'Class 10',
    classOf: '2025',
    curriculum: 'ISC',
    schoolType: 'La Martiniere, Kolkata',
    academicPerformance: '98.0% ICSE · 97.2% ISC Predicted',
    academicDirection: 'Maritime Geopolitics & Indo-Pacific Trade Corridors',
    research: 'Research paper analyzing port infrastructure treaties in the Indian Ocean Region.',
    internshipWork: 'Editorial & archival intern at a foreign affairs research foundation.',
    competitionsAwards: 'Trinity College Cambridge Robson History Prize Commendation.',
    projects: 'Archived oral histories of 35 cross-border river trade families in Eastern India.',
    satPrepared: false,
    startingPoint: 'Joined in Class 10 with deep interest in history and world affairs, aiming for LSE and King’s College London.',
    applicationStrategy: 'Anchored her UCAS personal statement in primary archival research and contemporary Indo-Pacific scholarship.',
    journeyNarrative: 'LSE looks for independent analytical maturity. Tara moved beyond MUNs into serious primary-source research on maritime trade policy and regional historiography.',
  },
  {
    id: 'stu-13',
    displayName: 'Admitted Scholar',
    publicApproval: false,
    university: 'University of Toronto',
    country: 'Canada',
    course: 'Rotman Commerce',
    classJoined: 'Class 11',
    classOf: '2025',
    curriculum: 'CBSE',
    schoolType: 'Senior Secondary School, Chandigarh',
    academicPerformance: '95.4% CBSE',
    academicDirection: 'Financial Markets & Sustainable Investing',
    research: 'Analysis of ESG disclosure compliance across mid-cap manufacturing firms.',
    internshipWork: 'Summer equity research shadow program.',
    satPrepared: true,
    applicationStrategy: 'Focused on Rotman supplemental video interview readiness and quantitative coursework.',
  },
  {
    id: 'stu-14',
    displayName: 'Admitted Scholar',
    publicApproval: false,
    university: 'HKUST',
    country: 'Hong Kong',
    course: 'BSc Quantitative Finance',
    classJoined: 'Class 10',
    classOf: '2025',
    curriculum: 'IBDP',
    schoolType: 'International School, Pune',
    academicPerformance: '42/45 IBDP',
    academicDirection: 'Stochastic Modeling & Algorithmic Risk',
    research: 'Monte Carlo option pricing simulation paper in Python.',
    competitionsAwards: 'Cayley & Fermat Mathematics Contests Top 5%.',
    satPrepared: true,
    applicationStrategy: 'Positioned strong HL Mathematics AA and computational finance projects for Hong Kong admissions.',
  },
  {
    id: 'stu-15',
    displayName: 'Admitted Scholar',
    publicApproval: false,
    university: 'University of Melbourne',
    country: 'Australia',
    course: 'Bachelor of Commerce (Actuarial Studies pathway)',
    classJoined: 'Class 11',
    classOf: '2024',
    curriculum: 'ISC',
    schoolType: 'Private School, Chennai',
    academicPerformance: '96.2% ISC',
    academicDirection: 'Actuarial Science & Climate Risk Insurance',
    research: 'Statistical paper on coastal flood insurance modeling in Tamil Nadu.',
    satPrepared: false,
    applicationStrategy: 'Direct academic and quantitative alignment with Australian Group of Eight requirements.',
  },
  {
    id: 'stu-16',
    displayName: 'Admitted Scholar',
    publicApproval: true,
    university: 'New York University (NYU)',
    country: 'USA',
    course: 'BS Finance & Data Science (Stern)',
    classJoined: 'Class 9',
    classOf: '2025',
    curriculum: 'IBDP',
    schoolType: 'Dhirubhai Ambani / IB School, Mumbai',
    academicPerformance: '42/45 Predicted IB',
    academicDirection: 'Fintech Credit Scoring & Behavioral Economics',
    research: 'Study on UPI digital payment adoption and savings behavior among first-generation gig workers.',
    internshipWork: 'Product analytics intern at a Mumbai payments startup.',
    competitionsAwards: 'National Economics Olympiad Finalist.',
    projects: 'Built a bilingual financial literacy WhatsApp micro-course completed by 600+ delivery partners.',
    satPrepared: true,
    startingPoint: 'Joined in Class 9 wanting to combine computer science with finance.',
    applicationStrategy: 'Connected behavioral finance field data with practical product analytics experience.',
    journeyNarrative: 'Vivaan combined quantitative rigor in Math HL and SAT with field research on India’s digital payments ecosystem.',
  },
  {
    id: 'stu-17',
    displayName: 'Admitted Scholar',
    publicApproval: false,
    university: 'University of Edinburgh',
    country: 'UK',
    course: 'BSc Artificial Intelligence and Computer Science',
    classJoined: 'Class 10',
    classOf: '2025',
    curriculum: 'A-Levels',
    schoolType: 'International School, Noida',
    academicPerformance: '3 A* 1 A Predicted',
    academicDirection: 'Natural Language Processing for Low-Resource Languages',
    research: 'Tokenizer efficiency evaluation across Indic script corpora.',
    satPrepared: false,
    applicationStrategy: 'Super-curricular focus on computational linguistics and discrete mathematics.',
  },
  {
    id: 'stu-18',
    displayName: 'Admitted Scholar',
    publicApproval: false,
    university: 'University of Washington',
    country: 'USA',
    course: 'Computer Science (Paul G. Allen School)',
    classJoined: 'Class 10',
    classOf: '2025',
    curriculum: 'CBSE',
    schoolType: 'Public School, Bengaluru',
    academicPerformance: '97.0% CBSE',
    academicDirection: 'Distributed Systems & Edge Computing',
    projects: 'Developed an offline-first mesh network classroom server for rural schools.',
    satPrepared: true,
    applicationStrategy: 'Highlighted systems engineering projects and sustained open-source contributions.',
  },
  {
    id: 'stu-19',
    displayName: 'Admitted Scholar',
    publicApproval: false,
    university: "King's College London",
    country: 'UK',
    course: 'BSc Psychology',
    classJoined: 'Class 11',
    classOf: '2025',
    curriculum: 'IBDP',
    schoolType: 'IB World School, Mumbai',
    academicPerformance: '40/45 Predicted IB',
    academicDirection: 'Adolescent Sleep Chronobiology & Cognitive Recall',
    research: 'Empirical study on circadian phase shifts and academic memory retention.',
    satPrepared: false,
    applicationStrategy: 'Research-led UCAS personal statement emphasizing experimental design and statistical literacy.',
  },
  {
    id: 'stu-20',
    displayName: 'Admitted Scholar',
    publicApproval: false,
    university: 'Purdue University',
    country: 'USA',
    course: 'Aerospace Engineering',
    classJoined: 'Class 9',
    classOf: '2025',
    curriculum: 'CBSE',
    schoolType: 'Private School, Hyderabad',
    academicPerformance: '96.4% CBSE',
    academicDirection: 'Solid Rocket Propulsion & Avionics Telemetry',
    projects: 'Built dual-deploy model rocket avionics bay with custom altimeter PCB.',
    satPrepared: true,
    applicationStrategy: 'Early action engineering strategy backed by hands-on propulsion and telemetry builds.',
  },
  {
    id: 'stu-21',
    displayName: 'Admitted Scholar',
    publicApproval: false,
    university: 'University of British Columbia (UBC)',
    country: 'Canada',
    course: 'BSc Applied Biology & Environmental Sciences',
    classJoined: 'Class 10',
    classOf: '2025',
    curriculum: 'IBDP',
    schoolType: 'International School, Dehradun',
    academicPerformance: '39/45 IBDP',
    academicDirection: 'Urban Wetland Biodiversity & Phytoremediation',
    research: 'Field water-quality monitoring of lake restoration zones.',
    satPrepared: false,
    applicationStrategy: 'Connected long-term ecological fieldwork with UBC’s sustainability research clusters.',
  },
  {
    id: 'stu-22',
    displayName: 'Admitted Scholar',
    publicApproval: false,
    university: 'ESSEC Business School',
    country: 'Europe',
    course: 'Global BBA',
    classJoined: 'Class 11',
    classOf: '2025',
    curriculum: 'IBDP',
    schoolType: 'International School, Gurugram',
    academicPerformance: '39/45 Predicted IB',
    academicDirection: 'International Luxury Brand Management & Circular Textiles',
    internshipWork: 'Summer merchandising intern at a sustainable handloom export house.',
    satPrepared: true,
    applicationStrategy: 'Cross-cultural business narrative across France and Singapore campuses.',
  },
  {
    id: 'stu-23',
    displayName: 'Admitted Scholar',
    publicApproval: false,
    university: 'Singapore Management University (SMU)',
    country: 'Singapore',
    course: 'BSc Quantitative Economics',
    classJoined: 'Class 10',
    classOf: '2025',
    curriculum: 'ISC',
    schoolType: 'Private School, Mumbai',
    academicPerformance: '97.0% ISC',
    academicDirection: 'Trade Policy & ASEAN-India Supply Chain Integration',
    satPrepared: true,
    applicationStrategy: 'Prepared for SMU seminar-style interview and quantitative aptitude requirements.',
  },
  {
    id: 'stu-24',
    displayName: 'Admitted Scholar',
    publicApproval: false,
    university: 'University of Sydney',
    country: 'Australia',
    course: 'Bachelor of Advanced Computing',
    classJoined: 'Class 11',
    classOf: '2024',
    curriculum: 'CBSE',
    schoolType: 'Senior Secondary School, Pune',
    academicPerformance: '95.8% CBSE',
    academicDirection: 'Cybersecurity & Cryptographic Protocols',
    satPrepared: true,
    applicationStrategy: 'Focused on algorithmic problem solving and software security projects.',
  },
  {
    id: 'stu-25',
    displayName: 'Admitted Scholar',
    publicApproval: false,
    university: 'McGill University',
    country: 'Canada',
    course: 'BEng Software Engineering',
    classJoined: 'Class 10',
    classOf: '2025',
    curriculum: 'A-Levels',
    schoolType: 'Cambridge School, Mumbai',
    academicPerformance: '3 A* Predicted',
    academicDirection: 'Medical Imaging Software & Neural Rendering',
    satPrepared: true,
    applicationStrategy: 'High-grade A-Level STEM profile paired with biomedical imaging code repository.',
  },
  {
    id: 'stu-26',
    displayName: 'Admitted Scholar',
    publicApproval: false,
    university: 'Heidelberg University',
    country: 'Germany',
    course: 'BSc Molecular Biotechnology',
    classJoined: 'Class 9',
    classOf: '2024',
    curriculum: 'IBDP',
    schoolType: 'IB School, Bengaluru',
    academicPerformance: '41/45 IBDP',
    academicDirection: 'CRISPR Gene Editing & Cellular Therapeutics',
    research: 'Bioinformatics sequence alignment study on plant drought-resistance genes.',
    satPrepared: false,
    applicationStrategy: 'Multi-year German language track (TestDaF) alongside molecular biology research.',
  },
];

import { SHEET_STUDENTS_DATA, SheetStudentAdmissionRecord } from './studentsData';
export { SHEET_STUDENTS_DATA };
export type { SheetStudentAdmissionRecord };

export interface CounsellorProfile {
  id: string;
  name: string;
  role: string;
  experience: string;
  certifications: string[];
  specialisation: string;
  countries: DestinationCountry[];
  philosophy: string;
  bio: string;
}

export const COUNSELLORS_DATA: CounsellorProfile[] = [
  {
    id: 'coun-1',
    name: 'Manika P',
    role: 'Senior Admissions Counsellor & Undergraduate Strategist',
    experience: '10+ Years in International Admissions Advisory',
    certifications: [
      'UCLA Extension Certificate in College Counseling',
      'Certified International Educational Planner',
    ],
    specialisation: 'US Holistic Admissions, Ivy League & Top 20 Universities, Multi-Year Profile Architecture',
    countries: ['USA', 'Canada', 'Singapore'],
    philosophy:
      'Every student has an authentic narrative waiting to be discovered. Our role is to build the structure, intellectual depth, and clarity that allows that narrative to emerge naturally over time.',
    bio: 'Manika has guided ambitious students from Class 8 onwards across subject selection, competitive profile building, independent research, and admissions strategy for leading American and global institutions.',
  },
  {
    id: 'coun-2',
    name: 'Palak S',
    role: 'Senior Admissions Counsellor & Academic Direction Advisor',
    experience: '10+ Years in International University Advisory',
    certifications: [
      'British Council Certified UK Education Advisor',
      'Certified Career & Admissions Strategist',
    ],
    specialisation: 'UK (Oxbridge, Russell Group), Singapore, Hong Kong & European University Admissions',
    countries: ['UK', 'Europe', 'Hong Kong', 'Australia'],
    philosophy:
      'Super-curricular engagement is not about quantity; it is about how deeply and rigorously a student explores their chosen academic field before day one of university.',
    bio: 'Palak specialises in course-focused international admissions, working with students on academic alignment, admissions assessments, super-curricular writing, and tailored international roadmaps.',
  },
  {
    id: 'coun-3',
    name: 'Rucha Tawde',
    role: 'Senior Admissions Counsellor & Global Placements Specialist',
    experience: '8+ Years of International Counselling Experience',
    certifications: [
      'Certified by a Leading British Counselling Organisation',
      '100+ Students Successfully Placed Worldwide',
    ],
    specialisation: 'International Undergraduate Strategy, UK, Canada, Australia & European Admissions',
    countries: ['UK', 'Canada', 'Australia', 'Europe', 'USA'],
    philosophy:
      'Guiding students to discover their authentic academic direction and translating ambition into successful global university admissions with structured, personalised mentorship.',
    bio: 'Rucha brings over 8 years of international counselling experience and is certified by a leading British counselling organisation, having successfully placed 100+ students across top global universities.',
  },
];

export const COUNSELLORS_EXPANSION_NOTE = {
  lead: '+',
  title: 'And many more',
  description:
    'A growing team of certified specialists across US, UK, Canada, Australia & European admissions.',
};

export interface MentorProfile {
  id: string;
  name: string;
  university: string;
  country: DestinationCountry;
  course: string;
  background: string;
  helpsUnderstand: string[];
  verifiedAffiliation: string;
}

export const UNIVERSITY_MENTORS_DATA: MentorProfile[] = [
  {
    id: 'men-1',
    name: 'Economics & Behavioral Science Scholar',
    university: 'University of Pennsylvania',
    country: 'USA',
    course: 'Economics & Behavioral Science',
    background:
      'Completed the IB Diploma in Mumbai before matriculating at UPenn; active in undergraduate economic policy research and campus consulting.',
    helpsUnderstand: [
      'How interdisciplinary coursework across Wharton and the College works in practice',
      'What UPenn’s academic pace and collaborative campus culture truly feel like',
      'How to articulate genuine community impact in university-specific essays',
    ],
    verifiedAffiliation: 'University of Pennsylvania · Undergraduate Scholar',
  },
  {
    id: 'men-2',
    name: 'Computer Science & Engineering Scholar',
    university: 'Cornell University',
    country: 'USA',
    course: 'Computer Science & Electrical Engineering',
    background:
      'Graduated from a CBSE school in Bengaluru; leads autonomous robotics project teams and undergraduate engineering labs in Ithaca.',
    helpsUnderstand: [
      'Transitioning from Indian board mathematics to US engineering problem sets',
      'Joining undergraduate project teams and research labs as a first-year student',
      'What engineering students wish they had built in Class 10 and 11',
    ],
    verifiedAffiliation: 'Cornell University · College of Engineering',
  },
  {
    id: 'men-3',
    name: 'Applied Mathematics–Economics Scholar',
    university: 'Brown University',
    country: 'USA',
    course: 'Applied Mathematics–Economics & Literary Arts',
    background:
      'Designed an independent study path through Brown’s Open Curriculum after completing A-Levels in New Delhi.',
    helpsUnderstand: [
      'Navigating the intellectual freedom and responsibility of the Open Curriculum',
      'Combining quantitative majors with humanities electives without losing depth',
      'Finding faculty mentors and undergraduate research assistantships early',
    ],
    verifiedAffiliation: 'Brown University · Undergraduate Mentor',
  },
  {
    id: 'men-4',
    name: 'Industrial Engineering & Operations Scholar',
    university: 'Northwestern University',
    country: 'USA',
    course: 'Industrial Engineering & Kellogg Certificate',
    background:
      'Joined Northwestern from an IB school in Gurugram; experienced in quarter-system academics and corporate internships.',
    helpsUnderstand: [
      'How the fast-paced quarter system enables multi-disciplinary combinations',
      'Recruiting timelines for summer internships in the US',
      'Balancing technical coursework with campus leadership',
    ],
    verifiedAffiliation: 'Northwestern University · McCormick School of Engineering',
  },
  {
    id: 'men-5',
    name: 'Quantitative Economics Scholar',
    university: 'London School of Economics (LSE)',
    country: 'UK',
    course: 'BSc Economics',
    background:
      'Completed ISC in Kolkata with 98% before moving to London; active in LSE SU Economics Society and policy briefings.',
    helpsUnderstand: [
      'The independent study culture of UK universities compared to school classrooms',
      'Living and studying in central London as an international undergraduate',
      'How first-year spring weeks and internships work in the UK financial sector',
    ],
    verifiedAffiliation: 'London School of Economics and Political Science',
  },
  {
    id: 'men-6',
    name: 'International Relations & Policy Scholar',
    university: 'University of Edinburgh',
    country: 'UK',
    course: 'MA (Hons) International Relations & Economics',
    background:
      'Studied within the four-year Scottish degree structure, combining honours seminars with parliamentary policy research.',
    helpsUnderstand: [
      'The difference between the 4-year Scottish MA and 3-year English BA/BSc degrees',
      'Academic writing expectations and tutorial discussions in the UK',
      'Student societies, housing, and community life in Edinburgh',
    ],
    verifiedAffiliation: 'University of Edinburgh · College of Arts, Humanities & Social Sciences',
  },
  {
    id: 'men-7',
    name: 'Computer Science & Technology Scholar',
    university: 'King’s College London (KCL)',
    country: 'UK',
    course: 'BSc Computer Science with Management',
    background:
      'Transitioned from CBSE to Strand Campus in London, focusing on software engineering and technology entrepreneurship.',
    helpsUnderstand: [
      'How London universities connect students with technology ecosystems',
      'Managing coursework, lab assessments, and independent projects',
      'Practical realities of settling into UK university life',
    ],
    verifiedAffiliation: "King's College London · Faculty of Natural, Mathematical & Engineering Sciences",
  },
  {
    id: 'men-8',
    name: 'Cognitive Science & Data Theory Scholar',
    university: 'UCLA',
    country: 'USA',
    course: 'Cognitive Science & Data Theory',
    background:
      'Matriculated at UCLA after IBDP in Mumbai; works in an undergraduate computational cognition lab.',
    helpsUnderstand: [
      'How to thrive and stand out at a large, world-class public research university',
      'Securing laboratory positions and faculty mentorship at UC campuses',
      'Campus life, residential communities, and academic advising in California',
    ],
    verifiedAffiliation: 'University of California, Los Angeles (UCLA)',
  },
  {
    id: 'men-9',
    name: 'Quantitative Economics & Business Scholar',
    university: 'Singapore Management University (SMU) & ESSEC',
    country: 'Singapore',
    course: 'Quantitative Economics & Global Business',
    background:
      'Experienced both Singapore’s seminar-based city campus environment and European business school exchange modules.',
    helpsUnderstand: [
      'Interactive seminar pedagogy and project-based grading in Singapore',
      'Career readiness and industry integration in Asian financial hubs',
      'Comparing business and economics pathways across Singapore and Europe',
    ],
    verifiedAffiliation: 'SMU · School of Economics / ESSEC Exchange',
  },
  {
    id: 'men-10',
    name: 'Molecular Biosciences Scholar',
    university: 'Heidelberg University & Humboldt University',
    country: 'Germany',
    course: 'Molecular Biosciences & Quantitative Economics Collaboration',
    background:
      'Advises prospective international students on German research traditions, language transition, and laboratory structures.',
    helpsUnderstand: [
      'How German universities structure lectures, seminars, and research institutes',
      'Why self-direction and language readiness matter for life in Germany',
      'Working in Max Planck and university partner laboratories as an undergraduate',
    ],
    verifiedAffiliation: 'Heidelberg University / Humboldt Berlin Mentor Network',
  },
  {
    id: 'men-11',
    name: 'Commerce & Advanced Studies Scholar',
    university: 'University of Sydney',
    country: 'Australia',
    course: 'Bachelor of Commerce & Advanced Studies',
    background:
      'Moved from Chennai to Sydney; involved in student senate and Asia-Pacific economic consulting projects.',
    helpsUnderstand: [
      'How Australian degree flexibility allows combining commerce with data or policy',
      'Southern Hemisphere academic calendars and internship cycles',
      'Campus integration and international student support in Australia',
    ],
    verifiedAffiliation: 'University of Sydney · Business School',
  },
];

export type JournalCategory =
  | 'All'
  | 'Admissions'
  | 'University Intelligence'
  | 'Parent Guides'
  | 'Student Guides'
  | 'Class 8–10'
  | 'Class 11–12'
  | 'SAT'
  | 'Research'
  | 'Profile Building';

export const JOURNAL_CATEGORIES: JournalCategory[] = [
  'All',
  'Admissions',
  'University Intelligence',
  'Parent Guides',
  'Student Guides',
  'Class 8–10',
  'Class 11–12',
  'SAT',
  'Research',
  'Profile Building',
];

export interface JournalArticle {
  id: string;
  title: string;
  subtitle: string;
  category: Exclude<JournalCategory, 'All'>;
  readTime: string;
  date: string;
  author: string;
  authorRole: string;
  featured?: boolean;
  excerpt: string;
  keyTakeaways: string[];
  bodyParagraphs: string[];
}

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'art-1',
    title: 'Why Class 8 and 9 Are the Quietly Decisive Years in International Admissions',
    subtitle:
      'Long before essays are drafted in Class 12, a student’s subject choices, reading habits, and early intellectual experiments determine which university doors remain open.',
    category: 'Class 8–10',
    readTime: '6 min read',
    date: 'October 2026',
    author: 'Manika P',
    authorRole: 'Senior Admissions Counsellor',
    featured: true,
    excerpt:
      'When families begin thinking about university only in Class 11, they are forced into reactive decisions. Starting in Class 8 or 9 is not about pressure—it is about giving curiosity time to mature into depth.',
    keyTakeaways: [
      'Early preparation removes panic and prevents artificial resume-stuffing in Class 11.',
      'Subject choices at the end of Class 8 and Class 10 directly govern eligibility for UK, German, and Singaporean degrees.',
      'Genuine intellectual identity requires time for trial, error, and sustained reflection.',
    ],
    bodyParagraphs: [
      'During admissions season every autumn, families often ask the same question: what can my child add to their profile in the next four months to stand out? The honest answer is that selective admissions readers can immediately distinguish between a four-month sprint and a three-year intellectual journey.',
      'Starting in Class 8 or Class 9 does not mean turning a thirteen-year-old’s life into a college application checklist. In fact, it achieves the opposite. When a student has four years ahead of them, they have the luxury to explore an interest in robotics, realize they prefer mathematical economics, read widely, and build one or two thoughtful projects at a calm, sustainable pace.',
      'Consider how different international systems evaluate applicants. In the United Kingdom and Singapore, admissions tutors look for deep super-curricular engagement and strict subject prerequisites. In the United States, holistic admissions committees look for longitudinal commitment and intellectual vitality. Both require decisions made in Class 9 and Class 10.',
      'By working backwards from potential destinations early, families avoid the two most common regrets in Class 12: discovering that a chosen subject combination closes off a target course, or trying to cram SAT preparation, research, and school board exams into a single exhausting semester.',
    ],
  },
  {
    id: 'art-2',
    title: 'A Parent’s Framework for Choosing Between the US, UK, Singapore, and Europe',
    subtitle:
      'Each international higher education system is built on a distinct philosophy of undergraduate learning. Understanding the structural difference comes before shortlisting names.',
    category: 'Parent Guides',
    readTime: '7 min read',
    date: 'September 2026',
    author: 'Palak S',
    authorRole: 'Senior Admissions Counsellor',
    excerpt:
      'Should your child apply to a four-year American liberal arts and engineering system, a focused three-year British degree, or an Asian or European technical institution? Here is how to evaluate fit.',
    keyTakeaways: [
      'The US system rewards breadth coupled with a strong thematic spike; the UK rewards deep, vertical readiness in a single subject.',
      'Singapore and Hong Kong combine rigorous quantitative standards with strong Asian industry integration.',
      'Multi-country applications succeed only when the underlying academic narrative is unified.',
    ],
    bodyParagraphs: [
      'Many families begin their university search with rankings tables. Yet a student who thrives in Brown’s Open Curriculum or UPenn’s interdisciplinary programs may have a very different learning style from one suited to Imperial College London or Technical University of Munich.',
      'In the United Kingdom, students apply to a specific course—Economics, Computing, Law, or Natural Sciences—from day one. The UCAS personal statement and admissions assessments test whether the student already reads and thinks like a novice scholar in that field.',
      'In the United States, universities admit students into a broader academic community. While engineering and business schools still expect strong quantitative evidence, admissions officers also weigh how a student’s projects, leadership, and personal perspective will contribute to campus seminars and laboratories.',
      'When families apply across both the US and the UK—or include Singapore and Canada—the strategy must be harmonised early so the student builds core academic projects that satisfy both British academic rigor and American holistic depth.',
    ],
  },
  {
    id: 'art-3',
    title: 'When High School Research Makes Sense—And How to Do It With Integrity',
    subtitle:
      'Admissions committees value authentic inquiry, not vanity publications. What matters is the quality of the question, the methodology, and what the student actually learned.',
    category: 'Research',
    readTime: '5 min read',
    date: 'September 2026',
    author: 'Dr. Rohini Deshmukh',
    authorRole: 'Director of Research Mentorship',
    excerpt:
      'Independent research can be one of the most transformative experiences for a high school student—provided it stems from genuine curiosity rather than a transactional pursuit of a line on a resume.',
    keyTakeaways: [
      'A narrow, testable question beats a grandiose topic every time.',
      'Universities care whether the student can explain their methodology, limitations, and data in their own words.',
      'Research mentorship is about learning how scholars think, not guaranteeing journal placement.',
    ],
    bodyParagraphs: [
      'Over the past five years, undergraduate admissions offices have seen a sharp rise in applicants listing research papers. As a result, admissions readers—and faculty interviewers—look much closer at the substance behind the title.',
      'When a student claims to have solved a massive macro-level problem in six weeks, experienced evaluators grow sceptical. Conversely, when a Class 10 or 11 student investigates a focused, well-scoped question—such as analyzing commuter elasticity on a local rail corridor or testing laminar flow across 3D-printed winglet geometries—the authenticity is unmistakable.',
      'At Uppseekers, our research mentorship process begins with literature literacy. Students learn how to read primary papers, identify a manageable gap, select an appropriate methodology, and document both their findings and their limitations honestly.',
    ],
  },
  {
    id: 'art-4',
    title: 'Build a Stronger Profile, Not a Longer Resume: The Myth of the Well-Rounded Checklist',
    subtitle:
      'Why twelve disconnected school clubs carry less weight than two years of sustained, thoughtful work around a real problem.',
    category: 'Profile Building',
    readTime: '5 min read',
    date: 'August 2026',
    author: 'Manika P',
    authorRole: 'Senior Admissions Counsellor',
    excerpt:
      'Parents often worry that their child isn’t doing enough activities. In reality, most ambitious students are doing too many disconnected things and not going deep enough in any of them.',
    keyTakeaways: [
      'Audit current commitments ruthlessly: drop activities performed solely for attendance certificates.',
      'Progression over time—from participant in Class 9 to builder and researcher in Class 11—creates credibility.',
      'A great profile feels unmistakably like the individual student.',
    ],
    bodyParagraphs: [
      'If you look at the Common Application activity list, there are ten slots. A common misconception is that filling all ten slots with a debate club, a charity bake sale, a grade-level sport, and three short online certificates creates a compelling profile.',
      'In practice, admissions officers spend only minutes reading an application file. What stays in their mind is coherence: a clear thread connecting what the student studies in school, what they read on their own, the project they built over eighteen months, and the questions they want to explore at university.',
      'Profile building is therefore an act of editing as much as addition. We help students replace scattered busywork with deliberate projects, relevant competitions, and real-world exposure that deepen their understanding.',
    ],
  },
  {
    id: 'art-5',
    title: 'Timing the SAT: How to Prepare Once, Deliberately, Before Class 12 Begins',
    subtitle:
      'Integrating diagnostic testing and structured practice into Class 10 and 11 so senior year remains free for applications and school boards.',
    category: 'SAT',
    readTime: '4 min read',
    date: 'August 2026',
    author: 'Manika P',
    authorRole: 'Senior Admissions Counsellor',
    excerpt:
      'The biggest mistake in SAT preparation is treating it as an isolated coaching track that drags on through Class 12. Here is how to plan a clean, finite testing timeline.',
    keyTakeaways: [
      'Take a baseline diagnostic in late Class 10 to map the exact gap between current fundamentals and target percentiles.',
      'Complete primary SAT sittings between Class 11 mid-year and the summer before Class 12.',
      'Pair live instruction with disciplined error-log review rather than mindless mock repetition.',
    ],
    bodyParagraphs: [
      'With leading universities across the United States and global institutions in Singapore, Hong Kong, and Europe valuing strong standardized test evidence, the Digital SAT plays a clear strategic role in a student’s academic profile.',
      'However, when students delay SAT preparation until late Class 11 or Class 12, testing collides directly with internal assessments, Extended Essays, predicted grade exams, and university essay drafting.',
      'Our approach treats SAT preparation as an integrated phase of the overall roadmap: establish a diagnostic baseline, build verbal and quantitative precision through structured live classes and targeted practice, review mock performance analytically, and complete testing on schedule.',
    ],
  },
  {
    id: 'art-6',
    title: 'What Admissions Officers Look For in Class 11–12 Application Strategy',
    subtitle:
      'How course selection, Early Decision vs Regular Decision timing, and essay architecture come together in the final eighteen months.',
    category: 'Class 11–12',
    readTime: '6 min read',
    date: 'July 2026',
    author: 'Palak S',
    authorRole: 'Senior Admissions Counsellor',
    excerpt:
      'By Class 11, the focus shifts from broad exploration to strategic positioning: calibrating the university shortlist, structuring evidence, and articulating the student’s voice.',
    keyTakeaways: [
      'A balanced shortlist combines ambitious reach institutions with strong-fit target and foundational options across geographies.',
      'Every supplemental essay must answer why this specific department and curriculum match the student’s prior work.',
      'Letters of recommendation are strongest when teachers can point to specific classroom intellectual contributions.',
    ],
    bodyParagraphs: [
      'When a student enters Class 11, the foundational building blocks—academic trajectory, core interests, and initial projects—are taking shape. Now, strategic precision becomes paramount.',
      'First comes course and country calibration. Even subtle distinctions—such as applying to Computer Science in an Engineering faculty versus a College of Arts and Sciences, or choosing between Economics and Management in the UK—carry very different admissions expectations.',
      'Second is narrative synthesis. Across the personal statement, supplemental essays, activity descriptions, and interview conversations, every piece of the application should fit together effortlessly, presenting a thoughtful young scholar ready for university life.',
    ],
  },
];
