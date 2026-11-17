export type Project = {
  number: string;
  slug: string;
  name: string;
  category: string;
  image: string;
  description: string;
  technologies: string[];
  github: string;
  live?: string;
  challenges: string[];
  futurePlans: string[];
};

export const projects: Project[] = [
  {
    number: "01", slug: "resume-orbit", name: "ResumeOrbit", category: "AI / Full-Stack Development",
    image: "/projects/resume-orbit.png",
    description: "An AI-powered resume analyzer that evaluates resumes, identifies skill gaps and provides actionable feedback for job applications.",
    technologies: ["React", "TypeScript", "FastAPI", "Gemini"],
    github: "https://github.com/SabikunEthika/AI_ResumeAnalyzer", live: "https://frontend-delta-one-f7arl0zj17.vercel.app/",
    challenges: ["Extracting useful structure from resumes with inconsistent layouts.", "Turning AI feedback into clear, actionable suggestions."],
    futurePlans: ["Add role-specific scoring and tailored resume templates.", "Support more document formats and saved analysis history."],
  },
  {
    number: "02", slug: "get-tally", name: "GetTally", category: "AI / SaaS / Full-Stack Development",
    image: "/projects/get-tally.png",
    description: "A chat-native order and earnings tracker designed to help small online sellers manage sales through natural-language and voice-based interactions.",
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Gemini"],
    github: "https://github.com/SabikunEthika/GetTally",
    challenges: ["Interpreting varied seller messages accurately.", "Keeping order and earning records reliable across conversational updates."],
    futurePlans: ["Add multi-store analytics and downloadable reports.", "Expand voice input and multilingual support."],
  },
  {
    number: "03", slug: "care-meds", name: "CareMeds", category: "Healthcare / E-commerce",
    image: "/projects/care-meds.png",
    description: "A medicine availability and ordering platform designed to make medicine discovery and delivery more accessible.",
    technologies: ["React", "TypeScript", "Laravel", "MySQL"],
    github: "https://github.com/SabikunEthika/CareMeds", live: "https://care-meds-sd.vercel.app/",
    challenges: ["Presenting medicine availability clearly while keeping the search experience simple.", "Coordinating inventory, ordering and delivery data."],
    futurePlans: ["Add prescription upload and pharmacy-side inventory tools.", "Introduce delivery tracking and medicine reminders."],
  },
  {
    number: "04", slug: "ed-bridge", name: "Ed-Bridge", category: "Education / Full-Stack Development",
    image: "/projects/ed-bridge.jpeg",
    description: "An academic resource-sharing and collaboration platform designed to connect students with useful learning resources.",
    technologies: ["React", "ASP.NET Core", "EF Core", "MySQL"],
    github: "https://github.com/SabikunEthika/Ed-Bridge", live: "https://ed-bridge-mu.vercel.app/",
    challenges: ["Organizing resources so students can find relevant material quickly.", "Designing a dependable connection between the frontend and .NET API."],
    futurePlans: ["Add moderation workflows, bookmarks and smarter resource recommendations.", "Create course-specific communities and notifications."],
  },
];
