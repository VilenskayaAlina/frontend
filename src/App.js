import React, { useState } from 'react';

function App() {
    const [input, setInput] = useState('');
    const [responseData, setResponseData] = useState('');

    const handleSubmit = () => {
        fetch('http://localhost:8000/api/save-data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: input })
        }).then(response => response.json())
            .then(data => console.log('Data sent to backend:', data));
    };

    const handleGetData = () => {
        fetch('http://localhost:8000/api/get-data')
            .then(response => response.json())
            .then(data => setResponseData(data));
    };

    return (
        <div>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={handleSubmit}>Отправить</button>
            <button onClick={handleGetData}>Получить данные</button>
            <div>Ответ с бэкенда: {responseData}</div>
        </div>
    );
}

export default App;
