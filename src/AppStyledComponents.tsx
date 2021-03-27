import styled, { css } from "styled-components";

export const Container = styled.div`
  font-family: sans-serif;
  background: #fff;
`;

export const ChartContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const Header = styled.div`
  text-align: center;
  padding: 16px;
  img {
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    max-height: 25vw;
  }
`;

export const ItemList = styled.div`
  margin: 8px 0;
  position: relative;
`;

interface RowProps {
  barHeight: number;
}

export const ItemListHeader = styled.div<RowProps>`
  text-align: right;
  transition: transform 0.5s;
  padding: 0 8px;
  font-weight: bold;
  ${({ barHeight }) => css`
    height: ${barHeight}px;
    line-height: ${barHeight}px;
  `}
`;

export const RowBar = styled.div`
  position: absolute;
  top: 0;
  background: #ddd;
  width: 100%;
  transition: transform 1s;
  transform-origin: top left;
`;
export const RowIcon = styled.div`
  background-size: 150% auto;
  background-position: center top;
`;
export const Row = styled.div<RowProps>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  transition: transform 0.5s;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
  ${({ barHeight }) => css`
    height: ${barHeight}px;
    line-height: ${barHeight}px;

    ${RowBar} {
      left: ${barHeight}px;
      height: ${barHeight}px;
    }

    ${RowIcon} {
      width: ${barHeight}px;
      height: ${barHeight}px;
    }
  `}
`;

export const RowContent = styled.div`
  position: relative;
  display: flex;
  z-index: 5;
`;
export const RowName = styled.div`
  flex: 1 1 auto;
  padding: 0 8px;
`;
export const RowScore = styled.div`
  flex: none;
  padding: 0 8px;
`;

export const Footer = styled.div`
    height: 50vw;
`;
