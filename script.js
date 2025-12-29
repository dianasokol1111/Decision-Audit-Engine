(function () {
  function num(v) {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  }

  function runAudit() {
    // --- REQUIRED INPUT ---
    const statement = document.getElementById("statement").value.trim();
    if (!statement) {
      alert("Decision statement is required.");
      return;
    }

    // --- INPUTS ---
    const unit = document.getElementById("unit").value || "units";
    const assumed = num(document.getElementById("assumedLoss").value);
    const likelihood = num(document.getElementById("likelihood").value);
    const days = Math.max(1, num(document.getElementById("delayDays").value));
    const urgency = num(document.getElementById("urgency").value);

    // --- CORE CALCULATIONS ---
    const worstPerDay = assumed / days;
    const beliefPerDay = (assumed * (likelihood / 100)) / days;

    // How much of the total scenario changes per day (ratio)
    const dailyImpactRatio = assumed > 0 ? beliefPerDay / assumed : 0;

    // --- HUMAN INTERPRETATION ---
    let interpretation = "";

    // 🟢 Scenario 1: Time barely matters
    if (dailyImpactRatio < 0.01) {
      interpretation = `
What this suggests:

Based on the numbers you entered, delaying this decision does not meaningfully change your situation from day to day.

This means the pressure you may be feeling is unlikely to come from time itself.
You appear to have space to slow down and think, without your position worsening each day.
      `;
    }

    // 🟡 Scenario 2: Time matters, but gradually
    else if (dailyImpactRatio < 0.05) {
      interpretation = `
What this suggests:

Time does have an effect here, but it builds up gradually rather than urgently.

Delaying this decision has a cost, but that cost accumulates over time,
rather than sharply increasing from one day to the next.
      `;
    }

    // 🔴 Scenario 3: Time clearly worsens the situation
    else {
      interpretation = `
What this suggests:

Time is a meaningful factor in this decision.

Each additional day creates a noticeable change in your exposure,
which means delaying this decision carries a real and increasing cost.
      `;
    }

    // --- FINAL REPORT (HUMAN-READABLE) ---
    const report = `
Structural Snapshot

Daily worst-case change:
${worstPerDay.toFixed(2)} ${unit} per day

Daily change adjusted for likelihood:
${beliefPerDay.toFixed(2)} ${unit} per day

Declared urgency:
${urgency} / 10

${interpretation.trim()}
    `;

    // --- OUTPUT ---
    const out = document.getElementById("humanReport");
    out.style.display = "block";
    out.innerText = report;
  }

  // --- SAFE EVENT BINDING ---
  document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("runAuditBtn");
    if (btn) {
      btn.addEventListener("click", runAudit);
    } else {
      console.error("Run Structural Audit button not found.");
    }
  });
})();


