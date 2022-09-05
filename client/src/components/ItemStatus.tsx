import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ItemType } from './SearchItem';
import { setState } from '../modules/statsSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';

const ItemStatusText = styled.div`
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
ItemStatusText.defaultProps = {
    color: 'blue',
};
const ItemStatusBoxLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    align-items: center;
    border: 2px solid #aaa;
    border-radius: 4px;
    background: white;
    .stats {
        padding: 0 0.5rem 0.5rem 0;
    }
    li {
        font-size: 1rem;
    }
`;

const ItemStatus = (props : {itemStatus : ItemType, isItemOnLoading: boolean}) => {
    const { itemStatus, isItemOnLoading } = props;
    const items : any = new Map();
    const [viewDetail, toggleViewDetail] = useState(false);
    const {STR, DEX, INT, LUK, 
        AD, MD,
        STRPercent, DEXPercent, INTPercent, LUKPercent,
        ADPercent, MDPercent,
        CRTDmg, DmgPercent, ResistanceIgnore,
    } = useAppSelector((state) => state.stat);
    const dispatch = useAppDispatch()
    
    type potentialOption = {
        [key: string] : string;
    }
    const setPotentialOption = (stats : potentialOption) => {
        const regex = /%/;
        for(let key in stats) {
            let statType = key.trim();
            let val = stats[key].replace(/\+/, '').replace(/\([\w\s+\d%]*\)/g, '').trim();
            if(statType == '공격력') statType = 'AD';
            else if(statType == '마력') statType = 'MD';
            else if(statType == '크리티컬 데미지') statType = 'CRTDmg';
            if(regex.test(val)) {
                if(['STR', 'DEX', 'INT', 'LUK', 'AD', 'MD'].includes(statType)) {
                    statType += "Percent";
                }
                val = val.replace(regex, '');
            }
            dispatch(setState({key: statType, val: Number(val)}));
        }
    }
    const setItemStatusBox = () => {
        console.log(itemStatus);
        const parts = Object.keys(itemStatus);
        const hasPercentage = new RegExp('%');
        const isPotentialOption = new RegExp('잠재옵션');
        for(let i =0; i < parts.length; i++) {
            // ex) 귀걸이, 상의 등...
            const part = parts[i];
            // ex) {하프이어링 : {DEX : 32 ... }}
            const item = itemStatus[part];
            const itemNames = Object.keys(item);
            for(let j =0; j < itemNames.length; j++) {
                const itemName = itemNames[j];
                const stats = item[itemName];
                for(let statType in stats) {
                    const stat = stats[statType];
                    if(typeof(stat) === 'object') {
                        setPotentialOption(stat);
                    }
                    else {
                        const regex = /데미지/;
                        const val = stats[statType].replace(/\+/, '').replace(/\([\w\s+\d%]*\)/g, '').trim();
                        if(statType == '공격력') dispatch(setState({key: 'AD', val: Number(val)}));
                        else if(statType == '마력') dispatch(setState({key: 'MD', val: Number(val)}));
                        else if(regex.test(statType)) {
                            dispatch(setState({key: 'DmgPercent', val: Number(val.replace('%', ''))}));
                        }
                        else dispatch(setState({key: statType, val: Number(val)}));
                    }
                }
            }
        }
    };

    useEffect(() => {
        if (itemStatus !== null) setItemStatusBox();
    }, [itemStatus]);

    const ItemStatusBox = () => (
        <ItemStatusBoxLayout>
            <ItemStatusText className="title">아이템으로 증가하는 스탯</ItemStatusText>
            <ItemStatusText className="description">올스탯 포함</ItemStatusText>
            <div className="stats">STR : {STR}</div>
            <div className="stats">DEX : {DEX}</div>
            <div className="stats">INT : {INT}</div>
            <div className="stats">LUK : {LUK}</div>
            <div className="stats">AD : {AD}</div>
            <div className="stats">MD : {MD}</div>
            <div className="stats">STR 퍼센트 : {STRPercent}%</div>
            <div className="stats">DEX 퍼센트 : {DEXPercent}%</div>
            <div className="stats">INT 퍼센트 : {INTPercent}%</div>
            <div className="stats">LUK 퍼센트 : {LUKPercent}%</div>
            <div className="stats">공격력 퍼센트 : {ADPercent}%</div>
            <div className="stats">마력 퍼센트 : {MDPercent}%</div>
            <div className="stats">총 데미지 퍼센트 : {DmgPercent}%</div>
            <div className="stats">크리티컬 데미지 퍼센트 : {CRTDmg}%</div>
        </ItemStatusBoxLayout>
    );
    const ItemViewDetail = () => {
        const [itemsList, setItemsList] = useState<any>([]);
        // useEffect(() => {
        //     const tmp = Object.fromEntries(items);
        //     for (const val of tmp) {
        //         const t = <li>{tmp[key].name} </li>;
        //         setItemsList((old : any) => [...old, t]);
        //     }

        // }, []);
        return (
            <div>
                {itemsList}
            </div>
        );
    };

    return (
        <div className={isItemOnLoading ? 'form disable' : 'form'} >
            <ItemStatusBox />
            {/* <button onClick={() => { toggleViewDetail(!viewDetail); }} >
            </button> */}
            {/* {viewDetail ? <ItemViewDetail /> : null } */}
        </div>
    );
};

export default ItemStatus;
