import './App.css';
import { useState } from 'react';

function App() {
  const [titles, setTitles] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학']); //자바스크립트의 Destruturing 문법
  const [good, setGood] = useState(0);
  return (
    <div className="App">
      <div className="black-nav">
        <h3>ReactBlog</h3>
      </div>
      <button
        type="button"
        className="btn"
        onClick={() => {
          let sortTitle = [...titles];
          sortTitle.sort();
          setTitles(sortTitle);
        }}
      >
        가나다순 정렬
      </button>
      <button
        type="button"
        className="btn"
        onClick={() => {
          let copyTitle = [...titles]; // ... -> 괄호 벗겨주세요
          copyTitle[0] = '여자 코트 추천';
          setTitles(copyTitle);
        }}
      >
        글 제목 수정
      </button>
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
          {good}{' '}
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
      <Modal />
    </div>
  );
}

function Modal() {
  return (
    <div className="modal">
      <h4>글제목</h4>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  );
}
export default App;
