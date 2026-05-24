// The Numbers They Kept -- five categories, players positioned by stat value
// Generated from pipeline/output/leaderboards.json (real Lahman + Retrosheet data)
// league: "mlb" or "nl"  ·  v: numeric value used for position
// year: season for season-level stats

window.LANES = [
  {
    cat: "Career batting average",
    unit: "AVG",
    min: 0.346, max: 0.404,
    fmt: v => "." + Math.round(v * 1000).toString().padStart(3, "0"),
    players: [
      { name: "Josh Gibson",           league: "nl",  v: 0.4017 },
      { name: "Willard Brown",         league: "nl",  v: 0.3935 },
      { name: "Buck Leonard",          league: "nl",  v: 0.3744 },
      { name: "Ty Cobb",               league: "mlb", v: 0.3664 },
      { name: "Ross Barnes",           league: "mlb", v: 0.3591 },
      { name: "Rogers Hornsby",        league: "mlb", v: 0.3585 },
      { name: "Monte Irvin",           league: "nl",  v: 0.3574 },
      { name: "Shoeless Joe Jackson",  league: "mlb", v: 0.3558 },
      { name: "Lefty O'Doul",          league: "mlb", v: 0.3493 },
      { name: "Willie Wells",          league: "nl",  v: 0.3482 }
    ]
  },
  {
    cat: "Single-season AVG",
    unit: "AVG \u00b7 1 year",
    min: 0.419, max: 0.523,
    fmt: v => "." + Math.round(v * 1000).toString().padStart(3, "0"),
    players: [
      { name: "Willard Brown",         league: "nl",  v: 0.5179, year: 1948 },
      { name: "Josh Gibson",           league: "nl",  v: 0.5116, year: 1943 },
      { name: "Monte Irvin",           league: "nl",  v: 0.4416, year: 1941 },
      { name: "Hugh Duffy",            league: "mlb", v: 0.4397, year: 1894 },
      { name: "Tip O'Neill",           league: "mlb", v: 0.4352, year: 1887 },
      { name: "Ross Barnes",           league: "mlb", v: 0.4323, year: 1872 },
      { name: "Ross Barnes",           league: "mlb", v: 0.4286, year: 1876 },
      { name: "Nap Lajoie",            league: "mlb", v: 0.4265, year: 1901 },
      { name: "Ross Barnes",           league: "mlb", v: 0.4255, year: 1873 },
      { name: "Willie Keeler",         league: "mlb", v: 0.4238, year: 1897 }
    ]
  },
  {
    cat: "Career slugging",
    unit: "SLG",
    min: 0.579, max: 0.792,
    fmt: v => "." + Math.round(v * 1000).toString().padStart(3, "0"),
    players: [
      { name: "Josh Gibson",           league: "nl",  v: 0.7819 },
      { name: "Willard Brown",         league: "nl",  v: 0.7016 },
      { name: "Babe Ruth",             league: "mlb", v: 0.6898 },
      { name: "Buck Leonard",          league: "nl",  v: 0.6726 },
      { name: "Ted Williams",          league: "mlb", v: 0.6338 },
      { name: "Lou Gehrig",            league: "mlb", v: 0.6324 },
      { name: "Jimmie Foxx",           league: "mlb", v: 0.6093 },
      { name: "Barry Bonds",           league: "mlb", v: 0.6069 },
      { name: "Hank Greenberg",        league: "mlb", v: 0.605 },
      { name: "Mark McGwire",          league: "mlb", v: 0.5882 }
    ]
  },
  {
    cat: "Career OPS",
    unit: "OPS",
    min: 0.994, max: 1.286,
    fmt: v => v.toFixed(3),
    players: [
      { name: "Josh Gibson",           league: "nl",  v: 1.2727 },
      { name: "Babe Ruth",             league: "mlb", v: 1.1616 },
      { name: "Buck Leonard",          league: "nl",  v: 1.1477 },
      { name: "Willard Brown",         league: "nl",  v: 1.1358 },
      { name: "Ted Williams",          league: "mlb", v: 1.1144 },
      { name: "Lou Gehrig",            league: "mlb", v: 1.0772 },
      { name: "Barry Bonds",           league: "mlb", v: 1.0497 },
      { name: "Jimmie Foxx",           league: "mlb", v: 1.0368 },
      { name: "Hank Greenberg",        league: "mlb", v: 1.0153 },
      { name: "Rogers Hornsby",        league: "mlb", v: 1.0073 }
    ]
  },
  {
    cat: "Single-season OPS",
    unit: "OPS \u00b7 1 year",
    min: 1.279, max: 1.603,
    fmt: v => v.toFixed(3),
    players: [
      { name: "Willard Brown",         league: "nl",  v: 1.5878, year: 1948 },
      { name: "Josh Gibson",           league: "nl",  v: 1.561,  year: 1943 },
      { name: "Barry Bonds",           league: "mlb", v: 1.4217, year: 2004 },
      { name: "Babe Ruth",             league: "mlb", v: 1.3818, year: 1920 },
      { name: "Barry Bonds",           league: "mlb", v: 1.3807, year: 2002 },
      { name: "Barry Bonds",           league: "mlb", v: 1.3785, year: 2001 },
      { name: "Babe Ruth",             league: "mlb", v: 1.3586, year: 1921 },
      { name: "Babe Ruth",             league: "mlb", v: 1.3089, year: 1923 },
      { name: "Buck Leonard",          league: "nl",  v: 1.2994, year: 1941 },
      { name: "Josh Gibson",           league: "nl",  v: 1.2935, year: 1936 }
    ]
  }
];
