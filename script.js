/* =========================================================
   Decision Audit Engine™ — Executive / Premium
   Identity-Neutral · Non-Prescriptive · Time-Distributed
   ========================================================= */

/* ---------- Utilities ---------- */

function generateAuditId() {
  return (
    window.crypto?.randomUUID?.() ||
    "audit-" + Date.now() + "-" + Math.random().toString(36).slice(2)
  );
}

function safeNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

/* ---------- Core Engine ---------- */

function runAudit() {
  const output = document.getElementById("output");

  /* --- Required decision object --- */
  const statement = document.getElementById("statement").value.trim();
  if (!statement) {
    alert("Decision statement is required.");
    return;
  }

  const decision = {
    id: generateAuditId(),
    statement: statement,
    context: document.getElementById("context").value || "",
    created_at: new Date().toISOString(),
    unit: document.getElementById("unit").value || "units"
  };

  /* --- Loss profile --- */
  const realLoss = safeNumber(
    document.getElementById("realLoss").value
  );
  const assumedLoss = safeNumber(
    document.getElementById("assumedLoss").value
  );
  const likelihood = safeNumber(
    document.getElementById("likelihood").value
  );

  /* --- Time exposure --- */
  const delayDaysInput = safeNumber(
    document.getElementById("delayDays").value
  );
  const delayDays = Math.max(1, delayDaysInput);

  const potentialPerDay = assumedLoss / delayDays;
  const beliefAdjustedRiskPerDay =
    (assumedLoss * (likelihood / 100)) / delayDays;

  /* --- Pressure signals --- */
  const urgency = safeNumber(
    document.getElementById("urgency").value
  );

  let urgencyBand = "LOW";
  if (urgency >= 7) urgencyBand = "HIGH";
  else if (urgency >= 4) urgencyBand = "MODERATE";

  /* --- Structural alignment (NOT a decision) --- */
  let alignmentStatus = "INCONCLUSIVE";

  if (
    urgencyBand === "HIGH" &&
    beliefAdjustedRiskPerDay < potentialPerDay * 0.5
  ) {
    alignmentStatus = "DISPROPORTIONATE";
  } else if (
    urgencyBand === "HIGH" &&
    beliefAdjustedRiskPerDay >= potentialPerDay * 0.5
  ) {
    alignmentStatus = "ALIGNED";
  }

  /* --- Assemble audit object --- */
  const audit = {
    decision: decision,

    loss_profile: {
      real: {
        amount: realLoss
      },
      assumed: {
        amount: assumedLoss,
        likelihood_percent: likelihood
      },
      symbolic: {
        description:
          document.getElementById("symbolicLoss").value || ""
      }
    },

    time_exposure: {
      delay_days: delayDays,
      potential_per_day: potentialPerDay,
      belief_adjusted_risk_per_day: beliefAdjustedRiskPerDay
    },

    pressure_signals: {
      declared_urgency_level: urgency,
      urgency_band: urgencyBand,
      source_note:
        document.getElementById("pressureSource").value || ""
    },

    identity_layer: {
      narrative:
        document.getElementById("identityNarrative").value || "",
      weighted: false
    },

    engine_output: {
      structural_alignment: {
        status: alignmentStatus,
        note:
          "This is a structural signal, not a decision or recommendation."
      },
      interpretation:
        alignmentStatus === "DISPROPORTIONATE"
          ? "Declared urgency exceeds time-distributed exposure. Narrative amplification is possible."
          : alignmentStatus === "ALIGNED"
          ? "Declared urgency aligns with belief-adjusted time-distributed exposure."
          : "No dominant structural signal outweighs others at this stage."
    },

    disclaimers: {
      prediction: "This system does not predict outcomes.",
      recommendation: "This system does not provide recommendations.",
      responsibility: "Responsibility remains entirely with the decision-holder."
    }
  };

  /* --- Persist history (executive-grade) --- */
  const history =
    JSON.parse(localStorage.getItem("decision_audit_history") || "[]");

  history.push(audit);

  localStorage.setItem(
    "decision_audit_history",
    JSON.stringify(history)
  );

  /* --- Output --- */
  output.textContent = JSON.stringify(audit, null, 2);

  console.log(
    "Decision Audit executed — no recommendation, no decision output."
  );
}


