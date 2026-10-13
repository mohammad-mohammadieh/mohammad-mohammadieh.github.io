---
title: "Enterprise Operations Platform"
order: 5
draft: false
status: "media"
summary: "A team project I contributed to: an internal platform that follows an opportunity from the RFP pipeline into project delivery, with access for five roles."
stack: ["React", "ASP.NET Core", "Dataverse", "Azure"]
role: "contributed"
figures:
  - { value: "5", label: "user roles" }
noteExtra: "I contributed to this platform as part of a team. The screens and video come from my demo copy, with synthetic data and a simplified stand-in server. \"Slipway\" is an invented name."
mediaNote: "I contributed to this platform as part of a team. Everything below is from a rebranded demo copy with synthetic data: the company, every person, customer, record and figure on screen is invented. The server in this demo is a simplified local stand-in, not the production back end."
cover:
  src: "./01-home-portfolio-dashboard.webp"
  title: "Portfolio dashboard"
  caption: "The Home page's projects view summarizes the delivery portfolio by status, solution area and branch for the signed-in role. Team project, demo copy, synthetic data."
  alt: "Dashboard with five summary tiles, a donut chart of project status and two bar lists, beside a left-hand navigation menu."
gallery:
  - src: "./02-rfp-pipeline-board.webp"
    title: "RFP pipeline board"
    caption: "Opportunities are grouped into one lane per status, from In Progress to Awarded and Lost."
    alt: "Board with six columns of opportunity cards, each card showing a title, customer, value and date."
  - src: "./03-rfp-detail.webp"
    title: "Opportunity record"
    caption: "One request for proposal with its status, value, readiness checks and customer contact."
    alt: "Record page with a row of headline fields, a details panel and a readiness checklist with progress bars."
  - src: "./04-award-creates-project.webp"
    title: "Award creates the project"
    caption: "After the opportunity is set to Awarded, the confirmation names the delivery project that was created and linked to it."
    alt: "Opportunity record marked Awarded with a linked project number and a confirmation message at the bottom of the page."
  - src: "./05-project-workspace-and-tasks.webp"
    title: "Project workspace and tasks"
    caption: "A delivery project with its current tasks, assignees and milestone progress."
    alt: "Project page with a task list on the left, completed tasks struck through, and a milestone list with percentages on the right."
  - src: "./06-my-tasks-team-member.webp"
    title: "My Tasks for a team member"
    caption: "The Team Member role has a single page: their own assignments, the due load for the working week and what is overdue."
    alt: "Task page with a one-item navigation menu, a five-day due-load chart and a list of tasks due today or overdue."
  - src: "./07-team-capacity.webp"
    title: "Team capacity"
    caption: "The roster is grouped into capacity bands derived from each person's open and overdue assignments."
    alt: "Team page with four horizontal capacity bars, a \"who can help\" list and a grid of people cards with initials."
  - src: "./08-team-member-profile.webp"
    title: "Colleague profile"
    caption: "One person's workload figures, profile fields and project memberships."
    alt: "Profile page with four workload tiles, a profile panel and a list of projects with progress bars."
  - src: "./09-certifications-expiry.webp"
    title: "Certification expiry runway"
    caption: "Certificates are grouped by how soon they expire, under a compliance summary. The certificate names are public vendor certification names used as sample data."
    alt: "Certificates page with a summary row of counts and five columns of certificate cards ordered by expiry window."
  - src: "./10-notification-centre.webp"
    title: "Notification center"
    caption: "In-app notifications are grouped by day, with unread items marked."
    alt: "Side panel listing notifications under Today, Yesterday and Earlier, over a dimmed task page."
  - src: "./11-command-palette.webp"
    title: "Command palette"
    caption: "A search typed into the command palette finds a project and its tasks."
    alt: "Search dialog over a dimmed page, showing one project result and a list of matching tasks."
  - src: "./12-access-control-roles.webp"
    title: "Access control: roles and page grants"
    caption: "The built-in roles and the pages granted to the selected role."
    alt: "Access control page with a list of six roles on the left, five built-in and one custom, and a table of pages with granted ticks on the right."
  - src: "./13-same-page-two-roles.webp"
    title: "The same page for two roles"
    caption: "The opportunity register as the Administrator (all 40 records) and as a Presales user (the 9 in her own scope), side by side."
    alt: "Two versions of the same list page next to each other; the left one has a longer menu and a longer list than the right one."
videos:
  - src: "/media/enterprise-operations-platform/highlight.mp4"
    label: "Highlight"
    title: "Slipway operations platform, highlight"
    duration: "41 s"
    poster: "./poster-highlight.webp"
    description: "A short cut of the full recording: the pipeline, the opportunity record, award, task assignment and completion, certification expiry, the locked page and the single-page Team Member view."
  - src: "/media/enterprise-operations-platform/walkthrough.mp4"
    label: "Full walkthrough"
    title: "Slipway operations platform, full walkthrough"
    duration: "4 min 22 s"
    poster: "./poster-walkthrough.webp"
    description: "Eight chapters: a new opportunity is registered, reviewed and awarded and becomes a project, a task is assigned and completed, then the delivery, team and certification views, access control and a page lock, and the same application as each of the five roles."
seo:
  description: "A team project I contributed to: an internal operations platform with role-based access for five roles. Shown as a demo copy with synthetic data."
updated: 2026-10-13
---

## The problem

Winning work and delivering it are connected. An opportunity moves from the request-for-proposal pipeline through qualification and award into project delivery, tasks, team workload and certification compliance. The platform brings these into one place, for five user roles with different access.

## What I worked on

I contributed to this platform as part of a team. I did not build it alone. It is an internal operations platform that follows an opportunity from the request-for-proposal pipeline through qualification and award into project delivery, tasks, team workload and certification compliance, with role-based access for five roles.

What is shown on this page is Slipway, a rebranded demo copy of it. The screens are the application's own React and TypeScript front end, and all data shown is synthetic. In this demo the server is a simplified local stand-in that applies the same role rules, so it shows how the product behaves, not the production back end or its integrations.

<!-- TEXT: which parts Mohammad worked on himself, in one or two generic sentences in his own words, once he supplies them. -->

## How it works

- **One platform.** An opportunity moves from the pipeline through award into a delivery project with tasks, team workload and certification compliance.
- **Access control.** Role-based access for five roles. The same page shows different records to different roles.
- **Front end.** React and TypeScript.
- **The demo copy.** The application's own front end with synthetic data and a simplified local stand-in server that applies the same role rules.

## What it shows

- **RFP pipeline.** Opportunities grouped into one lane per status, and the record behind each one.
- **Award to project.** Setting an opportunity to Awarded creates the delivery project and links it.
- **Delivery.** A project workspace with tasks, assignees and milestone progress, and a My Tasks page for each team member.
- **Team.** Capacity bands and a profile for each colleague.
- **Certifications.** Certificates grouped by how soon they expire.
- **Access control.** Roles and page grants, and the same page as seen by two roles.
