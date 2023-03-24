import './App.css';
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';
import { useState } from 'react';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './pages/detail';
import { Axios } from 'axios';

function App() {
	const [shoes] = useState(data);
	const navigate = useNavigate();
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
							navigate('/detail');
						}}>
						Detail
					</Nav.Link>
					<Nav.Link
						onClick={() => {
							navigate('/about');
						}}>
						About
					</Nav.Link>
					{/* <Nav.Link href='/cart'>Cart</Nav.Link> */}
				</Nav>
			</Navbar>
			<Routes>
				<Route
					path='/'
					element={
						<>
							<div className='main-bg'></div>
							<ItemList shoes={shoes}></ItemList>
						</>
					}></Route>
				<Route path='/detail/:id' element={<Detail shoes={shoes} />}></Route>
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
	function ItemList(props) {
		return (
			<Container>
				<Row>
					{props.shoes.map(function (item, index) {
						return (
							<Col key={index}>
								{/* public 폴더에서 이미지 경로 : process.env.PUBLIC_URL + '/logo192.png' */}
								<img src={'https://codingapple1.github.io/shop/shoes' + (index + 1) + '.jpg'} alt='' width='80%' />
								<h4>{item.title}</h4>
								<h6>{item.content}</h6>
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
