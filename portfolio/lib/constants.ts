// Color Palette
export const COLORS = {
  background: '#0a0a0a',
  text: '#f0f0f0',
  violet: '#7c3aed',
  cyan: '#06b6d4',
  emerald: '#10b981',
} as const;

// Content Configuration
export const CONTENT = {
  hero: {
    title: 'Igor Lis',
    subtitle: 'Founder of PWr Now (400+ users, 200k TikTok views) | Systems Engineering Student at WUST | DevOps & AI Specialist from Wrocław. Kubernetes pipelines, local LLMs, audio AI processing, and student app scaling.',
  },
  about: {
    title: 'About Me',
    description: `Systems Engineering student at Wrocław University of Science and Technology (PWr/WUST), leading developer in WMS Dev student org for web/mobile apps. Founded PWr Now: student event app with Gemini AI features for smarter discovery—grew to 400 users via targeted TikTok marketing (200k views). DevOps focus: GitOps workflows, Kubernetes YAML for CI/CD transitions, container orchestration. Hands-on with Hugging Face for audio, Ollama fine-tuning.`,
  },
  skills: {
    title: 'Skills & Technologies',
    categories: [
      {
        name: 'Programming',
        items: ['Python', 'JS/TS', 'Go'],
      },
      {
        name: 'DevOps/CI/CD',
        items: ['Kubernetes', 'Git', 'Argo CD/Flux', 'Helm charts'],
      },
      {
        name: 'AI/ML',
        items: ['Gemini', 'Ollama', 'Hugging Face', 'Whisper'],
      },
      {
        name: 'Infrastructure',
        items: ['Docker', 'Coolify', 'Terraform', 'GCP', 'AWS'],
      },
      {
        name: 'Web',
        items: ['React Native', 'REST APIs', 'Auth'],
      },
    ],
  },
  projects: [
    {
      title: 'PWr Now',
      role: 'Founder & Lead DevOps',
      description: 'iOS/Android app connecting PWr students to events—Gemini AI for personalized recommendations, summaries, event insights.',
      highlights: [
        'Scaled to 400 users; 200k TikTok views from marketing campaigns',
        'DevOps: Kubernetes manifests for backend, GitOps CI/CD pipelines',
      ],
      links: [
        { label: 'Website', url: 'https://pwrnow.pl' },
        { label: 'App Store', url: '#' },
      ],
      tags: ['Kubernetes', 'Gemini AI', 'React Native', 'GitOps'],
    },
    {
      title: 'Personal AI Clone',
      role: 'Developer',
      description: 'Fine-tuned Ollama model on Facebook/WhatsApp data to create local "me" chatbot—privacy-focused, runs offline.',
      highlights: [
        'Full pipeline: data export, cleaning, training on personal convos for style mimicry',
      ],
      links: [],
      tags: ['Ollama', 'AI/ML', 'Python', 'Privacy'],
    },
    {
      title: 'Audio Processing Pipeline',
      role: 'Developer',
      description: 'Advanced speech-to-text with OpenAI Whisper + Hugging Face libs (Transformers, datasets, pipelines).',
      highlights: [
        'Handled macOS installs, PyTorch deps, custom audio transcription/processing workflows',
      ],
      links: [],
      tags: ['Whisper', 'Hugging Face', 'Python', 'Audio Processing'],
    },
    {
      title: 'WMS Dev Contributions',
      role: 'Team Member',
      description: 'Team web app builds in student org—collaborative coding, infra automation',
      highlights: [],
      links: [],
      tags: ['Web Development', 'DevOps', 'Collaboration'],
    },
  ],
  experience: [
    {
      title: 'Founder & DevOps Lead',
      company: 'PWr Now',
      period: '2024–present',
      description: 'End-to-end: app dev, Gemini integration, Kubernetes CI/CD, marketing to 400 users/200k views',
    },
    {
      title: 'Member',
      company: 'WMS Dev Student Org',
      period: '2024–present',
      description: 'Building web apps as team; focus on modern stacks, collaborative DevOps practices',
    },
    {
      title: 'Systems Engineering Student',
      company: 'WUST/PWr',
      period: '2023–present',
      description: 'Core: systems admin, networks. Involved in student council coordination',
    },
  ],
  contact: {
    title: 'Get In Touch',
    description: 'Internships: DevOps, full-stack, AI. Wrocław/remote.',
    email: 'contact@example.com',
    links: [
      { label: 'GitHub', url: 'https://github.com/FOXjustFOX' },
      { label: 'LinkedIn', url: '#' },
      { label: 'PWr Now', url: 'https://pwrnow.pl' },
      { label: 'TikTok', url: '#' },
    ],
    cvUrl: '/cv.pdf',
  },
} as const;
