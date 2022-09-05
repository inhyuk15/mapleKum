import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import SearchLoading from './components/SearchLoading';
import SearchList from './components/SearchList';

export type searchDataType = {
  characterName: string;
  link: string;
  characterLevel: string;
  characterInfo: string;
  characterServerImg: string;
  characterImg: string;
}

function App() {
    const [searchData, setSearchData] = useState<searchDataType>();
    const [isOnLoading, setIsOnLoading] = useState(false);
    const getData = (keyword: string) => {
        setIsOnLoading(true);
        console.log(`검색 키워드: ${keyword}`);
        fetch(`/users/data?keyword=${keyword}`)
            .then((res) => res.json())
            .then((data) => {
                setSearchData(data);
                setIsOnLoading(false);
            });
    };
    return (
        <div className="App">
            <SearchForm getData={getData} isOnLoading={isOnLoading} />
            <SearchLoading isOnLoading={isOnLoading} />
            {
                searchData !== undefined
                    ? <SearchList searchData={searchData} isOnLoading={isOnLoading} />
                    : null
            }
        </div>
    );
}

export default App;
