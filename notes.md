
# Actions

- `FETCH` handles the async actions
  - accepts optional `data` object
  - dispatch `SET_LOADING` for the `stateKey` with `true`
  - sends off the `get` request to the server for `stateKey` of that tournament
    - `.then` dispatch `RECEIVE` with the stateKey's data as the payload
    - `.catch` dispatch `SET_ERROR` for `stateKey` with the error response
    - `.then` dispatch `SET_LOADING` for the `stateKey` with `false`
- `RECEIVE`
    - sends payload through to reducer, adding the data set to state
- `CREATE`
  - sends off the `post` request to the server with the specific data set
    - `.then` dispatch `FETCH` with the id for the stateKey
    - `.catch` dispatch `SET_ERROR` for `stateKey` with the error response
- `UPDATE`
  - sends off the `put` request to the server with a specific data set
    - `.then` dispatch `FETCH` with the id for the stateKey
    - `.catch` dispatch `SET_ERROR` for `stateKey` with the error response

# Store design


store = {
  isLoading: {
    tournaments: false,
    games: false,
    players: false
  },
  isError: {
    tournaments: null,
    games: null,
    players: null
  },
  data: {
    tournaments: {},
    players: {},
    games: {}
  },
  form: {
    playerForm
  },
  currentTable: {}
}

## PlayTournament Component

  Renders:
    - Games component
    - Standings component
      - Props passed to the standings component will be for the currentTournament

## Games Component

  Renders:
    - list of Game Components.

## Standings Component

  Renders
    - a table based on props in. 
