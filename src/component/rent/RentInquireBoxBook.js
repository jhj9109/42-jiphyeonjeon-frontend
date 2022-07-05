/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import DeleteButton from "../../img/x_button.svg";
import "../../css/RentInquireBoxBook.css";

const InquireBoxBook = ({
  shape,
  book,
  selectedBooks,
  setSelectedBooks,
  setMidModalContents,
}) => {
  const openModal = () => {
    setMidModalContents("inquire book");
  };

  const deleteBook = () => {
    if (setSelectedBooks && book) {
      setSelectedBooks(
        selectedBooks.splice(1 - selectedBooks.indexOf(book), 1),
      );
    }
  };

  return (
    <div className={`rent__inquire-box-book ${shape}`}>
      {book ? (
        <div className="rent__inquire-box-book-active">
          <div className="rent__inquire-box-book__id-undo">
            <div className="rent__inquire-box-book__id color-54">
              {book.title}
            </div>
            <button
              className="rent__inquire-box-book__undo-button color-a4"
              type="button"
              onClick={deleteBook}
            >
              <img src={DeleteButton} alt="delete" />
            </button>
          </div>
          <div className="rent__inquire-box-book__info color-54">
            <div className="book__info__factor">
              <span className="book__info__factor-key">ISBN</span>
              <span className="book__info__factor-value">{book.isbn}</span>
            </div>
            <div className="book__info__factor">
              <span className="book__info__factor-key">청구기호</span>
              <span className="book__info__factor-value">{book.callSign}</span>
            </div>
          </div>
        </div>
      ) : (
        <button
          className="rent__inquire-box-book__add-button color-a4"
          type="button"
          onClick={openModal}
        >
          +
        </button>
      )}
    </div>
  );
};

export default InquireBoxBook;

InquireBoxBook.propTypes = {
  setSelectedBooks: PropTypes.func.isRequired,
  selectedBooks: PropTypes.arrayOf(PropTypes.object).isRequired,
  shape: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  book: PropTypes.object,
  setMidModalContents: PropTypes.func.isRequired,
};
