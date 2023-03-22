import './App.css';
import { Nav, Navbar } from 'react-bootstrap';

function App() {
	return (
		<div className='App'>
			<Navbar bg='dark' variant='dark' className='ps-3'>
				<Navbar.Brand href='#home'>수찬이네</Navbar.Brand>
				<Nav className='me-auto'>
					<Nav.Link href='#home'>Home</Nav.Link>
					<Nav.Link href='#features'>Features</Nav.Link>
					<Nav.Link href='#pricing'>Pricing</Nav.Link>
				</Nav>
			</Navbar>
		</div>
	);
}

export default App;
