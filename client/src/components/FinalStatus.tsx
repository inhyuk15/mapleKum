// import React, {useState, useEffect} from "react";

// const FinalStatus = () => {
//     // 0 힘 1 덱 2 인 3 럭
//     let statsNumber : number[] = [0, 0, 0, 0];
//     let statsPercent : number[] = [0, 0, 0, 0];
//     // 0 공격력, 1 마력
//     let ackNumber : number[] = [0, 0];
//     let ackPercent : number[] = [0, 0];
//     let criticalDmg : number = 0;
//     let dmgPercent : number =0;

//     const CalcMyStats = () => {
//         // 스탯 반영치 = ({statsNumber[0] * 4 + statsNumber[1]}) * 0.01
//         // 총 공격력/마력 = {ackNumber[0]} * (1 + {ackPercent[0]})
//         // 데미지% 총합 = (1 +{dmgPercent})
//         // 최종 데미지 보정 = 
//         // 무기 상수 = 
//         // 평균 숙련도 보정 =
//         // 평균 크리티컬 보정(크리 100%일 때) = (0.35 * {criticalDmg})
//         // 속성 내성 보정 = 1 - 속성 내성 % * (1 - 속성 내성 무시%) ? 이거 뭔지 모르겟음
//         // 데미지 = [ (스탯 반영치) * 총 공격력 * 무기상수 * 직업보정상수 / 100 ]
//         //  * (스킬 퍼뎀 / 100) * 크리티컬 데미지 보정 * [ (100 + 공격력%) / 100 ] * [ (100 + 데미지% + 보공%) / 100 ]
//         //  * 방어율 무시 보정 * 렙차 보정 * 속성 보정 * (아케인포스 필요 적의 경우) 아케인포스 보정
//         //  * 숙련도 보정 * [ (모든 최종데미지 계산값% + 100) / 100 ]      (1.1)
//         const statsReflection = Number((statsNumber[0] * 4 + statsNumber[1]) * 0.01);
//         const ackSum = Number(ackNumber[0] * (100 + ackPercent[0]) / 100);
//         const dmgSum = Number((100 + dmgPercent) / 100);
//         const finalDmg = Number(1);
//         const weaponConstant = Number(1.34);
//         const classConstant = Number(1);
//         const avgProficiency = Number((1 + 90) / 2);
//         const avgCriticalDmg = Number(1 + (0.35 + criticalDmg));
//         const propertyTolerance = Number(1);
//         const skillDmg = 5;

//         let realDmg : number = Math.ceil(statsReflection * ackSum * dmgSum * finalDmg * weaponConstant
//         * classConstant * avgProficiency * avgCriticalDmg * propertyTolerance  * skillDmg);
        
//         let realDmg2Korean = numberToKorean(realDmg);

//         function numberFormat(x : number) {
//             return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//         }

//         function numberToKorean(number : number){
//             var inputNumber :any = number < 0 ? false : number;
//             var unitWords    = ['', '만', '억', '조', '경'];
//             var splitUnit    = 10000;
//             var splitCount   = unitWords.length;
//             var resultArray  = [];
//             var resultString = '';
        
//             for (var i = 0; i < splitCount; i++){
//                 var unitResult = (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
//                 unitResult = Math.floor(unitResult);
//                 if (unitResult > 0){
//                     resultArray[i] = unitResult;
//                 }
//             }
        
//             for (var i = 0; i < resultArray.length; i++){
//                 if(!resultArray[i]) continue;
//                 resultString = String(numberFormat(resultArray[i])) + unitWords[i] + resultString;
//             }
//             return resultString;
//         }

//         return (
//             <div>
//                 <h2>내 스텟 계산하기</h2>
//                 <li>스탯 반영치 = {statsReflection}</li>
//                 <li>총 공격력/마력 = {ackSum}</li>
//                 <li>데미지% 총합 = {dmgSum}</li>
//                 <li>최종 데미지 보정 = {finalDmg}</li>
//                 <li>무기 상수 = {weaponConstant}</li>
//                 <li>평균 숙련도 보정 = {avgProficiency}</li>
//                 <li>평균 크리티컬 보정(크리 100%일 때) = {avgCriticalDmg}</li>
//                 <li>속성 내성 보정 = {propertyTolerance}</li>
//                 <li>스킬 데미지 =  {skillDmg}00%</li>
//                 <li>예상 데미지 = {realDmg2Korean} </li>
//             </div>
//         )
//     }

//     return (
//         <div></div>
//     )
// }



// export default FinalStatus;
