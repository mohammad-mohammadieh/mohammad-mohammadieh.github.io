---
title: "Enterprise Operations Platform"
order: 5
draft: false
status: "media"
summary: "An internal platform that follows an opportunity from the RFP pipeline into project delivery, with access for five roles."
stack: ["React", "ASP.NET Core", "Dataverse", "Azure"]
role: "contributed"
roleDetail: "Contributor in a team"
figures:
  - { value: "5", label: "user roles" }
cover:
  src: "./01-home-portfolio-dashboard.webp"
  title: "Portfolio dashboard"
  caption: "The delivery portfolio by status, solution area and branch, for the signed-in role."
  alt: "Dashboard with five summary tiles, a donut chart of project status and two bar lists, beside a left-hand navigation menu."
gallery:
  - src: "./02-rfp-pipeline-board.webp"
    title: "RFP pipeline board"
    caption: "One lane per status, from In Progress to Awarded and Lost."
    alt: "Board with six columns of opportunity cards, each card showing a title, customer, value and date."
  - src: "./03-rfp-detail.webp"
    title: "Opportunity record"
    caption: "One request for proposal with its status, readiness checks and customer contact."
    alt: "Record page with a row of headline fields, a details panel and a readiness checklist with progress bars."
  - src: "./04-award-creates-project.webp"
    title: "Award creates the project"
    caption: "Setting an opportunity to Awarded creates the delivery project and links it."
    alt: "Opportunity record marked Awarded with a linked project number and a confirmation message at the bottom of the page."
  - src: "./05-project-workspace-and-tasks.webp"
    title: "Project workspace and tasks"
    caption: "Current tasks, assignees and milestone progress."
    alt: "Project page with a task list on the left, completed tasks struck through, and a milestone list with percentages on the right."
  - src: "./06-my-tasks-team-member.webp"
    title: "My Tasks for a team member"
    caption: "The Team Member role has one page: own tasks, the week's due load and what is overdue."
    alt: "Task page with a one-item navigation menu, a five-day due-load chart and a list of tasks due today or overdue."
  - src: "./07-team-capacity.webp"
    title: "Team capacity"
    caption: "Capacity bands derived from each person's open and overdue assignments."
    alt: "Team page with four horizontal capacity bars, a \"who can help\" list and a grid of people cards with initials."
  - src: "./08-team-member-profile.webp"
    title: "Colleague profile"
    caption: "Workload figures, profile fields and project memberships."
    alt: "Profile page with four workload tiles, a profile panel and a list of projects with progress bars."
  - src: "./09-certifications-expiry.webp"
    title: "Certification expiry runway"
    caption: "Certificates grouped by how soon they expire. The certificate names are public vendor certifications, used as sample data."
    alt: "Certificates page with a summary row of counts and five columns of certificate cards ordered by expiry window."
  - src: "./10-notification-centre.webp"
    title: "Notification center"
    caption: "Grouped by day, with unread items marked."
    alt: "Side panel listing notifications under Today, Yesterday and Earlier, over a dimmed task page."
  - src: "./11-command-palette.webp"
    title: "Command palette"
    caption: "One search finds a project and its tasks."
    alt: "Search dialog over a dimmed page, showing one project result and a list of matching tasks."
  - src: "./12-access-control-roles.webp"
    title: "Access control: roles and page grants"
    caption: "The built-in roles and the pages granted to the selected role."
    alt: "Access control page with a list of six roles on the left, five built-in and one custom, and a table of pages with granted ticks on the right."
  - src: "./13-same-page-two-roles.webp"
    title: "The same page for two roles"
    caption: "The opportunity register as the Administrator (all 40 records) and as a Presales user (the 9 in her own scope)."
    alt: "Two versions of the same list page next to each other; the left one has a longer menu and a longer list than the right one."
videos:
  - src: "/media/enterprise-operations-platform/highlight.mp4"
    label: "Highlight"
    title: "Slipway operations platform, highlight"
    duration: "41 s"
    poster: "./poster-highlight.webp"
    description: "The pipeline, an award, tasks, certification expiry, a locked page and the single-page Team Member view."
  - src: "/media/enterprise-operations-platform/walkthrough.mp4"
    label: "Full walkthrough"
    title: "Slipway operations platform, full walkthrough"
    duration: "4 min 22 s"
    poster: "./poster-walkthrough.webp"
    description: "Eight chapters: an opportunity is registered, awarded and becomes a project, a task is completed, then team, certifications, access control and all five roles."
seo:
  description: "A team project I contributed to: an internal operations platform with role-based access for five roles. Shown as a demo copy with synthetic data."
updated: 2026-10-13
---

## The problem

Winning work and delivering it are connected. The platform follows an opportunity from the request-for-proposal pipeline through award into project delivery, tasks, team workload and certification compliance, for five user roles.

## What I worked on

I contributed to this platform as part of a team. I did not build it alone. The demo runs the application's own front end against a simplified stand-in server that applies the same role rules.

<!-- TEXT: which parts Mohammad worked on himself, in one or two generic sentences in his own words, once he supplies them. -->

## How it works

- **Front end.** React and TypeScript.
- **Access control.** Five roles. The same page shows different records to different roles.

## What it shows

- **RFP pipeline.** One lane per status, and the record behind each opportunity.
- **Award to project.** Awarding an opportunity creates the delivery project and links it.
- **Delivery and team.** Tasks, milestones, capacity bands and colleague profiles.
- **Certifications.** Grouped by how soon they expire.
- **Access control.** Roles and page grants, and the same page as seen by two roles.
