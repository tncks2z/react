import './App.css';
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';
import { useState } from 'react';
import data from './data.js';

function App() {
	const [shoes, setShoes] = useState(data);
	return (
		<div className='App'>
			<Navbar bg='light' variant='light' className='ps-3'>
				<Navbar.Brand href='#home'>수찬이네</Navbar.Brand>
				<Nav className='me-auto'>
					<Nav.Link href='#home'>Home</Nav.Link>
					<Nav.Link href='#features'>Features</Nav.Link>
					<Nav.Link href='#pricing'>Pricing</Nav.Link>
				</Nav>
			</Navbar>
			<div className='main-bg'></div>
			<Container>
				<Row>
					{/* public 폴더에서 이미지 경로 : process.env.PUBLIC_URL + '/logo192.png' */}
					{shoes.map(function (item, index) {
						return <Item item={item} index={index} key={index}></Item>;
					})}
				</Row>
			</Container>
		</div>
	);
	function Item(props) {
		return (
			<Col>
				<img src={'https://codingapple1.github.io/shop/shoes' + (props.index + 1) + '.jpg'} alt='' width='80%' />
				<h4>{props.item.title}</h4>
				<h6>{props.item.content}</h6>
				<p>{[props.item.price].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</p>
			</Col>
		);
	}
}
export default App;
