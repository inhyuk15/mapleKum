import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ThemeProvider } from 'styled-components';
import CharacterKumStatus from './CharacterKumStatus';
import SkillStatus from './SkillStatus';
import ItemStatus from './ItemStatus';
import { searchDataType } from './SearchList';
import styled from 'styled-components';

export type ItemStatType = {
  [key : string] : string;
};
export type ItemType = {
  [name : string] : {[part : string] : ItemStatType};
};

const SearchItem = (props: { item: searchDataType }) => {
    const { item } = props;
    const [status, setStatus] = useState<{[key: string]: string} | null>(null);
    const [itemLink, setItemLink] = useState(null);
    const [skillLink, setSkillLink] = useState(null);
    const [itemStatus, setItemStatus] = useState<ItemType | null>(null);
    const [skillStatus, setSkillStatus] = useState([]);

    // for just css
    const [isSkillOnLoading, setIsSkillOnLoading] = useState(false);
    const [isItemOnLoading, setIsItemOnLoading] = useState(false);

    const characterClass = item.characterInfo.split('/')[1].trim();
    const sendCharacterStatus = async (link : string) => {
        try {
            const res = await axios.post('/users/status', { link });
            setStatus(res.data);
            setIsItemOnLoading(true);
            console.log(res.data.itemLink);
            setItemLink(res.data.itemLink);
            // setIsSkillOnLoading(true);
            // setSkillLink(res.data[res.data.length - 1].skillLink);
        } catch (err) {
            console.error(err);
        }
    };
    // 아이템 정보가 있는 링크를 서버에 보내기
    const sendItemStatus = async (link : string) => {
        try {
            const res = await axios.post('/users/status/item', { link });
            setItemStatus(res.data);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
      if(itemLink != null)
        sendItemStatus(itemLink);
        setIsItemOnLoading(false);
    }, [itemLink]);
    // 스킬 정보가 있는 링크를 서버에 보내기
    const sendCharacterSkill = async (link : string) => {
        try {
          console.log(" 스킬 링크 : " + link);
            const res = await axios.post('/users/status/skill', { link });
            setSkillStatus(res.data);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        sendCharacterStatus(item.link);
    }, []);

    useEffect(() => {
      // sendCharacterSkill(skillLink);
      // setIsSkillOnLoading(false);
  }, [skillLink]);
    const CharacterCardLayout = styled.div`
        &.card {
            
            font-size: 2rem;
            
        }
    `;
    return (
        <ThemeProvider
            theme={{
                palette: {
                    blue: '#228be6',
                    gray: '#495057',
                    pink: '#f06595',
                },
            }}
        >
            <div>
                <CharacterCardLayout>
                    <div className="card">
                        <img src={item.characterServerImg} />
                        <div className="characterName">{item.characterName}</div>
                    </div>
                    <img src={item.characterImg} />
                    <div>
                        <div>{item.characterLevel}</div>
                        <div>{item.characterInfo}님 캐릭터 정보</div>
                        <a href={item.link} target="_blank" rel="noreferrer">
                            홈페이지 캐릭터 정보
                        </a>
                    </div>
                </CharacterCardLayout>
                <div className="bottom">
                    <div>
                        { status && <CharacterKumStatus characterStatus = {status} /> }
                        { itemStatus && <ItemStatus itemStatus ={itemStatus} isItemOnLoading={isItemOnLoading} /> }
                    </div>
                    <div>
                        {
                            // <div className="bottom">
                            //     <SkillStatus skillStatus={skillStatus} className = {characterClass}
                            //         isSkillOnLoading={isSkillOnLoading} />
                            // </div>
                        }
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default SearchItem;
