const CONFIG = window.BLOCKBUSTERS_CONFIG || {};
const STORAGE_KEY = "blockbusters_games_v1";
const COLORS = [
  {name:"Blau", value:"#2563eb"},
  {name:"Türkis", value:"#0891b2"},
  {name:"Rot", value:"#dc2626"},
  {name:"Orange", value:"#ea580c"},
  {name:"Gelb", value:"#eab308"},
  {name:"Grün", value:"#16a34a"},
  {name:"Violett", value:"#9333ea"},
  {name:"Pink", value:"#db2777"}
];

const SAMPLE_GAME = {
  id:"sample-market",
  title:"Angebot und Nachfrage",
  createdAt:new Date().toISOString(),
  updatedAt:new Date().toISOString(),
  questions:[
    {type:"Grundlage",question:"Was versteht man unter der Nachfrage auf einem Markt?",answer:"Die Menge eines Gutes, die Konsumentinnen und Konsumenten bei einem bestimmten Preis kaufen wollen und können."},
    {type:"Grundlage",question:"Was versteht man unter dem Angebot auf einem Markt?",answer:"Die Menge eines Gutes, die Anbieter bei einem bestimmten Preis verkaufen wollen und können."},
    {type:"Grundlage",question:"Wie verläuft die Nachfragekurve normalerweise?",answer:"Fallend. Bei einem höheren Preis wird normalerweise eine geringere Menge nachgefragt."},
    {type:"Grundlage",question:"Wie verläuft die Angebotskurve normalerweise?",answer:"Steigend. Bei einem höheren Preis wird normalerweise eine grössere Menge angeboten."},
    {type:"Grundlage",question:"Was ist der Gleichgewichtspreis?",answer:"Der Preis, bei dem angebotene und nachgefragte Menge gleich gross sind."},
    {type:"Grundlage",question:"Was ist die Gleichgewichtsmenge?",answer:"Die Menge, die beim Gleichgewichtspreis angeboten und nachgefragt wird."},
    {type:"Anwendung",question:"Der Marktpreis liegt über dem Gleichgewichtspreis. Welche Überschusssituation entsteht?",answer:"Ein Angebotsüberschuss."},
    {type:"Anwendung",question:"Der Marktpreis liegt unter dem Gleichgewichtspreis. Welche Überschusssituation entsteht?",answer:"Ein Nachfrageüberschuss."},
    {type:"Wirkungskette",question:"Auf einem Markt besteht ein Angebotsüberschuss. In welche Richtung besteht Druck auf den Preis?",answer:"Nach unten."},
    {type:"Wirkungskette",question:"Auf einem Markt besteht ein Nachfrageüberschuss. In welche Richtung besteht Druck auf den Preis?",answer:"Nach oben."},
    {type:"Richtig/Falsch",question:"Richtig oder falsch: Steigt der Preis eines Gutes, verschiebt sich die Nachfragekurve automatisch nach links.",answer:"Falsch. Eine Änderung des eigenen Preises führt zu einer Bewegung auf der Nachfragekurve."},
    {type:"Richtig/Falsch",question:"Richtig oder falsch: Ein tieferer Preis führt normalerweise zu einer grösseren nachgefragten Menge.",answer:"Richtig."},
    {type:"Verschiebung",question:"Das Einkommen steigt. Wie verändert sich bei einem normalen Gut die Nachfrage?",answer:"Die Nachfrage steigt, die Nachfragekurve verschiebt sich nach rechts."},
    {type:"Verschiebung",question:"Ein Produkt wird plötzlich zum Trend. Wie verändert sich die Nachfrage?",answer:"Sie steigt, die Nachfragekurve verschiebt sich nach rechts."},
    {type:"Verschiebung",question:"Die Zahl der potenziellen Käuferinnen und Käufer sinkt stark. Wie verändert sich die Nachfrage?",answer:"Sie sinkt, die Nachfragekurve verschiebt sich nach links."},
    {type:"Verschiebung",question:"Der Preis eines Ersatzgutes steigt. Was geschieht typischerweise mit der Nachfrage nach dem betrachteten Gut?",answer:"Sie steigt, die Nachfragekurve verschiebt sich nach rechts."},
    {type:"Verschiebung",question:"Der Preis eines ergänzenden Gutes steigt stark. Was geschieht typischerweise mit der Nachfrage nach dem betrachteten Gut?",answer:"Sie sinkt, die Nachfragekurve verschiebt sich nach links."},
    {type:"Transfer",question:"Die Nachfrage steigt, das Angebot bleibt unverändert. Wie verändern sich Gleichgewichtspreis und Gleichgewichtsmenge?",answer:"Beide steigen."},
    {type:"Transfer",question:"Die Nachfrage sinkt, das Angebot bleibt unverändert. Wie verändern sich Gleichgewichtspreis und Gleichgewichtsmenge?",answer:"Beide sinken."},
    {type:"Verschiebung",question:"Die Produktionskosten sinken. Wie verändert sich das Angebot?",answer:"Das Angebot steigt, die Angebotskurve verschiebt sich nach rechts."},
    {type:"Verschiebung",question:"Ein wichtiger Rohstoff wird deutlich teurer. Wie verändert sich das Angebot?",answer:"Das Angebot sinkt, die Angebotskurve verschiebt sich nach links."},
    {type:"Verschiebung",question:"Eine neue Technologie senkt die Produktionskosten. Wie verändert sich das Angebot?",answer:"Es steigt, die Angebotskurve verschiebt sich nach rechts."},
    {type:"Verschiebung",question:"Mehr Unternehmen treten in einen Markt ein. Wie verändert sich das Marktangebot?",answer:"Es steigt, die Angebotskurve verschiebt sich nach rechts."},
    {type:"Transfer",question:"Das Angebot steigt, die Nachfrage bleibt unverändert. Was geschieht mit Preis und Menge?",answer:"Der Gleichgewichtspreis sinkt, die Gleichgewichtsmenge steigt."},
    {type:"Transfer",question:"Das Angebot sinkt, die Nachfrage bleibt unverändert. Was geschieht mit Preis und Menge?",answer:"Der Gleichgewichtspreis steigt, die Gleichgewichtsmenge sinkt."},
    {type:"Transfer",question:"Nachfrage und Angebot steigen gleichzeitig. Welche Aussage ist über die Gleichgewichtsmenge sicher?",answer:"Die Gleichgewichtsmenge steigt. Die Preiswirkung ist ohne weitere Angaben nicht eindeutig."},
    {type:"Transfer",question:"Die Nachfrage steigt und gleichzeitig sinkt das Angebot. Welche Preiswirkung ist eindeutig?",answer:"Der Gleichgewichtspreis steigt."},
    {type:"Transfer",question:"Die Nachfrage sinkt und gleichzeitig steigt das Angebot. Welche Preiswirkung ist eindeutig?",answer:"Der Gleichgewichtspreis sinkt."},
    {type:"Höchstpreis",question:"Was ist ein staatlicher Höchstpreis?",answer:"Ein gesetzlich festgelegter Preis, der nicht überschritten werden darf."},
    {type:"Höchstpreis",question:"Wann ist ein Höchstpreis bindend?",answer:"Wenn er unter dem Gleichgewichtspreis liegt."},
    {type:"Höchstpreis",question:"Welche Überschusssituation entsteht bei einem bindenden Höchstpreis?",answer:"Ein Nachfrageüberschuss."},
    {type:"Höchstpreis",question:"Der Gleichgewichtspreis beträgt 200 CHF, der Höchstpreis 250 CHF. Ist der Eingriff bindend?",answer:"Nein, weil der Höchstpreis über dem Gleichgewichtspreis liegt."},
    {type:"Höchstpreis",question:"Nennen Sie eine mögliche Folge eines bindenden Höchstpreises neben dem Nachfrageüberschuss.",answer:"Zum Beispiel Warteschlangen, Rationierung, Schwarzmärkte, Suchkosten oder sinkende Qualität."},
    {type:"Mindestpreis",question:"Was ist ein staatlicher Mindestpreis?",answer:"Ein gesetzlich festgelegter Preis, der nicht unterschritten werden darf."},
    {type:"Mindestpreis",question:"Wann ist ein Mindestpreis bindend?",answer:"Wenn er über dem Gleichgewichtspreis liegt."},
    {type:"Mindestpreis",question:"Welche Überschusssituation entsteht bei einem bindenden Mindestpreis?",answer:"Ein Angebotsüberschuss."},
    {type:"Mindestpreis",question:"Der Gleichgewichtspreis beträgt 18 CHF, der Mindestpreis 15 CHF. Ist der Eingriff bindend?",answer:"Nein, weil der Mindestpreis unter dem Gleichgewichtspreis liegt."},
    {type:"Mindestpreis",question:"Der Gleichgewichtspreis beträgt 18 CHF, der Mindestpreis 25 CHF. Ist der Eingriff bindend?",answer:"Ja, weil er über dem Gleichgewichtspreis liegt."},
    {type:"Rechnung",question:"Bei 10 CHF werden 120 Stück nachgefragt und 80 angeboten. Wie gross ist der Nachfrageüberschuss?",answer:"40 Stück."},
    {type:"Rechnung",question:"Bei 30 CHF werden 70 Stück nachgefragt und 110 angeboten. Wie gross ist der Angebotsüberschuss?",answer:"40 Stück."}
  ]
};

const els = {};
[
  "loginView","loginForm","loginEmail","loginPassword","loginError","loginSetupHint","app","appHeader",
  "dashboardView","editorView","gamesGrid","emptyState","newGameBtn","emptyNewBtn","homeBtn","logoutBtn",
  "editorHeading","gameTitleInput","jsonInput","parseStatus","saveGameBtn","cancelEditBtn","copyPromptBtn","appendJsonBtn","replaceJsonBtn","questionsList","addQuestionBtn","questionCount",
  "splashView","splashTitle","instructionsView","instructionsNextBtn","teamSetupView","team1Input","team2Input",
  "team1Palette","team2Palette","startTeam1","startTeam2","startRandom","teamSetupError","startMatchBtn",
  "gameView","matchTitle","board","controlCard","controlName","team1Card","team2Card","team1Display","team2Display",
  "team1Count","team2Count","poolRemaining","gameMenuBtn","gameMenuDialog","closeGameMenuBtn","undoBtn","restartBtn","leaveMatchBtn",
  "questionDialog","fieldNumber","questionType","questionText","buzzTeam1","buzzTeam2","buzzTeam1Name","buzzTeam2Name",
  "buzzStatus","moderatorActions","markCorrectBtn","markWrongBtn","answerBox","answerText","showAnswerBtn","newQuestionBtn",
  "cancelQuestionBtn","winnerDialog","winnerName","winnerRestartBtn","winnerHomeBtn","blockedDialog","blockedPoolRemaining","blockedRestartBtn","blockedHomeBtn","toast"
].forEach(function(id){ els[id] = document.getElementById(id); });

let supabaseClient = null;
let currentPin = sessionStorage.getItem("blockbusters_pin") || "";
let editingGameId = null;
let editorQuestions = [];
let currentGame = null;
let splashTimer = null;

let teams = {
  team1:{name:"Team 1",color:"#2563eb"},
  team2:{name:"Team 2",color:"#dc2626"}
};
let pendingColors = {team1:"#2563eb",team2:"#dc2626"};
let starterMode = "team1";
let initialControlTeam = "team1";
let controlTeam = "team1";
let owners = Array(25).fill(null);
let usedQuestions = new Set();
let retiredQuestions = new Set();
let activeField = null;
let activeQuestionIndex = null;
let buzzingTeam = null;
let wrongTeams = new Set();
let history = [];

function show(el){ el.classList.remove("hidden"); }
function hide(el){ el.classList.add("hidden"); }
function setView(view){
  [els.dashboardView,els.editorView].forEach(hide);
  show(view);
}
function toast(message){
  els.toast.textContent = message;
  show(els.toast);
  clearTimeout(toast._timer);
  toast._timer = setTimeout(function(){ hide(els.toast); },2200);
}
function uid(){
  return (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2);
}
function cleanJsonText(text){
  let t = text.trim();
  const fence = String.fromCharCode(96,96,96);
  if(t.indexOf(fence) === 0){
    t = t.slice(3);
    if(t.toLowerCase().indexOf("json") === 0) t = t.slice(4);
    const last = t.lastIndexOf(fence);
    if(last >= 0) t = t.slice(0,last);
  }
  return t.trim();
}
function parseGameInput(){
  const raw = cleanJsonText(els.jsonInput.value);
  if(!raw) throw new Error("Bitte zuerst KI Inhalt einfügen.");
  const parsed = JSON.parse(raw);
  const questions = Array.isArray(parsed) ? parsed : parsed.questions;
  if(!Array.isArray(questions)) throw new Error("Im JSON fehlt das Feld questions.");
  const cleaned = questions.map(function(q,index){
    if(!q || !q.question || !q.answer) throw new Error("Frage " + (index+1) + " braucht question und answer.");
    return {
      type:String(q.type || "Frage").trim() || "Frage",
      question:String(q.question).trim(),
      answer:String(q.answer).trim()
    };
  });
  return {
    title:String((parsed.title || els.gameTitleInput.value || "Blockbusters").trim()),
    questions:cleaned
  };
}
function updateQuestionCount(){
  const count = editorQuestions.length;
  els.questionCount.textContent = String(count);
  if(count < 25){
    els.questionCount.style.color = "#fca5a5";
  }else if(count < 40){
    els.questionCount.style.color = "#fde68a";
  }else{
    els.questionCount.style.color = "#86efac";
  }
}
function renderQuestionEditor(){
  els.questionsList.innerHTML = "";
  updateQuestionCount();

  if(editorQuestions.length === 0){
    const empty = document.createElement("div");
    empty.className = "question-empty";
    empty.textContent = "Noch keine Fragen. KI Inhalt importieren oder eine Frage hinzufügen.";
    els.questionsList.appendChild(empty);
    return;
  }

  editorQuestions.forEach(function(item,index){
    const card = document.createElement("article");
    card.className = "question-edit-card";

    const top = document.createElement("div");
    top.className = "question-edit-top";

    const number = document.createElement("span");
    number.className = "question-number";
    number.textContent = String(index + 1);

    const actions = document.createElement("div");
    actions.className = "question-edit-actions";

    const del = document.createElement("button");
    del.type = "button";
    del.className = "btn question-delete";
    del.textContent = "Löschen";
    del.addEventListener("click",function(){
      editorQuestions.splice(index,1);
      renderQuestionEditor();
      els.parseStatus.textContent = editorQuestions.length + " Fragen. Änderungen noch nicht gespeichert.";
      els.parseStatus.className = "parse-status muted";
    });

    actions.appendChild(del);
    top.appendChild(number);
    top.appendChild(actions);

    const grid = document.createElement("div");
    grid.className = "question-edit-grid";

    const typeLabel = document.createElement("label");
    typeLabel.textContent = "Typ";
    const typeInput = document.createElement("input");
    typeInput.type = "text";
    typeInput.value = item.type || "Frage";
    typeInput.placeholder = "z. B. MC, Rechnung, Fall";
    typeInput.addEventListener("input",function(){
      editorQuestions[index].type = typeInput.value;
    });
    typeLabel.appendChild(typeInput);

    const questionLabel = document.createElement("label");
    questionLabel.textContent = "Frage";
    const questionInput = document.createElement("textarea");
    questionInput.value = item.question || "";
    questionInput.placeholder = "Frage eingeben";
    questionInput.addEventListener("input",function(){
      editorQuestions[index].question = questionInput.value;
    });
    questionLabel.appendChild(questionInput);

    const spacer = document.createElement("div");

    const answerLabel = document.createElement("label");
    answerLabel.textContent = "Kurze, eindeutige Antwort";
    const answerInput = document.createElement("textarea");
    answerInput.className = "answer-input";
    answerInput.value = item.answer || "";
    answerInput.placeholder = "Lösung eingeben";
    answerInput.addEventListener("input",function(){
      editorQuestions[index].answer = answerInput.value;
    });
    answerLabel.appendChild(answerInput);

    grid.appendChild(typeLabel);
    grid.appendChild(questionLabel);
    grid.appendChild(spacer);
    grid.appendChild(answerLabel);

    card.appendChild(top);
    card.appendChild(grid);
    els.questionsList.appendChild(card);
  });
}
function addEditorQuestion(){
  editorQuestions.push({
    type:"Frage",
    question:"",
    answer:""
  });
  renderQuestionEditor();
  const cards = els.questionsList.querySelectorAll(".question-edit-card");
  const last = cards[cards.length - 1];
  if(last){
    last.scrollIntoView({behavior:"smooth",block:"center"});
    const field = last.querySelector("textarea");
    if(field) setTimeout(function(){ field.focus(); },250);
  }
}
function appendJsonToEditor(){
  try{
    const parsed = parseGameInput();
    const incoming = parsed.questions.map(function(q){
      return {type:q.type,question:q.question,answer:q.answer};
    });
    editorQuestions = editorQuestions.concat(incoming);
    if(!els.gameTitleInput.value.trim() && parsed.title) els.gameTitleInput.value = parsed.title;
    renderQuestionEditor();
    els.parseStatus.textContent = incoming.length + " Fragen hinzugefügt. Insgesamt jetzt " + editorQuestions.length + " Fragen.";
    els.parseStatus.className = "parse-status ok";
  }catch(e){
    els.parseStatus.textContent = e.message;
    els.parseStatus.className = "parse-status bad";
  }
}
function replaceJsonInEditor(){
  try{
    const parsed = parseGameInput();
    if(editorQuestions.length && !confirm("Die aktuelle Fragenliste wirklich vollständig ersetzen?")) return;
    editorQuestions = parsed.questions.map(function(q){
      return {type:q.type,question:q.question,answer:q.answer};
    });
    if(!els.gameTitleInput.value.trim() && parsed.title) els.gameTitleInput.value = parsed.title;
    renderQuestionEditor();
    els.parseStatus.textContent = editorQuestions.length + " Fragen übernommen. Die vorherige Liste wurde ersetzt.";
    els.parseStatus.className = "parse-status ok";
  }catch(e){
    els.parseStatus.textContent = e.message;
    els.parseStatus.className = "parse-status bad";
  }
}
function getValidatedEditorQuestions(){
  if(editorQuestions.length < 25){
    throw new Error("Mindestens 25 Fragen sind nötig. Aktuell: " + editorQuestions.length + ".");
  }
  return editorQuestions.map(function(q,index){
    const type = String(q.type || "Frage").trim() || "Frage";
    const question = String(q.question || "").trim();
    const answer = String(q.answer || "").trim();
    if(!question) throw new Error("Frage " + (index+1) + " hat keinen Fragetext.");
    if(!answer) throw new Error("Frage " + (index+1) + " hat keine Antwort.");
    return {type:type,question:question,answer:answer};
  });
}
function loadGames(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return [];
    const games = JSON.parse(raw);
    return Array.isArray(games) ? games : [];
  }catch(e){
    return [];
  }
}
function saveGames(games){
  localStorage.setItem(STORAGE_KEY,JSON.stringify(games));
}
function getGame(id){
  return loadGames().find(function(g){ return g.id === id; }) || null;
}
function mapRemoteGame(row){
  return {
    id:row.id,
    title:row.title,
    questions:Array.isArray(row.questions) ? row.questions : [],
    createdAt:row.created_at,
    updatedAt:row.updated_at
  };
}
async function syncGamesFromSupabase(){
  const result = await supabaseClient.rpc("bb_list_games",{p_pin:currentPin});
  if(result.error) throw result.error;
  const games = (result.data || []).map(mapRemoteGame);
  saveGames(games);
  return games;
}
async function saveGameToSupabase(game){
  const result = await supabaseClient.rpc("bb_save_game",{
    p_pin:currentPin,
    p_title:game.title,
    p_questions:game.questions,
    p_id:game.id
  });
  if(result.error) throw result.error;
  const row = Array.isArray(result.data) ? result.data[0] : result.data;
  return row ? mapRemoteGame(row) : game;
}
async function deleteGameFromSupabase(id){
  const result = await supabaseClient.rpc("bb_delete_game",{p_pin:currentPin,p_id:id});
  if(result.error) throw result.error;
}

function renderDashboard(){
  const games = loadGames().sort(function(a,b){ return String(b.updatedAt).localeCompare(String(a.updatedAt)); });
  els.gamesGrid.innerHTML = "";
  if(!games.length){
    show(els.emptyState);
    return;
  }
  hide(els.emptyState);
  games.forEach(function(game){
    const card = document.createElement("article");
    card.className = "game-card";
    const updated = game.updatedAt ? new Date(game.updatedAt).toLocaleDateString("de-CH") : "";
    card.innerHTML =
      "<h2></h2>" +
      '<div class="game-card-meta"><span>' + game.questions.length + ' Fragen</span><span>' + updated + '</span></div>' +
      '<div class="game-card-actions">' +
      '<button class="btn primary" data-action="play">Spielen</button>' +
      '<button class="btn secondary" data-action="edit">Bearbeiten</button>' +
      '<button class="btn ghost" data-action="delete">Löschen</button>' +
      "</div>";
    card.querySelector("h2").textContent = game.title;
    card.querySelector('[data-action="play"]').addEventListener("click",function(){ beginGameFlow(game.id); });
    card.querySelector('[data-action="edit"]').addEventListener("click",function(){ openEditor(game.id); });
    card.querySelector('[data-action="delete"]').addEventListener("click",function(){ deleteGame(game.id); });
    els.gamesGrid.appendChild(card);
  });
}

function openEditor(gameId){
  editingGameId = gameId || null;
  const game = gameId ? getGame(gameId) : null;
  els.editorHeading.textContent = game ? "Spiel bearbeiten" : "Neues Spiel";
  els.gameTitleInput.value = game ? game.title : "";
  els.jsonInput.value = "";
  editorQuestions = game
    ? game.questions.map(function(q){ return {type:q.type || "Frage",question:q.question || "",answer:q.answer || ""}; })
    : [];
  renderQuestionEditor();
  els.parseStatus.textContent = game
    ? game.questions.length + " Fragen geladen. Sie können alle Fragen direkt bearbeiten."
    : "KI Inhalt importieren oder Fragen direkt hinzufügen.";
  els.parseStatus.className = "parse-status muted";
  setView(els.editorView);
}
async function deleteGame(id){
  const game = getGame(id);
  if(!game) return;
  if(!confirm('Spiel "' + game.title + '" wirklich löschen?')) return;
  try{
    await deleteGameFromSupabase(id);
    saveGames(loadGames().filter(function(g){ return g.id !== id; }));
    renderDashboard();
    toast("Spiel gelöscht");
  }catch(e){
    toast("Löschen fehlgeschlagen");
  }
}
async function saveEditorGame(){
  try{
    const questions = getValidatedEditorQuestions();
    const title = els.gameTitleInput.value.trim();
    if(!title) throw new Error("Bitte einen Titel eingeben.");

    const games = loadGames();
    const now = new Date().toISOString();
    let game;
    if(editingGameId){
      const idx = games.findIndex(function(g){ return g.id === editingGameId; });
      if(idx < 0) throw new Error("Spiel wurde nicht gefunden.");
      game = Object.assign({},games[idx],{title:title,questions:questions,updatedAt:now});
    }else{
      game = {id:uid(),title:title,questions:questions,createdAt:now,updatedAt:now};
    }

    els.saveGameBtn.disabled = true;
    els.parseStatus.textContent = "Wird gespeichert ...";
    els.parseStatus.className = "parse-status muted";

    const saved = await saveGameToSupabase(game);
    const freshGames = loadGames();
    const existingIndex = freshGames.findIndex(function(g){ return g.id === saved.id; });
    if(existingIndex >= 0) freshGames[existingIndex] = saved;
    else freshGames.push(saved);
    saveGames(freshGames);
    editingGameId = saved.id;
    editorQuestions = saved.questions.map(function(q){
      return {type:q.type || "Frage",question:q.question || "",answer:q.answer || ""};
    });

    els.parseStatus.textContent = questions.length + " Fragen gespeichert.";
    els.parseStatus.className = "parse-status ok";
    toast("Spiel gespeichert");
    renderDashboard();
    setView(els.dashboardView);
  }catch(e){
    els.parseStatus.textContent = e.message || "Speichern fehlgeschlagen.";
    els.parseStatus.className = "parse-status bad";
  }finally{
    els.saveGameBtn.disabled = false;
  }
}
async function copyPrompt(){
  const topic = els.gameTitleInput.value.trim() || "[THEMA EINFÜGEN]";
  const promptText =
    "Erstelle für mein Unterrichtsspiel Blockbusters genau 40 abwechslungsreiche Fragen zum Thema: " + topic + ".\\n\\n" +
    "Die Fragen dürfen verschiedene Typen enthalten, zum Beispiel Grundlage, Transfer, Rechnung, Fall, Richtig/Falsch, Wirkungskette oder Anwendung. " +
    "Die Fragen sollen kurz genug für eine Gameshow sein, fachlich korrekt und für den Unterricht geeignet. " +
    "Gib ausschliesslich valides JSON ohne Markdown und ohne zusätzlichen Text aus.\\n\\n" +
    'Format:\\n{"title":"' + topic + '","questions":[{"type":"Transfer","question":"Frage...","answer":"Lösung..."}]}\\n\\n' +
    "Wichtig: exakt 40 Fragen, keine Buchstabenlogik, keine Nummern in den Fragetexten.";
  try{
    await navigator.clipboard.writeText(promptText);
    toast("KI Prompt kopiert");
  }catch(e){
    window.prompt("KI Prompt",promptText);
  }
}

function makePalette(container,teamKey){
  container.innerHTML = "";
  COLORS.forEach(function(color){
    const b = document.createElement("button");
    b.type = "button";
    b.className = "color-chip" + (pendingColors[teamKey] === color.value ? " selected" : "");
    b.style.background = color.value;
    b.title = color.name;
    b.addEventListener("click",function(){
      pendingColors[teamKey] = color.value;
      makePalette(els.team1Palette,"team1");
      makePalette(els.team2Palette,"team2");
    });
    container.appendChild(b);
  });
}
function updateStarterButtons(){
  [els.startTeam1,els.startTeam2,els.startRandom].forEach(function(b){ b.classList.remove("selected"); });
  if(starterMode === "team1") els.startTeam1.classList.add("selected");
  else if(starterMode === "team2") els.startTeam2.classList.add("selected");
  else els.startRandom.classList.add("selected");
}
function beginGameFlow(gameId){
  currentGame = getGame(gameId);
  if(!currentGame) return;
  retiredQuestions = new Set();
  hide(els.app);
  hide(els.instructionsView);
  hide(els.teamSetupView);
  hide(els.gameView);
  els.splashTitle.textContent = currentGame.title;
  show(els.splashView);
  clearTimeout(splashTimer);
  splashTimer = setTimeout(showInstructions,1700);
}
function showInstructions(){
  clearTimeout(splashTimer);
  hide(els.splashView);
  show(els.instructionsView);
}
function showTeamSetup(){
  hide(els.instructionsView);
  els.team1Input.value = "Team 1";
  els.team2Input.value = "Team 2";
  pendingColors = {team1:"#2563eb",team2:"#dc2626"};
  starterMode = "team1";
  updateStarterButtons();
  makePalette(els.team1Palette,"team1");
  makePalette(els.team2Palette,"team2");
  els.teamSetupError.textContent = "";
  show(els.teamSetupView);
}
function startMatch(){
  const n1 = els.team1Input.value.trim() || "Team 1";
  const n2 = els.team2Input.value.trim() || "Team 2";
  if(pendingColors.team1 === pendingColors.team2){
    els.teamSetupError.textContent = "Bitte zwei unterschiedliche Farben wählen.";
    return;
  }
  teams = {
    team1:{name:n1,color:pendingColors.team1},
    team2:{name:n2,color:pendingColors.team2}
  };
  if(starterMode === "random") initialControlTeam = Math.random() < .5 ? "team1" : "team2";
  else initialControlTeam = starterMode;
  resetMatchState();
  hide(els.teamSetupView);
  show(els.gameView);
  renderMatch();
}
function resetMatchState(){
  owners = Array(25).fill(null);
  usedQuestions = new Set();
  activeField = null;
  activeQuestionIndex = null;
  buzzingTeam = null;
  wrongTeams = new Set();
  history = [];
  controlTeam = initialControlTeam;
}

function poolRemainingCount(){
  if(!currentGame) return 0;
  let remaining = 0;
  for(let i=0;i<currentGame.questions.length;i++){
    if(!retiredQuestions.has(i) && !usedQuestions.has(i)) remaining++;
  }
  return remaining;
}
function updatePoolDisplay(){
  const remaining = poolRemainingCount();
  if(els.poolRemaining) els.poolRemaining.textContent = String(remaining);
  if(els.blockedPoolRemaining) els.blockedPoolRemaining.textContent = String(remaining);
}
function retireRoundQuestions(){
  usedQuestions.forEach(function(index){ retiredQuestions.add(index); });
}
function startNextRound(){
  retireRoundQuestions();
  if(poolRemainingCount() <= 0){
    toast("Keine unbenutzten Fragen mehr im Pool.");
    if(els.winnerDialog.open) els.winnerDialog.close();
    if(els.blockedDialog.open) els.blockedDialog.close();
    return;
  }
  resetMatchState();
  renderMatch();
  if(els.gameMenuDialog.open) els.gameMenuDialog.close();
  if(els.winnerDialog.open) els.winnerDialog.close();
  if(els.blockedDialog.open) els.blockedDialog.close();
}
function cssTeamColors(){
  document.documentElement.style.setProperty("--team1",teams.team1.color);
  document.documentElement.style.setProperty("--team2",teams.team2.color);
}
function renderMatch(){
  cssTeamColors();
  els.matchTitle.textContent = currentGame.title;
  els.controlName.textContent = teams[controlTeam].name;
  els.controlCard.style.borderColor = teams[controlTeam].color;
  els.team1Display.textContent = teams.team1.name;
  els.team2Display.textContent = teams.team2.name;
  els.team1Card.style.borderLeftColor = teams.team1.color;
  els.team2Card.style.borderLeftColor = teams.team2.color;
  const c1 = owners.filter(function(x){ return x === "team1"; }).length;
  const c2 = owners.filter(function(x){ return x === "team2"; }).length;
  els.team1Count.textContent = c1 + (c1 === 1 ? " Feld" : " Felder");
  els.team2Count.textContent = c2 + (c2 === 1 ? " Feld" : " Felder");
  updatePoolDisplay();
  renderBoard();
}
function renderBoard(){
  els.board.innerHTML = "";
  const svgNS = "http://www.w3.org/2000/svg";
  const s = 60;
  const hexH = Math.sqrt(3) * s;
  const stepX = 1.5 * s;
  const stepY = hexH;
  const cols = 5, rows = 5;
  const maxX = (s + (cols-1)*stepX) + s;
  const maxY = (hexH/2 + (rows-1)*stepY + hexH/2) + hexH/2;
  const svg = document.createElementNS(svgNS,"svg");
  svg.setAttribute("class","board-svg");
  svg.setAttribute("viewBox","0 0 " + maxX + " " + maxY);
  svg.setAttribute("preserveAspectRatio","xMidYMid meet");

  function points(cx,cy){
    const hh = hexH/2;
    return [
      [cx-s/2,cy-hh],[cx+s/2,cy-hh],[cx+s,cy],
      [cx+s/2,cy+hh],[cx-s/2,cy+hh],[cx-s,cy]
    ].map(function(p){ return p.join(","); }).join(" ");
  }

  for(let c=0;c<cols;c++){
    for(let r=0;r<rows;r++){
      const i = r*5+c;
      const cx = s + c*stepX;
      const cy = hexH/2 + r*stepY + (c%2 ? hexH/2 : 0);
      const poly = document.createElementNS(svgNS,"polygon");
      poly.setAttribute("points",points(cx,cy));
      poly.setAttribute("class","hex-shape " + (owners[i] || "free"));
      if(!owners[i]) poly.addEventListener("click",function(){ openField(i); });
      const text = document.createElementNS(svgNS,"text");
      text.setAttribute("x",cx);
      text.setAttribute("y",cy+2);
      text.setAttribute("class","hex-label" + (owners[i] ? " on-color" : ""));
      text.textContent = String(i+1);
      svg.appendChild(poly);
      svg.appendChild(text);
    }
  }
  els.board.appendChild(svg);
}
function neighbors(index){
  const r = Math.floor(index/5), c = index%5, out = [];
  const even = [[-1,0],[1,0],[0,-1],[-1,-1],[0,1],[-1,1]];
  const odd = [[-1,0],[1,0],[0,-1],[1,-1],[0,1],[1,1]];
  (c%2===0 ? even : odd).forEach(function(d){
    const nr=r+d[0], nc=c+d[1];
    if(nr>=0 && nr<5 && nc>=0 && nc<5) out.push(nr*5+nc);
  });
  return out;
}
function connected(team){
  const starts = [];
  if(team === "team1"){
    for(let r=0;r<5;r++){ const i=r*5; if(owners[i]===team) starts.push(i); }
  }else{
    for(let c=0;c<5;c++){ const i=c; if(owners[i]===team) starts.push(i); }
  }
  const queue = starts.slice(), seen = new Set(starts);
  while(queue.length){
    const i = queue.shift();
    const r=Math.floor(i/5), c=i%5;
    if(team==="team1" && c===4) return true;
    if(team==="team2" && r===4) return true;
    neighbors(i).forEach(function(n){
      if(!seen.has(n) && owners[n]===team){ seen.add(n); queue.push(n); }
    });
  }
  return false;
}
function availableQuestions(){
  const result = [];
  for(let i=0;i<currentGame.questions.length;i++){
    if(!retiredQuestions.has(i) && !usedQuestions.has(i)) result.push(i);
  }
  return result;
}
function drawQuestion(){
  const available = availableQuestions();
  if(!available.length){
    activeQuestionIndex = null;
    els.questionText.textContent = "Der Fragenpool ist aufgebraucht.";
    els.questionType.textContent = "Keine Frage";
    els.buzzStatus.textContent = "Es sind keine unbenutzten Fragen mehr vorhanden.";
    els.buzzTeam1.disabled = true;
    els.buzzTeam2.disabled = true;
    hide(els.moderatorActions);
    updatePoolDisplay();
    return;
  }
  activeQuestionIndex = available[Math.floor(Math.random()*available.length)];
  usedQuestions.add(activeQuestionIndex);
  const q = currentGame.questions[activeQuestionIndex];
  els.questionType.textContent = q.type || "Frage";
  els.questionText.textContent = q.question;
  els.answerText.textContent = q.answer;
  hide(els.answerBox);
  buzzingTeam = null;
  wrongTeams = new Set();
  updatePoolDisplay();
  updateBuzzerState();
}
function openField(index){
  if(owners[index]) return;
  activeField = index;
  els.fieldNumber.textContent = String(index+1);
  els.buzzTeam1Name.textContent = teams.team1.name;
  els.buzzTeam2Name.textContent = teams.team2.name;
  drawQuestion();
  els.questionDialog.showModal();
}
function updateBuzzerState(){
  hide(els.moderatorActions);
  if(buzzingTeam){
    els.buzzTeam1.disabled = true;
    els.buzzTeam2.disabled = true;
    els.buzzStatus.textContent = teams[buzzingTeam].name + " hat gebuzzert.";
    show(els.moderatorActions);
    return;
  }
  if(wrongTeams.size === 0){
    els.buzzTeam1.disabled = false;
    els.buzzTeam2.disabled = false;
    els.buzzStatus.textContent = "Beide Teams dürfen buzzern.";
  }else if(wrongTeams.size === 1){
    const wrong = Array.from(wrongTeams)[0];
    const other = wrong === "team1" ? "team2" : "team1";
    els.buzzTeam1.disabled = other !== "team1";
    els.buzzTeam2.disabled = other !== "team2";
    els.buzzStatus.textContent = teams[wrong].name + " war falsch. " + teams[other].name + " hat allein die zweite Chance.";
  }else{
    els.buzzTeam1.disabled = true;
    els.buzzTeam2.disabled = true;
    els.buzzStatus.textContent = "Beide Teams waren falsch. Neue Frage für dasselbe Feld.";
  }
}
function buzz(team){
  if(!els.questionDialog.open || buzzingTeam || wrongTeams.has(team)) return;
  if(team==="team1" && els.buzzTeam1.disabled) return;
  if(team==="team2" && els.buzzTeam2.disabled) return;
  buzzingTeam = team;
  updateBuzzerState();
}
function snapshot(){
  return {
    owners:owners.slice(),
    controlTeam:controlTeam
  };
}
function canStillWin(team){
  const opponent = team === "team1" ? "team2" : "team1";
  const starts = [];

  if(team === "team1"){
    for(let r=0;r<5;r++){
      const i = r*5;
      if(owners[i] !== opponent) starts.push(i);
    }
  }else{
    for(let col=0;col<5;col++){
      const i = col;
      if(owners[i] !== opponent) starts.push(i);
    }
  }

  const queue = starts.slice();
  const seen = new Set(starts);

  while(queue.length){
    const i = queue.shift();
    const r = Math.floor(i/5);
    const col = i%5;

    if(team === "team1" && col === 4) return true;
    if(team === "team2" && r === 4) return true;

    neighbors(i).forEach(function(n){
      if(!seen.has(n) && owners[n] !== opponent){
        seen.add(n);
        queue.push(n);
      }
    });
  }
  return false;
}
function boardIsBlocked(){
  return !canStillWin("team1") && !canStillWin("team2");
}
function showBlocked(){
  updatePoolDisplay();
  els.blockedDialog.showModal();
}
function markCorrect(){
  if(!buzzingTeam || activeField===null) return;
  history.push(snapshot());
  owners[activeField] = buzzingTeam;
  controlTeam = buzzingTeam;

  const winner = connected(buzzingTeam) ? buzzingTeam : null;
  const blocked = !winner && boardIsBlocked();

  closeQuestion();
  renderMatch();

  if(winner) showWinner(winner);
  else if(blocked) showBlocked();
}
function markWrong(){
  if(!buzzingTeam) return;
  wrongTeams.add(buzzingTeam);
  buzzingTeam = null;
  updateBuzzerState();
}
function newQuestion(){
  activeQuestionIndex = null;
  drawQuestion();
}
function closeQuestion(){
  if(els.questionDialog.open) els.questionDialog.close();
  activeField = null;
  activeQuestionIndex = null;
  buzzingTeam = null;
  wrongTeams = new Set();
  hide(els.answerBox);
  hide(els.moderatorActions);
}
function showWinner(team){
  els.winnerName.textContent = teams[team].name + " gewinnt!";
  els.winnerName.style.color = teams[team].color;
  els.winnerDialog.showModal();
}
function undo(){
  const state = history.pop();
  if(!state){ toast("Nichts zum Rückgängigmachen"); return; }
  owners = state.owners.slice();
  controlTeam = state.controlTeam;
  renderMatch();
  els.gameMenuDialog.close();
}
function restartMatch(){
  startNextRound();
}
function leaveMatch(){
  if(els.questionDialog.open) closeQuestion();
  if(els.gameMenuDialog.open) els.gameMenuDialog.close();
  if(els.winnerDialog.open) els.winnerDialog.close();
  if(els.blockedDialog.open) els.blockedDialog.close();
  hide(els.gameView);
  show(els.app);
  setView(els.dashboardView);
  renderDashboard();
}
function setStarter(mode){
  starterMode = mode;
  updateStarterButtons();
}
function updateStarterNames(){
  els.startTeam1.textContent = els.team1Input.value.trim() || "Team 1";
  els.startTeam2.textContent = els.team2Input.value.trim() || "Team 2";
}

async function initAuth(){
  const configured = CONFIG.supabaseUrl && CONFIG.supabaseAnonKey && window.supabase;
  if(!configured){
    show(els.loginSetupHint);
    return;
  }
  supabaseClient = window.supabase.createClient(CONFIG.supabaseUrl,CONFIG.supabaseAnonKey);

  if(currentPin){
    const ok = await verifyPin(currentPin);
    if(ok){
      try{
        await syncGamesFromSupabase();
        openApp();
        return;
      }catch(e){}
    }
    currentPin = "";
    sessionStorage.removeItem("blockbusters_pin");
  }
  showLogin();
}
async function verifyPin(pin){
  if(!supabaseClient) return false;
  const result = await supabaseClient.rpc("bb_check_pin",{p_pin:String(pin)});
  return !result.error && result.data === true;
}
function openApp(){
  hide(els.loginView);
  show(els.app);
  setView(els.dashboardView);
  renderDashboard();
}
function showLogin(){
  hide(els.app);
  show(els.loginView);
  els.loginPassword.value = "";
  setTimeout(function(){ els.loginPassword.focus(); },50);
}
async function login(event){
  event.preventDefault();
  els.loginError.textContent = "";
  if(!supabaseClient){
    els.loginError.textContent = "Supabase ist noch nicht erreichbar.";
    return;
  }
  const pin = els.loginPassword.value.trim();
  if(!pin){
    els.loginError.textContent = "Passwort eingeben.";
    return;
  }
  const button = els.loginForm.querySelector('button[type="submit"]');
  button.disabled = true;
  try{
    const ok = await verifyPin(pin);
    if(!ok){
      els.loginError.textContent = "Falsches Passwort.";
      return;
    }
    currentPin = pin;
    sessionStorage.setItem("blockbusters_pin",pin);
    await syncGamesFromSupabase();
    openApp();
  }catch(e){
    els.loginError.textContent = "Verbindung zu Supabase fehlgeschlagen. Wurde der SQL Code bereits ausgeführt?";
  }finally{
    button.disabled = false;
  }
}
function logout(){
  currentPin = "";
  sessionStorage.removeItem("blockbusters_pin");
  saveGames([]);
  showLogin();
}

els.loginForm.addEventListener("submit",login);
els.logoutBtn.addEventListener("click",logout);
els.homeBtn.addEventListener("click",function(){ setView(els.dashboardView); renderDashboard(); });
els.newGameBtn.addEventListener("click",function(){ openEditor(null); });
els.emptyNewBtn.addEventListener("click",function(){ openEditor(null); });
els.cancelEditBtn.addEventListener("click",function(){ setView(els.dashboardView); renderDashboard(); });
els.saveGameBtn.addEventListener("click",saveEditorGame);
els.copyPromptBtn.addEventListener("click",copyPrompt);
els.appendJsonBtn.addEventListener("click",appendJsonToEditor);
els.replaceJsonBtn.addEventListener("click",replaceJsonInEditor);
els.addQuestionBtn.addEventListener("click",addEditorQuestion);
els.splashView.addEventListener("click",showInstructions);
els.instructionsNextBtn.addEventListener("click",showTeamSetup);
els.startTeam1.addEventListener("click",function(){ setStarter("team1"); });
els.startTeam2.addEventListener("click",function(){ setStarter("team2"); });
els.startRandom.addEventListener("click",function(){ setStarter("random"); });
els.team1Input.addEventListener("input",updateStarterNames);
els.team2Input.addEventListener("input",updateStarterNames);
els.startMatchBtn.addEventListener("click",startMatch);
els.buzzTeam1.addEventListener("click",function(){ buzz("team1"); });
els.buzzTeam2.addEventListener("click",function(){ buzz("team2"); });
els.markCorrectBtn.addEventListener("click",markCorrect);
els.markWrongBtn.addEventListener("click",markWrong);
els.newQuestionBtn.addEventListener("click",newQuestion);
els.showAnswerBtn.addEventListener("click",function(){ show(els.answerBox); });
els.cancelQuestionBtn.addEventListener("click",closeQuestion);
els.questionDialog.addEventListener("cancel",function(e){ e.preventDefault(); closeQuestion(); });
els.gameMenuBtn.addEventListener("click",function(){ els.gameMenuDialog.showModal(); });
els.closeGameMenuBtn.addEventListener("click",function(){ els.gameMenuDialog.close(); });
els.undoBtn.addEventListener("click",undo);
els.restartBtn.addEventListener("click",restartMatch);
els.leaveMatchBtn.addEventListener("click",leaveMatch);
els.winnerRestartBtn.addEventListener("click",startNextRound);
els.winnerHomeBtn.addEventListener("click",leaveMatch);
els.blockedRestartBtn.addEventListener("click",startNextRound);
els.blockedHomeBtn.addEventListener("click",leaveMatch);

initAuth();
