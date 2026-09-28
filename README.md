# Omni Mini Factory — Portfolio Site

零依賴響應式作品集，內容與素材優先取自 `../release/OmniMiniFac_Portfolio_v1/` 的已驗證公開發布包，並補充同一工作區內已有證據的 CAD Asset Toolkit 與 PIS Road 專案。

`index.html` 是精簡的中文 60 秒招聘入口，導覽列可切換至完整英文版 `index-en.html`；`omni-mini-factory.html` 保留完整主案例，`cad-asset-toolkit.html` 與 `procedural-road.html` 為兩個延伸案例摘要。首頁樣式與互動分別位於 `portfolio-home.css`、`portfolio-home.js`，摘要頁共用 `case-brief.css`。

首頁案例區採左側文字清單與右側 sticky 視覺舞台；捲動焦點或滑鼠／鍵盤焦點切換專案時，以灰階遮色片過場更新圖片。窄螢幕會退化為每個案例自帶圖片的單欄版面。

## 本機預覽

在 `OmniMiniFacProject` 目錄啟動任一靜態伺服器，例如：

```powershell
node portfolio-site/preview-server.mjs
```

然後開啟 `http://localhost:8080/portfolio-site/`。

> 不建議直接以 `file://` 開啟；透過 HTTP 預覽可確保影片與下載連結行為一致。

