type openorCloseAction = {
  type: string;
};

type recordAction = {
  type: string;
  payload: string;
};

type onChangeAction = {
  type: string;
  payload?: string;
  fieldName?: string;
};

export type parameterAction =
  | onChangeAction
  | recordAction
  | openorCloseAction
  | any;

// type structure for the props that are passed in CustomTable
export type customTableProps = {
  data: {
    id: number;
    parameter: number;
    rule: string;
    shortDescription: string;
    longDescription: string;
  }[];
  columns: {
    field: string;
    header: string;
  }[];
  ACTIONS: {
    ONCHANGE: string;
    EDITCHANGE: string;
    ADDOPEN: string;
    EDITOPEN: string;
    INFOOPEN: string;
    ADDCLOSE: string;
    EDITCLOSE: string;
    INFOCLOSE: string;
    SORT_ASC: string;
    SORT_DESC: string;
  };
  dispatch: React.Dispatch<parameterAction>;
  hardDelete: (id: number) => Promise<void>;
};
