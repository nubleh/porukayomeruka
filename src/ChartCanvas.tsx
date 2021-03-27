import { AnimStep, DataPointWithColor } from "./Chart";

interface DrawCanvasProps {
  cv: HTMLCanvasElement | null;
  axes: string[];
  data: DataPointWithColor[];
  step: AnimStep;
  animFrameCount: number;
  maxPoint: number;
}

export const drawCanvas = (props: DrawCanvasProps) => {
  const {
    cv,
    axes,
    data,
    step,
    animFrameCount,
    maxPoint,
  } = props;
  const ctx = cv?.getContext('2d');
  if (!cv || !ctx) {
    return;
  }
  cv.width = cv.width;
  const radius = cv.width * 0.3;
  const midX = cv.width / 2;
  const midY = cv.height / 2;
  ctx.lineWidth = 4;

  const axPoints = [] as Array<[number, number]>;
  // calculate edge points
  axes.forEach((_, index) => {
    const angle = (index / axes.length) * (Math.PI * 2);
    const axX = midX + Math.sin(angle) * radius;
    const axY = midY - Math.cos(angle) * radius;
    axPoints.push([axX, axY]);
  });
  const bgRegion = new Path2D();
  bgRegion.moveTo(axPoints[0][0], axPoints[0][1]);
  // draw the polygon
  axPoints.forEach((coord, i) => {
    const nextCoord = axPoints[i + 1] || axPoints[0];
    ctx.beginPath();
    ctx.moveTo(coord[0], coord[1]);
    ctx.lineTo(nextCoord[0], nextCoord[1]);
    ctx.stroke();
    bgRegion.lineTo(nextCoord[0], nextCoord[1]);
  });
  bgRegion.closePath();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.fill(bgRegion, 'evenodd');

  // draw the lines from center to edges of polygon
  axPoints.forEach(([axX, axY]) => {
    ctx.beginPath();
    ctx.moveTo(midX, midY);
    ctx.lineTo(axX, axY);
    ctx.stroke();
  });

  // draw text
  // const fontSize = radius / 8;
  // axes.forEach((label, index) => {
  //   const angle = (index / axes.length) * (Math.PI * 2);
  //   const axX = midX + Math.sin(angle) * radius * 1.05;
  //   const axY = midY - Math.cos(angle) * radius * 1.05;
  //   const biasX = axX - midX;
  //   const biasY = axY - midY > 0 ? fontSize : -fontSize;
  //   ctx.font = `${fontSize}px sans-serif`;
  //   ctx.textAlign = biasX < 0 ? 'end' : biasX > 0 ? 'start' : 'center';
  //   ctx.fillStyle = '#000';
  //   ctx.fillText(` ${label} `, axX, axY + biasY);
  // });

  data.forEach((d, dataIndex) => {
    const {
      name,
      color,
    } = d;
    const dStep = step[name];
    const segmentSize = animFrameCount / axes.length;
    const points = [] as Array<[number, number]>;
    axes.forEach((ax, index) => {
      const val = d.data[ax];
      if (val) {
        const rate = val / maxPoint;
        const ratedRadius = rate * radius;

        const prevSegment = segmentSize * index;
        const segmentStep = Math.min(segmentSize, Math.max(0, dStep - prevSegment));
        const steppedRadius = ratedRadius * (segmentStep / segmentSize);
        const angle = (index / axes.length) * (Math.PI * 2);
        const valX = midX + Math.sin(angle) * steppedRadius;
        const valY = midY - Math.cos(angle) * steppedRadius;
        points.push([valX, valY]);
      } else {
        points.push([midX, midY]);
      }
    });

    const region = new Path2D();
    region.moveTo(points[0][0], points[0][1]);
    points.forEach((coord, i) => {
      const nextCoord = points[i + 1] || points[0];
      region.lineTo(nextCoord[0], nextCoord[1]);
    });
    region.closePath();
    ctx.fillStyle = color;
    ctx.fill(region, 'evenodd');
  });
};
