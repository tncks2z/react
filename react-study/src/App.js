import './App.css';
import { useState } from 'react';

function App() {
  const [titles, setTitles] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학']); //자바스크립트의 Destruturing 문법
  const [goods, setGoods] = useState([0, 0, 0]);
  const [modal, setModal] = useState(false);
  const [index, setIndex] = useState(0);
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
        }}>
        가나다순 정렬
      </button>
      <button
        type="button"
        className="btn"
        onClick={() => {
          let copyTitle = [...titles]; // ... -> 괄호 벗겨주세요
          copyTitle[0] = '여자 코트 추천';
          setTitles(copyTitle);
        }}>
        글 제목 수정
      </button>
      {titles.map(function (item, index) {
        return (
          <div className="list" key={index}>
            <h4
              onClick={() => {
                setModal(!modal);
                setIndex(index);
              }}>
              {titles[index]}{' '}
              <span
                onClick={() => {
                  let copyGood = [...goods];
                  copyGood[index] = copyGood[index] + 1;
                  setGoods(copyGood);
                }}>
                👍
              </span>{' '}
              <span>{goods[index]}</span>
            </h4>
            <p>3월 19일 발행</p>
          </div>
        );
      })}
      {modal === true ? (
        <Modal
          changeTitle={function () {
            let copyTitle = [...titles];
            copyTitle[0] = '여자 코트 추천';
            setTitles(copyTitle);
          }}
          index={index}
          titles={titles}
        />
      ) : null}
    </div>
  );
}

function Modal(props) {
  return (
    <div className="modal">
      <h4>{props.titles[props.index]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button className="btn" type="button" onClick={props.changeTitle}>
        글수정
      </button>
    </div>
  );
}
export default App;
