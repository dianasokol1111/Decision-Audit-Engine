(function () {
  function num(v) {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  }

  function runAudit() {
    const statement = document.getElementById("statement").value.trim();
    if (!statement) {
      alert("Decision statement is required.");
      return;
    }

    const unit = document.getElementById("unit").value || "units";
    const assumed = num(document.getElementById("assumedLoss").value);
    const likelihood = num(document.getElementById("likelihood").value);
    const days = Math.max(1, num(document.getElementById("delayDays").value));
    const urgency = num(document.getElementById("urgency").value);

    const worstPerDay = assumed / days;
    const beliefPerDay = (assumed * (likelihood / 100)) / days;

    let note = "";

    if (urgency >= 7 && beliefPerDay < worstPerDay * 0.5) {
      note = `
What this suggests:

Based on the numbers you entered, each additional day does not materially change your situation.

This means the urgency you feel is likely not driven by time itself,
but by interpretation, pressure, or fear of missing out.

You appear to have room to slow down and think,
without your position worsening significantly from day to day.
      `;
    } else {
      note = `
What this suggests:

Based on the numbers you entered, time is a meaningful factor here.

Each additional day has a noticeable impact on your exposure,
which means the sense of urgency is grounded in how the situation evolves over time.

Delaying this decision carries a real, measurable cost per day.
      `;
    }

    const report = `
Structural Snapshot

Daily worst-case change:
${worstPerDay.toFixed(2)} ${unit} per day

Daily change adjusted for likelihood:
${beliefPerDay.toFixed(2)} ${unit} per day

Declared urgency:
${urgency} / 10

${note.trim()}
    `;

    const out = document.getElementById("humanReport");
    out.style.display = "block";
    out.innerText = report;
  }

  document.addEventListener("DOMContentLoaded", function () {
    document
      .getElementById("runAuditBtn")
      .addEventListener("click", runAudit);
  });
})();


