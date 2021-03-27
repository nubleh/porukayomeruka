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
interface ChartProps {
  height: number;
  data?: DataPoint[];
  cols?: string[];
}
export interface AnimStep {
  [key: string]: number;
}

const animFrameCount = 100;

const Chart = (props: ChartProps) => {
  const {
    height,
    data,
    cols,
  } = props;
  const animStep = useRef({} as AnimStep);
  const animFrame = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderKey = (data || []).map((i) => i.name).sort().join(',');

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
      data: data || [],
      step: animStep.current,
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
  }
  ${({ height }) => css`
    canvas {
      width: ${height}px;
      height: ${height}px;
    }
  `}
`;

export default Chart;