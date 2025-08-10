// CV Knowledge Base for RAG system
export const cvKnowledge = {
  personalInfo: {
    name: "SYED GUFRAH HUSSAIN",
    location: "Lucknow, India",
    role: "AI/ML Engineer, AI Researcher,ML Engineer, ",
    company: "STUDENT",
    email: "tazeema07@gmail.com",
    github: "https://github.com/syed-gufran",
    linkedin: "https://linkedin.com/in/tazeem-abbas",
    website: "https://github.com/syed-gufran",
  },

  professionalSummary: `Enthusiastic Computer Science student with a strong foundation in AI & ML, seeking opportunity to apply technical skills and contribute to real-world projects. Passionate about learning and growth in the tech domain.`,

  skills: {
    programming: [
      "JavaScript",
      "Python", 
      "C/C++",
      "HTML5",
      "CSS3"
    ],
    frameworks: [
      "Python",
      "Pytorch",
      "TensorFlow",
    ],
   
    databases: [
      "MongoDB",
      "PostgreSQL", 
    ],
    tools: [
      "Git/GitHub",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Matplotlib",
      "Seaborn",
      "Jupyter Notebook",
      "VS Code",
      "Docker",
      "Postman",
      "openAI",
      "ChatGPT",
      "LangChain",
      "opencv",
      "keras",
      "Flask",
      "streamlit",
      "FastAPI"

    ],
    interests: [
      "Artificial Intelligence",
      "Machine Learning",
      "Educational Technology",
      "Open Source Development",
      "Research in AI/ML",
      "deep learning",
      "Computer Vision",
      "Natural Language Processing",
      "Data Science"
    ]
  },
  projects: [
  {
    title: "AI-Powered Research Assistant",
    description: "Developed a research assistant using OpenAI's GPT-4o-mini model to answer questions about my background, skills, and experience.",
    technologies: ["Perplexity", "Python", "CREW ai", "FastAPI", "multiagents"],
    link: "https://ai-research-assistant-frontend.vercel.app/"
  },
  {
    title: "Python ML Practice",
    description: "Practice repository for machine learning projects and experiments.",
    technologies: ["Python", "Machine Learning"],
    link: "https://github.com/syed-gufran/python_ml_practice"
  },
  {
    title: "Multiple Disease Prediction",
    description: "Built models to predict multiple diseases using healthcare datasets.",
    technologies: ["Python", "Machine Learning", "Data Science"],
    link: "https://github.com/syed-gufran/multiple-disease-prediction"
  },
  {
    title: "Deep Learning Projects",
    description: "Collection of deep learning models and experiments.",
    technologies: ["Python", "TensorFlow", "Keras"],
    link: "https://github.com/syed-gufran/deep-learning"
  },
  {
    title: "TazeemFolio",
    description: "Personal portfolio website showcasing my work and skills.",
    technologies: ["React", "Next.js", "CSS"],
    link: "https://github.com/syed-gufran/TazeemFolio"
  },
  {
    title: "Calorie Burnt Prediction API",
    description: "API service to predict calories burnt based on activity data.",
    technologies: ["Python", "FastAPI"],
    link: "https://github.com/syed-gufran/calorie_burnt_prediction_api"
  },
  {
    title: "Movie Recommendation App",
    description: "App that provides movie recommendations based on user preferences.",
    technologies: ["Python", "Flask", "Machine Learning"],
    link: "https://github.com/syed-gufran/movie_recommendation_app"
  },
  {
    title: "ML Models",
    description: "Collection of various machine learning models.",
    technologies: ["Python", "scikit-learn"],
    link: "https://github.com/syed-gufran/ML_models"
  },
  {
    title: "AI Summarizer",
    description: "Tool to summarize text documents using AI models.",
    technologies: ["Python", "OpenAI API"],
    link: "https://github.com/syed-gufran/ai-summarizer"
  },
  {
    title: "Music Recommendor",
    description: "A music recommendation system based on user listening history.",
    technologies: ["Python", "Machine Learning"],
    link: "https://github.com/syed-gufran/music-recommendor"
  },
  {
    title: "Pyshop",
    description: "E-commerce website built with Python and Django.",
    technologies: ["Python", "Django", "Bootstrap"],
    link: "https://github.com/syed-gufran/Pyshop"
  },
  {
    title: "Karmavesh",
    description: "Project description to be added.",
    technologies: [],
    link: "https://github.com/syed-gufran/karmavesh"
  },
  {
    title: "Mini Project",
    description: "Various small projects and experiments.",
    technologies: [],
    link: "https://github.com/syed-gufran/mini-project-"
  },
  {
    title: "Responsive Yoga Website",
    description: "Yoga website designed to be fully responsive.",
    technologies: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/syed-gufran/responsive-yoga-website"
  }
],


  education: {
    degree: "Bachelor of Technology in Computer Science and Engineering",
    institution: "Babu Banarsi Das Institute of Technology and Management, Lucknow",
    graduationYear: 2026,
    relevantCourses: [
      "Data Structures and Algorithms",
      "Database Management Systems",
      "Computer Networks",
      "Operating Systems",
      "Web Development",
      "Machine Learning"
    ],intermediate: {
        name: "Preston International Academy, Lucknow",
        performance: "Completed with excellent academic record",
        subjects: ["Physics", "Chemistry", "Mathematics", "Computer Science"],
        extracurriculars: "Participated in various science and technology fairs, enhancing problem-solving and analytical skills",
        percentage: "83.2%",
        graduationYear: 2022,
        relevantCourses: [
          "Physics",
          "Chemistry",
          "Mathematics",
          "Computer Science"
        ]
      },
    highschool: {
      name: "Preston International Academy, Lucknow",
      performance: "Completed with excellent academic record",
      subjects: ["Physics", "Chemistry", "Mathematics", "Computer Science"],
      extracurriculars: "Participated in various science and technology fairs, enhancing problem-solving and analytical skills",
      percentage: "87.33%",
      graduationYear: 2020,
      relevantCourses: [
        "Physics",
        "Chemistry",
        "Mathematics",
        "Computer Science"
      ]
      
    },
    focus: "Computer Science and AI",
    interests: "Strong focus on artificial intelligence, machine learning, and their practical applications in solving real-world problems, particularly in education technology."
  },

  workStyle: {
    approach: "Believes in writing clean, maintainable code and building intuitive user experiences",
    collaboration: "Strong advocate for open-source development and community collaboration",
    learning: "Continuous learner with passion for staying updated with latest technologies and industry trends"
  }
};

// Utility to format list to readable string
function formatList(items: string[]) {
  return items.join(", ");
}

// RAG utility function to get relevant context based on query
export function getFormattedContextForQuery(query: string): string {
  const lowerQuery = query.toLowerCase();
  const contextParts: string[] = [];

  // Interests check
  if (["interest", "hobby", "passion"].some(word => lowerQuery.includes(word))) {
    contextParts.push(`Interests: ${formatList(cvKnowledge.skills.interests)}`);
  }

  // Projects check
  if (["project", "work", "experience", "portfolio"].some(word => lowerQuery.includes(word))) {
    const projectsText = cvKnowledge.projects.map(proj => 
      `Title: ${proj.title}\nDescription: ${proj.description}\nTechnologies: ${formatList(proj.technologies)}\nLink: ${proj.link}`
    ).join("\n\n");
    contextParts.push(`Projects:\n${projectsText}`);
  }

  // Professional Summary check
  if (["summary", "professional summary", "about", "profile", "background", "bio"].some(keyword => lowerQuery.includes(keyword))) {
    contextParts.push(`Professional Summary:\n${cvKnowledge.professionalSummary}`);
  }

  // Other sections to search through
  const sections = [
    { title: "Personal Information", data: cvKnowledge.personalInfo },
    { title: "Skills", data: cvKnowledge.skills },
    { title: "Education", data: cvKnowledge.education },
    { title: "Work Style", data: cvKnowledge.workStyle },
  ];

  for (const { title, data } of sections) {
    const dataStr = JSON.stringify(data).toLowerCase();
    if (dataStr.includes(lowerQuery) || 
        lowerQuery.split(" ").some(word => dataStr.includes(word))) {
      let formatted = "";
      if (typeof data === "string") {
        formatted = data;
      } else if (Array.isArray(data)) {
        formatted = data.map(item => JSON.stringify(item)).join("\n");
      } else if (typeof data === "object") {
        formatted = Object.entries(data).map(([k,v]) => {
          if (Array.isArray(v)) return `${k}: ${formatList(v)}`;
          if (typeof v === "object") return `${k}: ${JSON.stringify(v)}`;
          return `${k}: ${v}`;
        }).join("\n");
      }
      contextParts.push(`${title}:\n${formatted}`);
    }
  }

  if (contextParts.length === 0) {
    return "No specific information found in CV knowledge base.";
  }

  return `Based on SYED GUFRAH HUSSAIN's CV and professional background:\n\n${contextParts.join("\n\n")}\n\nPlease answer the user's question about SYED GUFRAH HUSSAIN based on this information. Be conversational, helpful, and accurate. If the question is about something not covered in the CV, mention that while providing what relevant information you can.`;
}
