function runAudit() {
  const real = Number(document.getElementById("realLoss").value);
  const potential = Number(document.getElementById("potentialLoss").value);
  const likelihood = Number(document.getElementById("probability").value); // %
  const delayDays = Number(document.getElementById("delayDays").value);
  const pressure = Number(document.getElementById("pressure").value); // 1–10
  const gain = Number(document.getElementById("gain").value);
  const unit = document.getElementById("unit").value || "units";

  // Safety
  const days = delayDays > 0 ? delayDays : 1;

  // Time-distributed exposure (NOT a prediction)
  const potentialPerDay = potential / days;
  const perceivedRiskPerDay = (potential * (likelihood / 100)) / days;

  // Qualitative signals
  const pressureSignal = pressure >= 7 ? "HIGH" : pressure >= 4 ? "MODERATE" : "LOW";
  const likelihoodSignal = likelihood >= 60 ? "HIGH" : likelihood >= 30 ? "MODERATE" : "LOW";

  let conclusion = "";

  if (pressureSignal === "HIGH" && perceivedRiskPerDay < gain / days) {
    conclusion =
      "Declared urgency is high, while projected daily exposure remains limited. " +
      "Breaking the scenario into daily impact suggests pressure may be amplified by narrative rather than enforced by time-based risk.";
  } else if (pressureSignal === "HIGH" && perceivedRiskPerDay >= gain / days) {
    conclusion =
      "Declared urgency aligns with meaningful projected exposure per day. " +
      "Pressure appears proportionate to the time-distributed risk as currently perceived.";
  } else {
    conclusion =
      "Time-distributed exposure and perceived urgency remain broadly aligned. " +
      "No dominant pressure distortion is detected at this stage.";
  }

  let message = `
EXECUTIVE DECISION SNAPSHOT

FACTUAL BASE
Confirmed loss: ${real.toFixed(0)} ${unit}
Potential loss magnitude (scenario): ${potential.toFixed(0)} ${unit}

TIME DISTRIBUTION
Delay period: ${days} days
Potential exposure per day: ${potentialPerDay.toFixed(2)} ${unit} / day

PROJECTED SCENARIO
Projected likelihood of loss: ${likelihood}%
Perceived risk per day (belief-adjusted): ${perceivedRiskPerDay.toFixed(2)} ${unit} / day

PERCEIVED PRESSURE
Declared urgency level: ${pressure} / 10
(This reflects psychological pressure, not cost.)

INTERPRETATION
${conclusion}

Context note:
This audit does not predict outcomes.
It decomposes perceived risk over time to clarify whether urgency is proportionate to daily exposure or inflated by narrative pressure.

Responsibility remains entirely with the decision-holder.
`;

  document.getElementById("result").innerText = message;
}
