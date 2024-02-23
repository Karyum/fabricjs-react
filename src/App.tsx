import { useState } from 'react'
import { FabricJSCanvas, useFabricJSEditor } from './lib'
import './App.css'

function App() {
  const { selectedObjects, editor, onReady } = useFabricJSEditor({
    defaultStrokeColor: 'red'
  })
  const [text, setText] = useState('')
  const [strokeColor, setStrokeColor] = useState('')
  const [fillColor, setFillColor] = useState('')

  const onAddCircle = () => {
    editor?.addCircle()
  }
  const onAddRectangle = () => {
    editor?.addRectangle()
  }

  const onAddBorderedRectangle = () => {
    editor?.addBorderedRectangle()
  }

  const onAddRightTriangle = () => {
    editor?.addRightTriangle()
  }

  const onAddTriangle = () => {
    editor?.addTriangle()
  }

  const onAddArrow = () => {
    editor?.addArrow()
  }
  const onAddLine = () => {
    editor?.addLine()
  }
  const onAddText = () => {
    if (selectedObjects?.length) {
      return editor?.updateText(text)
    }
    editor?.addText(text)
  }
  const onAddCubeFace = () => {
    editor?.addCubeFace()
  }
  const onSetStrokeColor = () => {
    editor?.setStrokeColor(strokeColor)
  }
  const onSetFillColor = () => {
    editor?.setFillColor(fillColor)
  }
  const onDeleteAll = () => {
    editor?.deleteAll()
  }
  const onDeleteSelected = () => {
    editor?.deleteSelected()
  }
  const onZoomIn = () => {
    editor?.zoomIn()
  }
  const onZoomOut = () => {
    editor?.zoomOut()
  }
  return (
    <>
      {editor ? (
        <div>
          <button onClick={onZoomIn}>Zoom In</button>
          <button onClick={onZoomOut}>Zoom Out</button>
          <button onClick={onAddCircle}>Add circle</button>
          <button onClick={onAddRectangle}>Add Rectangle</button>
          <button onClick={onAddBorderedRectangle}>
            Add Bordered Rectangle
          </button>
          <button onClick={onAddRightTriangle}>Add Right Triangle</button>
          <button onClick={onAddTriangle}>Add Triangle</button>
          <button onClick={onAddArrow}>Add Arrow</button>
          <button onClick={onAddCubeFace}>Add Cube face</button>
          <button onClick={onAddLine}>Add Line</button>
          <button onClick={onDeleteAll}>Delete All</button>
          <button onClick={onDeleteSelected}>Delete Selected</button>
          <input
            type='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={onAddText}>Add Text</button>
          <input
            type='text'
            value={strokeColor || editor.strokeColor}
            onChange={(e) => setStrokeColor(e.target.value)}
          />
          <button onClick={onSetStrokeColor}>Set Stroke Color</button>
          <input
            type='text'
            value={fillColor || editor.fillColor}
            onChange={(e) => setFillColor(e.target.value)}
          />
          <button onClick={onSetFillColor}>Set Fill Color</button>

          <pre>
            fillColor: {editor.fillColor}, strokeColor: {editor.strokeColor}
          </pre>
          <pre>{JSON.stringify(selectedObjects)}</pre>
        </div>
      ) : (
        <>Loading...</>
      )}
      <div
        style={{
          width: '800px',
          height: '500px',
          border: '1px solid #000000'
        }}
      >
        <FabricJSCanvas className='sample-canvas' onReady={onReady} />
      </div>
    </>
  )
}

export default App
