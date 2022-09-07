import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 상태 타입
type InitialState = {
  [stat : string]: number,
};
// 초기상태
const initialState = {
    STR: 0,
    DEX: 0,
    INT: 0,
    LUK: 0,
    AD: 0,
    MD: 0,
    STRPercent: 0,
    DEXPercent: 0,
    INTPercent: 0,
    LUKPercent: 0,
    ADPercent: 0,
    MDPercent: 0,
    CRTDmg: 0,
    DmgPercent: 0,
    ResistanceIgnore: 0,
} as InitialState;

type Payload = {
  key: string;
  val: number;
}

const statsSlice = createSlice({
    name: 'stats',
    initialState: initialState,
    reducers: {
        setState: {
            reducer: (state, action : PayloadAction<Payload>) => {
                const key = action.payload.key;
                const val = action.payload.val;
                state[key] += val;
            },
            prepare: (payload: Payload) => {
                return { payload : payload };
            }
        }
    }
});

export const { setState } = statsSlice.actions;
export default statsSlice.reducer;
