//Type Structure for initial state
export type initialValuesType = {
  parameter: string;
  rule: string;
  longDescription: string;
  shortDescription: string;
  addOpen: boolean;
  editOpen: boolean;
  infoOpen: boolean;
  sortBy: string;
  sortAsc: boolean;
  sortDesc: boolean;
};

export type recordType = {
  id: number;
  parameter: number;
  rule: string;
  shortDescription: string;
  longDescription: string;
};
