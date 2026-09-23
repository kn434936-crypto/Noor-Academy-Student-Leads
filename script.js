// Replace this with your deployed Google Apps Script Web App URL ending in /exec.
const GOOGLE_SCRIPT_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";

const form = document.getElementById("leadForm");
const button = document.getElementById("submitBtn");
const modal = document.getElementById("successModal");
const closeModal = document.getElementById("closeModal");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (GOOGLE_SCRIPT_URL.includes("PASTE_YOUR")) {
    alert("Please add your Google Apps Script Web App URL in script.js first.");
    return;
  }

  button.textContent = "Submitting...";
  button.classList.add("loading");

  const data = new URLSearchParams();
  data.append("name", document.getElementById("name").value.trim());
  data.append("phone", document.getElementById("phone").value.trim());
  data.append("email", document.getElementById("email").value.trim());
  data.append("city", document.getElementById("city").value.trim());
  data.append("course", document.getElementById("course").value);
  data.append("message", document.getElementById("message").value.trim());
  data.append("source", "Noor Academy Landing Page");

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body: data
    });

    form.reset();
    modal.classList.add("show");
  } catch (error) {
    alert("Something went wrong. Please try again.");
  } finally {
    button.textContent = "Get Course Details";
    button.classList.remove("loading");
  }
});

closeModal.addEventListener("click", () => modal.classList.remove("show"));
modal.addEventListener("click", (event) => {
  if (event.target === modal) modal.classList.remove("show");
});
