import React from 'react';

function Statistic(props) {
    let mean = 0;

    /**
     *
     * @returns {number}
     */
    const getMode = () => {
        let i = props.length,
            counts = [],
            max = 0,
            value = 0,
            counter,
            mode;

        while(i--) {
            value = props.data[i];
            counter = (counts[value] || 0) + 1;
            counts[value] = counter;
            if (counter > max) {
                max = counter;
                mode = value;
            }
        }

        return mode;
    }

    /**
     *
     * @returns {number}
     */
    const getMedian = () => {
        let median;
        let half = Math.floor(props.length / 2);

        if (props.length % 2) {
            median = props.data[half];
        } else {
            median = (props.data[half - 1] + props.data[half]) / 2;
        }

        return median.toFixed(3);
    }

    /**
     *
     * @returns {number}
     */
    const getMean = () =>  {
        let i = props.length;
        let total = 0;

        while (i--) {
            total += props.data[i];
        }

        mean = total / props.length;
        return mean.toFixed(3);
    }

    /**
     *
     * @returns {number}
     */
    const getDeviation = () =>  {
        let mean = 0;
        
        let deviation = 0;
        let i = props.length,
            some = (mean === 0) ? getMean() : mean,
            total = 0;

        while(i--) {
            total += Math.pow(props.data[i] - mean, 2)
        }

        deviation = Math.sqrt(total / props.length);
        return deviation.toFixed(3);
    }


        if (props.length === 0) {
            return <div className="statistic"><div className="statistic__empty">Пока нет данных для обработки.</div></div>
        }

        const lost = (props.lost) ? 'Не учтено котировок: ' + (props.lost)  : '' ;

        props.data.sort(function (a,b) {
            return a - b;
        });

        return (
            <div className="statistic">
                <div className="statistic__item">
                    <label>Среднее</label>
                    <b>{getMean()}</b>
                </div>
                <div className="statistic__item">
                    <label>Стандартное отклонение</label>
                    <b>{getDeviation()}</b>
                </div>
                <div className="statistic__item">
                    <label>Медиана</label>
                    <b>{getMedian()}</b>
                </div>
                <div className="statistic__item">
                    <label>Мода</label>
                    <b>{getMode()}</b>
                </div>

                <div className="statistic__info">
                    Обработано котировок: {props.length}. {lost}
                </div>
            </div>
        )
}

export default Statistic;