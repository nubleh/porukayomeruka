import * as React from 'react';
import styled, { css } from 'styled-components';

interface ChartProps {
  height: number;
}
const Chart = (props: ChartProps) => {
  const {
    height,
  } = props;
  return <Container
    height={height}
  >
    <canvas
      width={1000}
      height={1000}
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