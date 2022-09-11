Spawn (current board)
  # GET:
    Variable: currentGround & currentSky
  # Random number (12x13)
    Store to variable json (CLOUDS)
  # SPAWN
    Loop for current ground & sky (CREATE)
    spawn CLOUDS from json
    Store to variable

Rocket
  # CREATE
    Get rocket x,y from json
    copy current rocket x,y to variable
    copy current board and put current rocket in VAR

Display
  # DISPLAY
    display VAR

Move
  # GET
    current rocket
    +/- number

  # APPEND  
    append current rocket to curr board


Fly 
  # FLY
    Loop for current ground & sky (CREATE) (-1 ground var. / +1)
    change clouds y -1
    append clouds

  # SHOW
    show 