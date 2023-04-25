/* eslint-disable */

import { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, InputGroup, Form, Nav, Table, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import '../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../store';

function Detail(props) {
	const [isAlert, setIsAlert] = useState(true);
	const [userInput, setUserInput] = useState('');
	const [isNumber, setIsNumber] = useState(true);
	const [tab, setTab] = useState(0);
	const [fade, setFade] = useState('');
	const [shoes, setShoes] = useState(props.shoes);
	const dispatch = useDispatch();
	useEffect(
		() => {
			// 두번째로 코드 실행
			// 재랜더링마다 코드 실행 -> 뒤에 []추가시, mount 될때 1회만 해당코드 재생. 이후엔 노재생
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
	useEffect(() => {
		setTimeout(() => {
			setFade('animation-end');
		}, 100);
		return () => {
			clearTimeout();
			setFade('');
		};
	}, []);
	const { id } = useParams();
	const filterItem = props.shoes.find((item) => item.id === Number(id));

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
					<button
						className='btn btn-danger'
						onClick={() => {
							dispatch(
								addItem({
									id: filterItem.id,
									name: filterItem.title,
									count: 1,
									price: filterItem.price,
								})
							);
						}}>
						주문하기
					</button>
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
						상품상세
					</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey='1' onClick={() => setTab(1)}>
						상품평
					</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey='2' onClick={() => setTab(2)}>
						상품문의
					</Nav.Link>
				</Nav.Item>
			</Nav>
			<TabContent tab={tab} shoes={filterItem}></TabContent>
		</Container>
	);
}
function TabContent({ tab, shoes }) {
	const store = useSelector((state) => state);
	const filterItem = store.review.filter((review) => review.shoesId === shoes.id);
	return [
		<div className='tab-content'>
			<p style={{ fontWeight: 'bold' }}>필수 표기정보</p>
			<Table striped='columns' bordered>
				<tbody>
					<tr>
						<td>제품명</td>
						<td>{shoes.title}</td>
						<td>상품의 주소재</td>
						<td>겉감-메쉬 / 안감-메쉬 / 아웃솔-EVA</td>
					</tr>
					<tr>
						<td>치수</td>
						<td>컨텐츠 참조</td>
						<td>제조국</td>
						<td>{shoes.content}</td>
					</tr>
					<tr>
						<td>색상</td>
						<td>black</td>
						<td>제조자(수입자)</td>
						<td>수찬이네</td>
					</tr>
				</tbody>
			</Table>
		</div>,
		<div className='tab-content d-flex justify-content-between'>
			{filterItem.length === 0 ? (
				<p>등록된 상품평이 없습니다</p>
			) : (
				<Row>
					<Col>
						{filterItem.map((review, index) => {
							return (
								<Card bg='light' key={index} width={'100%'} className='mb-2'>
									<Card.Header className='d-flex justify-content-between'>
										<span>{review.user}</span> <span>{'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}</span>
									</Card.Header>
									<Card.Body>
										<Card.Title>{review.review.length > 20 ? review.review.substring(0, 20) + '...' : review.review}</Card.Title>
										<Card.Text>{review.review}</Card.Text>
									</Card.Body>
								</Card>
							);
						})}
					</Col>
				</Row>
			)}
		</div>,
		<div className='tab-content'>
			<p style={{ fontWeight: 'bold' }}>상품문의</p>
			<ul>
				<li>
					구매한 상품의 <span style={{ fontWeight: 'bold' }}>취소/반품은 구매내역에서 신청</span> 가능합니다.
				</li>
				<li>상품문의 및 후기게시판을 통해 취소나 환불, 반품 등은 처리되지 않습니다.</li>
				<li>
					<span style={{ fontWeight: 'bold' }}>가격, 판매자, 교환/환불 및 배송 등 해당 상품 자체와 관련 없는 문의는 고객센터 내 1:1 문의하기</span>를 이용해주세요.
				</li>
				<li>
					<span style={{ fontWeight: 'bold' }}>"해당 상품 자체"와 관계없는 글, 양도, 광고성, 욕설, 비방, 도배 등의 글은 예고 없이 이동, 노출제한, 삭제 등의 조치가 취해질 수 있습니다.</span>
				</li>
				<li>공개 게시판이므로 전화번호, 메일 주소 등 고객님의 소중한 개인정보는 절대 남기지 말아주세요.</li>
			</ul>
		</div>,
	][tab];
}
function Review() {
	return <div></div>;
}
export default Detail;
