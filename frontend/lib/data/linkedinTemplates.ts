// LinkedIn Post Generator Templates and Mock Data

export interface GeneratedPost {
  content: string;
  hashtags: string[];
  tone: string;
  hasEmojis: boolean;
}

// Mock AI-generated posts based on different inputs
export const linkedinPostTemplates = {
  hackathon: {
    professional: `Just participated in {eventName} where I worked on building an innovative solution focused on {description}. Collaborated with talented individuals to implement {skills}. Great learning experience in a fast-paced environment. Looking forward to the next challenge! #HackathonLife #Innovation`,
    excited: `🚀 Thrilled to share that I just built something amazing at {eventName}! Our team created {description} using {skills}. Can't wait to apply these learnings to future projects! What an incredible community. Let's keep building! 🔥 #Hackathon #BuildersLife`,
    minimal: `Participated in {eventName}. Built {description} with {skills}. Great experience.`,
    storytelling: `The journey started when I decided to participate in {eventName}. Little did I know it would become one of the most rewarding experiences. Our team dove deep into {description}, leveraging {skills} to solve a real problem. Every debugging session, every breakthrough—it all mattered. We walked away with not just code, but friendships and newfound confidence.`,
    technical: `{eventName} project: Developed {description} using {skills}. Architecture focuses on scalability and performance. Technical highlights include optimization of {description}. Stack: {skills}. GitHub: [link]. Lessons learned available in detailed write-up.`,
  },
  internship: {
    professional: `Excited to announce that I've begun my internship at {eventName}! I'll be focusing on {description} using {skills}. Looking forward to growing professionally and contributing to the team's success. Grateful for this opportunity! #Internship #CareerGrowth`,
    excited: `🎉 Just started my internship at {eventName}! I'll be working on {description} with tech stack including {skills}. The team is amazing, the projects are exciting, and the learning curve is steep in the best way! Can't believe this is real. Let's go! 💪 #InternsOfLinkedIn`,
    minimal: `Started internship at {eventName}. Working on {description} with {skills}.`,
    storytelling: `A few weeks ago, I received an offer to intern at {eventName}. Fast forward to day one—I'm sitting at my desk, ready to make an impact. My role involves {description}, and I'm getting to use {skills} in production. This is my dream come true, and I'm committed to making the most of every day.`,
    technical: `Internship role at {eventName}: {description}. Primary focus: {skills}. Projects involve full-stack development, system design, and feature implementation. Mentorship from senior engineers facilitating deep learning in backend optimization and frontend architecture.`,
  },
  achievement: {
    professional: `I'm honored to share that I've achieved {description} at {eventName}! This milestone involved {skills} and represents months of dedicated work. Grateful to everyone who supported me on this journey. Excited for what's next! #Achievement #Growth`,
    excited: `🏆 YES! I just {description} at {eventName}! Still can't believe it—months of hard work, learning {skills}, and pushing boundaries finally paid off! This wouldn't be possible without my amazing team. Time to celebrate and set new goals! 🚀 #Proud #Grateful`,
    minimal: `Achieved {description} at {eventName}. Skills applied: {skills}.`,
    storytelling: `When I set out to {description} at {eventName}, I wasn't sure if it was possible. The road was challenging. There were moments of doubt. But with every setback came a lesson. {skills} became my toolkit. My team became my strength. And today, I can confidently say—we did it. We achieved {description}.`,
    technical: `Achievement: {description} at {eventName}. Implementation leveraged {skills}. Key technical challenges overcome: [specifics]. Performance metrics improved by X%. This experience reinforced importance of clean architecture and collaborative problem-solving in distributed systems.`,
  },
  certification: {
    professional: `Proud to announce that I've earned my {eventName} certification! Focused on {description} and deepened my knowledge in {skills}. Committed to applying these skills to drive impact in my projects. #Learning #ProfessionalDevelopment`,
    excited: `🎓 I officially earned my {eventName} certification! {description} was challenging but so rewarding. Now I have solid expertise in {skills}. Can't wait to put this knowledge to work! The learning journey never stops! 📚 #CertificationAchieved`,
    minimal: `Earned {eventName} certification. Covered {description} and {skills}.`,
    storytelling: `I decided to pursue the {eventName} certification because I wanted to deepen my expertise in {description}. The curriculum was rigorous—challenging me to master {skills} and think differently about problem-solving. Today, I officially hold this credential, and more importantly, I'm equipped to build better solutions.`,
    technical: `Certification: {eventName} | Specialization: {description} | Covered technologies: {skills} | Practical projects included real-world scenarios in system design and optimization. Certification validates expertise in cutting-edge practices and emerging technologies.`,
  },
  workshop: {
    professional: `Great learning experience at {eventName} workshop! Deepened my understanding of {description} and expanded my toolkit with {skills}. Workshops like these are invaluable for professional growth. #Continuous Learning #Development`,
    excited: `🌟 Just wrapped up an amazing {eventName} workshop! Learned so much about {description} and got hands-on experience with {skills}. The instructors were incredible, and the energy was electric! Already implementing what I learned. #NeverStopLearning 🚀`,
    minimal: `Attended {eventName} workshop on {description} and {skills}.`,
    storytelling: `Attending the {eventName} workshop was a game-changer for me. As someone keen to excel in {description}, I jumped at the opportunity. The hands-on sessions with {skills} were eye-opening. I walked away with practical knowledge and a renewed sense of confidence in my abilities.`,
    technical: `Workshop attendance: {eventName} | Topics: {description} | Technical focus: {skills} | Practical applications: implemented workshop learnings in current project stack. Particular emphasis on advanced patterns and performance optimization techniques applicable to production environments.`,
  },
  project: {
    professional: `Excited to share a project I've been working on! {eventName} involves {description} and leverages {skills}. This project demonstrates my ability to build scalable solutions. Open to feedback and collaboration! #ProjectWork #Development`,
    excited: `🎨 Just shipped {eventName}! Built {description} using {skills}. The final result is something I'm really proud of! If you're interested in the details, check it out and let me know what you think! Collaboration and feedback welcome! 💡 #BuildInPublic`,
    minimal: `Built {eventName}. {description}. Tech: {skills}.`,
    storytelling: `{eventName} started as a simple idea to solve {description}. As I dived deeper, I realized the scope was bigger than I thought. That's when I decided to leverage {skills} to build something robust. Months of iterations, design decisions, and learning later—the project is live. It's a reflection of my growth as a developer.`,
    technical: `Project: {eventName} | Description: {description} | Architecture: microservices | Tech stack: {skills} | GitHub: [repo] | Highlights: implemented caching strategy reducing latency by 60%, containerized deployment, comprehensive test coverage at 85%. Open for code review and contributions.`,
  },
};

// Tone descriptions for UI
export const toneOptions = [
  {
    value: "professional",
    label: "Professional",
    description: "Formal and polished",
  },
  {
    value: "excited",
    label: "Excited",
    description: "Enthusiastic with emojis",
  },
  { value: "minimal", label: "Minimal", description: "Brief and concise" },
  {
    value: "storytelling",
    label: "Storytelling",
    description: "Personal narrative",
  },
  {
    value: "technical",
    label: "Technical",
    description: "In-depth technical details",
  },
];

// Role options
export const roleOptions = [
  "Participant",
  "Finalist",
  "Winner",
  "Volunteer",
  "Intern",
  "Mentor",
  "Organizer",
  "Speaker",
  "Team Lead",
];

// Achievement types
export const achievementTypes = [
  "Hackathon",
  "Internship",
  "Achievement",
  "Certification",
  "Workshop",
  "Project",
];

// Suggested skills for tags
export const suggestedSkills = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "AI/ML",
  "Problem Solving",
  "Full Stack",
  "Web Development",
  "Mobile Development",
  "System Design",
  "Data Science",
  "Cloud (AWS/GCP/Azure)",
  "DevOps",
  "UI/UX Design",
  "Product Management",
  "Leadership",
  "Communication",
];

// Length options
export const lengthOptions = [
  { value: "short", label: "Short", description: "2-3 sentences" },
  { value: "medium", label: "Medium", description: "4-6 sentences" },
  { value: "detailed", label: "Detailed", description: "7-10 sentences" },
];

// Generate hashtags based on content
export function generateHashtags(
  achievementType: string,
  skills: string[],
): string[] {
  const baseHashtags: Record<string, string[]> = {
    hackathon: [
      "#Hackathon",
      "#Innovation",
      "#BuildersLife",
      "#CodeCreativity",
    ],
    internship: [
      "#Internship",
      "#CareerGrowth",
      "#InternsOfLinkedIn",
      "#LearningJourney",
    ],
    achievement: ["#Proud", "#Achievement", "#Growth", "#Grateful"],
    certification: [
      "#Learning",
      "#ProfessionalDevelopment",
      "#Certified",
      "#GrowthMindset",
    ],
    workshop: [
      "#ContinuousLearning",
      "#Development",
      "#NeverStopLearning",
      "#KnowledgeSharing",
    ],
    project: ["#ProjectWork", "#Development", "#BuildInPublic", "#Innovation"],
  };

  const typeHashtags =
    baseHashtags[achievementType.toLowerCase()] || baseHashtags.achievement;
  const skillHashtags = skills
    .slice(0, 2)
    .map((skill) => `#${skill.replace(/[\s/]/g, "")}`);

  return [...typeHashtags, ...skillHashtags].slice(0, 6);
}

// Generate mock post content
export function generateMockPost(
  eventName: string,
  achievementType: string,
  description: string,
  skills: string[],
  tone: string,
  includeEmojis: boolean,
): GeneratedPost {
  const achievementTypeKey =
    achievementType.toLowerCase() as keyof typeof linkedinPostTemplates;
  const toneKey =
    tone as keyof (typeof linkedinPostTemplates)[keyof typeof linkedinPostTemplates];

  const template =
    linkedinPostTemplates[achievementTypeKey]?.[toneKey] ||
    linkedinPostTemplates.achievement.professional;

  let content = template
    .replace("{eventName}", eventName || "the event")
    .replace("{description}", description || "an exciting experience")
    .replace("{skills}", skills.join(", ") || "key technologies");

  if (!includeEmojis) {
    // Remove emojis from content
    content = content.replace(/[🚀🎉🏆🎓🌟🎨💡💪🔥📚�]/g, "").trim();
  }

  return {
    content,
    hashtags: generateHashtags(achievementType, skills),
    tone,
    hasEmojis: includeEmojis,
  };
}
