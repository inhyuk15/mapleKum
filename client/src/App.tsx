import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import SearchLoading from './components/SearchLoading';
import SearchList from './components/SearchList';
import axios from 'axios';

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
    const getData = async (keyword: string) => {
        try {
            setIsOnLoading(true);
            const res = await axios.get(`/users/data?keyword=${keyword}`);
            const data = res.data;
            console.log(data);
            setSearchData(data);
            setIsOnLoading(false);
        }
        catch (err) {
            console.error(err);
        }
        
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
