/* eslint-disable */ 
import React, { useState } from 'react';

function StatisticsComp() {
  const [arr, setArr] = useState([]);
  const [dispersion, setDispersion] = useState(0);
  const [standDevitation, setStandDevitation] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [timeToPerfomance, setTimeToPerfomance] = useState(0);
  const [median, setMedian] = useState(0);
  const [mode, setMode] = useState(0);
  const [statusDate, setStatusDate] = useState(true);

  // Расчет среднего(дисперсия) и стандартного отклонения
  function calcDispAndStandDevit() {
    const arrSum = arr.reduce((a, b) => a + b, 0);
    const arrMain = arrSum / arr.length;
    const dispersionSum = (arr.map((item) => (item - arrMain) ** 2).reduce((a, b) => a + b, 0));
    const dispersionValue = (dispersionSum / arr.length).toFixed();
    const standartDevitationVal = Math.sqrt(dispersionValue).toFixed(1);
    // Обновление среднего(дисперсия) и стандартного отклонения
    setDispersion(dispersionValue);
    setStandDevitation(standartDevitationVal);
  }

  // Расчет медианы
  function calcMedian() {
    let even;
    let odd;

    if (arr.length === 0) return 0;
    arr.sort((a, b) => a - b);
    const half = Math.floor(arr.length / 2);
    if (arr.length % 2) {
      even = arr[half];
      setMedian(even);
    } else {
      odd = (arr[half - 1] + arr[half]) / 2.0;
      setMedian(odd);
    }
  }

  // Расчет моды
  function calcmMode() {
    const map = new Map();
    let maxFreq = 0;
    // eslint-disable-next-line no-shadow
    let mode;

    // eslint-disable-next-line no-restricted-syntax
    for (const item of arr) {
      let freq = map.has(item) ? map.get(item) : 0;
      // eslint-disable-next-line no-plusplus
      freq++;
      if (freq > maxFreq) {
        maxFreq = freq;
        mode = item;
      }

      map.set(item, freq);
    }
    setMode(mode);
    return mode;
  }

  // Показ статистики
  const showStatistics = () => {
    // Начало отсчета выполнения функции (оценка производительности)
    const start = performance.now();
    // Расчет среднего(дисперсия) и стандартного отклонения
    calcDispAndStandDevit();

    // Расчет медианы
    calcMedian();

    // Расчет моды
    calcmMode();

    // Окончание отсчета выполнения фунуции (оценка производительности)
    const end = performance.now();

    // Расчет времени на выполнение операций
    const time = (end - start).toFixed(1);

    // Обновление значения затраченного времени на выполнение
    setTimeToPerfomance(time);
  };

  // Загрузка веб сокета
  const LoadWSS = () => {
    console.log(arr.length, 'arr.lengtht');
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
      setArr((arr) => [...arr, Number(response.value)]);
      setDisabled(false);
      setStatusDate(true);
      console.log(response.value, 'value');
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

  // render
  return (
    <div className="App">
      <h2>Задание 1</h2>
      <button onClick={() => LoadWSS()}>
        Старт
      </button>
      <button
        disabled={disabled}
        onClick={() => showStatistics()}
      >
        {statusDate ? 'Статистика' : 'Загружаю данные...'}
      </button>
      <p>
        Среднее отклонение:
        <span>{dispersion}</span>
      </p>
      <p>
        Cтандартное отклонение:
        <span>{standDevitation}</span>
      </p>
      <p>
        Мода:
        <span>{mode}</span>
      </p>
      <p>
        Медиана:
        <span>{median}</span>
      </p>
      <p>
        Время выполнения операции: 
        <span>{timeToPerfomance}</span>
      </p>
    </div>
  );
}

export default StatisticsComp;
