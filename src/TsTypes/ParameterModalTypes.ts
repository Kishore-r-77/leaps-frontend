import { parameterAction } from "./CustomTableTypes";
import { recordType } from "./ParameterTableTypes";

export type parameterModalType = {
  state: {
    sortAsc: boolean;
    sortBy: any;
    parameter: string;
    rule: string;
    longDescription: string;
    shortDescription: string;
    addOpen: boolean;
    editOpen: boolean;
    infoOpen: boolean;
    sortDesc: boolean;
  };
  record: recordType;
  dispatch: React.Dispatch<parameterAction>;
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
  handleFormSubmit: () => Promise<void>;
};
