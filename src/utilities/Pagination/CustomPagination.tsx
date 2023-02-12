import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Form } from "react-bootstrap";
import styles from "./customPagination.module.css";
import { IconButton } from "@mui/material";

function CustomPagination({
  pageNo,
  totalPages,
  totalElements,
  isLast,
  setpageSize,
  prevPage,
  nexPage,
}: any) {
  return (
    <div>
      <div className={styles.pagination}>
        <h4>Page No: {pageNo + 1}</h4>
        <h4>Total Pages: {totalPages}</h4>
        <h4>Total Elements: {totalElements}</h4>
        <h4>Last Page: {isLast ? "True" : "False"}</h4>
        <Form.Select
          size="sm"
          name="pageSize"
          className={styles["form-select"]}
          onChange={(e: any) => setpageSize(parseInt(e.target.value))}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="25">25</option>
        </Form.Select>

        <span>
          <IconButton onClick={prevPage} disabled={pageNo < 1 ? true : false}>
            <ArrowBackIosIcon
              className={pageNo < 1 ? styles["icon-disabled"] : styles.icon}
            />
          </IconButton>
          <IconButton onClick={nexPage} disabled={isLast}>
            <ArrowForwardIosIcon
              className={isLast ? styles["icon-disabled"] : styles.icon}
            />
          </IconButton>
        </span>
      </div>
    </div>
  );
}

export default CustomPagination;
