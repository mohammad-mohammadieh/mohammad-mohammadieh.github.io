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
  /** One or two short lines. The resume carries the detail. */
  lines: string[];
  /** Project folder names, linked as case studies under the lines. */
  related?: string[];
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
      "I'm a data analyst in Beirut. I work mostly in Power BI, for public-sector and institutional clients, and I build the Power Platform apps and automation around the reports.",
    ],
  },

  // Fixed file name under public/. Replace the file to update the resume.
  resume: { href: "/Mohammad-Mohammadieh-Resume.pdf", label: "Download resume" },

  // The home page puts the number of projects shown in front of these.
  figures: {
    label: "In numbers",
    items: [
      { value: "60+", label: "Tableau dashboards converted to Power BI" },
      { value: "4", label: "companies using the sales app in production" },
    ],
  },

  // `related` holds project folder names. A name with no matching published
  // project is skipped, so a job never shows a broken link.
  work: [
    {
      employer: "CCI ICT Innovations",
      role: "Data Analyst",
      location: "Beirut, Lebanon",
      dates: "Nov 2024 to Present",
      lines: [
        "Converted 60+ Tableau dashboards to Power BI in a 200+ dashboard migration program.",
        "Build Power BI dashboards, Fabric data models, a Power Apps sales app and a Copilot Studio agent demo.",
      ],
      related: [
        "service-desk-analytics",
        "operations-dashboard-rls",
        "sales-management-app",
        "maintenance-ai-agent",
      ],
    },
    {
      employer: "ITCAN Solutions",
      role: "Information Management Engineer",
      location: "Saida, Lebanon",
      dates: "Feb 2024 to Oct 2024",
      lines: [
        "Configured gateways and enterprise applications, and built automation for operational needs.",
      ],
    },
    {
      employer: "Maids.cc",
      role: "Data Analyst",
      location: "Dubai, UAE (Remote)",
      dates: "Sept 2023 to Feb 2024",
      lines: ["Wrote MySQL queries and built Tableau reports for operational decisions."],
    },
  ] as WorkEntry[],

  projectsIntro:
    "The organization and product names in the demos are made up, and all the data is synthetic.",

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
    "Built for my employer or its clients. Client names and data are confidential, so everything shown here, names included, is synthetic.",
};

export const mailto = `mailto:${site.email}`;
