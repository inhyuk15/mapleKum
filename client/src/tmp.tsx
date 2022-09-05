// 액션 타입
type statusActionType = {
    [stat: string] : string,
  }
  export const statusAction : statusActionType = {
    SETSTR: 'SETSTR',
    // SETDEX: 'SETDEX',
    // SETINT: 'SETINT',
    // SETLUK: 'SETLUK',
    // SETSTRPERCENT: 'SETSTRPERCENT',
    // SETDEXPERCENT: 'SETDEXPERCENT',
    // SETINTPERCENT: 'SETINTPERCENT',
    // SETLUKPERCENT: 'SETLUKPERCENT',
    // SETAD: 'SETAD',
    // SETMD: 'SETMD',
    // SETADPERCENT: 'SETADPERCENT',
    // SETMDPERCENT: 'SETMDPERCENT',
    // SETDMGPERCENT: 'SETDMGPERCENT',
    // SETBOSSDMGPERCENT: 'SETBOSSDMGPERCENT',
    // SETCRTDMGPERCENT: 'SETCRTDMGPERCENT',
    // SETPROPRESISTENCE: 'SETPROPRESISTENCE', // 속성 내성 무시
  } as const;
  
  // 액션 생성 함수
  export const setStats = (stat: string, val : number) => ({
    type: statusAction[stat],
    payload: val,
  });
  // 액션 생성 함수 타입
  type StatsAction = ReturnType<typeof setStats>;
  // 상태 타입
  export type statsStateType = {
    [stat : string]: number,
  };
  // 초기상태
  const initialState: statsStateType = {
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
  };
  
  // 리듀서
  export default function stats(
    action: StatsAction, state: statsStateType = initialState
    ): statsStateType {
      // if(typeof(action.type) == undefined) {
      //   return initialState;
      // }
      switch (action.type) {
        // case statusAction.SETSTR: {
        //     return {
        //         ...state,
        //         STR: state.STR + action.payload,
        //     };
        // }
        // case statusAction.SETDEX: {
        //     return {
        //         ...state,
        //         DEX: state.DEX + action.payload,
        //     };
        // }
        // case statusAction.SETINT: {
        //     return {
        //         ...state,
        //         INT: state.INT + action.payload,
        //     };
        // }
        // case statusAction.SETLUK: {
        //     return {
        //         ...state,
        //         LUK: state.LUK + action.payload,
        //     };
        // }
        // case statusAction.SETAD: {
        //     return {
        //         ...state,
        //         AD: state.AD + action.payload,
        //     };
        // }
        // case statusAction.SETMD: {
        //     return {
        //         ...state,
        //         MD: state.MD + action.payload,
        //     };
        // }
        // case statusAction.SETSTRPERCENT: {
        //     return {
        //         ...state,
        //         STRPercent: state.STRPercent + action.payload,
        //     };
        // }
        // case statusAction.SETDEXPERCENT: {
        //     return {
        //         ...state,
        //         DEXPercent: state.DEXPercent + action.payload,
        //     };
        // }
        // case statusAction.SETINTPERCENT: {
        //     return {
        //         ...state,
        //         INTPercent: state.INTPercent + action.payload,
        //     };
        // }
        // case statusAction.SETLUKPERCENT: {
        //     return {
        //         ...state,
        //         LUKPercent: state.LUKPercent + action.payload,
        //     };
        // }
        // case statusAction.SETADPERCENT: {
        //     return {
        //         ...state,
        //         ADPercent: state.ADPercent + action.payload,
        //     };
        // }
        // case statusAction.SETMDPERCENT: {
        //     return {
        //         ...state,
        //         MDPercent: state.MDPercent + action.payload,
        //     };
        // }
        // case statusAction.SETCRTDMGPERCENT: {
        //     return {
        //         ...state,
        //         CRTDmg: state.CRTDmg + action.payload,
        //     };
        // }
        default: {
              return state;
            }
        }
  };
  