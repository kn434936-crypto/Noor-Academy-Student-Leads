// Noor Academy Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbziq0NT0Kp_bDtUFTAb52FNTcm460uz3uUhFJrEnXabGFvB7RReTObbBVH1Qve-42c/exec";

const form = document.getElementById("leadForm");
const button = document.getElementById("submitBtn");
const modal = document.getElementById("successModal");
const closeModal = document.getElementById("closeModal");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  button.textContent = "Submitting...";
  button.classList.add("loading");
  button.disabled = true;

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
    console.error("Form submission error:", error);

    alert("Something went wrong. Please try again.");
  } finally {
    button.textContent = "Submit";
    button.classList.remove("loading");
    button.disabled = false;
  }
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("show");
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.remove("show");
  }
});
