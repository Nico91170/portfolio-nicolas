export interface Technology {
  name: string;
  icon: string;
}

export interface AdditionalMedia {
  url: string;
  type: 'image' | 'video';
  caption?: string;
}

export interface ChallengeSolution {
  title: string;
  description: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  technologies: Technology[];
  codeLink?: string;
  demoLink?: string;
  additionalMedia?: AdditionalMedia[];
  challenges?: ChallengeSolution[];
  solutions?: ChallengeSolution[];
  category?: 'web' | 'api' | 'mobile' | string;
  statusBadge?: string;
  metrics?: string[];
}

export interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  pdfUrl: string;
}

export interface Experience {
  id: string;
  varName: string;
  comment: string;
  lineNum: number;
  contentLineNum: number;
  title: string;
  company: string;
  location?: string;
  period: string;
  logo: string;
  logoBg: string;
  responsibilities: string[];
  stack: string[];
}

