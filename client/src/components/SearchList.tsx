import React from "react";
import SearchItem from "./SearchItem";

const SearchList = (props: { searchData: [] }) => {
  const { searchData } = props;

  return (
    <div className="card-list">
      {searchData.map((item: any, idx: number): JSX.Element => {
        return <SearchItem key={idx} item={item} />;
      })}
    </div>
  );
};

export default SearchList; 
