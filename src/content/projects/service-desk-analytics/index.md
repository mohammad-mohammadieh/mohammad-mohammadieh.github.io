---
title: "Service Desk Analytics"
order: 1
draft: false
status: "media"
summary: "Executive and operational Power BI dashboards for four public-sector service desks, all on one Microsoft Fabric data model."
stack: ["Power BI", "Microsoft Fabric", "DAX"]
role: "built"
roleDetail: "Design, data model, DAX, custom visuals"
figures:
  - { value: "4", label: "public-sector service desks" }
  - { value: "55", label: "DAX measures" }
mediaNote: "Recorded in Power BI Desktop's editing view, so small hover icons and a selection outline appear in the videos."
cover:
  src: "./page-1-ticketing-dashboard.webp"
  title: "Landing page: four desks, one KPI framework"
  caption: "Each desk gets the same card: process efficiency, total tickets, closed within time, tickets closed and average resolution days."
  alt: "Dashboard page with a headline banner and gear artwork, a row of five filters, and four side-by-side desk cards, each with a percentage ring, a small trend line and four figures."
gallery:
  - src: "./page-2-tickets-overview.webp"
    title: "Tickets overview"
    caption: "Five headline KPIs, ticket status, monthly demand with a next-month estimate, cycle time by stage and a request type by priority heatmap."
    alt: "Long dashboard page with a row of five KPI cards, a status diagram around a central total, a bar chart of monthly tickets ending in a blue forecast bar, a three-step process diagram, a donut chart with three outcome rows, and an orange heatmap grid with totals."
  - src: "./page-3-internal-details.webp"
    title: "Internal details: technicians and ticket SLA"
    caption: "A ranked technician list with a radar for the selected technician, above a ticket table filtered by its four summary cards."
    alt: "Long dashboard page with a list of technician names beside a triangular radar chart and four figures, and below it a table of tickets with colored priority, status and SLA labels under four summary cards."
videos:
  - src: "/media/service-desk-analytics/highlight.mp4"
    label: "Highlight"
    title: "Service desk dashboard, highlight"
    duration: "42 s"
    poster: "./poster-highlight.webp"
    description: "The desk cards, date and department filters, status and demand, the heatmap, the technician radar and the ticket table."
  - src: "/media/service-desk-analytics/walkthrough.mp4"
    label: "Full walkthrough"
    title: "Service desk dashboard, full walkthrough"
    duration: "3 min 36 s"
    poster: "./poster-walkthrough.webp"
    description: "All three pages in nine captioned parts."
seo:
  description: "Power BI dashboards for four public-sector service desks on one Microsoft Fabric data model. Shown as a demo copy with synthetic data."
updated: 2026-10-13
---

## The problem

Four public-sector service desks needed SLA compliance, backlog and resolution time reported the same way, for executives and for the teams who run the desks.

## What I built

I designed executive and operational Power BI dashboards for the four desks, all on one Microsoft Fabric data model, so every page and every desk uses the same definitions. The original model has 55 DAX measures.

The demo copy has three pages. I rewrote its data model and its 46 measures for the demo.

## How it works

- **Microsoft Fabric.** One data model shared by all four desks.
- **Power BI.** Executive and operational dashboards, with custom visuals.
- **DAX.** 55 measures for SLA compliance, backlog and resolution time.

## What it shows

- **Landing page.** The same KPI card for each desk, so the desks are easy to compare.
- **Tickets overview.** Status, monthly demand, cycle time by stage, on-time completion and a request type by priority heatmap.
- **Internal details.** A technician ranking and a ticket SLA table.

<details class="more">
<summary>How to read the KPIs</summary>

A scored ticket has both a due time and an end time. Only scored tickets are judged against an SLA.

- **Total tickets.** Tickets in the current selection of dates, desks and filters.
- **Tickets closed.** Tickets whose status is Closed, Resolved or Cancelled.
- **Closed within time.** The share of scored tickets that ended at or before their due time. One hour late and one month late both count as a miss.
- **Process efficiency.** The average score of the same tickets. On time scores 100%. Late scores 100% minus 5 points for each day late, never below 0%.
- **Average resolution days.** Average days from creation to the end time, over tickets that have ended.
- **Within SLA, near breach, breached.** Ended on time with less than 80% of the allowed time used, on time with 80% or more used, or after the due time.
- **Forecast bar.** A rule-of-thumb estimate for next month from the months shown, not a statistical model.

### Process efficiency versus closed within time

Closed within time asks how many tickets made the deadline. Process efficiency asks how close to the deadline the desk ran overall.

In the demo's default view, 2,408 of 2,993 scored tickets ended on time, so closed within time is 80%. The other 585 were mostly late by a few days and still score about 84% on average, so process efficiency is 97%.

</details>
