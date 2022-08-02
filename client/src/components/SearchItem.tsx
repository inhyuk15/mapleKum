import React from "react";

const SearchItem = (props: { item: any }) => {
  const { item } = props;
  return (
    <div className="card">
      <div className="top">
        {/* <div className="kategorie"><img src={item.characterServerImg} /></div> */}
        <img src={item.characterServerImg} />
        <div className="title">{item.characterName}</div>
      </div>
			<img src={item.characterImg} />
      <div className="bottom">
        <div className="text">{item.characterLevel}</div>
        <div className="text">{item.characterInfo}</div>
        <a href={item.link} className="link" target="_blank" rel="noreferrer">
					홈페이지 캐릭터 정보
        </a>
      </div>
    </div>
  );
};

export default SearchItem;

