export type customPaginationProps = {
  pageNo: number;
  totalPages: number;
  totalElements: number;
  isLast: boolean;
  setpageSize: React.Dispatch<React.SetStateAction<number>>;
  prevPage: (e: React.MouseEvent<HTMLButtonElement>) => void;
  nexPage: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
