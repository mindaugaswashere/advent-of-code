import fs from "fs";
import { format } from "path";

function program1(ranges: string[]) {
  let sum = 0;
  ranges.forEach((range: string) => {
    const [from, to] = range.split("-");
    const ids = formatIds(from, to);
    ids.forEach((id) => {
      if (id.length % 2 == 0) {
        const [a, b] = id.split("", id.length / 2 - 1);
        console.log({ ids, id, a, b });
      }
    });
  });
}

function formatIds(from: string, to: string): string[] {
  let ids: string[] = [];
  for (let i = parseInt(from); i <= parseInt(to); i++) {
    ids.push(`${i}`);
  }
  return ids;
}

fs.readFile("./input.txt", "utf8", (err: any, data: string) => {
  if (err) {
    console.error(err);
    return;
  }

  const units = data.split(",");
  const answer = program1(units);
});
