import * as React from 'react';
import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { getTsukuruData, Tsukuru } from './AppHelpers';

type SortParam = 'dur' | 'durHunter' | 'durDog' | 'durCat';
const imgPath = 'img/';
const csvPath = 'tsukureruka.csv';

const TsukuruChart = () => {
  const [tsukuruItems, setTsukuruItems] = useState([] as Tsukuru[]);
  useEffect(() => {
    getTsukuruData(csvPath).then((data) => {
      setTsukuruItems(data);
    });
  }, []);

  const [sortParam, setSortParam] = useState('dur' as SortParam);
  const sortedData = tsukuruItems.map(i => {
    const durHunter = i.startDog - i.startHunter;
    const durDog = i.startCat - i.startDog;
    const durCat = i.end - i.startCat;
    const dur = i.end - i.startHunter;
    return {
      ...i,
      durHunter,
      durDog,
      durCat,
      dur,
    };
  }).sort((a, b) => {
    if (a.url === b.url) {
      return 0;
    }
    if (a.url === 'offstream') {
      return 1;
    }
    if (b.url === 'offstream') {
      return -1;
    }
    return a[sortParam] === b[sortParam] ? 0 : a[sortParam] < b[sortParam] ? 1 : -1;
  });
  const numberedData = sortedData.filter(i => i.url !== 'offstream');
  const offstreamData = sortedData.filter(i => i.url === 'offstream');

  const maxDur = sortedData[0]?.dur | 1;
  const colors = [
    '#340042',
    '#1f8179',
    '#fce51e',
  ];
  const params = ['dur', 'durHunter', 'durDog', 'durCat'] as SortParam[];

  const [binCount, setBinCount] = useState(5);
  const binSize = maxDur / binCount;
  const bins = [] as Tsukuru[][];
  for (let x = 0; x < binCount; x++) {
    bins.push([]);
  }
  numberedData.forEach(d => {
    const binIndex = Math.floor(d.dur / binSize);
    if (!bins[binIndex]) {
      bins[binIndex] = [];
    }
    bins[binIndex].push(d);
  });
  const highestBin = Math.max(...bins.map(b => b.length));
  const binHeight = 400 / highestBin;

  return <Container>
    {/*
      <div>
        <div onClick={() => {
          setBinCount(binCount + 1);
        }}>more</div>
        <div onClick={() => {
          setBinCount(Math.max(1, binCount - 1));
        }}>less</div>
        <div style={{marginTop: 50}}>{binCount} {binCount < 2 ? 'bin' : 'bins'}</div>
        <Histogram style={{
          width: '400px',
        }}>
          {bins.map((b, i) => {
            const from = Math.round(i * binSize);
            const fromLabel = labelDur(from);
            const to = Math.round((i + 1) * binSize);
            const toLabel = labelDur(to);
            const label = `${from}~${to}`;
            return <div
              style={{
                height: `${b.length * binHeight}px`,
                width: `${100 / binCount}%`,
              }}
            >
              {b.length}
            </div>;
          })}
        </Histogram>
      </div>
    */}
    <div>
      {params.map((d) => {
        return <div
          onClick={() => {
            setSortParam(d);
          }}
        >{d}</div>;
      })}
    </div>
    <h1>
      How long do the HoloHunters take to create their characters?
    </h1>
    <Legend>
      <div>
        <div style={{ backgroundColor: colors[0] }}/>
        <span>
          Hunter
        </span>
      </div>
      <div>
        <div style={{ backgroundColor: colors[1] }}/>
        <span>
          Palamute
        </span>
      </div>
      <div>
        <div style={{ backgroundColor: colors[2] }}/>
        <span>
          Palico
        </span>
      </div>
    </Legend>
    <List>
      {numberedData.map(i => {
        const width1 = `${(i.durHunter / maxDur) * 100}%`;
        const width2 = `${(i.durDog / maxDur) * 100}%`;
        const width3 = `${(i.durCat / maxDur) * 100}%`;
        const labels = [i.durHunter, i.durDog, i.durCat, i.dur].map(secs => labelDur(secs));
        return <ListItem>
          <Icon style={{
            backgroundImage: `url(${imgPath}${i.img})`,
          }}/>
          <Bars>
            <div>
              {[width1, width2, width3].map((w, i) => {
                return <Bar
                  style={{
                    backgroundColor: colors[i],
                    width: w,
                  }}
                />;
              })}
            </div>
            <div>
              <Chip>{labels[0]}</Chip>
              <Eq>+</Eq>
              <Chip>{labels[1]}</Chip>
              <Eq>+</Eq>
              <Chip>{labels[2]}</Chip>
              <Eq>=</Eq>
              <Chip>{labels[3]}</Chip>
            </div>
          </Bars>
        </ListItem>;
      })}
    </List>
    <Offstream>
      <div>
        These hunters created their characters off-stream
      </div>
      {offstreamData.map(i => {
        return <Icon style={{
          backgroundImage: `url(${imgPath}${i.img})`,
        }}/>;
      })}
    </Offstream>
  </Container>;
};
const Offstream = styled.div`
  margin: 20px;

  > div {
    margin: 4px;
  }
`;
const Histogram = styled.div`
  width: 100%;
  font-size: 0.8em;
  text-align: center;
  margin-bottom: 50px;

  > div {
    padding: 2px;
    box-sizing: border-box;
    background: #000;
    color: #fff;
    vertical-align: bottom;
    display: inline-block;
  }
`;
const Container = styled.div`
  padding: 40px;
  box-sizing: border-box;
  width: 100vw;
`;
const Legend = styled.div`
  text-align: center;
  > div {
    margin: 0 8px;
  }
  > div > div {
    width: 12px;
    height: 12px;
    margin: 0 4px;
    border-radius: 4px;
  }
  div, span {
    vertical-align: middle;
    display: inline-block;
  }
`;
const List = styled.div`
`;
const ListItem = styled.div`
  display: flex;
  align-items: center;
  margin: 14px 0;
`;
const Icon = styled.div`
  width: 50px;
  height: 50px;
  background-position: top center;
  background-size: 150% auto;
  display: inline-block;
  flex: none;
  border-radius: 50px;
  box-sizing: border-box;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.3);
`;
const Bar = styled.div`
  vertical-align: middle;
  display: inline-block;
  height: 20px;
`;
const Bars = styled.div`
  flex: 1 1 auto;
  box-sizing: border-box;
  border: solid 10px transparent;
  border-width: 0 10px;

  ${Bar}:first-child {
    border-radius: 4px 0 0 4px;
  }
  ${Bar}:last-child {
    border-radius: 0 4px 4px 0;
  }
`;
const Chip = styled.div`
  white-space: nowrap;
  vertical-align: middle;
  display: inline-block;
  padding: 2px 4px;
  background: silver;
  border-radius: 4px;
  margin: 2px 4px;
  font-size: 0.8em;
`;
const Eq = styled.div`
  vertical-align: middle;
  display: inline-block;
`;

const labelDur = (secs: number) => {
  const H = Math.floor(secs / 3600);
  const M = Math.floor((secs % 3600) / 60);
  const S = Math.floor(secs % 60);
  return !M ? `${S}s` : !H ? `${M}m ${S}s` : `${H}h ${M}m ${S}s`;
}

export default TsukuruChart;
