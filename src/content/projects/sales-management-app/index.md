---
title: "Multi-Company Sales Management App"
order: 3
draft: false
status: "media"
summary: "An app where sales teams log client meetings and track weekly KPI targets, with automated weekly Excel reports to managers and midweek target alerts."
stack: ["Power Apps", "Dataverse", "Power Automate"]
role: "built"
figures:
  - { value: "4", label: "companies in production" }
  - { value: "240+", label: "sales meeting reports logged" }
noteExtra: "The production app runs on Power Apps, Dataverse and Power Automate. The screens and video show its code app version, running locally on synthetic demo data. \"Meetledger\" and its companies are invented."
mediaNote: "Captured from a demo copy that runs locally in the browser. All data is synthetic: the companies, the people, the customers and every number on screen were generated for the demo. The pointer, the caption pill and the chapter cards in the videos were added by the recording script. They are not part of the app."
cover:
  src: "./01-hero-dashboard-all-companies.webp"
  title: "Dashboard across all companies"
  caption: "The administrator's dashboard for the current week: total meetings, one card per customer type with the change from last week, and the day's meetings, across all four companies."
  alt: "Meetledger dashboard in the green Velmora Freight theme, signed in as an administrator. A filter bar sits above six key-figure cards; the first shows 78 total meetings for 11 to 16 October 2026, up 9 on last week, and the others count new, existing, follow-up, partner and vendor meetings. The Daily Meetings list starts below."
gallery:
  - src: "./02-salesperson-dashboard-weekly-targets.webp"
    title: "Salesperson dashboard with weekly targets"
    caption: "A salesperson sees personal weekly targets for meetings and new customers with progress, pace and the number still to go, and has only Home and Sales Meeting Reports in the menu."
    alt: "Dashboard signed in as a salesperson. Two green cards read \"My Meeting Target 6 / 7, 86%, 1 meeting remaining, On pace\" and \"My New Customers Target 1 / 1, Target achieved\"; four smaller cards count existing, follow-up, partner and vendor meetings."
  - src: "./03-log-meeting-report-follow-up-customer.webp"
    title: "Logging a meeting report"
    caption: "Adding a follow-up meeting: the customer is chosen from earlier customers by typing, and the app then fills in the contact."
    alt: "Sales Meeting Reports screen with the salesperson's own report list on the left and the \"Add sales report\" form on the right. Customer type is Follow-up and a list of four matching customer names is open under the customer name field."
  - src: "./04-reports-list-filters-and-details.webp"
    title: "Reports list with filters"
    caption: "A manager's report list filtered by salesperson and start date and grouped by day, with the selected report's details beside it."
    alt: "All Reports list showing 12 reports for one salesperson from 5 October 2026, grouped under Today, Yesterday and This week. The details panel shows meeting date, customer type, customer, contact, minutes and owner, with Edit and Delete buttons."
  - src: "./05-weekly-kpi-targets-team-progress.webp"
    title: "Weekly KPI targets and team progress"
    caption: "The manager's Weekly KPIs screen lists each team member's target for the week with progress bars for meetings and new customers: two targets already achieved, two on pace and one behind."
    alt: "Weekly KPIs screen with the \"This week\" preset and every status shown. Five target rows each have a name, two progress bars, the date range 12 to 16 October 2026 and a status chip, \"Achieved\" or \"In Progress\", with the labels \"On pace\" or \"Behind by 3\" and Edit and Deactivate buttons."
  - src: "./06-kpi-drill-through-to-meetings.webp"
    title: "Drill-through from a KPI to its meetings"
    caption: "Clicking a target opens Sales Meeting Reports already filtered to that salesperson and the target's dates, so the meetings behind the number can be read."
    alt: "Sales Meeting Reports filtered to one salesperson from 12 to 16 October 2026 with six reports listed. The first report is selected and its details are shown on the right."
  - src: "./07-manager-team-dashboard-analytics.webp"
    title: "Manager's team view"
    caption: "The manager's dashboard is limited to their own team: today's meetings, meetings per salesperson split by customer type, and the share of meetings held with new customers."
    alt: "Lower part of the dashboard for a sales manager. A Daily Meetings table lists today's meetings with customer, contact and salesperson; below it a \"Meetings by Salesperson\" list shows a stacked bar per person, next to a green \"Sales Activity\" card with a ring reading 20% new customers."
  - src: "./08-coordinator-read-only-reports.webp"
    title: "Coordinator: read-only access"
    caption: "The sales coordinator sees the reports of every company but has no Add, Edit or Delete controls and no User Management entry."
    alt: "Sales Meeting Reports in the violet Quillon Labs theme, signed in as a sales coordinator. The list counts 440 reports, one report is selected, and the details panel offers only a Close button. The sidebar lists Home, Sales Meeting Reports and Weekly KPIs."
  - src: "./09-admin-user-management.webp"
    title: "User management"
    caption: "The administrator's user list with role, company, status and meeting count for every user, and filters for role, status and company."
    alt: "User Management screen with 23 users in a table. Each row has a name and email address, a role chip, a company, an Active status, a meeting count with a small bar and an Edit button. An \"Add new user\" button is at the top right."
  - src: "./10-admin-edit-user-role-and-manager.webp"
    title: "Editing a user"
    caption: "Editing a user sets the role, the company, the manager the person reports to and whether the account is active."
    alt: "\"Edit user\" dialog over the blurred user list, with the fields Name, Email, Role (Sales Person), Company (Velmora Freight), Reports to (a sales manager) and an Active switch, and the buttons Cancel and Save changes."
  - src: "./11-theme-tavrik-packaging-dashboard.webp"
    title: "Company theme: Tavrik Packaging"
    caption: "The same dashboard for a manager of another company, in that company's colors, typeface, logo and artwork."
    alt: "Dashboard in the amber Tavrik Packaging theme with a cube pattern in the sidebar, signed in as a sales manager. The layout of filters and key-figure cards is the same as in the green version; the first card shows 18 total meetings."
  - src: "./12-theme-nimbelle-software-team-dashboard.webp"
    title: "Company theme: Nimbelle Software"
    caption: "A manager's team view in a third company theme: today's meetings, meetings per salesperson and the customer-type mix of the week."
    alt: "Lower part of the dashboard in the charcoal and yellow Nimbelle Software theme, signed in as a sales manager. A Daily Meetings table with four rows sits above a \"Meetings by Salesperson\" list with three people and a dark \"Sales Activity\" card with a ring reading 18% new customers."
videos:
  - src: "/media/sales-management-app/highlight.mp4"
    label: "Highlight"
    title: "Meetledger in 38 seconds"
    duration: "38 s"
    poster: "./poster-highlight.webp"
    description: "A short cut of the walkthrough: logging a follow-up meeting, the weekly target moving, team progress and the drill-through to the meetings, the read-only coordinator view, user management and the four company themes."
  - src: "/media/sales-management-app/walkthrough.mp4"
    label: "Full walkthrough"
    title: "Meetledger walkthrough: four roles, four companies"
    duration: "3 min 52 s"
    poster: "./poster-walkthrough.webp"
    description: "A salesperson logs a meeting and the weekly target moves, a manager sets a target and drills from a KPI into its meetings, a coordinator sees everything without being able to change it, an administrator manages users, and the theme changes with the company. In this local demo the manager's \"new meeting report\" notification comes from a rule simulated in the browser."
seo:
  description: "A Power Apps app for sales teams to log client meetings and track weekly KPI targets, in production at four companies. Shown with synthetic data."
updated: 2026-10-13
---

## The problem

Sales teams in four companies log client meetings and work to weekly KPI targets. Their managers need a report every week and a signal on targets before the week ends.

## What I built

I built an app for sales teams to log client meetings and track weekly KPI targets. It sends managers an automated Excel report every week and sends target alerts midweek. It went to production across four companies, with 240+ sales meeting reports logged.

The production app is built on Power Apps, Dataverse and Power Automate. It applies role-based access in the app and gives each of the four companies its own theme from one code base.

What is shown on this page is its code app version (React and TypeScript), rebranded as "Meetledger" with invented companies and people, running locally on a demo data layer with synthetic data. Nothing in these images or videos is connected to Dataverse or to any real account.

## How it works

- **Power Apps, Dataverse and Power Automate.** The production app.
- **Four roles.** Salespeople log meetings and follow their weekly targets. Managers set those targets and see their own team. A coordinator has read-only access across all companies. An administrator manages users, roles and reporting lines.
- **One code base, four themes.** Each company gets its own colors, typeface, logo and artwork.
- **Weekly report and midweek alerts.** Managers get an automated Excel report every week, and target alerts go out midweek.
- **The demo.** The code app version, in React and TypeScript, on a local demo data layer.

## What it shows

- **Salesperson.** Logs a meeting report and sees personal weekly targets for meetings and new customers, with progress and pace.
- **Sales manager.** Sets weekly targets, follows team progress and drills from a KPI into the meetings behind it.
- **Sales coordinator.** Reads the reports of every company, with no add, edit or delete controls.
- **Administrator.** Manages users, roles and reporting lines.
- **Company themes.** The same screens in each company's own theme.
