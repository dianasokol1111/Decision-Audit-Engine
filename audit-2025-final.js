console.log("Decision Audit Engine – JS FINAL LOADED");

(function () {

  const num = v => Number.isFinite(+v) ? +v : 0;

  function runAudit() {

    const statement = document.getElementById("statement").value.trim();
    if (!statement) {
      alert("Decision statement is required.");
      return;
    }

    const unit = document.getElementById("unit").value;
    const experienced = num(document.getElementById("experiencedLoss").value);
    const potentialLoss = num(document.getElementById("potentialLoss").value);
    const potentialGain = num(document.getElementById("potentialGain").value);
    const likelihood = num(document.getElementById("likelihood").value) / 100;
    const days = Math.max(1, num(document.getElementById("days").value));
    const urgency = num(document.getElementById("urgency").value);

    const expectedDailyLoss = (potentialLoss * likelihood) / days;
    const dailyGain = potentialGain / days;

    const hasExperiencedLoss = experienced > 0;
    const downsideDominates = expectedDailyLoss > dailyGain * 1.1;
    const upsideDominates = dailyGain > expectedDailyLoss * 1.1;
    const balanced = !downsideDominates && !upsideDominates;
    const highUrgency = urgency >= 8;

    const snapshot = `
Experienced loss (fact):
${experienced.toFixed(2)} ${unit}

Expected daily downside:
${expectedDailyLoss.toFixed(2)} ${unit} per day

Potential daily upside:
${dailyGain.toFixed(2)} ${unit} per day

Declared urgency:
${urgency} / 10
    `.trim();

    let note = "";

    if (hasExperiencedLoss) {
      note += `
A significant financial loss has already occurred.
This does not change the economics of the current decision,
but it materially affects the conditions under which it is being made.
      `;
    }

    if (downsideDominates) {
      note += `
At present, downside exposure increases faster than potential upside.
Each additional day shifts the balance further against you.
Time is structurally working on the risk side of this situation.
      `;
    } else if (upsideDominates) {
      note += `
Potential upside compensates expected downside on a daily basis.
Time is not enforcing a deterioration of this decision.
      `;
    } else if (balanced) {
      note += `
Downside and upside remain closely balanced over time.
The situation does not structurally deteriorate with delay.
      `;
    }

    if (highUrgency && !downsideDominates) {
      note += `
Declared urgency is high relative to how the situation evolves over time.
This suggests that part of the pressure may not be structurally enforced by time.
      `;
    }

    note += `
In situations like this, decision quality is often improved
by reducing exposure or irreversibility before committing to direction.
    `;

    document.getElementById("snapshot").textContent = snapshot;
    document.getElementById("decisionNote").textContent = note.trim();
    document.getElementById("output").style.display = "block";
  }

  document
    .getElementById("runAuditBtn")
    .addEventListener("click", runAudit);

})();
