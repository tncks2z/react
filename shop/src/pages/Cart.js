import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addCount, reduceCount, changeName, changeAge, removeItem } from '../store';

function Cart() {
	const store = useSelector((state) => state);
	const dispatch = useDispatch(); // store.js로 요청을 보내주는 함수
	return (
		<div className='mt-3'>
			<h2>{store.user.name}의 장바구니</h2>
			{/* <Button
				onClick={() => {
					dispatch(changeAge(10));
				}}>
				나이 +1
			</Button> */}
			{store.cart.length > 0 ? (
				<Table bordered hover className='mt-3'>
					<thead>
						<tr>
							<th>#</th>
							<th>상품명</th>
							<th>수량</th>
							<th>삭제</th>
						</tr>
					</thead>
					<tbody>
						{store.cart.map((item, index) => {
							return (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{item.name}</td>
									<td>
										<Button
											className='p-2 pt-0 pb-0 me-2'
											variant='secondary'
											onClick={() => {
												dispatch(reduceCount(item.id));
											}}>
											-
										</Button>
										{item.count}
										<Button
											className='p-2 pt-0 pb-0 ms-2'
											variant='secondary'
											onClick={() => {
												dispatch(addCount(item.id));
											}}>
											+
										</Button>
									</td>
									<td>
										<Button
											className='p-2 pt-1 pb-1'
											variant='danger'
											onClick={() => {
												dispatch(removeItem(item.id));
											}}>
											삭제
										</Button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			) : (
				<h5 className='mt-5'>장바구니에 담긴 물건이 없습니다</h5>
			)}
		</div>
	);
}
export default Cart;
