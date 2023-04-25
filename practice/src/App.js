import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
	const [count, setCount] = useState(0);
	const [age, setAge] = useState(20);
	useEffect(() => {
		if (count != 0 && count < 3) {
			setAge(age + 1);
		}
	}, [count]);
	return (
		<div>
			<div>안녕하십니까 전 {age}</div>
			<button
				onClick={() => {
					setCount(count + 1);
				}}>
				누르면한살먹기
			</button>
		</div>
	);
}

export default App;
