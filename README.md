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

## 內容原則

- 最終影片使用 42 秒 `procedural_inspection_pipeline_v1.mp4`。
- USD `defectState` 僅宣稱 Clean / MissingPart；Scratch 明確標示為 Blender Geometry Nodes。
- 資料集只宣稱已存在的 RGB PNG 與 JSON label。
- 姓名、職稱、年資、公開經歷與 Email 只使用本人本輪提供的內容；履歷 PDF、GitHub 與 LinkedIn 尚未提供，因此不建立連結。
- CAD 案例明示為合成工程測試網格，不宣稱真實客戶 CAD 經驗。
- PIS Road 目前只宣稱場景變體與 metadata，不宣稱 segmentation、depth 或 bbox 標註。
