import { fabric } from 'fabric'

const calculateArrowPoints = (startPoint: any, endPoint: any) => {
  const arrowWidth = 2
  const arrowColor = 'black'
  const startX = startPoint.x
  const startY = startPoint.y
  const endX = endPoint.x
  const endY = endPoint.y

  const arrowheadSize = arrowWidth * 10

  // Create the arrow shaft (line)
  const arrowShaft = new fabric.Line([startX, startY, endX, endY], {
    fill: arrowColor,
    stroke: arrowColor,
    strokeWidth: arrowWidth + 2
  })

  // Calculate the arrowhead points
  const angle = Math.atan2(endY - startY, endX - startX)
  const arrowheadPoints = [
    { x: endX + 4, y: endY + 4 },
    {
      x: endX - arrowheadSize * Math.cos(angle - Math.PI / 6),
      y: endY - arrowheadSize * Math.sin(angle - Math.PI / 6)
    },
    {
      x: endX - arrowheadSize * Math.cos(angle + Math.PI / 6),
      y: endY - arrowheadSize * Math.sin(angle + Math.PI / 6)
    }
  ]

  // Create the arrowhead (triangle)
  const arrowHead = new fabric.Polygon(arrowheadPoints, {
    fill: arrowColor,
    stroke: arrowColor,
    strokeWidth: 1
  })

  return [arrowShaft, arrowHead]
}

export default calculateArrowPoints
