import { Skill, WorkExperience, Project, Certification, Achievement } from "./types";

export const PERSONAL_INFO = {
  name: "Shivani Shinde",
  title: "Quality Assurance Engineer | Application Maintenance Associate",
  phone: "7620937782",
  email: "shindeshivani674@gmail.com",
  linkedin: "https://linkedin.com/in/shivani-shinde0103",
  github: "https://github.com/shindeshivanir",
  location: "Phaltan, Satara, Maharashtra, India",
  summary: "Quality Assurance Engineer with 1.10 years of experience in manual testing, end-to-end UAT ownership, and bug tracking across eLearning and industrial web applications. Skilled in test plan creation, UAT script writing, exploratory testing, root cause analysis, and release validation in Agile environments. Built an AI-powered UAT Builder (Google AI Studio – Gemini API) that converts raw test steps into structured, ready-to-execute UAT scripts. Expanding into API testing (Postman) and test automation with Playwright (JavaScript)."
};

export const SKILLS: Skill[] = [
  // Testing
  { name: "Manual Testing", level: 5, category: "Testing", description: "Comprehensive exploratory and script-driven manual testing of full-stack web architectures." },
  { name: "Functional & Regression", level: 5, category: "Testing", description: "Executing release validation, smoke tests, and comprehensive regression cycles." },
  { name: "UAT (End-to-End)", level: 5, category: "Testing", description: "User Acceptance Testing ownership, from user story validation to stakeholder sign-off." },
  { name: "Test Case Design", level: 5, category: "Testing", description: "Drafting bulletproof test scenarios, boundary value analyses, and state-transition cases." },
  { name: "Bug Tracking & Defect Lifecycle", level: 5, category: "Testing", description: "Filing thorough bug reports, managing priorities, and verifying bug-fixes." },
  { name: "Root Cause Analysis", level: 4, category: "Testing", description: "Tracing failures to API responses, databases, or client-side states." },

  // API Testing
  { name: "Postman", level: 4, category: "API Testing", description: "REST API request execution, schema and status code verification, response assertion tests." },
  { name: "REST APIs", level: 4, category: "API Testing", description: "Analyzing payloads, status codes, query strings, and header attributes." },

  // Automation
  { name: "Playwright", level: 3, category: "Automation", description: "Developing automated browser test cases in JavaScript for end-to-end regression validation." },
  { name: "JavaScript", level: 4, category: "Automation", description: "Writing scalable scripts, asynchronous handlers, and custom testing modules." },

  // AI & Tools
  { name: "Gemini API (Google AI Studio)", level: 5, category: "AI & Tools", description: "Integrating intelligent language models to automate QA documentations and script generation." },
  { name: "Azure DevOps", level: 5, category: "AI & Tools", description: "Configuring work items, tracking sprints, and maintaining shared test-case suites." },
  { name: "JIRA", level: 4, category: "AI & Tools", description: "Scrum ticket management, agile sprint cycles, and bug reports routing." },
  { name: "TestRail", level: 4, category: "AI & Tools", description: "Documenting test plans, compiling execution metrics, and building QA summaries." },
  { name: "GitHub", level: 4, category: "AI & Tools", description: "Version control workflows, review requests, and CI/CD actions integration." },

  // Programming
  { name: "SQL & MySQL", level: 4, category: "Programming", description: "Drafting relational queries, inspecting database tables, and validating test transactions." },
  { name: "Python", level: 3, category: "Programming", description: "Scripting helper scripts, automated utilities, and basic algorithms." },
  { name: "Java (Basic)", level: 3, category: "Programming", description: "Object-oriented programming, basic full-stack web components." },

  // Process
  { name: "Agile / Scrum", level: 5, category: "Process", description: "Daily stand-ups, retro logs, sprint planning, and user story estimations." },
  { name: "SDLC & STLC", level: 5, category: "Process", description: "In-depth understanding of Software and Software Test Life Cycles." },
  { name: "User Story Validation", level: 5, category: "Process", description: "Analyzing acceptance criteria to map out complete coverage models." },
  { name: "Support Ticket Management", level: 4, category: "Process", description: "Resolving post-deployment tickets, patching, and emergency release validation." }
];

export const EXPERIENCE: WorkExperience[] = [
  {
    role: "Application Maintenance Associate – QA",
    company: "Paexskin Solutions Pvt. Ltd.",
    period: "Aug 2024 – Present",
    highlights: [
      "Owned end-to-end UAT ownership for 2 major product releases — drafted test plans, verified acceptance criteria, ran 30+ custom UAT scripts, logged and tracked bug tickets, and achieved stakeholder sign-off.",
      "Executed manual regression, smoke, sanity, exploratory, and functional testing; curated and maintained over 50 test cases in Azure DevOps.",
      "Managed full defect lifecycles and answered post-deployment support tickets, ensuring smooth and stable release validations.",
      "Built an AI-powered UAT Builder utility via Google AI Studio that converts raw developer and client notes into structured, high-quality UAT scripts, reducing manual drafting efforts significantly."
    ],
    toolsUsed: ["Azure DevOps", "Google AI Studio", "Postman", "TestRail", "JIRA", "GitHub"]
  },
  {
    role: "Java Full Stack Developer Intern",
    company: "Edubridge, Capgemini",
    period: "Nov 2023 – May 2024",
    highlights: [
      "Developed and validated modern web features utilizing Java, JDBC, and SQL schemas.",
      "Identified critical edge cases during development, supporting early-stage QA sign-off and reducing late-stage bug injections by 25%.",
      "Collaborated with product teams to translate structural wireframes into functional web pages."
    ],
    toolsUsed: ["Java", "SQL", "HTML5/CSS3", "JavaScript", "MySQL", "Git"]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "uat-builder",
    title: "UAT Builder",
    subtitle: "AI-Powered QA Tool",
    description: "Built an intelligent QA utility powered by Google AI Studio (Gemini API) that automates the generation of standardized UAT documents, eliminating manual drafting delays.",
    bullets: [
      "Converts raw, informal user inputs, or scratchpad developer steps into perfectly formatted UAT scripts.",
      "Ensures absolute consistency across Test Cases (Pre-conditions, granular Actions, Expected Results, Post-conditions).",
      "Integrates fully on the server-side to demonstrate robust prompt engineering and modern AI SDK usage."
    ],
    category: "AI & Quality Assurance",
    iconName: "Cpu",
    githubUrl: "https://github.com/shindeshivanir"
  },
  {
    id: "my-campus",
    title: "MyCampus",
    subtitle: "eLearning Platform for Dental Training",
    description: "Served as the core QA Lead for an interactive learning platform designed for professional dental business training programs.",
    bullets: [
      "Led the complete UAT lifecycle including comprehensive test planning, user story validation, and writing 20+ specialized UAT scripts.",
      "Executed exploratory testing, identified functional bottlenecks, logged bugs, and spearheaded stakeholder sign-off reviews.",
      "Managed post-UAT support ticketing queues, resulting in a successful release validation with zero critical production issues."
    ],
    category: "UAT & Release Validation",
    iconName: "GraduationCap"
  },
  {
    id: "wingd",
    title: "WinGD",
    subtitle: "Industrial Web Application",
    description: "Handled extensive quality validation and bug auditing for a high-performance industrial web client.",
    bullets: [
      "Authored exhaustive UAT scripts and validated critical user story workflows across rapid release cycles.",
      "Administered defect validation and conducted root cause analyses for complex industrial telemetry reports inside Azure DevOps.",
      "Collaborated on visual status reports for stakeholders, supporting stable deployments."
    ],
    category: "Enterprise Testing",
    iconName: "Settings"
  }
];

export const EDUCATION = {
  degree: "B.Tech – Computer Science",
  institution: "Dr. Babasaheb Ambedkar Technological University, Lonere",
  year: "2024",
  score: "CGPA: 8.32",
  highlights: [
    "Specialized in Software Engineering, Database Systems, and Object-Oriented Development.",
    "Graduated with First Class Distinction, reflecting strong conceptual foundations and coding proficiency."
  ]
};

export const CERTIFICATIONS: Certification[] = [
  { name: "TCS iON Career Edge – Young Professional", issuer: "TCS iON", year: "2024" },
  { name: "SQL – Sololearn Certified", issuer: "Sololearn", year: "2023" },
  { name: "JavaScript – Sololearn Certified", issuer: "Sololearn", year: "2023" }
];

export const ACHIEVEMENTS: Achievement[] = [
  { title: "2nd Rank – Paithon Hackathon", description: "Won runner-up position for building an interactive 'Proctored Quiz Tool' using Python and state checks." },
  { title: "IEEE Technical Paper Presentation", description: "Successfully presented a technical paper on computer science architectures at an IEEE-sponsored engineering forum." }
];

export const PRESET_TEST_STEPS = [
  {
    label: "🛒 Add Item to Cart & Checkout",
    steps: "User lands on home page. Clicks on the 'Deals' tab, clicks 'Add to Cart' on the smart watch product card. Cart count increments to 1. User clicks shopping bag icon, then clicks 'Proceed to Checkout'. Fills out shipping form, selects 'Credit Card' as payment option, and clicks 'Place Order'. Order ID should be visible on success page."
  },
  {
    label: "🔑 Secure User Login & Validation",
    steps: "Open browser and load login URL. Type email 'invalid@test.com' and click next. Visual red warning should show. Enter email 'shivani@qa.com' and password 'SecurePass123'. Click 'Login'. Dashboard should load, user's avatar and profile name should show on the top-right corner, and welcome banner appears."
  },
  {
    label: "📝 Task Board Task Creation",
    steps: "User logs in, enters 'Work' space and opens Kanban Task Board. Click on '+ Create Task' button on the 'To Do' column. Type task title 'Write Playwright Automation' and priority 'High'. Click save. Task appears in To Do column. Drag task to 'In Progress' column. Column count updates and state is saved."
  }
];
