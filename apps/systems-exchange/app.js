let systems = [];

const grid = document.querySelector("#catalogGrid");
const searchInput = document.querySelector("#searchInput");
const domainFilter = document.querySelector("#domainFilter");
const riskFilter = document.querySelector("#riskFilter");
const listingFilter = document.querySelector("#listingFilter");
const resultCount = document.querySelector("#resultCount");
const emptyState = document.querySelector("#emptyState");
const dialog = document.querySelector("#systemDialog");
const dialogClose = document.querySelector("#dialogClose");

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
function initializeCatalog(data) {
  systems = data.systems;
  const domains = [...new Set(systems.map(system => system.domain))].sort();
  domains.forEach(domain => domainFilter.insertAdjacentHTML("beforeend", `<option value="${domain}">${domain}</option>`));
  document.querySelector("#systemCount").textContent = systems.length;
  document.querySelector("#domainCount").textContent = domains.length;
  render();
}
async function loadCatalog() {
  try {
    const response = await fetch("./data/systems.json");
    if (!response.ok) throw new Error("Catalog data unavailable");
    initializeCatalog(await response.json());
  } catch (error) {
    resultCount.textContent = "Catalog data could not be loaded.";
    grid.hidden = true;
    emptyState.hidden = false;
    emptyState.querySelector("h3").textContent = "Catalog data is unavailable.";
    emptyState.querySelector("p").textContent = "Run the registry build step or open the deployed site.";
  }
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
loadCatalog();
