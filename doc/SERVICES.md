Services
=========

BDD test cases for chat-game UI

When In the main screen

 user should be able to create a new game

 user should be able to list their friends

 user shoud be able to list their current games

When playing a game
 
 user should be able to choose difficultly level on question

 user should be able to record and submit the recording to their partner

 user should be able to re-record and submit their recording

 a user should be able to answer a question sent to them


API URIs
==========

/api/game/create
/api/game/:id
/api/friends/list
/api/games/list
/api/game/:id/choose-question-level
/api/game/:id/submit-answer
/api/game/:id/guess-what-the-user-is-saying

API data structures
===========

Game
 - State/Score
 - 20 Question
   - >=2 Answers per questions

Sentence/Question
 - Translations
 - Difficulty level
 - Categories

Events
=========

A call to /api/game/create will create a new game.
A new game is a composition of participants, a topic that will load 20 questions.

// Views

Below a tree structure of the views for playing the game play. Numbers enumerate the call order.

├── GameView.js
└── game
    ├── listener
    │   ├── a_listen_and_answer.js
    │   ├── b_answer_is_correct.js
    │   ├── b_answer_is_wrong.js
    │   └── c_next_turn.js
    └── speaker
        ├── a_choose_question.js
        ├── b_a_translate.js
        ├── b_b_translate_confirm.js
        ├── b_b_translate_error.js
        ├── c_listener_answered_correct.js
        ├── c_listener_answered_wrong.js
        └── d_next_turn.js

