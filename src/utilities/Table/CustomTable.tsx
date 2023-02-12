import { Button, IconButton, Paper } from "@mui/material";
import Table from "react-bootstrap/Table";
import styles from "./customTable.module.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { customTableProps } from "../../TsTypes/CustomTableTypes";

function CustomTable({
  data,
  columns,
  dispatch,
  ACTIONS,
  hardDelete,
}: customTableProps) {
  return (
    <Paper className={styles.paperStyle}>
      <Table striped bordered hover>
        <thead className={styles.header}>
          <tr>
            {columns.map((column: { field: string; header: string }) => (
              <th key={column.header}>
                {column.header}
                <span>
                  <IconButton
                    onClick={() =>
                      dispatch({
                        type: ACTIONS.SORT_ASC,
                        payload: column.field,
                      })
                    }
                  >
                    <ArrowUpwardIcon className={styles.icon} />
                  </IconButton>
                  <IconButton
                    onClick={() =>
                      dispatch({
                        type: ACTIONS.SORT_DESC,
                        payload: column.field,
                      })
                    }
                  >
                    <ArrowDownwardIcon className={styles.icon} />
                  </IconButton>
                </span>
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row: any) => (
            <tr key={row.id}>
              {columns.map((col: { field: string }) => (
                <td key={col.field}>{row[col.field]}</td>
              ))}
              <td>
                <span className={styles.flexButtons}>
                  <EditIcon
                    color="primary"
                    onClick={() =>
                      dispatch({ type: ACTIONS.EDITOPEN, payload: row })
                    }
                  />
                  <DeleteIcon
                    color="error"
                    onClick={() => hardDelete(row.id)}
                  />
                  <InfoIcon
                    onClick={() =>
                      dispatch({ type: ACTIONS.INFOOPEN, payload: row })
                    }
                  />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Paper>
  );
}

export default CustomTable;
