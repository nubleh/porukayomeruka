import { Yomi } from "./App";

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
