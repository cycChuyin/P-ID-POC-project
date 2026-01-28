import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Canvas from './components/Canvas'
import PropertyPanel from './components/PropertyPanel'
import './App.css'

function App() {
  const [selectedNode, setSelectedNode] = useState(null)
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false)

  const handleNodeSelect = (node) => {
    setSelectedNode(node)
  }

  const handleNodeUpdate = (updatedNode) => {
    setSelectedNode(updatedNode)
  }

  const handlePanelToggle = () => {
    setIsPanelCollapsed(!isPanelCollapsed)
  }

  return (
    <div className="app">
      <Sidebar />
      <Canvas 
        onNodeSelect={handleNodeSelect}
        selectedNode={selectedNode}
      />
      <PropertyPanel 
        node={selectedNode}
        isCollapsed={isPanelCollapsed}
        onToggle={handlePanelToggle}
        onUpdate={handleNodeUpdate}
      />
    </div>
  )
}

export default App
