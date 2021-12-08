import React from 'react';
import './App.css';
import Statistics from './components/Statistics';
// import Ping from './components/Ping';
import { useState } from 'react';

function App() {
  const [data, setData] = useState([])
  // const [dispersion, setDispersion] = useState(0);
  // const [standDevitation, setStandDevitation] = useState(0);
  const [disabled, setDisabled] = useState(true);
  // const [timeToPerfomance, setTimeToPerfomance] = useState(0);
  // const [median, setMedian] = useState(0);
  // const [mode, setMode] = useState(0);
  const [statusDate, setStatusDate] = useState(true);
    // Загрузка веб сокета
    const LoadWSS = () => {
      setStatusDate(false);
      const socket = new WebSocket('wss://trade.trademux.net:8800/?password=1234');
  
      // Открытие соединения
      socket.onopen = function () {
        console.log('[open] Соединение установлено');
        console.log('Отправляем данные на сервер');
        socket.send('Меня зовут Джон');
      };
  
      // Получения сообщений с сервера
      socket.onmessage = function (event) {
        const response = JSON.parse(event.data);
        // eslint-disable-next-line no-shadow
        // setArr((arr) => [...arr, Number(response.value)]);
        setDisabled(false);
        setStatusDate(true);
        setData((data) => [...data, Number(response.value)]);
      };
  
      // Закрытие соединения
      socket.onclose = function (event) {
        if (event.wasClean) {
          alert(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
        } else {
          // Например, сервер убил процесс или сеть недоступна
          // обычно в этом случае event.code 1006
          alert('[close] Соединение прервано');
        }
      };
  
      // Возникновение ошибки
      socket.onerror = function (error) {
        alert(`[error] ${error.message}`);
      };
    };

    
  // Render
  return (
    <>
      <button 
        onClick={LoadWSS}
      >
        WSS
      </button>
      <Statistics 
        wssData={data} 
        onClick={LoadWSS}
        disabled={disabled}
        statusDate={statusDate} />
      {/* <Ping /> */}
    </>
  );
}

export default App;
