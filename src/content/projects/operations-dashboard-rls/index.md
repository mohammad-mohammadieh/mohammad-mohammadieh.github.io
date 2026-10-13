---
title: "Operations Dashboard with Row-Level Security"
order: 2
draft: false
status: "media"
summary: "A 10-page Power BI report on orders, SLA compliance, stock and consumption across 100+ sites, where each user sees only their own sites."
stack: ["Power BI", "Power BI Embedded"]
role: "built"
figures:
  - { value: "10", label: "report pages" }
  - { value: "70+", label: "measures" }
  - { value: "100+", label: "sites" }
  - { value: "1", label: "dynamic row-level-security role", scope: "shown" }
noteExtra: "The screens and video show my multi-site pantry operations dashboard design, a home page and nine content pages, as a demo copy on synthetic data for an invented organization, Quillhaven. Every pantry, department, person, order and figure on screen is synthetic."
mediaNote: "Recorded in Power BI Desktop from a local demo copy that reads local files and is not connected to any client system. The organization is invented and the data is synthetic, so the numbers on screen are generated, not real results. \"Live Dashboard\" and similar labels on screen are part of the page design. The row-level-security role is shown for a fake user, viewed with View as in Power BI Desktop. The videos were recorded in the editing view, so small hover icons and a selection outline appear in places. They are not part of the report."
cover:
  src: "./01-home-hero.webp"
  title: "Home: the executive landing page"
  caption: "Three headline figures and four section cards lead into the nine content pages."
  alt: "Dark green landing page titled \"Pantry Performance Executive Report\" with three KPI tiles and four white cards named Pantry Logs, Orders, Inventory and Staff Performance."
gallery:
  - src: "./02-pantry-logs.webp"
    title: "Pantry Logs"
    caption: "One row per pantry with its latest lunch break, the lunch-limit breaches as one square per pantry, and how many pantries are on break through the day."
    alt: "Dashboard page with four KPI cards, a table of pantries with green and red status labels, a grid of green and red squares, and an area chart peaking around midday."
  - src: "./03-orders.webp"
    title: "Orders"
    caption: "Delivered orders against the SLA target: a compliance ring, the monthly trend, order size mix, demand by day and hour, the order-to-delivery stages, volume against SLA per pantry and orders by department."
    alt: "Dashboard page with four KPI cards with small trend lines, a percentage ring, a line chart, a donut, a green heatmap, a three-step arrow diagram, a scatter chart and a treemap."
  - src: "./04-wrong-orders.webp"
    title: "Wrong Orders"
    caption: "Wrong-order reports by handling status, a Pareto of reasons, each reason month by month, and the report list."
    alt: "Dashboard page with four KPI cards, a segmented status bar, a bar chart with a rising cumulative line, six small area charts and a table with status labels."
  - src: "./05-order-transactions.webp"
    title: "Order Transactions"
    caption: "Share of orders inside target by order size, delivered orders by pantry and month with totals, and the order lines."
    alt: "Dashboard page with four KPI cards, three red bars with target markers, a green matrix of monthly counts with a total column, and a long table of order lines."
  - src: "./06-raw-items.webp"
    title: "Inventory: Raw Items"
    caption: "Stock above minimum per category shown as batteries, the pantries to restock first, and stock levels per pantry and item."
    alt: "Dashboard page with four KPI cards, seven battery shapes filled amber or green, a board of red, amber and green tiles with counts, and a table with stock status labels."
  - src: "./07-finished-items.webp"
    title: "Inventory: Finished Items"
    caption: "The menu as one square per item by category, the most ordered items, and the menu catalogue."
    alt: "Dashboard page with four KPI cards, colored squares with a category legend, six ranked horizontal bars and a table of menu items."
  - src: "./08-stock-transactions.webp"
    title: "Inventory: Stock Transactions"
    caption: "Stock movements per week stacked by type, a flow from movement type to recorded reason, and the movement log."
    alt: "Dashboard page with four KPI cards, a stacked area chart across seven months, a flow diagram from three movement types to ten reasons, and a table of movements."
  - src: "./09-staff-output.webp"
    title: "Staff Performance: Output"
    caption: "Who delivered the most orders, who is furthest below the SLA target, and a scorecard with on-time shares per phase."
    alt: "Dashboard page with four KPI cards, a three-step podium with names, red bars measured against a target line, and a table with small progress bars."
  - src: "./10-logging-sessions.webp"
    title: "Staff Performance: Logging Sessions"
    caption: "Late logins and early logouts by weekday, a calendar of late logins, and the session list."
    alt: "Dashboard page with four KPI cards, a two-sided bar chart by weekday, a calendar grid in shades of green and a table with on-time and left-early labels."
  - src: "./11-orders-chart-summary-switch.webp"
    title: "Orders: the Chart / Summary switch, in Summary"
    caption: "The scatter card on Orders can switch from the chart to a summary: four quadrant counts and the list of pantries that are busy and off target."
    alt: "Card titled \"Volume against SLA, by pantry\" with a Chart / Summary toggle set to Summary, four colored count tiles and a ranked list of seven pantries with order counts and percentages."
  - src: "./12-rls-no-role-all-pantries.webp"
    title: "Row-level security, before: no role"
    caption: "Pantry Logs with no role applied: 100 pantries, 13 breaches, supervisors of every site in the table."
    alt: "Pantry Logs page showing 100 total pantries, a table listing pantries with several different supervisor names, and a grid of 100 squares."
  - src: "./13-rls-viewed-as-supervisor.webp"
    title: "Row-level security, after: viewed as one supervisor"
    caption: "The same page viewed as the Supervisor role for one fake supervisor: 8 pantries, 3 breaches, and only her pantries in the table."
    alt: "Pantry Logs page showing 8 total pantries, a table of eight rows all with the same supervisor name, and a grid of eight squares."
videos:
  - src: "/media/operations-dashboard-rls/highlight.mp4"
    label: "Highlight"
    title: "Pantry operations dashboard, highlight"
    duration: "38 s"
    poster: "./poster-highlight.webp"
    description: "Home, Orders, the Chart / Summary switch, a slicer changing the numbers, Stock Transactions, Staff Output, and Home with no role followed by Home and Pantry Logs viewed as a supervisor."
  - src: "/media/operations-dashboard-rls/walkthrough.mp4"
    label: "Full walkthrough"
    title: "Pantry operations dashboard, full walkthrough"
    duration: "4 min 39 s"
    poster: "./poster-walkthrough.webp"
    description: "All ten pages in twelve captioned parts, with a treemap cross-filter, the Chart / Summary switch and the Order Size slicer changing the KPIs, then row-level security: Home with no role, and Home, Pantry Logs and Orders viewed as one supervisor."
seo:
  title: "Operations Dashboard with RLS | Mohammad Mohammadieh"
  description: "A 10-page Power BI report across 100+ sites, with row-level security limiting each user to their own sites. Shown with synthetic data."
updated: 2026-10-13
---

## The problem

Orders, SLA compliance, stock and consumption had to be reported across 100+ sites, to users who should each see only their own sites.

## What I built

I built a 10-page Power BI report with 70+ measures for orders, SLA compliance, stock and consumption. Row-level security limits each user to their own sites.

What is shown on this page is that dashboard design as a demo copy: a home page and nine content pages, on synthetic data for an invented organization. The Home page, header, navigation and filter panel are my design. Below the header and navigation, each content page was modernized with four KPI cards and custom visuals built for this copy. One dynamic row-level-security role limits a supervisor to their own pantries. The copy loads from local files in Power BI Desktop and is not connected to any client system.

## How it works

- **Power BI.** One 10-page report with 70+ measures.
- **Row-level security.** Each user is limited to their own sites, out of 100+.
- **The demo copy.** A home page and nine content pages on generated data in local files, with one dynamic row-level-security role. The role is demonstrated for a fake user, viewed with View as in Power BI Desktop.

<!-- TEXT: nothing is said here about how or where the report is embedded. Add a line only if Mohammad supplies one. -->

## What it shows

- **Home.** Three headline figures and four section cards that lead into the nine content pages.
- **Pantry Logs.** Which pantries went over the lunch limit, and how many are on break through the day.
- **Orders.** Whether delivered orders meet the SLA target, by month, order size, day and hour, pantry and department. One card switches between a chart and a summary.
- **Wrong Orders.** What goes wrong, how often, and how each report is being handled.
- **Order Transactions.** The share of orders inside target by order size, delivered orders by pantry and month, and the order lines.
- **Inventory.** Raw Items: which categories and pantries to restock first. Finished Items: the menu and the most ordered items. Stock Transactions: stock movements by type and recorded reason.
- **Staff Performance.** Output: who delivered the most orders and who is furthest below the SLA target. Logging Sessions: late logins and early logouts.
- **Per-user view.** The same Pantry Logs page with no role applied shows 100 pantries. Viewed as one fake supervisor it shows 8, and only her pantries in the table. These figures come from generated data.
