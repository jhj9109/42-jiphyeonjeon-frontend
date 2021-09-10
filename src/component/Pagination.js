/* eslint-disable react/prop-types */
import React from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { useHistory } from "react-router-dom";
import ArrRight from "../img/arrow_right_black.svg";
import { lastPageNum } from "./Books";
import { sortBy } from "./Sort";
import { userCategory } from "./CategoryFilter";
import "../css/Pagination.css";

export const currentPage = atom({ key: "currentPage", default: 1 });
export const pageRangeState = atom({
  key: "pageRangeState",
  default: 0,
});

const PageButton = ({ pageNum }) => {
  // eslint-disable-next-line prefer-const
  let history = useHistory();
  const current = useRecoilValue(currentPage);
  const sort = useRecoilValue(sortBy);
  const cate = useRecoilValue(userCategory);

  const changePage = () => {
    history.push(`?page=${pageNum}&category=${cate}&sort=${sort}`);
  };

  return (
    <button
      type="button"
      onClick={changePage}
      className={`page-button font-20 ${
        parseInt(current, 10) === pageNum ? "color-54" : "color-a4"
      }`}
    >
      {pageNum}
    </button>
  );
};

const PrePageButton = () => {
  const [pageRange, setPageRange] = useRecoilState(pageRangeState);
  const changePage = () => {
    if (pageRange > 0) {
      setPageRange(pageRange - 1);
    }
  };
  return (
    <button className="pre-page-button" type="button" onClick={changePage}>
      {pageRange > 0 ? (
        <img
          className="page-button-icon-reverse"
          src={ArrRight}
          alt="prePage"
        />
      ) : (
        <span className="page-button-icon" />
      )}
    </button>
  );
};

const NextPageButton = () => {
  const [pageRange, setPageRange] = useRecoilState(pageRangeState);
  const lastPage = useRecoilValue(lastPageNum);
  const changePage = () => {
    if (pageRange < parseInt(lastPage / 5, 10)) {
      setPageRange(pageRange + 1);
    }
  };
  return (
    <button className="next-page-button" type="button" onClick={changePage}>
      {pageRange < parseInt(lastPage / 5, 10) ? (
        <img className="page-button-icon" src={ArrRight} alt="nextPage" />
      ) : (
        <span className="page-button-icon" />
      )}
    </button>
  );
};

const Pagination = () => {
  const pageRange = useRecoilValue(pageRangeState);
  const lastPage = useRecoilValue(lastPageNum);
  const pageRangeArr = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= 5; i++) {
    if (pageRange * 5 + i <= lastPage) pageRangeArr.push(pageRange * 5 + i);
  }

  return (
    <div className="pagination">
      <PrePageButton />
      {pageRangeArr.map(n => (
        <PageButton pageNum={n} />
      ))}
      <NextPageButton />
    </div>
  );
};

export default Pagination;
