import * as React from 'react';
import { useEffect, useRef } from 'react';

import styled, { css } from 'styled-components';
import { drawCanvas } from './ChartCanvas';

export interface DataPoint {
  name: string;
  data: {
    [key: string]: number;
  };
}
export interface DataPointWithColor extends DataPoint {
  color: string;
}
interface ChartProps {
  height: number;
  data?: DataPoint[];
  cols?: string[];
  maxPoint: number;
}
export interface AnimStep {
  [key: string]: number;
}
const colors = [
  'rgba(255, 0, 0, 0.5)',
  'rgba(0, 0, 255, 0.5)',
  'rgba(0, 255, 0, 0.5)',
];

const animFrameCount = 100;

const Chart = (props: ChartProps) => {
  const {
    height,
    data,
    cols,
    maxPoint,
  } = props;
  const animStep = useRef({} as AnimStep);
  const animFrame = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderKey = (data || []).map((i) => i.name).sort().join(',');

  const dataWithColor: DataPointWithColor[] = (data || []).map((d, i) => {
    return {
      ...d,
      color: colors[i % colors.length],
    };
  });

  const draw = () => {
    let isFinished = true;
    Object.keys(animStep.current).forEach((k) => {
      animStep.current[k] = Math.min(animStep.current[k] + 1, animFrameCount);
      if (animStep.current[k] < animFrameCount) {
        isFinished = false;
      }
    });
    drawCanvas({
      cv: canvasRef.current,
      axes: cols || [],
      data: dataWithColor,
      step: animStep.current,
      animFrameCount,
      maxPoint,
    });
    if (!isFinished) {
      cancelAnimationFrame(animFrame.current);
      animFrame.current = requestAnimationFrame(draw);
    }
  };

  useEffect(() => {
    const currentKeys = Object.keys(animStep.current);
    const dataKeys = (data || []).map((d) => d.name);
    currentKeys.forEach((key) => {
      if (dataKeys.indexOf(key) === -1) {
        delete animStep.current[key];
      }
    });
    dataKeys.forEach((k) => {
      if (typeof animStep.current[k] === 'undefined') {
        animStep.current[k] = 0;
      }
    });

    cancelAnimationFrame(animFrame.current);
    animFrame.current = requestAnimationFrame(draw);
  }, [renderKey]);
  return <Container
    height={height}
  >
    <canvas
      ref={canvasRef}
      width={height * 2}
      height={height * 2}
    ></canvas>
    {(cols || []).map((col) => {

      return <TextBoxDot><TextBox>
        <div>
          {col}
        </div>
        <div>
          {dataWithColor.map((d) => {
            const label = d.name.split(/\s+/).reverse();
            return <div>
              <span>
                {label[0] || ''}
              </span>
              <Chip
                style={{
                  background: d.color,
                }}
              />
            </div>;
          })}
        </div>
      </TextBox></TextBoxDot>;
    })}
  </Container>;
};

interface ContainerProps {
  height: number;
}
const Container = styled.div<ContainerProps>`
  position: absolute;
  text-align: center;
  width: 100%;

  canvas {
    pointer-events: none;
  }
  ${({ height }) => css`
    canvas {
      width: ${height}px;
      height: ${height}px;
    }
  `}
`;

const Chip = styled.div`
  display: inline-block;
  vertical-align: middle;
  width: 12px;
  height: 12px;
  margin: 0 4px;
`;

const TextBoxDot = styled.div`
  width: 1px;
  height: 1px;
  position: absolute;
  left: 50%;
  top: 50%;
`;
const TextBox = styled.div`
  position: absolute;
  padding: 4px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  white-space: nowrap;

  span {
    vertical-align: middle;
  }
`;

export default Chart;