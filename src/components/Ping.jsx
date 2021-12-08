/* eslint-disable react/button-has-type */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';

function PingComp() {
  const [address, setAddress] = useState('');
  const [timePing, setTimePing] = useState(0);

  // Запросу для получения примернго времени пинга
  const getDate = async () => {
    const start = performance.now();

    try {
      await fetch(`https://${address}`, { mode: 'no-cors' });
      const end = performance.now();
      const time = (end - start).toFixed(1);
      setTimePing(time);
    } catch (err) {
      console.log(err);
      setTimePing('Error');
    }
  };

  // render
  return (
    <div className="App">
      <h2>Задание 2</h2>
      <label htmlFor="textField">
        Введите адрес, например,
        {' '}
        <b>checkip.amazonaws.com</b>
      </label>
      <div className="App-wrapper">
        <p>https://</p>
        <input
          id="textField"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <br />
      <button onClick={() => getDate()}>
        Получить
      </button>
      <p>
        Время пинга:&nbsp;
        <span>{timePing}</span>
      </p>
    </div>
  );
}

export default PingComp;
