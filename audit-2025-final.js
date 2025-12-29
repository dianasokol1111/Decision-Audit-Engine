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

    // --- STRUCTURAL CALCULATIONS ---
    const expectedDailyLoss = (potentialLoss * likelihood) / days;
    const dailyGain = potentialGain / days;

    const downsideDominates = expectedDailyLoss > dailyGain * 1.1;
    const upsideDominates = dailyGain > expectedDailyLoss * 1.1;
    const balanced = !downsideDominates && !upsideDominates;
    const highUrgency = urgency >= 8;

    // --- SCALE (context only) ---
    const scale = experienced + potentialLoss + potentialGain;

    let scaleNote = "";
    if (scale >= 500000) {
      scaleNote = `
At larger scales, pressure often comes from carrying unresolved exposure,
rather than from deterioration driven by time itself.
      `;
    }
    else if (scale < 10000) {
      scaleNote = `
The financial magnitude of this situation is limited.
Absolute impact remains contained.
      `;
    }

    // --- SNAPSHOT (facts vs projections made explicit) ---
    const snapshot = `
Experienced cost to date (fact):
${experienced.toFixed(2)} ${unit}

Hypothetical daily downside (expected):
${expectedDailyLoss.toFixed(2)} ${unit} per day

Hypothetical daily upside:
${dailyGain.toFixed(2)} ${unit} per day

Declared urgency:
${urgency} / 10
    `.trim();

    // --- DECISION NOTE (GROUNDed, NON-DISTORTING) ---
    let note = `
This situation includes a realised cost and projected outcomes.
Projected downside and projected upside remain hypothetical.

The relevant question is whether time itself changes
the exposure you are carrying.
    `;

    if (downsideDominates) {
      note += `
Each additional day increases downside exposure in a measurable way.
In this case, time is structurally worsening the position.
      `;
    }
    else if (upsideDominates) {
      note += `
Time does not materially worsen the exposure profile of this decision.
Delay, by itself, does not increase risk.
      `;
    }
    else if (balanced) {
      note += `
Exposure remains broadly stable over time.
Delay neither meaningfully worsens nor improves the position.
      `;
    }

    if (highUrgency && !downsideDominates) {
      note += `
Declared urgency is high relative to how exposure evolves.
This suggests that part of the pressure may arise from context,
rather than from time-driven deterioration.
      `;
    }

    note += scaleNote;

    note += `
This audit does not indicate a need to act
for time-based reasons alone.
    `;

    // --- RENDER ---
    document.getElementById("snapshot").textContent = snapshot;
    document.getElementById("decisionNote").textContent = note.trim();
    document.getElementById("output").style.display = "block";
  }

  document
    .getElementById("runAuditBtn")
    .addEventListener("click", runAudit);

})();
