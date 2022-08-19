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

    const [viewDetail, toggleViewDetail] = useState(false);

    const setItems = () => {
        itemStatus.forEach((elem : any) => {
            let name = elem.name;
            let val = elem.val;
            let part = elem.part.replace(/\\n/g, '');
            val.forEach((elem : any) => {
                let eVal = elem.val.replace(/\+/, '').replace(/\([\w\s\+\d\%]*\)/g, '').trim();
                let eStat = elem.stat.replace(/(\\n)/g, '').replace(/\([\w\s\+\d]*\)/g, '').trim();
                const regex = /\%/;
                switch (eStat) {
                    case 'STR' :
                        if(regex.test(eVal)) {
                            statsPercent[0] += Number(eVal.replace(/\%/, ''));
                            // console.log(eVal + " in switch");
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
                }
            });
            items.set(part, {name, val});
        });
    }
    // const tmp = Object.fromEntries(items);
    const ItemStatusBox = () => {
        const [forEffect, setEffect] = useState("");
        useEffect(() => {
            setItems();
            setEffect("no meaningful");
        });

        return(
            <div>
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
                </p>
            </div>
        )
    }

    const ItemViewDetail = () => {
        return (
            <div>
                dfhkf
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