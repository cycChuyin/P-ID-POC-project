# P&ID 編輯器 - React + AntV X6

這是一個基於 React 和 AntV X6 的 P&ID (Piping and Instrumentation Diagram) 圖編輯器專案，使用 Vite 作為構建工具。

## ✨ 功能特點

- ⚡️ 使用 Vite 進行快速開發
- ⚛️ React 18 
- 🎨 AntV X6 圖編輯器引擎
- � 三欄式佈局：左側物件欄 + 中間畫布 + 右側屬性面板
- 🎯 豐富的 P&ID 符號庫（流量、溫度、液位、壓力、設備）
- 🖱️ 拖放式操作，直覺易用
- 🔧 即時屬性編輯
- 🎨 自定義 SVG 符號支援
- ⌨️ 完整的鍵盤快捷鍵
- 💾 撤銷/重做功能
- 📋 複製/貼上支援

## 安裝依賴

```bash
npm install
```

## 開發

啟動開發伺服器：

```bash
npm run dev
```

專案將在 http://localhost:3000 開啟。

## 建置

建置生產版本：

```bash
npm run build
```

## 預覽建置結果

```bash
npm run preview
```

## 📁 專案結構

```
cmap-antvx6-project/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx          # 左側物件欄組件
│   │   ├── Sidebar.css          # 物件欄樣式
│   │   ├── Canvas.jsx           # 中間畫布組件
│   │   ├── Canvas.css           # 畫布樣式
│   │   ├── PropertyPanel.jsx   # 右側屬性面板組件
│   │   ├── PropertyPanel.css   # 屬性面板樣式
│   │   ├── X6Graph.jsx         # (舊版) X6 圖編輯器組件
│   │   └── X6Graph.css         # (舊版) X6 樣式
│   ├── App.jsx                 # 主應用組件
│   ├── App.css                 # 應用樣式
│   ├── main.jsx                # 應用入口
│   └── index.css               # 全局樣式
├── index.html                  # HTML 模板
├── vite.config.js              # Vite 配置
└── package.json                # 專案配置
```

## 🎯 核心功能

### 1. 左側物件欄
- 📦 分類顯示 P&ID 符號（可展開/收合）
- 🎨 支援多種儀表類型：
  - **流量 (Flow)**: FI, FT, FR, FC
  - **溫度 (Temperature)**: TI, TT, TR, TC
  - **液位 (Level)**: LI, LT
  - **壓力 (Pressure)**: PI, PT
  - **設備 (Equipment)**: 泵、閥門、儲槽、熱交換器
- 🖱️ 拖放式添加物件到畫布

### 2. 中間畫布
- ✅ 網格背景輔助對齊
- ✅ 拖拽畫布（按住 Space + 拖拽）
- ✅ 滾輪縮放（按住 Ctrl/Cmd + 滾輪）
- ✅ 框選多個物件（按住 Shift + 拖拽）
- ✅ 智能對齊線（Snapline）
- ✅ 連接埠自動顯示（四個方向）
- ✅ 智能連線路由（Manhattan 路由）
- ✅ 工具列：撤銷、重做、縮放、適應視窗、清除

### 3. 右側屬性面板
- 🔧 即時編輯選中物件屬性
- 📝 修改標籤名稱
- 📐 調整位置座標
- 📏 調整尺寸大小
- 🎨 顯示物件分類
- 🗑️ 刪除物件
- ◀️ 可收合面板節省空間

## ⌨️ 鍵盤快捷鍵

| 快捷鍵 | 功能 |
|--------|------|
| `Space` + 拖拽 | 移動畫布 |
| `Ctrl/Cmd` + 滾輪 | 縮放畫布 |
| `Shift` + 拖拽 | 框選多個物件 |
| `Ctrl/Cmd` + `Z` | 撤銷 |
| `Ctrl/Cmd` + `Shift` + `Z` | 重做 |
| `Ctrl/Cmd` + `Y` | 重做（替代） |
| `Ctrl/Cmd` + `C` | 複製選中物件 |
| `Ctrl/Cmd` + `V` | 貼上 |
| `Ctrl/Cmd` + `A` | 全選 |
| `Delete` / `Backspace` | 刪除選中物件 |

## � 自定義 SVG 符號

所有符號都定義在 `src/components/Sidebar.jsx` 中，使用標準 SVG 格式。你可以輕鬆添加自己的符號：

```javascript
{
  id: 'YOUR-SYMBOL',
  name: '你的符號名稱',
  category: 'equipment', // flow, temperature, level, pressure, equipment
  svg: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <!-- 你的 SVG 內容 -->
  </svg>`
}
```

## � 後續開發建議

- 💾 儲存/載入專案檔案（JSON 格式）
- 📤 匯出為圖片（PNG/SVG）
- 🎨 自定義符號編輯器
- 🔍 搜尋功能
- 📊 圖層管理
- 🎯 更多 P&ID 標準符號
- 🔗 連線標註和屬性
- � 響應式設計
- 🌐 多人協作功能

## 資源

- [AntV X6 官方文檔](https://x6.antv.antgroup.com/)
- [React 官方文檔](https://react.dev/)
- [Vite 官方文檔](https://vitejs.dev/)
