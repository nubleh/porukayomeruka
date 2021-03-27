import { AnimStep, DataPoint } from "./Chart";

interface DrawCanvasProps {
  cv: HTMLCanvasElement | null;
  axes: string[];
  data: DataPoint[];
  step: AnimStep;
}

const maxPoint = 200;
const colors = [
  'rgba(255, 0, 0, 0.5)',
  'rgba(0, 255, 0, 0.5)',
  'rgba(0, 0, 255, 0.5)',
];

export const drawCanvas = (props: DrawCanvasProps) => {
  const {
    cv,
    axes,
    data,
    step,
  } = props;
  console.log(' drawing! oh boy!');
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
  axes.forEach((axis, index) => {
    const angle = (index / axes.length) * (Math.PI * 2);
    const axX = midX + Math.sin(angle) * radius;
    const axY = midY - Math.cos(angle) * radius;
    axPoints.push([axX, axY]);

    ctx.beginPath();
    ctx.moveTo(midX, midY);
    ctx.lineTo(axX, axY);
    ctx.stroke();
  });
  axPoints.forEach((coord, i) => {
    const nextCoord = axPoints[i + 1] || axPoints[0];
    ctx.beginPath();
    ctx.moveTo(coord[0], coord[1]);
    ctx.lineTo(nextCoord[0], nextCoord[1]);
    ctx.stroke();
  });

  data.forEach((d, dataIndex) => {
    const {
      name,
    } = d;
    const points = [] as Array<[number, number]>;
    axes.forEach((ax, index) => {
      const val = d.data[ax];
      if (val) {
        const rate = val / maxPoint;
        const ratedRadius = rate * radius;
        const angle = (index / axes.length) * (Math.PI * 2);
        const valX = midX + Math.sin(angle) * ratedRadius;
        const valY = midY - Math.cos(angle) * ratedRadius;
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
    ctx.fillStyle = colors[dataIndex % colors.length];
    console.log(ctx.fillStyle);
    ctx.fill(region, 'evenodd');
  });
};
