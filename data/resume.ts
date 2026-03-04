export const resumeData = {
  basics: {
    name: "Aditya Murarka",
    title: "Software Engineer | MS in Software Engineering @ ASU | Ex-Walmart Global Tech (Level III) | Graduating May 2026",
    summary: "Software engineer with 5+ years of industry experience building and scaling production systems. I've worked on large-scale enterprise applications, modernized legacy systems, and designed backend services, event-driven pipelines, and secure access controls to deliver reliable, high-performance products. Currently pursuing a Master's in Software Engineering at Arizona State University (Expected May 2026). Through academic and personal projects, I've applied AI within backend systems to solve practical engineering problems. Open to full-time software engineering opportunities in the U.S.",
    location: "Tempe, Arizona, United States",
    email: "adityamurarka14@gmail.com",
    email2: "amurark3@asu.edu",
    phone: "+1 (623) 275-2054",
    linkedin: "https://www.linkedin.com/in/adityamurarka14",
  },
  experience: [
    {
      company: "Walmart Global Tech India",
      title: "Software Engineer III",
      period: "March 2022 - July 2024",
      location: "Bangalore, Karnataka, India",
      bullets: [
        "Engineered an Adobe Analytics dashboard to track supply chain activity, leading to the cleanup of idle resources and achieving a 15% decrease in cloud spending.",
        "Migrated multiple high-impact AngularJS components to ReactJS, which boosted screen performance by 25-30%, and supported easier feature development.",
        "Built an event-driven notification pipeline using a Kafka consumer in a Spring Boot backend, exposing REST APIs for user preferences and alert history, and pushing real-time notifications to a React frontend via WebSockets.",
        "Implemented IAM-driven authorization using JWT token to enforce secure, feature-level authorization, enabling granular, scalable access management across the application.",
        "Re-architected Excel-based workflows into backend-driven web platforms, improving data consistency, eliminating human errors, and adding auditable, traceable state transitions for supply-chain operations.",
        "Achieved 92%+ test coverage using the Jest framework, significantly reducing production bugs and technical debt.",
      ],
      metrics: [],
    },
    {
      company: "Nineleaps",
      title: "Software Developer 1",
      period: "Aug 2019 - March 2022",
      location: "Bangalore, Karnataka, India",
      bullets: [
        "Created interactive dashboards with Chart.js that enabled users to track KPIs in real time and cut manual reporting effort by providing the option to download and share these reports.",
        "Engineered reusable multi-step form components with validations, improving the efficiency of the flow by 20% and improving overall user experience.",
        "Introduced Storybook for component documentation, reducing onboarding time and cutting UI integration bugs.",
        "Contributed to monorepo architecture, reducing code duplication by 30% and improving cross-project development efficiency.",
        "Optimized code with code-splitting and lazy loading, improving page load times by 25% and boosting Lighthouse scores.",
      ],
      metrics: [],
    },
  ],
  skills: {
    languages: ["JavaScript", "TypeScript", "Python", "Java", "SQL", "SPARQL"],
    aiml: ["Model Context Protocol (MCP)", "Retrieval-Augmented Generation (RAG)", "PyTorch", "NumPy", "Pandas", "Agentic AI"],
    frontend: ["Next.js", "React.js", "Redux", "Tailwind CSS", "Storybook", "Chart.js"],
    backend: ["FastAPI", "Flask", "Spring Boot", "Node.js", "REST APIs", "WebSockets"],
    tools: ["Microsoft Azure", "Kafka", "GraphDB", "Postman", "JWT", "Git", "WSL"],
    testing: ["Jest", "React Testing Library", "Adobe Analytics", "Google Analytics"],
  },
  education: [
    {
      school: "Arizona State University",
      degree: "Master of Science (M.S.)",
      field: "Computer Software Engineering",
      period: "August 2024 - May 2026",
    },
    {
      school: "Manipal University Jaipur",
      degree: "Bachelor of Technology (B.Tech)",
      field: "Computer Science and Engineering",
      period: "August 2015 - May 2019",
    },
  ],
  projects: [
    {
      title: "F1 AI",
      organization: "Arizona State University",
      year: "May 2025 - July 2025",
      bullets: [
        "Developed an AI-powered Formula 1 race engineer assistant using Next.js, FastAPI, and Tailwind CSS, featuring a natural language chatbot that leverages an MCP server to dynamically invoke backend tools for race schedules, standings, session results, and driver comparisons."
      ],
      tech: ["Python", "FastAPI", "PyTorch", "NumPy", "Pandas", "RAG", "SPARQL", "GraphDB", "MCP"],
    },
    {
      title: "Gotham Watch",
      organization: "Arizona State University",
      year: "Oct 2024 - Dec 2024",
      bullets: [
        "Developed a full-stack crime analytics dashboard using React 18, Vite, and Ant Design, featuring an interactive US county-level choropleth heat map and dynamic pie chart visualizations powered by d3-scale and react-google-charts.",
        "Engineered a Python Flask REST API that dynamically constructs SPARQL queries against a GraphDB RDF triple store, enabling real-time retrieval of crime data across 7 crime categories, 50 US states, and 4 years (2011-2014) from a custom OWL ontology.",
        "Designed a semantic data model using RDF/OWL with structured classes (State, County, CrimeYear, CrimeCategory) and deployed the knowledge graph to a GraphDB instance, demonstrating proficiency in Semantic Web technologies and linked data principles.",
        "Shipped 4 interactive use cases — state/county drill-down filtering, crime frequency visualization, and multi-year geographic heat mapping using FIPS codes — and deployed the frontend to GitHub Pages for public access."

      ],
      tech: ["Python", "Flask", "React", "SPARQL", "GraphDB", "Vite", "Ant Design", "d3-scale", "react-google-charts"],
    },
  ],
};
