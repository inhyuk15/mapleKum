import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const classNameMap = new Map();
classNameMap.set('소울마스터', 'soulMaster');

const cygnus = ['소울마스터', '플레임위자드', '나이트워커', '윈드브레이커', '미하일', '스트라이커'];

const SkillStatusText = styled.div`
    color: ${(props) => props.color};
    text-align: center;
    &.title {
        padding: 0.5rem;
        font-size: 1.25rem;
        font-weight: bold;
        color: orange;
        grid-column: 1/3;
    }
    &.description {
        font-size: 1rem;
        color: blue;
        grid-column: 1/3;
    }
`;

const StatusBoxLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: minMax(5rem, auto);
  align-items: center;
  justify-items: center;
  grid-gap: 0.25rem;
  border: 2px solid #aaa;
  border-radius: 4px;
  // background: #74b9ff;
  ul {
    list-style: none;
    padding-left: 0;
    font-size: 1.25rem;
    font-weight: bold;
    background: #ecf0f1;
  }
  li {
    font-size: 1rem;
    align-self: center;
  }
`;
type SkillType = {
    skillName: string;
    skillInfos: Array<string>
}

const SkillStatus = (props : {
  skillStatus : SkillType[], className: string, isSkillOnLoading: boolean
}) => {
    const { skillStatus, className, isSkillOnLoading } = props;
    const [passiveSkill, setPassiveSkill] = useState<any>([]);
    function addCygnusPassive(skills : SkillType[]) {
        skills.push({ skillName: '엘레멘탈 하모니', skillInfos: Array('레벨 2당 올스탯 1') });
        skills.push({ skillName: '엘레멘탈 엑스퍼트', skillInfos: Array('공격력, 마력 10%') });
        return skills;
    }
    const sendCharacterStatus = async (skills : SkillType[]) => {
        try {
            const link = `/users/status/passiveSkill/${classNameMap.get(className)}`;
            console.log(skills);
            const res = await axios.post(link, { skills });
            let skillData = res.data;
            if (cygnus.includes(className)) {
                skillData = addCygnusPassive(skillData);
            }
            setPassiveSkill(skillData);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        if (skillStatus != null) {
            sendCharacterStatus(skillStatus);
        }
    }, []);

    // type SetStatusBox = {

    // }
    // const setStatusBox = () => {

    // }

    const StatusBox = () => {
        const [itemsList, setItemsList] = useState<any>([]);
        useEffect(() => {
          const keys = Object.keys(passiveSkill);
            for (const key in keys) {
                const skillInfos = passiveSkill[key]
                    .skillInfos.map((elem : any) => (<li key={elem}>{elem}</li>));
                const t = <ul key={key}>{passiveSkill[key].skillName} {skillInfos}</ul>;
                setItemsList((old : any) => [...old, t]);
            }
        }, []);

        return (
            <StatusBoxLayout>
                <SkillStatusText className="title">스텟이 오르는 패시브 스킬</SkillStatusText>
                {itemsList}
            </StatusBoxLayout>
        );
    };

    return (
        <div className={isSkillOnLoading ? 'form disable' : 'form'}>
            {isSkillOnLoading}
            <StatusBox />
        </div>
    );
};

export default SkillStatus;
