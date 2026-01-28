import { useState } from 'react'
import './Sidebar.css'

// P&ID 符號定義（使用 SVG）
const symbols = {
  flow: [
    { 
      id: 'FI', 
      name: 'FI - 流量指示器',
      category: 'flow',
      svg: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="24" fill="none" stroke="#1f2937" stroke-width="2"/>
        <text x="30" y="37" text-anchor="middle" font-size="18" font-weight="bold" fill="#1f2937" font-family="Arial">FI</text>
      </svg>`
    },
    { 
      id: 'FT', 
      name: 'FT - 流量傳送器',
      category: 'flow',
      svg: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="24" fill="none" stroke="#1f2937" stroke-width="2"/>
        <text x="30" y="37" text-anchor="middle" font-size="18" font-weight="bold" fill="#1f2937" font-family="Arial">FT</text>
      </svg>`
    },
    { 
      id: 'FR', 
      name: 'FR - 流量記錄器',
      category: 'flow',
      svg: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="24" fill="none" stroke="#1f2937" stroke-width="2"/>
        <circle cx="30" cy="30" r="18" fill="none" stroke="#1f2937" stroke-width="1.5"/>
        <text x="30" y="37" text-anchor="middle" font-size="18" font-weight="bold" fill="#1f2937" font-family="Arial">FR</text>
      </svg>`
    },
    { 
      id: 'FC', 
      name: 'FC - 流量控制器',
      category: 'flow',
      svg: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="24" fill="none" stroke="#1f2937" stroke-width="2"/>
        <circle cx="30" cy="30" r="18" fill="none" stroke="#1f2937" stroke-width="1.5"/>
        <circle cx="30" cy="30" r="12" fill="none" stroke="#1f2937" stroke-width="1"/>
        <text x="30" y="37" text-anchor="middle" font-size="16" font-weight="bold" fill="#1f2937" font-family="Arial">FC</text>
      </svg>`
    },
  ],
  temperature: [
    { 
      id: 'TI', 
      name: 'TI - 溫度指示器',
      category: 'temperature',
      svg: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="24" fill="none" stroke="#1f2937" stroke-width="2"/>
        <text x="30" y="37" text-anchor="middle" font-size="18" font-weight="bold" fill="#1f2937" font-family="Arial">TI</text>
      </svg>`
    },
    { 
      id: 'TT', 
      name: 'TT - 溫度傳送器',
      category: 'temperature',
      svg: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="24" fill="none" stroke="#1f2937" stroke-width="2"/>
        <text x="30" y="37" text-anchor="middle" font-size="18" font-weight="bold" fill="#1f2937" font-family="Arial">TT</text>
      </svg>`
    },
    { 
      id: 'TR', 
      name: 'TR - 溫度記錄器',
      category: 'temperature',
      svg: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="24" fill="none" stroke="#1f2937" stroke-width="2"/>
        <circle cx="30" cy="30" r="18" fill="none" stroke="#1f2937" stroke-width="1.5"/>
        <text x="30" y="37" text-anchor="middle" font-size="18" font-weight="bold" fill="#1f2937" font-family="Arial">TR</text>
      </svg>`
    },
    { 
      id: 'TC', 
      name: 'TC - 溫度控制器',
      category: 'temperature',
      svg: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="24" fill="none" stroke="#1f2937" stroke-width="2"/>
        <circle cx="30" cy="30" r="18" fill="none" stroke="#1f2937" stroke-width="1.5"/>
        <circle cx="30" cy="30" r="12" fill="none" stroke="#1f2937" stroke-width="1"/>
        <text x="30" y="37" text-anchor="middle" font-size="16" font-weight="bold" fill="#1f2937" font-family="Arial">TC</text>
      </svg>`
    },
  ],
  level: [
    { 
      id: 'LI', 
      name: 'LI - 液位指示器',
      category: 'level',
      svg: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="24" fill="none" stroke="#1f2937" stroke-width="2"/>
        <text x="30" y="37" text-anchor="middle" font-size="18" font-weight="bold" fill="#1f2937" font-family="Arial">LI</text>
      </svg>`
    },
    { 
      id: 'LT', 
      name: 'LT - 液位傳送器',
      category: 'level',
      svg: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="24" fill="none" stroke="#1f2937" stroke-width="2"/>
        <text x="30" y="37" text-anchor="middle" font-size="18" font-weight="bold" fill="#1f2937" font-family="Arial">LT</text>
      </svg>`
    },
  ],
  pressure: [
    { 
      id: 'PI', 
      name: 'PI - 壓力指示器',
      category: 'pressure',
      svg: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="24" fill="none" stroke="#1f2937" stroke-width="2"/>
        <text x="30" y="37" text-anchor="middle" font-size="18" font-weight="bold" fill="#1f2937" font-family="Arial">PI</text>
      </svg>`
    },
    { 
      id: 'PT', 
      name: 'PT - 壓力傳送器',
      category: 'pressure',
      svg: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="24" fill="none" stroke="#1f2937" stroke-width="2"/>
        <text x="30" y="37" text-anchor="middle" font-size="18" font-weight="bold" fill="#1f2937" font-family="Arial">PT</text>
      </svg>`
    },
  ],
  equipment: [
    { 
      id: 'PUMP', 
      name: '泵 - Pump',
      category: 'equipment',
      svg: `<svg viewBox="0 0 80 60" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="30" r="22" fill="none" stroke="#1f2937" stroke-width="2"/>
        <path d="M 40 12 L 40 48" stroke="#1f2937" stroke-width="2"/>
        <path d="M 22 30 L 58 30" stroke="#1f2937" stroke-width="2"/>
        <circle cx="40" cy="30" r="4" fill="#1f2937"/>
      </svg>`
    },
    { 
      id: 'VALVE', 
      name: '閥門 - Valve',
      category: 'equipment',
      svg: `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
        <path d="M 30 15 L 48 40 L 30 65 L 12 40 Z" fill="none" stroke="#1f2937" stroke-width="2"/>
        <line x1="30" y1="65" x2="30" y2="75" stroke="#1f2937" stroke-width="2"/>
        <line x1="30" y1="15" x2="30" y2="5" stroke="#1f2937" stroke-width="2"/>
      </svg>`
    },
    { 
      id: 'TANK', 
      name: '儲槽 - Tank',
      category: 'equipment',
      svg: `<svg viewBox="0 0 70 80" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="40" height="50" rx="3" fill="none" stroke="#1f2937" stroke-width="2"/>
        <line x1="15" y1="45" x2="55" y2="45" stroke="#1f2937" stroke-width="1.5" stroke-dasharray="3,2"/>
        <line x1="35" y1="15" x2="35" y2="10" stroke="#1f2937" stroke-width="2"/>
      </svg>`
    },
    { 
      id: 'HEAT-EX', 
      name: '熱交換器 - Heat Exchanger',
      category: 'equipment',
      svg: `<svg viewBox="0 0 80 60" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="30" r="22" fill="none" stroke="#1f2937" stroke-width="2"/>
        <line x1="20" y1="20" x2="60" y2="40" stroke="#1f2937" stroke-width="1.5"/>
        <line x1="20" y1="30" x2="60" y2="30" stroke="#1f2937" stroke-width="1.5"/>
        <line x1="20" y1="40" x2="60" y2="20" stroke="#1f2937" stroke-width="1.5"/>
      </svg>`
    },
  ]
}

const categoryNames = {
  flow: '流量 (Flow)',
  temperature: '溫度 (Temperature)',
  level: '液位 (Level)',
  pressure: '壓力 (Pressure)',
  equipment: '設備 (Equipment)'
}

function Sidebar() {
  const [expandedSections, setExpandedSections] = useState({
    flow: true,
    temperature: false,
    level: false,
    pressure: false,
    equipment: false,
  })

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleDragStart = (e, symbol) => {
    // 將符號資訊存入 dataTransfer
    e.dataTransfer.setData('application/symbol', JSON.stringify(symbol))
    e.dataTransfer.effectAllowed = 'copy'
  }

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>P&ID 元件</h3>
        <span className="sidebar-subtitle">拖曳元件到畫布</span>
      </div>
      
      <div className="sidebar-content">
        {Object.entries(symbols).map(([category, items]) => (
          <div key={category} className="symbol-section">
            <div 
              className="section-header"
              onClick={() => toggleSection(category)}
            >
              <span className={`arrow ${expandedSections[category] ? 'expanded' : ''}`}>▶</span>
              <span>{categoryNames[category]}</span>
              <span className="count">{items.length}</span>
            </div>
            {expandedSections[category] && (
              <div className="symbol-list">
                {items.map(symbol => (
                  <div
                    key={symbol.id}
                    className="symbol-item"
                    draggable
                    onDragStart={(e) => handleDragStart(e, symbol)}
                    title={symbol.name}
                  >
                    <div 
                      className="symbol-icon"
                      dangerouslySetInnerHTML={{ __html: symbol.svg }}
                    />
                    <span className="symbol-label">{symbol.id}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
