import { ShapeParams } from './editor'

export const STROKE = '#000000'
export const FILL = 'rgba(0, 0, 0, 1)'

export const CIRCLE = ({ x, y }: ShapeParams) => ({
  radius: 20,
  left: x || 100,
  top: y || 100,
  strokeWidth: 4,
  strokeUniform: true,
  fill: FILL
})

export const RECTANGLE = ({ x, y }: ShapeParams) => ({
  left: x || 100,
  top: y || 100,
  fill: FILL,
  strokeWidth: 4,
  strokeUniform: true,
  width: 40,
  height: 40,
  angle: 0
})

export const TRIANGLE = ({ x, y }: ShapeParams) => ({
  left: x || 100,
  top: y || 100,
  fill: FILL,
  strokeWidth: 4,
  strokeUniform: true,
  width: 40,
  height: 40,
  angle: 0
})

export const RIGHT_TRIANGLE = ({ x, y }: ShapeParams) => ({
  left: x || 100,
  top: y || 100,
  fill: FILL,
  strokeWidth: 4,
  strokeUniform: true,
  width: 40,
  height: 40,
  angle: 180
})

export const ARROW = ({ x, y }: ShapeParams) => ({
  left: x || 100,
  top: y || 100,
  fill: 'black',
  strokeWidth: 4,
  strokeUniform: true,
  width: 100,
  height: 100
})

export const CUBE_FACE = ({ x, y }: ShapeParams) => ({
  left: x || 100,
  top: y || 100,
  fill: 'black',
  strokeWidth: 4,
  strokeUniform: true,
  width: 50,
  height: 50
})

export const LINE = {
  points: [50, 100, 200, 200],
  options: {
    left: 170,
    top: 150,
    stroke: STROKE
  }
}

export const TEXT = {
  type: 'text',
  left: 100,
  top: 100,
  fontSize: 16,
  fontFamily: 'Arial',
  fill: STROKE
}
