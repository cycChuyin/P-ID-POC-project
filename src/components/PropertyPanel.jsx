import { useState, useEffect } from 'react'
import './PropertyPanel.css'

function PropertyPanel({ node, isCollapsed, onToggle, onUpdate }) {
  const [formData, setFormData] = useState({
    label: '',
    type: '',
    symbolName: '',
    symbolId: '',
    x: 0,
    y: 0,
    width: 80,
    height: 80,
  })

  useEffect(() => {
    if (node) {
      setFormData({
        label: node.label || '',
        type: node.type || '',
        symbolName: node.symbolName || '',
        symbolId: node.symbolId || '',
        x: node.position?.x || 0,
        y: node.position?.y || 0,
        width: node.size?.width || 80,
        height: node.size?.height || 80,
      })
    }
  }, [node])

  const handleChange = (field, value) => {
    const newData = { ...formData, [field]: value }
    setFormData(newData)
    
    // 即時更新到父組件
    if (field === 'label') {
      onUpdate({ ...node, label: value })
    } else if (field === 'x' || field === 'y') {
      onUpdate({ 
        ...node, 
        position: { 
          x: field === 'x' ? value : formData.x, 
          y: field === 'y' ? value : formData.y 
        } 
      })
    } else if (field === 'width' || field === 'height') {
      onUpdate({ 
        ...node, 
        size: { 
          width: field === 'width' ? value : formData.width, 
          height: field === 'height' ? value : formData.height 
        } 
      })
    }
  }

  return (
    <div className={`property-panel ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="property-header">
        <div className="header-content">
          <h3>屬性面板</h3>
          {!isCollapsed && node && (
            <span className="node-type-badge">{formData.symbolId}</span>
          )}
        </div>
        <button 
          className="collapse-btn"
          onClick={onToggle}
          title={isCollapsed ? '展開屬性面板' : '收合屬性面板'}
        >
          {isCollapsed ? '◀' : '▶'}
        </button>
      </div>

      {!isCollapsed && (
        <div className="property-content">
          {node ? (
            <>
              <div className="property-section">
                <h4>基本資訊</h4>
                
                <div className="property-field">
                  <label>設備類型</label>
                  <input 
                    type="text" 
                    value={formData.symbolName} 
                    disabled
                    className="disabled-input"
                  />
                </div>

                <div className="property-field">
                  <label>標籤名稱</label>
                  <input 
                    type="text" 
                    value={formData.label}
                    onChange={(e) => handleChange('label', e.target.value)}
                    placeholder="例如: FI-001, PT-102"
                  />
                </div>

                <div className="property-field">
                  <label>分類</label>
                  <div className="category-display">
                    <span className={`category-badge category-${formData.type}`}>
                      {formData.type === 'flow' && '流量'}
                      {formData.type === 'temperature' && '溫度'}
                      {formData.type === 'level' && '液位'}
                      {formData.type === 'pressure' && '壓力'}
                      {formData.type === 'equipment' && '設備'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="property-section">
                <h4>位置</h4>
                <div className="property-row">
                  <div className="property-field">
                    <label>X 座標</label>
                    <input 
                      type="number" 
                      value={formData.x}
                      onChange={(e) => handleChange('x', parseInt(e.target.value) || 0)}
                      step="1"
                    />
                  </div>
                  <div className="property-field">
                    <label>Y 座標</label>
                    <input 
                      type="number" 
                      value={formData.y}
                      onChange={(e) => handleChange('y', parseInt(e.target.value) || 0)}
                      step="1"
                    />
                  </div>
                </div>
              </div>

              <div className="property-section">
                <h4>尺寸</h4>
                <div className="property-row">
                  <div className="property-field">
                    <label>寬度</label>
                    <input 
                      type="number" 
                      value={formData.width}
                      onChange={(e) => handleChange('width', parseInt(e.target.value) || 40)}
                      min="40"
                      max="200"
                      step="10"
                    />
                  </div>
                  <div className="property-field">
                    <label>高度</label>
                    <input 
                      type="number" 
                      value={formData.height}
                      onChange={(e) => handleChange('height', parseInt(e.target.value) || 40)}
                      min="40"
                      max="200"
                      step="10"
                    />
                  </div>
                </div>
              </div>

              <div className="property-section">
                <h4>其他資訊</h4>
                <div className="property-field">
                  <label>節點 ID</label>
                  <input 
                    type="text" 
                    value={node.id}
                    disabled
                    className="disabled-input id-input"
                  />
                </div>
              </div>

              <div className="property-actions">
                <button 
                  className="action-btn danger"
                  onClick={() => {
                    if (window.confirm('確定要刪除此節點嗎？')) {
                      if (node?.xNode) {
                        node.xNode.remove()
                      }
                      onUpdate(null)
                    }
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  刪除節點
                </button>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5"/>
                  <circle cx="12" cy="12" r="3" strokeWidth="1.5"/>
                  <path d="M12 3v2M12 19v2M3 12h2M19 12h2" strokeWidth="1.5"/>
                </svg>
              </div>
              <p className="empty-title">未選擇物件</p>
              <p className="empty-description">
                請從畫布中選擇一個物件<br/>以編輯其屬性
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default PropertyPanel
