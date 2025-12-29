(function () {
  function num(v) {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  }

  function runAudit() {
    const statementEl = document.getElementById("statement");
    if (!statementEl || !statementEl.value.trim()) {
      alert("Decision statement is required.");
      return;
    }

    const unit = document.getElementById("unit")?.value || "units";
    const assumed = num(document.getElementById("assumedLoss")?.value);
    const likelihood = num(document.getElementById("likelihood")?.value);
    const days = Math.max(1, num(document.getElementById("delayDays")?.value));
    const urgency = num(document.getElementById("urgency")?.value);

    const perDay = assumed / days;
    const beliefPerDay = (assumed * (likelihood / 100)) / days;

    let status = "INCONCLUSIVE";
    if (urgency >= 7 && beliefPerDay < perDay * 0.5) {
      status = "DISPROPORTIONATE";
    } else if (urgency >= 7) {
      status = "ALIGNED";
    }

    const report = `
Structural Snapshot

Urgency: ${urgency} / 10
Time horizon: ${days} days
Worst-case exposure: ${perDay.toFixed(2)} ${unit} / day
Belief-adjusted exposure: ${beliefPerDay.toFixed(2)} ${unit} / day

Result: ${status}
    `.trim();

    const out = document.getElementById("humanReport");
    if (!out) {
      alert("Internal error: output container missing.");
      return;
    }

    out.style.display = "block";
    out.innerText = report;
  }

  document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("runAuditBtn");
    if (btn) {
      btn.addEventListener("click", runAudit);
    } else {
      console.error("Run Audit button not found");
    }
  });

  // expose globally just in case
  window.runAudit = runAudit;
})();


