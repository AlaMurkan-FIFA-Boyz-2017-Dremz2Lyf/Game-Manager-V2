
# Async Action Creators

  **All Async creators accept a stateKey (String), and data (Object)**

- `fetch` handles the async actions
  - `data` param is optional
    - If omitted, all items for that specific stateKey will be fetched.
    - If included, the data object will be passed as parameters to the Knex request.
  - dispatches `setLoading` for the `stateKey` with `true`
  - sends off the `get` request to the server for `stateKey` of that tournament
    - `.then` dispatch `receive` with the stateKey & data as the payload
    - `.catch` dispatch `setErrored` for `stateKey` with the error response
    - `.then` dispatch `setLoading` for the `stateKey` with `false`
- `create`
  - dispatches `setLoading` for the `stateKey` with `true`
  - sends off the `post` request to the server with the data to be created
    - `.then` dispatch `receive` with the `stateKey` and the created item(s)
    - `.catch` dispatch `setErrored` for `stateKey` with the error response
    - `.then` dispatch `setLoading` for the `stateKey` with `false`
- `update`
  - `data` param requires an ID for updating.
  - dispatches `setLoading` for the `stateKey` with `true`
  - sends off the `put` request to the server with the data to be updated
    - `.then` dispatch `receive` with the `stateKey` and the updated item(s)
    - `.catch` dispatch `setErrored` for `stateKey` with the error response
    - `.then` dispatch `setLoading` for the `stateKey` with `false`

# Sync Action Creators

  - `receive`
    - Accepts:
      - `stateKey` (String)
      - `data` (Object)
    - sends payload through to `data_reducer`, adding the corresponding data to correct substate.


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
      - For Home component, we pass all players from the store in. The compenent renders that table.
      - For PlayTournament component, we pass currentTable in.
        - when the PlayTournament component renders, we build the table based on the games and dispatch that to the store.


# General notes

  - Denormalization has panned out less awesome than I thought it would.
  - For the Home page Stats Table, The players denormalization should be fine.
    - Still need to decide on how to handle updates to that. Right now, in theory, it will be easier to update the players in the DB when the tournament finishes. Rather than on every single update of a game, update everything.
