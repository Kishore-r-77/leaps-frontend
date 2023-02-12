import AddBoxIcon from "@mui/icons-material/AddBox";
import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { useAppSelector } from "../../../redux/app/hooks";
import CustomPagination from "../../../utilities/Pagination/CustomPagination";
import CustomTable from "../../../utilities/Table/CustomTable";
import ParameterModal from "./ParameterModal";
import styles from "./parameterTable.module.css";
import {
  initialValuesType,
  recordType,
} from "../../../TsTypes/ParameterTableTypes";
import { parameterAction } from "../../../TsTypes/CustomTableTypes";

function ParameterTable() {
  //data from getall api
  const [data, setData] = useState([]);

  //data got after rendering from table
  const [record, setRecord] = useState<recordType>({} as recordType);

  //getting token from redux
  const token = useAppSelector((state) => state.users.user.accessToken);

  //Storing Actions into a Variable for Reducer
  const ACTIONS = {
    ONCHANGE: "ONCHANGE",
    EDITCHANGE: "EDITCHANGE",
    ADDOPEN: "ADDOPEN",
    EDITOPEN: "EDITOPEN",
    INFOOPEN: "INFOOPEN",
    ADDCLOSE: "ADDCLOSE",
    EDITCLOSE: "EDITCLOSE",
    INFOCLOSE: "INFOCLOSE",
    SORT_ASC: "SORT_ASC",
    SORT_DESC: "SORT_DESC",
  };

  //Initial State defined
  const initialValues: initialValuesType = {
    parameter: "",
    rule: "",
    longDescription: "",
    shortDescription: "",
    addOpen: false,
    editOpen: false,
    infoOpen: false,
    sortBy: "",
    sortAsc: false,
    sortDesc: false,
  };

  //Reducer Function to be used inside UserReducer hook
  const reducer = (state: initialValuesType, action: parameterAction) => {
    console.log(action, "action top");
    switch (action.type) {
      case ACTIONS.ONCHANGE:
        return {
          ...state,
          [action.fieldName]: action.payload,
        };
      case ACTIONS.EDITCHANGE:
        console.log(action, "action");
        setRecord((prev: any) => ({
          ...prev,
          [action.fieldName]: action.payload,
        }));
        return {
          ...state,
          editOpen: true,
        };
      case ACTIONS.ADDOPEN:
        return {
          ...state,
          addOpen: true,
        };
      case ACTIONS.EDITOPEN:
        setRecord(action.payload);
        return {
          ...state,
          editOpen: true,
        };

      case ACTIONS.INFOOPEN:
        setRecord(action.payload);
        return {
          ...state,
          infoOpen: true,
        };

      case ACTIONS.ADDCLOSE:
        return {
          ...state,
          addOpen: false,
        };

      case ACTIONS.EDITCLOSE:
        return {
          ...state,
          editOpen: false,
        };
      case ACTIONS.INFOCLOSE:
        return {
          ...state,
          infoOpen: false,
        };
      case ACTIONS.SORT_ASC:
        const asc = !state.sortAsc;
        return {
          ...state,
          sortAsc: asc,
          sortBy: action.payload,
        };
      case ACTIONS.SORT_DESC:
        const desc = !state.sortDesc;
        return {
          ...state,
          sortDesc: desc,
          sortBy: action.payload,
        };
      default:
        return initialValues;
    }
  };

  //Creating useReducer Hook
  const [state, dispatch] = useReducer(reducer, initialValues);

  //Columns Defined to Pass into the Custom Table
  const columns = [
    { field: "id", header: "ID" },
    { field: "parameter", header: "Parameter" },
    { field: "rule", header: "Rule" },
    { field: "shortDescription", header: "Short Description" },
    { field: "longDescription", header: "Long Description" },
  ];

  //States Created for Pagination in the Table
  const [pageNo, setpageNo] = useState<number>(0);
  const [pageSize, setpageSize] = useState<number>(5);
  const [isLast, setIsLast] = useState(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);

  //Get all Api
  const getData = () => {
    axios
      .get(`http://localhost:8080/parameter/getall-pagination`, {
        params: {
          pageNo: pageNo,
          pageSize: pageSize,
          sortBy: state.sortBy,
          sortDir: state.sortAsc ? "asc" : state.sortDesc ? "desc" : null,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        setData(resp.data.content);
        setpageNo(resp.data.pageNo);
        setpageSize(resp.data.pageSize);
        setIsLast(resp.data.last);
        setTotalPages(resp.data.totalPages);
        setTotalElements(resp.data.totalElements);
      })
      .catch((err) => console.log(err.message));
  };

  //Add Api
  const handleFormSubmit = async () => {
    const response = await axios.post(
      `http://localhost:8080/parameter/add`,
      state,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    try {
      console.log(response);
      dispatch({ type: ACTIONS.ADDCLOSE });
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  //Edit Api
  const editFormSubmit = async () => {
    const response = await axios.patch(
      `http://localhost:8080/parameter/update/${record.id}`,
      record,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    try {
      console.log(response);
      dispatch({ type: ACTIONS.EDITCLOSE });
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  //Hard Delete Api
  const hardDelete = async (id: number) => {
    const response = await axios.delete(
      `http://localhost:8080/parameter/hard-delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    try {
      console.log(response);
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  //UseEffect Function to render data on Screen Based on Dependencies
  useEffect(() => {
    getData();
    return () => {};
  }, [pageNo, pageSize, state.sortAsc, state.sortDesc]);

  //Pagination Function to navigate to Next page
  const nexPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isLast) {
      return;
    }
    setpageNo((prev) => prev + 1);
  };

  //Pagination Function to navigate to Previous page
  const prevPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (pageNo < 0) {
      return;
    }
    setpageNo((prev) => prev - 1);
  };

  return (
    <div>
      <header className={styles.flexStyle}>
        <h1>Parameter Table</h1>
        <Button
          style={{
            marginTop: "1rem",
            maxWidth: "40px",
            maxHeight: "40px",
            minWidth: "40px",
            minHeight: "40px",
            backgroundColor: "#0a3161",
          }}
          variant="contained"
          color="primary"
          onClick={() => dispatch({ type: ACTIONS.ADDOPEN })}
        >
          <AddBoxIcon />
        </Button>
      </header>
      <CustomTable
        data={data}
        columns={columns}
        ACTIONS={ACTIONS}
        dispatch={dispatch}
        hardDelete={hardDelete}
      />
      <CustomPagination
        pageNo={pageNo}
        totalPages={totalPages}
        totalElements={totalElements}
        isLast={isLast}
        setpageSize={setpageSize}
        prevPage={prevPage}
        nexPage={nexPage}
      />
      <ParameterModal
        state={state}
        record={record}
        dispatch={dispatch}
        handleFormSubmit={state.addOpen ? handleFormSubmit : editFormSubmit}
        ACTIONS={ACTIONS}
      />
    </div>
  );
}

export default ParameterTable;
