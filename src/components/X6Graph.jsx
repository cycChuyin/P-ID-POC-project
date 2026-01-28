import { useEffect, useRef, useState } from 'react'
import { Graph } from '@antv/x6'
import './X6Graph.css'

function X6Graph() {
  const containerRef = useRef(null)
  const graphRef = useRef(null)

  useEffect(() => {
    // 初始化 X6 畫布
    const graph = new Graph({
      container: containerRef.current,
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
      background: {
        color: '#ffffff',
      },
      grid: {
        size: 10,
        visible: true,
        type: 'dot',
        args: {
          color: '#e0e0e0',
          thickness: 1,
        },
      },
      panning: {
        enabled: true,
        modifiers: 'shift',
      },
      mousewheel: {
        enabled: true,
        modifiers: 'ctrl',
      },
      connecting: {
        snap: true,
        allowBlank: false,
        allowLoop: false,
        highlight: true,
        connector: 'rounded',
        router: {
          name: 'manhattan',
        },
      },
      highlighting: {
        magnetAvailable: {
          name: 'stroke',
          args: {
            padding: 4,
            attrs: {
              strokeWidth: 2,
              stroke: '#6366f1',
            },
          },
        },
      },
    })

    graphRef.current = graph

    // 建立示範節點
    const node1 = graph.addNode({
      x: 100,
      y: 100,
      width: 120,
      height: 60,
      label: '節點 1',
      attrs: {
        body: {
          fill: '#6366f1',
          stroke: '#4f46e5',
          strokeWidth: 2,
        },
        label: {
          fill: '#ffffff',
          fontSize: 14,
        },
      },
    })

    const node2 = graph.addNode({
      x: 350,
      y: 100,
      width: 120,
      height: 60,
      label: '節點 2',
      attrs: {
        body: {
          fill: '#10b981',
          stroke: '#059669',
          strokeWidth: 2,
        },
        label: {
          fill: '#ffffff',
          fontSize: 14,
        },
      },
    })

    const node3 = graph.addNode({
      x: 225,
      y: 250,
      width: 120,
      height: 60,
      label: '節點 3',
      attrs: {
        body: {
          fill: '#f59e0b',
          stroke: '#d97706',
          strokeWidth: 2,
        },
        label: {
          fill: '#ffffff',
          fontSize: 14,
        },
      },
    })

    // 建立連線
    graph.addEdge({
      source: node1,
      target: node2,
      attrs: {
        line: {
          stroke: '#6366f1',
          strokeWidth: 2,
        },
      },
    })

    graph.addEdge({
      source: node2,
      target: node3,
      attrs: {
        line: {
          stroke: '#10b981',
          strokeWidth: 2,
        },
      },
    })

    graph.addEdge({
      source: node1,
      target: node3,
      attrs: {
        line: {
          stroke: '#f59e0b',
          strokeWidth: 2,
        },
      },
    })

    // 處理視窗大小變化
    const handleResize = () => {
      if (containerRef.current) {
        graph.resize(
          containerRef.current.offsetWidth,
          containerRef.current.offsetHeight
        )
      }
    }

    window.addEventListener('resize', handleResize)

    // 清理
    return () => {
      window.removeEventListener('resize', handleResize)
      graph.dispose()
    }
  }, [])

  return (
    <div className="x6-graph-container">
      <div className="x6-canvas" ref={containerRef} />
      <div className="x6-toolbar">
        <button 
          onClick={() => {
            if (graphRef.current) {
              graphRef.current.zoomTo(1)
              graphRef.current.centerContent()
            }
          }}
        >
          重置視圖
        </button>
        <button 
          onClick={() => {
            if (graphRef.current) {
              graphRef.current.clearCells()
            }
          }}
        >
          清除畫布
        </button>
      </div>
    </div>
  )
}

export default X6Graph
