import React, { useEffect, useState } from 'react'

const Home = () => {
  const [input, setInput] = useState('');
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('')
  const [list, setList] = useState([]);

  const socket = new WebSocket(`ws://localhost:5000`);

  function makeMessage(type, payload) {
    // 여기서 객체인데 type, payload 하나만 넣어주는 거 궁금함, 찾아보기
    const msg = { type, payload };
    return JSON.stringify(msg);
  }

  socket.addEventListener('open', () => {
    console.log('Connected to Server ✅')
  })

  socket.addEventListener('message', (message) => {
    console.log('New message: ', message.data);
    setMessage(message.data)
  })

  useEffect(() => {
    if (message.length > 0) {
      console.log(message);
      setList((prev) => [...prev, message])
    }
  }, [message])

  console.log('message', message)

  socket.addEventListener('close', () => {
    console.log('Disconnected from Server ❌');
  })

  function handleInput(event) {
    const { value } = event.target;
    setInput(value);
  }

  function handleNickInput(event) {
    const { value } = event.target;
    setNickname(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    socket.send(makeMessage('new_message', input));
    setInput('');
  }


  function handleNickSubmit(event) {
    event.preventDefault();
    socket.send(makeMessage('nickname', nickname));
    setNickname('');
  }


  // setTimeout(() => {
  //   socket.send('hello from the browser!');
  // }, 3000)

  return (
    <div>
      <header>
        <h1>zoom</h1>
      </header>
      <main>
        <form onSubmit={handleNickSubmit}>
          <input
            type='text'
            placeholder='choose a nickname'
            value={nickname}
            onChange={handleNickInput}
            required
          />
          <button>Save</button>
        </form>
        <ul>
          {list.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='write a msg'
            value={input}
            onChange={handleInput}
            required
          />
          <button>Send</button>
        </form>
      </main>
    </div>
  )
}

export default Home