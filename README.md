# Game Manager V2

Game Manager V2 is a rethink of the ever popular Game Manager. Again aimed at local/offline FIFA (the video game, not the corrupt worldwide football management organization) tournaments.

## Scripts

Install dependencies:

```
npm install
```

Run the tests:

```
npm test
```

Start the server:

```
npm start
```

Use nodemon for development:

```
npm run start:dev
```

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




# PLACEHOLDER README

A readme (or read me) file contains information about other files in a directory or archive and is very commonly distributed with computer software.

  * configuration instructions

  * installation instructions

  * operating instructions

  * a file manifest

  * copyright and licensing information

  * contact information for the distributor or programmer

  * known bugs

  * troubleshooting

  * credits and acknowledgements

  * a changelog
