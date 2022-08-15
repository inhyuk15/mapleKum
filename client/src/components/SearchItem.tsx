import React, { useState} from "react";
import CharacterKumStatus from "./CharacterKumStatus";
import axios from 'axios';


const SearchItem = (props: { item: any }) => {
  const { item } = props;
  const [ status, setStatus ] = useState([]);
  const sendCharacterStatus = async (link : string) => {
    const res = await axios.post('/users/status', { link : link})
    .then((res) => {
      console.log(res.data);
      setStatus(res.data);
    })
    .catch(err => {
      console.error(err);
    });
  }

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
      <div className="bottom">
        <button onClick={() => {
          sendCharacterStatus(item.link)
        }}>캐릭터 스텟 불러오기</button>

        <CharacterKumStatus characterStatus = {status} /> 
        
      </div>
    </div>
  );
};

export default SearchItem;

