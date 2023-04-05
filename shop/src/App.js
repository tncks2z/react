/* eslint-disable */

import './App.css';
import { Container, Row, Col, Nav, Navbar, Button, Badge } from 'react-bootstrap';
import { createContext, useEffect, useState } from 'react';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './pages/Detail';
import Cart from './pages/Cart';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export let Context1 = createContext();

function App() {
	const [shoes, setShoes] = useState(data);
	const [moreCnt, setMoreCnt] = useState(0);
	const navigate = useNavigate();
	const [watched, setWatched] = useState([]);
	useEffect(() => {
		if (!localStorage.getItem('watched')) {
			localStorage.setItem('watched', JSON.stringify(watched));
		} else {
			setWatched(JSON.parse(localStorage.getItem('watched')));
		}
	}, []);

	let result = useQuery(
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

	return (
		<div className='App'>
			<Navbar bg='light' variant='light' className='ps-3'>
				<Navbar.Brand href='/'>수찬이네</Navbar.Brand>
				<Nav className='me-auto'>
					<Nav.Link
						onClick={() => {
							navigate('/');
						}}>
						Home
					</Nav.Link>
					<Nav.Link
						onClick={() => {
							navigate('/detail/0');
						}}>
						Detail
					</Nav.Link>
					<Nav.Link
						onClick={() => {
							navigate('/about');
						}}>
						About
					</Nav.Link>
					<Nav.Link
						onClick={() => {
							navigate('/event');
						}}>
						Event
					</Nav.Link>
					<Nav.Link
						onClick={() => {
							navigate('/cart');
						}}>
						Cart
					</Nav.Link>
				</Nav>
				<Nav className='ms-auto me-3'>{result.isLoading ? '로딩중' : result.data.name + '님'}</Nav>
			</Navbar>
			<Routes>
				<Route
					path='/'
					element={
						<>
							<div className='main-bg'>{watched.length > 0 ? <WatchedItemList shoes={shoes}></WatchedItemList> : null}</div>
							<ItemList shoes={shoes}></ItemList>
							{moreCnt === 2 ? null : (
								<Button
									variant='secondary'
									onClick={() => {
										moreCnt === 0
											? axios
													.get('https://codingapple1.github.io/shop/data2.json')
													.then((res) => {
														let copy = [...shoes, ...res.data];
														setShoes(copy);
													})
													.catch((err) => {
														console.log(err);
													})
											: moreCnt === 1
											? axios
													.get('https://codingapple1.github.io/shop/data3.json')
													.then((res) => {
														let copy = [...shoes, ...res.data];
														setShoes(copy);
													})
													.catch((err) => {
														console.log(err);
													})
											: null;
										setMoreCnt(moreCnt + 1);
										// 한번에 두개 이상 axios 요청할때
										// Promise.all([axios.get('/url1'), axios.get('/url2')])
										// 	.then((res) => { console.log(res); })
									}}>
									더보기
								</Button>
							)}
						</>
					}></Route>
				<Route path='/detail/:id' element={<Detail shoes={shoes} />}></Route>
				<Route path='/cart' element={<Cart />}></Route>
				<Route path='/about' element={<About />}>
					<Route path='member' element={<h3>멤버임</h3>}></Route>
					<Route path='location' element={<h3>위치정보임</h3>}></Route>
				</Route>
				<Route path='/event' element={<Event />}>
					<Route path='one' element={<h4>첫 주문시 양배추즙 무료 제공 서비스</h4>}></Route>
					<Route path='two' element={<h4>생일기념 쿠폰 받기</h4>}></Route>
				</Route>
			</Routes>
		</div>
	);
	function WatchedItemList(props) {
		return (
			<Container className='float-end text-end mt-5 '>
				<h3>
					<Badge bg='light' text='dark'>
						최근에 본 상품
					</Badge>
				</h3>
				<div className='d-flex flex-column'>
					{watched.map(function (itemId, index) {
						return <h5 className='text-white'>{props.shoes[itemId].title}</h5>;
					})}
				</div>
			</Container>
		);
	}
	function ItemList(props) {
		return (
			<Container>
				<Row>
					{props.shoes.map(function (item, index) {
						return (
							<Col md={4} key={index}>
								{/* public 폴더에서 이미지 경로 : process.env.PUBLIC_URL + '/logo192.png' */}
								<img src={'https://codingapple1.github.io/shop/shoes' + (index + 1) + '.jpg'} alt='' width='80%' />
								<h4>{item.title}</h4>
								{/* <h6>{item.content}</h6> */}
								<p>{[item.price].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</p>
							</Col>
						);
					})}
				</Row>
			</Container>
		);
	}
	function About() {
		return (
			<div>
				<h1>회사정보</h1>
				<Outlet></Outlet>
			</div>
		);
	}
	function Event() {
		return (
			<div>
				<h1>오늘의 이벤트</h1>
				<Outlet></Outlet>
			</div>
		);
	}
}
export default App;
