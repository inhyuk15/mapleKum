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
                    <CalcMyStats />
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

    const CalcMyStats = () => {
            // 스탯 반영치 = ({statsNumber[0] * 4 + statsNumber[1]}) * 0.01
            // 총 공격력/마력 = {ackNumber[0]} * (1 + {ackPercent[0]})
            // 데미지% 총합 = (1 +{dmgPercent})
            // 최종 데미지 보정 = 
            // 무기 상수 = 
            // 평균 숙련도 보정 =
            // 평균 크리티컬 보정(크리 100%일 때) = (0.35 * {criticalDmg})
            // 속성 내성 보정 = 1 - 속성 내성 % * (1 - 속성 내성 무시%) ? 이거 뭔지 모르겟음
            // 데미지 = [ (스탯 반영치) * 총 공격력 * 무기상수 * 직업보정상수 / 100 ]
            //  * (스킬 퍼뎀 / 100) * 크리티컬 데미지 보정 * [ (100 + 공격력%) / 100 ] * [ (100 + 데미지% + 보공%) / 100 ]
            //  * 방어율 무시 보정 * 렙차 보정 * 속성 보정 * (아케인포스 필요 적의 경우) 아케인포스 보정
            //  * 숙련도 보정 * [ (모든 최종데미지 계산값% + 100) / 100 ]      (1.1)
            const statsReflection = Number((statsNumber[0] * 4 + statsNumber[1]) * 0.01);
            const ackSum = Number(ackNumber[0] * (100 + ackPercent[0]) / 100);
            const dmgSum = Number((100 + dmgPercent) / 100);
            const finalDmg = Number(1);
            const weaponConstant = Number(1.34);
            const classConstant = Number(1);
            const avgProficiency = Number((1 + 90) / 2);
            const avgCriticalDmg = Number(1 + (0.35 + criticalDmg));
            const propertyTolerance = Number(1);
            const skillDmg = 5;

            let realDmg : number = Math.ceil(statsReflection * ackSum * dmgSum * finalDmg * weaponConstant
            * classConstant * avgProficiency * avgCriticalDmg * propertyTolerance  * skillDmg);
            
            let realDmg2Korean = numberToKorean(realDmg);

            function numberFormat(x : number) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
            
            function numberToKorean(number : number){
                var inputNumber :any = number < 0 ? false : number;
                var unitWords    = ['', '만', '억', '조', '경'];
                var splitUnit    = 10000;
                var splitCount   = unitWords.length;
                var resultArray  = [];
                var resultString = '';
            
                for (var i = 0; i < splitCount; i++){
                    var unitResult = (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
                    unitResult = Math.floor(unitResult);
                    if (unitResult > 0){
                        resultArray[i] = unitResult;
                    }
                }
            
                for (var i = 0; i < resultArray.length; i++){
                    if(!resultArray[i]) continue;
                    resultString = String(numberFormat(resultArray[i])) + unitWords[i] + resultString;
                }
                return resultString;
            }


            return (
                <div>
                    <h2>내 스텟 계산하기</h2>
                    <li>스탯 반영치 = {statsReflection}</li>
                    <li>총 공격력/마력 = {ackSum}</li>
                    <li>데미지% 총합 = {dmgSum}</li>
                    <li>최종 데미지 보정 = {finalDmg}</li>
                    <li>무기 상수 = {weaponConstant}</li>
                    <li>평균 숙련도 보정 = {avgProficiency}</li>
                    <li>평균 크리티컬 보정(크리 100%일 때) = {avgCriticalDmg}</li>
                    <li>속성 내성 보정 = {propertyTolerance}</li>
                    <li>스킬 데미지 =  {skillDmg}00%</li>
                    <li>예상 데미지 = {realDmg2Korean} </li>
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