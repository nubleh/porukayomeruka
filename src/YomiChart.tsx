import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { getYomiData } from './AppHelpers';

import {
  ChartContainer,
  Container,
  Footer,
  Header,
  ItemList,
  ItemListHeader,
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
const words: { [key: string]: string } = {
  '知識': 'Knowledge',
  '役割理解': 'Understanding one\'s role',
  '共感': 'Empathy',
  '洞察': 'Insight',
  'タイミング': 'Timing',
};

const imgPath = 'img/';
const csvPath = 'yomeruka.csv';
const maxCompare = 2;

const YomiChart = () => {
  const [yomiItems, setYomiItems] = useState([] as Yomi[]);
  const [hexItems, setHexItems] = useState([] as string[]);
  const [barHeight, setBarHeight] = useState(window.innerHeight / 20);
  const [hexHeight, setHexHeight] = useState(Math.min(
    window.innerHeight / 2,
    window.innerWidth,
  ));
  const [init, setInit] = useState(false);
  const [chartRenderKey, setChartRenderKey] = useState(Date.now());
  const heightRef = useRef(window.innerHeight);
  const [sortCol, setSortCol] = useState('');
  useEffect(() => {
    const onResize = () => {
      const diff = Math.abs(heightRef.current - window.innerHeight);
      heightRef.current = window.innerHeight;
      if (diff < 100) {
        return;
      }
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
  useEffect(() => {
    if (hexItems.length === 0) {
      setSortCol('');
    }
  }, [hexItems]);
  const toggleHex = (name: string) => {
    setHexItems((prevHexItems) => {
      return [
        ...prevHexItems.filter((item) => item !== name),
        ...(prevHexItems.indexOf(name) === -1 ? [name] : []),
      ].slice(0, maxCompare);
    });
  };

  const order = [...yomiItems].sort((y1, y2) => {
    // const y1Selected = hexItems.indexOf(y1.name) !== -1;
    // const y2Selected = hexItems.indexOf(y2.name) !== -1;
    // if (y1Selected && !y2Selected) {
    //   return -1;
    // }
    // if (!y1Selected && y2Selected) {
    //   return 1;
    // }
    const y1Val = sortCol ? y1.points[sortCol] : y1.total;
    const y2Val = sortCol ? y2.points[sortCol] : y2.total;
    return y1Val > y2Val ? -1 : y1Val < y2Val ? 1 : 0;
  }).map((item) => item.name);

  const extraSpace = hexItems.length > 0 ? hexHeight : 0;

  return <Container>
    <Header>
      <img src={'game.png'} alt={'Kuuki Yomi 3'}/>
    </Header>
    {hexItems.length > 0 && <ChartContainer><Chart
      key={chartRenderKey}
      height={hexHeight}
      cols={Object.keys(pointBreakdown)}
      optionalSort={sortCol}
      setOptionalSort={(col) => {
        if (col === sortCol) {
          setSortCol('');
        } else {
          setSortCol(col);
        }
      }}
      maxPoint={Math.max(...yomiItems.map((y) => {
        return Math.max(...Object.keys(pointBreakdown).map((k) => {
          return y.points[k];
        }));
      }))}
      data={hexItems.map((name) => {
        const dataItem = yomiItems.find((yomiItem) => yomiItem.name === name);
        if (!dataItem) {
          return {
            name: '',
            data: {},
            img: '',
          };
        }
        return {
          name,
          data: {
            ...dataItem.points,
          },
          img: `${imgPath}${dataItem.img}`,
        };
      }).filter((item) => !!item)}
    /></ChartContainer>}
    <ItemList
      style={{
        height: `${extraSpace + (barHeight * (yomiItems.length + 1))}px`,
      }}
    >
      <ItemListHeader
        barHeight={barHeight}
        style={{
          transform: `translateY(${extraSpace}px)`,
          transitionDelay: `${hexItems.length > 0
            ? yomiItems.length * 0.01
            : 0
          }s`,
        }}
        onClick={() => {
          const cols = Object.keys(pointBreakdown);
          const currentIndex = cols.indexOf(sortCol);
          const nextCol = cols[currentIndex + 1];
          setSortCol(nextCol || '');
        }}
      >
        {sortCol ? `${sortCol} (${words[sortCol]})` : 'Total'}
      </ItemListHeader>
      {yomiItems.map((yomi) => {
        const val = sortCol ? yomi.points[sortCol] : yomi.total;
        const width = sortCol ? val / 200 : yomi.total / 1000;
        const index = order.indexOf(yomi.name);
        const isSelected = hexItems.indexOf(yomi.name) !== -1;
        const animOffset = (false && isSelected)
          ? hexItems.indexOf(yomi.name) * 0.01
          : hexItems.length > 0
            ? (yomiItems.length - index) * 0.01
            :  index * 0.01;
        return <Row
          barHeight={barHeight}
          key={yomi.name}
          style={{
            transform: `translateY(${extraSpace + (index + 1) * barHeight}px)`,
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
              {index + 1}. {yomi.name} (<a
                href={yomi.url}
                target={'_blank'}
                rel={'noopener noreferrer'}
              >stream</a>)
            </RowName>
            <RowScore>
              {val}
            </RowScore>
          </RowContent>
        </Row>;
      })}
    </ItemList>
    <Footer></Footer>
  </Container>;
};

export default YomiChart;
