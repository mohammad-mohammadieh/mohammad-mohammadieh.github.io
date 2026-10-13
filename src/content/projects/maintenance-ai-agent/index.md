---
title: "Industrial Maintenance AI Agent"
order: 4
draft: false
status: "media"
summary: "A demo in which an AI agent investigates equipment faults from sensor data, drafts maintenance work packs and routes them for approval."
stack: ["Copilot Studio", "Power Apps", "Fabric KQL"]
role: "built"
figures:
  - { value: "200+", label: "automated tests" }
noteExtra: "What is shown is a demonstration on synthetic data, recorded from a rehearsal run. The facility, equipment, people, documents and telemetry are fictional or simulated, and the system is not connected to a real plant."
mediaNote: "A demonstration on synthetic data, recorded from a rehearsal run and not connected to a real plant. Nothing shown is an operating instruction for real equipment. Approvals in this run were given by the demonstration's automatic reviewers, which stand in for a supervisor and an HSE reviewer. The agent's answers are generated, so the wording differs from run to run."
cover:
  src: "./01-hero-plant-3d-pump-selected.webp"
  title: "3D plant view with a pump selected"
  caption: "The 3D model of the fictional site with pump P-204 selected, showing its live readings, connected equipment and the drawings that contain it. This is the pump the agent later handles."
  alt: "Close 3D view of a pump and motor on a skid with pipework and tag labels; a side panel lists vibration, bearing temperature, seal leakage and pressures for P-204, its connected equipment and four linked drawings."
gallery:
  - src: "./02-operations-overview.webp"
    title: "Operations overview"
    caption: "The home page before the fault: 42 monitored assets, no open incidents, a plant health index of 98 out of 100, a plot plan of the site and an operating log."
    alt: "Dashboard with a greeting, three large figures (42 monitored assets, 0 open incidents, plant health index 98 of 100), a schematic plot plan with eight labeled areas, an empty incidents panel and a list of recent maintenance entries."
  - src: "./03-asset-telemetry-trend.webp"
    title: "Asset record and telemetry trends"
    caption: "The record for pump P-204 with one-hour trends of vibration, bearing temperature and seal leakage against their watch and warning levels. The telemetry is simulated."
    alt: "Asset page headed P-204 Condensate Booster Pump A with status Normal and health 100, tabs for overview, trends, events and more, and three stacked line charts with dashed watch and warning limit lines."
  - src: "./04-document-library.webp"
    title: "Engineering library"
    caption: "The library of synthetic drawings and controlled documents, here filtered to the nine piping and instrumentation diagrams."
    alt: "Library page with a search box, tabs showing 30 drawings and 54 documents, a type filter set to P&ID, and nine blueprint-style drawing thumbnails with titles and revision details."
  - src: "./05-drawing-pid-viewer.webp"
    title: "Drawing viewer"
    caption: "A synthetic piping and instrumentation diagram of the booster pumps with P-204 selected, the tags on the sheet listed beside it and a note that it is a demonstration drawing."
    alt: "Blueprint-style diagram showing two pumps with motors, valves, instruments and line numbers, with pump P-204 outlined; a side panel lists equipment, valve, instrument and line tags and numbered notes beginning \"Synthetic demonstration drawing\"."
  - src: "./06-fault-detected-incident-opened.webp"
    title: "Fault detected, incident opened"
    caption: "After a seal fault is simulated on P-204, the operating log shows the condition worsening and the agent reports that it has detected an abnormal condition and opened an incident."
    alt: "Operations page now showing 1 open incident, a log of condition changes from healthy to watch, warning and high, and a pop-up in the corner titled \"Copilot detected an abnormal condition\" with a button to investigate."
  - src: "./07-agent-investigation.webp"
    title: "The agent explains a failing pump"
    caption: "Asked what happened to pump P-204, the agent answers with live readings, the detection rule that fired, the causes it considered and its sources, next to the incident record it opened."
    alt: "Dark portal screen split in two: on the left an incident record for pump P-204 with a seven-step progress tracker, a table of signals at detection and a readiness checklist; on the right a chat panel with a structured answer listing readings, trends, findings and sources, and a card asking whether to prepare the work pack."
  - src: "./08-agent-guardrail.webp"
    title: "A question the agent will not answer from memory"
    caption: "Asked for a bolt torque, the agent says the value is controlled information that is not in the extracts it can read, and names the controlled documents it must be taken from."
    alt: "Chat panel in which the user asks what torque to use on the seal gland bolts and the reply states that the torque specification is controlled information, not listed explicitly, and points to a maintenance procedure and a pump manual with source references."
  - src: "./09-agent-work-pack-draft.webp"
    title: "Drafted work pack"
    caption: "The agent drafts a maintenance work pack from the records, marked as a draft that needs engineering approval, and summarizes its scope, parts and key documents."
    alt: "On the left a paper-styled document titled Maintenance Work Pack with a yellow banner reading \"Draft, Copilot prepared, engineering approval required\" and tables of work pack and asset details; on the right the agent's summary of 13 steps and 10.5 estimated hours and a card offering to send it for approval."
  - src: "./10-approval-human-review.webp"
    title: "Approval is a human decision"
    caption: "The work pack waits for a supervisor review and then an HSE review. In this recording the demonstration's automatic reviewers stand in for those people."
    alt: "Cropped chat panel showing the work pack submitted for approval, a card headed \"Waiting for people\" with a supervisor review marked approved by automatic review in presentation mode and an HSE review awaiting review."
  - src: "./11-work-order-released-permit.webp"
    title: "Work order released, permit to work"
    caption: "After approval the work order is released with parts reserved and a fictional crew assigned, and the agent asks the engineer to record the permit to work before execution can start."
    alt: "Work order page for a mechanical seal replacement on P-204 with status Released, a progress tracker at Execution and three crew members; beside it a card listing permit roles with two ticked confirmations for isolation and gas test and a Record permit button."
  - src: "./12-recovery-verified.webp"
    title: "Recovery verified from telemetry"
    caption: "After the repair is recorded, vibration, bearing temperature and seal leakage are back in the normal range and the agent asks the engineer whether to close the incident."
    alt: "Incident page with status \"Recovery verified, ready to close\", three trend charts that rise at detection and fall back after the repair, and a chat card reading \"Recovery verified, close the incident?\" with a Close incident button."
  - src: "./13-case-closed-record.webp"
    title: "Closed case and closure record"
    caption: "The incident is closed on the engineer's confirmation, with a closure record covering the issue, actions, root cause, parts, approvals and work order, and before and after readings in the agent's summary."
    alt: "Incident page with all seven tracker steps ticked and status Closed, a closure record with a maintenance summary and a table of details, and a chat panel stating the incident is now closed with closure details and a button to download the case report."
  - src: "./14-event-journal.webp"
    title: "The whole case in the event journal"
    caption: "The event journal for P-204 lists the run from the start of the demo scenario through condition changes, the incident, work pack, approvals, work order and verified recovery to closure."
    alt: "Table of timestamped events for pump P-204 with type and severity columns, newest first: the incident closed at the top, down through recovery, work order, approvals, work pack and condition changes to \"Demo scenario: P-204 mechanical seal leak starting\", followed by earlier maintenance records."
videos:
  - src: "/media/maintenance-ai-agent/highlight.mp4"
    label: "Highlight"
    title: "Industrial maintenance AI agent, highlight"
    duration: "42 s"
    poster: "./poster-highlight.webp"
    description: "A short cut of the recording, from the portal to detection, investigation, guardrail, work pack, approval, release, recovery and closure."
  - src: "/media/maintenance-ai-agent/walkthrough.mp4"
    label: "Full walkthrough"
    title: "Industrial maintenance AI agent, full walkthrough"
    duration: "4 min 12 s"
    poster: "./poster-walkthrough.webp"
    description: "A tour of the portal, then the full scenario with captions, from the fault appearing to the closed case and its records. Waiting time while the agent works is cut, and two stretches are sped up."
seo:
  description: "A Copilot Studio demo: an AI agent investigates equipment faults, drafts maintenance work packs and routes them for approval. Synthetic data."
updated: 2026-10-13
---

## The problem

When equipment faults, someone has to read the sensor data, work out what happened, write up the maintenance work and get it approved. This demo shows an AI agent taking on those steps.

## What I built

I built a customer demo in which an AI agent investigates equipment faults from sensor data, drafts maintenance work packs and routes them for approval. It runs on synthetic data and was verified by 200+ automated tests.

The demonstration is an industrial operations and maintenance portal with an embedded AI maintenance agent, built on Microsoft Power Apps, Dataverse, Power Automate, Copilot Studio and Fabric. In the scenario shown, the agent notices a simulated mechanical seal fault on a pump, investigates it with evidence from telemetry, maintenance records and documents, drafts a work pack, waits for approval, releases the work order, verifies recovery from telemetry and closes the case when the engineer confirms.

## How it works

- **Copilot Studio.** The AI maintenance agent. Its answers are generated, so the wording differs from run to run.
- **Platform.** Microsoft Power Apps, Dataverse, Power Automate, Copilot Studio and Fabric.
- **Detection.** Fixed rules, not predictive AI.
- **Approval.** A human decision. The work pack waits for a supervisor review and then an HSE review.
- **Synthetic data.** The facility, equipment, people, documents and telemetry are fictional or simulated.
- **Automated tests.** 200+ tests verify the demo.

## What it shows

1. **Detect.** After a seal fault is simulated on a pump, the agent reports an abnormal condition and opens an incident.
2. **Investigate.** Asked what happened, it answers with live readings, the detection rule that fired, the causes it considered and its sources.
3. **Guardrail.** Asked for a bolt torque, it says the value is controlled information and names the documents it must be taken from.
4. **Draft.** It drafts a maintenance work pack, marked as a draft that needs engineering approval.
5. **Wait for approval.** The work pack waits for a supervisor review and an HSE review.
6. **Release.** The work order is released, and the permit to work is recorded before execution starts.
7. **Verify and close.** Recovery is verified from telemetry, and the incident is closed when the engineer confirms.
