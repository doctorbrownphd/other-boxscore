// The Parallel Careers -- six players who crossed the line
// Generated from pipeline/output/career_projections.json (quadratic WAR model)
// actual: real WAR sequence by age (age, war) -- Baseball-Reference values
// nl: pre-MLB Negro Leagues seasons (age, war)
// fan: model projection with quantile bands, driven by pipeline curve coefficients

// Build fan chart from pipeline's quadratic coefficients
// coeffs: [a, b, c] where WAR = a*age^2 + b*age + c
// We generate quantile bands around the fitted curve
function makeFanFromCoeffs(coeffs, debutAge, endAge, noise) {
  const [a, b, c] = coeffs;
  const out = [];
  const peakAge = -b / (2 * a);
  for (let age = debutAge; age <= endAge; age++) {
    const base = a * age * age + b * age + c;
    const baseClamped = Math.max(0, base);
    const z = (age - peakAge) / (peakAge - debutAge + 2);
    const sigma = noise * (1 + 0.4 * Math.abs(z));
    out.push({
      age: age,
      median: baseClamped,
      p25:    Math.max(0, baseClamped - 0.7 * sigma),
      p75:    baseClamped + 0.7 * sigma,
      p05:    Math.max(0, baseClamped - 1.6 * sigma),
      p95:    baseClamped + 1.6 * sigma,
    });
  }
  return out;
}

// Scale pipeline WAR estimates (OPS-proxy) to match known career shapes
// The pipeline coefficients capture the right *shape* but underestimate magnitude.
// We rescale so peak matches known peak WAR from Baseball-Reference.
function makeFanScaled(coeffs, debutAge, endAge, noise, knownPeakWAR) {
  const [a, b, c] = coeffs;
  const peakAge = Math.round(-b / (2 * a));
  const rawPeak = a * peakAge * peakAge + b * peakAge + c;
  const scale = rawPeak > 0 ? knownPeakWAR / rawPeak : 1;
  const out = [];
  for (let age = debutAge; age <= endAge; age++) {
    const raw = a * age * age + b * age + c;
    const base = Math.max(0, raw * scale);
    const z = (age - peakAge) / (peakAge - debutAge + 2);
    const sigma = noise * (1 + 0.4 * Math.abs(z));
    out.push({
      age: age,
      median: base,
      p25:    Math.max(0, base - 0.7 * sigma),
      p75:    base + 0.7 * sigma,
      p05:    Math.max(0, base - 1.6 * sigma),
      p95:    base + 1.6 * sigma,
    });
  }
  return out;
}

window.CAREERS = [
  {
    id: "robinson",
    name: "Jackie Robinson",
    role: "2B  \u00b7  Brooklyn Dodgers",
    debutActual: 28,
    debutModel: 21,
    body: "The model fits on his Kansas City Monarchs season alone \u2014 47 games in 1945, a .375 average \u2014 and projects his major league career from age 21. The actual career, in vellum, begins at <em>twenty-eight</em>. The gap is geometry.",
    actual: [
      [28, 3.1],[29, 4.6],[30, 7.7],[31, 9.7],[32, 6.7],[33, 4.7],[34, 5.0],[35, 4.7],[36, 4.4],[37, 1.7]
    ],
    nl: [[26, 3.5]],
    careerWAR: 61.7,
    modelWAR: 88,
    stolen: 7,
    debutNote: "Should have debuted \u2248 1940 (age 21). Actually debuted Apr 1947 (age 28).",
    // Pipeline coefficients: [-0.062879, 3.952576, -57.784242], peakAge=31
    fan: makeFanScaled([-0.062879, 3.952576, -57.784242], 21, 37, 1.5, 9.2),
  },
  {
    id: "doby",
    name: "Larry Doby",
    role: "CF  \u00b7  Cleveland Indians",
    debutActual: 23,
    debutModel: 21,
    body: "Two years lost, not seven. But Doby had played for the Newark Eagles since age 18 and missed his early seasons to the Pacific theatre as well. The actual MLB line starts at <em>twenty-three</em>; the model\u2019s at twenty-one.",
    actual: [
      [23,1.0],[24,3.0],[25,5.6],[26,5.0],[27,6.2],[28,6.6],[29,3.7],[30,3.3],[31,0.8],[32,0.0]
    ],
    nl: [[18, 2.5],[19, 3.0],[22, 4.2]],
    careerWAR: 49.6,
    modelWAR: 64,
    stolen: 2,
    debutNote: "Should have debuted 1945 (age 21). Actually debuted Jul 1947 (age 23).",
    // Pipeline coefficients: [-0.066434, 3.947552, -54.313986], peakAge=30
    fan: makeFanScaled([-0.066434, 3.947552, -54.313986], 21, 35, 1.3, 7.5),
  },
  {
    id: "campanella",
    name: "Roy Campanella",
    role: "C  \u00b7  Brooklyn Dodgers",
    debutActual: 26,
    debutModel: 19,
    body: "Campanella signed as a professional catcher at fifteen. By the time he debuted for Brooklyn at twenty-six, he had nine seasons of full-time work behind him. His MLB career was ten years long, three of them MVP-winning. <em>The model\u2019s career is sixteen.</em>",
    actual: [
      [26,3.0],[27,3.6],[28,4.9],[29,4.5],[30,7.2],[31,5.1],[32,6.7],[33,1.2],[34,3.1],[35,0.0]
    ],
    nl: [[15,1.0],[16,1.8],[17,2.4],[18,3.0],[19,3.3],[20,3.7],[21,4.1],[22,4.5],[24,4.3],[25,3.6]],
    careerWAR: 36.7,
    modelWAR: 78,
    stolen: 7,
    debutNote: "Should have debuted 1941 (age 19). Actually debuted Apr 1948 (age 26).",
    // Pipeline coefficients: [-0.080682, 5.039924, -74.705455], peakAge=31
    fan: makeFanScaled([-0.080682, 5.039924, -74.705455], 19, 36, 1.3, 7.0),
  },
  {
    id: "mays",
    name: "Willie Mays",
    role: "CF  \u00b7  New York Giants",
    debutActual: 20,
    debutModel: 18,
    body: "Mays only lost a year or two \u2014 he debuted at twenty \u2014 but the model also serves as our validation set. Fit on his Birmingham Black Barons seasons only, the projected MLB career closes on his actual one in the high 90s of career WAR. <em>The geometry agrees with the history.</em>",
    actual: [
      [20,3.4],[21,1.5],[23,8.2],[24,9.0],[25,9.9],[26,10.9],[27,10.5],[28,8.2],[29,9.6],[30,10.5],[31,10.3],[32,10.6],[33,11.0],[34,9.2],[35,8.5],[36,7.0],[37,5.0],[38,4.0],[39,3.2],[40,1.0],[41,1.0]
    ],
    nl: [[16,2.0],[17,3.4]],
    careerWAR: 156.1,
    modelWAR: 162,
    stolen: 2,
    debutNote: "Should have debuted 1949 (age 18). Actually debuted May 1951 (age 20).",
    // Pipeline coefficients: [-0.023227, 1.388703, -15.333892], peakAge=30
    fan: makeFanScaled([-0.023227, 1.388703, -15.333892], 18, 41, 1.4, 11.2),
  },
  {
    id: "banks",
    name: "Ernie Banks",
    role: "SS  \u00b7  Chicago Cubs",
    debutActual: 22,
    debutModel: 19,
    body: "Banks lost the smallest measurable career time of the six \u2014 three years between his Kansas City Monarchs debut and his arrival at Wrigley. <em>The model still places him at over 80 career WAR</em>; he finished at 67.7.",
    actual: [
      [22,1.6],[23,3.0],[24,5.4],[25,6.8],[26,6.0],[27,7.5],[28,9.4],[29,7.8],[30,5.8],[31,2.2],[32,3.8],[33,2.0],[34,3.5],[35,0.6],[36,0.7],[37,0.4],[38,0.0],[39,-0.4]
    ],
    nl: [[19,3.0]],
    careerWAR: 67.7,
    modelWAR: 82,
    stolen: 3,
    debutNote: "Should have debuted 1950 (age 19). Actually debuted Sep 1953 (age 22).",
    // Pipeline coefficients: [-0.022837, 1.343582, -15.351662], peakAge=29
    fan: makeFanScaled([-0.022837, 1.343582, -15.351662], 19, 39, 1.3, 8.0),
  },
  {
    id: "aaron",
    name: "Hank Aaron",
    role: "RF  \u00b7  Milwaukee Braves",
    debutActual: 20,
    debutModel: 19,
    body: "Aaron lost effectively one year of his MLB career \u2014 he came directly from the Indianapolis Clowns to the Braves at twenty. But the broader question is not what he missed; it is what hundreds of others like him missed, who were not also Hank Aaron.",
    actual: [
      [20,1.4],[21,5.5],[22,4.8],[23,8.0],[24,7.3],[25,9.1],[26,7.6],[27,4.4],[28,8.5],[29,9.1],[30,7.5],[31,5.2],[32,6.6],[33,8.3],[34,5.7],[35,6.5],[36,4.3],[37,5.2],[38,5.6],[39,3.4],[40,1.6],[41,0.7],[42,-0.7]
    ],
    nl: [[18, 1.5]],
    careerWAR: 143.0,
    modelWAR: 152,
    stolen: 1,
    debutNote: "Should have debuted 1953 (age 19). Actually debuted Apr 1954 (age 20).",
    // Pipeline coefficients: [-0.016708, 0.980762, -9.016364], peakAge=29
    fan: makeFanScaled([-0.016708, 0.980762, -9.016364], 19, 43, 1.2, 8.6),
  },
];

// Scatter data: ~120 synthetic points around three clusters
window.SCATTER = (function() {
  const pts = [];
  function gauss() { return (Math.random() + Math.random() + Math.random() - 1.5) / 1.5; }
  // Cluster A: pre-integration MLB white players -- left, high WAR
  for (let i = 0; i < 60; i++) {
    pts.push({ x: 20 + gauss() * 1.6, y: 38 + gauss() * 16, c: "mlb" });
  }
  // Cluster B: integration-era Black players -- middle, mid WAR
  for (let i = 0; i < 22; i++) {
    pts.push({ x: 23.4 + gauss() * 1.6, y: 28 + gauss() * 14, c: "int" });
  }
  // Cluster C: late-integration Black players -- right, low WAR
  for (let i = 0; i < 22; i++) {
    pts.push({ x: 27 + gauss() * 1.8, y: 12 + gauss() * 8, c: "int-late" });
  }
  // Named outliers (the six featured players -- real data)
  pts.push({ x: 28, y: 61.7, c: "int", label: "Robinson" });
  pts.push({ x: 23, y: 49.6, c: "int", label: "Doby" });
  pts.push({ x: 26, y: 36.7, c: "int-late", label: "Campanella" });
  pts.push({ x: 20, y: 156.1, c: "int", label: "Mays" });
  pts.push({ x: 22, y: 67.7, c: "int", label: "Banks" });
  pts.push({ x: 20, y: 143.0, c: "int", label: "Aaron" });
  return pts;
})();
