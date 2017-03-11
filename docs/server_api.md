# Routes

**THIS IS NOT FULLY UP TO DATE**

Please put in a PR if you would like to contribute!

## Tournaments

_this will be the style guide for improvements to the existing api docs_

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


## API

#### '/games'

  * GET:
    - Accepts:
      (Optional)
      - `id`  __Number__
      - `type` __String__ (should be either `game` or `tournament`)
    - Responds with: The game or games matching the `type` and `id` of the request. If no parameters are given, all the games.

  * POST:
    - Accepts:
      - `games` __Array__ of __Numbers__
      - `tournamentId`  __Number__
    - Responds with: The games created.

  * PUT:
    - Accepts:
      - `game` __Object__
    - Responds with: The updated `game`.

#### '/players'

  * GET:
    - Accepts:
      (Optional)
      - `id`  __Number__
    - Responds with: A single player matching the `id` of the request. If no parameters are given, all the players.

  * POST:
    - Accepts:
      - `username` __String__
    - Responds with: The new `player`.

  * PUT:
    - Accepts:
      - `player` __Object__
    - Responds with: The updated `player`.

  * DELETE:
    - Accepts:
      - `id` __Number__
    - Responds with: `deleted`.

#### '/tournaments'

  * GET:
    - Accepts:
      (Optional)
      - `id`  __Number__
    - Responds with: One tournament matching the `id`, or all tournaments.

  * POST:
    - Accepts:
      - `name`  __String__
    - Responds with: The entire tournament.

  * PUT:
    - Accepts:
      - `tournament` __Object__
    - Responds with: The updated `tournament`
