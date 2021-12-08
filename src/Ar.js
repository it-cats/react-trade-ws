import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import shortid from 'shortid';


function App() {
  const [arr, setArr] = useState([])
  const [dispersion, setDispersion] = useState(0)
  const [standDevitation, setStandDevitation] = useState(0)
  const [disabled, setDisabled] = useState(true)
  const [time, setTime] = useState(0);
 
  function calcDispAndStandDevit() {
    let someArr = arr // массив
    let arr2Sum = someArr.reduce((a,b) => a + b, 0)  //сумма всех элементов
    let arrMain = arr2Sum / someArr.length; // среднее значение элемента массива
    let dispersionValue  = someArr.map(i => (i - arrMain)**2).reduce((a,b) => a + b, 0) / someArr.length; // среднее отклоненеи(дисперсия)
    let standartDevitationVal = Math.sqrt(dispersionValue)   // стандартное отклоненеи
    console.log(dispersionValue, 'dispersionValue')
    console.log(standartDevitationVal, 'standartDevitationVal')
    setDispersion(dispersionValue);
    setStandDevitation(standartDevitationVal);

  }







  const showStatistics = () => {

    const t0 = performance.now();

    calcDispAndStandDevit();
    const t1 = performance.now();
    const timeValue = (t1 - t0).toFixed(1);
    setTime(timeValue);

  }


    const LoadWSS = () => {
      setDisabled(false);
      let socket = new WebSocket("ws://localhost:9000");

      socket.onopen = function(e) {
        console.log("[open] Соединение установлено");
        console.log("Отправляем данные на сервер");
        socket.send("Меня зовут Джон");
      };

      socket.onmessage = function(event) {
        // const t0 = performance.now();
        console.log(event.data)
        console.time("FirsttWay");
        setArr(arr => [...arr, Number(event.data)])
        console.timeEnd("FirsttWay")
        // const t1 = performance.now();
        // let date = t1 - t0;
        // console.log("время выполнения")
      };


      socket.onclose = function(event) {
        if (event.wasClean) {
          alert(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
        } else {
          // например, сервер убил процесс или сеть недоступна
          // обычно в этом случае event.code 1006
          alert('[close] Соединение прервано');
        }
      };

      socket.onerror = function(error) {
        alert(`[error] ${error.message}`);
      };
    }

  return (
    <div className="App" style={{display: 'flex', flexDirection: 'column', maxWidth: '300px', justifyContent: 'center', margin: '0 auto'}}>
      <button
        onClick={() => LoadWSS()}
        style={{margin: '30px 0'}}>
          Start
      </button>
      <button 
        disabled={disabled}
        onClick={() => showStatistics()}
      >Statistics
      </button>
      {/* <p>Number of length {arr.length}</p> */}
      {/* <p>Sum {sumArr}</p> */}
      {/* {arr.map((item) => <li key={shortid.generate()}>{item}</li>)} */}
      <p>Дисперсия: {dispersion}</p>
      <p>Cтандартное отклонение {standDevitation}</p>
      <p>Средне выполнение операции {time}</p>
    </div>
  );
}

export default App;
