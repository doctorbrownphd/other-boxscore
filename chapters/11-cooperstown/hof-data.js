/* ==========================================================================
   Chapter 11: Cooperstown -- Data Delivery
   --------------------------------------------------------------------------
   Canonical sources: data/candidates.json, data/hof-standards.json,
                      data/hof-probability.json, data/special-committee-2006.json
   All files CC0. This JS file is the delivery format for the chapter page.
   --------------------------------------------------------------------------
   HOF_STANDARDS: JAWS position-by-position averages from FanGraphs.
   HOF_CANDIDATES: Negro Leagues players with documented Hall of Fame cases,
                   evaluated against the JAWS position bar.
   HOF_PROBABILITY: Composite candidacy scores and era committee routing.
   HOF_COMMITTEE_2006: The 39-candidate Special Committee ballot from Feb 2006.
   ========================================================================== */

window.HOF_STANDARDS = {
  _metadata: {
    title: "JAWS Position-by-Position Hall of Fame Standards",
    sources: [
      { id: "fangraphs-jaws", name: "FanGraphs JAWS Series by Jay Jaffe" },
      { id: "bbref-jaws", name: "Baseball Reference JAWS System" }
    ],
    confidence: "Documented",
    generated: "2026-05-24"
  },
  positions: {
    C:  { label: "Catcher",         avgCareerWAR: 53.6, avgPeakWAR: 34.9, avgJAWS: 44.3 },
    "1B": { label: "First Base",    avgCareerWAR: 65.0, avgPeakWAR: 41.8, avgJAWS: 53.4 },
    "2B": { label: "Second Base",   avgCareerWAR: 69.7, avgPeakWAR: 44.5, avgJAWS: 57.1 },
    SS: { label: "Shortstop",       avgCareerWAR: 67.7, avgPeakWAR: 43.2, avgJAWS: 55.5 },
    "3B": { label: "Third Base",    avgCareerWAR: 69.4, avgPeakWAR: 43.3, avgJAWS: 56.3 },
    LF: { label: "Left Field",      avgCareerWAR: 65.1, avgPeakWAR: 41.6, avgJAWS: 53.4 },
    CF: { label: "Center Field",    avgCareerWAR: 71.7, avgPeakWAR: 44.7, avgJAWS: 58.2 },
    RF: { label: "Right Field",     avgCareerWAR: 71.1, avgPeakWAR: 42.4, avgJAWS: 56.7 },
    P:  { label: "Starting Pitcher", avgCareerWAR: 73.0, avgPeakWAR: 40.7, avgJAWS: 56.9 }
  },
  combined_outfield: {
    label: "Outfield (combined LF/CF/RF average)",
    avgCareerWAR: 69.3, avgPeakWAR: 42.9, avgJAWS: 56.1,
    confidence: "Estimated"
  }
};

window.HOF_CANDIDATES = {
  _metadata: {
    title: "Cooperstown Candidates: Negro Leagues Players with Documented Hall of Fame Cases",
    sources: [
      { id: "ch10-ledger", name: "Chapter 10: The Ledger (players.json)" },
      { id: "ch12-matrix", name: "Chapter 12: The Other Hall (hall-matrix.json)" },
      { id: "42for21", name: "42 for 21 Committee" },
      { id: "hof-standards", name: "hof-standards.json" },
      { id: "seamheads", name: "Seamheads Negro Leagues Database" }
    ],
    confidence_vocabulary: {
      Documented: "Figure appears in Seamheads database with game-level source data",
      Estimated: "Figure derived from documented data via rate computation",
      Modeled: "Figure produced by approximation model (e.g., JAWS estimation from career WAR)"
    },
    generated: "2026-05-24"
  },
  inducted_negro_leagues_hof: [
    { name: "Oscar Charleston", position: "CF", years: "1915-1941", cooperstown_year: 1976, ch10_id: 1, careerWAR: 78.3, warConfidence: "Documented", peakWAR: null, estimatedJAWS: 58.7, estimatedJAWS_confidence: "Modeled", rateWAR: 6.99, positionBar: 58.2, positionBarLabel: "CF", barComparison: "at_bar" },
    { name: "Martin Dihigo", position: "RF/P", years: "1922-1946", cooperstown_year: 1977, ch10_id: 2, careerWAR: 70.0, warConfidence: "Documented", peakWAR: null, estimatedJAWS: 52.5, estimatedJAWS_confidence: "Modeled", rateWAR: 10.2, positionBar: 56.7, positionBarLabel: "RF", barComparison: "below_bar" },
    { name: "Willie Wells", position: "SS", years: "1924-1948", cooperstown_year: 1997, ch10_id: 3, careerWAR: 69.5, warConfidence: "Documented", peakWAR: null, estimatedJAWS: 52.1, estimatedJAWS_confidence: "Modeled", rateWAR: 6.28, positionBar: 55.5, positionBarLabel: "SS", barComparison: "below_bar" },
    { name: "Josh Gibson", position: "C", years: "1930-1946", cooperstown_year: 1972, ch10_id: 4, careerWAR: 60.2, warConfidence: "Documented", peakWAR: null, estimatedJAWS: 45.2, estimatedJAWS_confidence: "Modeled", rateWAR: 8.88, positionBar: 44.3, positionBarLabel: "C", barComparison: "above_bar" },
    { name: "Cristobal Torriente", position: "CF", years: "1912-1932", cooperstown_year: 2006, ch10_id: 5, careerWAR: 60.0, warConfidence: "Documented", peakWAR: null, estimatedJAWS: 45.0, estimatedJAWS_confidence: "Modeled", rateWAR: 7.0, positionBar: 58.2, positionBarLabel: "CF", barComparison: "below_bar" },
    { name: "Turkey Stearnes", position: "CF", years: "1923-1940", cooperstown_year: 2000, ch10_id: 6, careerWAR: 58.7, warConfidence: "Documented", peakWAR: null, estimatedJAWS: 44.0, estimatedJAWS_confidence: "Modeled", rateWAR: 7.47, positionBar: 58.2, positionBarLabel: "CF", barComparison: "below_bar" },
    { name: "Bullet Rogan", position: "CF/P", years: "1916-1938", cooperstown_year: 1998, ch10_id: 7, careerWAR: 57.1, warConfidence: "Documented", peakWAR: null, estimatedJAWS: 42.8, estimatedJAWS_confidence: "Modeled", rateWAR: 13.18, positionBar: 56.9, positionBarLabel: "P", barComparison: "below_bar" },
    { name: "Joe Williams", position: "P", years: "1907-1932", cooperstown_year: 1999, ch10_id: 8, careerWAR: 55.2, warConfidence: "Documented", peakWAR: null, estimatedJAWS: 41.4, estimatedJAWS_confidence: "Modeled", rateWAR: 4.83, positionBar: 56.9, positionBarLabel: "P", barComparison: "below_bar" },
    { name: "John Henry Lloyd", position: "SS", years: "1906-1932", cooperstown_year: 1977, ch10_id: 9, careerWAR: 54.8, warConfidence: "Documented", peakWAR: null, estimatedJAWS: 41.1, estimatedJAWS_confidence: "Modeled", rateWAR: 5.76, positionBar: 55.5, positionBarLabel: "SS", barComparison: "below_bar" },
    { name: "Satchel Paige", position: "P", years: "1927-1947", cooperstown_year: 1971, ch10_id: 10, careerWAR: 53.6, warConfidence: "Documented", peakWAR: null, estimatedJAWS: 40.2, estimatedJAWS_confidence: "Modeled", rateWAR: 6.27, positionBar: 56.9, positionBarLabel: "P", barComparison: "below_bar" },
    { name: "Jose Mendez", position: "P", years: "1907-1926", cooperstown_year: 2006, ch10_id: 11, careerWAR: 49.1, warConfidence: "Documented", peakWAR: null, estimatedJAWS: 36.8, estimatedJAWS_confidence: "Modeled", rateWAR: 5.21, positionBar: 56.9, positionBarLabel: "P", barComparison: "below_bar" },
    { name: "Ray Brown", position: "P", years: "1931-1946", cooperstown_year: 2006, ch10_id: 12, careerWAR: 47.7, warConfidence: "Documented", peakWAR: null, estimatedJAWS: 35.8, estimatedJAWS_confidence: "Modeled", rateWAR: 5.2, positionBar: 56.9, positionBarLabel: "P", barComparison: "below_bar" },
    { name: "Jud Wilson", position: "3B", years: "1922-1945", cooperstown_year: 2006, ch10_id: 13, careerWAR: 46.9, warConfidence: "Documented", peakWAR: null, estimatedJAWS: 35.2, estimatedJAWS_confidence: "Modeled", rateWAR: 5.91, positionBar: 56.3, positionBarLabel: "3B", barComparison: "below_bar" },
    { name: "Cool Papa Bell", position: "CF", years: "1922-1946", cooperstown_year: 1974, ch10_id: 14, careerWAR: 46.1, warConfidence: "Documented", peakWAR: null, estimatedJAWS: 34.6, estimatedJAWS_confidence: "Modeled", rateWAR: 4.0, positionBar: 58.2, positionBarLabel: "CF", barComparison: "below_bar" },
    { name: "Pete Hill", position: "CF", years: "1904-1925", cooperstown_year: 2006, ch10_id: 15, careerWAR: 45.2, warConfidence: "Documented", peakWAR: null, estimatedJAWS: 33.9, estimatedJAWS_confidence: "Modeled", rateWAR: 6.63, positionBar: 58.2, positionBarLabel: "CF", barComparison: "below_bar" },
    { name: "Mule Suttles", position: "1B", years: "1923-1944", cooperstown_year: 2006, ch10_id: 19, careerWAR: 38.3, warConfidence: "Documented", peakWAR: null, estimatedJAWS: 28.7, estimatedJAWS_confidence: "Modeled", rateWAR: 5.48, positionBar: 53.4, positionBarLabel: "1B", barComparison: "below_bar" },
    { name: "Willie Foster", position: "P", years: "1923-1937", cooperstown_year: 1996, ch10_id: 20, careerWAR: 38.0, warConfidence: "Documented", peakWAR: null, estimatedJAWS: 28.5, estimatedJAWS_confidence: "Modeled", rateWAR: 3.78, positionBar: 56.9, positionBarLabel: "P", barComparison: "below_bar" },
    { name: "Buck Leonard", position: "1B", years: "1933-1948", cooperstown_year: 1972, ch10_id: 26, careerWAR: 34.4, warConfidence: "Documented", peakWAR: null, estimatedJAWS: 25.8, estimatedJAWS_confidence: "Modeled", rateWAR: 6.74, positionBar: 53.4, positionBarLabel: "1B", barComparison: "below_bar" },
    { name: "Ben Taylor", position: "1B", years: "1909-1929", cooperstown_year: 2006, ch10_id: 27, careerWAR: 34.3, warConfidence: "Documented", peakWAR: null, estimatedJAWS: 25.7, estimatedJAWS_confidence: "Modeled", rateWAR: 4.96, positionBar: 53.4, positionBarLabel: "1B", barComparison: "below_bar" },
    { name: "Willard Brown", position: "CF", years: "1935-1948", cooperstown_year: 2006, ch10_id: 29, careerWAR: 33.4, warConfidence: "Documented", peakWAR: null, estimatedJAWS: 25.1, estimatedJAWS_confidence: "Modeled", rateWAR: 8.36, positionBar: 58.2, positionBarLabel: "CF", barComparison: "below_bar" },
    { name: "Hilton Smith", position: "P", years: "1932-1948", cooperstown_year: 2001, ch10_id: 36, careerWAR: 30.3, warConfidence: "Documented", peakWAR: null, estimatedJAWS: 22.7, estimatedJAWS_confidence: "Modeled", rateWAR: 4.87, positionBar: 56.9, positionBarLabel: "P", barComparison: "below_bar" },
    { name: "Biz Mackey", position: "C", years: "1920-1947", cooperstown_year: 2006, ch10_id: 41, careerWAR: 28.9, warConfidence: "Documented", peakWAR: null, estimatedJAWS: 21.7, estimatedJAWS_confidence: "Modeled", rateWAR: 4.03, positionBar: 44.3, positionBarLabel: "C", barComparison: "below_bar" },
    { name: "Leon Day", position: "P", years: "1934-1946", cooperstown_year: 1995, ch10_id: 47, careerWAR: 26.8, warConfidence: "Documented", peakWAR: null, estimatedJAWS: 20.1, estimatedJAWS_confidence: "Modeled", rateWAR: 6.67, positionBar: 56.9, positionBarLabel: "P", barComparison: "below_bar" },
    { name: "Andy Cooper", position: "P", years: "1920-1939", cooperstown_year: 2006, ch10_id: 49, careerWAR: 25.9, warConfidence: "Documented", peakWAR: null, estimatedJAWS: 19.4, estimatedJAWS_confidence: "Modeled", rateWAR: 3.09, positionBar: 56.9, positionBarLabel: "P", barComparison: "below_bar" },
    { name: "Judy Johnson", position: "3B", years: "1918-1936", cooperstown_year: 1975, ch10_id: 50, careerWAR: 25.0, warConfidence: "Documented", peakWAR: null, estimatedJAWS: 18.8, estimatedJAWS_confidence: "Modeled", rateWAR: null, positionBar: 56.3, positionBarLabel: "3B", barComparison: "below_bar" }
  ],
  candidates_not_inducted: [
    { name: "Ramon Bragana", position: "P", years: "1927-1946", cooperstown_year: null, ch10_id: 16, careerWAR: 44.5, warConfidence: "Documented", peakWAR: null, estimatedJAWS: 33.4, estimatedJAWS_confidence: "Modeled", rateWAR: 4.79, positionBar: 56.9, positionBarLabel: "P", barComparison: "below_bar", historian_advocacy: null, advocacy_note: "Not widely advocated by U.S. historians; career primarily in Cuban/Venezuelan leagues." },
    { name: "Eustaquio Pedroso", position: "1B", years: "1907-1926", cooperstown_year: null, ch10_id: 17, careerWAR: 40.3, warConfidence: "Documented", peakWAR: null, estimatedJAWS: 30.2, estimatedJAWS_confidence: "Modeled", rateWAR: null, positionBar: 53.4, positionBarLabel: "1B", barComparison: "below_bar", historian_advocacy: null, advocacy_note: "Career primarily in Cuban leagues. Limited documentation in U.S. records." },
    { name: "Dick Redding", position: "P", years: "1911-1936", cooperstown_year: null, ch10_id: 18, careerWAR: 39.9, warConfidence: "Documented", peakWAR: null, estimatedJAWS: 29.9, estimatedJAWS_confidence: "Modeled", rateWAR: 3.4, positionBar: 56.9, positionBarLabel: "P", barComparison: "below_bar", historian_advocacy: "strong", "42for21_rank": 2, expert_poll_support: "91.7%", on_2006_ballot: true, on_era_committee_ballot: false, advocacy_sources: ["42 for 21 Committee", "McFarland", "Seamheads", "SABR BioProject"], case_note: "Cannonball Redding. Consistently ranked among the top Negro Leagues pitchers by working historians across multiple decades of scholarship. Career WAR of 39.9 from Seamheads is substantial despite incomplete records." },
    { name: "Newt Allen", position: "2B", years: "1922-1947", cooperstown_year: null, ch10_id: 21, careerWAR: 37.8, warConfidence: "Documented", peakWAR: null, estimatedJAWS: 28.4, estimatedJAWS_confidence: "Modeled", rateWAR: null, positionBar: 57.1, positionBarLabel: "2B", barComparison: "below_bar", historian_advocacy: "strong", "42for21_rank": 9, on_2006_ballot: true, advocacy_sources: ["42 for 21 Committee", "McFarland"], case_note: "Two-decade anchor of the Kansas City Monarchs. Defense-first player whose batting stats are not in the Seamheads top-100 leaderboard." },
    { name: "Dobie Moore", position: "SS", years: "1916-1926", cooperstown_year: null, ch10_id: 22, careerWAR: 37.2, warConfidence: "Documented", peakWAR: null, estimatedJAWS: 27.9, estimatedJAWS_confidence: "Modeled", rateWAR: 9.01, positionBar: 55.5, positionBarLabel: "SS", barComparison: "below_bar", historian_advocacy: "documented", on_2006_ballot: true, advocacy_sources: ["42 for 21 Committee"], case_note: "Career cut short by gunshot wound in 1926. Extraordinary rate stats (9.01 rateWAR) suggest elite peak value, but only 568 games documented." },
    { name: "Dick Lundy", position: "SS", years: "1916-1937", cooperstown_year: null, ch10_id: 23, careerWAR: 36.8, warConfidence: "Documented", peakWAR: null, estimatedJAWS: 27.6, estimatedJAWS_confidence: "Modeled", rateWAR: 5.55, positionBar: 55.5, positionBarLabel: "SS", barComparison: "below_bar", historian_advocacy: "strong", "42for21_rank": 6, expert_poll_support: "100%", on_2006_ballot: true, on_era_committee_ballot: false, advocacy_sources: ["42 for 21 Committee", "McFarland", "Seamheads", "SABR BioProject"], case_note: "Elite defensive shortstop with power. Ranked 3rd all-time among Negro Leagues shortstops after Lloyd and Wells. 100% support in expert historian poll." },
    { name: "William Bell", position: "P", years: "1923-1937", cooperstown_year: null, ch10_id: 24, careerWAR: 36.0, warConfidence: "Documented", peakWAR: null, estimatedJAWS: 27.0, estimatedJAWS_confidence: "Modeled", rateWAR: 4.16, positionBar: 56.9, positionBarLabel: "P", barComparison: "below_bar", historian_advocacy: "documented", on_2006_ballot: true, advocacy_sources: ["42 for 21 Committee"], case_note: "On the 2006 ballot. Not a top-tier candidate in historian polls." },
    { name: "Lazaro Salazar", position: "1B/P", years: "1930-1946", cooperstown_year: null, ch10_id: 28, careerWAR: 34.3, warConfidence: "Documented", peakWAR: null, estimatedJAWS: 25.7, estimatedJAWS_confidence: "Modeled", rateWAR: 7.95, positionBar: 53.4, positionBarLabel: "1B", barComparison: "below_bar", historian_advocacy: null, advocacy_note: "Dual-threat player. Cuban and Mexican leagues primary record." },
    { name: "Wild Bill Wright", position: "CF", years: "1932-1946", cooperstown_year: null, ch10_id: 30, careerWAR: 33.2, warConfidence: "Documented", peakWAR: null, estimatedJAWS: 24.9, estimatedJAWS_confidence: "Modeled", rateWAR: 5.29, positionBar: 58.2, positionBarLabel: "CF", barComparison: "below_bar", historian_advocacy: "documented", advocacy_sources: ["42 for 21 Committee"], case_note: "Ranked in the 42 for 21 list (11-43 range). Mexican Baseball Hall of Fame inductee." },
    { name: "Bill Byrd", position: "P", years: "1933-1948", cooperstown_year: null, ch10_id: 33, careerWAR: 31.1, warConfidence: "Documented", peakWAR: null, estimatedJAWS: 23.3, estimatedJAWS_confidence: "Modeled", rateWAR: 4.25, positionBar: 56.9, positionBarLabel: "P", barComparison: "below_bar", historian_advocacy: "documented", on_2006_ballot: true, advocacy_sources: ["42 for 21 Committee"], case_note: "On the 2006 ballot." },
    { name: "Sam Bankhead", position: "SS", years: "1932-1948", cooperstown_year: null, ch10_id: 35, careerWAR: 30.5, warConfidence: "Documented", peakWAR: null, estimatedJAWS: 22.9, estimatedJAWS_confidence: "Modeled", rateWAR: null, positionBar: 55.5, positionBarLabel: "SS", barComparison: "below_bar", historian_advocacy: "documented", advocacy_sources: ["42 for 21 Committee"], case_note: "Versatile athlete." },
    { name: "Hurley McNair", position: "RF", years: "1910-1937", cooperstown_year: null, ch10_id: 39, careerWAR: 29.5, warConfidence: "Documented", peakWAR: null, estimatedJAWS: 22.1, estimatedJAWS_confidence: "Modeled", rateWAR: 4.67, positionBar: 56.7, positionBarLabel: "RF", barComparison: "below_bar", historian_advocacy: "documented", advocacy_sources: ["42 for 21 Committee"], case_note: "Monarchs outfielder." },
    { name: "John Beckwith", position: "3B", years: "1919-1937", cooperstown_year: null, ch10_id: 40, careerWAR: 28.9, warConfidence: "Documented", peakWAR: null, estimatedJAWS: 21.7, estimatedJAWS_confidence: "Modeled", rateWAR: 6.83, positionBar: 56.3, positionBarLabel: "3B", barComparison: "below_bar", historian_advocacy: "strong", "42for21_rank": 3, on_2006_ballot: true, advocacy_sources: ["42 for 21 Committee", "McFarland", "Seamheads"], case_note: "The most powerful right-handed hitter in Negro Leagues history, per multiple historian assessments. Character clause reportedly influenced the 2006 vote. The BBWAA character clause has been applied inconsistently across inducted players." },
    { name: "George Scales", position: "2B", years: "1921-1946", cooperstown_year: null, ch10_id: 46, careerWAR: 27.0, warConfidence: "Documented", peakWAR: null, estimatedJAWS: 20.3, estimatedJAWS_confidence: "Modeled", rateWAR: 4.48, positionBar: 57.1, positionBarLabel: "2B", barComparison: "below_bar", historian_advocacy: "documented", on_2006_ballot: true, advocacy_sources: ["42 for 21 Committee", "McFarland", "Seamheads"], case_note: "On the 2006 ballot." },
    { name: "Rap Dixon", position: "OF", years: "1922-1937", cooperstown_year: null, ch10_id: null, careerWAR: null, peakWAR: null, estimatedJAWS: null, rateWAR: null, positionBar: 56.1, positionBarLabel: "OF (combined)", barComparison: null, historian_advocacy: "strong", "42for21_rank": 1, on_2006_ballot: true, advocacy_sources: ["42 for 21 Committee", "McFarland", "Seamheads"], case_note: "Ranked 1st by the 42 for 21 Committee poll of 70+ historians. Consistently top-ranked outfielder in historian polls. Not in the Ch 10 top 50 by Seamheads career WAR, which may reflect incomplete records rather than insufficient talent." },
    { name: "John Donaldson", position: "P", years: "1908-1940", cooperstown_year: null, ch10_id: null, careerWAR: null, peakWAR: null, estimatedJAWS: null, rateWAR: null, positionBar: 56.9, positionBarLabel: "P", barComparison: null, historian_advocacy: "strong", "42for21_rank": 4, on_2006_ballot: true, on_era_committee_ballot: true, era_committee_year: 2024, era_committee_result: "Not elected. Received fewer than 5 votes.", advocacy_sources: ["42 for 21 Committee", "McFarland", "Gorton research", "Era Committee 2024"], case_note: "Pete Gorton's research documents 400+ wins and 5,000+ strikeouts. On 2024 Classic Baseball Era Committee ballot, not elected. Extensive independent-league career complicates direct statistical comparison with Seamheads database." },
    { name: "Vic Harris", position: "OF", years: "1923-1950", cooperstown_year: null, ch10_id: null, careerWAR: null, peakWAR: null, estimatedJAWS: null, rateWAR: null, positionBar: 56.1, positionBarLabel: "OF (combined)", barComparison: null, historian_advocacy: "strong", "42for21_rank": 7, on_2006_ballot: false, on_era_committee_ballot: true, era_committee_year: 2024, era_committee_result: "Not elected. Received fewer than 5 votes.", advocacy_sources: ["42 for 21 Committee", "McFarland", "Era Committee 2024"], case_note: "Player-manager for the Homestead Grays dynasty. On 2024 Classic Baseball Era Committee ballot, not elected." },
    { name: "Spottswood Poles", position: "CF", years: "1906-1923", cooperstown_year: null, ch10_id: null, careerWAR: null, peakWAR: null, estimatedJAWS: null, rateWAR: null, positionBar: 58.2, positionBarLabel: "CF", barComparison: null, historian_advocacy: "strong", "42for21_rank": 9, on_2006_ballot: true, advocacy_sources: ["42 for 21 Committee", "McFarland"], case_note: "Lost prime seasons to World War I service. Pre-1920 documentation complicates the statistical case." },
    { name: "Home Run Johnson", position: "SS", years: "1895-1916", cooperstown_year: null, ch10_id: null, careerWAR: null, peakWAR: null, estimatedJAWS: null, rateWAR: null, positionBar: 55.5, positionBarLabel: "SS", barComparison: null, historian_advocacy: "documented", "42for21_rank": 8, on_2006_ballot: true, advocacy_sources: ["42 for 21 Committee", "McFarland"], case_note: "Pre-1920 star. Documentation gap is the primary barrier, not statistical insufficiency." }
  ],
  data_integrity_notes: [
    "Ch 10 players.json marks Dick Redding (id 18) with hof: 'inducted', hof_year: 2024 and Dick Lundy (id 23) with hof: 'inducted', hof_year: 2024. Neither Redding nor Lundy appears on the 2024 Classic Baseball Era Committee ballot (baseballhall.org), and no source confirms their induction. This chapter treats them as NOT inducted, which is the documented reality as of May 2026.",
    "The JAWS system uses absolute career WAR + 7-year peak WAR averaged. Negro Leagues career WAR figures from Seamheads reflect incomplete records (coverage ranges from 35% to 72%). This means career WAR, and therefore estimated JAWS, systematically underestimates the true talent of Negro Leagues players compared to MLB players with complete records.",
    "The estimatedJAWS approximation (career WAR * 0.75) is a rough heuristic. Actual JAWS requires per-season WAR breakdowns not available from the Seamheads all-time view.",
    "Several key candidates (Rap Dixon, John Donaldson, Vic Harris, Spottswood Poles) are not in the Ch 10 top 50 and have null career WAR. Their historian advocacy is documented but their statistical case cannot be quantified from the available data.",
    "The JAWS bar comparison reveals a fundamental problem: the MLB JAWS standard is computed from players with 100% of career games documented. Negro Leagues players with 40-70% coverage will always appear below the bar in raw career WAR, even if their per-game production matches or exceeds inducted players. This is why rateWAR (per-600-PA or per-200-IP WAR rate) may be a more equitable comparison.",
    "2026-05-25: Removed Dick Redding from inducted list. He was on the 2006 Special Committee ballot (39 candidates) but was NOT among the 17 elected. Source: FanGraphs, SABR BioProject."
  ]
};

window.HOF_PROBABILITY = {
  metadata: {
    title: "Negro Leagues HOF Probability and Era Committee Routing",
    methodology: {
      probability_model: {
        type: "Composite score (not statistical probability)",
        components: {
          rank_percentile: "Position in Rate JAWS leaderboard (40%)",
          war_ratio: "Career WAR / position HOF average (30%)",
          advocacy: "Historian advocacy from 42 for 21 poll (20%)",
          momentum: "Recent committee induction patterns (10%)"
        },
        scale: "0.0 (no case) to 1.0 (overwhelming case)"
      },
      limitations: [
        "Probability is a model output, not a prediction of committee votes.",
        "Career WAR figures carry uncertainty from incomplete records.",
        "Advocacy scoring is binary; intensity of advocacy is not captured.",
        "Era committee routing uses career midpoint, which may not reflect the committee's actual deliberation."
      ]
    },
    total_candidates: 25,
    processed_date: "2026-05-25"
  },
  era_committees: {
    early: {
      name: "Early Baseball Era Committee",
      period: "Pre-1950",
      meets: "Every three years",
      last_cycle: 2024,
      next_cycle: 2027
    },
    classical: {
      name: "Classical Baseball Era Committee",
      period: "1950-1969",
      meets: "Every three years",
      last_cycle: 2025,
      next_cycle: 2028
    }
  },
  candidates: [
    { name: "Dobie Moore", position: "SS", career_war: 37.2, rate_jaws: 10.36, rate_war: 9.01, jaws_rank: 3, hof_probability: 0.739, probability_components: { rank_percentile: 0.971, war_ratio: 0.335, advocacy: true, momentum: 0.5 }, era_committee: "early", next_eligible_cycle: 2027, historian_advocacy: true, confidence: "Modeled" },
    { name: "Lazaro Salazar", position: "1B/P", career_war: 34.3, rate_jaws: 9.14, rate_war: 7.95, jaws_rank: 6, hof_probability: 0.717, probability_components: { rank_percentile: 0.928, war_ratio: 0.321, advocacy: true, momentum: 0.5 }, era_committee: "early", next_eligible_cycle: 2027, historian_advocacy: true, confidence: "Modeled" },
    { name: "John Beckwith", position: "3B", career_war: 28.9, rate_jaws: 7.85, rate_war: 6.83, jaws_rank: 11, hof_probability: 0.669, probability_components: { rank_percentile: 0.855, war_ratio: 0.257, advocacy: true, momentum: 0.5 }, era_committee: "early", next_eligible_cycle: 2027, historian_advocacy: true, confidence: "Modeled" },
    { name: "Dick Lundy", position: "SS", career_war: 36.8, rate_jaws: 6.38, rate_war: 5.55, jaws_rank: 19, hof_probability: 0.645, probability_components: { rank_percentile: 0.739, war_ratio: 0.332, advocacy: true, momentum: 0.5 }, era_committee: "early", next_eligible_cycle: 2027, historian_advocacy: true, confidence: "Modeled" },
    { name: "Wild Bill Wright", position: "CF", career_war: 33.2, rate_jaws: 6.08, rate_war: 5.29, jaws_rank: 21, hof_probability: 0.62, probability_components: { rank_percentile: 0.71, war_ratio: 0.285, advocacy: true, momentum: 0.5 }, era_committee: "early", next_eligible_cycle: 2027, historian_advocacy: true, confidence: "Modeled" },
    { name: "Ramon Bragana", position: "P", career_war: 44.5, rate_jaws: 5.51, rate_war: 4.79, jaws_rank: 27, hof_probability: 0.617, probability_components: { rank_percentile: 0.623, war_ratio: 0.391, advocacy: true, momentum: 0.5 }, era_committee: "early", next_eligible_cycle: 2027, historian_advocacy: true, confidence: "Modeled" },
    { name: "Hurley McNair", position: "RF", career_war: 29.5, rate_jaws: 5.37, rate_war: 4.67, jaws_rank: 28, hof_probability: 0.572, probability_components: { rank_percentile: 0.609, war_ratio: 0.26, advocacy: true, momentum: 0.5 }, era_committee: "early", next_eligible_cycle: 2027, historian_advocacy: true, confidence: "Modeled" },
    { name: "William Bell", position: "P", career_war: 36.0, rate_jaws: 4.78, rate_war: 4.16, jaws_rank: 34, hof_probability: 0.554, probability_components: { rank_percentile: 0.522, war_ratio: 0.316, advocacy: true, momentum: 0.5 }, era_committee: "early", next_eligible_cycle: 2027, historian_advocacy: true, confidence: "Modeled" },
    { name: "Bill Byrd", position: "P", career_war: 31.1, rate_jaws: 4.89, rate_war: 4.25, jaws_rank: 32, hof_probability: 0.552, probability_components: { rank_percentile: 0.551, war_ratio: 0.273, advocacy: true, momentum: 0.5 }, era_committee: "early", next_eligible_cycle: 2027, historian_advocacy: true, confidence: "Modeled" },
    { name: "George Scales", position: "2B", career_war: 27.0, rate_jaws: 5.15, rate_war: 4.48, jaws_rank: 31, hof_probability: 0.547, probability_components: { rank_percentile: 0.565, war_ratio: 0.236, advocacy: true, momentum: 0.5 }, era_committee: "early", next_eligible_cycle: 2027, historian_advocacy: true, confidence: "Modeled" },
    { name: "Dick Redding", position: "P", career_war: 39.9, rate_jaws: 3.91, rate_war: 3.4, jaws_rank: 41, hof_probability: 0.523, probability_components: { rank_percentile: 0.42, war_ratio: 0.351, advocacy: true, momentum: 0.5 }, era_committee: "early", next_eligible_cycle: 2027, historian_advocacy: true, confidence: "Modeled" },
    { name: "Eustaquio Pedroso", position: "1B", career_war: 40.3, rate_jaws: null, rate_war: null, jaws_rank: 45, hof_probability: 0.508, probability_components: { rank_percentile: 0.362, war_ratio: 0.377, advocacy: true, momentum: 0.5 }, era_committee: "early", next_eligible_cycle: 2027, historian_advocacy: true, confidence: "Modeled" },
    { name: "Carlos Moran", position: "3B", career_war: 32.7, rate_jaws: 8.57, rate_war: 7.45, jaws_rank: 8, hof_probability: 0.497, probability_components: { rank_percentile: 0.899, war_ratio: 0.29, advocacy: false, momentum: 0.5 }, era_committee: "early", next_eligible_cycle: 2027, historian_advocacy: false, confidence: "Modeled" },
    { name: "Newt Allen", position: "2B", career_war: 37.8, rate_jaws: null, rate_war: null, jaws_rank: 46, hof_probability: 0.488, probability_components: { rank_percentile: 0.348, war_ratio: 0.331, advocacy: true, momentum: 0.5 }, era_committee: "early", next_eligible_cycle: 2027, historian_advocacy: true, confidence: "Modeled" },
    { name: "Sam Bankhead", position: "SS", career_war: 30.5, rate_jaws: null, rate_war: null, jaws_rank: 47, hof_probability: 0.466, probability_components: { rank_percentile: 0.333, war_ratio: 0.275, advocacy: true, momentum: 0.5 }, era_committee: "early", next_eligible_cycle: 2027, historian_advocacy: true, confidence: "Modeled" },
    { name: "Jesus Valenzuela", position: "P", career_war: 35.6, rate_jaws: 5.24, rate_war: 4.56, jaws_rank: 29, hof_probability: 0.382, probability_components: { rank_percentile: 0.594, war_ratio: 0.313, advocacy: false, momentum: 0.5 }, era_committee: "early", next_eligible_cycle: 2027, historian_advocacy: false, confidence: "Modeled" },
    { name: "Juan Padron", position: "P", career_war: 33.0, rate_jaws: 5.18, rate_war: 4.5, jaws_rank: 30, hof_probability: 0.369, probability_components: { rank_percentile: 0.58, war_ratio: 0.29, advocacy: false, momentum: 0.5 }, era_committee: "early", next_eligible_cycle: 2027, historian_advocacy: false, confidence: "Modeled" },
    { name: "Carlos Royer", position: "P", career_war: 28.6, rate_jaws: 4.84, rate_war: 4.21, jaws_rank: 33, hof_probability: 0.34, probability_components: { rank_percentile: 0.536, war_ratio: 0.251, advocacy: false, momentum: 0.5 }, era_committee: "early", next_eligible_cycle: 2027, historian_advocacy: false, confidence: "Modeled" },
    { name: "Nip Winters", position: "P", career_war: 29.7, rate_jaws: 4.66, rate_war: 4.05, jaws_rank: 35, hof_probability: 0.331, probability_components: { rank_percentile: 0.507, war_ratio: 0.261, advocacy: false, momentum: 0.5 }, era_committee: "early", next_eligible_cycle: 2027, historian_advocacy: false, confidence: "Modeled" },
    { name: "Barney Brown", position: "P", career_war: 28.0, rate_jaws: 4.36, rate_war: 3.79, jaws_rank: 38, hof_probability: 0.309, probability_components: { rank_percentile: 0.464, war_ratio: 0.246, advocacy: false, momentum: 0.5 }, era_committee: "early", next_eligible_cycle: 2027, historian_advocacy: false, confidence: "Modeled" },
    { name: "Jose Munoz", position: "P", career_war: 30.8, rate_jaws: 3.85, rate_war: 3.35, jaws_rank: 42, hof_probability: 0.294, probability_components: { rank_percentile: 0.406, war_ratio: 0.271, advocacy: false, momentum: 0.5 }, era_committee: "early", next_eligible_cycle: 2027, historian_advocacy: false, confidence: "Modeled" },
    { name: "Leroy Matlock", position: "P", career_war: 26.2, rate_jaws: 4.11, rate_war: 3.57, jaws_rank: 40, hof_probability: 0.293, probability_components: { rank_percentile: 0.435, war_ratio: 0.23, advocacy: false, momentum: 0.5 }, era_committee: "early", next_eligible_cycle: 2027, historian_advocacy: false, confidence: "Modeled" },
    { name: "Bill Holland", position: "P", career_war: 30.2, rate_jaws: 3.58, rate_war: 3.11, jaws_rank: 43, hof_probability: 0.286, probability_components: { rank_percentile: 0.391, war_ratio: 0.265, advocacy: false, momentum: 0.5 }, era_committee: "early", next_eligible_cycle: 2027, historian_advocacy: false, confidence: "Modeled" },
    { name: "Pelayo Chacon", position: "SS", career_war: 27.4, rate_jaws: null, rate_war: null, jaws_rank: 48, hof_probability: 0.252, probability_components: { rank_percentile: 0.319, war_ratio: 0.247, advocacy: false, momentum: 0.5 }, era_committee: "early", next_eligible_cycle: 2027, historian_advocacy: false, confidence: "Modeled" },
    { name: "Henry McHenry", position: "P", career_war: 27.2, rate_jaws: null, rate_war: null, jaws_rank: 49, hof_probability: 0.243, probability_components: { rank_percentile: 0.304, war_ratio: 0.239, advocacy: false, momentum: 0.5 }, era_committee: "early", next_eligible_cycle: 2027, historian_advocacy: false, confidence: "Modeled" }
  ]
};

window.HOF_COMMITTEE_2006 = {
  _metadata: {
    title: "2006 Special Committee on Negro Leagues: Complete Ballot",
    sources: [
      { id: "baseballhall-2006", name: "Baseball Hall of Fame: Historic 2006 Election" },
      { id: "wikipedia-2006", name: "2006 Baseball Hall of Fame balloting (Wikipedia)" },
      { id: "bbref-2006", name: "Baseball Reference BR Bullpen: Special Committee on the Negro Leagues" },
      { id: "baseballhall-reflect", name: "Baseball Hall of Fame: Committee Members Reflect on 2006 Election" }
    ],
    process: {
      initial_pool: 94,
      ballot_candidates: 39,
      elected: 17,
      not_elected: 22,
      threshold: "75% of 12 voters (9 votes)",
      date: "2006-02-27",
      location: "Tampa, Florida",
      chair: "Fay Vincent (non-voting)",
      voters: [
        "Todd Bolton", "Greg Bond", "Adrian Burgos", "Dick Clark",
        "Ray Doswell", "Leslie Heaphy", "Larry Hogan", "Larry Lester",
        "Sammy Miller", "Jim Overmyer", "Robert Peterson", "Rob Ruck"
      ],
      funding: "MLB granted $250,000 in 2000 to fund a comprehensive study of African Americans in baseball (1860-1960). Research produced an 800-page narrative and statistical database covering 3,000 day-by-day records from 128 newspapers."
    },
    confidence: "Documented",
    generated: "2026-05-24"
  },
  inducted: [
    { name: "Ray Brown", position: "P", era: "Negro Leagues", years: "1931-1946", role: "player", ch10_id: 12, ch10_careerWAR: 47.7 },
    { name: "Willard Brown", position: "OF", era: "Negro Leagues", years: "1935-1948", role: "player", ch10_id: 29, ch10_careerWAR: 33.4 },
    { name: "Andy Cooper", position: "P", era: "Negro Leagues", years: "1920-1939", role: "player", ch10_id: 49, ch10_careerWAR: 25.9 },
    { name: "Frank Grant", position: "2B", era: "Pre-Negro Leagues", years: "1886-1903", role: "player", ch10_id: null, ch10_careerWAR: null },
    { name: "Pete Hill", position: "CF", era: "Pre-Negro Leagues", years: "1904-1925", role: "player", ch10_id: 15, ch10_careerWAR: 45.2 },
    { name: "Biz Mackey", position: "C", era: "Negro Leagues", years: "1920-1947", role: "player", ch10_id: 41, ch10_careerWAR: 28.9 },
    { name: "Effa Manley", position: null, era: "Negro Leagues", years: null, role: "executive", ch10_id: null, ch10_careerWAR: null, note: "Owner, Newark Eagles. First woman elected to the Hall of Fame." },
    { name: "Jose Mendez", position: "P", era: "Pre-Negro Leagues", years: "1907-1926", role: "player", ch10_id: 11, ch10_careerWAR: 49.1 },
    { name: "Alex Pompez", position: null, era: "Negro Leagues", years: null, role: "executive", ch10_id: null, ch10_careerWAR: null, note: "Owner, New York Cubans." },
    { name: "Cumberland Posey", position: null, era: "Negro Leagues", years: null, role: "executive", ch10_id: null, ch10_careerWAR: null, note: "Owner and manager, Homestead Grays." },
    { name: "Louis Santop", position: "C", era: "Pre-Negro Leagues", years: "1909-1926", role: "player", ch10_id: null, ch10_careerWAR: null },
    { name: "Mule Suttles", position: "1B", era: "Negro Leagues", years: "1923-1944", role: "player", ch10_id: 19, ch10_careerWAR: 38.3 },
    { name: "Ben Taylor", position: "1B", era: "Pre-Negro Leagues", years: "1909-1929", role: "player", ch10_id: 27, ch10_careerWAR: 34.3 },
    { name: "Cristobal Torriente", position: "CF", era: "Negro Leagues", years: "1912-1932", role: "player", ch10_id: 5, ch10_careerWAR: 60.0 },
    { name: "Sol White", position: null, era: "Pre-Negro Leagues", years: null, role: "pioneer", ch10_id: null, ch10_careerWAR: null, note: "Player, manager, executive, and historian. Author of the first history of Black baseball." },
    { name: "J.L. Wilkinson", position: null, era: "Negro Leagues", years: null, role: "executive", ch10_id: null, ch10_careerWAR: null, note: "Owner, Kansas City Monarchs." },
    { name: "Jud Wilson", position: "3B", era: "Negro Leagues", years: "1922-1945", role: "player", ch10_id: 13, ch10_careerWAR: 46.9 }
  ],
  not_inducted: [
    { name: "Newt Allen", position: "2B", years: "1922-1947", ch10_id: 21, ch10_careerWAR: 37.8, subsequent_status: "Not inducted. Ranked 9th by 42 for 21 Committee." },
    { name: "John Beckwith", position: "3B", years: "1919-1937", ch10_id: 40, ch10_careerWAR: 28.9, subsequent_status: "Not inducted. Ranked 3rd by 42 for 21 Committee. Character clause reportedly influenced vote." },
    { name: "William Bell", position: "P", years: "1923-1937", ch10_id: 24, ch10_careerWAR: 36.0, subsequent_status: "Not inducted." },
    { name: "Chet Brewer", position: "P", years: "1925-1948", ch10_id: null, ch10_careerWAR: null, subsequent_status: "Not inducted." },
    { name: "Bill Byrd", position: "P", years: "1933-1948", ch10_id: 33, ch10_careerWAR: 31.1, subsequent_status: "Not inducted." },
    { name: "Rap Dixon", position: "OF", years: "1922-1937", ch10_id: null, ch10_careerWAR: null, subsequent_status: "Not inducted. Ranked 1st by 42 for 21 Committee." },
    { name: "John Donaldson", position: "P", years: "1908-1940", ch10_id: null, ch10_careerWAR: null, subsequent_status: "Not inducted. On 2024 Classic Baseball Era Committee ballot, not elected. Ranked 4th by 42 for 21 Committee." },
    { name: "Sammy T. Hughes", position: "2B", years: "1930-1946", ch10_id: null, ch10_careerWAR: null, subsequent_status: "Not inducted." },
    { name: "Fats Jenkins", position: "OF", years: "1924-1940", ch10_id: null, ch10_careerWAR: null, subsequent_status: "Not inducted." },
    { name: "Dick Lundy", position: "SS", years: "1916-1937", ch10_id: 23, ch10_careerWAR: 36.8, subsequent_status: "Not inducted. Ranked 6th by 42 for 21 Committee. 100% support in expert poll." },
    { name: "Oliver Marcelle", position: "3B", years: "1918-1934", ch10_id: null, ch10_careerWAR: null, subsequent_status: "Not inducted. Character concerns documented." },
    { name: "Minnie Minoso", position: "OF", years: "1946-1964", ch10_id: null, ch10_careerWAR: null, subsequent_status: "Inducted 2022 via Early Baseball Era Committee. Not primarily a Negro Leagues inductee." },
    { name: "Dobie Moore", position: "SS", years: "1916-1926", ch10_id: 22, ch10_careerWAR: 37.2, subsequent_status: "Not inducted. Career cut short by gunshot wound in 1926." },
    { name: "Alejandro Oms", position: "OF", years: "1917-1946", ch10_id: null, ch10_careerWAR: null, subsequent_status: "Not inducted to Cooperstown. Cuban Baseball Hall of Fame class of 1944." },
    { name: "Buck O'Neil", position: "1B/Manager", years: "1937-1955", ch10_id: null, ch10_careerWAR: null, subsequent_status: "Inducted 2022 via Early Baseball Era Committee. The Hall created the Buck O'Neil Lifetime Achievement Award in part to acknowledge his 2006 exclusion. O'Neil died October 6, 2006." },
    { name: "Red Parnell", position: "3B", years: "1928-1950", ch10_id: null, ch10_careerWAR: null, subsequent_status: "Not inducted." },
    { name: "Spottswood Poles", position: "CF", years: "1906-1923", ch10_id: null, ch10_careerWAR: null, subsequent_status: "Not inducted. Ranked 9th (tied) by 42 for 21 Committee." },
    { name: "Dick Redding", position: "P", years: "1911-1936", ch10_id: 18, ch10_careerWAR: 39.9, subsequent_status: "Not inducted. Ranked 2nd by 42 for 21 Committee. 91.7% support in expert poll." },
    { name: "George Scales", position: "2B", years: "1921-1946", ch10_id: 46, ch10_careerWAR: 27.0, subsequent_status: "Not inducted." },
    { name: "Candy Jim Taylor", position: "3B/Manager", years: "1904-1940", ch10_id: null, ch10_careerWAR: null, subsequent_status: "Not inducted." },
    { name: "C.I. Taylor", position: "Manager", years: "1904-1922", ch10_id: null, ch10_careerWAR: null, subsequent_status: "Not inducted." },
    { name: "Home Run Johnson", position: "SS", years: "1895-1916", ch10_id: null, ch10_careerWAR: null, subsequent_status: "Not inducted. Ranked 8th by 42 for 21 Committee." }
  ],
  summary: {
    total_ballot: 39,
    players_inducted: 12,
    executives_inducted: 4,
    pioneers_inducted: 1,
    not_inducted_players: 18,
    not_inducted_others: 4,
    subsequently_inducted_from_not_elected: 2,
    subsequently_inducted_names: ["Buck O'Neil (2022)", "Minnie Minoso (2022)"],
    still_not_inducted_players_with_strong_cases: [
      "Rap Dixon", "Dick Redding", "John Beckwith", "John Donaldson",
      "Dick Lundy", "Vic Harris", "Newt Allen", "Spottswood Poles",
      "George Scales", "Dobie Moore"
    ]
  }
};
