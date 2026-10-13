---
title: "Service Desk Analytics"
order: 1
draft: false
status: "media"
summary: "Executive and operational Power BI dashboards for four public-sector service desks, all on one Microsoft Fabric data model."
stack: ["Power BI", "Microsoft Fabric", "DAX"]
role: "built"
figures:
  - { value: "4", label: "public-sector service desks" }
  - { value: "1", label: "Microsoft Fabric data model" }
  - { value: "55", label: "DAX measures in the original model" }
  - { value: "3", label: "report pages", scope: "shown" }
  - { value: "46", label: "measures, rebuilt for the demo", scope: "shown" }
noteExtra: "The screens and video show my report design as a demo copy, on synthetic data for an invented organization, Tarnmoor Regional Authority. The original model had 55 DAX measures. The model and the 46 measures in this copy were rebuilt for the demo, so the formulas are this copy's own."
mediaNote: "Recorded in Power BI Desktop from a local demo copy that is not connected to any client system. The organization is invented and the data is synthetic, so the numbers on screen are generated, not real results. The videos were recorded in the editing view, so small hover icons and a selection outline appear in places. They are not part of the report."
cover:
  src: "./page-1-ticketing-dashboard.webp"
  title: "Landing page: four desks, one KPI framework"
  caption: "Each service desk gets the same card: process efficiency with a monthly trend line, total tickets, closed within time, tickets closed and average resolution days."
  alt: "Dashboard page with a headline banner and gear artwork, a row of five filters, and four side-by-side desk cards, each with a percentage ring, a small trend line and four figures."
gallery:
  - src: "./page-2-tickets-overview.webp"
    title: "Tickets overview"
    caption: "Five headline KPIs, then ticket status, the monthly demand trend with a simple next-month estimate, cycle time by stage, the on-time completion mix and a request type by priority heatmap."
    alt: "Long dashboard page with a row of five KPI cards, a status diagram around a central total, a bar chart of monthly tickets ending in a blue forecast bar, a three-step process diagram, a donut chart with three outcome rows, and an orange heatmap grid with totals."
  - src: "./page-3-internal-details.webp"
    title: "Internal details: technicians and ticket SLA"
    caption: "A ranked technician list with a radar for the selected technician, above a ticket table whose four summary cards filter the rows."
    alt: "Long dashboard page with a list of technician names beside a triangular radar chart and four figures, and below it a table of tickets with colored priority, status and SLA labels under four summary cards."
videos:
  - src: "/media/service-desk-analytics/highlight.mp4"
    label: "Highlight"
    title: "Service desk dashboard, highlight"
    duration: "42 s"
    poster: "./poster-highlight.webp"
    description: "The landing page and desk cards, a date-range change, a department pick, the status hub and demand trend, the heatmap, the desk selector, the technician radar and the ticket table filtered by its cards."
  - src: "/media/service-desk-analytics/walkthrough.mp4"
    label: "Full walkthrough"
    title: "Service desk dashboard, full walkthrough"
    duration: "3 min 36 s"
    poster: "./poster-walkthrough.webp"
    description: "All three pages in nine captioned parts, from the four desk cards through date and department filters, status, demand, cycle time and on-time completion to the technician radar and the ticket SLA table."
seo:
  description: "Power BI dashboards for four public-sector service desks on one Microsoft Fabric data model. Shown as a demo copy with synthetic data."
updated: 2026-10-13
---

## The problem

Four public-sector service desks needed the same three things reported: SLA compliance, backlog and resolution time. Two groups read those numbers: executives, and the teams who run the desks.

## What I built

I designed two sets of Power BI dashboards, executive and operational, for the four service desks. All of them sit on one Microsoft Fabric data model, so every page and every desk uses the same definitions. The original model has 55 DAX measures for SLA compliance, backlog and resolution time.

What is shown on this page is that report design as a three-page demo copy, with its custom visuals, on synthetic data for an invented organization. I rebuilt the data model and 46 measures for the demo from the report's field names and plain-language definitions. The copy loads from local files in Power BI Desktop.

## How it works

- **Microsoft Fabric.** One data model shared by all four service desks.
- **Power BI.** Executive dashboards and operational dashboards on top of that model, with custom visuals.
- **DAX.** 55 measures in the original model, in three areas: SLA compliance, backlog and resolution time.
- **The demo copy.** Three pages and 46 rebuilt measures, on generated data in local files.

## What it shows

- **Landing page.** Four desks, one KPI framework. Each desk gets the same card, so the desks are easy to compare.
- **Tickets overview.** Five headline KPIs, ticket status, the monthly demand trend with a simple next-month estimate, cycle time by stage, the on-time completion mix and a request type by priority heatmap.
- **Internal details.** A ranked technician list with a radar for the selected technician, and a ticket table whose four summary cards filter the rows.

### How to read the KPIs

These are the definitions as the demo copy calculates them. A scored ticket is one that has both a due time and an end time. Only scored tickets can be judged against an SLA.

- **Total tickets.** The number of tickets in the current selection of dates, desks and filters.
- **Tickets closed.** Tickets whose status is Closed, Resolved or Cancelled.
- **Closed within time.** A pass or fail count: the share of scored tickets that ended at or before their due time. A ticket one hour late and a ticket one month late both count as a miss.
- **Process efficiency.** A graded average over the same scored tickets. An on-time ticket scores 100%. A late ticket scores 100% minus 5 points for each day late, never below 0%. The KPI is the average score.
- **Average resolution days.** Average days from creation to the end time, over tickets that have ended.
- **Within SLA, near breach, breached.** Scored tickets that ended on time with less than 80% of the allowed time used, on time with 80% or more used, or after the due time.
- **Forecast bar.** A simple next-month estimate worked out inside the chart from the months shown. It is a rule of thumb, not a statistical model.

### Process efficiency versus closed within time

The two answer different questions about the same tickets. In the demo's default view, 2,408 of 2,993 scored tickets ended on time, which is 80%. That is closed within time. The other 585 were late, but mostly by a few days, so each still earns partial credit, about 84% on average. Averaging every ticket's score gives 97%. That is process efficiency.

Closed within time asks how many tickets made the deadline. Process efficiency asks how close to the deadline the desk ran overall. All of these figures come from generated data.
