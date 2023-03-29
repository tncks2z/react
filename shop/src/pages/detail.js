import { useEffect, useState } from 'react';
import { Container, Row, Col, InputGroup, Form, Nav } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import '../App.css';

function Detail(props) {
	const [isAlert, setIsAlert] = useState(true);
	const [userInput, setUserInput] = useState('');
	const [isNumber, setIsNumber] = useState(true);
	const [tab, setTab] = useState(0);
	const [fade, setFade] = useState('');
	useEffect(
		// useEffect 뒤에 []추가시, mount 될때 1회만 해당코드 재생. 이후엔 노재생
		() => {
			// 두번째로 코드 실행
			// 재랜더링마다 코드 실행
			let timer = setTimeout(() => {
				setIsAlert(false);
			}, 2000);
			return () => {
				// 첫번째로 코드 실 행
				// 기존코드 없애버릴 때 사용
				// unMount시 코드 실행
				clearTimeout(timer);
			};
		},
		[
			// 해당 내용 업데이트시 코드 실행
		]
	);
	useEffect(() => {
		const regex = /^[0-9]+$/;
		setIsNumber(regex.test(userInput));
	}, [userInput]);
	const { id } = useParams();
	const filterItem = props.shoes.find((item) => item.id === Number(id));
	useEffect(() => {
		setTimeout(() => {
			setFade('animation-end');
		}, 100);
		return () => {
			clearTimeout();
			setFade('');
		};
	}, []);

	return (
		<Container className={`animation-start ${fade}`}>
			{/* {isAlert ? <div className='alert alert-danger'>2초이내 구매시 할인</div> : null} */}

			<Row>
				<Col>
					<img src={'https://codingapple1.github.io/shop/shoes' + (Number(filterItem.id) + 1) + '.jpg'} alt='' width='100%' />
				</Col>
				<Col>
					<h4 className='pt-5'>{filterItem.title}</h4>
					<h6>{filterItem.content}</h6>
					<p>{[filterItem.price].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</p>
					<button className='btn btn-danger'>주문하기</button>
				</Col>
			</Row>
			{/* <InputGroup className='mb-3'>
				<Form.Control
					placeholder='숫자를 입력해주세요'
					onChange={(e) => {
						setUserInput(e.target.value);
					}}
				/>
			</InputGroup>
			{isNumber || userInput === '' ? null : <div className='alert alert-danger'>입력값은 숫자여야만합니다</div>} */}
			<Nav variant='tabs' defaultActiveKey='0'>
				<Nav.Item>
					<Nav.Link eventKey='0' onClick={() => setTab(0)}>
						HTML
					</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey='1' onClick={() => setTab(1)}>
						CSS
					</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey='2' onClick={() => setTab(2)}>
						JavaScript
					</Nav.Link>
				</Nav.Item>
			</Nav>
			<TabContent tab={tab}></TabContent>
		</Container>
	);
}
function TabContent({ tab }) {
	return [
		<div className='tab-content'>
			<h5>HTML</h5>
			<p>
				The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser. It is often assisted by technologies such as Cascading Style
				Sheets (CSS) and scripting languages such as JavaScript.
			</p>
		</div>,
		<div className='tab-content'>
			<h5>CSS</h5>
			<p>
				Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML (including XML dialects such as SVG,
				MathML or XHTML).[1] CSS is a cornerstone technology of the World Wide Web, alongside HTML and JavaScript.[2]
			</p>
		</div>,
		<div className='tab-content'>
			<h5>JS</h5>
			<p>
				JavaScript (/ˈdʒɑːvəskrɪpt/), often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS. As of 2022, 98% of websites
				use JavaScript on the client side for webpage behavior, often incorporating third-party libraries. All major web browsers have a dedicated JavaScript engine to execute the code on users'
				devices
			</p>
		</div>,
	][tab];
}

export default Detail;
