import React, { useState } from "react";
import SearchForm from "./components/SearchForm";
import SearchList from "./components/SearchList";
import "./App.css";

function App() {
  const [searchData, setSearchData] = useState<any>([]);
  const getData = (keyword: string) => {
    console.log("검색 키워드: " + keyword);
    fetch(`api/data?keyword=${keyword}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setSearchData(data);
        console.log(data);
      });
  };
  return (
    <div className="App">
      <SearchForm getData={getData} />
      <SearchList searchData={searchData} />
    </div>
  );
}

export default App;
