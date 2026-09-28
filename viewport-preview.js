(() => {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('portfolio-theme');
  root.dataset.theme = savedTheme === 'dark' ? 'dark' : 'light';

  const isEnglish = root.lang === 'en';
  const style = document.createElement('style');
  style.textContent = `
    .nav-controls{display:flex;align-items:center;gap:6px}
    .viewport-switch,.theme-switch{display:flex;padding:2px;border:1px solid var(--line,#9a9a96);background:transparent}
    .viewport-switch button,.theme-switch button{display:grid;place-items:center;width:32px;height:30px;padding:0;border:0;background:transparent;color:var(--muted,#555);cursor:pointer}
    .viewport-switch button:hover,.viewport-switch button:focus-visible,.theme-switch button:hover,.theme-switch button:focus-visible{color:var(--ink,#111);background:var(--line,#dededb);outline:none}
    .viewport-switch svg,.theme-switch svg{width:17px;height:17px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
    .nav-controls.is-floating{position:fixed;top:18px;right:18px;z-index:1001;padding:4px;background:var(--bg,#f5f5f3)}
    .page-top-link{position:fixed;right:24px;bottom:24px;z-index:60;padding:10px 12px;color:var(--bg,#f5f5f3)!important;background:var(--ink,var(--text,#151515))!important;border:1px solid var(--ink,var(--text,#151515));box-shadow:0 8px 24px rgba(0,0,0,.13);font-size:10px;font-weight:500;letter-spacing:.1em;line-height:1;white-space:nowrap;transition:transform .2s,background .2s,color .2s}
    .page-top-link:hover,.page-top-link:focus-visible{color:var(--ink,var(--text,#151515))!important;background:var(--bg,#f5f5f3)!important;transform:translateY(-2px);outline:none}
    .device-preview-layer{position:fixed;inset:0;z-index:1000;display:none;place-items:center;background:#20211f}
    .device-preview-layer.is-open{display:grid}
    .device-preview-frame{width:390px;height:calc(100vh - 32px);border:1px solid #555;border-radius:18px;background:#fff;box-shadow:0 28px 90px rgba(0,0,0,.55)}
    body.device-preview-open{overflow:hidden}
    body.device-preview-open .nav-controls{position:fixed;top:12px;right:12px;z-index:1001;padding:4px;background:#2a2b29}
    body.device-preview-open .nav-controls button{color:#bbb}
    html[data-theme="dark"]{color-scheme:dark;--bg:#121311!important;--bg-2:#181917!important;--ink:#f0f0ed!important;--text:#f0f0ed!important;--muted:#a9aaa5!important;--line:#383936!important;--blue:#deded9!important;--yellow:#777!important;--dark:#090a09!important;--panel:#1a1b19!important;--panel-2:#242522!important;--cyan:#deded9!important;--violet:#bbb!important;--mint:#aaa!important;--orange:#aaa!important;--green:#ccc!important}
    html[data-theme="dark"] body{background:#121311!important;color:#f0f0ed!important}
    html[data-theme="dark"] .header,html[data-theme="dark"] .site-header,html[data-theme="dark"] .top{background:rgba(18,19,17,.96)!important;border-color:#383936!important}
    html[data-theme="dark"] .identity i{background:#f0f0ed!important}
    html[data-theme="dark"] .nav,html[data-theme="dark"] .site-nav{background:#121311!important}
    html[data-theme="dark"] .nav a:not(.nav-cta),html[data-theme="dark"] .site-nav a:not(.button),html[data-theme="dark"] .hero-intro>p,html[data-theme="dark"] .about-lead>p:not(.section-tag),html[data-theme="dark"] .hero-copy,html[data-theme="dark"] .detail span,html[data-theme="dark"] .lead,html[data-theme="dark"] .content p{color:#c8c9c4!important}
    html[data-theme="dark"] .nav-cta,html[data-theme="dark"] .button{color:#121311!important;background:#f0f0ed!important;border-color:#f0f0ed!important}
    html[data-theme="dark"] .nav-cta:hover,html[data-theme="dark"] .button:hover{color:#f0f0ed!important;background:transparent!important}
    html[data-theme="dark"] .case-section-nav a.is-active{color:#121311!important;background:#f0f0ed!important}
    html[data-theme="dark"] .case-section-nav a.is-passed{color:#d0d1cc!important}
    html[data-theme="dark"] .lab-teaser-link:hover,html[data-theme="dark"] .lab-card:hover,html[data-theme="dark"] .project:hover{background:#1c1d1a!important}
    html[data-theme="dark"] .lab-image,html[data-theme="dark"] .project-media,html[data-theme="dark"] .image-frame{background:#20211f!important}
    html[data-theme="dark"] .metrics-strip{background:#171816!important;border-color:#3a3b38!important}
    html[data-theme="dark"] .metric{background:#171816!important;border-color:#3a3b38!important}
    html[data-theme="dark"] .metric strong{color:#f0f0ed!important}
    html[data-theme="dark"] .metric span{color:#9fa09b!important}
    html[data-theme="dark"] .metric-pass strong{color:#d0d1cc!important}
    html[data-theme="dark"] .pipeline-tabs{border-color:#3a3b38!important}
    html[data-theme="dark"] .pipeline-tab{background:#151614!important;border-color:#3a3b38!important;color:#d6d7d2!important}
    html[data-theme="dark"] .pipeline-tab:hover{background:#20211f!important}
    html[data-theme="dark"] .pipeline-tab.is-active{background:#eeeeea!important;color:#151614!important}
    html[data-theme="dark"] .pipeline-tab.is-active b,html[data-theme="dark"] .pipeline-tab.is-active small{color:#575853!important}
    html[data-theme="dark"] .pipeline-tab b,html[data-theme="dark"] .pipeline-tab small{color:#979893!important}
    html[data-theme="dark"] .pipeline-detail{background:#1a1b19!important;border-color:#41423f!important;border-left-color:#d0d1cc!important}
    html[data-theme="dark"] .pipeline-detail h3{color:#f0f0ed!important}
    html[data-theme="dark"] .pipeline-detail p,html[data-theme="dark"] .pipeline-detail ul{color:#bfc0ba!important}
    html[data-theme="dark"] .detail-label{color:#d0d1cc!important}
    html[data-theme="dark"] .section-heading>p{color:#b8b9b3!important}
    html[data-theme="dark"] .alt-section{background:#151614!important;border-color:#383936!important}
    html[data-theme="dark"] .alt-section .section-heading h2,html[data-theme="dark"] .alt-section .feature-copy h3{color:#f0f0ed!important}
    html[data-theme="dark"] .alt-section .section-heading>p,html[data-theme="dark"] .alt-section .feature-copy>p{color:#b8b9b3!important}
    html[data-theme="dark"] .spec-list div{border-color:#454642!important}
    html[data-theme="dark"] .spec-list span{color:#989994!important}
    html[data-theme="dark"] .spec-list b{color:#deded9!important}
    html[data-theme="dark"] .detail-cards{border-color:#454642!important}
    html[data-theme="dark"] .detail-card{background:#181917!important;border-color:#454642!important;color:#f0f0ed!important}
    html[data-theme="dark"] .detail-card:hover,html[data-theme="dark"] .detail-card:focus-visible{background:#222320!important;color:#f0f0ed!important}
    html[data-theme="dark"] .detail-card:hover strong,html[data-theme="dark"] .detail-card:focus-visible strong{color:#f0f0ed!important}
    html[data-theme="dark"] .detail-card small{color:#a8a9a3!important}
    html[data-theme="dark"] .text-link{color:#e3e3de!important}
    html[data-theme="dark"] .evidence-card:hover,html[data-theme="dark"] .evidence-card:focus-visible{background:#ecece8!important;color:#181917!important}
    html[data-theme="dark"] .evidence-card:hover .card-kicker,html[data-theme="dark"] .evidence-card:focus-visible .card-kicker{color:#555651!important}
    html[data-theme="dark"] .evidence-card:hover strong,html[data-theme="dark"] .evidence-card:focus-visible strong{color:#181917!important}
    html[data-theme="dark"] .evidence-card:hover small,html[data-theme="dark"] .evidence-card:focus-visible small{color:#555651!important}
    html[data-theme="dark"] .evidence-card:hover .card-arrow,html[data-theme="dark"] .evidence-card:focus-visible .card-arrow{color:#181917!important}
    html[data-theme="dark"] .download-list a:hover,html[data-theme="dark"] .download-list a:focus-visible{background:#ecece8!important;color:#181917!important}
    html[data-theme="dark"] .download-list a:hover span,html[data-theme="dark"] .download-list a:focus-visible span,html[data-theme="dark"] .download-list a:hover b,html[data-theme="dark"] .download-list a:focus-visible b,html[data-theme="dark"] .download-list a:hover i,html[data-theme="dark"] .download-list a:focus-visible i{color:#30312e!important}
    html[data-theme="dark"] .case-section-nav a:hover,html[data-theme="dark"] .case-section-nav a:focus-visible{background:#222320!important;color:#f0f0ed!important}
    html[data-theme="dark"] .text-link:hover,html[data-theme="dark"] .text-link:focus-visible{color:#fff!important}
    @media(max-width:700px){.viewport-switch{display:none}.nav-controls.is-floating{display:none}.page-top-link{right:18px;bottom:max(18px,env(safe-area-inset-bottom));padding:10px}}
  `;
  document.head.append(style);

  if (window.self !== window.top) {
    root.classList.add('is-device-preview-frame');
    window.addEventListener('message', (event) => {
      if (event.data?.type === 'portfolio-theme' && ['light', 'dark'].includes(event.data.theme)) {
        root.dataset.theme = event.data.theme;
      }
    });
    return;
  }

  const deviceSwitch = document.createElement('div');
  deviceSwitch.className = 'viewport-switch';
  deviceSwitch.setAttribute('role', 'group');
  deviceSwitch.setAttribute('aria-label', isEnglish ? 'Device preview' : '裝置預覽');
  deviceSwitch.innerHTML = `
    <button type="button" data-device-toggle>
      <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="13" rx="1.5"></rect><path d="M8 21h8M12 17v4"></path></svg>
    </button>`;

  const themeSwitch = document.createElement('div');
  themeSwitch.className = 'theme-switch';
  themeSwitch.setAttribute('role', 'group');
  themeSwitch.setAttribute('aria-label', isEnglish ? 'Color theme' : '網站主題');
  themeSwitch.innerHTML = `
    <button type="button" data-theme-toggle>
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.7"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"></path></svg>
    </button>`;

  const controls = document.createElement('div');
  controls.className = 'nav-controls';
  controls.append(deviceSwitch, themeSwitch);

  const nav = document.querySelector('.nav, .site-nav');
  const languageSwitch = nav?.querySelector('.lang-switch, .lang');
  if (nav) {
    nav.insertBefore(controls, languageSwitch || null);
  } else {
    controls.classList.add('is-floating');
    document.body.append(controls);
  }

  const layer = document.createElement('div');
  layer.className = 'device-preview-layer';
  layer.setAttribute('aria-hidden', 'true');
  const frame = document.createElement('iframe');
  frame.className = 'device-preview-frame';
  frame.title = isEnglish ? 'Mobile page preview' : '手機版頁面預覽';
  layer.append(frame);
  document.body.append(layer);

  const deviceButton = deviceSwitch.querySelector('[data-device-toggle]');
  const themeButton = themeSwitch.querySelector('[data-theme-toggle]');
  const desktopIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="13" rx="1.5"></rect><path d="M8 21h8M12 17v4"></path></svg>';
  const mobileIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="2" width="10" height="20" rx="2"></rect><path d="M10.5 5h3M11 19h2"></path></svg>';
  const lightIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.7"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"></path></svg>';
  const darkIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z"></path></svg>';
  let currentMode = 'desktop';

  const syncThemeButton = () => {
    const isDark = root.dataset.theme === 'dark';
    themeButton.innerHTML = isDark ? darkIcon : lightIcon;
    themeButton.setAttribute('aria-label', isEnglish ? `Switch to ${isDark ? 'light' : 'dark'} theme` : `切換至${isDark ? '淺色' : '深色'}主題`);
    themeButton.title = isEnglish ? `Switch to ${isDark ? 'light' : 'dark'} theme` : `切換至${isDark ? '淺色' : '深色'}主題`;
  };

  const syncFrameTheme = () => {
    frame.contentWindow?.postMessage({ type: 'portfolio-theme', theme: root.dataset.theme }, '*');
  };

  const setTheme = (theme) => {
    root.dataset.theme = theme;
    localStorage.setItem('portfolio-theme', theme);
    syncThemeButton();
    if (layer.classList.contains('is-open')) syncFrameTheme();
  };

  const setMode = (mode) => {
    const mobile = mode === 'mobile';
    currentMode = mode;
    if (mobile) document.body.append(controls);
    else if (nav) nav.insertBefore(controls, languageSwitch || null);
    layer.classList.toggle('is-open', mobile);
    layer.setAttribute('aria-hidden', String(!mobile));
    document.body.classList.toggle('device-preview-open', mobile);
    deviceButton.innerHTML = mobile ? mobileIcon : desktopIcon;
    deviceButton.setAttribute('aria-label', isEnglish ? `Switch to ${mobile ? 'desktop' : 'mobile'} preview` : `切換至${mobile ? '電腦版' : '手機版'}預覽`);
    deviceButton.title = isEnglish ? `Switch to ${mobile ? 'desktop' : 'mobile'} preview` : `切換至${mobile ? '電腦版' : '手機版'}預覽`;
    if (mobile) frame.src = window.location.href;
    else frame.removeAttribute('src');
  };

  themeButton.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));
  deviceButton.addEventListener('click', () => setMode(currentMode === 'desktop' ? 'mobile' : 'desktop'));
  frame.addEventListener('load', syncFrameTheme);
  root.dataset.viewportControlsReady = 'true';
  syncThemeButton();
  setMode('desktop');
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && layer.classList.contains('is-open')) setMode('desktop');
  });
})();
