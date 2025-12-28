function runAudit() {
  const real = Number(document.getElementById("realLoss").value);
  const potential = Number(document.getElementById("potentialLoss").value);
  const probability = Number(document.getElementById("probability").value) / 100;
  const pressureInput = Number(document.getElementById("pressure").value);
  const gain = Number(document.getElementById("gain").value);
  const unit = document.getElementById("unit").value || "units";

  const expectedLoss = potential * probability;
  const pressureValue = pressureInput * 1000;
  const net = gain - (real + expectedLoss);

  const totalExposure = real + expectedLoss + pressureValue;
  const pressureIndex = totalExposure === 0 ? 0 :
    (expectedLoss + pressureValue) / totalExposure;

  let trigger =
    "Decision Trigger: MET\nDelay increases measurable exposure.";

  if (pressureIndex > 0.6 && net <= 0) {
    trigger =
      "Decision Trigger: NOT MET\nCurrent urgency is not enforced by dominant factual loss.";
  }

  let message = `
DECISION ARGUMENT SUMMARY

Real loss: ${real.toFixed(0)} ${unit}
Expected loss: ${expectedLoss.toFixed(0)} ${unit}
Pressure proxy: ${pressureValue.toFixed(0)} ${unit}

Net balance: ${net.toFixed(0)} ${unit}

Pressure Index: ${(pressureIndex * 100).toFixed(0)}%

${trigger}

Decision Integrity Check
– Pressure-driven urgency: ${pressureIndex > 0.6 ? "YES" : "NO"}
– Net balance negative: ${net < 0 ? "YES" : "NO"}

Responsibility remains with the decision-holder.
`;

  document.getElementById("result").innerText = message;
}
