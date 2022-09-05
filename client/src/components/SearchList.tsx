import React from 'react';
import SearchItem from './SearchItem';

export type searchDataType = {
  characterName: string;
  link: string;
  characterLevel: string;
  characterInfo: string;
  characterServerImg: string;
  characterImg: string;
};

const SearchList = (props: { searchData:searchDataType; isOnLoading: boolean;}) => {
    const { searchData, isOnLoading } = props;
    return (
        <div className={isOnLoading ? 'card-list disable' : 'card-list'}>
            {
                searchData !== undefined
                    ? <SearchItem item={searchData} />
                    : (
                        <div className="none">
              검색결과 없음
                        </div>
                    )
            }

        </div>
    );
};
export default SearchList;
