import type { Dictionary } from './types';

export const en: Dictionary = {
  meta: {
    title: 'Aleksandr Tikhonov — Fullstack JS Developer',
    description:
      'Fullstack JS developer: React, TypeScript, Node.js, NestJS. 4+ years in enterprise and SaaS — aviation, banking, IoT, B2C. Experience and case studies.',
    ogLocale: 'en_US',
  },
  nav: {
    about: 'About',
    experience: 'Experience',
    skills: 'Skills',
    education: 'Education',
    contact: 'Contact',
  },
  ui: {
    switchToLight: 'Switch to light theme',
    switchToDark: 'Switch to dark theme',
    languageName: 'EN',
    otherLanguageLabel: 'Переключить на русский',
    skipToContent: 'Skip to content',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  hero: {
    status: 'Open to offers',
    greeting: "Hi, I'm",
    name: 'Aleksandr Tikhonov',
    role: 'Fullstack JS Developer',
    lead: 'React, TypeScript, Node.js. 4+ years in enterprise and SaaS: aviation, banking, parking automation, B2C. Complex data-heavy, real-time interfaces — and NestJS backends from architecture to launch.',
    ctaPrimary: 'Message on Telegram',
    ctaSecondary: 'View experience',
    stats: [
      { from: 0, to: 4, suffix: '+', label: 'years of commercial development' },
      { from: 8, to: 3, suffix: ' s', label: 'key dashboard LCP (was ~8 s)' },
      { from: 1000, to: 100, suffix: ' ms', label: 'scroll data loading (was ~1 s)' },
      { from: 0, to: 50, label: 'concurrent real-time users' },
      { from: 0, to: 9, label: 'microservices designed solo' },
    ],
  },
  about: {
    eyebrow: 'About',
    title: 'Frontend depth, fullstack ownership',
    paragraphs: [
      'A fullstack developer with a frontend background. For four years I built interfaces for high-load enterprise systems: airline planning, credit monitoring at Sber, parking automation. Tables with thousands of real-time cells, deeply nested forms and dashboards that simply have to be fast.',
      'For the past year I have been building a B2C product on my own: a NestJS microservice backend, a Next.js web app, billing, analytics and LLM integration. I treat development with AI agents as an engineering process — with recorded decisions, shared context and automated checks.',
      'I am looking for a team where I can take on hard problems on both the frontend and the backend.',
    ],
    facts: [
      { label: 'Location', value: 'Saint Petersburg' },
      { label: 'Work format', value: 'Remote · hybrid · office' },
      { label: 'Level', value: 'Middle+' },
      { label: 'English', value: 'B1' },
    ],
    photoAlt: 'Aleksandr Tikhonov on the Gulf of Finland embankment at sunset',
  },
  experience: {
    eyebrow: 'Experience',
    title: 'Where I worked and what I built',
    lead: 'Each role comes with hard problems in a “problem → solution → result” format. Open a case to see the details.',
    present: 'present',
    achievementsLabel: 'Highlights',
    stackLabel: 'Stack',
    casesLabel: 'Hard problems',
    problemLabel: 'Problem',
    solutionLabel: 'Solution',
    resultLabel: 'Result',
    showCase: 'Details',
    hideCase: 'Collapse',
    jobs: [
      {
        id: 'keepfit',
        company: 'Keepfit',
        role: 'Fullstack Developer',
        period: { start: '2025-12' },
        location: 'Saint Petersburg',
        domain: 'B2C · fitness & nutrition',
        badge: 'Preparing for launch',
        summary:
          'A B2C app for tracking nutrition and a daily calorie budget: food logging by voice, photo and barcode, an AI coach, workouts and a Pro subscription. Sole developer — architecture, backend, frontend, data, infrastructure, billing and analytics.',
        metrics: [
          { value: '9', label: 'NestJS services' },
          { value: '59', label: 'ADRs' },
          { value: '~126k', label: 'lines of TypeScript' },
          { value: '200+', label: 'test files' },
        ],
        achievements: [
          'Designed and built a microservice platform single-handedly — from architecture to launch readiness.',
          'Built a fault-tolerant LLM layer: a model cascade that respects provider limits and tracks the cost of every call.',
          'Implemented subscription billing on YooKassa: trials, auto-renewal, SBP payments, fiscal receipts.',
          'Set up an AI-native workflow: ADR-first, per-service agent context, subagents, parallel work in git worktrees.',
        ],
        stack: [
          'TypeScript',
          'NestJS',
          'Next.js',
          'React',
          'MUI',
          'PostgreSQL',
          'RabbitMQ',
          'Redis',
          'S3',
          'Docker',
          'Nx',
          'Jest',
          'GitHub Actions',
          'LLM',
        ],
        cases: [
          {
            id: 'keepfit-platform',
            title: 'A microservice platform, built solo',
            teaser: '9 services with explicit boundaries, events and contracts',
            problem:
              'Design a B2C backend that grows by domain and stays understandable to a new developer — while being written by a single person.',
            solution: [
              'Nx monorepo: apps (web, admin, API gateway), 9 NestJS services and 10 shared libraries — contracts, UI kit, shared types, broker, analytics.',
              'Database per service: each service owns its PostgreSQL; other services’ tables are off-limits.',
              'Asynchronous domain events over RabbitMQ (topic exchange) with a schema registry in shared contracts; synchronous HTTP only when an immediate answer is required.',
              'API gateway as a BFF with local JWT verification via JWKS — no round-trip to the auth service on every request.',
              'Module boundaries are enforced by the linter (@nx/enforce-module-boundaries), and every architectural decision is recorded as an ADR.',
            ],
            result:
              'A 9-service platform with explicit boundaries and 59 documented decisions: a new developer can learn the system from the docs rather than from word of mouth.',
          },
          {
            id: 'keepfit-llm',
            title: 'An LLM model cascade aware of limits and cost',
            teaser: 'Hitting a provider limit is invisible to the user',
            problem:
              'LLM providers impose request and token limits, return occasional 429s and 5xx errors, and different models follow the response format with varying reliability. Without a single mechanism the product would break at the first rate limit, and AI spend would stay opaque.',
            solution: [
              'Callers specify a task type rather than a model; the provider and model registry lives in the database and changes without a deploy.',
              'A per-task model cascade: proactive skipping based on our own rpm/rpd/tpm counters, cooldowns on 429 parsed from Retry-After and rate-limit headers, short backoff on 5xx, and falling through to the next model on an unparseable response.',
              'An immutable usage record for every call; cost is computed from a versioned price list and frozen at call time.',
              'Two-phase user quota charging (reserve → commit/release) with a reservation TTL, so a stuck request never locks the quota.',
            ],
            result:
              'An outage or rate limit at one provider does not break the user flow, and AI cost is visible per model, feature and user.',
          },
          {
            id: 'keepfit-billing',
            title: 'Subscription billing on YooKassa',
            teaser: 'Subscription state machine, idempotent webhooks, fiscal receipts',
            problem:
              'Free/Pro subscriptions with a trial, card and SBP payments, auto-renewal and fiscal receipts — without coupling the domain to a specific payment provider.',
            solution: [
              'The provider sits behind a PaymentProviderPort: replacing YooKassa means writing a new adapter, not rewriting the domain.',
              'A single subscription state machine: trial → active → past_due → grace → canceled.',
              'Verified webhooks are the source of truth; processing is idempotent by the provider’s payment ID.',
              'A trial with card binding via a 1 ₽ hold, and legally required fiscal receipts through the provider’s cloud register.',
            ],
            result: 'Billing is implemented and ready to connect the live store at product launch.',
          },
          {
            id: 'keepfit-ai-native',
            title: 'An AI-native development process',
            teaser: 'One developer, parallel agents, no chaos in the codebase',
            problem:
              'One developer and many parallel AI agents: without a system the code sprawls, agreements get forgotten and agents step on each other’s toes.',
            solution: [
              'ADR-first: every architectural decision is written down before any code — 59 ADRs so far.',
              'Per-service context for agents: boundaries, rules, the design system and screen specs as the source of truth.',
              'Claude Code subagents (explore / implementer / tester / reviewer / debugger) with tasks routed by complexity and model cost.',
              'Agents work in parallel in isolated git worktrees; main only accepts fast-forward merges.',
              'A repository knowledge graph for change impact analysis; strict typescript-eslint, commitlint, and CI with tests, axe accessibility checks and screenshots.',
            ],
            result:
              '~126k lines of TypeScript written by one developer, with a consistent style, architecture and tests.',
          },
        ],
      },
      {
        id: 'centurion',
        company: 'Centurion Innovations',
        role: 'Frontend Developer',
        period: { start: '2024-04', end: '2025-12' },
        location: 'Moscow',
        domain: 'SaaS · aviation',
        summary:
          'A SaaS planning platform for airlines: flights, crews and work schedules, in production use at a major airline. Worked in a cross-functional team; code review, mentoring, acting team lead.',
        metrics: [
          { value: '8 → 3 s', label: 'dashboard LCP' },
          { value: '10×', label: 'faster scroll loading' },
          { value: '50', label: 'concurrent users' },
        ],
        achievements: [
          'Optimized the key dashboard: LCP ~8 s → ~3 s, scroll loading ~1 s → ~100 ms.',
          'Wrote custom virtualization for a timeline table with thousands of cells and real-time row insertion.',
          'Helped design the WebSocket real-time layer with entity locking — up to 50 people working at once.',
          'Launched a Module Federation micro-frontend and extended the corporate Ant Design UI kit.',
          'Acted as team lead, mentored newcomers, initiated load testing.',
        ],
        stack: [
          'React',
          'TypeScript',
          'Zustand',
          'Socket.io',
          'REST',
          'Ant Design',
          'Module Federation',
          'pnpm workspaces',
          'GitLab CI',
        ],
        cases: [
          {
            id: 'centurion-dashboard',
            title: 'Dashboard LCP from 8 down to 3 seconds',
            teaser: 'Scroll loading from ~1 s down to ~100 ms',
            problem:
              'The dispatchers’ key dashboard handled large volumes of frequently updated data: the first render took about 8 seconds and loading more data on scroll took about a second — critical for operational work.',
            solution: [
              'Re-architected the dashboard module.',
              'Virtualization and infinite scroll instead of loading the whole data set up front.',
              'Memoized components and computations; narrow Zustand selectors so an update re-renders only affected components.',
              'Native CSS instead of CSS-in-JS — no runtime style generation on every render.',
              'Bundle splitting and lazy loading of heavy modules.',
            ],
            result: 'LCP dropped from ~8 to ~3 seconds, scroll loading from ~1 s to ~100 ms.',
          },
          {
            id: 'centurion-virtualization',
            title: 'Custom virtualization for a timeline table',
            teaser: 'Two axes, dynamic sizes, real-time row insertion',
            problem:
              'A timeline table with thousands of cells, two-way scrolling, dynamically sized cells and new rows inserted in real time. Off-the-shelf solutions assume a fixed grid and could not handle this combination.',
            solution: [
              'A custom two-axis virtualization engine: only the visible area plus a small buffer lives in the DOM.',
              'Row heights are calculated on the backend, so the client knows offsets up front — no DOM measurements and no layout thrashing.',
              'Rows inserted in real time do not shift the user’s scroll position.',
            ],
            result:
              'A smooth, stable table with thousands of cells under continuous real-time updates.',
          },
          {
            id: 'centurion-realtime',
            title: 'Real time for 50 concurrent users',
            teaser: 'WebSocket and entity locking while editing',
            problem:
              'Up to 50 people work with the same data simultaneously. Everyone must see the current state, and concurrent edits of the same entity must not conflict.',
            solution: [
              'Took part in the API and system design of the Socket.io real-time layer and implemented it on the client.',
              'A locking mechanism: opening an entity’s edit window locks it, the lock event instantly reaches other users, and editing that object is disabled for them.',
            ],
            result:
              'The interface works reliably with up to 50 concurrent users, and conflicting edits do not happen.',
          },
        ],
      },
      {
        id: 'sber',
        company: 'Sber',
        role: 'Frontend Developer',
        period: { start: '2022-07', end: '2024-04' },
        location: 'Yekaterinburg',
        domain: 'Enterprise · banking',
        summary:
          'An enterprise credit monitoring platform for analysing, servicing and controlling credit objects. Complex forms with business validation, micro-service UIs, performance work, code review and security acceptance testing with the bank’s cybersecurity unit.',
        metrics: [
          { value: '~100', label: 'forms on the Form Builder' },
          { value: '~20', label: 'forms using my components' },
        ],
        achievements: [
          'Built the collateral monitoring UI — one of the core credit monitoring processes.',
          'Added recursive structures and nested components to the corporate Form Builder.',
          'Reworked the residential real estate monitoring service, improving performance and internal user CSI.',
          'Mentored an intern all the way to a Junior position.',
        ],
        stack: [
          'React',
          'TypeScript',
          'Redux',
          'GraphQL',
          'REST',
          'WebSocket',
          'JWT',
          'Form Builder',
        ],
        cases: [
          {
            id: 'sber-forms',
            title: 'Recursive forms in the corporate Form Builder',
            teaser: 'Complex nested forms from config, not from scratch',
            problem:
              'About 100 forms on the platform are built with a corporate Form Builder where each form is a TypeScript config. Credit monitoring forms are deeply nested — object → collaterals → documents → parameters — but the builder did not support recursive structures.',
            solution: [
              'Added recursive structures and nested components: a config node can hold fields, groups and lists of groups.',
              'Validation works at any nesting depth.',
            ],
            result:
              'The new components are used in about 20 forms of the service; complex forms are described in config instead of being hand-written.',
          },
          {
            id: 'sber-collateral',
            title: 'Collateral monitoring with atomic real-time updates',
            teaser: 'A stream of updates without heavy re-renders',
            problem:
              'Collateral parameters update in real time over WebSocket. Applying each update wholesale produced large React commits and made the interface sluggish.',
            solution: [
              'Built a custom WebSocket wrapper that applies updates in atomic chunks.',
              'Only the changed part of the interface re-renders — no large commits.',
            ],
            result:
              'A core banking process got a purpose-built interface that stays responsive under a continuous stream of updates.',
          },
        ],
      },
      {
        id: 'parkit',
        company: 'Parkit',
        role: 'Fullstack Developer',
        period: { start: '2022-01', end: '2022-07' },
        location: 'Moscow',
        domain: 'IoT · parking automation',
        summary:
          'A platform that automates parking facilities: spaces, payments and video surveillance without on-site operators. Platform UI, real-time monitoring, corporate UI kit, CI/CD and releases.',
        metrics: [
          { value: '60 FPS', label: 'under real-time event flow' },
          { value: '0 → 1', label: 'UI kit from scratch' },
        ],
        achievements: [
          'Built a Material UI–based UI kit from scratch — the foundation of every frontend module.',
          'Brought camera video and AI service events into the web interface in real time.',
          'Kept a stable 60 FPS under continuous real-time updates.',
          'Set up CI/CD and shipped the solution to production.',
        ],
        stack: [
          'Node.js',
          'Express',
          'React',
          'TypeScript',
          'Material UI',
          'WebSocket',
          'VNC',
          'websockify',
        ],
        cases: [
          {
            id: 'parkit-video',
            title: 'Camera video and AI events right in the browser',
            teaser: 'VNC → websockify → WebSocket',
            problem:
              'Parking camera video is streamed over VNC on top of TCP, while browsers only speak WebSocket. Meanwhile an AI service emits recognition events that must appear alongside the video.',
            solution: [
              'A websockify proxy bridges the VNC stream to WebSocket, so video renders directly in the web UI.',
              'AI service events arrive over a separate WebSocket channel and are shown next to the video.',
            ],
            result:
              'Video and events in a single real-time interface — the parking facility runs without an operator on site.',
          },
          {
            id: 'parkit-fps',
            title: '60 FPS without canvas',
            teaser: 'Memoization and virtualization instead of switching tech',
            problem:
              'The monitoring UI receives a continuous stream of updates and started dropping frames.',
            solution: [
              'Memoized components and computations so an update touches only what changed.',
              'Virtualized pages so the DOM only contains what the user can see.',
            ],
            result: 'A steady 60 FPS on the regular DOM, without moving to canvas.',
          },
        ],
      },
    ],
  },
  skills: {
    eyebrow: 'Skills',
    title: 'Tools I work with',
    languages: 'Russian — native · English — B1',
    groups: [
      {
        id: 'frontend',
        name: 'Frontend',
        items: [
          'TypeScript',
          'React',
          'Next.js',
          'Redux',
          'Zustand',
          'GraphQL',
          'Module Federation',
          'Ant Design',
          'MUI',
          'Storybook',
          'SSR',
        ],
      },
      {
        id: 'backend',
        name: 'Backend',
        items: [
          'Node.js',
          'NestJS',
          'Express',
          'PostgreSQL',
          'RabbitMQ',
          'Redis',
          'REST',
          'WebSocket',
          'Microservices',
        ],
      },
      {
        id: 'testing',
        name: 'Testing',
        items: ['Jest', 'React Testing Library', 'Playwright', 'Load testing'],
      },
      {
        id: 'devops',
        name: 'DevOps',
        items: [
          'Docker',
          'Kubernetes',
          'OpenShift',
          'GitLab CI',
          'GitHub Actions',
          'Jenkins',
          'Yandex Cloud',
          'S3',
        ],
      },
      {
        id: 'ai',
        name: 'AI',
        items: ['LLM integrations', 'Model cascades', 'Claude Code', 'AI-native development'],
      },
      {
        id: 'tools',
        name: 'Tooling',
        items: ['Nx', 'pnpm', 'Git', 'Webpack', 'Jira', 'Confluence'],
      },
    ],
  },
  education: {
    eyebrow: 'Education',
    title: 'Education and courses',
    items: [
      {
        title: 'Software Engineering',
        org: 'Ural Federal University',
        year: '2024',
        primary: true,
      },
      { title: 'Cloud Services Engineer', org: 'Yandex Educational Technologies', year: '2023' },
      { title: 'React and Vue Programming', org: 'Skillfactory', year: '2023' },
      { title: 'Java Developer', org: 'Skillfactory', year: '2022–2023' },
    ],
  },
  contact: {
    eyebrow: 'Contact',
    title: "Let's talk",
    lead: 'Open to Middle/Middle+ Frontend or Fullstack JS developer roles. Telegram is the fastest way to reach me.',
    email: 'Email',
    telegram: 'Telegram',
    github: 'GitHub',
    copy: 'Copy email',
    copied: 'Copied',
  },
  footer: {
    builtWith: 'Next.js · TypeScript · Three.js · Motion',
    source: 'Source code',
  },
};
