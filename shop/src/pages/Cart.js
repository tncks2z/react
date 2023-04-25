import '../App.css';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addCount, reduceCount, removeItem } from '../store';
import { useState } from 'react';

function Cart() {
	const store = useSelector((state) => state);
	const dispatch = useDispatch(); // store.js로 요청을 보내주는 함수
	const [modalOn, setModalOn] = useState(false);
	function getTotalPrice() {
		let totalPrice = 0;
		for (let i = 0; i < store.cart.length; i++) {
			totalPrice += store.cart[i].price * store.cart[i].count;
		}
		return totalPrice;
	}
	return (
		<>
			{modalOn ? <Receipt setModalOn={setModalOn} /> : null}
			<div className='mt-3'>
				<h2>장바구니</h2>
				{store.cart.length > 0 ? (
					<>
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
										<tr key={index} style={{ padding: '0px', verticalAlign: 'middle' }}>
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
													style={{ fontSize: '0.9rem' }}
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
						<div style={{ textAlign: 'right', marginRight: '10px' }}>
							<span style={{ fontWeight: 'bold', verticalAlign: 'middle', marginRight: '10px' }}>최종금액 : {[getTotalPrice()].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</span>
							<Button
								variant='secondary'
								style={{ fontSize: '0.9rem' }}
								onClick={() => {
									setModalOn(true);
								}}>
								구매하기
							</Button>
						</div>
					</>
				) : (
					<h5 className='mt-5'>장바구니에 담긴 물건이 없습니다</h5>
				)}
			</div>
		</>
	);
}
function Receipt({ setModalOn }) {
	return (
		<div
			className='receipt-bg'
			onClick={(e) => {
				if (e.target === e.currentTarget) {
					setModalOn(false);
				}
			}}>
			<div className='receipt-container'>
				<h4 style={{ verticalAlign: 'middle' }}>영수증</h4>
				<Button variant='danger' onClick={() => setModalOn(false)}>
					닫기
				</Button>
			</div>
		</div>
	);
}

export default Cart;
