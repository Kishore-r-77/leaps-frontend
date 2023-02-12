import { Paper } from "@mui/material";
import Table from "react-bootstrap/Table";
import styles from "./customTable.module.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import { TablePagination } from "@mui/material";

function CustomTable({ data, columns, dispatch, ACTIONS, hardDelete }: any) {
  return (
    <Paper className={styles.paperStyle}>
      <Table striped bordered hover>
        <thead className={styles.header}>
          <tr>
            {columns.map((column: { header: string }) => (
              <th key={column.header}>{column.header}</th>
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
