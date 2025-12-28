function runAudit() {
  const real = Number(document.getElementById("realLoss").value);
  const potential = Number(document.getElementById("potentialLoss").value);
  const probability = Number(document.getElementById("probability").value) / 100;
  const pressureScore = Number(document.getElementById("pressure").value); // 1–10
  const gain = Number(document.getElementById("gain").value);
  const unit = document.getElementById("unit").value || "units";

  // Core calculations
  const expectedLoss = potential * probability;
  const totalFactualExposure = real + expectedLoss;
  const netBalance = gain - totalFactualExposure;

  // Pressure as weighting factor (not cost)
  const pressureWeight = pressureScore / 10;
  const pressureIndex =
    totalFactualExposure === 0
      ? 0
      : pressureWeight / (1 + pressureWeight);

  // Interpretation logic (human, not machine)
  let conclusion = "";

  if (pressureScore >= 7 && totalFactualExposure >= gain * 0.5) {
    conclusion =
      "Your current sense of urgency is high and proportionate to the scale of factual exposure. " +
      "Material loss is already present, and the pressure you feel reflects real downside risk.";
  } else if (pressureScore >= 7 && totalFactualExposure < gain * 0.5) {
    conclusion =
      "Your sense of urgency is high, but factual exposure is limited relative to the expected upside. " +
      "Current pressure appears to exceed what is enforced by measurable loss.";
  } else if (pressureScore < 7 && totalFactualExposure >= gain * 0.5) {
    conclusion =
      "Factual exposure is material, but perceived urgency remains moderate. " +
      "There may be a lag between objective risk and subjective pressure.";
  } else {
    conclusion =
      "Both factual exposure and perceived urgency are currently contained. " +
      "No dominant pressure signal is enforced by the numbers at this stage.";
  }

  // Executive-style output
  let message = `
EXECUTIVE DECISION SNAPSHOT

FACTUAL EXPOSURE
Confirmed loss: ${real.toFixed(0)} ${unit}
Expected loss (probability-weighted): ${expectedLoss.toFixed(0)} ${unit}

Total factual exposure: ${totalFactualExposure.toFixed(0)} ${unit}

PERCEIVED PRESSURE
Declared pressure level: ${pressureScore} / 10
(This reflects subjective urgency, not cost.)

RELATION: FACTS VS PRESSURE
${conclusion}

Context note:
This audit does not predict outcomes. It clarifies whether the urgency you feel is currently enforced by measurable exposure or amplified by narrative and timing pressure.

Responsibility remains entirely with the decision-holder.
`;

  document.getElementById("result").innerText = message;
}
