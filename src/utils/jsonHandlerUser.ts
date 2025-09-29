import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "../data/dbUsers.json");

export function readDataUser() {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

export function writeDataUser(data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}