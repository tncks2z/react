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
	initialState: [],
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
		clearItem(state) {
			state = [];
			return state;
		},
	},
});
export let { reduceCount, addCount, addItem, removeItem, clearItem } = cart.actions;

const review = createSlice({
	name: 'review',
	initialState: [
		{ shoesId: 0, id: 0, user: 'suchan', review: '신발 핏이 너무 예쁘고 디자인도 맘에들어용 처음에 가격이 너무 싸서 그냥 홧김에 산건데 가격에 비해 퀄리티도 너무 좋아용', rating: 5 },
		{
			shoesId: 0,
			id: 1,
			user: 'subin',
			review:
				'대체적으로 마음에 드는데 두가지 문제가 있는것 같아요. 1 사이즈가 작은편이예요. 발볼이 작거나 발등이 낮은 사람은 정사이즈를 신으라고 되어있어서( 저는 칼발에 발등이 낮아요)  평소 신는 사이즈로 골랐는데,  맨발로 신어도 작아요. 발등이나 폭이 문제가 아니라 아예 길이가 짧아요. 배송비 고려해 그냥 신기는 했는데 10분만에 뒤꿈치가 까졌어요. 2 안좋은 냄새가 나요. 모양은 너무 맘에 들어요. 가성비로 따지자면 이것보다 좋은건 없는것 같아요. 사이즈만 맞았으면 별 5개 충분합니다.^^ 좋은제품이지만다른 사람은 사이즈 미스없이 고르면 좋겠는 마음에 쓴소리도 써보았습니다',
			rating: 4,
		},
		{
			shoesId: 1,
			id: 0,
			user: 'suchan',
			review: '색깔이 너무 마음에 드네요 많이 파세요~',
			rating: 5,
		},
		{
			shoesId: 2,
			id: 0,
			user: 'suchan',
			review: '가격에 비해 신발 쫀쫀함이 없는거같아요ㅠㅠ 패션용으로만 신어야겠어요 디자인은 진짜 체고체고',
			rating: 3,
		},
	],
	reducers: {
		addReview(state, action) {
			state = [...state, action.payload];
		},
	},
});
export let { addReview } = review.actions;

export default configureStore({
	reducer: {
		// state 등록
		cart: cart.reducer,
		user: user.reducer,
		review: review.reducer,
	},
});
