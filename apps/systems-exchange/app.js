const systems = [
  { id: "WS-CONT-WF-001", title: "Chronicle Intelligence Monitor", type: "Workflow", domain: "Content OS", risk: "moderate", listing: "hold", outcome: "A prioritized research queue for Chronicle planning.", description: "Collects relevant AI, L&D, design, governance, and creator-economy developments for editorial review.", approval: "Select topics and approve source use", data: "Public", trigger: "Scheduled" },
  { id: "WS-CONT-AGT-002", title: "Chronicle Evidence Verifier", type: "Agent", domain: "Content OS", risk: "moderate", listing: "hold", outcome: "Source-backed editorial research with documented confidence.", description: "Checks claims, dates, source relevance, primary-source availability, and uncertainty before editorial use.", approval: "Approve final claims and citations", data: "Public", trigger: "Manual" },
  { id: "WS-CONT-WF-003", title: "Chronicle Issue Architect", type: "Workflow", domain: "Content OS", risk: "low", listing: "hold", outcome: "A reviewable issue brief aligned to Chronicle editorial formats.", description: "Turns approved research into a structured issue outline, hook, argument, and distribution plan.", approval: "Approve final issue and publication", data: "Internal", trigger: "Manual" },
  { id: "WS-CONT-WF-004", title: "Multi-Channel Repurposing System", type: "Workflow", domain: "Content OS", risk: "moderate", listing: "hold", outcome: "Consistent social and newsletter derivatives.", description: "Converts approved long-form content into channel-specific drafts and visual briefs.", approval: "Approve each external post", data: "Internal", trigger: "Event-based" },
  { id: "WS-DESIGN-AGT-001", title: "Visual Direction Agent", type: "Agent", domain: "Design OS", risk: "low", listing: "hold", outcome: "Consistent visual direction with reduced brand drift.", description: "Produces identity-locked image briefs and checks visual outputs against WenceStudio standards.", approval: "Approve final visual asset", data: "Internal", trigger: "Manual" },
  { id: "WS-LEARN-AGT-001", title: "Training Needs Analysis Agent", type: "Agent", domain: "Knowledge OS", risk: "high", listing: "internal_only", outcome: "A prioritized, evidence-based training diagnosis.", description: "Converts performance gaps, incident patterns, feedback, and requirements into a structured needs analysis.", approval: "Approve data use and recommendations", data: "Confidential", trigger: "Manual" },
  { id: "WS-LEARN-WF-002", title: "Learning Module Architect", type: "Workflow", domain: "Knowledge OS", risk: "moderate", listing: "hold", outcome: "A structured course blueprint ready for instructional review.", description: "Builds learning objectives, modular content, practice activities, assessments, and accessibility requirements.", approval: "Approve learning design and compliance requirements", data: "Internal", trigger: "Manual" },
  { id: "WS-LEARN-WF-003", title: "Training Feedback Intelligence Workflow", type: "Workflow", domain: "Knowledge OS", risk: "high", listing: "internal_only", outcome: "Evidence-backed recommendations for training improvements.", description: "Aggregates learner feedback, identifies themes, and produces a reviewable improvement report.", approval: "Approve distribution and recommendations", data: "Confidential", trigger: "Scheduled" },
  { id: "WS-GOV-AGT-002", title: "Training Compliance Review Gate", type: "Agent", domain: "Executive OS", risk: "high", listing: "internal_only", outcome: "A documented pre-release compliance review.", description: "Checks training assets for required statements, acknowledgments, versioning, approval status, and exceptions.", approval: "Approve release or exception", data: "Confidential", trigger: "Event-based" },
  { id: "WS-SALES-WF-001", title: "ICP Research and Qualification System", type: "Workflow", domain: "Sales OS", risk: "moderate", listing: "hold", outcome: "A prioritized prospect brief with evidence and uncertainty notes.", description: "Researches prospective organizations and scores fit against approved ideal-customer criteria.", approval: "Approve outreach list and messages", data: "Public", trigger: "Manual" },
  { id: "WS-BRAND-AGT-003", title: "Brand OS Discovery Agent", type: "Agent", domain: "Brand OS", risk: "high", listing: "internal_only", outcome: "A traceable discovery brief for a Brand OS engagement.", description: "Converts approved client intake into brand-system gaps, dependencies, recommendations, and delivery scope.", approval: "Approve client-facing scope", data: "Confidential", trigger: "Manual" },
  { id: "WS-DELIVERY-WF-001", title: "Client Onboarding Orchestrator", type: "Workflow", domain: "Client Delivery OS", risk: "high", listing: "internal_only", outcome: "A consistent, reviewable client onboarding package.", description: "Prepares client intake, project setup, milestones, approvals, responsibilities, and required documentation.", approval: "Approve client communication and project activation", data: "Confidential", trigger: "Event-based" }
];

const grid = document.querySelector("#catalogGrid");
const searchInput = document.querySelector("#searchInput");
const domainFilter = document.querySelector("#domainFilter");
const riskFilter = document.querySelector("#riskFilter");
const listingFilter = document.querySelector("#listingFilter");
const resultCount = document.querySelector("#resultCount");
const emptyState = document.querySelector("#emptyState");
const dialog = document.querySelector("#systemDialog");
const dialogClose = document.querySelector("#dialogClose");

const domains = [...new Set(systems.map(system => system.domain))].sort();
domains.forEach(domain => domainFilter.insertAdjacentHTML("beforeend", `<option value="${domain}">${domain}</option>`));
document.querySelector("#systemCount").textContent = systems.length;
document.querySelector("#domainCount").textContent = domains.length;

function listingLabel(value) {
  return value === "internal_only" ? "Internal only" : "Hold";
}
function label(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
function matches(system) {
  const query = searchInput.value.trim().toLowerCase();
  const searchable = [system.title, system.id, system.domain, system.type, system.outcome, system.description].join(" ").toLowerCase();
  return (!query || searchable.includes(query))
    && (domainFilter.value === "all" || system.domain === domainFilter.value)
    && (riskFilter.value === "all" || system.risk === riskFilter.value)
    && (listingFilter.value === "all" || system.listing === listingFilter.value);
}
function card(system) {
  return `<article class="system-card">
    <div class="card-meta">${system.id} | ${system.type} | ${system.domain}</div>
    <h3>${system.title}</h3>
    <p>${system.outcome}</p>
    <div class="card-footer">
      <span class="status">${listingLabel(system.listing)}</span>
      <button class="details-button" type="button" data-system-id="${system.id}">Review record</button>
    </div>
  </article>`;
}
function render() {
  const visible = systems.filter(matches);
  grid.innerHTML = visible.map(card).join("");
  resultCount.textContent = `${visible.length} of ${systems.length} systems shown`;
  emptyState.hidden = visible.length !== 0;
  grid.hidden = visible.length === 0;
}
function showDetails(id) {
  const system = systems.find(item => item.id === id);
  document.querySelector("#dialogMeta").textContent = `${system.id} | ${system.type} | ${system.domain}`;
  document.querySelector("#dialogTitle").textContent = system.title;
  document.querySelector("#dialogDescription").textContent = system.description;
  document.querySelector("#dialogDetails").innerHTML = [
    ["Outcome", system.outcome],
    ["Risk tier", label(system.risk)],
    ["Listing state", listingLabel(system.listing)],
    ["Data class", system.data],
    ["Trigger", system.trigger],
    ["Human approval", system.approval]
  ].map(([term, definition]) => `<dt>${term}</dt><dd>${definition}</dd>`).join("");
  dialog.showModal();
}
[searchInput, domainFilter, riskFilter, listingFilter].forEach(control => control.addEventListener("input", render));
grid.addEventListener("click", event => {
  const button = event.target.closest("[data-system-id]");
  if (button) showDetails(button.dataset.systemId);
});
document.querySelector("#clearFilters").addEventListener("click", () => {
  searchInput.value = "";
  domainFilter.value = "all";
  riskFilter.value = "all";
  listingFilter.value = "all";
  render();
});
dialogClose.addEventListener("click", () => dialog.close());
document.querySelector("#themeToggle").addEventListener("click", () => {
  const root = document.documentElement;
  const light = root.dataset.theme !== "light";
  root.dataset.theme = light ? "light" : "dark";
  document.querySelector("#themeToggle").textContent = light ? "Dark mode" : "Light mode";
  document.querySelector("#themeToggle").setAttribute("aria-label", light ? "Use dark theme" : "Use light theme");
});
render();
