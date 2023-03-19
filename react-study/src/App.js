import './App.css';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

function App() {
  const [titles, setTitles] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학']); //자바스크립트의 Destruturing 문법
  const [good, setGood] = useState(0);
  return (
    <div className="App">
      <div className="black-nav">
        <h4>ReactBlog</h4>
        <Button variant="outline-primary">Primary</Button>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setTitles('여자 코트 추천');
          }}
        >
          여자 코트 보기
        </button>
      </div>
      <div className="list">
        <h4>
          {titles[0]}{' '}
          <span
            onClick={() => {
              setGood(good + 1);
            }}
          >
            👍
          </span>{' '}
          {good}
        </h4>
        <p>3월 19일 발행</p>
      </div>
      <div className="list">
        <h4>
          {titles[1]} <span>👍</span>
        </h4>
        <p>3월 19일 발행</p>
      </div>
      <div className="list">
        <h4>
          {titles[2]} <span>👍</span>
        </h4>
        <p>3월 19일 발행</p>
      </div>
    </div>
  );
}

export default App;
