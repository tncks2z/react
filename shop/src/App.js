import './App.css';
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';
import { useState } from 'react';
import data from './data.js';
import { Routes, Route } from 'react-router-dom';
import Detail from './detail.js';

function App() {
	const [shoes] = useState(data);
	return (
		<div className='App'>
			<Navbar bg='light' variant='light' className='ps-3'>
				<Navbar.Brand href='/'>수찬이네</Navbar.Brand>
				<Nav className='me-auto'>
					<Nav.Link href='/'>Home</Nav.Link>
					<Nav.Link href='/detail'>Detail</Nav.Link>
					<Nav.Link href='/cart'>Cart</Nav.Link>
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
				<Route path='/detail' element={<Detail />}></Route>
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
}
export default App;
