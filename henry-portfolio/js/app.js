/*
  PORTFÓLIO HENRY GABRIEL
  Configuração de e-mail: veja README.md.
*/
const STORAGE_KEY = "henryPortfolioMessages";
const ADMIN_PASSWORD = "henry-admin"; // Senha de demonstração; altere antes de apresentar.
const EMAILJS_PUBLIC_KEY = "SUA_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "SEU_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "SEU_TEMPLATE_ID";
// Destinatário das mensagens do formulário.
const NOTIFICATION_EMAIL = "hgsoliveira27@gmail.com";

const $ = (selector) => document.querySelector(selector);
const makeSeedMessages = () => Array.from({length:20}, (_,i) => ({
  id: `demo-${Date.now()}-${i+1}`,
  name: `Visitante de teste ${i+1}`,
  email: `visitante${i+1}@exemplo.com`,
  message: `Esta é a mensagem de teste número ${i+1}.`,
  date: new Date(Date.now() - i * 3600000).toISOString(),
  demo: true
}));

function getMessages(){
  try { const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); return Array.isArray(data) ? data : []; }
  catch { return []; }
}
function saveMessages(messages){ localStorage.setItem(STORAGE_KEY, JSON.stringify(messages)); }
function initializeStorage(){
  if(localStorage.getItem(STORAGE_KEY) === null) saveMessages(makeSeedMessages());
}
function escapeHTML(value){
  return String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
function formatDate(value){
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Data não disponível" : date.toLocaleString("pt-BR");
}

initializeStorage();
$("#year").textContent = new Date().getFullYear();

$("#contactForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const entry = {
    id: (crypto.randomUUID ? crypto.randomUUID() : String(Date.now())),
    name: String(data.get("name")).trim(),
    email: String(data.get("email")).trim(),
    message: String(data.get("message")).trim(),
    date: new Date().toISOString(),
    demo: false
  };
  if(!entry.name || !entry.email || !entry.message) return;
  const messages = getMessages();
  messages.unshift(entry);
  saveMessages(messages);
  $("#formStatus").textContent = "Mensagem salva neste navegador.";
  $("#sendButton").disabled = true;

  const emailConfigured = ![EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID].some(v => v.startsWith("SUA_") || v.startsWith("SEU_"));
  if(emailConfigured && window.emailjs){
    try{
      emailjs.init({publicKey: EMAILJS_PUBLIC_KEY});
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: entry.name,
        reply_to: entry.email,
        message: entry.message,
        to_email: NOTIFICATION_EMAIL
      });
      $("#formStatus").textContent = "Mensagem salva e notificação enviada por e-mail!";
    }catch(error){
      console.error("Falha no envio EmailJS:", error);
      $("#formStatus").textContent = "Mensagem salva, mas o envio de e-mail falhou. Verifique a configuração do EmailJS.";
    }
  }else{
    $("#formStatus").textContent = "Mensagem salva neste navegador. Configure o EmailJS seguindo o README para ativar o envio real.";
  }
  form.reset();
  $("#sendButton").disabled = false;
});

function openAdmin(){
  $("#adminModal").classList.add("open");
  $("#adminModal").setAttribute("aria-hidden","false");
  $("#adminLogin").hidden = false;
  $("#adminContent").hidden = true;
  $("#adminPassword").value = "";
  $("#loginError").textContent = "";
}
function closeAdmin(){
  $("#adminModal").classList.remove("open");
  $("#adminModal").setAttribute("aria-hidden","true");
}
document.addEventListener("keydown", event => {
  if(event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "a"){
    event.preventDefault(); openAdmin();
  }
  if(event.key === "Escape") closeAdmin();
});
$("#closeAdmin").addEventListener("click", closeAdmin);
$("#adminModal").addEventListener("click", event => { if(event.target.id === "adminModal") closeAdmin(); });
$("#loginButton").addEventListener("click", () => {
  if($("#adminPassword").value === ADMIN_PASSWORD){
    $("#adminLogin").hidden = true;
    $("#adminContent").hidden = false;
    renderMessages();
  }else $("#loginError").textContent = "Senha incorreta.";
});
$("#adminPassword").addEventListener("keydown", event => { if(event.key === "Enter") $("#loginButton").click(); });

function renderMessages(){
  const messages = getMessages();
  $("#messageCount").textContent = messages.length;
  const list = $("#messageList");
  if(!messages.length){ list.innerHTML = '<p class="muted">Nenhuma mensagem cadastrada.</p>'; return; }
  list.innerHTML = messages.map(msg => `
    <article class="message-item">
      <div class="d-flex flex-wrap justify-content-between gap-2">
        <strong>${escapeHTML(msg.name)}</strong>
        <span class="small muted">${escapeHTML(formatDate(msg.date))}${msg.demo ? " • TESTE" : ""}</span>
      </div>
      <a class="small text-link" href="mailto:${encodeURIComponent(msg.email)}">${escapeHTML(msg.email)}</a>
      <p>${escapeHTML(msg.message)}</p>
      <div class="message-actions">
        <button class="btn btn-sm btn-outline-info" data-action="edit" data-id="${escapeHTML(msg.id)}">Editar</button>
        <button class="btn btn-sm btn-outline-danger" data-action="delete" data-id="${escapeHTML(msg.id)}">Excluir</button>
      </div>
    </article>`).join("");
}
$("#messageList").addEventListener("click", event => {
  const button = event.target.closest("button[data-action]");
  if(!button) return;
  const id = button.dataset.id;
  const messages = getMessages();
  const index = messages.findIndex(m => m.id === id);
  if(index < 0) return;
  if(button.dataset.action === "delete"){
    if(confirm("Deseja excluir esta mensagem?")){ messages.splice(index,1); saveMessages(messages); renderMessages(); }
  }else if(button.dataset.action === "edit"){
    const current = messages[index];
    const name = prompt("Nome:", current.name);
    if(name === null) return;
    const email = prompt("E-mail:", current.email);
    if(email === null) return;
    const message = prompt("Mensagem:", current.message);
    if(message === null) return;
    messages[index] = {...current, name:name.trim(), email:email.trim(), message:message.trim()};
    saveMessages(messages); renderMessages();
  }
});
$("#resetSeed").addEventListener("click", () => {
  if(confirm("Isso substituirá todas as mensagens pelos 20 registros de teste. Continuar?")){
    saveMessages(makeSeedMessages()); renderMessages();
  }
});
