import React, { useState} from "react";
import CharacterKumStatus from "./CharacterKumStatus";
import ItemStatus from "./ItemStatus";
import axios from 'axios';


const SearchItem = (props: { item: any }) => {
  const { item } = props;
  const [ status, setStatus ] = useState([]);
  const [ itemLink, setItemLink ] = useState("null");
  const [ itemStatus, setItemStatus] = useState([]);
  const sendItemStatus = async (link : string) => {
      const res = await axios.post('/users/status/item', { link : link})
      .then((res) => {
          console.log(res.data);
          setItemStatus(res.data);
      })
      .catch(err => {
          console.error(err);
      });
  }
  const sendCharacterStatus = async (link : string) => {
    const res = await axios.post('/users/status', { link : link})
    .then((res) => {
      console.log(res.data);
      setStatus(res.data);
      setItemLink(res.data[res.data.length - 1].itemLink);
      // console.log(itemLink);
    })
    .catch(err => {
      console.error(err);
    });
  }
  return (
    <div className="card">
      <div className="top">
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
        <div>
          {
            itemLink != undefined
            ? <div><CharacterKumStatus characterStatus = {status} /> 
              <div className="bottom">
                  <button onClick={() => {
                    sendItemStatus(itemLink);
                  }}>아이템 스텟 불러오기</button>
                  <ItemStatus itemStatus={itemStatus} />

              </div>
            </div>
            : null
          }
        </div>
      </div>
    </div>
  );
};

export default SearchItem;

