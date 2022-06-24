/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import "../../css/BookStatus.css";

const BookStatus = ({ book, index }) => {
  const doubleDigit = number => {
    return number < 10 ? `0${number}` : `${number}`;
  };

  const getBookStatus = (isLendable, dueDate) => {
    if (dueDate !== "-") return "대출 중";
    if (isLendable) return "비치 중";
    return "대출 불가";
  };

  console.log("book", book);
  return (
    <div className="book-status color-54">
      <div className="book-status__id font-16">{doubleDigit(index + 1)}</div>
      <div className="book-status__callSign font-16">{book.callSign}</div>
      <div className="book-status__status font-16">
        {getBookStatus(book.isLendable, book.dueDate)}
      </div>
      <div className="book-status__dueDate font-16">{book.dueDate}</div>
    </div>
  );
};

export default BookStatus;
