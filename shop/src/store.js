import { configureStore, createSlice } from '@reduxjs/toolkit';

const user = createSlice({
	name: 'user',
	initialState: { name: '수찬', age: 29 },
	// state 수정
	reducers: {
		changeName(state) {
			state.name = '임' + state.name; // 수찬에서 임수찬 으로 변경
		},
		changeAge(state, number) {
			state.age = state.age + number.payload;
		},
	},
});
export let { changeName, changeAge } = user.actions;

const cart = createSlice({
	name: 'cart',
	initialState: [
		// { id: 0, name: 'White and Black', count: 2 },
		// { id: 2, name: 'Grey Yordan', count: 1 },
	],
	reducers: {
		addCount(state, action) {
			const filterState = state.find((item) => item.id === action.payload);
			filterState.count++;
		},
		reduceCount(state, action) {
			const filterState = state.find((item) => item.id === action.payload);
			if (filterState.count !== 1) {
				filterState.count--;
			}
		},
		addItem(state, action) {
			const filterState = state.find((item) => item.id === action.payload.id);
			if (filterState) {
				filterState.count++;
				alert('이미 장바구니에 있는 물건입니다. 수량이 추가되었습니다.');
			} else {
				state.push(action.payload);
				alert('장바구니에 상품이 추가되었습니다');
			}
		},
		removeItem(state, action) {
			const filterState = state.filter((item) => item.id !== action.payload);
			return filterState;
		},
	},
});
export let { reduceCount, addCount, addItem, removeItem } = cart.actions;

export default configureStore({
	reducer: {
		// state 등록
		cart: cart.reducer,
		user: user.reducer,
	},
});
