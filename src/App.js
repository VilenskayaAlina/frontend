import React, { useState } from 'react';

function App() {
    const [input1, setInput1] = useState("");  // Строка для первого ввода
    const [input2, setInput2] = useState("");  // Строка для второго ввода (результат)
    const [responseMessage, setResponseMessage] = useState("");  // Сообщение о сохранении данных

    // Функция для отправки первого ввода на бэкенд
    const sendFirstData = async () => {
        const response = await fetch('http://localhost:8000/api/save-data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: input1 })
        });
        const result = await response.json();
        setResponseMessage(result.message);  // Отображение сообщения от бэкенда
        setInput1("");  // Очистка поля ввода после отправки
    };

    // Функция для получения данных с бэкенда (по второму запросу)
    const fetchSecondData = async () => {
        const response = await fetch('http://localhost:8000/api/get-data');
        const result = await response.json();
        setInput2(result.data);  // Отображение данных в поле input2
    };

    return (
        <div>

            {/* Первое поле для ввода текста и кнопка */}
            <input
                type="text"
                value={input1}
                onChange={(e) => setInput1(e.target.value)}
                placeholder="Введите данные для отправки"
            />
            <button onClick={sendFirstData}>Отправить</button>  {/* Кнопка отправки данных на бэкенд */}
            <p>{responseMessage}</p>  {/* Отображение ответа от первого запроса */}

            {/* Второе поле для получения данных с бэкенда */}
            <button onClick={fetchSecondData}>Получить данные</button>  {/* Кнопка для получения данных с бэкенда */}
            <input
                type="text"
                value={input2}
                readOnly  // Поле только для чтения
                placeholder="Полученные данные"
            />
        </div>
    );
}

export default App;
