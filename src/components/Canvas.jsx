import { useEffect, useRef, useCallback } from 'react'
import { Graph } from '@antv/x6'
import './Canvas.css'

function Canvas({ onNodeSelect, selectedNode }) {
  const containerRef = useRef(null)
  const graphRef = useRef(null)
  const isNodeRegistered = useRef(false)

  useEffect(() => {
    if (!containerRef.current || graphRef.current) return

    // 註冊自定義 SVG 節點（只註冊一次）
    if (!isNodeRegistered.current) {
      isNodeRegistered.current = true
      Graph.registerNode('custom-symbol', {
        inherit: 'rect',
        width: 80,
        height: 80,
        markup: [
          {
            tagName: 'rect',
            selector: 'body',
          },
          {
            tagName: 'foreignObject',
            selector: 'fo',
            children: [
              {
                tagName: 'body',
                ns: 'http://www.w3.org/1999/xhtml',
                selector: 'foBody',
                children: [
                  {
                    tagName: 'div',
                    selector: 'content',
                  },
                ],
              },
            ],
          },
          {
            tagName: 'text',
            selector: 'label',
          },
        ],
        attrs: {
          body: {
            fill: '#ffffff',
            stroke: '#d1d5db',
            strokeWidth: 1,
            rx: 6,
            ry: 6,
          },
          fo: {
            width: 80,
            height: 80,
            x: 0,
            y: 0,
          },
          foBody: {
            xmlns: 'http://www.w3.org/1999/xhtml',
            style: {
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'visible',
            },
          },
          content: {
            style: {
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            },
          },
          label: {
            fontSize: 12,
            fill: '#374151',
            textAnchor: 'middle',
            textVerticalAnchor: 'top',
            refX: 0.5,
            refY: '100%',
            refY2: 4,
            fontFamily: 'Arial, sans-serif',
            fontWeight: '500',
          },
        },
        ports: {
          groups: {
            top: {
              position: 'top',
              attrs: {
                circle: {
                  r: 5,
                  magnet: true,
                  stroke: '#667eea',
                  strokeWidth: 2,
                  fill: '#fff',
                },
              },
            },
            right: {
              position: 'right',
              attrs: {
                circle: {
                  r: 5,
                  magnet: true,
                  stroke: '#667eea',
                  strokeWidth: 2,
                  fill: '#fff',
                },
              },
            },
            bottom: {
              position: 'bottom',
              attrs: {
                circle: {
                  r: 5,
                  magnet: true,
                  stroke: '#667eea',
                  strokeWidth: 2,
                  fill: '#fff',
                },
              },
            },
            left: {
              position: 'left',
              attrs: {
                circle: {
                  r: 5,
                  magnet: true,
                  stroke: '#667eea',
                  strokeWidth: 2,
                  fill: '#fff',
                },
              },
            },
          },
          items: [
            { id: 'port-top', group: 'top' },
            { id: 'port-right', group: 'right' },
            { id: 'port-bottom', group: 'bottom' },
            { id: 'port-left', group: 'left' },
          ],
        },
      })
    }

    // 初始化 X6 畫布
    const graph = new Graph({
      container: containerRef.current,
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
      background: {
        color: '#ffffff',
      },
      grid: {
        size: 15,
        visible: true,
        type: 'dot',
        args: {
          color: '#e0e0e0',
          thickness: 1,
        },
      },
      panning: {
        enabled: true,
        modifiers: 'space',
      },
      mousewheel: {
        enabled: true,
        modifiers: ['ctrl', 'meta'],
        minScale: 0.3,
        maxScale: 3,
      },
      selecting: {
        enabled: true,
        rubberband: true,
        showNodeSelectionBox: true,
        modifiers: 'shift',
      },
      connecting: {
        snap: true,
        allowBlank: false,
        allowLoop: false,
        allowNode: false,
        allowEdge: false,
        allowMulti: true,
        highlight: true,
        connector: {
          name: 'rounded',
          args: {
            radius: 8,
          },
        },
        router: {
          name: 'manhattan',
          args: {
            padding: 10,
          },
        },
        createEdge() {
          return graph.createEdge({
            shape: 'edge',
            attrs: {
              line: {
                stroke: '#374151',
                strokeWidth: 2,
                targetMarker: {
                  name: 'classic',
                  size: 8,
                },
              },
            },
            zIndex: -1,
          })
        },
        validateConnection({ sourceView, targetView, sourceMagnet, targetMagnet }) {
          if (!sourceMagnet || !targetMagnet) {
            return false
          }
          if (sourceView === targetView) {
            return false
          }
          return true
        },
      },
      highlighting: {
        magnetAvailable: {
          name: 'stroke',
          args: {
            padding: 4,
            attrs: {
              strokeWidth: 2,
              stroke: '#667eea',
            },
          },
        },
        magnetAdsorbed: {
          name: 'stroke',
          args: {
            attrs: {
              fill: '#667eea',
              stroke: '#667eea',
            },
          },
        },
      },
      snapline: {
        enabled: true,
        sharp: true,
      },
      history: {
        enabled: true,
      },
      keyboard: {
        enabled: true,
        global: true,
      },
      clipboard: {
        enabled: true,
      },
    })

    graphRef.current = graph

    // 監聽節點選擇
    graph.on('node:click', ({ node }) => {
      const pos = node.position()
      const size = node.size()
      onNodeSelect({
        id: node.id,
        label: node.attr('label/text') || node.data?.label || '',
        type: node.data?.category || '',
        symbolName: node.data?.symbolName || '',
        symbolId: node.data?.symbolId || '',
        position: { x: Math.round(pos.x), y: Math.round(pos.y) },
        size: { width: size.width, height: size.height },
        xNode: node,
      })
    })

    // 監聽空白處點擊（取消選擇）
    graph.on('blank:click', () => {
      onNodeSelect(null)
    })

    // 監聽節點移動
    graph.on('node:change:position', ({ node, current }) => {
      const currentSelected = graphRef.current?.getSelectedCells()?.[0]
      if (currentSelected && currentSelected.id === node.id) {
        const pos = node.position()
        const size = node.size()
        onNodeSelect({
          id: node.id,
          label: node.attr('label/text') || node.data?.label || '',
          type: node.data?.category || '',
          symbolName: node.data?.symbolName || '',
          symbolId: node.data?.symbolId || '',
          position: { x: Math.round(pos.x), y: Math.round(pos.y) },
          size: { width: size.width, height: size.height },
          node: node,
        })
      }
    })

    // 鍵盤快捷鍵 - 使用原生鍵盤事件
    const handleKeyDown = (e) => {
      const isMeta = e.metaKey || e.ctrlKey
      
      // 刪除
      if (e.key === 'Delete' || e.key === 'Backspace') {
        const cells = graph.getSelectedCells()
        if (cells.length) {
          graph.removeCells(cells)
          onNodeSelect(null)
        }
        e.preventDefault()
      }
      
      // 撤銷 (Ctrl/Cmd + Z)
      if (isMeta && e.key === 'z' && !e.shiftKey) {
        if (graph.canUndo()) {
          graph.undo()
        }
        e.preventDefault()
      }
      
      // 重做 (Ctrl/Cmd + Shift + Z 或 Ctrl/Cmd + Y)
      if ((isMeta && e.key === 'z' && e.shiftKey) || (isMeta && e.key === 'y')) {
        if (graph.canRedo()) {
          graph.redo()
        }
        e.preventDefault()
      }
      
      // 複製 (Ctrl/Cmd + C)
      if (isMeta && e.key === 'c') {
        const cells = graph.getSelectedCells()
        if (cells.length) {
          graph.copy(cells)
        }
        e.preventDefault()
      }
      
      // 貼上 (Ctrl/Cmd + V)
      if (isMeta && e.key === 'v') {
        if (!graph.isClipboardEmpty()) {
          const cells = graph.paste({ offset: 32 })
          graph.cleanSelection()
          graph.select(cells)
        }
        e.preventDefault()
      }
      
      // 全選 (Ctrl/Cmd + A)
      if (isMeta && e.key === 'a') {
        const nodes = graph.getNodes()
        if (nodes.length) {
          graph.select(nodes)
        }
        e.preventDefault()
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)

    // 處理 Drop 事件
    const container = containerRef.current
    const handleDrop = (e) => {
      e.preventDefault()
      const symbolData = e.dataTransfer.getData('application/symbol')
      if (symbolData) {
        const symbol = JSON.parse(symbolData)
        const { x, y } = graph.clientToLocal(e.clientX, e.clientY)
        
        // 建立節點
        const node = graph.addNode({
          shape: 'custom-symbol',
          x: x - 40,
          y: y - 40,
          width: 80,
          height: 80,
          data: {
            category: symbol.category,
            symbolName: symbol.name,
            symbolId: symbol.id,
            label: symbol.id + '-001',
          },
          attrs: {
            content: {
              html: symbol.svg,
            },
            label: {
              text: symbol.id + '-001',
            },
          },
        })

        // 選中新建立的節點
        graph.cleanSelection()
        graph.select(node)
        
        const pos = node.position()
        const size = node.size()
        onNodeSelect({
          id: node.id,
          label: symbol.id + '-001',
          type: symbol.category,
          symbolName: symbol.name,
          symbolId: symbol.id,
          position: { x: Math.round(pos.x), y: Math.round(pos.y) },
          size: { width: size.width, height: size.height },
          xNode: node,
        })
      }
    }

    const handleDragOver = (e) => {
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    }

    container.addEventListener('drop', handleDrop)
    container.addEventListener('dragover', handleDragOver)

    // 處理視窗大小變化
    const handleResize = () => {
      if (containerRef.current && graph) {
        graph.resize(
          containerRef.current.offsetWidth,
          containerRef.current.offsetHeight
        )
      }
    }

    window.addEventListener('resize', handleResize)

    // 清理
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
      container?.removeEventListener('drop', handleDrop)
      container?.removeEventListener('dragover', handleDragOver)
      graph.dispose()
      graphRef.current = null
    }
  }, [])

  // 更新選中節點的屬性
  useEffect(() => {
    if (graphRef.current && selectedNode && selectedNode.xNode) {
      const node = selectedNode.xNode
      
      // 更新標籤
      if (selectedNode.label !== node.attr('label/text')) {
        node.attr('label/text', selectedNode.label)
        node.setData({ ...node.data, label: selectedNode.label })
      }

      // 更新位置
      const currentPos = node.position()
      if (selectedNode.position && 
          (selectedNode.position.x !== currentPos.x || selectedNode.position.y !== currentPos.y)) {
        node.position(selectedNode.position.x, selectedNode.position.y)
      }

      // 更新大小
      const currentSize = node.size()
      if (selectedNode.size && 
          (selectedNode.size.width !== currentSize.width || selectedNode.size.height !== currentSize.height)) {
        node.resize(selectedNode.size.width, selectedNode.size.height)
        node.attr('fo/width', selectedNode.size.width)
        node.attr('fo/height', selectedNode.size.height)
      }
    }
  }, [selectedNode])

  // 工具列功能
  const handleZoomIn = useCallback(() => {
    if (graphRef.current) {
      const zoom = graphRef.current.zoom()
      graphRef.current.zoomTo(Math.min(zoom + 0.1, 3))
    }
  }, [])

  const handleZoomOut = useCallback(() => {
    if (graphRef.current) {
      const zoom = graphRef.current.zoom()
      graphRef.current.zoomTo(Math.max(zoom - 0.1, 0.3))
    }
  }, [])

  const handleZoomToFit = useCallback(() => {
    if (graphRef.current) {
      graphRef.current.zoomToFit({ padding: 20, maxScale: 1 })
    }
  }, [])

  const handleZoomReset = useCallback(() => {
    if (graphRef.current) {
      graphRef.current.zoomTo(1)
      graphRef.current.centerContent()
    }
  }, [])

  const handleClear = useCallback(() => {
    if (graphRef.current) {
      if (window.confirm('確定要清除整個畫布嗎？此操作無法復原。')) {
        graphRef.current.clearCells()
        onNodeSelect(null)
      }
    }
  }, [onNodeSelect])

  const handleUndo = useCallback(() => {
    if (graphRef.current && graphRef.current.canUndo()) {
      graphRef.current.undo()
    }
  }, [])

  const handleRedo = useCallback(() => {
    if (graphRef.current && graphRef.current.canRedo()) {
      graphRef.current.redo()
    }
  }, [])

  return (
    <div className="canvas-container">
      <div className="canvas-toolbar">
        <div className="toolbar-group">
          <button onClick={handleUndo} title="復原 (Ctrl+Z)" className="toolbar-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 7v6h6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button onClick={handleRedo} title="重做 (Ctrl+Shift+Z)" className="toolbar-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 7v6h-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 17a9 9 0 019-9 9 9 0 016 2.3l3 2.7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="toolbar-divider"></div>

        <div className="toolbar-group">
          <button onClick={handleZoomIn} title="放大 (Ctrl + 滾輪)" className="toolbar-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8" strokeWidth="2"/>
              <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <button onClick={handleZoomOut} title="縮小 (Ctrl + 滾輪)" className="toolbar-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8" strokeWidth="2"/>
              <path d="M21 21l-4.35-4.35M8 11h6" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <button onClick={handleZoomToFit} title="適應視窗" className="toolbar-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button onClick={handleZoomReset} title="重置視圖" className="toolbar-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="toolbar-divider"></div>

        <button onClick={handleClear} title="清除畫布" className="toolbar-btn danger">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <span className="toolbar-hint">
          <span className="hint-item">空白鍵拖曳</span>
          <span className="hint-separator">•</span>
          <span className="hint-item">Ctrl+滾輪縮放</span>
          <span className="hint-separator">•</span>
          <span className="hint-item">Shift框選</span>
        </span>
      </div>
      <div className="canvas" ref={containerRef} />
    </div>
  )
}

export default Canvas
