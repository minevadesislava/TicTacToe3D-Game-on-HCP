<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="ISO-8859-1" content="width=device-width" initial-scale=1" >
<link rel="stylesheet" type="text/css" href="tictactoe.css">
<script src="jquery-3.1.0.min.js"></script>
<script src="tictactoe.js"></script>
<title>Tic Tac Toe 3D game</title>
</head>
<body>

<div style="width:500px; margin:0 auto;">  
      <div id="board">
        <div class="row">
          <div class="tile" boardx="0" boardy="0" boardz="2"></div>
          <div class="tile" boardx="1" boardy="0" boardz="2"></div>
          <div class="tile" boardx="2" boardy="0" boardz="2"></div>
        </div>
        <div class="row">
          <div class="tile" boardx="0" boardy="1" boardz="2"></div>
          <div class="tile" boardx="1" boardy="1" boardz="2"></div>
          <div class="tile" boardx="2" boardy="1" boardz="2"></div>
        </div>
        <div class="row">
          <div class="tile" boardx="0" boardy="2" boardz="2"></div>
          <div class="tile" boardx="1" boardy="2" boardz="2"></div>
          <div class="tile" boardx="2" boardy="2" boardz="2"></div>
        </div>
      </div>
      
      <div class="spaceRow">
        <div class="row">
          <div class="tile" boardx="0" boardy="0" boardz="1"></div>
          <div class="tile" boardx="1" boardy="0" boardz="1"></div>
          <div class="tile" boardx="2" boardy="0" boardz="1"></div>
        </div>
        <div class="row">
          <div class="tile" boardx="0" boardy="1" boardz="1"></div>
          <div class="tile" boardx="1" boardy="1" boardz="1"></div>
          <div class="tile" boardx="2" boardy="1" boardz="1"></div>
        </div>
        <div class="row">
          <div class="tile" boardx="0" boardy="2" boardz="1"></div>
          <div class="tile" boardx="1" boardy="2" boardz="1"></div>
          <div class="tile" boardx="2" boardy="2" boardz="1"></div>
        </div>
      </div>
      
      <div class="spaceRow">
        <div class="row">
          <div class="tile" boardx="0" boardy="0" boardz="0"></div>
          <div class="tile" boardx="1" boardy="0" boardz="0"></div>
          <div class="tile" boardx="2" boardy="0" boardz="0"></div>
        </div>
        <div class="row">
          <div class="tile" boardx="0" boardy="1" boardz="0"></div>
          <div class="tile" boardx="1" boardy="1" boardz="0"></div>
          <div class="tile" boardx="2" boardy="1" boardz="0"></div>
        </div>
        <div class="row">
          <div class="tile" boardx="0" boardy="2" boardz="0"></div>
          <div class="tile" boardx="1" boardy="2" boardz="0"></div>
          <div class="tile" boardx="2" boardy="2" boardz="0"></div>
        </div>
      </div> 
      <div id="options">    
          <ul>
            <li id="player1" class="select">
              <div class="select">Play First</div>
              <ul>
                <li class="option">Play First</li>
                <li class="option">Play Second</li>
              </ul>
            </li>
          </ul>         
        </div>       
      <div id="dialogDiv" style="display: none">
        <p id="dialogText">Play another game?</p>
        <button id="newGameButton" type="button">New Game</button>
      </div>                                                 
    </div>   
</body>
</html>