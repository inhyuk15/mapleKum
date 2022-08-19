import React, {useState} from "react";

import axios from 'axios';

const mp = new Map([
    ['스탯공격력', 0], ['HP', 1], ['MP', 2], ['STR', 3],
    ['DEX', 4], ['INT', 5], ['LUK', 6], ['크리티컬 데미지', 7],
    ['보스공격력', 8], ['방어율무시', 9]
])


const CharacterKumStatus = (props : {characterStatus : any}) => {
    const {characterStatus} = props;
    
    let status : any = [];
    characterStatus.forEach((elem : any) => {
        if(!elem.hasOwnProperty('name')) {
            return;
        }
        let name = elem.name;
        name = name.replace(/\s+/g, '');
        let val = elem.val;
        status[name] = val;
    });
    return (
        <div className="card">
            <StatusBox status = {status}  />
        </div>
    )
};

const StatusBox = (props : {status : any}) => {
    const {status} = props;
    console.log(status);
    return (
        <div>
            <div>
                스탯 공격력 : {status.스탯공격력}
            </div>
            <div>
                HP : {status.HP}
            </div>
            <div>
                MP : {status.MP}
            </div>
            <div>
                STR : {status.STR}
            </div>
            <div>
                DEX : {status.DEX}
            </div>
            <div>
                INT : {status.INT}
            </div>
            <div>
                LUK : {status.LUK}
            </div>
            <div>
                크리티컬 데미지 : {status.크리티컬데미지}
            </div>
            <div>
                방어율 무시 : {status.방어율무시}
            </div>
            <div>
                보스 몬스터 공격시 데미지 : {status.보스공격력}
            </div>
        </div>
    )
};


export default CharacterKumStatus;
