export interface UatStep {
  stepNumber: number;
  action: string;
  expectedResult: string;
}

export interface UatScript {
  title: string;
  description: string;
  preconditions: string[];
  steps: UatStep[];
  postconditions: string[];
}

export interface Skill {
  name: string;
  level: number; // 1 to 5
  category: "Testing" | "API Testing" | "Automation" | "AI & Tools" | "Programming" | "Process";
  description?: string;
}

export interface WorkExperience {
  role: string;
  company: string;
  period: string;
  highlights: string[];
  toolsUsed: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  category: string;
  iconName: string;
  githubUrl?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year?: string;
}

export interface Achievement {
  title: string;
  description: string;
}

export interface ContactTicket {
  id: string;
  summary: string;
  description: string;
  reporter: string;
  reporterEmail: string;
  priority: "High" | "Medium" | "Low";
  status: "Backlog" | "In Progress" | "Resolved";
  createdAt: string;
}
