/**
 * Togetherly Product Configuration & Commercial Architecture
 *
 * Central source of truth for Togetherly products, pricing, URLs, and metadata.
 * Note on security: The paid Google Sheets `/copy` link MUST NEVER be exposed
 * in this client bundle. Digital fulfillment will be handled securely by
 * Lemon Squeezy via post-purchase email delivery and thank-you redirect.
 */

export interface TogetherlySheetTab {
  id: string;
  name: string;
  tabLabel: string;
  title: string;
  badge: string;
  summary: string;
  bullets: string[];
  screenshot: string;
  ratio: string;
}

export interface TogetherlyProduct {
  id: string;
  name: string;
  slug: string;
  badge: string;
  version: string;
  headline: string;
  subheadline: string;
  format: string;
  softwareRequirement: string;
  pricing: {
    amount: number;
    currency: string;
    formatted: string;
    originalAmount?: number;
    billingType: 'one-time';
    periodNotice: string;
  };
  /** Safe, public view-only Google Sheets demo URL (empty string if not yet configured) */
  demoUrl: string;
  /**
   * Lemon Squeezy checkout URL for live purchases.
   * Can be configured via environment variable `VITE_LEMON_SQUEEZY_CHECKOUT_URL`.
   */
  lemonSqueezyCheckoutUrl: string;
  supportEmail: string;
  guaranteeText: string;
  deliveryTime: string;
  deliverables: string[];
  tabs: TogetherlySheetTab[];
  faqs: Array<{ question: string; answer: string }>;
}

export const TOGETHERLY_GOOGLE_SHEET_COPY_URL =
  'https://docs.google.com/spreadsheets/d/15Fptl5AWT87VDLxvdYFJfkc0MY2YohCqRE-rX9dF0xw/copy';

export const couplesMoneyPlanner: TogetherlyProduct = {
  id: 'couples-money-planner',
  name: 'Togetherly — Couples Money Planner',
  slug: 'couples-money-planner',
  badge: 'Flagship Digital System',
  version: '2026 Edition (v2.0)',
  headline: 'Money made simpler, life more together.',
  subheadline:
    'A calm, beautifully crafted Google Sheets financial planning system for modern couples. Track shared living costs, balance fair contributions without awkward math, and build your shared future with complete peace of mind.',
  format: 'Digital Google Sheets Spreadsheet',
  softwareRequirement: '100% Free Google Account (Google Sheets)',
  pricing: {
    amount: 19,
    currency: 'USD',
    formatted: '$19',
    billingType: 'one-time',
    periodNotice: 'One-time purchase • Yours forever • No recurring fees',
  },
  // All buttons lead to official Google Sheet copy link for product explanation & gateway verification
  demoUrl: TOGETHERLY_GOOGLE_SHEET_COPY_URL,
  lemonSqueezyCheckoutUrl: TOGETHERLY_GOOGLE_SHEET_COPY_URL,
  supportEmail: 'support@togetherlyplanner.com',
  guaranteeText: '30-day money-back guarantee if this system does not simplify your shared finances.',
  deliveryTime: 'Instant digital delivery to your inbox upon order completion.',
  deliverables: [
    'Complete 8-tab synchronized Couples Money Planner (Google Sheets)',
    '1-click Setup Wizard with automated currency & partner name sync',
    'Fair-split mathematical cost engine (50/50 or proportional to income)',
    'Realistic seed demo data to explore immediately',
    'Blank template cleaner button for instant real-life use',
    'Comprehensive step-by-step visual onboarding guide',
    'Free lifetime template updates & friendly customer support',
  ],
  tabs: [
    {
      id: 'dashboard',
      name: 'Home Dashboard',
      tabLabel: '01. Home Dashboard',
      title: 'Your Complete Household Financial Pulse at a Glance',
      badge: 'Executive Overview',
      summary:
        'A single, unified dashboard that summarizes total household income, actual spend, monthly savings, and your fair-split settlement balance in real time.',
      bullets: [
        'Total income, expense, and savings rate KPI metric cards',
        'Dynamic monthly budget progress vs actual cash outflow gauges',
        'Real-time fair-split balance card showing who reimburses whom',
        'Clean, high-contrast visual design optimized for calm review',
      ],
      screenshot: '/togetherly/dashboard.png?v=2',
      ratio: '2312 / 1444',
    },
    {
      id: 'monthly-plan',
      name: 'Monthly Plan',
      tabLabel: '02. Monthly Plan',
      title: 'Planned vs Actual Spending Across 9 Core Categories',
      badge: 'Cash Flow Engine',
      summary:
        'No more guessing where your money went. Allocate targets by category at the start of the month and compare against real transactions as they happen.',
      bullets: [
        '9 pre-built household categories (Housing, Groceries, Dining, Utilities, Travel, etc.)',
        'Automatic variance tracking: instantly see if you are under or over budget',
        'Clear breakdown of individual contributions per partner',
        'Zero complicated formulas required — all totals update dynamically',
      ],
      screenshot: '/togetherly/monthly-plan.png?v=2',
      ratio: '1378 / 956',
    },
    {
      id: 'fair-split',
      name: 'Fair Split Engine',
      tabLabel: '03. Fair Split Engine',
      title: 'Equitable Cost Sharing Without the Awkward Conversations',
      badge: 'Harmony & Fairness',
      summary:
        'Split expenses 50/50 or proportional to each partner’s income. The automated settlement engine figures out exact reimbursement amounts effortlessly.',
      bullets: [
        'Choose between 50/50 equitable split or proportional income-weighted split',
        'Accounts for individual out-of-pocket expenses automatically',
        'Instant settlement summary banner shows exactly who owes what at month-end',
        'Eliminates resentment, micro-tracking, and tedious manual calculations',
      ],
      screenshot: '/togetherly/fair-split.png?v=2',
      ratio: '1508 / 784',
    },
    {
      id: 'goals',
      name: 'Goals Tracker',
      tabLabel: '04. Shared Goals',
      title: 'Build Toward What Matters: Vacations, Down Payments, Emergencies',
      badge: 'Shared Future',
      summary:
        'Turn shared dreams into tangible reality. Track multiple savings milestones with target amounts, contribution balances, and visual progress indicators.',
      bullets: [
        'Target date calculators and remaining balance milestones',
        'Visual in-cell progress sparklines that celebrate every dollar saved',
        'Covers emergency funds, home deposits, vacations, and wedding funds',
        'Aligns both partners on big life priorities and upcoming investments',
      ],
      screenshot: '/togetherly/goals.png?v=2',
      ratio: '1420 / 680',
    },
    {
      id: 'money-date',
      name: 'Money Date Routine',
      tabLabel: '05. Monthly Money Date',
      title: 'A Healthy, Joyful 20-Minute Monthly Check-In Routine',
      badge: 'Relationship Health',
      summary:
        'Transform financial stress into connection. A guided monthly reflection template with thoughtful prompts, win celebrations, and next-month commitments.',
      bullets: [
        'Structured reflection questions: what worked, what surprised us, where did we thrive?',
        'Celebration box: acknowledge personal and shared financial wins together',
        'Next-month action items: concrete commitments with assigned ownership',
        'Fosters honest, low-stress, emotionally healthy teamwork around finances',
      ],
      screenshot: '/togetherly/money-date.png?v=2',
      ratio: '1270 / 1150',
    },
  ],
  faqs: [
    {
      question: 'Do I need Microsoft Excel or paid software to use this?',
      answer:
        'No paid software is needed at all. The Couples Money Planner is built natively for Google Sheets. You only need a standard free Google account to access, edit, and collaborate in real time from any laptop, tablet, or smartphone.',
    },
    {
      question: 'How do my partner and I use it together?',
      answer:
        'Because it runs in Google Sheets, you simply click "Share" and enter your partner\'s Google email address. Both of you can view, edit, enter expenses, and review your finances simultaneously or asynchronously from anywhere in the world.',
    },
    {
      question: 'Can we change the currency and category names?',
      answer:
        'Yes, 100%. The Setup tab allows you to choose your primary currency ($ USD, € EUR, £ GBP, $ CAD, $ AUD, or custom). All categories, income sources, and goal names can be personalized in seconds to match your exact lifestyle.',
    },
    {
      question: 'How does the Fair Split calculation work?',
      answer:
        'You can select either a standard 50/50 split or an Income-Proportional split (e.g., 60/40 if one partner earns more). As you log expenses, the system continuously compares who paid for what versus what each person was responsible for, presenting a single clean settlement amount at the end of the month.',
    },
    {
      question: 'Is my personal financial data safe and private?',
      answer:
        'Completely. Unlike budgeting apps that require linking your real bank accounts and passwords to third-party servers, Togetherly never accesses your bank credentials. Your data lives exclusively in your personal private Google Drive.',
    },
    {
      question: 'Are there any recurring monthly subscription fees?',
      answer:
        'None. This is a one-time purchase of $19. Once you own it, you have lifetime access with zero recurring subscriptions, ever.',
    },
    {
      question: 'How will I receive the planner after purchasing?',
      answer:
        'Immediately after completing your purchase through our secure Lemon Squeezy checkout, you will receive an instant digital receipt and access link with full instructions to make your personal private copy in 1 click.',
    },
  ],
};

export const togetherlyBrand = {
  name: 'Togetherly',
  tagline: 'Money made simpler, life more together.',
  description:
    'Simple, intentional financial planning systems designed for modern couples. Building shared security, clear communication, and stress-free financial partnership.',
  creator: {
    name: 'Ayoub Ameur',
    portfolioUrl: '/',
    role: 'Creator & Software Engineer',
  },
  theme: {
    cream: '#F7F0E4',
    creamLight: '#FAF6EF',
    creamDark: '#EFE7D8',
    forest: '#174F4A',
    forestDark: '#0F3834',
    teal: '#2C7A73',
    tealLight: '#3D9991',
    peach: '#F29B7F',
    peachLight: '#F6C2B0',
    peachBg: '#FDF1EC',
    sage: '#91B7A0',
    sageLight: '#B7D3C2',
    text: '#243B38',
    muted: '#6F7F7C',
    white: '#FFFFFF',
  },
  assets: {
    logoPrimary: '/togetherly/togetherly-logo-primary.png',
    logoLight: '/togetherly/togetherly-logo-light.png',
    icon: '/togetherly/togetherly-icon.png',
    ogBanner: '/togetherly/togetherly.png',
  },
  upcomingProducts: [
    {
      title: 'Shared Expense & Bill Splitter',
      description: 'Quick-entry calculator for splitting recurring monthly bills and roommates / partners utilities without ledger bloat.',
      tag: 'In Research',
    },
    {
      title: 'House Deposit Milestone Planner',
      description: 'Multi-year amortization and escrow savings roadmap for couples preparing to buy their first home.',
      tag: 'Coming Q2',
    },
    {
      title: 'Wedding Budget & Vendor Tracker',
      description: 'Comprehensive wedding cost estimator, deposit calendar, and contract milestone system.',
      tag: 'Planned',
    },
    {
      title: 'Annual Couples Money Review',
      description: 'Year-end financial retrospective workbook to celebrate net worth milestones and set annual intentions.',
      tag: 'Planned',
    },
  ],
};
