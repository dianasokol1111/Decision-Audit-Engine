{
  "decision": {
    "id": "59196fb6-1fea-4036-a914-0115ff3df2da",
    "statement": "I will delay signing the partnership agreement until March 31.",
    "context": "Negotiations are ongoing. No penalties are contractually enforced before this date.",
    "created_at": "2025-12-28T22:25:54.536Z",
    "unit": "EUR"
  },

  "loss_profile": {
    "real": {
      "amount": 0,
      "note": "Confirmed loss already incurred or unavoidable."
    },
    "assumed": {
      "amount": 45000,
      "likelihood_percent": 20,
      "note": "Worst-case scenario magnitude based on current belief."
    },
    "symbolic": {
      "description": "Being perceived as indecisive or losing authority in negotiations.",
      "weighted": false,
      "note": "Recorded for visibility only. Not used in calculations."
    }
  },

  "time_exposure": {
    "delay_days": 90,
    "potential_per_day": 500,
    "belief_adjusted_risk_per_day": 100,
    "explanation": "Scenario magnitude distributed evenly across the declared time horizon."
  },

  "pressure_signals": {
    "declared_urgency_level": 8,
    "urgency_band": "HIGH",
    "source_note": "Fear of losing momentum and external expectations to act quickly."
  },

  "identity_layer": {
    "narrative": "If I do not act now, I might look weak and miss a critical opportunity.",
    "weighted": false,
    "note": "Identity-related narrative recorded without influence on the audit outcome."
  },

  "engine_output": {
    "structural_alignment": {
      "status": "DISPROPORTIONATE",
      "definition": "Declared urgency exceeds time-distributed exposure.",
      "note": "This is a structural signal, not a decision or recommendation."
    },
    "interpretation": "The perceived urgency is higher than the daily exposure implied by the time horizon. This suggests that pressure may be amplified by narrative rather than enforced by time-based risk."
  },

  "human_readable_summary": {
    "headline": "Perceived urgency exceeds structural time exposure.",
    "key_observations": [
      "Declared urgency is high (8 out of 10).",
      "The situation unfolds over 90 days, not immediately.",
      "Worst-case exposure equals 500 EUR per day.",
      "Belief-adjusted exposure equals 100 EUR per day."
    ],
    "closing_note": "This summary describes structural relationships only. It does not provide advice or recommendations."
  },

  "disclaimers": {
    "prediction": "This system does not predict outcomes.",
    "recommendation": "This system does not provide recommendations.",
    "responsibility": "Responsibility remains entirely with the decision-holder."
  },

  "meta": {
    "engine": "Decision Audit Engine™",
    "version": "1.2",
    "output_type": "structural_audit",
    "generated_at": "2025-12-28T22:25:54.536Z"
  }
}
