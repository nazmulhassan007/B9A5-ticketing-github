
  const seatGrid = document.getElementById("seatGrid");
  const seatSummary = document.getElementById("seatSummary");
  const nextBtn = document.getElementById("nextBtn");
  const seatCountBadge = document.getElementById("seatCountBadge");
  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const emailInput = document.getElementById("email");

  const seatPrice = 550;
  const selectedSeats = [];

  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const cols = [1, 2, 3, 4];

  // Generate Seat Buttons
  rows.forEach(row => {
    cols.forEach(col => {
      const seatNum = row + col;
      const btn = document.createElement("button");
      btn.textContent = seatNum;
      btn.className = "seat";
      btn.onclick = () => toggleSeat(btn, seatNum);
      seatGrid.appendChild(btn);
    });
  });

  function toggleSeat(btn, seatNum) {
    if (btn.classList.contains("selected")) {
      btn.classList.remove("selected");
      const index = selectedSeats.indexOf(seatNum);
      if (index > -1) selectedSeats.splice(index, 1);
    } else {
      btn.classList.add("selected");
      selectedSeats.push(seatNum);
    }

    updateSummary();
    updateNextButton();
  }

  function updateSummary() {
    seatCountBadge.textContent = selectedSeats.length;

    let html = "";

    selectedSeats.forEach(seat => {
      html += `<div class="summary-line"><div>${seat}</div><div>Economoy</div><div>${seatPrice}</div></div>`;
    });

    const total = selectedSeats.length * seatPrice;

    html += `<hr>`;
    html += `<div class="summary-line"><strong>Total Price</strong><strong>BDT ${total}</strong></div>`;
    html += `
      <div class="summary-line">
        <input type="text" class="coupon-section" placeholder="Have any coupon?">
        <button class="apply-btn">Apply</button>
      </div>
    `;
    html += `<div class="summary-line"><strong>Grand Total</strong><strong>BDT ${total}</strong></div>`;

    seatSummary.innerHTML = html;
  }

  function updateNextButton() {
    if (selectedSeats.length > 0 && nameInput.value.trim() && phoneInput.value.trim()) {
      nextBtn.classList.add("active");
      nextBtn.disabled = false;
      nextBtn.style.cursor = "pointer";
    } else {
      nextBtn.classList.remove("active");
      nextBtn.disabled = true;
      nextBtn.style.cursor = "not-allowed";
    }
  }

  nameInput.addEventListener("input", updateNextButton);
  phoneInput.addEventListener("input", updateNextButton);
  emailInput.addEventListener("input", updateNextButton);