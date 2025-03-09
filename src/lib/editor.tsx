import { fabric } from 'fabric'
import {
  CIRCLE,
  RECTANGLE,
  TRIANGLE,
  CUBE_FACE,
  LINE,
  ARROW,
  TEXT,
  FILL,
  STROKE,
  RIGHT_TRIANGLE
} from './defaultShapes'
import { useEffect, useState } from 'react'
import calculateArrowPoints from './calculateArrowPoints'

export interface ShapeParams {
  x?: number
  y?: number
}

export interface FabricJSEditor {
  canvas: fabric.Canvas
  addCircle: (params?: ShapeParams) => void
  addRectangle: (params?: ShapeParams) => void
  addBorderedRectangle: (params?: ShapeParams) => void
  addRightTriangle: (params?: ShapeParams) => void
  addTriangle: (params?: ShapeParams) => void
  addArrow: (params?: ShapeParams) => void
  addCubeFace: (params?: ShapeParams) => void
  setBrushColor: (color: string) => void
  addLine: () => void
  addText: (text: string) => void
  updateText: (text: string) => void
  deleteAll: () => void
  deleteSelected: () => void
  fillColor: string
  strokeColor: string
  setFillColor: (color: string) => void
  setStrokeColor: (color: string) => void
  zoomIn: () => void
  zoomOut: () => void
}

/**
 * Creates editor
 */
const buildEditor = (
  canvas: fabric.Canvas,
  fillColor: string,
  strokeColor: string,
  _setFillColor: (color: string) => void,
  _setStrokeColor: (color: string) => void,
  scaleStep: number
): FabricJSEditor => {
  return {
    canvas,
    addCircle: (params: ShapeParams = {}) => {
      const object = new fabric.Circle({
        ...CIRCLE(params),
        fill: fillColor,
        stroke: strokeColor
      })
      canvas.add(object)
    },
    addRectangle: (params: ShapeParams = {}) => {
      const object = new fabric.Rect({
        ...RECTANGLE(params),
        fill: fillColor,
        stroke: strokeColor
      })
      canvas.add(object)
    },
    addBorderedRectangle: (params: ShapeParams = {}) => {
      const object = new fabric.Rect({
        ...RECTANGLE(params),
        fill: fillColor,
        stroke: strokeColor,
        rx: 10,
        ry: 10,
        height: 80,
        strokeLineJoin: 'round',
        strokeWidth: 4,
        strokeUniform: true,
        padding: 10
      })
      canvas.add(object)
    },
    addTriangle: (params: ShapeParams = {}) => {
      const object = new fabric.Triangle({
        ...TRIANGLE(params),
        fill: fillColor,
        stroke: strokeColor
      })
      canvas.add(object)
    },
    addRightTriangle: (params: ShapeParams = {}) => {
      const object = new fabric.Polyline(
        [
          { x: 0, y: 15 },
          { x: 95, y: 15 },
          { x: 95, y: 85 },
          { x: 0, y: 15 },
          { x: 95, y: 15 }
        ],
        {
          ...RIGHT_TRIANGLE(params),
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: 5,
          strokeUniform: true,
          padding: 10
        }
      )
      canvas.add(object)
    },
    addArrow: (params: ShapeParams = {}) => {
      const startPoint = { x: params.x || 100, y: params.y || 100 }
      const endPoint = { x: startPoint.x + 100, y: startPoint.y + 100 }

      const object = new fabric.Group(
        calculateArrowPoints(startPoint, endPoint, fillColor),
        {
          ...ARROW(params),
          stroke: strokeColor
        }
      )

      canvas.add(object)
    },
    addCubeFace: (params: ShapeParams = {}) => {
      const width = 50
      const height = 50
      const depth = 10

      const upperFaceVertices = [
        { x: width / 2, y: 0 },
        { x: width, y: height / 2 },
        { x: width / 2, y: height },
        { x: 0, y: height / 2 }
      ]

      const object = new fabric.Polygon(upperFaceVertices, {
        ...CUBE_FACE(params),
        stroke: strokeColor
      })

      canvas.add(object)
    },
    addLine: () => {
      const object = new fabric.Line(LINE.points, {
        ...LINE.options,
        stroke: strokeColor
      })
      canvas.add(object)
    },
    addText: (text: string) => {
      // use stroke in text fill, fill default is most of the time transparent
      const object = new fabric.Textbox(text, { ...TEXT, fill: strokeColor })
      object.set({ text: text })
      canvas.add(object)
    },
    updateText: (text: string) => {
      const objects: any[] = canvas.getActiveObjects()
      if (objects.length && objects[0].type === TEXT.type) {
        const textObject: fabric.Textbox = objects[0]
        textObject.set({ text })
        canvas.renderAll()
      }
    },
    deleteAll: () => {
      canvas.getObjects().forEach((object) => canvas.remove(object))
      canvas.discardActiveObject()
      canvas.renderAll()
    },
    deleteSelected: () => {
      canvas.getActiveObjects().forEach((object) => canvas.remove(object))
      canvas.discardActiveObject()
      canvas.renderAll()
    },
    fillColor,
    strokeColor,
    setFillColor: (fill: string) => {
      _setFillColor(fill)
      canvas.getActiveObjects().forEach((object: any) => {
        if (object.type === 'group') {
          object?._objects.forEach((obj: any) => {
            obj.set({ fill, stroke: fill })
          })
        } else {
          object.set({ fill })
        }
      })
      canvas.renderAll()
    },
    setStrokeColor: (stroke: string) => {
      _setStrokeColor(stroke)
      canvas.getActiveObjects().forEach((object) => {
        if (object.type === TEXT.type) {
          // use stroke in text fill
          object.set({ fill: stroke })
          return
        }
        object.set({ stroke })
      })
      canvas.renderAll()
    },
    setBrushColor: (color: string) => {
      canvas.freeDrawingBrush.color = color
    },
    zoomIn: () => {
      const zoom = canvas.getZoom()
      canvas.setZoom(zoom / scaleStep)
    },
    zoomOut: () => {
      const zoom = canvas.getZoom()
      canvas.setZoom(zoom * scaleStep)
    }
  }
}

interface FabricJSEditorState {
  editor?: FabricJSEditor
}

interface FabricJSEditorHook extends FabricJSEditorState {
  selectedObjects?: fabric.Object[]
  onReady: (canvas: fabric.Canvas) => void
}

interface FabricJSEditorHookProps {
  defaultFillColor?: string
  defaultStrokeColor?: string
  scaleStep?: number
}

const useFabricJSEditor = (
  props: FabricJSEditorHookProps = {}
): FabricJSEditorHook => {
  const scaleStep = props.scaleStep || 0.5
  const { defaultFillColor, defaultStrokeColor } = props
  const [canvas, setCanvas] = useState<null | fabric.Canvas>(null)
  const [fillColor, setFillColor] = useState<string>(defaultFillColor || FILL)
  const [strokeColor, setStrokeColor] = useState<string>(
    defaultStrokeColor || STROKE
  )
  const [selectedObjects, setSelectedObject] = useState<fabric.Object[]>([])
  useEffect(() => {
    const bindEvents = (canvas: fabric.Canvas) => {
      canvas.on('selection:cleared', () => {
        setSelectedObject([])
      })
      canvas.on('selection:created', (e: any) => {
        setSelectedObject(e.selected)
      })
      canvas.on('selection:updated', (e: any) => {
        setSelectedObject(e.selected)
      })
    }
    if (canvas) {
      bindEvents(canvas)
    }
  }, [canvas])

  return {
    selectedObjects,
    onReady: (canvasReady: fabric.Canvas): void => {
      console.log('Fabric canvas ready')
      setCanvas(canvasReady)
    },
    editor: canvas
      ? buildEditor(
          canvas,
          fillColor,
          strokeColor,
          setFillColor,
          setStrokeColor,
          scaleStep
        )
      : undefined
  }
}

export { buildEditor, useFabricJSEditor }
export type { FabricJSEditorHook }
