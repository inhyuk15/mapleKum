import React, { useState } from "react";

const SearchForm = (props: { getData: any }) => {
  const { getData } = props;
  const [keyword, setKeyword] = useState("");
  return (
    <div className="form">
      <input
        type="text"
        className="form-text"
        onChange={(e: any) => {
          setKeyword(e.target.value);
        }}
        onKeyPress={(e: any) => {
          if (e.charCode === 13) {
            if (keyword) {
              getData(keyword);
            }
          }
        }}
      />
      <button
        type="button"
        className="form-btn"
        onClick={() => {
          if (keyword) {
            getData(keyword);
          }
        }}
      >
        search
      </button>
    </div>
  );
};

export default SearchForm;
