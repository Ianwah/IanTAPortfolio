const pipelineContentZh = [
  { label: "STEP 01", title: "程序化資產與瑕疵工具", body: "輸送帶尺寸與重複結構集中為可調參數；同一個 Geometry Nodes Modifier 管理 Clean、Scratch、MissingPart 三種狀態。", bullets: ["Geometry Nodes 模組化結構", "Seeded defect parameters", "Boolean Difference 真實凹槽"] },
  { label: "STEP 02", title: "Reference 驅動的 OpenUSD 組裝", body: "設備、工件、相機與燈光維持獨立資產；總場景以 Reference 組裝，並透過 defectState Variant 管理 Clean 與 MissingPart。", bullets: ["Non-destructive references", "Meters per unit: 1 · Z-up", "Clean / MissingPart variant"] },
  { label: "STEP 03", title: "Omniverse 場景驗證", body: "在 Omniverse Kit 中驗證 Stage hierarchy、資產 Reference、相機構圖、材質、照明與 Variant 切換。", bullets: ["Semantic Prim hierarchy", "Camera / lighting review", "Variant state validation"] },
  { label: "STEP 04", title: "固定 Seed 的批次生成", body: "Blender Python 在獨立 Capture 場景執行 domain randomization，以 master seed 控制每個 frame 的幾何與拍攝設定。", bullets: ["Workpiece & camera jitter", "Key / Fill intensity", "EEVEE batch render"] },
  { label: "STEP 05", title: "配對輸出與自動 QA", body: "每張 640×480 RGB PNG 都有同名 JSON label，並檢查數量、配對、類別分布、範圍、影像品質與可重現性。", bullets: ["50 RGB + 50 JSON", "Statistics & contact sheet", "PASS · 0 issues"] }
];

const pipelineContentEn = [
  { label: "STEP 01", title: "Procedural assets and defect tools", body: "Conveyor dimensions and repeating structures are exposed as parameters, while one Geometry Nodes modifier manages Clean, Scratch and MissingPart states.", bullets: ["Modular Geometry Nodes structure", "Seeded defect parameters", "True Boolean Difference grooves"] },
  { label: "STEP 02", title: "Reference-driven OpenUSD assembly", body: "Equipment, workpieces, cameras and lights remain independent assets. The master stage assembles them through References and manages Clean and MissingPart through the defectState Variant.", bullets: ["Non-destructive references", "Meters per unit: 1 · Z-up", "Clean / MissingPart variant"] },
  { label: "STEP 03", title: "Omniverse scene validation", body: "Omniverse Kit is used to validate the stage hierarchy, asset References, camera framing, materials, lighting and Variant switching.", bullets: ["Semantic Prim hierarchy", "Camera / lighting review", "Variant state validation"] },
  { label: "STEP 04", title: "Fixed-seed batch generation", body: "Blender Python runs domain randomization in a dedicated capture scene, with a master seed controlling geometry and capture settings for every frame.", bullets: ["Workpiece & camera jitter", "Key / Fill intensity", "EEVEE batch render"] },
  { label: "STEP 05", title: "Paired output and automated QA", body: "Every 640×480 RGB PNG has a matching JSON label. Automated checks cover counts, pairing, class distribution, parameter bounds, image quality and reproducibility.", bullets: ["50 RGB + 50 JSON", "Statistics & contact sheet", "PASS · 0 issues"] }
];

const isEnglish = document.documentElement.lang === "en";
const pipelineContent = isEnglish ? pipelineContentEn : pipelineContentZh;

const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const pipelineTabs = [...document.querySelectorAll("[data-pipeline]")];
const pipelineDetail = document.querySelector("[data-pipeline-detail]");
const dialog = document.querySelector("[data-lightbox-dialog]");
const sectionNavLinks = [...document.querySelectorAll("[data-section-nav]")];
const trackedSections = sectionNavLinks.map(link => ({ link, section: document.getElementById(link.dataset.sectionNav) }));

const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 12);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const updateSectionProgress = () => {
  const readingLine = window.scrollY + window.innerHeight * 0.36;
  let activeIndex = -1;
  trackedSections.forEach((item, index) => {
    if (item.section && item.section.offsetTop <= readingLine) activeIndex = index;
  });
  trackedSections.forEach((item, index) => {
    const active = index === activeIndex;
    item.link.classList.toggle("is-active", active);
    item.link.classList.toggle("is-passed", index < activeIndex);
    if (active) item.link.setAttribute("aria-current", "location");
    else item.link.removeAttribute("aria-current");
  });
};
updateSectionProgress();
window.addEventListener("scroll", updateSectionProgress, { passive: true });
window.addEventListener("resize", updateSectionProgress);

navToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});
nav.addEventListener("click", event => {
  if (event.target.closest("a")) {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

pipelineTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    pipelineTabs.forEach(item => {
      item.classList.toggle("is-active", item === tab);
      item.setAttribute("aria-selected", String(item === tab));
    });
    const item = pipelineContent[index];
    pipelineDetail.innerHTML = `<div><span class="detail-label">${item.label}</span><h3>${item.title}</h3><p>${item.body}</p></div><ul>${item.bullets.map(bullet => `<li>${bullet}</li>`).join("")}</ul>`;
  });
  tab.addEventListener("keydown", event => {
    if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    pipelineTabs[(index + direction + pipelineTabs.length) % pipelineTabs.length].focus();
  });
});

document.querySelectorAll("[data-lightbox]").forEach(button => {
  button.addEventListener("click", () => {
    const source = button.dataset.lightbox;
    const preview = button.querySelector("img");
    dialog.querySelector("img").src = source;
    dialog.querySelector("img").alt = preview?.alt || (isEnglish ? "Technical evidence image" : "技術證據圖片");
    dialog.querySelector("p").textContent = preview?.alt || "";
    dialog.showModal();
  });
});
document.querySelector("[data-lightbox-close]").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  const bounds = dialog.getBoundingClientRect();
  const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (outside) dialog.close();
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: "0px 0px -30px" });
document.querySelectorAll(".reveal").forEach(item => observer.observe(item));
