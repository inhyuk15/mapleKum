import React, {useState, useEffect} from "react";

const ItemStatus = (props : {itemStatus : any}) => {
    const {itemStatus} = props;
    const items : any = new Map();
    // 0 힘 1 덱 2 인 3 럭
    let statsNumber : number[] = [0, 0, 0, 0];
    let statsPercent : number[] = [0, 0, 0, 0];
    // 0 공격력, 1 마력
    let ackNumber : number[] = [0, 0];
    let ackPercent : number[] = [0, 0];
    let criticalDmg : number = 0;
    let dmgPercent : number =0;

    const [viewDetail, toggleViewDetail] = useState(false);
    
    const setItems = () => {
        itemStatus.forEach((elem : any) => {
            let name = elem.name;
            let val = elem.val;
            let part = elem.part.replace(/\\n/g, '');
            val.forEach((ele : any) => {
                let eVal = ele.val.replace(/\+/, '').replace(/\([\w\s\+\d\%]*\)/g, '').trim();
                let eStat = ele.stat.replace(/(\\n)/g, '').replace(/\([\w\s\+\d]*\)/g, '').trim();
                const regex = /\%/;
                switch (eStat) {
                    case 'STR' :
                        if(regex.test(eVal)) {
                            statsPercent[0] += Number(eVal.replace(/\%/, ''));
                        }
                        else statsNumber[0] += Number(eVal);
                        break;
                    case 'DEX' :
                        if(regex.test(eVal)) statsPercent[1] += Number(eVal.replace(/\%/, ''));
                        else statsNumber[1] += Number(eVal);
                        break;
                    case 'INT' :
                        if(regex.test(eVal)) statsPercent[2] += Number(eVal.replace(/\%/, ''));
                        else statsNumber[2] += Number(eVal);
                        break;
                    case 'LUK' :
                        if(regex.test(eVal)) statsPercent[3] += Number(eVal.replace(/\%/, ''));
                        else statsNumber[3] += Number(eVal);
                        break;
                    case '공격력' :
                        if(regex.test(eVal)) ackPercent[0] += Number(eVal.replace(/\%/, ''));
                        else ackNumber[0] += Number(eVal);
                        break;
                    case '마력' :
                        if(regex.test(eVal)) ackPercent[1] += Number(eVal.replace(/\%/, ''));
                        else ackNumber[1] += Number(eVal);
                        break;
                    case '올스탯' :
                        var i;
                        if(regex.test(eVal)) for(i =0; i < 4; i++) Number(eVal.replace(/\%/, ''));
                        else for(i =0; i < 4; i++) statsNumber[i] += Number(eVal);
                        break;
                    case '크리티컬 데미지' :
                        criticalDmg += Number(eVal.replace(/\%/, ''));
                        break;
                    case '보스 몬스터 공격시 데미지':
                    case '데미지':
                        dmgPercent += Number(eVal.replace(/\%/, ''));
                        break;
                    default :
                        break;
                }
            });
            items.set(part, {name, val});
        });
    }
    
    const ItemStatusBox = () => {
        const [forEffect, setEffect] = useState("");
        useEffect(() => {
            setItems();
            setEffect("no meaningful");
        }, []);
        return(
            <div>
                <p>아이템으로 증가하는 스텟</p>
                <p>
                    올스탯 포함
                    <li> 힘 스탯 : + {statsNumber[0]} </li>
                    <li> 덱스 스탯 : + {statsNumber[1]} </li>
                    <li> 인트 스탯 : + {statsNumber[2]} </li>
                    <li> 럭 스탯 : + {statsNumber[3]} </li>
                    <li> 공격력 스탯 : + {ackNumber[0]} </li>
                    <li> 마력 스탯 : + {ackNumber[1]} </li>
                </p>
                <p>
                    올스탯 포함 잠재능력
                    <li> 힘 퍼센트 : +  {statsPercent[0]} % </li>
                    <li> 덱스 퍼센트 : +  {statsPercent[1]} % </li>
                    <li> 인트 퍼센트 : +  {statsPercent[2]} % </li>
                    <li> 럭 퍼센트 : +  {statsPercent[3]} % </li>
                    <li> 공격력 퍼센트 : + {ackPercent[0]} % </li>
                    <li> 마력 퍼센트 : + {ackPercent[1]} % </li>
                    <li> 크리티컬 데미지 퍼센트 : + {criticalDmg} % </li>
                    <li> 총데미지(보스 데미지 포함) : + {dmgPercent} % </li>
                </p>

                    {/* <h3>참고</h3>
                    스탯 반영치 = (주스탯 × 4 + 부스탯) × 0.01[1]
                    총 공격력/마력 = ⌊(공격력/마력 총합) × (1 + 공격력%/마력%의 총합)⌋[2]
                    데미지% 총합 = 1 + 데미지% + XX 공격 시 데미지% + 하이퍼 패시브 데미지%
                    최종 데미지 보정 = 모든 최종 데미지의 곱
                    무기 상수
                    평균 숙련도 보정 = (1 + 숙련도%) / 2
                    스킬 데미지%
                    방어율 보정 = 1 - 몬스터의 방어율 × (1 - 총 방무%) = 1 - 몬스터의 방어율 × (1 - 방무%) × (1 - 방무%) × …
                    평균 크리티컬 보정 = 1 + 크확% × (0.35 + 크뎀%)
                    속성 내성 보정 = 1 - 속성 내성% × (1 - 속성 내성 무시%) */}
            </div>
        )
    }

    const ItemViewDetail = () => {
        const [forEffect, setEffect] = useState("");
        // let itemsList : any = [];
        const [itemsList, setItemsList] = useState<any>([]);
        useEffect(() => {
            let tmp = Object.fromEntries(items);
            for(let key in tmp) {
                const t = <li>{tmp[key].name} </li>
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
        <div>
            <ItemStatusBox />
            <button onClick={() =>{toggleViewDetail(!viewDetail)}} >
                상세보기
            </button>
            {viewDetail ?  <ItemViewDetail /> : null }
        </div>
    )
}

export default ItemStatus;