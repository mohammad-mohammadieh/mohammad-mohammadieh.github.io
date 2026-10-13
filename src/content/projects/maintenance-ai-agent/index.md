---
title: "Industrial Maintenance AI Agent"
order: 4
draft: false
status: "media"
summary: "A demo in which an AI agent investigates equipment faults from sensor data, drafts maintenance work packs and routes them for approval."
stack: ["Copilot Studio", "Power Apps", "Fabric KQL"]
role: "built"
roleDetail: "Demo build: portal, AI agent, automated tests"
figures:
  - { value: "200+", label: "automated tests" }
cover:
  src: "./01-hero-plant-3d-pump-selected.webp"
  title: "3D plant view with a pump selected"
  caption: "Pump P-204 selected in the 3D model, with its live readings, connected equipment and linked drawings."
  alt: "Close 3D view of a pump and motor on a skid with pipework and tag labels; a side panel lists vibration, bearing temperature, seal leakage and pressures for P-204, its connected equipment and four linked drawings."
gallery:
  - src: "./02-operations-overview.webp"
    title: "Operations overview"
    caption: "Before the fault: 42 monitored assets, no open incidents and a plant health index of 98 out of 100."
    alt: "Dashboard with a greeting, three large figures (42 monitored assets, 0 open incidents, plant health index 98 of 100), a schematic plot plan with eight labeled areas, an empty incidents panel and a list of recent maintenance entries."
  - src: "./03-asset-telemetry-trend.webp"
    title: "Asset record and telemetry trends"
    caption: "One-hour trends of vibration, bearing temperature and seal leakage against their watch and warning levels."
    alt: "Asset page headed P-204 Condensate Booster Pump A with status Normal and health 100, tabs for overview, trends, events and more, and three stacked line charts with dashed watch and warning limit lines."
  - src: "./04-document-library.webp"
    title: "Engineering library"
    caption: "Drawings and controlled documents, filtered here to the nine piping and instrumentation diagrams."
    alt: "Library page with a search box, tabs showing 30 drawings and 54 documents, a type filter set to P&ID, and nine blueprint-style drawing thumbnails with titles and revision details."
  - src: "./05-drawing-pid-viewer.webp"
    title: "Drawing viewer"
    caption: "A piping and instrumentation diagram of the booster pumps, with P-204 selected and its tags listed."
    alt: "Blueprint-style diagram showing two pumps with motors, valves, instruments and line numbers, with pump P-204 outlined; a side panel lists equipment, valve, instrument and line tags and numbered notes beginning \"Synthetic demonstration drawing\"."
  - src: "./06-fault-detected-incident-opened.webp"
    title: "Fault detected, incident opened"
    caption: "A seal fault starts on P-204. The agent reports an abnormal condition and opens an incident."
    alt: "Operations page now showing 1 open incident, a log of condition changes from healthy to watch, warning and high, and a pop-up in the corner titled \"Copilot detected an abnormal condition\" with a button to investigate."
  - src: "./07-agent-investigation.webp"
    title: "The agent explains a failing pump"
    caption: "Asked what happened, the agent answers with live readings, the rule that fired, the causes it considered and its sources."
    alt: "Dark portal screen split in two: on the left an incident record for pump P-204 with a seven-step progress tracker, a table of signals at detection and a readiness checklist; on the right a chat panel with a structured answer listing readings, trends, findings and sources, and a card asking whether to prepare the work pack."
  - src: "./08-agent-guardrail.webp"
    title: "A question the agent will not answer from memory"
    caption: "Asked for a bolt torque, the agent says the value is controlled information and names the documents to take it from."
    alt: "Chat panel in which the user asks what torque to use on the seal gland bolts and the reply states that the torque specification is controlled information, not listed explicitly, and points to a maintenance procedure and a pump manual with source references."
  - src: "./09-agent-work-pack-draft.webp"
    title: "Drafted work pack"
    caption: "A maintenance work pack drafted from the records, marked as needing engineering approval."
    alt: "On the left a paper-styled document titled Maintenance Work Pack with a yellow banner reading \"Draft, Copilot prepared, engineering approval required\" and tables of work pack and asset details; on the right the agent's summary of 13 steps and 10.5 estimated hours and a card offering to send it for approval."
  - src: "./10-approval-human-review.webp"
    title: "Approval is a human decision"
    caption: "The work pack waits for a supervisor review, then an HSE review. In this recording automatic reviewers stand in for those people."
    alt: "Cropped chat panel showing the work pack submitted for approval, a card headed \"Waiting for people\" with a supervisor review marked approved by automatic review in presentation mode and an HSE review awaiting review."
  - src: "./11-work-order-released-permit.webp"
    title: "Work order released, permit to work"
    caption: "The work order is released with parts reserved and a crew assigned. The permit to work is recorded before execution starts."
    alt: "Work order page for a mechanical seal replacement on P-204 with status Released, a progress tracker at Execution and three crew members; beside it a card listing permit roles with two ticked confirmations for isolation and gas test and a Record permit button."
  - src: "./12-recovery-verified.webp"
    title: "Recovery verified from telemetry"
    caption: "After the repair the readings are back in the normal range, and the agent asks whether to close the incident."
    alt: "Incident page with status \"Recovery verified, ready to close\", three trend charts that rise at detection and fall back after the repair, and a chat card reading \"Recovery verified, close the incident?\" with a Close incident button."
  - src: "./13-case-closed-record.webp"
    title: "Closed case and closure record"
    caption: "Closed on the engineer's confirmation, with a record of the issue, actions, root cause, parts and approvals."
    alt: "Incident page with all seven tracker steps ticked and status Closed, a closure record with a maintenance summary and a table of details, and a chat panel stating the incident is now closed with closure details and a button to download the case report."
  - src: "./14-event-journal.webp"
    title: "The whole case in the event journal"
    caption: "The whole run for P-204, from the first condition change to closure."
    alt: "Table of timestamped events for pump P-204 with type and severity columns, newest first: the incident closed at the top, down through recovery, work order, approvals, work pack and condition changes to \"Demo scenario: P-204 mechanical seal leak starting\", followed by earlier maintenance records."
videos:
  - src: "/media/maintenance-ai-agent/highlight.mp4"
    label: "Highlight"
    title: "Industrial maintenance AI agent, highlight"
    duration: "42 s"
    poster: "./poster-highlight.webp"
    description: "Detection, investigation, guardrail, work pack, approval, release, recovery and closure."
  - src: "/media/maintenance-ai-agent/walkthrough.mp4"
    label: "Full walkthrough"
    title: "Industrial maintenance AI agent, full walkthrough"
    duration: "4 min 12 s"
    poster: "./poster-walkthrough.webp"
    description: "A tour of the portal, then the full scenario with captions. Waiting time is cut and two stretches are sped up."
seo:
  description: "A Copilot Studio demo: an AI agent investigates equipment faults, drafts maintenance work packs and routes them for approval. Synthetic data."
updated: 2026-10-13
---

## The problem

When equipment faults, someone has to read the sensor data, work out what happened, write up the maintenance work and get it approved. This demo shows an AI agent taking on those steps.

## What I built

I built a customer demo: an operations and maintenance portal with an embedded AI agent, verified by 200+ automated tests. It is not connected to a real plant.

## How it works

- **Platform.** Power Apps, Dataverse, Power Automate, Copilot Studio and Fabric.
- **Agent.** Copilot Studio. Its answers are generated, so the wording differs from run to run.
- **Detection.** Fixed rules, not predictive AI.
- **Approval.** A human decision: a supervisor review, then an HSE review.

## What it shows

1. **Detect.** A seal fault starts on a pump. The agent reports it and opens an incident.
2. **Investigate.** It answers with live readings, the rule that fired, the causes it considered and its sources.
3. **Guardrail.** Asked for a bolt torque, it names the controlled documents the value must come from.
4. **Draft.** It drafts a maintenance work pack, marked as needing engineering approval.
5. **Approve and release.** After both reviews the work order is released, and the permit to work is recorded.
6. **Verify and close.** Recovery is verified from telemetry, and the engineer confirms closure.
