document.addEventListener("DOMContentLoaded", async () => {
  const adminBox = document.getElementById("admin-period-settings");
  const startInput = document.getElementById("start-date");
  const endInput = document.getElementById("end-date");
  const saveBtn = document.getElementById("save-period");
  const status = document.getElementById("period-status");

  // Έλεγχος αν είναι admin
  const res = await fetch("php/status.php");
  const user = await res.json();

  if (user.loggedIn && user.role === "admin") {
    adminBox.style.display = "block";

    // Φόρτωσε υπάρχουσες ημερομηνίες
    const periodRes = await fetch("php/get_application_period.php");
    const period = await periodRes.json();

    if (period.start_date) startInput.value = period.start_date;
    if (period.end_date) endInput.value = period.end_date;

    // Αποθήκευση νέων ημερομηνιών
    saveBtn.addEventListener("click", async () => {
      const start = startInput.value === "" ? null : startInput.value;
      const end = endInput.value === "" ? null : endInput.value;

      const saveRes = await fetch("php/set_application_period.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ start_date: start, end_date: end }),
      });

      const data = await saveRes.json();
      if (data.success) {
        status.textContent = "Application period saved!";
        status.style.color = "green";
        status.style.fontWeight = "bold";
      } else {
        status.textContent = "An error occured.";
        status.style.color = "#dc143c";
        status.style.fontWeight = "bold";
      }
    });
  }
});