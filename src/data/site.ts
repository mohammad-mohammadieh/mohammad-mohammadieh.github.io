// Site-wide facts. Every line here comes from the resume.
// Do not add clients, awards, numbers or links that are not in the resume.
//
// The employer name appears in `work` below and is rendered only in the
// Work section of the home page. It must not be used anywhere else.

import { GITHUB_USERNAME, SITE_URL, hasGithub } from "../../site.config.mjs";

export interface WorkEntry {
  employer: string;
  role: string;
  location: string;
  dates: string;
  bullets: { text: string; related?: string[] }[];
}

export const site = {
  url: SITE_URL,
  name: "Mohammad Mohammadieh",
  role: "Data Analyst",
  city: "Beirut",
  country: "Lebanon",
  location: "Beirut, Lebanon",
  email: "mohammad.a.mohammadieh@gmail.com",
  linkedin: {
    url: "https://www.linkedin.com/in/m-mohammadieh",
    label: "linkedin.com/in/m-mohammadieh",
  },
  // Profile link only. Null while the username in site.config.mjs is a placeholder.
  github: hasGithub
    ? {
        url: `https://github.com/${GITHUB_USERNAME}`,
        label: `github.com/${GITHUB_USERNAME}`,
      }
    : null,
  year: "2026",

  seo: {
    title: "Mohammad Mohammadieh | Data Analyst (Power BI, Fabric)",
    description:
      "Data analyst in Beirut building Power BI dashboards, Microsoft Fabric data models and Power Platform apps. Case studies shown with synthetic data.",
  },

  intro: {
    statement:
      "I build Power BI dashboards and the Microsoft Fabric data models behind them.",
    paragraphs: [
      "I'm a data analyst in Beirut. I work mostly in Power BI: data models, DAX measures and row-level security, for public-sector and institutional clients. I also build the tools around the reports: Power Apps, Power Automate flows and a Copilot Studio agent.",
      "I care about numbers people can trust. That means KPIs agreed with the people who will use them, one model behind every page, access rules that show each user only their own data, and tests where the answer has to be right.",
    ],
  },

  figures: {
    label: "From my current role",
    items: [
      {
        value: "60+",
        label:
          "Tableau dashboards converted to Power BI, in a 200+ dashboard migration program",
      },
      {
        value: "4",
        label: "companies using the sales reporting app in production",
      },
      {
        value: "200+",
        label: "automated tests verifying the AI agent demo",
      },
    ],
  },

  // `related` holds project folder names. A name with no matching published
  // project is skipped, so a bullet never shows a broken link.
  work: [
    {
      employer: "CCI ICT Innovations",
      role: "Data Analyst",
      location: "Beirut, Lebanon",
      dates: "Nov 2024 to Present",
      bullets: [
        {
          text: "Converted and optimized 60+ Tableau dashboards to Power BI within a 200+ dashboard migration program, rebuilding data models, DAX measures and row-level security.",
        },
        {
          text: "Build Power BI dashboards and Microsoft Fabric data models for public-sector and institutional clients, defining KPIs with client stakeholders.",
          related: ["service-desk-analytics", "operations-dashboard-rls"],
        },
        {
          text: "Delivered a Power Apps sales reporting app to production across four companies, with 240+ sales meeting reports logged.",
          related: ["sales-management-app"],
        },
        {
          text: "Built a Copilot Studio AI agent demo for an industrial maintenance use case, verified by 200+ automated tests.",
          related: ["maintenance-ai-agent"],
        },
      ],
    },
    {
      employer: "ITCAN Solutions",
      role: "Information Management Engineer",
      location: "Saida, Lebanon",
      dates: "Feb 2024 to Oct 2024",
      bullets: [
        { text: "Configured and maintained gateways and enterprise applications." },
        {
          text: "Built automation enhancements and custom solutions for operational needs.",
        },
        {
          text: "Extracted and transformed operational data to support business processes and decisions.",
        },
      ],
    },
    {
      employer: "Maids.cc",
      role: "Data Analyst",
      location: "Dubai, UAE (Remote)",
      dates: "Sept 2023 to Feb 2024",
      bullets: [
        {
          text: "Wrote MySQL queries with joins, subqueries and conditional logic to extract and transform operational data.",
        },
        {
          text: "Built Tableau reports and analyses used for operational decision-making.",
        },
      ],
    },
  ] as WorkEntry[],

  projectsIntro:
    "These projects were built for my employer or its clients. Client names and real data are confidential, so every case study uses synthetic data.",

  skills: [
    {
      group: "Business Intelligence",
      items:
        "Power BI, DAX, Power Query (M), semantic modeling, row-level security, Tableau, Excel",
    },
    {
      group: "Data Platforms",
      items:
        "Microsoft Fabric (Lakehouse, Direct Lake), SQL (SQL Server, MySQL), KQL, Python",
    },
    {
      group: "Power Platform and Cloud",
      items:
        "Power Apps, Dataverse, Power Automate, Copilot Studio, Azure, Microsoft Entra ID, Git",
    },
    { group: "Languages", items: "Fluent in English and Arabic" },
  ],

  education: {
    school: "Rafik Hariri University",
    location: "Mechref, Lebanon",
    degree:
      "Bachelor of Business Administration in Information Technology Management",
    dates: "Sept 2020 to May 2023",
  },

  contactLede: "Email is the fastest way to reach me.",

  // Fixed wording. Shown on every project page, above any image.
  confidentialityNote:
    "This was built for my employer or one of its clients. Client names and real data are confidential, so everything shown here uses synthetic data.",
};

export const mailto = `mailto:${site.email}`;
