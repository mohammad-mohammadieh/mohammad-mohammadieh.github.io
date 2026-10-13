---
title: "Operations Dashboard with Row-Level Security"
order: 2
draft: false
status: "media"
summary: "A 10-page Power BI report on orders, SLA compliance, stock and consumption across 100+ sites, where each user sees only their own sites."
stack: ["Power BI", "Power BI Embedded"]
role: "built"
roleDetail: "Report design, measures, row-level security, custom visuals"
figures:
  - { value: "10", label: "report pages" }
  - { value: "70+", label: "measures" }
  - { value: "100+", label: "sites" }
mediaNote: "Recorded in Power BI Desktop's editing view, so small hover icons and a selection outline appear in the videos."
cover:
  src: "./01-home-hero.webp"
  title: "Home: the executive landing page"
  caption: "Three headline figures and four section cards lead into the nine content pages."
  alt: "Dark green landing page titled \"Pantry Performance Executive Report\" with three KPI tiles and four white cards named Pantry Logs, Orders, Inventory and Staff Performance."
gallery:
  - src: "./02-pantry-logs.webp"
    title: "Pantry Logs"
    caption: "Each pantry's latest lunch break, the lunch-limit breaches, and how many pantries are on break through the day."
    alt: "Dashboard page with four KPI cards, a table of pantries with green and red status labels, a grid of green and red squares, and an area chart peaking around midday."
  - src: "./03-orders.webp"
    title: "Orders"
    caption: "Delivered orders against the SLA target: monthly trend, order size, day and hour, delivery stages, pantry and department."
    alt: "Dashboard page with four KPI cards with small trend lines, a percentage ring, a line chart, a donut, a green heatmap, a three-step arrow diagram, a scatter chart and a treemap."
  - src: "./04-wrong-orders.webp"
    title: "Wrong Orders"
    caption: "Wrong-order reports by handling status, a Pareto of reasons and each reason month by month."
    alt: "Dashboard page with four KPI cards, a segmented status bar, a bar chart with a rising cumulative line, six small area charts and a table with status labels."
  - src: "./05-order-transactions.webp"
    title: "Order Transactions"
    caption: "Share of orders inside target by order size, and delivered orders by pantry and month."
    alt: "Dashboard page with four KPI cards, three red bars with target markers, a green matrix of monthly counts with a total column, and a long table of order lines."
  - src: "./06-raw-items.webp"
    title: "Inventory: Raw Items"
    caption: "Stock above minimum per category, and the pantries to restock first."
    alt: "Dashboard page with four KPI cards, seven battery shapes filled amber or green, a board of red, amber and green tiles with counts, and a table with stock status labels."
  - src: "./07-finished-items.webp"
    title: "Inventory: Finished Items"
    caption: "The menu by category and the most ordered items."
    alt: "Dashboard page with four KPI cards, colored squares with a category legend, six ranked horizontal bars and a table of menu items."
  - src: "./08-stock-transactions.webp"
    title: "Inventory: Stock Transactions"
    caption: "Weekly stock movements by type, and a flow from movement type to recorded reason."
    alt: "Dashboard page with four KPI cards, a stacked area chart across seven months, a flow diagram from three movement types to ten reasons, and a table of movements."
  - src: "./09-staff-output.webp"
    title: "Staff Performance: Output"
    caption: "Who delivered the most orders and who is furthest below the SLA target."
    alt: "Dashboard page with four KPI cards, a three-step podium with names, red bars measured against a target line, and a table with small progress bars."
  - src: "./10-logging-sessions.webp"
    title: "Staff Performance: Logging Sessions"
    caption: "Late logins and early logouts by weekday, with a calendar of late logins."
    alt: "Dashboard page with four KPI cards, a two-sided bar chart by weekday, a calendar grid in shades of green and a table with on-time and left-early labels."
  - src: "./11-orders-chart-summary-switch.webp"
    title: "Orders: the Chart / Summary switch, in Summary"
    caption: "The scatter card switches to a summary: four quadrant counts and the pantries that are busy and off target."
    alt: "Card titled \"Volume against SLA, by pantry\" with a Chart / Summary toggle set to Summary, four colored count tiles and a ranked list of seven pantries with order counts and percentages."
  - src: "./12-rls-no-role-all-pantries.webp"
    title: "Row-level security, before: no role"
    caption: "No role applied: 100 pantries, 13 breaches, every supervisor in the table."
    alt: "Pantry Logs page showing 100 total pantries, a table listing pantries with several different supervisor names, and a grid of 100 squares."
  - src: "./13-rls-viewed-as-supervisor.webp"
    title: "Row-level security, after: viewed as one supervisor"
    caption: "Viewed as one supervisor: 8 pantries, 3 breaches, only her pantries in the table."
    alt: "Pantry Logs page showing 8 total pantries, a table of eight rows all with the same supervisor name, and a grid of eight squares."
videos:
  - src: "/media/operations-dashboard-rls/highlight.mp4"
    label: "Highlight"
    title: "Pantry operations dashboard, highlight"
    duration: "38 s"
    poster: "./poster-highlight.webp"
    description: "Home, Orders, the Chart / Summary switch, a slicer, stock and staff output, then the report viewed as one supervisor."
  - src: "/media/operations-dashboard-rls/walkthrough.mp4"
    label: "Full walkthrough"
    title: "Pantry operations dashboard, full walkthrough"
    duration: "4 min 39 s"
    poster: "./poster-walkthrough.webp"
    description: "All ten pages in twelve captioned parts, with cross-filtering and slicers, then row-level security viewed as one supervisor."
seo:
  title: "Operations Dashboard with RLS | Mohammad Mohammadieh"
  description: "A 10-page Power BI report across 100+ sites, with row-level security limiting each user to their own sites. Shown with synthetic data."
updated: 2026-10-13
---

## The problem

Orders, SLA compliance, stock and consumption had to be reported across 100+ sites, to users who should each see only their own sites.

## What I built

I built a 10-page Power BI report with 70+ measures. Row-level security limits each user to their own sites. The Home page, header, navigation and filter panel are my design, and each content page has four KPI cards and custom visuals.

## How it works

- **Power BI.** One report, 10 pages, 70+ measures.
- **Row-level security.** One dynamic role limits a supervisor to their own pantries. It is shown here with View as in Power BI Desktop.

<!-- TEXT: nothing is said here about how or where the report is embedded. Add a line only if Mohammad supplies one. -->

## What it shows

- **Home.** Headline figures and section cards that lead into nine content pages.
- **Pantry Logs.** Lunch-limit breaches, and how many pantries are on break through the day.
- **Orders.** SLA compliance by month, order size, day and hour, pantry and department, plus wrong orders and order lines.
- **Inventory.** What to restock first, the most ordered items, and stock movements by reason.
- **Staff Performance.** Output against the SLA target, late logins and early logouts.
- **Per-user view.** With no role, Pantry Logs shows 100 pantries. Viewed as one supervisor, it shows 8.
