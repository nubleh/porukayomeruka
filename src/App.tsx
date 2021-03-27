import * as React from 'react';
import { useEffect, useState } from 'react';
import { getYomiData } from './AppHelpers';

import {
  Container,
  Footer,
  Header,
  ItemList,
  Row,
  RowBar,
  RowContent,
  RowIcon,
  RowName,
  RowScore,
} from './AppStyledComponents';
import Chart from './Chart';

export interface Yomi {
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
const maxCompare = 2;

const App = () => {
  const [yomiItems, setYomiItems] = useState([] as Yomi[]);
  const [hexItems, setHexItems] = useState([] as string[]);
  const [barHeight, setBarHeight] = useState(window.innerHeight / 20);
  const [hexHeight, setHexHeight] = useState(Math.min(
    window.innerHeight / 2,
    window.innerWidth,
  ));
  const [init, setInit] = useState(false);
  const [chartRenderKey, setChartRenderKey] = useState(Date.now());
  useEffect(() => {
    const onResize = () => {
      setBarHeight(window.innerHeight / 20);
      setHexHeight(Math.min(
        window.innerHeight / 2,
        window.innerWidth,
      ));
      setChartRenderKey(Date.now());
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);
  useEffect(() => {
    getYomiData(csvPath).then((data) => {
      setYomiItems(data);
    });
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setInit(true);
    }, 500);
  }, []);
  const toggleHex = (name: string) => {
    setHexItems((prevHexItems) => {
      return [
        ...prevHexItems.filter((item) => item !== name),
        ...(prevHexItems.indexOf(name) === -1 ? [name] : []),
      ].slice(0, maxCompare);
    });
  };

  const order = [...yomiItems].sort((y1, y2) => {
    const y1Selected = hexItems.indexOf(y1.name) !== -1;
    const y2Selected = hexItems.indexOf(y2.name) !== -1;
    if (y1Selected && !y2Selected) {
      return -1;
    }
    if (!y1Selected && y2Selected) {
      return 1;
    }
    return y1.total > y2.total ? -1 : y1.total < y2.total ? 1 : 0;
  }).map((item) => item.name);

  const extraSpace = hexItems.length > 0 ? hexHeight : 0;

  return <Container>
    <Header>
      <img src={'game.png'} alt={'Kuuki Yomi 3'}/>
    </Header>
    {hexItems.length > 0 && <Chart
      key={chartRenderKey}
      height={hexHeight}
      cols={Object.keys(pointBreakdown)}
      data={hexItems.map((name) => {
        const dataItem = yomiItems.find((yomiItem) => yomiItem.name === name);
        if (!dataItem) {
          return {
            name: '',
            data: {},
          };
        }
        return {
          name,
          data: {
            ...dataItem.points,
          },
        };
      }).filter((item) => !!item)}
    />}
    <ItemList
      style={{
        height: `${extraSpace + barHeight * yomiItems.length}px`,
      }}
    >
      {yomiItems.map((yomi) => {
        const width = yomi.total / 1000;
        const index = order.indexOf(yomi.name);
        const isSelected = hexItems.indexOf(yomi.name) !== -1;
        const animOffset = isSelected
          ? hexItems.indexOf(yomi.name) * 0.01
          : hexItems.length > 0
            ? (yomiItems.length - index) * 0.01
            :  index * 0.01;
        return <Row
          barHeight={barHeight}
          key={yomi.name}
          style={{
            transform: `translateY(${extraSpace + index * barHeight}px)`,
            transitionDelay: `${animOffset}s`,
          }}
          onClick={() => {
            toggleHex(yomi.name);
          }}
        >
          <RowBar
            style={{
              transform: `scaleX(${init ? width : 0})`,
              background: isSelected ? '#bbb' : '',
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
    <Footer></Footer>
  </Container>;
};

export default App;
