_Game = null;
_SI = null;
$(document).ready(function() {
  window.rootObjects = {};
  window.rootObjects.systemInterface = _SI = new SystemInterface();
  window.rootObjects.game = _Game = new Game();
});

const {ipcRenderer} = window.nodeRequire("electron");

ipcRenderer.on("simulateBoard", (event, boardString)=>{
  window.strToBoard(boardString);
});

window.test = function () {
  const {ipcRenderer} = window.nodeRequire("electron");
  ipcRenderer.sendSync("simulateBoard", "100220110");
}
