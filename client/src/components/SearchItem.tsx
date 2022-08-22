import React, { useState} from "react";
import CharacterKumStatus from "./CharacterKumStatus";
import SkillStatus from "./SkillStatus";
import ItemStatus from "./ItemStatus";
import axios from 'axios';


const SearchItem = (props: { item: any }) => {
  const { item } = props;
  const [ status, setStatus ] = useState([]);
  const [ skillStatus, setSkillStatus ] = useState([]);
  const [ itemLink, setItemLink ] = useState("null");
  const [ skillLink, setSkillLink ] = useState("null");
  const [ itemStatus, setItemStatus] = useState([]);
  const characterClass = item.characterInfo.split('/')[1].trim()
  const sendCharacterStatus = async (link : string) => {
    const res = await axios.post('/users/status', { link : link})
    .then((res) => {
      setStatus(res.data);
      setItemLink(res.data[res.data.length - 2].itemLink);
      setSkillLink(res.data[res.data.length - 1].skillLink);
    })
    .catch(err => {
      console.error(err);
    });
  }

  // 아이템 정보가 있는 링크를 서버에 보내기
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

  // 스킬 정보가 있는 링크를 서버에 보내기
  const sendCharacterSkill = async (link : string) => {
    const res = await axios.post('/users/status/skill', { link : link})
    .then((res) => {
      setSkillStatus(res.data);
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
          <CharacterKumStatus characterStatus = {status} />          
          {
            itemLink != undefined
            ?
            <div className="bottom">
                <button onClick={() => {
                  sendItemStatus(itemLink);
                }}>아이템 스텟 불러오기</button>
                <ItemStatus itemStatus={itemStatus} />
            </div>
            : null
          }
        </div>
        <div>
          {
            skillLink != undefined
            ? 
              <div className="bottom">
                  <button onClick={() => {
                    sendCharacterSkill(skillLink);
                  }}>패시브스킬 불러오기</button>
                  <SkillStatus skillStatus={skillStatus} className = {characterClass} />
              </div>
            : null
          }
        </div>
      </div>
    </div>
  );
};

export default SearchItem;

