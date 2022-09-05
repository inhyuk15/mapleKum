import React from 'react';
import styled from 'styled-components';


type statusType = {
    [key: string] : string;
};

const StatusItemLayout = styled.div`
    display: grid;
    grid-template-columns: 1.25fr 0.25fr 2.5fr;
    gird-auto-rows: minMax(1.25fr, auto);
    border: 2px solid #aaa;
    border-radius: 4px;
    justify-items: center;
    justify-content: center;
    grid-gap: 1rem;
    div  {
        font-size: 1.2rem;
        justify-self: center;
        align-self: center;
        padding: 0.25rem;
        text-align: center;
    }
`;

const StatusItem = (props: {statusName: string, statusVal: string}) => {
    const { statusName, statusVal } = props;
    return (
        <StatusItemLayout>
            <div>
                {statusName}
            </div>
            <div>
                :
            </div>
            <div>
                {statusVal}
            </div>
        </StatusItemLayout>
    );
};

const StatusBoxLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

// for (const key in passiveSkill) {
//     const skillInfos = passiveSkill[key]
//         .skillInfos.map((elem : any) => (<li key={elem}>{elem}</li>));
//     const t = <ul key={key}>{passiveSkill[key].skillName} {skillInfos}</ul>;
const StatusBox = (props : {status : statusType}) => {
    const { status } = props;
    console.log(status);
    return (
        <StatusBoxLayout>
            <StatusItem statusName="스탯공격력" statusVal={status.스탯공격력} />
            <StatusItem statusName="HP" statusVal={status.HP} />
            <StatusItem statusName="MP" statusVal={status.MP} />
            <StatusItem statusName="STR" statusVal={status.STR} />
            <StatusItem statusName="DEX" statusVal={status.DEX} />
            <StatusItem statusName="INT" statusVal={status.INT} />
            <StatusItem statusName="LUK" statusVal={status.LUK} />
            <StatusItem statusName="크리티컬 데미지" statusVal={status['크리티컬 데미지']} />
            <StatusItem statusName="방어율 무시" statusVal={status.방어율무시} />
            <StatusItem statusName="보스 몬스터 공격시 데미지" statusVal={status.보스공격력} />
        </StatusBoxLayout>
    );
};


const CharacterKumStatus = (props : {characterStatus : statusType}) => {
    const { characterStatus } = props;
    return (
        <div>
            <StatusBox status = {characterStatus} />
        </div>
    );
};

export default CharacterKumStatus;
