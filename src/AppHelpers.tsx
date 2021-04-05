import { Yomi } from "./YomiChart";

export const getYomiData = (csvPath: string) => {
  return new Promise<Yomi[]>((resolve) => {
    fetch(csvPath).then((resp) => resp.text()).then((csv) => {
      resolve(parseYomiCSV(csv));
    });
  });
};

export const parseYomiCSV = (csv: string) => {
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
      if (header && header !== '0' && val) {
        item.points[header] = val;
      }
    }
    data.push(item);
  });
  return data;
};

export interface Tsukuru {
  name: string;
  url: string;
  img: string;
  startHunter: number;
  startDog: number;
  startCat: number;
  end: number;
}
export const getTsukuruData = (csvPath: string) => {
  return new Promise<Tsukuru[]>((resolve) => {
    fetch(csvPath).then((resp) => resp.text()).then((csv) => {
      resolve(parseTsukuruCSV(csv));
    });
  });
};

export const parseTsukuruCSV = (csv: string) => {
  const rows = csv.split("\n");
  const headers = rows[1].split(',');
  const data: Tsukuru[] = [];
  rows.forEach((row) => {
    const cols = row.split(',');
    const name = cols[0];
    if (!name || !cols[1]) {
      return;
    }
    const startHunter = durToSecs(cols[3]);
    const startDog = durToSecs(cols[4]);
    const startCat = durToSecs(cols[6]);
    const end = durToSecs(cols[8]);
    const item: Tsukuru = {
      name,
      url: cols[1],
      img: cols[2],
      startHunter,
      startDog,
      startCat,
      end,
    };
    data.push(item);
  });
  return data;
};

const durToSecs = (dur: string) => {
  if (!dur) {
    return 0;
  }
  const factors = [1, 60, 60 * 60];
  const nums = dur.split(':').reverse();
  let secs = 0;
  for (let x = 0; x < nums.length; x++) {
    secs += (parseInt(nums[x], 10) || 0) * factors[x];
  }
  return secs;
};
