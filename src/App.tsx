import * as React from 'react';
import { useEffect, useState } from 'react';

import styled, { css } from 'styled-components';

interface Yomi {
  name: string;
  url: string;
  total: number;
  points: { [key: string]: number };
  img: string;
};

const pointBreakdown = {
  '知識': ['常識力', '専門知識'],
  '役割理解': ['空間認識', '集団力'],
  '共感': ['人情力', '大人力'],
  '洞察': ['情報統合力', '瞬発力'],
  'タイミング': ['リズム感', '間合い'],
};

const imgPath = 'img/';
const csvPath = 'yomeruka.csv';

const App = () => {
  const [yomiItems, setYomiItems] = useState([] as Yomi[]);
  const [hexItems, setHexItems] = useState([] as string[]);
  const [barHeight, setBarHeight] = useState(window.innerHeight / 20);
  const [hexHeight, setHexHeight] = useState(Math.min(
    window.innerHeight / 2,
    window.innerWidth,
  ));
  useEffect(() => {
    const onResize = () => {
      setBarHeight(window.innerHeight / 20);
      setHexHeight(Math.min(
        window.innerHeight / 2,
        window.innerWidth,
      ));
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);
  useEffect(() => {
    getYomiData().then((data) => {
      setYomiItems(data);
    });
  }, []);
  const toggleHex = (name: string) => {
    setHexItems((prevHexItems) => {
      return [
        ...prevHexItems.filter((item) => item !== name),
        ...(prevHexItems.indexOf(name) === -1 ? [name] : []),
      ];
    });
  };

  const order = [...yomiItems].sort((y1, y2) => {
    return y1.total > y2.total ? -1 : y1.total < y2.total ? 1 : 0;
  }).map((item) => item.name);

  const extraSpace = hexItems.length > 0 ? hexHeight : 0;

  return <Container>
    <Header>
      <img src={'game.png'} alt={'Kuuki Yomi 3'}/>
    </Header>
    <ItemList
      style={{
        height: `${extraSpace + barHeight * yomiItems.length}px`,
      }}
    >
      {yomiItems.map((yomi) => {
        const width = yomi.total / 1000;
        const index = order.indexOf(yomi.name);
        const isSelected = hexItems.indexOf(yomi.name) !== -1;
        return <Row
          barHeight={barHeight}
          key={yomi.name}
          style={{
            transform: `translateY(${extraSpace + index * barHeight}px)`,
          }}
          onClick={() => {
            toggleHex(yomi.name);
          }}
        >
          <RowBar
            style={{
              width: `${width * 100}%`,
              background: isSelected ? '#ccc' : '',
            }}
          />
          <RowContent>
            <RowIcon
              style={yomi.img ? {
                backgroundImage: `url(${imgPath}${yomi.img})`,
              } : {}}
            />
            <RowName>
              {yomi.name}
            </RowName>
            <RowScore>
              {yomi.total}
            </RowScore>
          </RowContent>
        </Row>;
      })}
    </ItemList>
  </Container>;
};

const Container = styled.div`
  font-family: sans-serif;
  background: #fff;
`;

const Header = styled.div`
  text-align: center;
  padding: 16px;
  img {
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
`;

const ItemList = styled.div`
  margin: 8px 0;
  position: relative;
`;
interface RowProps {
  barHeight: number;
}
const RowBar = styled.div`
  position: absolute;
  top: 0;
  background: #ddd;
`;
const RowIcon = styled.div`
  background-size: 150% auto;
  background-position: center top;
`;
const Row = styled.div<RowProps>`
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
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  transition: transform 1s;
`;

const RowContent = styled.div`
  position: relative;
  display: flex;
  z-index: 5;
`;
const RowName = styled.div`
  flex: 1 1 auto;
  padding: 0 8px;
`;
const RowScore = styled.div`
  flex: none;
  padding: 0 8px;
`;

const getYomiData = () => {
  return new Promise<Yomi[]>((resolve) => {
    fetch(csvPath).then((resp) => resp.text()).then((csv) => {
      resolve(parseYomiCSV(csv));
    });
  });
};

const parseYomiCSV = (csv: string) => {
  const rows = csv.split("\n");
  const headers = rows[1].split(',');
  const data: Yomi[] = [];
  rows.forEach((row) => {
    const cols = row.split(',');
    const name = cols[0];
    const total = parseInt(cols[3], 10) || 0;
    if (!name || !total) {
      return;
    }
    const item: Yomi = {
      name,
      url: cols[1],
      img: cols[2],
      total,
      points: {},
    };
    for (let x = 3; x < headers.length; x++) {
      const header = headers[x];
      const val = parseInt(cols[x] || '', 10);
      if (header && val) {
        item.points[header] = val;
      }
    }
    data.push(item);
  });
  return data;
};

export default App;
