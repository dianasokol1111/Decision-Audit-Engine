<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Decision Audit Engine™ — Premium</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <style>
    body {
      font-family: Inter, system-ui, sans-serif;
      background: #0e0e11;
      color: #f5f5f7;
      max-width: 900px;
      margin: auto;
      padding: 40px 20px;
    }

    h1 {
      font-size: 28px;
      font-weight: 600;
      margin-bottom: 10px;
    }

    h2 {
      font-size: 18px;
      margin-top: 40px;
      opacity: 0.9;
    }

    p {
      opacity: 0.8;
      line-height: 1.6;
    }

    label {
      display: block;
      margin-top: 20px;
      font-size: 14px;
      opacity: 0.85;
    }

    input, textarea, select {
      width: 100%;
      margin-top: 6px;
      padding: 10px;
      background: #1a1a1f;
      color: #fff;
      border: 1px solid #2a2a33;
      border-radius: 6px;
      font-size: 14px;
    }

    textarea {
      min-height: 90px;
    }

    button {
      margin-top: 40px;
      padding: 14px 24px;
      font-size: 15px;
      background: #ffffff;
      color: #000;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }

    button:hover {
      opacity: 0.9;
    }

    pre {
      background: #141418;
      padding: 20px;
      margin-top: 30px;
      border-radius: 10px;
      overflow-x: auto;
      font-size: 13px;
      line-height: 1.5;
    }

    .disclaimer {
      margin-top: 50px;
      font-size: 12px;
      opacity: 0.6;
      border-top: 1px solid #2a2a33;
      padding-top: 20px;
    }
  </style>
</head>

<body>

  <h1>Decision Audit Engine™</h1>
  <p>
    This system does not help you decide.<br>
    It verifies whether urgency is structurally real.
  </p>

  <h2>Decision Object</h2>

  <label>Decision statement (one sentence)</label>
  <input id="statement" placeholder="e.g. I will delay signing the agreement until March 31." />

  <label>Context (optional, factual)</label>
  <textarea id="context" placeholder="Brief situational context. No interpretation."></textarea>

  <label>Measurement unit</label>
  <input id="unit" placeholder="e.g. EUR, USD, units, hours" />

  <h2>Loss Profile</h2>

  <label>Confirmed real loss (amount)</label>
  <input type="number" id="realLoss" />

  <label>Assumed potential loss (scenario magnitude)</label>
  <input type="number" id="assumedLoss" />

  <label>Estimated likelihood of assumed loss (%)</label>
  <input type="number" id="likelihood" min="0" max="100" />

  <label>Symbolic / identity-related loss (description only)</label>
  <textarea id="symbolicLoss"
    placeholder="e.g. Being seen as indecisive, failing an internal standard, identity pressure."></textarea>

  <h2>Time Exposure</h2>

  <label>Delay or exposure period (days)</label>
  <input type="number" id="delayDays" />

  <h2>Pressure Signals</h2>

  <label>Declared urgency level (1–10)</label>
  <input type="number" id="urgency" min="1" max="10" />

  <label>Perceived source of pressure (optional)</label>
  <textarea id="pressureSource"
    placeholder="e.g. external deadline, social expectation, fear of missing out."></textarea>

  <h2>Identity Narrative (unweighted)</h2>

  <label>Internal narrative currently present</label>
  <textarea id="identityNarrative"
    placeholder="Recorded for visibility only. This does not influence calculations."></textarea>

  <button onclick="runAudit()">Run Structural Audit</button>

  <pre id="output"></pre>

  <div class="disclaimer">
    <p>This system does not predict outcomes.</p>
    <p>This system does not provide recommendations.</p>
    <p>Responsibility remains entirely with the decision-holder.</p>
  </div>

<script>
function runAudit() {

  const decision = {
    id: crypto.randomUUID(),
    statement: document.getElementById("statement").value,
    context: document.getElementById("context").value,
    created_at: new Date().toISOString(),
    unit: document.getElementById("unit").value || "units"
  };

  const realLoss = Number(document.getElementById("realLoss").value);
  const assumedLoss = Number(document.getElementById("assumedLoss").value);
  const likelihood = Number(document.getElementById("likelihood").value);
  const delayInput = Number(document.getElementById("delayDays").value);
  const days = Math.max(1, delayInput);

  const urgency = Number(document.getElementById("urgency").value);

  let urgencyBand = "LOW";
  if (urgency >= 7) urgencyBand = "HIGH";
  else if (urgency >= 4) urgencyBand = "MODERATE";

  const potentialPerDay = assumedLoss / days;
  const beliefAdjustedRiskPerDay = (assumedLoss * (likelihood / 100)) / days;

  let alignment = "INCONCLUSIVE";

  if (urgencyBand === "HIGH" && beliefAdjustedRiskPerDay < potentialPerDay * 0.5) {
    alignment = "DISPROPORTIONATE";
  } else if (urgencyBand === "HIGH" && beliefAdjustedRiskPerDay >= potentialPerDay * 0.5) {
    alignment = "ALIGNED";
  }

  const audit = {
    decision,
    loss_profile: {
      real: { amount: realLoss },
      assumed: { amount: assumedLoss, likelihood_percent: likelihood },
      symbolic: { description: document.getElementById("symbolicLoss").value }
    },
    time_exposure: {
      delay_days: days,
      potential_per_day: potentialPerDay,
      belief_adjusted_risk_per_day: beliefAdjustedRiskPerDay
    },
    pressure_signals: {
      declared_urgency_level: urgency,
      urgency_band: urgencyBand,
      source_note: document.getElementById("pressureSource").value
    },
    identity_layer: {
      narrative: document.getElementById("identityNarrative").value,
      weighted: false
    },
    engine_output: {
      structural_alignment: alignment,
      interpretation:
        alignment === "DISPROPORTIONATE"
          ? "Declared urgency exceeds time-distributed exposure, indicating possible narrative amplification."
          : alignment === "ALIGNED"
          ? "Declared urgency aligns with belief-adjusted time-distributed exposure."
          : "No dominant signal outweighs others at this stage."
    }
  };

  document.getElementById("output").textContent =
    JSON.stringify(audit, null, 2);
}
</script>

</body>
</html>

