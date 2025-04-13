import { DraftAction } from "../types";

// The official Captain's Mode draft sequence
export const DRAFT_SEQUENCE: DraftAction[] = [
  { type: "ban", team: "radiant" }, // 1
  { type: "ban", team: "dire" }, // 2
  { type: "ban", team: "radiant" }, // 3
  { type: "ban", team: "dire" }, // 4
  { type: "pick", team: "radiant" }, // 5
  { type: "pick", team: "dire" }, // 6
  { type: "pick", team: "dire" }, // 7
  { type: "pick", team: "radiant" }, // 8
  { type: "ban", team: "radiant" }, // 9
  { type: "ban", team: "dire" }, // 10
  { type: "ban", team: "radiant" }, // 11
  { type: "ban", team: "dire" }, // 12
  { type: "pick", team: "dire" }, // 13
  { type: "pick", team: "radiant" }, // 14
  { type: "pick", team: "radiant" }, // 15
  { type: "pick", team: "dire" }, // 16
  { type: "ban", team: "radiant" }, // 17
  { type: "ban", team: "dire" }, // 18
  { type: "ban", team: "radiant" }, // 19
  { type: "ban", team: "dire" }, // 20
  { type: "pick", team: "radiant" }, // 21
  { type: "pick", team: "dire" }, // 22
  { type: "pick", team: "radiant" }, // 23
  { type: "pick", team: "dire" }, // 24
];
