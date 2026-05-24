// The Breach · the sixteen
// dt: integration date · day: days from Apr 15, 1947 · league: NL|AL
// resistant: held dark past Apr 1955
// passed: names the franchise demonstrably declined or traded away (well-documented refusals only)

window.BREACH_TEAMS = [
  // === NL ===
  { id:"bro", league:"NL", team:"Brooklyn Dodgers",       dt:"Apr 15, 1947", day:0,    player:"Jackie Robinson",
    what:"Ebbets Field, Opening Day. Branch Rickey's decision; Robinson's discipline. 0-for-3, one run scored, one stolen base.",
    passed:"" },
  { id:"nyg", league:"NL", team:"New York Giants",        dt:"Jul 8, 1949",  day:815,  player:"Monte Irvin & Hank Thompson",
    what:"Two on the same day at the Polo Grounds. Irvin was already 30 — eight years past where his career should have started.",
    passed:"" },
  { id:"bsn", league:"NL", team:"Boston Braves",          dt:"Apr 18, 1950", day:1099, player:"Sam Jethroe",
    what:"Already 32. Three full seasons. Rookie of the Year anyway. Hit 35 HR before they sent him to the minors.",
    passed:"" },
  { id:"chc", league:"NL", team:"Chicago Cubs",           dt:"Sep 17, 1953", day:2346, player:"Ernie Banks & Gene Baker",
    what:"Banks would hit five hundred and twelve home runs. The Cubs had passed on him as a 19-year-old Monarch.",
    passed:"Ernie Banks (KC Monarchs, 1950-52)" },
  { id:"pit", league:"NL", team:"Pittsburgh Pirates",     dt:"Apr 13, 1954", day:2555, player:"Curt Roberts",
    what:"Second base. One full season. Branch Rickey ran the front office now — seven years after Brooklyn.",
    passed:"" },
  { id:"stl", league:"NL", team:"St. Louis Cardinals",    dt:"Apr 13, 1954", day:2555, player:"Tom Alston",
    what:"First base. Ninety-one games in four seasons. Stan Musial's team integrated last in the NL except the Phillies.",
    passed:"" },
  { id:"cin", league:"NL", team:"Cincinnati Reds",        dt:"Apr 17, 1954", day:2559, player:"Nino Escalera & Chuck Harmon",
    what:"Escalera pinch-hit in the ninth at Crosley Field. Two pioneers in one box score.",
    passed:"" },
  { id:"phl", league:"NL", team:"Philadelphia Phillies",  dt:"Apr 22, 1957", day:3660, player:"John Kennedy",
    what:"Five games. Two at-bats. No hits. The team had told their PA announcer not to say his name.",
    passed:"" },

  // === AL ===
  { id:"cle", league:"AL", team:"Cleveland Indians",      dt:"Jul 5, 1947",  day:81,   player:"Larry Doby",
    what:"Bill Veeck signed him eleven weeks after Robinson. No minor-league assignment — straight to the majors at 23.",
    passed:"" },
  { id:"slb", league:"AL", team:"St. Louis Browns",       dt:"Jul 17, 1947", day:93,   player:"Hank Thompson & Willard Brown",
    what:"Two together. Brown homered, the only one of his 21 AL games. Both released within six weeks.",
    passed:"" },
  { id:"chw", league:"AL", team:"Chicago White Sox",      dt:"May 1, 1951",  day:1477, player:"Minnie Miñoso",
    what:"Cuban League star, already 25 by debut. Acquired from Cleveland. Would play parts of five decades.",
    passed:"" },
  { id:"phi", league:"AL", team:"Philadelphia Athletics", dt:"Sep 13, 1953", day:2342, player:"Bob Trice",
    what:"Pitched three seasons. Career total: nine wins. Connie Mack had been the manager since 1901.",
    passed:"" },
  { id:"was", league:"AL", team:"Washington Senators",    dt:"Sep 6, 1954",  day:2701, player:"Carlos Paula",
    what:"Cuban outfielder. Three seasons, then released. Calvin Griffith would later move the team to Minneapolis and tell a Lions Club it was because of \"the Black people there.\"",
    passed:"" },
  // === Resistant: lit after Apr 1955 ===
  { id:"nyy", league:"AL", team:"New York Yankees",       dt:"Apr 14, 1955", day:2921, player:"Elston Howard", resistant:true,
    what:"Catcher. The Yankees won six pennants between Robinson's debut and Howard's. Casey Stengel called him \"my Eight-ball.\"",
    passed:"Vic Power · Artie Wilson · Ruben Gomez" },
  { id:"det", league:"AL", team:"Detroit Tigers",         dt:"Jun 6, 1958",  day:4070, player:"Ozzie Virgil Sr.", resistant:true,
    what:"Dominican-born infielder. Acquired from the Giants. The Tigers' owner Walter Briggs had reportedly said no Black player would wear his uniform.",
    passed:"Larry Doby (declined trade)" },
  { id:"bos", league:"AL", team:"Boston Red Sox",         dt:"Jul 21, 1959", day:4480, player:"Pumpsie Green", resistant:true,
    what:"Pinch runner at Comiskey Park. Twelve years, three months, six days after Robinson. Tom Yawkey had owned the team the entire time.",
    passed:"Jackie Robinson (1945 tryout, declined) · Willie Mays (1949 tryout, declined) · Billy Williams" },
];
