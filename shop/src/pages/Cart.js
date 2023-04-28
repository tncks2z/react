import '../App.css';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addCount, reduceCount, removeItem, clearItem } from '../store';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function Cart() {
	useEffect(() => {
		document.body.style = `overflow: hidden`;
		return () => (document.body.style = `overflow: auto`);
	}, []);
	const [fade, setFade] = useState('');
	useEffect(() => {
		setTimeout(() => {
			setFade('animation-end');
		}, 100);
		return () => {
			clearTimeout();
			setFade('');
		};
	}, []);
	const navigate = useNavigate();
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
			{modalOn ? <Receipt setModalOn={setModalOn} store={store} getTotalPrice={getTotalPrice} dispatch={dispatch} /> : null}
			<div className={`mt-3 animation-start ${fade}`}>
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
					<div>
						<h4 className='mt-5  mb-3'>장바구니에 담은 상품이 없습니다</h4>
						<Button
							onClick={() => {
								navigate('/');
							}}>
							상품 보러가기
						</Button>
					</div>
				)}
			</div>
		</>
	);
}
function Receipt({ setModalOn, store, getTotalPrice, dispatch }) {
	const result = useQuery(
		['user'],
		() =>
			axios
				.get('https://codingapple1.github.io/userdata.json')
				.then((response) => response.data)
				.catch((error) => {
					console.log(error);
				}),
		{ staleTime: 2000 } //2초 마다 refetch
	);
	function getPay() {
		let pay = window.confirm('결제 하시겠습니까?');
		if (pay) {
			alert('결제 되었습니다');
			setModalOn(false);
			dispatch(clearItem([]));
		} else {
			alert('결제가 취소되었습니다');
			setModalOn(false);
		}
	}
	return (
		<div
			className='receipt-bg'
			onClick={(e) => {
				if (e.target === e.currentTarget) {
					setModalOn(false);
				}
			}}>
			<div className='receipt-container'>
				<h4 style={{ verticalAlign: 'middle' }} className='mt-3 mb-3'>
					영수증
				</h4>
				<h5 className='ms-auto me-3'>{result.isLoading ? '로딩중' : result.data.name + '님'}</h5>
				{store.cart.map((item, index) => {
					return (
						<div className='mt-3' key={index}>
							<h5>상품명 : {item.name}</h5>
							<h6>가격 : {[item.price].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</h6>
							<h6>수량 : {item.count}</h6>
						</div>
					);
				})}
				<h5 className='mt-5'>총 가격 : {[getTotalPrice()].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</h5>
				<div className='mt-3 mb-3'>
					<Button variant='outline-primary' onClick={() => getPay()}>
						결재
					</Button>
					<Button variant='outline-danger' onClick={() => setModalOn(false)}>
						닫기
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Cart;
