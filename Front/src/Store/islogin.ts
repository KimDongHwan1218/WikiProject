// import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { RootState } from '.'

// // https://velog.io/@minai/redux-redux-toolkit%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EB%A9%B4%EC%84%9C
// // 일단 로그인아웃은 나중에 고려하기로 했으니 일단 생략.
// // slice의 타입 지정
// interface CounterState {
//   islogin: boolean
//   id: string | null
// }

// type UserType = {
//   id: number;
//   email: string;
//   firstName: string;
//   lastName: string;
//   birthday: string;
//   profileImage: string;
// };

// // 초기값 지정
// const initialState = { islogin: false, id: null } as CounterState

// export const IsLoginSlice = createSlice({
//   name: 'islogin',
//   initialState,
//   reducers: {
//     loggedin(state) {
//       state.islogin=true
//     },
//     decrement(state) {
//       state.value--
//     },
//     incrementByAmount(state, action: PayloadAction<number>) {
//       state.value += action.payload
//     },
//   },
// })

// export const { updateLogindata } = IsLoginSlice.actions

// export const selectProduct = (state: RootState) => state.products

// export default IsLoginSlice.reducer