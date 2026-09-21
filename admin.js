const loginBox = document.getElementById("loginBox");
const messagesBox = document.getElementById("messagesBox");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const loginStatus = document.getElementById("loginStatus");
const messagesEl = document.getElementById("messages");
const countEl = document.getElementById("count");

loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    loginStatus.textContent = "Email dan password harus diisi.";
    return;
  }

  loginBtn.disabled = true;
  loginStatus.textContent = "Memeriksa...";
  const { error } = await supabaseClient.auth.signInWithPassword({ email, password });

  if (error) {
    loginStatus.textContent = "Login gagal. Periksa email dan password.";
    loginBtn.disabled = false;
    return;
  }

  loginStatus.textContent = "";
  loginBox.hidden = true;
  messagesBox.hidden = false;
  loginBtn.disabled = false;
  await loadMessages();
});

logoutBtn.addEventListener("click", async () => {
  await supabaseClient.auth.signOut();
  messagesBox.hidden = true;
  loginBox.hidden = false;
  document.getElementById("password").value = "";
});

async function loadMessages() {
  messagesEl.innerHTML = "<p class='small'>Memuat...</p>";

  const { data, error } = await supabaseClient
    .from("birthday_wishes")
    .select("id,name,message,created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    messagesEl.innerHTML = "<p class='status'>Gagal mengambil ucapan. Pastikan RLS admin sudah diatur.</p>";
    return;
  }

  countEl.textContent = `${data.length} ucapan masuk.`;
  if (!data.length) {
    messagesEl.innerHTML = "<p class='small'>Belum ada ucapan.</p>";
    return;
  }

  messagesEl.innerHTML = data.map(item => {
    const date = new Date(item.created_at).toLocaleString("id-ID", {
      dateStyle: "medium", timeStyle: "short"
    });
    return `<article class="message-card">
      <div class="message-head">
        <strong>👤 ${escapeHtml(item.name)}</strong>
        <span>${date}</span>
      </div>
      <p>${escapeHtml(item.message)}</p>
    </article>`;
  }).join("");
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, c => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
  }[c]));
}
