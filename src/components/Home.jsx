import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
import styled from 'styled-components';

const Home = () => {
  const [roomInput, setRoomInput] = useState('')
  const socket = io.connect('http://localhost:5000');
  console.log('socket', socket)


  function backendDone(msg) {
    console.log(`The backend says: `, msg);
  }

  function handleRoomInput(event) {
    const { value } = event.target;
    setRoomInput(value);
  }

  function handleRoomSubmit(event) {
    event.preventDefault();
    socket.emit("enter_room", { payload: roomInput }, backendDone)
    setRoomInput('');
  }

  return (
    <div>
      <StHeader>
        <h1>zoom</h1>
      </StHeader>
      <StMain>
        <div id='welcome'>
          <form onSubmit={handleRoomSubmit}>
            <input type="text" placeholder='room name' value={roomInput} required onChange={handleRoomInput} />
            <button>Enter Room</button>
          </form>
        </div>
      </StMain>
    </div>
  )
}


const StHeader = styled.header`
  
`
const StMain = styled.main`
  
`

export default Home