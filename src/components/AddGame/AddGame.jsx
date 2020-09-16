import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'

function AddGame() {
const [pair, setPair] = useState(0)
const [status, setStatus] = useState('')
const [addGame] = useMutation(ADD_GAME)
const handleSubmit = (e) => {
  e.preventDefault();
  addGame({ variables: { status, pair } })
  setPair('');
  setStatus('');
};
  return (
    <div className='form-container'>
      <form>
        <input
          type='text'
          name='pair'
          id='pair'
          value={pair}
          placeholder='Enter pair'
          onChange={(e) => setPair(Number(e.target.value))}
        />
        <input
          type='text'
          name='status'
          id='status'
          value={status}
          placeholder='Enter status'
          onChange={(e) => setStatus(e.target.value)}
        />
        <button type='submit' onClick={handleSubmit}>
          Send
        </button>
      </form>
    </div>
  )
}

export default AddGame

const ADD_GAME = gql`
mutation addGame($status: String, $pair: Int ) {
  addGame(status:$status, pair:$pair){
    status
    pair
  }
}
`
