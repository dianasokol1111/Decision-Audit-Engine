function runAudit() {
  const real = Number(document.getElementById("realLoss").value);
  const potential = Number(document.getElementById("potentialLoss").value);
  const probability = Number(document.getElementById("probability").value) / 100;
  const pressureScore = Number(document.getElementById("pressure").value); // 1–10
  const gain = Number(document.getElementById("gain").value);
  const unit = document.getElementById("unit").value || "units";

  const expectedLoss = potential * probability;
  const net = gain - (real + expectedLoss);

  // pressure is a weighting factor, not a cost
  const pressureWeight = pressureScore / 10;

  const factualExposure = real + expectedLoss;
  const totalExposure = factualExposure * (1 + pressureWeight);

  const pressureIndex =
    totalExposure === 0 ? 0 : pressureWeight / (1 + pressureWeight);

  let trigger =
    "Decision Trigger: MET\nDelay increases measurable exposure.";

  if (pressureIndex > 0.6 && net <= 0) {
    trigger =
      "Decision Trigger: NOT MET\nUrgency is primarily pressure-driven, not loss-enforced.";
  }

  let message = `
DECISION ARGUMENT SUMMARY

Real loss: ${real.toFixed(0)} ${unit}
Expected loss: ${expectedLoss.toFixed(0)} ${unit}

Pressure proxy (psychological): ${pressureScore} / 10

Net balance: ${net.toFixed(0)} ${unit}

Pressure Index: ${(pressureIndex * 100).toFixed(0)}%

${trigger}

Decision Integrity Check
– Pressure-dominant urgency: ${pressureIndex > 0.6 ? "YES" : "NO"}
– Net balance negative: ${net < 0 ? "YES" : "NO"}

Responsibility remains with the decision-holder.
`;

  document.getElementById("result").innerText = message;
}
