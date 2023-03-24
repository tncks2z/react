import { useEffect, useState } from 'react';
import { Container, Row, Col, InputGroup, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function Detail(props) {
	const [isAlert, setIsAlert] = useState(true);
	const [userInput, setUserInput] = useState('');
	const [isNumber, setIsNumber] = useState(true);
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

	return (
		<Container>
			{isAlert ? <div className='alert alert-danger'>2초이내 구매시 할인</div> : null}

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
			<InputGroup className='mb-3'>
				<Form.Control
					placeholder='숫자를 입력해주세요'
					onChange={(e) => {
						setUserInput(e.target.value);
					}}
				/>
			</InputGroup>
			{isNumber || userInput === '' ? null : <div className='alert alert-danger'>입력값은 숫자여야만합니다</div>}
		</Container>
	);
}
export default Detail;
