import React, { useState } from 'react';
import styled from 'styled-components';
// import '../App.css';

const CharacterNameInput = styled.input`
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 0 65px 0 5px;
  width: 100%;
  height: 35px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  outline: none;
`;
const SearchButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  border-radius: 0 5px 5px 0;
  width: 60px;
  height: 35px;
  background-color: #13424b;
  color: #fff;
`;

type getDataType = (keyword: string) => void;

const SearchForm = (props: { getData: getDataType; isOnLoading: boolean }) => {
    const { getData, isOnLoading } = props;
    const [keyword, setKeyword] = useState('');
    return (
        <div className={isOnLoading ? 'form disable' : 'form'}>
            <CharacterNameInput
                type="text"
                className="form-text"
                disabled={!!isOnLoading}
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
            <SearchButton
                type="button"
                className="form-btn"
                disabled={!!isOnLoading}
                onClick={() => {
                    if (keyword) {
                        getData(keyword);
                    }
                }}
            >
        search
            </SearchButton>
        </div>
    );
};

export default SearchForm;
