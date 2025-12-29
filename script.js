(function () {

  function num(v) {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  }

  function runAudit() {
    // --- REQUIRED INPUT ---
    const statementEl = document.getElementById("statement");
    if (!statementEl || !statementEl.value.trim()) {
      alert("Decision statement is required.");
      return;
    }

    // --- USER INPUTS (ALL PERCEIVED, NOT FACTS) ---
    const unit = document.getElementById("unit").value || "units";
    const assumedLoss = num(document.getElementById("assumedLoss").value);
    const likelihood = num(document.getElementById("likelihood").value);
    const days = Math.max(1, num(document.getElementById("delayDays").value));
    const urgency = num(document.getElementById("urgency").value);

    // --- CORE NUMERIC STRUCTURE ---
    const worstPerDay = assumedLoss / days;
    const beliefPerDay = (assumedLoss * (likelihood / 100)) / days;

    // --- KEY VARIABLE: PERCEIVED EXPOSURE ---
    // combines daily loss + psychological pressure
    const perceivedExposureScore = beliefPerDay * (urgency / 10);

    // --- HUMAN INTERPRETATION (DYNAMIC) ---
    let interpretation = "";

    if (perceivedExposureScore < 50) {
      // 🟢 Low structural pressure
      interpretation = `
What this shows:

A potential loss exists, but very little is actually changing from day to day.

This means the pressure you feel is likely being driven more by the fear of loss
than by time actively working against you.

From a time perspective, you are not being forced into an immediate reaction.
      `;
    }
    else if (perceivedExposureScore < 300) {
      // 🟡 Moderate, mixed pressure
      interpretation = `
What this shows:

Time does have an effect on this situation, but it does not escalate sharply.

Delaying this decision carries a cost, but that cost accumulates gradually
rather than forcing an immediate response.

The pressure you feel is partly grounded in time, and partly amplified by perception.
      `;
    }
    else {
      // 🔴 High structural pressure
      interpretation = `
What this shows:

Each additional day creates a meaningful change in your exposure.

In this case, time is actively amplifying the potential loss,
which means the pressure you feel is not just emotional or imagined.

Delaying this decision has a real and increasing day-by-day cost.
      `;
    }

    // --- FINAL HUMAN-READABLE REPORT ---
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


