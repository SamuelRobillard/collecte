import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "../data/dbMedia.json");

export function readData() {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

export function writeData(data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
