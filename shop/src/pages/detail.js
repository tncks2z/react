import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function Detail(props) {
	const { id } = useParams();
	const filterItem = props.shoes.find((item) => item.id == id);
	return (
		<Container>
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
		</Container>
	);
}
export default Detail;
