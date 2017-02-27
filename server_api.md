# Routes

## Tournaments

  - `get`: If no query is provided, the method for tournaments returns all tournaments. Eventually this will be limited to the most recent 100 or so, when we actually have enough tournaments to warrant it.
    @query
      - `id`: id corresponding to the requested tournament.
  - `post`:
    @body <Object>
      - `added`: should be an <Object> of players participating in the tournament with their ids as the keys.
      - `rounds`: should be a <Number> representing the number of round to be applied to the tournament. How many times every player will play every other player. Defaults to `1` if not provided.
      - `name`: A <String> for the tournament name

  - `put`:
    @body <Object>
      - should be an object of tournament data to be updated.
