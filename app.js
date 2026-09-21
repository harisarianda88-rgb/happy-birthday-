
const INVITE_CODE = "HBD26";
const accessGate = document.getElementById("accessGate");
const birthdayContent = document.getElementById("birthdayContent");
const inviteCode = document.getElementById("inviteCode");
const unlockBtn = document.getElementById("unlockBtn");
const gateStatus = document.getElementById("gateStatus");

function unlockBirthday() {
  if ((inviteCode.value || "").trim().toUpperCase() === INVITE_CODE) {
    sessionStorage.setItem("birthday_invite_ok", "1");
    accessGate.hidden = true;
    birthdayContent.hidden = false;
  } else {
    gateStatus.textContent = "Kode undangan salah.";
  }
}

unlockBtn.addEventListener("click", unlockBirthday);
inviteCode.addEventListener("keydown", e => {
  if (e.key === "Enter") unlockBirthday();
});

if (sessionStorage.getItem("birthday_invite_ok") === "1") {
  accessGate.hidden = true;
  birthdayContent.hidden = false;
}

const form = document.getElementById("wishForm");
const statusEl = document.getElementById("status");
const sendBtn = document.getElementById("sendBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  statusEl.textContent = "";
  sendBtn.disabled = true;
  sendBtn.textContent = "Mengirim...";

  const name = document.getElementById("name").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !message) {
    statusEl.textContent = "Nama dan ucapan harus diisi.";
    sendBtn.disabled = false;
    sendBtn.textContent = "Kirim Ucapan ✨";
    return;
  }

  const { error } = await supabaseClient
    .from("birthday_wishes")
    .insert({ name, message });

  if (error) {
    console.error(error);
    statusEl.textContent = "Ucapan belum terkirim. Periksa konfigurasi website.";
  } else {
    form.reset();
    statusEl.textContent = "🎉 Ucapan berhasil dikirim. Terima kasih!";
  }

  sendBtn.disabled = false;
  sendBtn.textContent = "Kirim Ucapan ✨";
});
