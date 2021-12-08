/* eslint-disable */ 
import React, { useState } from 'react';
import ButtonComp from './Button';
import IndicatorComp from './Indicator';
function StatisticsComp({wssData, onClick, disabled, statusDate}) {
  const [dispersion, setDispersion] = useState(0);
  const [standDevitation, setStandDevitation] = useState(0);
  const [timeToPerfomance, setTimeToPerfomance] = useState(0);
  const [median, setMedian] = useState(0);
  const [mode, setMode] = useState(0);

  // Расчет среднего(дисперсия) и стандартного отклонения
  function calcDispAndStandDevit() {
    const arrSum = wssData.reduce((a, b) => a + b, 0);
    const arrMain = arrSum / wssData.length;
    const dispersionSum = (wssData.map((item) => (item - arrMain) ** 2).reduce((a, b) => a + b, 0));
    const dispersionValue = (dispersionSum / wssData.length).toFixed();
    const standartDevitationVal = Math.sqrt(dispersionValue).toFixed(1);
    // Обновление среднего(дисперсия) и стандартного отклонения
    setDispersion(dispersionValue);
    setStandDevitation(standartDevitationVal);
  }

  // Расчет медианы
  function calcMedian() {
    let even;
    let odd;
    if (wssData.length === 0) return 0;
    wssData.sort((a, b) => a - b);
    const half = Math.floor(wssData.length / 2);
    if (wssData.length % 2) {
      even = wssData[half];
      setMedian(even);
    } else {
      odd = (wssData[half - 1] + wssData[half]) / 2.0;
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
    for (const item of wssData) {
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


  // render
  return (
    <div className="App">
      <h2>Задание 1</h2>
      <ButtonComp 
        name="Старт"
        click={onClick}
        disabled={false}
      />
      <ButtonComp 
        name={statusDate ? 'Статистика' : 'Загружаю данные...'}
        click={showStatistics2}
        disabled={disabled}
      />

      <IndicatorComp 
        title="Среднее отклонение:"
        value={dispersion}
      />

      <IndicatorComp 
        title="Cтандартное отклонение:"
        value={standDevitation}
      />

      <IndicatorComp 
        title="Мода:"
        value={mode}
      />

      <IndicatorComp 
        title="Медиана:"
        value={median}
      />

      <IndicatorComp 
        title="Время выполнения операции:"
        value={timeToPerfomance}
      />

    </div>
  );
}

export default StatisticsComp;
