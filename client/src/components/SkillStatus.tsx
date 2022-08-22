import React, { useState, useEffect } from "react";
import axios from 'axios';

const classNameMap = new Map();
classNameMap.set('소울마스터', 'soulMaster');

const SkillStatus = (props : {skillStatus : any, className: string}) => {
  const {skillStatus, className} = props;
  const [passiveSkill, setPassiveSkill] = useState<any>([]);

  const sendCharacterStatus = async (skillStatus : string) => {
    const link = "/users/status/passiveSkill/" + classNameMap.get(className);
    const res = await axios.post(link, { skillStatus})
    .then((res) => {
      let skills = res.data;
      skills = addCygnusPassive(skills);
      setPassiveSkill(skills);
      console.log(skills);
    })
    .catch(err => {
      console.log(err);
    })
  }

  function addCygnusPassive(skills : any) {
    skills.push({skillName : '엘레멘탈 하모니', skillInfos : Array('레벨 2당 올스탯 1') });
    skills.push({skillName : '엘레멘탈 엑스퍼트', skillInfos : Array('공격력, 마력 10%') });
    return skills;
  }
  const StatusBox = () => {
    const [forEffect, setEffect] = useState("");
    const [itemsList, setItemsList] = useState<any>([]);
    useEffect(() => {
        console.log(passiveSkill);
        for(let key in passiveSkill) {
            const skillInfos = passiveSkill[key].skillInfos.map((elem : any) =>{
              console.log(elem);
              return (<li>{elem}</li>);
            })
            const t= <ul>{passiveSkill[key].skillName} {skillInfos}</ul>
            setItemsList((old : any)=> [...old, t]);  
        }
        setEffect("no meaningful");
    }, []);

    return (
        <div>
            {itemsList}
        </div>
    )
  }

  return (
    <div className="card">
      class status
      <button onClick={()=> {
        sendCharacterStatus(skillStatus);
      }}>btn</button>
      <StatusBox />
    </div>
  );
};

export default SkillStatus;

