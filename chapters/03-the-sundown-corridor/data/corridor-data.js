// ==========================================================================
// Chapter 03: The Sundown Corridor -- Data
// ==========================================================================
// Sundown towns source: Nardos et al., "A national data set of historical
//   US sundown towns for quantitative analysis." Scientific Data 12 (2025).
//   DOI: 10.1038/s41597-024-04330-9 | Repository: https://osf.io/fh7r6/
// Coordinates: US Census Bureau 2020 Gazetteer Files (Public Domain)
// Game locations: Seamheads Negro Leagues Database, SABR Ballparks Database
// License: CC-BY (sundown data), Public Domain (Census)
// Pipeline: sundown_linked_to_census.csv -> Census Gazetteer GJOIN join
//           -> Albers-fitted SVG projection (quadratic fit, 16 control points)
// Generated: 2026-05-24
// ==========================================================================

// Negro Leagues ballpark locations (hand-placed SVG positions)
// Source: Seamheads Negro Leagues Database, SABR Ballparks Database
var PARKS = [{"city":"Kansas City, MO","x":508,"y":234},{"city":"St. Louis, MO","x":590,"y":249},{"city":"Chicago, IL","x":620,"y":178},{"city":"Pittsburgh, PA","x":740,"y":200},{"city":"Cleveland, OH","x":715,"y":185},{"city":"Detroit, MI","x":700,"y":162},{"city":"Cincinnati, OH","x":685,"y":224},{"city":"Indianapolis, IN","x":655,"y":220},{"city":"Philadelphia, PA","x":828,"y":198},{"city":"Newark, NJ","x":852,"y":182},{"city":"New York, NY","x":860,"y":178},{"city":"Baltimore, MD","x":810,"y":207},{"city":"Washington, D.C.","x":803,"y":222},{"city":"Birmingham, AL","x":633,"y":349},{"city":"Memphis, TN","x":588,"y":327},{"city":"Atlanta, GA","x":673,"y":351}];

// Documented sundown towns -- 2263 towns in SVG viewport
// Evidence: C=Confirmed ("Surely" in source), P=Probable, Q=Possible
// Source: Scientific Data (2025), DOI: 10.1038/s41597-024-04330-9
var SUNDOWN = [
{name:"Arab",state:"AL",x:642,y:337,ev:"C"},
{name:"Chickasaw",state:"AL",x:600,y:424,ev:"P"},
{name:"Cullman",state:"AL",x:636,y:341,ev:"C"},
{name:"Cullman County",state:"AL",x:635,y:342,ev:"C"},
{name:"Dixie",state:"AL",x:623,y:411,ev:"Q"},
{name:"Fyffe",state:"AL",x:652,y:333,ev:"Q"},
{name:"Good Hope",state:"AL",x:635,y:343,ev:"P"},
{name:"Hanceville",state:"AL",x:637,y:344,ev:"P"},
{name:"Hokes Bluff",state:"AL",x:651,y:343,ev:"P"},
{name:"Nauvoo",state:"AL",x:625,y:347,ev:"C"},
{name:"Oneonta",state:"AL",x:641,y:346,ev:"P"},
{name:"Orange Beach",state:"AL",x:604,y:434,ev:"P"},
{name:"Sand Mountain",state:"AL",x:629,y:372,ev:"C"},
{name:"Vestavia Hills",state:"AL",x:635,y:357,ev:"Q"},
{name:"West Point",state:"AL",x:634,y:340,ev:"P"},
{name:"Winston County",state:"AL",x:628,y:343,ev:"P"},
{name:"Bisbee",state:"AZ",x:271,y:425,ev:"P"},
{name:"Duncan",state:"AZ",x:286,y:387,ev:"C"},
{name:"Globe",state:"AZ",x:260,y:365,ev:"P"},
{name:"Kingman",state:"AZ",x:205,y:305,ev:"P"},
{name:"Prescott",state:"AZ",x:232,y:327,ev:"P"},
{name:"Scottsdale",state:"AZ",x:242,y:355,ev:"P"},
{name:"Sun City",state:"AZ",x:236,y:356,ev:"Q"},
{name:"Youngtown",state:"AZ",x:235,y:357,ev:"Q"},
{name:"Altus",state:"AR",x:530,y:321,ev:"P"},
{name:"Amity",state:"AR",x:533,y:349,ev:"P"},
{name:"Ash Flat",state:"AR",x:565,y:301,ev:"P"},
{name:"Bauxite",state:"AR",x:548,y:341,ev:"P"},
{name:"Baxter County",state:"AR",x:553,y:300,ev:"P"},
{name:"Black Rock",state:"AR",x:573,y:303,ev:"P"},
{name:"Bonanza",state:"AR",x:519,y:326,ev:"C"},
{name:"Booneville",state:"AR",x:527,y:328,ev:"C"},
{name:"Bradford",state:"AR",x:566,y:319,ev:"P"},
{name:"Brookland",state:"AR",x:581,y:307,ev:"P"},
{name:"Cabot",state:"AR",x:557,y:331,ev:"Q"},
{name:"Calico Rock",state:"AR",x:556,y:304,ev:"P"},
{name:"Cammack Village",state:"AR",x:551,y:336,ev:"P"},
{name:"Clay County",state:"AR",x:584,y:296,ev:"C"},
{name:"Cleburne County",state:"AR",x:557,y:317,ev:"P"},
{name:"Cotter",state:"AR",x:550,y:300,ev:"P"},
{name:"Decatur",state:"AR",x:519,y:299,ev:"P"},
{name:"Delight",state:"AR",x:531,y:355,ev:"Q"},
{name:"Diamond City",state:"AR",x:544,y:296,ev:"P"},
{name:"Dierks",state:"AR",x:524,y:353,ev:"P"},
{name:"Dover",state:"AR",x:540,y:322,ev:"P"},
{name:"Dyer",state:"AR",x:524,y:320,ev:"P"},
{name:"Dyess",state:"AR",x:586,y:314,ev:"C"},
{name:"Elkins",state:"AR",x:526,y:307,ev:"P"},
{name:"Elm Springs",state:"AR",x:522,y:303,ev:"P"},
{name:"Etowah",state:"AR",x:586,y:311,ev:"P"},
{name:"Eureka Springs",state:"AR",x:530,y:298,ev:"P"},
{name:"Evening Shade",state:"AR",x:564,y:304,ev:"C"},
{name:"Fairfield Bay",state:"AR",x:554,y:316,ev:"P"},
{name:"Fouke",state:"AR",x:523,y:374,ev:"C"},
{name:"Gentry",state:"AR",x:518,y:301,ev:"P"},
{name:"Glenwood",state:"AR",x:532,y:348,ev:"P"},
{name:"Goshen",state:"AR",x:526,y:305,ev:"P"},
{name:"Grannis",state:"AR",x:519,y:351,ev:"P"},
{name:"Gravette",state:"AR",x:520,y:297,ev:"P"},
{name:"Greenway",state:"AR",x:587,y:297,ev:"P"},
{name:"Greenwood",state:"AR",x:522,y:327,ev:"P"},
{name:"Greers Ferry",state:"AR",x:555,y:316,ev:"Q"},
{name:"Grubbs",state:"AR",x:573,y:314,ev:"P"},
{name:"Hardy",state:"AR",x:567,y:298,ev:"P"},
{name:"Harrison",state:"AR",x:540,y:301,ev:"C"},
{name:"Hillcrest",state:"AR",x:535,y:318,ev:"P"},
{name:"Imboden",state:"AR",x:571,y:301,ev:"P"},
{name:"Johnson",state:"AR",x:523,y:304,ev:"Q"},
{name:"Kibler",state:"AR",x:522,y:321,ev:"P"},
{name:"Lacrosse",state:"AR",x:561,y:304,ev:"Q"},
{name:"Lamar",state:"AR",x:535,y:321,ev:"P"},
{name:"Lavaca",state:"AR",x:523,y:324,ev:"P"},
{name:"Leachville",state:"AR",x:586,y:307,ev:"P"},
{name:"Leslie",state:"AR",x:549,y:311,ev:"P"},
{name:"Little Flock",state:"AR",x:524,y:298,ev:"Q"},
{name:"London",state:"AR",x:538,y:323,ev:"Q"},
{name:"Magazine",state:"AR",x:529,y:328,ev:"P"},
{name:"Magnet Cove",state:"AR",x:543,y:344,ev:"P"},
{name:"Manila",state:"AR",x:587,y:307,ev:"P"},
{name:"Marion County",state:"AR",x:547,y:301,ev:"P"},
{name:"Marshall",state:"AR",x:548,y:309,ev:"P"},
{name:"Mena",state:"AR",x:521,y:342,ev:"C"},
{name:"Mount Ida",state:"AR",x:531,y:342,ev:"C"},
{name:"Mountain Home",state:"AR",x:552,y:299,ev:"P"},
{name:"Mountain View",state:"AR",x:556,y:310,ev:"P"},
{name:"Mt. Ida",state:"AR",x:531,y:342,ev:"P"},
{name:"Mulberry",state:"AR",x:525,y:319,ev:"P"},
{name:"Newton County",state:"AR",x:539,y:309,ev:"P"},
{name:"Oak Grove Heights",state:"AR",x:582,y:302,ev:"P"},
{name:"Oakland",state:"AR",x:549,y:296,ev:"Q"},
{name:"Oppelo",state:"AR",x:545,y:328,ev:"P"},
{name:"Oxford",state:"AR",x:560,y:301,ev:"P"},
{name:"Ozark",state:"AR",x:528,y:319,ev:"P"},
{name:"Pangburn",state:"AR",x:560,y:320,ev:"P"},
{name:"Paragould",state:"AR",x:582,y:304,ev:"C"},
{name:"Perryville",state:"AR",x:544,y:330,ev:"P"},
{name:"Piggott",state:"AR",x:587,y:296,ev:"P"},
{name:"Portia",state:"AR",x:573,y:304,ev:"P"},
{name:"Pottsville",state:"AR",x:541,y:325,ev:"Q"},
{name:"Provo",state:"AR",x:522,y:355,ev:"C"},
{name:"Quitman",state:"AR",x:554,y:321,ev:"P"},
{name:"Rogers",state:"AR",x:524,y:300,ev:"C"},
{name:"Scott County",state:"AR",x:524,y:335,ev:"P"},
{name:"Sheridan",state:"AR",x:549,y:347,ev:"C"},
{name:"Siloam Springs",state:"AR",x:518,y:303,ev:"P"},
{name:"Springdale",state:"AR",x:524,y:303,ev:"C"},
{name:"St. Francis",state:"AR",x:588,y:294,ev:"P"},
{name:"Stone County",state:"AR",x:556,y:310,ev:"P"},
{name:"Subiaco",state:"AR",x:531,y:324,ev:"Q"},
{name:"Sulphur Springs",state:"AR",x:519,y:296,ev:"P"},
{name:"Taylor",state:"AR",x:530,y:378,ev:"Q"},
{name:"Van Buren",state:"AR",x:550,y:317,ev:"P"},
{name:"Waldron",state:"AR",x:524,y:334,ev:"C"},
{name:"Wickes",state:"AR",x:519,y:349,ev:"P"},
{name:"Williford",state:"AR",x:569,y:300,ev:"P"},
{name:"Anaheim",state:"CA",x:148,y:334,ev:"Q"},
{name:"Antioch",state:"CA",x:62,y:192,ev:"C"},
{name:"Arcadia",state:"CA",x:143,y:325,ev:"Q"},
{name:"Arcata",state:"CA",x:-2,y:93,ev:"C"},
{name:"Arroyo Grande",state:"CA",x:99,y:285,ev:"C"},
{name:"Azusa",state:"CA",x:145,y:325,ev:"P"},
{name:"Bakersfield",state:"CA",x:123,y:284,ev:"P"},
{name:"Bayshore City",state:"CA",x:54,y:197,ev:"Q"},
{name:"Berkeley",state:"CA",x:55,y:193,ev:"Q"},
{name:"Bishop",state:"CA",x:123,y:226,ev:"P"},
{name:"Brea",state:"CA",x:146,y:332,ev:"C"},
{name:"Buena Park",state:"CA",x:144,y:334,ev:"Q"},
{name:"Burbank",state:"CA",x:138,y:322,ev:"C"},
{name:"Burlingame",state:"CA",x:56,y:201,ev:"P"},
{name:"Cerritos",state:"CA",x:143,y:333,ev:"Q"},
{name:"Chester",state:"CA",x:52,y:125,ev:"P"},
{name:"Chico",state:"CA",x:47,y:138,ev:"C"},
{name:"Compton",state:"CA",x:141,y:332,ev:"C"},
{name:"Corning",state:"CA",x:40,y:131,ev:"P"},
{name:"Costa Mesa",state:"CA",x:146,y:340,ev:"Q"},
{name:"Crescent City",state:"CA",x:-15,y:65,ev:"C"},
{name:"Culver City",state:"CA",x:138,y:328,ev:"C"},
{name:"Del Norte County",state:"CA",x:-11,y:67,ev:"C"},
{name:"Dutch Flat",state:"CA",x:69,y:160,ev:"C"},
{name:"East Palo Alto",state:"CA",x:60,y:206,ev:"P"},
{name:"Escondido",state:"CA",x:160,y:359,ev:"Q"},
{name:"Eureka",state:"CA",x:-3,y:94,ev:"C"},
{name:"Fillmore",state:"CA",x:128,y:314,ev:"Q"},
{name:"Folsom",state:"CA",x:68,y:175,ev:"C"},
{name:"Fontana",state:"CA",x:152,y:328,ev:"P"},
{name:"Fresno",state:"CA",x:104,y:238,ev:"C"},
{name:"Garden Grove",state:"CA",x:145,y:336,ev:"P"},
{name:"Glendale",state:"CA",x:140,y:323,ev:"C"},
{name:"Grass Valley",state:"CA",x:65,y:158,ev:"P"},
{name:"Hawthorne",state:"CA",x:139,y:331,ev:"C"},
{name:"Hemet",state:"CA",x:161,y:341,ev:"P"},
{name:"Hidden Hills",state:"CA",x:133,y:322,ev:"Q"},
{name:"Holy City",state:"CA",x:65,y:216,ev:"C"},
{name:"Humboldt County",state:"CA",x:2,y:98,ev:"C"},
{name:"Huntington Beach",state:"CA",x:145,y:339,ev:"P"},
{name:"Indian Wells",state:"CA",x:171,y:343,ev:"Q"},
{name:"Inglewood",state:"CA",x:139,y:330,ev:"C"},
{name:"Irvine",state:"CA",x:148,y:340,ev:"P"},
{name:"Kernville",state:"CA",x:131,y:274,ev:"C"},
{name:"Kingsburg",state:"CA",x:109,y:246,ev:"P"},
{name:"La Habra",state:"CA",x:145,y:332,ev:"P"},
{name:"Lafayette",state:"CA",x:58,y:193,ev:"P"},
{name:"Lincoln",state:"CA",x:64,y:168,ev:"C"},
{name:"Lodi",state:"CA",x:70,y:190,ev:"P"},
{name:"Lomita",state:"CA",x:139,y:335,ev:"P"},
{name:"Lynwood",state:"CA",x:141,y:331,ev:"C"},
{name:"Manhattan Beach",state:"CA",x:138,y:331,ev:"C"},
{name:"Marysville",state:"CA",x:57,y:158,ev:"C"},
{name:"Mill Valley",state:"CA",x:50,y:191,ev:"P"},
{name:"Monterey Park",state:"CA",x:142,y:327,ev:"C"},
{name:"Napa",state:"CA",x:52,y:180,ev:"P"},
{name:"Nevada City",state:"CA",x:65,y:157,ev:"P"},
{name:"Newport Beach",state:"CA",x:147,y:342,ev:"C"},
{name:"Nicolaus",state:"CA",x:59,y:165,ev:"C"},
{name:"Norco",state:"CA",x:151,y:333,ev:"C"},
{name:"North Palo Alto",state:"CA",x:61,y:208,ev:"P"},
{name:"Oildale",state:"CA",x:123,y:282,ev:"C"},
{name:"Orange",state:"CA",x:147,y:336,ev:"P"},
{name:"Orange County",state:"CA",x:148,y:340,ev:"C"},
{name:"Orinda",state:"CA",x:57,y:193,ev:"Q"},
{name:"Oroville",state:"CA",x:54,y:148,ev:"P"},
{name:"Palmdale",state:"CA",x:141,y:311,ev:"Q"},
{name:"Palos Verdes Estates",state:"CA",x:138,y:335,ev:"P"},
{name:"Parlier",state:"CA",x:109,y:244,ev:"Q"},
{name:"Pasadena",state:"CA",x:141,y:324,ev:"C"},
{name:"Piedmont",state:"CA",x:56,y:195,ev:"P"},
{name:"Placerville",state:"CA",x:74,y:174,ev:"P"},
{name:"Porterville",state:"CA",x:120,y:262,ev:"Q"},
{name:"Red Bluff",state:"CA",x:36,y:124,ev:"C"},
{name:"Redding",state:"CA",x:30,y:111,ev:"P"},
{name:"Redlands",state:"CA",x:157,y:330,ev:"C"},
{name:"Redwood City",state:"CA",x:59,y:204,ev:"P"},
{name:"Riverside",state:"CA",x:154,y:333,ev:"C"},
{name:"Rocklin",state:"CA",x:65,y:170,ev:"C"},
{name:"Ross",state:"CA",x:50,y:189,ev:"P"},
{name:"San Jacinto",state:"CA",x:161,y:339,ev:"P"},
{name:"San Jose",state:"CA",x:67,y:213,ev:"C"},
{name:"San Juan Capistrano",state:"CA",x:151,y:346,ev:"Q"},
{name:"San Leandro",state:"CA",x:58,y:199,ev:"C"},
{name:"San Marino",state:"CA",x:142,y:325,ev:"C"},
{name:"San Pablo",state:"CA",x:53,y:190,ev:"C"},
{name:"Santa Ana",state:"CA",x:147,y:338,ev:"C"},
{name:"Sawyers Bar",state:"CA",x:9,y:85,ev:"C"},
{name:"Selma",state:"CA",x:108,y:245,ev:"C"},
{name:"Sheridan",state:"CA",x:62,y:164,ev:"C"},
{name:"Sonora",state:"CA",x:86,y:199,ev:"C"},
{name:"South Gate",state:"CA",x:141,y:330,ev:"P"},
{name:"South Pasadena",state:"CA",x:141,y:325,ev:"P"},
{name:"Stanton",state:"CA",x:145,y:335,ev:"Q"},
{name:"Taft",state:"CA",x:118,y:290,ev:"C"},
{name:"Torrance",state:"CA",x:139,y:333,ev:"C"},
{name:"Truckee",state:"CA",x:79,y:159,ev:"C"},
{name:"Visalia",state:"CA",x:114,y:253,ev:"C"},
{name:"Watsonville",state:"CA",x:70,y:225,ev:"C"},
{name:"Westminster",state:"CA",x:145,y:337,ev:"Q"},
{name:"Wheatland",state:"CA",x:61,y:162,ev:"C"},
{name:"Whittier",state:"CA",x:144,y:330,ev:"P"},
{name:"Yorba Linda",state:"CA",x:148,y:333,ev:"Q"},
{name:"Brush",state:"CO",x:354,y:194,ev:"Q"},
{name:"Burlington",state:"CO",x:383,y:221,ev:"Q"},
{name:"Cedaredge",state:"CO",x:290,y:218,ev:"Q"},
{name:"Cherry Hill Village",state:"CO",x:336,y:207,ev:"Q"},
{name:"Colorado Springs",state:"CO",x:343,y:227,ev:"Q"},
{name:"Craig",state:"CO",x:286,y:177,ev:"Q"},
{name:"Delta",state:"CO",x:288,y:222,ev:"Q"},
{name:"Durango",state:"CO",x:298,y:262,ev:"Q"},
{name:"Evans",state:"CO",x:335,y:189,ev:"Q"},
{name:"Fruita",state:"CO",x:275,y:209,ev:"C"},
{name:"Beacon Falls",state:"CT",x:868,y:166,ev:"Q"},
{name:"Bozrah",state:"CT",x:882,y:162,ev:"Q"},
{name:"Burlington",state:"CT",x:869,y:160,ev:"Q"},
{name:"Canterbury",state:"CT",x:885,y:159,ev:"P"},
{name:"Coventry",state:"CT",x:879,y:158,ev:"Q"},
{name:"East Haven",state:"CT",x:871,y:168,ev:"Q"},
{name:"Glastonbury",state:"CT",x:875,y:160,ev:"P"},
{name:"Kent",state:"CT",x:860,y:162,ev:"Q"},
{name:"Lisbon",state:"CT",x:885,y:160,ev:"Q"},
{name:"Litchfield",state:"CT",x:865,y:161,ev:"Q"},
{name:"Madison",state:"CT",x:875,y:166,ev:"P"},
{name:"Middlefield",state:"CT",x:873,y:163,ev:"Q"},
{name:"Montville",state:"CT",x:883,y:163,ev:"Q"},
{name:"Moosup",state:"CT",x:887,y:158,ev:"P"},
{name:"Morris",state:"CT",x:865,y:162,ev:"Q"},
{name:"New Fairfield",state:"CT",x:860,y:166,ev:"P"},
{name:"New Hartford",state:"CT",x:868,y:159,ev:"Q"},
{name:"Old Lyme",state:"CT",x:880,y:166,ev:"Q"},
{name:"Orange",state:"CT",x:868,y:168,ev:"P"},
{name:"Oxford",state:"CT",x:866,y:166,ev:"Q"},
{name:"Plainfield",state:"CT",x:887,y:158,ev:"Q"},
{name:"Portland",state:"CT",x:875,y:162,ev:"Q"},
{name:"Ridgefield",state:"CT",x:860,y:170,ev:"P"},
{name:"Seymour",state:"CT",x:867,y:167,ev:"Q"},
{name:"Sharon",state:"CT",x:860,y:159,ev:"Q"},
{name:"Simsbury",state:"CT",x:871,y:158,ev:"P"},
{name:"Somers",state:"CT",x:877,y:155,ev:"Q"},
{name:"Southington",state:"CT",x:870,y:162,ev:"Q"},
{name:"Stafford",state:"CT",x:879,y:155,ev:"Q"},
{name:"Sterling",state:"CT",x:885,y:156,ev:"P"},
{name:"Thomaston",state:"CT",x:867,y:162,ev:"Q"},
{name:"Thompson",state:"CT",x:887,y:153,ev:"Q"},
{name:"Unionville",state:"CT",x:870,y:160,ev:"Q"},
{name:"Westbrook",state:"CT",x:877,y:166,ev:"Q"},
{name:"Willington",state:"CT",x:881,y:156,ev:"Q"},
{name:"Rehoboth Beach",state:"DE",x:834,y:219,ev:"P"},
{name:"Altha",state:"FL",x:642,y:420,ev:"Q"},
{name:"Cedar Key",state:"FL",x:661,y:446,ev:"C"},
{name:"Daytona Beach Shores",state:"FL",x:691,y:437,ev:"Q"},
{name:"Delray Beach",state:"FL",x:673,y:496,ev:"P"},
{name:"Flagler Beach",state:"FL",x:692,y:430,ev:"Q"},
{name:"Gulfport",state:"FL",x:652,y:478,ev:"Q"},
{name:"Holmes Beach",state:"FL",x:649,y:484,ev:"P"},
{name:"Longboat Key",state:"FL",x:649,y:486,ev:"Q"},
{name:"Melbourne Beach",state:"FL",x:686,y:460,ev:"P"},
{name:"Miami Beach",state:"FL",x:664,y:512,ev:"P"},
{name:"Myakka City",state:"FL",x:655,y:485,ev:"P"},
{name:"Ocoee",state:"FL",x:677,y:453,ev:"P"},
{name:"Old Homosassa",state:"FL",x:664,y:453,ev:"Q"},
{name:"Palm Beach",state:"FL",x:677,y:490,ev:"P"},
{name:"Samsula",state:"FL",x:689,y:440,ev:"Q"},
{name:"Southport",state:"FL",x:633,y:428,ev:"P"},
{name:"St. Cloud",state:"FL",x:677,y:460,ev:"Q"},
{name:"Venice",state:"FL",x:649,y:492,ev:"Q"},
{name:"Winterhaven",state:"FL",x:669,y:466,ev:"Q"},
{name:"Yankeetown",state:"FL",x:664,y:448,ev:"Q"},
{name:"Clayton",state:"GA",x:692,y:318,ev:"Q"},
{name:"Dahlonega",state:"GA",x:682,y:327,ev:"Q"},
{name:"Dawson County",state:"GA",x:679,y:329,ev:"C"},
{name:"Forsyth County",state:"GA",x:678,y:334,ev:"C"},
{name:"Gilmer County",state:"GA",x:675,y:324,ev:"Q"},
{name:"Palmetto",state:"GA",x:667,y:350,ev:"Q"},
{name:"Rabun County",state:"GA",x:692,y:318,ev:"Q"},
{name:"Thomas County",state:"GA",x:662,y:409,ev:"P"},
{name:"Towns County",state:"GA",x:687,y:318,ev:"C"},
{name:"Union County",state:"GA",x:683,y:320,ev:"P"},
{name:"Twin Falls",state:"ID",x:148,y:96,ev:"P"},
{name:"Arcola",state:"IL",x:615,y:222,ev:"C"},
{name:"Arenzville",state:"IL",x:580,y:218,ev:"P"},
{name:"Arlington Heights",state:"IL",x:612,y:172,ev:"P"},
{name:"Arthur",state:"IL",x:612,y:221,ev:"Q"},
{name:"Ashland",state:"IL",x:586,y:218,ev:"C"},
{name:"Ashland",state:"IL",x:586,y:217,ev:"C"},
{name:"Ashley",state:"IL",x:603,y:252,ev:"C"},
{name:"Assumption",state:"IL",x:603,y:226,ev:"C"},
{name:"Athens",state:"IL",x:591,y:216,ev:"C"},
{name:"Atwood",state:"IL",x:612,y:219,ev:"Q"},
{name:"Auburn",state:"IL",x:591,y:225,ev:"P"},
{name:"Ava",state:"IL",x:598,y:261,ev:"C"},
{name:"Aviston",state:"IL",x:596,y:245,ev:"C"},
{name:"Barrington",state:"IL",x:609,y:171,ev:"C"},
{name:"Bartelso",state:"IL",x:598,y:247,ev:"C"},
{name:"Bartlett",state:"IL",x:609,y:174,ev:"Q"},
{name:"Bartonville",state:"IL",x:590,y:202,ev:"P"},
{name:"Beardstown",state:"IL",x:579,y:215,ev:"C"},
{name:"Beaucoup",state:"IL",x:601,y:251,ev:"C"},
{name:"Beckemeyer",state:"IL",x:599,y:246,ev:"C"},
{name:"Beecher",state:"IL",x:621,y:187,ev:"P"},
{name:"Beecher",state:"IL",x:608,y:233,ev:"P"},
{name:"Belknap",state:"IL",x:608,y:274,ev:"C"},
{name:"Bellwood",state:"IL",x:615,y:176,ev:"P"},
{name:"Bensenville",state:"IL",x:613,y:175,ev:"Q"},
{name:"Benton",state:"IL",x:608,y:258,ev:"C"},
{name:"Berwyn",state:"IL",x:616,y:177,ev:"C"},
{name:"Bethany",state:"IL",x:608,y:223,ev:"P"},
{name:"Bloomingdale",state:"IL",x:611,y:175,ev:"Q"},
{name:"Blue Mound",state:"IL",x:602,y:222,ev:"P"},
{name:"Bluford",state:"IL",x:611,y:251,ev:"Q"},
{name:"Bolingbrook",state:"IL",x:612,y:180,ev:"Q"},
{name:"Braidwood",state:"IL",x:611,y:189,ev:"P"},
{name:"Breese",state:"IL",x:597,y:245,ev:"C"},
{name:"Bridgeport",state:"IL",x:626,y:242,ev:"Q"},
{name:"Brookfield",state:"IL",x:615,y:177,ev:"Q"},
{name:"Brown County",state:"IL",x:573,y:216,ev:"C"},
{name:"Brownstown",state:"IL",x:606,y:237,ev:"Q"},
{name:"Buckley",state:"IL",x:617,y:203,ev:"P"},
{name:"Buckner",state:"IL",x:606,y:259,ev:"Q"},
{name:"Buffalo",state:"IL",x:596,y:219,ev:"C"},
{name:"Bunker Hill",state:"IL",x:589,y:236,ev:"C"},
{name:"Bureau",state:"IL",x:592,y:188,ev:"P"},
{name:"Burr Ridge",state:"IL",x:615,y:179,ev:"Q"},
{name:"Calhoun County",state:"IL",x:577,y:234,ev:"C"},
{name:"Campbell Hill",state:"IL",x:598,y:261,ev:"C"},
{name:"Cantrall",state:"IL",x:592,y:217,ev:"Q"},
{name:"Carlinville",state:"IL",x:590,y:231,ev:"P"},
{name:"Carlyle",state:"IL",x:600,y:245,ev:"P"},
{name:"Carmi",state:"IL",x:620,y:256,ev:"Q"},
{name:"Carterville",state:"IL",x:605,y:264,ev:"C"},
{name:"Carthage",state:"IL",x:566,y:206,ev:"P"},
{name:"Cary",state:"IL",x:607,y:169,ev:"P"},
{name:"Casey",state:"IL",x:621,y:230,ev:"C"},
{name:"Catlin",state:"IL",x:624,y:214,ev:"P"},
{name:"Cave-in-Rock",state:"IL",x:620,y:270,ev:"C"},
{name:"Cherry",state:"IL",x:594,y:185,ev:"Q"},
{name:"Chester",state:"IL",x:593,y:261,ev:"Q"},
{name:"Chillicothe",state:"IL",x:591,y:196,ev:"C"},
{name:"Christopher",state:"IL",x:606,y:259,ev:"C"},
{name:"Cicero",state:"IL",x:617,y:177,ev:"C"},
{name:"Clarendon Hills",state:"IL",x:614,y:178,ev:"P"},
{name:"Cloverdale",state:"IL",x:610,y:175,ev:"Q"},
{name:"Coal City",state:"IL",x:610,y:188,ev:"P"},
{name:"Coal City",state:"IL",x:600,y:231,ev:"P"},
{name:"Coal City",state:"IL",x:573,y:185,ev:"P"},
{name:"Coal City",state:"IL",x:572,y:185,ev:"P"},
{name:"Colchester",state:"IL",x:571,y:206,ev:"Q"},
{name:"Columbia",state:"IL",x:586,y:249,ev:"P"},
{name:"Crainville",state:"IL",x:606,y:264,ev:"C"},
{name:"Crete",state:"IL",x:621,y:185,ev:"P"},
{name:"Crete",state:"IL",x:621,y:186,ev:"P"},
{name:"Crossville",state:"IL",x:622,y:254,ev:"P"},
{name:"Crystal Lake",state:"IL",x:605,y:169,ev:"Q"},
{name:"Cuba",state:"IL",x:581,y:205,ev:"P"},
{name:"Danvers",state:"IL",x:598,y:204,ev:"Q"},
{name:"Darien",state:"IL",x:614,y:179,ev:"P"},
{name:"De Land",state:"IL",x:608,y:213,ev:"P"},
{name:"Deerfield",state:"IL",x:614,y:170,ev:"C"},
{name:"DeKalb",state:"IL",x:600,y:175,ev:"Q"},
{name:"DeLand",state:"IL",x:608,y:213,ev:"P"},
{name:"Des Plaines",state:"IL",x:614,y:173,ev:"P"},
{name:"Divernon",state:"IL",x:614,y:170,ev:"P"},
{name:"Dongola",state:"IL",x:604,y:273,ev:"P"},
{name:"Downers Grove",state:"IL",x:613,y:178,ev:"Q"},
{name:"DuPage County",state:"IL",x:611,y:177,ev:"Q"},
{name:"Dupo",state:"IL",x:586,y:248,ev:"P"},
{name:"Dwight",state:"IL",x:609,y:192,ev:"P"},
{name:"Earlville",state:"IL",x:598,y:182,ev:"P"},
{name:"East Alton",state:"IL",x:587,y:240,ev:"C"},
{name:"Effingham",state:"IL",x:612,y:234,ev:"C"},
{name:"El Paso",state:"IL",x:600,y:200,ev:"Q"},
{name:"Elco",state:"IL",x:603,y:274,ev:"C"},
{name:"Eldorado",state:"IL",x:616,y:262,ev:"C"},
{name:"Elk Grove Village",state:"IL",x:612,y:174,ev:"P"},
{name:"Elmhurst",state:"IL",x:614,y:176,ev:"Q"},
{name:"Elsah",state:"IL",x:583,y:238,ev:"C"},
{name:"Enfield",state:"IL",x:617,y:256,ev:"C"},
{name:"Eola",state:"IL",x:609,y:178,ev:"Q"},
{name:"Equality",state:"IL",x:617,y:264,ev:"P"},
{name:"Evansville",state:"IL",x:591,y:257,ev:"Q"},
{name:"Fairfield",state:"IL",x:616,y:250,ev:"C"},
{name:"Farmer City",state:"IL",x:608,y:210,ev:"C"},
{name:"Farmer City",state:"IL",x:593,y:228,ev:"C"},
{name:"Farmer City",state:"IL",x:578,y:207,ev:"C"},
{name:"Fisher",state:"IL",x:613,y:209,ev:"Q"},
{name:"Flora",state:"IL",x:614,y:244,ev:"Q"},
{name:"Flowerfield",state:"IL",x:612,y:176,ev:"Q"},
{name:"Forest Park",state:"IL",x:616,y:176,ev:"P"},
{name:"Franklin Park",state:"IL",x:614,y:175,ev:"Q"},
{name:"Freeburg",state:"IL",x:591,y:250,ev:"C"},
{name:"Fulton",state:"IL",x:576,y:176,ev:"Q"},
{name:"Germantown",state:"IL",x:597,y:247,ev:"C"},
{name:"Gillespie",state:"IL",x:591,y:234,ev:"C"},
{name:"Girard",state:"IL",x:591,y:227,ev:"P"},
{name:"Glen Carbon",state:"IL",x:589,y:243,ev:"C"},
{name:"Glen Ellyn",state:"IL",x:612,y:176,ev:"Q"},
{name:"Glendale Heights",state:"IL",x:611,y:175,ev:"Q"},
{name:"Golconda",state:"IL",x:615,y:272,ev:"P"},
{name:"Goreville",state:"IL",x:607,y:268,ev:"P"},
{name:"Granite City",state:"IL",x:587,y:243,ev:"C"},
{name:"Granite City",state:"IL",x:587,y:244,ev:"C"},
{name:"Grant Park",state:"IL",x:622,y:189,ev:"C"},
{name:"Grayville",state:"IL",x:623,y:252,ev:"P"},
{name:"Greenfield",state:"IL",x:584,y:230,ev:"Q"},
{name:"Greenup",state:"IL",x:619,y:231,ev:"C"},
{name:"Greenview",state:"IL",x:590,y:214,ev:"C"},
{name:"Hardin",state:"IL",x:578,y:234,ev:"C"},
{name:"Harvard",state:"IL",x:599,y:165,ev:"Q"},
{name:"Havana",state:"IL",x:584,y:209,ev:"C"},
{name:"Hazel Dell",state:"IL",x:621,y:232,ev:"C"},
{name:"Henry",state:"IL",x:593,y:192,ev:"P"},
{name:"Herrin",state:"IL",x:606,y:263,ev:"C"},
{name:"Herscher",state:"IL",x:614,y:193,ev:"P"},
{name:"Highland",state:"IL",x:594,y:242,ev:"P"},
{name:"Highland Park",state:"IL",x:614,y:170,ev:"Q"},
{name:"Homer",state:"IL",x:615,y:182,ev:"Q"},
{name:"Hoyleton",state:"IL",x:602,y:249,ev:"C"},
{name:"Irvington",state:"IL",x:593,y:200,ev:"C"},
{name:"Itasca",state:"IL",x:612,y:174,ev:"Q"},
{name:"Iuka",state:"IL",x:609,y:245,ev:"P"},
{name:"Jasper County",state:"IL",x:619,y:236,ev:"P"},
{name:"Jewett",state:"IL",x:617,y:232,ev:"P"},
{name:"Johnston City",state:"IL",x:608,y:263,ev:"C"},
{name:"Jonesboro",state:"IL",x:602,y:271,ev:"C"},
{name:"Kane County",state:"IL",x:605,y:175,ev:"Q"},
{name:"Kaolin",state:"IL",x:602,y:270,ev:"C"},
{name:"Karnak",state:"IL",x:607,y:274,ev:"P"},
{name:"Keeneyville",state:"IL",x:610,y:174,ev:"Q"},
{name:"Kenilworth",state:"IL",x:617,y:172,ev:"P"},
{name:"Kenney",state:"IL",x:601,y:213,ev:"Q"},
{name:"Kinmundy",state:"IL",x:608,y:242,ev:"C"},
{name:"La Moille",state:"IL",x:592,y:183,ev:"Q"},
{name:"Lacon",state:"IL",x:592,y:194,ev:"P"},
{name:"Lamb",state:"IL",x:621,y:268,ev:"C"},
{name:"LaSalle Peru",state:"IL",x:596,y:187,ev:"P"},
{name:"Le Roy",state:"IL",x:606,y:208,ev:"Q"},
{name:"Leland Grove",state:"IL",x:592,y:220,ev:"C"},
{name:"Lemont",state:"IL",x:614,y:180,ev:"P"},
{name:"Lewistown",state:"IL",x:582,y:207,ev:"P"},
{name:"Lexington",state:"IL",x:604,y:202,ev:"Q"},
{name:"Libertyville",state:"IL",x:611,y:168,ev:"P"},
{name:"Lisle",state:"IL",x:611,y:177,ev:"Q"},
{name:"Lombard",state:"IL",x:612,y:176,ev:"P"},
{name:"Lovington",state:"IL",x:610,y:221,ev:"P"},
{name:"Lyons",state:"IL",x:616,y:178,ev:"P"},
{name:"Madison",state:"IL",x:587,y:244,ev:"Q"},
{name:"Mahomet",state:"IL",x:612,y:211,ev:"P"},
{name:"Manhattan",state:"IL",x:615,y:186,ev:"P"},
{name:"Mansfield",state:"IL",x:610,y:211,ev:"Q"},
{name:"Manteno",state:"IL",x:618,y:189,ev:"P"},
{name:"Marissa",state:"IL",x:594,y:254,ev:"C"},
{name:"Maroa",state:"IL",x:603,y:215,ev:"C"},
{name:"Marquette Heights",state:"IL",x:591,y:202,ev:"C"},
{name:"Marseilles",state:"IL",x:604,y:188,ev:"P"},
{name:"Marshall",state:"IL",x:626,y:228,ev:"C"},
{name:"Martinsville",state:"IL",x:623,y:229,ev:"C"},
{name:"Maryville",state:"IL",x:590,y:243,ev:"Q"},
{name:"Mascoutah",state:"IL",x:593,y:248,ev:"C"},
{name:"Mazon",state:"IL",x:608,y:189,ev:"C"},
{name:"McClure",state:"IL",x:600,y:274,ev:"P"},
{name:"McHenry County",state:"IL",x:603,y:167,ev:"Q"},
{name:"McLeansboro",state:"IL",x:614,y:256,ev:"C"},
{name:"Medinah",state:"IL",x:611,y:174,ev:"Q"},
{name:"Meredosia",state:"IL",x:577,y:219,ev:"P"},
{name:"Metamora",state:"IL",x:594,y:199,ev:"C"},
{name:"Minonk",state:"IL",x:599,y:196,ev:"P"},
{name:"Monroe County",state:"IL",x:587,y:253,ev:"P"},
{name:"Monticello",state:"IL",x:610,y:215,ev:"C"},
{name:"Montrose",state:"IL",x:615,y:233,ev:"C"},
{name:"Morris",state:"IL",x:607,y:186,ev:"P"},
{name:"Morrison",state:"IL",x:579,y:177,ev:"Q"},
{name:"Morton",state:"IL",x:615,y:173,ev:"C"},
{name:"Mount Olive",state:"IL",x:593,y:236,ev:"C"},
{name:"Mount Prospect",state:"IL",x:613,y:172,ev:"P"},
{name:"Moweaqua",state:"IL",x:603,y:223,ev:"C"},
{name:"Mt. Carmel",state:"IL",x:626,y:249,ev:"C"},
{name:"Mt. Sterling",state:"IL",x:573,y:216,ev:"C"},
{name:"Mt. Zion",state:"IL",x:605,y:220,ev:"P"},
{name:"Mt. Zion",state:"IL",x:606,y:221,ev:"P"},
{name:"Mulkeytown",state:"IL",x:605,y:259,ev:"C"},
{name:"Mundelein",state:"IL",x:611,y:168,ev:"P"},
{name:"Naperville",state:"IL",x:610,y:179,ev:"C"},
{name:"Nashville",state:"IL",x:600,y:251,ev:"C"},
{name:"Neoga",state:"IL",x:614,y:230,ev:"C"},
{name:"New Baden",state:"IL",x:594,y:247,ev:"C"},
{name:"New Boston",state:"IL",x:565,y:190,ev:"P"},
{name:"New Minden",state:"IL",x:600,y:249,ev:"P"},
{name:"Newman",state:"IL",x:620,y:219,ev:"P"},
{name:"Niantic",state:"IL",x:602,y:217,ev:"P"},
{name:"Niles",state:"IL",x:615,y:173,ev:"Q"},
{name:"Nokomis",state:"IL",x:600,y:230,ev:"Q"},
{name:"Norris City",state:"IL",x:583,y:202,ev:"C"},
{name:"Norris City",state:"IL",x:618,y:259,ev:"C"},
{name:"Oak Brook",state:"IL",x:614,y:177,ev:"Q"},
{name:"Oak Lawn",state:"IL",x:618,y:180,ev:"P"},
{name:"Oak Park",state:"IL",x:616,y:176,ev:"P"},
{name:"Oakbrook Terrace",state:"IL",x:613,y:177,ev:"Q"},
{name:"Oakland",state:"IL",x:620,y:222,ev:"P"},
{name:"Oblong",state:"IL",x:623,y:236,ev:"C"},
{name:"Okawville",state:"IL",x:597,y:249,ev:"C"},
{name:"Okawville",state:"IL",x:597,y:249,ev:"C"},
{name:"Olney",state:"IL",x:621,y:242,ev:"C"},
{name:"Omaha",state:"IL",x:618,y:260,ev:"Q"},
{name:"Omaha",state:"IL",x:618,y:261,ev:"Q"},
{name:"Onarga",state:"IL",x:617,y:200,ev:"P"},
{name:"Oreana",state:"IL",x:605,y:217,ev:"Q"},
{name:"Orient",state:"IL",x:607,y:260,ev:"Q"},
{name:"Orland Park",state:"IL",x:616,y:182,ev:"Q"},
{name:"Palestine",state:"IL",x:628,y:236,ev:"Q"},
{name:"Pana",state:"IL",x:603,y:228,ev:"C"},
{name:"Panama",state:"IL",x:596,y:236,ev:"Q"},
{name:"Patoka",state:"IL",x:604,y:242,ev:"P"},
{name:"Pawnee",state:"IL",x:594,y:224,ev:"P"},
{name:"Paxton",state:"IL",x:616,y:206,ev:"P"},
{name:"Pekin",state:"IL",x:590,y:203,ev:"C"},
{name:"Peotone",state:"IL",x:618,y:187,ev:"P"},
{name:"Philo",state:"IL",x:617,y:215,ev:"P"},
{name:"Piatt County",state:"IL",x:610,y:215,ev:"P"},
{name:"Pierron",state:"IL",x:596,y:242,ev:"Q"},
{name:"Pinckneyville",state:"IL",x:601,y:257,ev:"P"},
{name:"Plainfield",state:"IL",x:610,y:181,ev:"P"},
{name:"Pocahontas",state:"IL",x:597,y:241,ev:"Q"},
{name:"Posey",state:"IL",x:600,y:247,ev:"C"},
{name:"Potomac",state:"IL",x:622,y:209,ev:"Q"},
{name:"Princeton",state:"IL",x:590,y:186,ev:"Q"},
{name:"Ramsey",state:"IL",x:603,y:234,ev:"C"},
{name:"Rantoul",state:"IL",x:616,y:209,ev:"P"},
{name:"Red Bud",state:"IL",x:590,y:255,ev:"P"},
{name:"Richview",state:"IL",x:593,y:200,ev:"C"},
{name:"Ridge Farm",state:"IL",x:626,y:217,ev:"P"},
{name:"Ridgway",state:"IL",x:619,y:262,ev:"P"},
{name:"Riverside",state:"IL",x:616,y:177,ev:"P"},
{name:"Roanoke",state:"IL",x:597,y:198,ev:"P"},
{name:"Robinson",state:"IL",x:626,y:236,ev:"C"},
{name:"Rochester",state:"IL",x:594,y:221,ev:"Q"},
{name:"Romeoville",state:"IL",x:612,y:181,ev:"C"},
{name:"Roselle",state:"IL",x:611,y:174,ev:"Q"},
{name:"Roseville",state:"IL",x:572,y:200,ev:"P"},
{name:"Rosiclare",state:"IL",x:617,y:271,ev:"C"},
{name:"Roxana",state:"IL",x:588,y:241,ev:"Q"},
{name:"Roxana",state:"IL",x:588,y:241,ev:"Q"},
{name:"Royalton",state:"IL",x:605,y:261,ev:"C"},
{name:"Salem",state:"IL",x:606,y:245,ev:"C"},
{name:"San Jose",state:"IL",x:592,y:209,ev:"C"},
{name:"Sandoval",state:"IL",x:604,y:245,ev:"C"},
{name:"Sandwich",state:"IL",x:603,y:181,ev:"P"},
{name:"Saybrook",state:"IL",x:609,y:206,ev:"C"},
{name:"Schaumburg",state:"IL",x:612,y:174,ev:"P"},
{name:"Sesser",state:"IL",x:606,y:257,ev:"C"},
{name:"Shelbyville",state:"IL",x:608,y:228,ev:"P"},
{name:"Sherman",state:"IL",x:593,y:218,ev:"Q"},
{name:"Sidell",state:"IL",x:623,y:217,ev:"Q"},
{name:"Sidney",state:"IL",x:618,y:215,ev:"Q"},
{name:"South Pekin",state:"IL",x:590,y:205,ev:"C"},
{name:"Spaulding",state:"IL",x:594,y:218,ev:"C"},
{name:"St. Anne",state:"IL",x:621,y:194,ev:"P"},
{name:"St. Elmo",state:"IL",x:608,y:236,ev:"C"},
{name:"St. Jacob",state:"IL",x:593,y:243,ev:"Q"},
{name:"St. Joseph",state:"IL",x:619,y:213,ev:"P"},
{name:"St. Rose",state:"IL",x:597,y:244,ev:"C"},
{name:"Staunton",state:"IL",x:592,y:237,ev:"C"},
{name:"Steeleville",state:"IL",x:596,y:259,ev:"C"},
{name:"Stronghurst",state:"IL",x:568,y:199,ev:"P"},
{name:"Sullivan",state:"IL",x:610,y:224,ev:"P"},
{name:"Tamaroa",state:"IL",x:603,y:256,ev:"C"},
{name:"Teutopolis",state:"IL",x:614,y:234,ev:"P"},
{name:"Thayer",state:"IL",x:591,y:225,ev:"P"},
{name:"Thebes",state:"IL",x:600,y:276,ev:"Q"},
{name:"Toledo",state:"IL",x:617,y:231,ev:"P"},
{name:"Tolono",state:"IL",x:615,y:215,ev:"P"},
{name:"Toluca",state:"IL",x:597,y:194,ev:"P"},
{name:"Towanda",state:"IL",x:603,y:203,ev:"P"},
{name:"Trenton",state:"IL",x:594,y:246,ev:"C"},
{name:"Tuscola",state:"IL",x:615,y:219,ev:"Q"},
{name:"Valier",state:"IL",x:606,y:258,ev:"P"},
{name:"Vandalia",state:"IL",x:603,y:237,ev:"C"},
{name:"Vergennes",state:"IL",x:601,y:261,ev:"C"},
{name:"Vienna",state:"IL",x:609,y:271,ev:"C"},
{name:"Villa Grove",state:"IL",x:617,y:218,ev:"C"},
{name:"Villa Park",state:"IL",x:613,y:176,ev:"P"},
{name:"Virden",state:"IL",x:591,y:226,ev:"P"},
{name:"Warrensburg",state:"IL",x:602,y:217,ev:"P"},
{name:"Warrenville",state:"IL",x:610,y:177,ev:"P"},
{name:"Warsaw",state:"IL",x:561,y:208,ev:"P"},
{name:"Washington",state:"IL",x:593,y:200,ev:"C"},
{name:"Waterloo",state:"IL",x:587,y:252,ev:"Q"},
{name:"Wayne",state:"IL",x:609,y:174,ev:"Q"},
{name:"Wayne",state:"IL",x:608,y:175,ev:"Q"},
{name:"Wayne City",state:"IL",x:613,y:251,ev:"C"},
{name:"West Chicago",state:"IL",x:609,y:176,ev:"P"},
{name:"West City",state:"IL",x:608,y:258,ev:"Q"},
{name:"West City",state:"IL",x:607,y:259,ev:"Q"},
{name:"West Frankfort",state:"IL",x:608,y:261,ev:"C"},
{name:"West Salem",state:"IL",x:622,y:247,ev:"Q"},
{name:"Western Springs",state:"IL",x:615,y:178,ev:"C"},
{name:"Westfield",state:"IL",x:621,y:227,ev:"C"},
{name:"Westmont",state:"IL",x:613,y:178,ev:"P"},
{name:"Westville",state:"IL",x:625,y:214,ev:"P"},
{name:"Wheaton",state:"IL",x:611,y:177,ev:"Q"},
{name:"White Hall",state:"IL",x:581,y:228,ev:"C"},
{name:"White Heath",state:"IL",x:611,y:213,ev:"Q"},
{name:"Williamsville",state:"IL",x:594,y:216,ev:"Q"},
{name:"Willowbrook",state:"IL",x:623,y:185,ev:"Q"},
{name:"Wilmette",state:"IL",x:616,y:172,ev:"P"},
{name:"Windsor",state:"IL",x:611,y:227,ev:"P"},
{name:"Winfield",state:"IL",x:610,y:176,ev:"Q"},
{name:"Winnebago",state:"IL",x:590,y:168,ev:"Q"},
{name:"Winthrop Harbor",state:"IL",x:613,y:164,ev:"C"},
{name:"Witt",state:"IL",x:599,y:231,ev:"P"},
{name:"Wolf Lake",state:"IL",x:600,y:270,ev:"C"},
{name:"Wood Dale",state:"IL",x:613,y:174,ev:"P"},
{name:"Wood River",state:"IL",x:588,y:240,ev:"Q"},
{name:"Woodridge",state:"IL",x:613,y:179,ev:"Q"},
{name:"Worden",state:"IL",x:591,y:239,ev:"Q"},
{name:"Wyanet",state:"IL",x:588,y:187,ev:"P"},
{name:"Zeigler",state:"IL",x:606,y:261,ev:"C"},
{name:"Advance",state:"IN",x:643,y:214,ev:"Q"},
{name:"Albany",state:"IN",x:665,y:207,ev:"Q"},
{name:"Albion",state:"IN",x:659,y:185,ev:"P"},
{name:"Alexandria",state:"IN",x:658,y:208,ev:"C"},
{name:"Andrews",state:"IN",x:657,y:196,ev:"C"},
{name:"Arcadia",state:"IN",x:652,y:210,ev:"P"},
{name:"Argos",state:"IN",x:645,y:189,ev:"P"},
{name:"Attica",state:"IN",x:631,y:209,ev:"C"},
{name:"Auburn",state:"IN",x:665,y:186,ev:"C"},
{name:"Aurora",state:"IN",x:673,y:232,ev:"C"},
{name:"Austin",state:"IN",x:658,y:240,ev:"P"},
{name:"Avilla",state:"IN",x:662,y:186,ev:"P"},
{name:"Batesville",state:"IN",x:667,y:228,ev:"C"},
{name:"Bedford",state:"IN",x:647,y:238,ev:"Q"},
{name:"Beech Grove",state:"IN",x:652,y:220,ev:"Q"},
{name:"Berne",state:"IN",x:669,y:200,ev:"C"},
{name:"Bicknell",state:"IN",x:633,y:241,ev:"C"},
{name:"Bloomfield",state:"IN",x:639,y:235,ev:"P"},
{name:"Bluffton",state:"IN",x:665,y:198,ev:"C"},
{name:"Boswell",state:"IN",x:628,y:204,ev:"Q"},
{name:"Bourbon",state:"IN",x:647,y:188,ev:"P"},
{name:"Bremen",state:"IN",x:646,y:185,ev:"P"},
{name:"Brook",state:"IN",x:628,y:197,ev:"C"},
{name:"Brooklyn",state:"IN",x:648,y:224,ev:"Q"},
{name:"Brookston",state:"IN",x:637,y:202,ev:"C"},
{name:"Brookville",state:"IN",x:671,y:225,ev:"C"},
{name:"Brownsburg",state:"IN",x:647,y:218,ev:"C"},
{name:"Brownstown",state:"IN",x:654,y:237,ev:"C"},
{name:"Burnettsville",state:"IN",x:641,y:199,ev:"Q"},
{name:"Butler City",state:"IN",x:668,y:184,ev:"P"},
{name:"Cambridge City",state:"IN",x:667,y:217,ev:"Q"},
{name:"Camden",state:"IN",x:642,y:202,ev:"P"},
{name:"Campbellsburg",state:"IN",x:651,y:242,ev:"P"},
{name:"Cannelton",state:"IN",x:644,y:258,ev:"P"},
{name:"Carmel",state:"IN",x:651,y:215,ev:"Q"},
{name:"Cayuga",state:"IN",x:629,y:216,ev:"Q"},
{name:"Cedar Lake",state:"IN",x:624,y:186,ev:"C"},
{name:"Centerville",state:"IN",x:670,y:217,ev:"C"},
{name:"Chesterfield",state:"IN",x:659,y:211,ev:"Q"},
{name:"Chesterton",state:"IN",x:630,y:182,ev:"C"},
{name:"Churubusco",state:"IN",x:661,y:189,ev:"C"},
{name:"Cicero",state:"IN",x:652,y:211,ev:"Q"},
{name:"Clarksville",state:"IN",x:659,y:249,ev:"Q"},
{name:"Clay City",state:"IN",x:636,y:230,ev:"P"},
{name:"Columbia City",state:"IN",x:658,y:190,ev:"C"},
{name:"Converse",state:"IN",x:654,y:202,ev:"P"},
{name:"Corydon",state:"IN",x:653,y:251,ev:"C"},
{name:"Covington",state:"IN",x:629,y:212,ev:"P"},
{name:"Crawford",state:"IN",x:648,y:250,ev:"C"},
{name:"Crothersville",state:"IN",x:658,y:239,ev:"P"},
{name:"Crown Point",state:"IN",x:626,y:186,ev:"P"},
{name:"Dale",state:"IN",x:640,y:253,ev:"Q"},
{name:"Daleville",state:"IN",x:660,y:211,ev:"Q"},
{name:"Danville",state:"IN",x:645,y:219,ev:"P"},
{name:"Decatur",state:"IN",x:669,y:196,ev:"C"},
{name:"Delphi",state:"IN",x:640,y:202,ev:"P"},
{name:"Deputy",state:"IN",x:661,y:238,ev:"C"},
{name:"Dillsboro",state:"IN",x:670,y:233,ev:"Q"},
{name:"Dublin",state:"IN",x:667,y:217,ev:"P"},
{name:"Dugger",state:"IN",x:634,y:234,ev:"P"},
{name:"Dyer",state:"IN",x:623,y:184,ev:"Q"},
{name:"Eaton",state:"IN",x:663,y:207,ev:"Q"},
{name:"Ellettsville",state:"IN",x:644,y:230,ev:"Q"},
{name:"Elnora",state:"IN",x:637,y:238,ev:"P"},
{name:"Elwood",state:"IN",x:655,y:208,ev:"C"},
{name:"English",state:"IN",x:648,y:249,ev:"C"},
{name:"Fairmount",state:"IN",x:658,y:205,ev:"Q"},
{name:"Fairview Park",state:"IN",x:630,y:221,ev:"Q"},
{name:"Farmersburg",state:"IN",x:632,y:230,ev:"P"},
{name:"Farmland",state:"IN",x:667,y:209,ev:"P"},
{name:"Ferdinand",state:"IN",x:641,y:252,ev:"P"},
{name:"Flora",state:"IN",x:643,y:203,ev:"P"},
{name:"Fort Branch",state:"IN",x:630,y:252,ev:"Q"},
{name:"Fortville",state:"IN",x:656,y:215,ev:"Q"},
{name:"Francesville",state:"IN",x:635,y:194,ev:"P"},
{name:"Frankfort",state:"IN",x:644,y:208,ev:"C"},
{name:"Frankton",state:"IN",x:656,y:209,ev:"Q"},
{name:"Fremont",state:"IN",x:666,y:179,ev:"Q"},
{name:"Galena",state:"IN",x:656,y:248,ev:"Q"},
{name:"Gas City",state:"IN",x:659,y:204,ev:"C"},
{name:"Gas City",state:"IN",x:661,y:207,ev:"C"},
{name:"Geneva",state:"IN",x:669,y:201,ev:"C"},
{name:"Goodland",state:"IN",x:629,y:199,ev:"P"},
{name:"Goshen",state:"IN",x:651,y:182,ev:"C"},
{name:"Grand View",state:"IN",x:639,y:258,ev:"C"},
{name:"Greendale",state:"IN",x:674,y:230,ev:"P"},
{name:"Greenfield",state:"IN",x:657,y:218,ev:"C"},
{name:"Greensburg",state:"IN",x:663,y:227,ev:"C"},
{name:"Greentown",state:"IN",x:652,y:204,ev:"P"},
{name:"Greenwood",state:"IN",x:652,y:222,ev:"Q"},
{name:"Hagerstown",state:"IN",x:667,y:215,ev:"C"},
{name:"Hancock County",state:"IN",x:657,y:217,ev:"P"},
{name:"Hartford City",state:"IN",x:662,y:204,ev:"P"},
{name:"Haubstadt",state:"IN",x:630,y:253,ev:"P"},
{name:"Hebron",state:"IN",x:629,y:187,ev:"P"},
{name:"Henryville",state:"IN",x:659,y:244,ev:"Q"},
{name:"Highland",state:"IN",x:623,y:183,ev:"Q"},
{name:"Hobart",state:"IN",x:627,y:184,ev:"C"},
{name:"Hope",state:"IN",x:658,y:228,ev:"P"},
{name:"Huntingburg",state:"IN",x:640,y:250,ev:"P"},
{name:"Huntington",state:"IN",x:659,y:196,ev:"C"},
{name:"Hymera",state:"IN",x:633,y:232,ev:"P"},
{name:"Jamestown",state:"IN",x:643,y:216,ev:"P"},
{name:"Jasonville",state:"IN",x:635,y:232,ev:"P"},
{name:"Jasper",state:"IN",x:640,y:248,ev:"C"},
{name:"Jonesboro",state:"IN",x:658,y:204,ev:"P"},
{name:"Kendallville",state:"IN",x:661,y:184,ev:"Q"},
{name:"Kentland",state:"IN",x:626,y:199,ev:"P"},
{name:"Knox",state:"IN",x:639,y:188,ev:"C"},
{name:"Kouts",state:"IN",x:632,y:188,ev:"P"},
{name:"Ladoga",state:"IN",x:640,y:216,ev:"P"},
{name:"LaGrange",state:"IN",x:658,y:180,ev:"P"},
{name:"Lagro",state:"IN",x:655,y:197,ev:"P"},
{name:"Lapel",state:"IN",x:656,y:213,ev:"P"},
{name:"Laurel",state:"IN",x:667,y:223,ev:"Q"},
{name:"Leavenworth",state:"IN",x:650,y:252,ev:"C"},
{name:"Lexington",state:"IN",x:661,y:241,ev:"C"},
{name:"Ligonier",state:"IN",x:655,y:184,ev:"Q"},
{name:"Linton",state:"IN",x:636,y:235,ev:"P"},
{name:"Lizton",state:"IN",x:644,y:217,ev:"C"},
{name:"Long Beach",state:"IN",x:633,y:179,ev:"P"},
{name:"Loogootee",state:"IN",x:640,y:242,ev:"P"},
{name:"Lowell",state:"IN",x:625,y:188,ev:"P"},
{name:"Lynn",state:"IN",x:671,y:212,ev:"P"},
{name:"Marengo",state:"IN",x:650,y:248,ev:"Q"},
{name:"Martinsville",state:"IN",x:647,y:226,ev:"C"},
{name:"Mentone",state:"IN",x:649,y:190,ev:"C"},
{name:"Merrillville",state:"IN",x:626,y:184,ev:"Q"},
{name:"Middlebury",state:"IN",x:653,y:180,ev:"P"},
{name:"Middletown",state:"IN",x:660,y:212,ev:"P"},
{name:"Milan",state:"IN",x:669,y:231,ev:"Q"},
{name:"Milltown",state:"IN",x:651,y:249,ev:"P"},
{name:"Milton",state:"IN",x:668,y:218,ev:"P"},
{name:"Mishawaka",state:"IN",x:645,y:180,ev:"P"},
{name:"Mitchell",state:"IN",x:647,y:241,ev:"Q"},
{name:"Monon",state:"IN",x:636,y:197,ev:"P"},
{name:"Monroeville",state:"IN",x:669,y:193,ev:"P"},
{name:"Montezuma",state:"IN",x:631,y:219,ev:"P"},
{name:"Monticello",state:"IN",x:638,y:199,ev:"C"},
{name:"Montpelier",state:"IN",x:664,y:202,ev:"P"},
{name:"Mooresville",state:"IN",x:648,y:222,ev:"C"},
{name:"Morgantown",state:"IN",x:650,y:227,ev:"C"},
{name:"Morocco",state:"IN",x:626,y:195,ev:"P"},
{name:"Morristown",state:"IN",x:659,y:220,ev:"Q"},
{name:"Mulberry",state:"IN",x:641,y:207,ev:"P"},
{name:"Munster",state:"IN",x:623,y:183,ev:"P"},
{name:"Nappanee",state:"IN",x:649,y:185,ev:"P"},
{name:"New Carlisle",state:"IN",x:639,y:180,ev:"P"},
{name:"New Chicago",state:"IN",x:626,y:183,ev:"P"},
{name:"New Harmony",state:"IN",x:624,y:255,ev:"Q"},
{name:"New Haven",state:"IN",x:667,y:192,ev:"Q"},
{name:"New Palestine",state:"IN",x:655,y:219,ev:"P"},
{name:"New Paris",state:"IN",x:651,y:183,ev:"P"},
{name:"New Pekin",state:"IN",x:655,y:245,ev:"P"},
{name:"New Whiteland",state:"IN",x:652,y:223,ev:"P"},
{name:"Newburg",state:"IN",x:633,y:258,ev:"C"},
{name:"North Judson",state:"IN",x:636,y:190,ev:"C"},
{name:"North Liberty",state:"IN",x:641,y:183,ev:"C"},
{name:"North Manchester",state:"IN",x:654,y:193,ev:"Q"},
{name:"North Webster",state:"IN",x:654,y:187,ev:"C"},
{name:"Odon",state:"IN",x:639,y:239,ev:"P"},
{name:"Ogden Dunes",state:"IN",x:628,y:181,ev:"Q"},
{name:"Oolitic",state:"IN",x:646,y:237,ev:"Q"},
{name:"Orleans",state:"IN",x:648,y:242,ev:"P"},
{name:"Osceola",state:"IN",x:646,y:180,ev:"P"},
{name:"Osgood",state:"IN",x:666,y:231,ev:"P"},
{name:"Ossian",state:"IN",x:665,y:196,ev:"P"},
{name:"Owensville",state:"IN",x:628,y:252,ev:"P"},
{name:"Oxford",state:"IN",x:631,y:204,ev:"P"},
{name:"Parker City",state:"IN",x:666,y:209,ev:"P"},
{name:"Pendleton",state:"IN",x:657,y:214,ev:"P"},
{name:"Petersburg",state:"IN",x:634,y:247,ev:"P"},
{name:"Pierceton",state:"IN",x:655,y:189,ev:"C"},
{name:"Plymouth",state:"IN",x:644,y:187,ev:"P"},
{name:"Porter",state:"IN",x:629,y:181,ev:"P"},
{name:"Poseyville",state:"IN",x:626,y:254,ev:"C"},
{name:"Redkey",state:"IN",x:666,y:206,ev:"P"},
{name:"Remington",state:"IN",x:632,y:199,ev:"C"},
{name:"Rensselaer",state:"IN",x:631,y:195,ev:"P"},
{name:"Ridgeville",state:"IN",x:669,y:207,ev:"P"},
{name:"Roachdale",state:"IN",x:640,y:218,ev:"P"},
{name:"Roann",state:"IN",x:652,y:195,ev:"C"},
{name:"Roanoke",state:"IN",x:661,y:194,ev:"P"},
{name:"Rochester",state:"IN",x:647,y:192,ev:"P"},
{name:"Rockport",state:"IN",x:638,y:259,ev:"P"},
{name:"Rome City",state:"IN",x:659,y:183,ev:"P"},
{name:"Rossville",state:"IN",x:642,y:206,ev:"P"},
{name:"Royal Center",state:"IN",x:642,y:197,ev:"P"},
{name:"Russiaville",state:"IN",x:647,y:206,ev:"P"},
{name:"Salem",state:"IN",x:654,y:243,ev:"C"},
{name:"Schererville",state:"IN",x:624,y:184,ev:"P"},
{name:"Scottsburg",state:"IN",x:659,y:241,ev:"C"},
{name:"Seelyville",state:"IN",x:633,y:225,ev:"P"},
{name:"Sellersburg",state:"IN",x:659,y:247,ev:"P"},
{name:"Shelburn",state:"IN",x:631,y:232,ev:"P"},
{name:"Shirley",state:"IN",x:660,y:216,ev:"P"},
{name:"Shoals",state:"IN",x:642,y:242,ev:"P"},
{name:"Sidney",state:"IN",x:654,y:191,ev:"C"},
{name:"Silver Lake",state:"IN",x:652,y:192,ev:"C"},
{name:"South Whitley",state:"IN",x:656,y:192,ev:"C"},
{name:"Speedway",state:"IN",x:649,y:218,ev:"C"},
{name:"St. John",state:"IN",x:624,y:185,ev:"P"},
{name:"Stinesville",state:"IN",x:644,y:229,ev:"P"},
{name:"Summitville",state:"IN",x:658,y:207,ev:"C"},
{name:"Sunman",state:"IN",x:669,y:229,ev:"C"},
{name:"Swayzee",state:"IN",x:655,y:203,ev:"C"},
{name:"Sweetser",state:"IN",x:655,y:202,ev:"C"},
{name:"Syracuse",state:"IN",x:653,y:185,ev:"P"},
{name:"Tell City",state:"IN",x:643,y:258,ev:"C"},
{name:"Thorntown",state:"IN",x:642,y:212,ev:"P"},
{name:"Tipton",state:"IN",x:652,y:208,ev:"P"},
{name:"Trail Creek",state:"IN",x:633,y:180,ev:"P"},
{name:"Tri-Lakes",state:"IN",x:659,y:188,ev:"P"},
{name:"Utica",state:"IN",x:661,y:248,ev:"C"},
{name:"Valparaiso",state:"IN",x:631,y:184,ev:"C"},
{name:"Van Buren",state:"IN",x:660,y:201,ev:"P"},
{name:"Veedersburg",state:"IN",x:632,y:212,ev:"P"},
{name:"Versailles",state:"IN",x:667,y:232,ev:"P"},
{name:"Vevay",state:"IN",x:670,y:239,ev:"C"},
{name:"Wabash",state:"IN",x:654,y:197,ev:"Q"},
{name:"Wakarusa",state:"IN",x:648,y:183,ev:"C"},
{name:"Walkerton",state:"IN",x:640,y:184,ev:"P"},
{name:"Walton",state:"IN",x:647,y:201,ev:"P"},
{name:"Warren",state:"IN",x:661,y:200,ev:"Q"},
{name:"Waterloo",state:"IN",x:665,y:184,ev:"P"},
{name:"West Lafayette",state:"IN",x:636,y:205,ev:"P"},
{name:"West Terre Haute",state:"IN",x:630,y:226,ev:"C"},
{name:"Westfield",state:"IN",x:650,y:213,ev:"P"},
{name:"Whiteland",state:"IN",x:653,y:223,ev:"P"},
{name:"Whitestown",state:"IN",x:647,y:215,ev:"P"},
{name:"Whiting",state:"IN",x:622,y:180,ev:"C"},
{name:"Williamsport",state:"IN",x:631,y:209,ev:"P"},
{name:"Winamac",state:"IN",x:640,y:193,ev:"P"},
{name:"Windfall City",state:"IN",x:653,y:206,ev:"P"},
{name:"Winslow",state:"IN",x:635,y:249,ev:"P"},
{name:"Wolcott",state:"IN",x:633,y:199,ev:"P"},
{name:"Woodburn",state:"IN",x:669,y:190,ev:"P"},
{name:"Worthington",state:"IN",x:638,y:233,ev:"P"},
{name:"Yorktown",state:"IN",x:661,y:210,ev:"P"},
{name:"Zionsville",state:"IN",x:648,y:214,ev:"C"},
{name:"Anthony",state:"KS",x:460,y:279,ev:"Q"},
{name:"Arma",state:"KS",x:514,y:271,ev:"P"},
{name:"Ashland",state:"KS",x:431,y:277,ev:"Q"},
{name:"Atwood",state:"KS",x:401,y:210,ev:"P"},
{name:"Augusta",state:"KS",x:476,y:266,ev:"P"},
{name:"Barber County",state:"KS",x:449,y:277,ev:"Q"},
{name:"Belle Plaine",state:"KS",x:472,y:274,ev:"P"},
{name:"Belleville",state:"KS",x:458,y:215,ev:"P"},
{name:"Beloit",state:"KS",x:452,y:223,ev:"P"},
{name:"Blue Rapids",state:"KS",x:475,y:220,ev:"Q"},
{name:"Burlingame",state:"KS",x:492,y:242,ev:"P"},
{name:"Burlington",state:"KS",x:495,y:255,ev:"Q"},
{name:"Butler County",state:"KS",x:478,y:265,ev:"Q"},
{name:"Caney",state:"KS",x:494,y:283,ev:"P"},
{name:"Cedar Vale",state:"KS",x:485,y:281,ev:"Q"},
{name:"Chapman",state:"KS",x:472,y:236,ev:"Q"},
{name:"Chase County",state:"KS",x:481,y:252,ev:"Q"},
{name:"Cheney",state:"KS",x:463,y:268,ev:"P"},
{name:"Cimarron",state:"KS",x:420,y:261,ev:"P"},
{name:"Clark County",state:"KS",x:431,y:276,ev:"Q"},
{name:"Clearwater",state:"KS",x:468,y:271,ev:"Q"},
{name:"Cloud County",state:"KS",x:460,y:223,ev:"Q"},
{name:"Clyde",state:"KS",x:463,y:221,ev:"P"},
{name:"Coffey County",state:"KS",x:495,y:254,ev:"Q"},
{name:"Colby",state:"KS",x:403,y:221,ev:"Q"},
{name:"Coldwater",state:"KS",x:439,y:275,ev:"P"},
{name:"Conway Springs",state:"KS",x:466,y:274,ev:"P"},
{name:"Denton",state:"KS",x:498,y:220,ev:"P"},
{name:"Dickinson County",state:"KS",x:470,y:238,ev:"Q"},
{name:"Dighton",state:"KS",x:416,y:244,ev:"P"},
{name:"Douglass",state:"KS",x:476,y:271,ev:"P"},
{name:"Edwards County",state:"KS",x:437,y:260,ev:"Q"},
{name:"Elkhart",state:"KS",x:397,y:280,ev:"P"},
{name:"Ellinwood",state:"KS",x:448,y:249,ev:"P"},
{name:"Ellis County",state:"KS",x:434,y:235,ev:"Q"},
{name:"Ellsworth County",state:"KS",x:453,y:241,ev:"Q"},
{name:"Enterprise",state:"KS",x:471,y:237,ev:"Q"},
{name:"Erie",state:"KS",x:505,y:270,ev:"Q"},
{name:"Eureka",state:"KS",x:487,y:264,ev:"P"},
{name:"Finney County",state:"KS",x:413,y:254,ev:"Q"},
{name:"Ford County",state:"KS",x:428,y:264,ev:"Q"},
{name:"Frontenac",state:"KS",x:514,y:273,ev:"P"},
{name:"Gray County",state:"KS",x:419,y:262,ev:"Q"},
{name:"Greensburg",state:"KS",x:438,y:267,ev:"P"},
{name:"Greenwood County",state:"KS",x:488,y:262,ev:"Q"},
{name:"Halstead",state:"KS",x:467,y:259,ev:"P"},
{name:"Hamilton County",state:"KS",x:396,y:254,ev:"Q"},
{name:"Harper",state:"KS",x:460,y:276,ev:"P"},
{name:"Hays",state:"KS",x:434,y:236,ev:"P"},
{name:"Haysville",state:"KS",x:470,y:269,ev:"P"},
{name:"Herington",state:"KS",x:476,y:243,ev:"Q"},
{name:"Hillsboro",state:"KS",x:471,y:251,ev:"P"},
{name:"Hodgeman County",state:"KS",x:427,y:255,ev:"Q"},
{name:"Hoisington",state:"KS",x:444,y:245,ev:"Q"},
{name:"Howard",state:"KS",x:488,y:272,ev:"P"},
{name:"Hoxie",state:"KS",x:413,y:223,ev:"P"},
{name:"Kearney County",state:"KS",x:404,y:255,ev:"Q"},
{name:"Kiowa",state:"KS",x:453,y:282,ev:"P"},
{name:"La Crosse",state:"KS",x:435,y:244,ev:"P"},
{name:"Lakin",state:"KS",x:405,y:257,ev:"P"},
{name:"Leoti",state:"KS",x:401,y:243,ev:"P"},
{name:"Lincoln Center",state:"KS",x:453,y:233,ev:"P"},
{name:"Lindsborg",state:"KS",x:462,y:245,ev:"P"},
{name:"Logan County",state:"KS",x:403,y:232,ev:"Q"},
{name:"Madison",state:"KS",x:489,y:256,ev:"P"},
{name:"Mankato",state:"KS",x:449,y:215,ev:"P"},
{name:"Marion",state:"KS",x:474,y:251,ev:"Q"},
{name:"Marysville",state:"KS",x:475,y:216,ev:"Q"},
{name:"Meade",state:"KS",x:422,y:274,ev:"P"},
{name:"Mulvane",state:"KS",x:472,y:272,ev:"P"},
{name:"Neodesha",state:"KS",x:498,y:274,ev:"P"},
{name:"Ness City",state:"KS",x:426,y:245,ev:"P"},
{name:"Nickerson",state:"KS",x:457,y:255,ev:"P"},
{name:"Norton",state:"KS",x:420,y:212,ev:"P"},
{name:"Oberlin",state:"KS",x:409,y:211,ev:"P"},
{name:"Osage City",state:"KS",x:493,y:245,ev:"P"},
{name:"Osborne County",state:"KS",x:441,y:225,ev:"Q"},
{name:"Ottawa County",state:"KS",x:461,y:231,ev:"Q"},
{name:"Pawnee County",state:"KS",x:438,y:253,ev:"Q"},
{name:"Phillips County",state:"KS",x:430,y:214,ev:"Q"},
{name:"Pratt County",state:"KS",x:447,y:266,ev:"Q"},
{name:"Rice County",state:"KS",x:454,y:250,ev:"Q"},
{name:"Rooks County",state:"KS",x:432,y:224,ev:"Q"},
{name:"Rush County",state:"KS",x:435,y:244,ev:"Q"},
{name:"Russell",state:"KS",x:442,y:236,ev:"P"},
{name:"Scammon",state:"KS",x:512,y:277,ev:"Q"},
{name:"Scott City",state:"KS",x:409,y:244,ev:"Q"},
{name:"Seneca",state:"KS",x:485,y:217,ev:"P"},
{name:"Sheridan County",state:"KS",x:413,y:223,ev:"Q"},
{name:"Smith Center",state:"KS",x:439,y:215,ev:"P"},
{name:"Solomon",state:"KS",x:466,y:237,ev:"P"},
{name:"St. Francis",state:"KS",x:388,y:210,ev:"P"},
{name:"Stafford",state:"KS",x:449,y:259,ev:"P"},
{name:"Stanton County",state:"KS",x:397,y:265,ev:"Q"},
{name:"Stevens County",state:"KS",x:406,y:275,ev:"Q"},
{name:"Sublette",state:"KS",x:413,y:269,ev:"P"},
{name:"Sumner County",state:"KS",x:469,y:277,ev:"Q"},
{name:"Thomas County",state:"KS",x:402,y:221,ev:"Q"},
{name:"Trego County",state:"KS",x:425,y:234,ev:"Q"},
{name:"Tribune",state:"KS",x:395,y:242,ev:"P"},
{name:"Victoria",state:"KS",x:437,y:237,ev:"P"},
{name:"Wallace County",state:"KS",x:393,y:231,ev:"Q"},
{name:"Washington",state:"KS",x:468,y:216,ev:"P"},
{name:"Wilson",state:"KS",x:448,y:238,ev:"Q"},
{name:"Yates Center",state:"KS",x:496,y:263,ev:"P"},
{name:"Albany",state:"KY",x:669,y:282,ev:"P"},
{name:"Alexandria",state:"KY",x:681,y:233,ev:"Q"},
{name:"Audubon Park",state:"KY",x:660,y:251,ev:"Q"},
{name:"Beechwood Village",state:"KY",x:662,y:250,ev:"P"},
{name:"Bellevue",state:"KY",x:680,y:231,ev:"P"},
{name:"Benton",state:"KY",x:617,y:283,ev:"P"},
{name:"Brodhead",state:"KY",x:681,y:266,ev:"Q"},
{name:"Bromley",state:"KY",x:678,y:231,ev:"Q"},
{name:"Burnside",state:"KY",x:677,y:275,ev:"P"},
{name:"Calvert City",state:"KY",x:617,y:279,ev:"Q"},
{name:"Caneyville",state:"KY",x:647,y:269,ev:"P"},
{name:"Catlettsburg",state:"KY",x:711,y:242,ev:"Q"},
{name:"Centertown",state:"KY",x:639,y:269,ev:"P"},
{name:"Clay",state:"KY",x:626,y:269,ev:"P"},
{name:"Cold Spring",state:"KY",x:681,y:232,ev:"Q"},
{name:"Corbin",state:"KY",x:686,y:275,ev:"P"},
{name:"Dayton",state:"KY",x:680,y:231,ev:"P"},
{name:"Edgewood",state:"KY",x:679,y:233,ev:"Q"},
{name:"Elkhorn City",state:"KY",x:714,y:264,ev:"P"},
{name:"Erlanger",state:"KY",x:678,y:232,ev:"Q"},
{name:"Florence",state:"KY",x:677,y:233,ev:"Q"},
{name:"Fort Mitchell",state:"KY",x:679,y:232,ev:"Q"},
{name:"Fort Thomas",state:"KY",x:680,y:231,ev:"Q"},
{name:"Highland Heights",state:"KY",x:680,y:232,ev:"Q"},
{name:"Irvine",state:"KY",x:689,y:259,ev:"Q"},
{name:"Jeffersonville",state:"KY",x:691,y:253,ev:"Q"},
{name:"Liberty",state:"KY",x:673,y:269,ev:"Q"},
{name:"Livermore",state:"KY",x:637,y:268,ev:"Q"},
{name:"London",state:"KY",x:686,y:271,ev:"Q"},
{name:"Loyall",state:"KY",x:698,y:275,ev:"P"},
{name:"Ludlow",state:"KY",x:679,y:231,ev:"P"},
{name:"Lynnview",state:"KY",x:660,y:251,ev:"Q"},
{name:"Marshall County",state:"KY",x:618,y:283,ev:"P"},
{name:"Martin",state:"KY",x:708,y:260,ev:"Q"},
{name:"Meadow Vale",state:"KY",x:662,y:249,ev:"Q"},
{name:"Minor Lane Heights",state:"KY",x:662,y:253,ev:"Q"},
{name:"Mount Vernon",state:"KY",x:682,y:267,ev:"P"},
{name:"Mount Washington",state:"KY",x:663,y:254,ev:"Q"},
{name:"North Corbin",state:"KY",x:686,y:275,ev:"P"},
{name:"Olive Hill",state:"KY",x:702,y:245,ev:"Q"},
{name:"Paintsville",state:"KY",x:708,y:254,ev:"P"},
{name:"Park Hills",state:"KY",x:679,y:232,ev:"P"},
{name:"Parkway Village",state:"KY",x:660,y:251,ev:"Q"},
{name:"Petersburg",state:"KY",x:674,y:232,ev:"C"},
{name:"Prestonsburg",state:"KY",x:708,y:257,ev:"Q"},
{name:"Raceland",state:"KY",x:709,y:240,ev:"P"},
{name:"Russell",state:"KY",x:709,y:240,ev:"P"},
{name:"Russell Springs",state:"KY",x:670,y:274,ev:"Q"},
{name:"Salyersville",state:"KY",x:703,y:256,ev:"P"},
{name:"Shively",state:"KY",x:659,y:251,ev:"Q"},
{name:"Silver Grove",state:"KY",x:681,y:232,ev:"P"},
{name:"Southgate",state:"KY",x:680,y:232,ev:"P"},
{name:"St. Regis Park",state:"KY",x:662,y:250,ev:"Q"},
{name:"Stanton",state:"KY",x:690,y:256,ev:"P"},
{name:"Vanceburg",state:"KY",x:699,y:239,ev:"Q"},
{name:"Whitesburg",state:"KY",x:707,y:269,ev:"P"},
{name:"Williamstown",state:"KY",x:679,y:240,ev:"Q"},
{name:"Windy Hills",state:"KY",x:661,y:249,ev:"Q"},
{name:"Worthington",state:"KY",x:709,y:239,ev:"P"},
{name:"Anacoco",state:"LA",x:524,y:424,ev:"Q"},
{name:"Golden Meadow",state:"LA",x:557,y:465,ev:"Q"},
{name:"Grand Isle",state:"LA",x:560,y:468,ev:"Q"},
{name:"Jean Lafitte",state:"LA",x:563,y:455,ev:"Q"},
{name:"Krotz Springs",state:"LA",x:543,y:439,ev:"Q"},
{name:"Pitkin",state:"LA",x:528,y:431,ev:"P"},
{name:"Pollock",state:"LA",x:538,y:416,ev:"C"},
{name:"Simpson",state:"LA",x:529,y:423,ev:"Q"},
{name:"Biddeford",state:"ME",x:909,y:127,ev:"P"},
{name:"Brewer",state:"ME",x:933,y:103,ev:"Q"},
{name:"Fairfield",state:"ME",x:919,y:108,ev:"Q"},
{name:"Malaga Island",state:"ME",x:917,y:120,ev:"C"},
{name:"Milo",state:"ME",x:928,y:97,ev:"P"},
{name:"Orono",state:"ME",x:934,y:101,ev:"Q"},
{name:"Presque Isle",state:"ME",x:937,y:75,ev:"Q"},
{name:"Westbrook",state:"ME",x:909,y:123,ev:"P"},
{name:"Brentwood",state:"MD",x:804,y:220,ev:"P"},
{name:"Calvert County",state:"MD",x:810,y:226,ev:"Q"},
{name:"Chevy Chase",state:"MD",x:802,y:219,ev:"C"},
{name:"Crofton",state:"MD",x:808,y:218,ev:"P"},
{name:"Friendsville",state:"MD",x:763,y:212,ev:"Q"},
{name:"Garrett County",state:"MD",x:765,y:214,ev:"P"},
{name:"Greenbelt",state:"MD",x:805,y:218,ev:"C"},
{name:"Lonaconing",state:"MD",x:770,y:213,ev:"Q"},
{name:"Mayo",state:"MD",x:811,y:219,ev:"P"},
{name:"Mount Rainier",state:"MD",x:803,y:220,ev:"P"},
{name:"Oakland",state:"MD",x:763,y:216,ev:"P"},
{name:"Princess Anne",state:"MD",x:823,y:230,ev:"Q"},
{name:"Savage",state:"MD",x:806,y:215,ev:"C"},
{name:"Scientists Cliff",state:"MD",x:811,y:226,ev:"Q"},
{name:"Smith Island",state:"MD",x:818,y:235,ev:"Q"},
{name:"Tilghman Island",state:"MD",x:814,y:222,ev:"P"},
{name:"University Park",state:"MD",x:804,y:219,ev:"P"},
{name:"Washington Grove",state:"MD",x:800,y:216,ev:"Q"},
{name:"Westernport",state:"MD",x:769,y:214,ev:"Q"},
{name:"Woodland Beach",state:"MD",x:810,y:219,ev:"Q"},
{name:"Ashby",state:"MA",x:886,y:142,ev:"P"},
{name:"Athol",state:"MA",x:880,y:145,ev:"Q"},
{name:"Belmont",state:"MA",x:898,y:145,ev:"P"},
{name:"Bolton",state:"MA",x:891,y:146,ev:"Q"},
{name:"Braintree",state:"MA",x:901,y:148,ev:"Q"},
{name:"Brookline",state:"MA",x:899,y:146,ev:"P"},
{name:"Chicopee",state:"MA",x:875,y:152,ev:"P"},
{name:"Dedham",state:"MA",x:898,y:148,ev:"P"},
{name:"Longmeadow",state:"MA",x:875,y:154,ev:"Q"},
{name:"Manchester",state:"MA",x:905,y:141,ev:"Q"},
{name:"Maynard",state:"MA",x:893,y:145,ev:"P"},
{name:"Montague",state:"MA",x:875,y:146,ev:"P"},
{name:"Quincy",state:"MA",x:901,y:147,ev:"Q"},
{name:"Saugus",state:"MA",x:901,y:144,ev:"P"},
{name:"Swampscott",state:"MA",x:903,y:143,ev:"Q"},
{name:"Algonac",state:"MI",x:703,y:160,ev:"Q"},
{name:"Alpena",state:"MI",x:673,y:115,ev:"P"},
{name:"Bad Axe",state:"MI",x:689,y:138,ev:"Q"},
{name:"Bessemer",state:"MI",x:544,y:83,ev:"Q"},
{name:"Birmingham",state:"MI",x:692,y:162,ev:"Q"},
{name:"Brighton",state:"MI",x:682,y:163,ev:"Q"},
{name:"Brown City",state:"MI",x:693,y:149,ev:"Q"},
{name:"Cadillac",state:"MI",x:644,y:130,ev:"P"},
{name:"Caro",state:"MI",x:684,y:144,ev:"P"},
{name:"Charlotte",state:"MI",x:664,y:162,ev:"P"},
{name:"Climax",state:"MI",x:652,y:168,ev:"Q"},
{name:"Climax",state:"MI",x:657,y:169,ev:"Q"},
{name:"Coopersville",state:"MI",x:642,y:153,ev:"Q"},
{name:"Dearborn",state:"MI",x:693,y:166,ev:"C"},
{name:"Dearborn Heights",state:"MI",x:691,y:166,ev:"Q"},
{name:"East Grand Rapids",state:"MI",x:649,y:155,ev:"Q"},
{name:"East Lansing",state:"MI",x:669,y:159,ev:"P"},
{name:"Fenton",state:"MI",x:682,y:157,ev:"P"},
{name:"Fraser",state:"MI",x:696,y:162,ev:"Q"},
{name:"Fremont",state:"MI",x:640,y:145,ev:"P"},
{name:"Galesburg",state:"MI",x:655,y:168,ev:"Q"},
{name:"Grosse Pointe",state:"MI",x:698,y:165,ev:"C"},
{name:"Grosse Pointe Farms",state:"MI",x:698,y:165,ev:"C"},
{name:"Grosse Pointe Park",state:"MI",x:697,y:165,ev:"C"},
{name:"Grosse Pointe Shores",state:"MI",x:698,y:163,ev:"C"},
{name:"Grosse Pointe Woods",state:"MI",x:698,y:164,ev:"C"},
{name:"Harbor Beach",state:"MI",x:695,y:138,ev:"P"},
{name:"Hartford",state:"MI",x:643,y:170,ev:"Q"},
{name:"Holland",state:"MI",x:641,y:158,ev:"P"},
{name:"Howell",state:"MI",x:679,y:161,ev:"Q"},
{name:"Hudson",state:"MI",x:675,y:176,ev:"Q"},
{name:"Ironwood",state:"MI",x:542,y:84,ev:"P"},
{name:"Ishpeming",state:"MI",x:587,y:87,ev:"Q"},
{name:"Lathrup Village",state:"MI",x:692,y:163,ev:"Q"},
{name:"Lexington",state:"MI",x:700,y:148,ev:"Q"},
{name:"Linden",state:"MI",x:681,y:157,ev:"Q"},
{name:"Livonia",state:"MI",x:690,y:165,ev:"C"},
{name:"Mancelona",state:"MI",x:646,y:118,ev:"Q"},
{name:"Manistique",state:"MI",x:617,y:98,ev:"Q"},
{name:"Marine City",state:"MI",x:703,y:158,ev:"Q"},
{name:"Marlette",state:"MI",x:690,y:147,ev:"P"},
{name:"Marquette",state:"MI",x:591,y:86,ev:"Q"},
{name:"Marshall",state:"MI",x:663,y:168,ev:"Q"},
{name:"Marysville",state:"MI",x:703,y:155,ev:"Q"},
{name:"Mason",state:"MI",x:670,y:162,ev:"P"},
{name:"Menominee",state:"MI",x:599,y:112,ev:"Q"},
{name:"Menominee County",state:"MI",x:598,y:105,ev:"Q"},
{name:"Munising",state:"MI",x:606,y:89,ev:"Q"},
{name:"New Baltimore",state:"MI",x:699,y:159,ev:"Q"},
{name:"Ontonagon",state:"MI",x:553,y:77,ev:"Q"},
{name:"Owosso",state:"MI",x:673,y:154,ev:"C"},
{name:"Petoskey",state:"MI",x:644,y:109,ev:"Q"},
{name:"Pinckney",state:"MI",x:680,y:164,ev:"Q"},
{name:"Portage",state:"MI",x:652,y:170,ev:"Q"},
{name:"Portland",state:"MI",x:661,y:156,ev:"Q"},
{name:"Reese",state:"MI",x:679,y:145,ev:"Q"},
{name:"Richmond",state:"MI",x:698,y:157,ev:"Q"},
{name:"Rockford",state:"MI",x:648,y:151,ev:"Q"},
{name:"Rockwood",state:"MI",x:693,y:171,ev:"Q"},
{name:"Royal Oak",state:"MI",x:693,y:163,ev:"Q"},
{name:"Sebewaing",state:"MI",x:682,y:140,ev:"Q"},
{name:"South Lyon",state:"MI",x:685,y:164,ev:"Q"},
{name:"Southgate",state:"MI",x:693,y:168,ev:"Q"},
{name:"Spring Lake",state:"MI",x:638,y:153,ev:"C"},
{name:"St. Clair",state:"MI",x:703,y:156,ev:"Q"},
{name:"St. Clair Shores",state:"MI",x:698,y:163,ev:"C"},
{name:"Sterling Heights",state:"MI",x:695,y:161,ev:"Q"},
{name:"Traverse City",state:"MI",x:637,y:121,ev:"Q"},
{name:"Trenton",state:"MI",x:694,y:170,ev:"Q"},
{name:"Troy",state:"MI",x:693,y:161,ev:"Q"},
{name:"Upper Peninsula",state:"MI",x:564,y:76,ev:"Q"},
{name:"Upper Peninsula",state:"MI",x:586,y:83,ev:"Q"},
{name:"Upper Peninsula",state:"MI",x:566,y:69,ev:"Q"},
{name:"Utica",state:"MI",x:695,y:160,ev:"Q"},
{name:"Vicksburg",state:"MI",x:654,y:171,ev:"Q"},
{name:"Warren",state:"MI",x:695,y:163,ev:"C"},
{name:"Westland",state:"MI",x:690,y:166,ev:"P"},
{name:"White Pigeon",state:"MI",x:638,y:172,ev:"Q"},
{name:"White Pigeon",state:"MI",x:653,y:178,ev:"Q"},
{name:"Wixom",state:"MI",x:686,y:163,ev:"Q"},
{name:"Wyandotte",state:"MI",x:694,y:168,ev:"C"},
{name:"Albert Lea",state:"MN",x:509,y:135,ev:"Q"},
{name:"Appleton",state:"MN",x:449,y:98,ev:"Q"},
{name:"Austin",state:"MN",x:516,y:135,ev:"C"},
{name:"Cannon Falls",state:"MN",x:511,y:118,ev:"Q"},
{name:"Coleraine",state:"MN",x:474,y:61,ev:"P"},
{name:"Edina",state:"MN",x:499,y:109,ev:"C"},
{name:"Fairmont",state:"MN",x:490,y:134,ev:"Q"},
{name:"Granite Falls",state:"MN",x:461,y:107,ev:"P"},
{name:"Mankato",state:"MN",x:494,y:123,ev:"Q"},
{name:"Marshall",state:"MN",x:460,y:114,ev:"Q"},
{name:"New Ulm",state:"MN",x:484,y:120,ev:"Q"},
{name:"Paynesville",state:"MN",x:470,y:97,ev:"Q"},
{name:"Pine Island",state:"MN",x:518,y:125,ev:"P"},
{name:"Red Wing",state:"MN",x:515,y:117,ev:"Q"},
{name:"Redwood Falls",state:"MN",x:471,y:113,ev:"Q"},
{name:"South St. Paul",state:"MN",x:505,y:110,ev:"Q"},
{name:"St. Louis Park",state:"MN",x:498,y:108,ev:"C"},
{name:"Stillwater",state:"MN",x:507,y:107,ev:"P"},
{name:"Waseca",state:"MN",x:503,y:126,ev:"Q"},
{name:"Worthington",state:"MN",x:470,y:132,ev:"Q"},
{name:"Belmont",state:"MS",x:616,y:336,ev:"Q"},
{name:"Burnsville",state:"MS",x:615,y:329,ev:"P"},
{name:"d’Iberville",state:"MS",x:585,y:435,ev:"Q"},
{name:"It",state:"MS",x:579,y:363,ev:"Q"},
{name:"Mize",state:"MS",x:584,y:401,ev:"C"},
{name:"Pearl",state:"MS",x:578,y:393,ev:"Q"},
{name:"Southaven",state:"MS",x:589,y:329,ev:"Q"},
{name:"Adrian",state:"MO",x:518,y:251,ev:"Q"},
{name:"Albany",state:"MO",x:512,y:209,ev:"P"},
{name:"Anderson",state:"MO",x:519,y:292,ev:"Q"},
{name:"Aurora",state:"MO",x:530,y:284,ev:"P"},
{name:"Ava",state:"MO",x:547,y:284,ev:"Q"},
{name:"Bella Villa",state:"MO",x:585,y:247,ev:"Q"},
{name:"Belle",state:"MO",x:561,y:254,ev:"Q"},
{name:"Bernie",state:"MO",x:591,y:289,ev:"Q"},
{name:"Bethany",state:"MO",x:517,y:208,ev:"Q"},
{name:"Bismarck",state:"MO",x:580,y:265,ev:"P"},
{name:"Bloomfield",state:"MO",x:592,y:284,ev:"P"},
{name:"Blue Springs",state:"MO",x:518,y:237,ev:"Q"},
{name:"Bolivar",state:"MO",x:535,y:269,ev:"Q"},
{name:"Branson",state:"MO",x:538,y:292,ev:"Q"},
{name:"Buckner",state:"MO",x:518,y:234,ev:"Q"},
{name:"Buffalo",state:"MO",x:540,y:268,ev:"Q"},
{name:"Cabool",state:"MO",x:557,y:280,ev:"Q"},
{name:"Camdenton",state:"MO",x:545,y:260,ev:"Q"},
{name:"Campbell",state:"MO",x:589,y:293,ev:"Q"},
{name:"Carl Junction",state:"MO",x:517,y:280,ev:"Q"},
{name:"Carterville",state:"MO",x:519,y:280,ev:"Q"},
{name:"Cassville",state:"MO",x:528,y:291,ev:"P"},
{name:"Chaffee",state:"MO",x:596,y:277,ev:"Q"},
{name:"Claycomo",state:"MO",x:514,y:232,ev:"Q"},
{name:"Cole Camp",state:"MO",x:537,y:250,ev:"Q"},
{name:"Concordia",state:"MO",x:529,y:238,ev:"Q"},
{name:"Crane",state:"MO",x:533,y:286,ev:"Q"},
{name:"Creve Coeur",state:"MO",x:582,y:245,ev:"P"},
{name:"Cuba",state:"MO",x:567,y:258,ev:"Q"},
{name:"Deepwater",state:"MO",x:528,y:254,ev:"Q"},
{name:"Desloge",state:"MO",x:582,y:262,ev:"Q"},
{name:"Dexter",state:"MO",x:591,y:286,ev:"Q"},
{name:"Dixon",state:"MO",x:556,y:260,ev:"Q"},
{name:"Doniphan",state:"MO",x:577,y:291,ev:"Q"},
{name:"East Prairie",state:"MO",x:601,y:286,ev:"P"},
{name:"Edina",state:"MO",x:549,y:212,ev:"P"},
{name:"El Dorado Springs",state:"MO",x:524,y:263,ev:"Q"},
{name:"Eldon",state:"MO",x:547,y:252,ev:"Q"},
{name:"Ellington",state:"MO",x:575,y:277,ev:"Q"},
{name:"Elvins",state:"MO",x:582,y:264,ev:"Q"},
{name:"Flat River",state:"MO",x:582,y:264,ev:"Q"},
{name:"Galena",state:"MO",x:535,y:288,ev:"P"},
{name:"Gideon",state:"MO",x:592,y:294,ev:"Q"},
{name:"Granby",state:"MO",x:522,y:286,ev:"Q"},
{name:"Grant City",state:"MO",x:510,y:203,ev:"Q"},
{name:"Hamilton",state:"MO",x:520,y:220,ev:"P"},
{name:"Hermann",state:"MO",x:565,y:244,ev:"P"},
{name:"Holt",state:"MO",x:515,y:227,ev:"P"},
{name:"Houston",state:"MO",x:559,y:276,ev:"Q"},
{name:"Kahoka",state:"MO",x:556,y:206,ev:"Q"},
{name:"Kearney",state:"MO",x:515,y:229,ev:"P"},
{name:"King City",state:"MO",x:509,y:209,ev:"Q"},
{name:"King City",state:"MO",x:510,y:213,ev:"Q"},
{name:"La Plata",state:"MO",x:544,y:215,ev:"Q"},
{name:"Lake Lotawana",state:"MO",x:518,y:239,ev:"Q"},
{name:"Lamar",state:"MO",x:521,y:272,ev:"Q"},
{name:"Leadwood",state:"MO",x:581,y:263,ev:"Q"},
{name:"Liberal",state:"MO",x:517,y:271,ev:"Q"},
{name:"Linn",state:"MO",x:559,y:249,ev:"Q"},
{name:"Marionville",state:"MO",x:532,y:284,ev:"Q"},
{name:"Marshfield",state:"MO",x:543,y:275,ev:"Q"},
{name:"Maryville",state:"MO",x:503,y:206,ev:"Q"},
{name:"Memphis",state:"MO",x:548,y:205,ev:"P"},
{name:"Milan",state:"MO",x:533,y:210,ev:"Q"},
{name:"Mindenmines",state:"MO",x:516,y:272,ev:"Q"},
{name:"Monett",state:"MO",x:527,y:286,ev:"P"},
{name:"Morehouse",state:"MO",x:596,y:285,ev:"Q"},
{name:"Mound City",state:"MO",x:515,y:227,ev:"Q"},
{name:"Mound City",state:"MO",x:497,y:210,ev:"Q"},
{name:"Mountain Grove",state:"MO",x:554,y:280,ev:"Q"},
{name:"Mt. Vernon",state:"MO",x:529,y:281,ev:"Q"},
{name:"North Kansas City",state:"MO",x:512,y:234,ev:"Q"},
{name:"Oran",state:"MO",x:596,y:279,ev:"Q"},
{name:"Owensville",state:"MO",x:565,y:252,ev:"Q"},
{name:"Pattonsburg",state:"MO",x:517,y:213,ev:"Q"},
{name:"Perryville",state:"MO",x:592,y:265,ev:"Q"},
{name:"Piedmont",state:"MO",x:579,y:279,ev:"Q"},
{name:"Pierce City",state:"MO",x:527,y:286,ev:"P"},
{name:"Pierce City",state:"MO",x:526,y:285,ev:"P"},
{name:"Princeton",state:"MO",x:524,y:206,ev:"Q"},
{name:"Richland",state:"MO",x:551,y:263,ev:"Q"},
{name:"Rockport",state:"MO",x:491,y:204,ev:"Q"},
{name:"Salem",state:"MO",x:565,y:268,ev:"Q"},
{name:"Sarcoxie",state:"MO",x:524,y:282,ev:"Q"},
{name:"Savannah",state:"MO",x:505,y:215,ev:"Q"},
{name:"Senath",state:"MO",x:588,y:302,ev:"Q"},
{name:"Seneca",state:"MO",x:516,y:287,ev:"Q"},
{name:"Seymour",state:"MO",x:546,y:280,ev:"Q"},
{name:"Shrewsbury",state:"MO",x:584,y:246,ev:"Q"},
{name:"Smithville",state:"MO",x:511,y:228,ev:"P"},
{name:"St. Clair",state:"MO",x:573,y:252,ev:"Q"},
{name:"St. Genevieve",state:"MO",x:589,y:260,ev:"Q"},
{name:"St. George",state:"MO",x:584,y:248,ev:"Q"},
{name:"St. James",state:"MO",x:564,y:260,ev:"Q"},
{name:"Stanberry",state:"MO",x:509,y:209,ev:"Q"},
{name:"Steelville",state:"MO",x:568,y:261,ev:"Q"},
{name:"Stockton",state:"MO",x:528,y:267,ev:"P"},
{name:"Sugar Creek",state:"MO",x:515,y:234,ev:"Q"},
{name:"Sullivan",state:"MO",x:571,y:255,ev:"Q"},
{name:"Thayer",state:"MO",x:566,y:294,ev:"Q"},
{name:"Unionville",state:"MO",x:534,y:204,ev:"Q"},
{name:"Warsaw",state:"MO",x:534,y:255,ev:"Q"},
{name:"Webb City",state:"MO",x:518,y:280,ev:"Q"},
{name:"Willow Springs",state:"MO",x:559,y:283,ev:"Q"},
{name:"Carbon County",state:"MT",x:215,y:53,ev:"Q"},
{name:"Glendive",state:"MT",x:269,y:27,ev:"P"},
{name:"Miles City",state:"MT",x:258,y:38,ev:"C"},
{name:"Roundup",state:"MT",x:208,y:25,ev:"Q"},
{name:"Adams County",state:"NE",x:440,y:198,ev:"Q"},
{name:"Antelope County",state:"NE",x:438,y:160,ev:"Q"},
{name:"Arthur County",state:"NE",x:379,y:166,ev:"Q"},
{name:"Auburn",state:"NE",x:486,y:204,ev:"Q"},
{name:"Aurora",state:"NE",x:447,y:190,ev:"Q"},
{name:"Banner County",state:"NE",x:344,y:162,ev:"Q"},
{name:"Blaine County",state:"NE",x:406,y:162,ev:"Q"},
{name:"Boone County",state:"NE",x:441,y:171,ev:"Q"},
{name:"Box Butte",state:"NE",x:350,y:148,ev:"Q"},
{name:"Boyd County",state:"NE",x:420,y:142,ev:"Q"},
{name:"Broken Bow",state:"NE",x:416,y:175,ev:"Q"},
{name:"Brown County",state:"NE",x:404,y:152,ev:"Q"},
{name:"Buffalo County",state:"NE",x:429,y:189,ev:"Q"},
{name:"Burt County",state:"NE",x:470,y:170,ev:"Q"},
{name:"Butler County",state:"NE",x:460,y:183,ev:"Q"},
{name:"Cass County",state:"NE",x:478,y:192,ev:"Q"},
{name:"Cedar County",state:"NE",x:449,y:152,ev:"Q"},
{name:"Central City",state:"NE",x:445,y:185,ev:"Q"},
{name:"Chase County",state:"NE",x:386,y:192,ev:"Q"},
{name:"Cheyenne County",state:"NE",x:359,y:172,ev:"Q"},
{name:"Clay County",state:"NE",x:448,y:198,ev:"Q"},
{name:"Colfax County",state:"NE",x:458,y:175,ev:"Q"},
{name:"Cozad",state:"NE",x:413,y:187,ev:"Q"},
{name:"Crete",state:"NE",x:466,y:197,ev:"Q"},
{name:"Cuming County",state:"NE",x:461,y:168,ev:"Q"},
{name:"David City",state:"NE",x:460,y:183,ev:"Q"},
{name:"Dawes County",state:"NE",x:345,y:135,ev:"Q"},
{name:"Dawson County",state:"NE",x:416,y:187,ev:"Q"},
{name:"Deuel County",state:"NE",x:371,y:176,ev:"Q"},
{name:"Dixon County",state:"NE",x:456,y:155,ev:"Q"},
{name:"Dodge County",state:"NE",x:466,y:176,ev:"Q"},
{name:"Douglas County",state:"NE",x:476,y:183,ev:"Q"},
{name:"Dundy County",state:"NE",x:388,y:200,ev:"Q"},
{name:"Fairbury",state:"NE",x:465,y:208,ev:"P"},
{name:"Fillmore County",state:"NE",x:456,y:199,ev:"Q"},
{name:"Franklin County",state:"NE",x:434,y:205,ev:"Q"},
{name:"Fremont",state:"NE",x:470,y:179,ev:"P"},
{name:"Frontier County",state:"NE",x:408,y:194,ev:"Q"},
{name:"Furnas County",state:"NE",x:418,y:203,ev:"Q"},
{name:"Gage County",state:"NE",x:472,y:206,ev:"Q"},
{name:"Garden County",state:"NE",x:368,y:164,ev:"Q"},
{name:"Garfield County",state:"NE",x:424,y:164,ev:"Q"},
{name:"Gering",state:"NE",x:343,y:155,ev:"Q"},
{name:"Gosper County",state:"NE",x:418,y:196,ev:"Q"},
{name:"Grant County",state:"NE",x:376,y:158,ev:"Q"},
{name:"Greeley County",state:"NE",x:434,y:173,ev:"Q"},
{name:"Hall County",state:"NE",x:438,y:189,ev:"Q"},
{name:"Hamilton County",state:"NE",x:446,y:190,ev:"Q"},
{name:"Harlan County",state:"NE",x:427,y:204,ev:"Q"},
{name:"Harrison",state:"NE",x:332,y:134,ev:"Q"},
{name:"Hayes County",state:"NE",x:397,y:193,ev:"Q"},
{name:"Hitchcock County",state:"NE",x:399,y:202,ev:"Q"},
{name:"Holdredge",state:"NE",x:426,y:198,ev:"Q"},
{name:"Holt County",state:"NE",x:423,y:152,ev:"Q"},
{name:"Hooker County",state:"NE",x:387,y:159,ev:"Q"},
{name:"Howard County",state:"NE",x:436,y:181,ev:"Q"},
{name:"Jackson",state:"NE",x:462,y:156,ev:"Q"},
{name:"Johnson County",state:"NE",x:479,y:203,ev:"Q"},
{name:"Kearney County",state:"NE",x:433,y:197,ev:"Q"},
{name:"Keith County",state:"NE",x:383,y:176,ev:"Q"},
{name:"Keya Paha County",state:"NE",x:404,y:140,ev:"C"},
{name:"Kimball County",state:"NE",x:347,y:171,ev:"Q"},
{name:"Knox County",state:"NE",x:437,y:150,ev:"Q"},
{name:"Lancaster County",state:"NE",x:470,y:194,ev:"Q"},
{name:"Lexington",state:"NE",x:418,y:189,ev:"Q"},
{name:"Lincoln",state:"NE",x:470,y:193,ev:"P"},
{name:"Lincoln County",state:"NE",x:399,y:181,ev:"Q"},
{name:"Logan County",state:"NE",x:401,y:170,ev:"Q"},
{name:"Loup County",state:"NE",x:415,y:163,ev:"Q"},
{name:"Madison County",state:"NE",x:447,y:167,ev:"Q"},
{name:"McPherson County",state:"NE",x:388,y:166,ev:"Q"},
{name:"Minden",state:"NE",x:432,y:197,ev:"P"},
{name:"Morrill County",state:"NE",x:356,y:159,ev:"Q"},
{name:"Nance County",state:"NE",x:444,y:178,ev:"Q"},
{name:"Nebraska City",state:"NE",x:484,y:197,ev:"Q"},
{name:"Nemaha County",state:"NE",x:486,y:204,ev:"Q"},
{name:"North Platte",state:"NE",x:398,y:179,ev:"P"},
{name:"Nuckolls County",state:"NE",x:450,y:206,ev:"Q"},
{name:"ONeill",state:"NE",x:426,y:152,ev:"Q"},
{name:"Otoe County",state:"NE",x:480,y:198,ev:"Q"},
{name:"Pawnee County",state:"NE",x:480,y:209,ev:"Q"},
{name:"Perkins County",state:"NE",x:385,y:184,ev:"Q"},
{name:"Phelps County",state:"NE",x:425,y:196,ev:"Q"},
{name:"Pierce County",state:"NE",x:445,y:159,ev:"Q"},
{name:"Plainview",state:"NE",x:441,y:156,ev:"Q"},
{name:"Platte County",state:"NE",x:451,y:175,ev:"Q"},
{name:"Plattsmouth",state:"NE",x:482,y:190,ev:"C"},
{name:"Red Willow County",state:"NE",x:409,y:203,ev:"Q"},
{name:"Richardson County",state:"NE",x:489,y:210,ev:"Q"},
{name:"Rock County",state:"NE",x:413,y:152,ev:"Q"},
{name:"Saline County",state:"NE",x:464,y:200,ev:"Q"},
{name:"Saunders County",state:"NE",x:468,y:184,ev:"Q"},
{name:"Schuyler",state:"NE",x:460,y:178,ev:"Q"},
{name:"Scotts Bluff",state:"NE",x:342,y:155,ev:"Q"},
{name:"Seward County",state:"NE",x:462,y:191,ev:"Q"},
{name:"Sherman County",state:"NE",x:428,y:180,ev:"Q"},
{name:"Sidney",state:"NE",x:360,y:174,ev:"Q"},
{name:"Sioux County",state:"NE",x:337,y:139,ev:"Q"},
{name:"Stanton County",state:"NE",x:455,y:168,ev:"Q"},
{name:"Tecumseh",state:"NE",x:480,y:204,ev:"P"},
{name:"Thayer County",state:"NE",x:457,y:207,ev:"Q"},
{name:"Thomas County",state:"NE",x:397,y:162,ev:"Q"},
{name:"Valentine",state:"NE",x:389,y:138,ev:"Q"},
{name:"Valley County",state:"NE",x:426,y:172,ev:"Q"},
{name:"Wahoo",state:"NE",x:469,y:184,ev:"Q"},
{name:"Wayne County",state:"NE",x:454,y:161,ev:"Q"},
{name:"Webster County",state:"NE",x:442,y:206,ev:"Q"},
{name:"West Point",state:"NE",x:463,y:170,ev:"Q"},
{name:"Wheeler County",state:"NE",x:431,y:165,ev:"Q"},
{name:"Wymore",state:"NE",x:473,y:209,ev:"Q"},
{name:"York County",state:"NE",x:454,y:191,ev:"Q"},
{name:"Boulder City",state:"NV",x:188,y:283,ev:"C"},
{name:"Ely",state:"NV",x:170,y:185,ev:"C"},
{name:"Fallon",state:"NV",x:102,y:162,ev:"P"},
{name:"Goldfield",state:"NV",x:141,y:220,ev:"C"},
{name:"Berlin",state:"NH",x:890,y:113,ev:"Q"},
{name:"Derry",state:"NH",x:895,y:138,ev:"Q"},
{name:"Farmington",state:"NH",x:897,y:129,ev:"Q"},
{name:"Franklin",state:"NH",x:887,y:130,ev:"Q"},
{name:"Haverhill",state:"NH",x:879,y:121,ev:"Q"},
{name:"Keene",state:"NH",x:877,y:139,ev:"Q"},
{name:"Lancaster",state:"NH",x:885,y:114,ev:"P"},
{name:"Littleton",state:"NH",x:882,y:116,ev:"Q"},
{name:"Newmarket",state:"NH",x:900,y:134,ev:"Q"},
{name:"Newport",state:"NH",x:878,y:132,ev:"Q"},
{name:"Peterborough",state:"NH",x:883,y:139,ev:"Q"},
{name:"Rochester",state:"NH",x:899,y:130,ev:"P"},
{name:"Somersworth",state:"NH",x:901,y:131,ev:"Q"},
{name:"Allendale",state:"NJ",x:850,y:175,ev:"Q"},
{name:"Alloway",state:"NJ",x:830,y:204,ev:"Q"},
{name:"Bordentown",state:"NJ",x:841,y:192,ev:"P"},
{name:"Carteret",state:"NJ",x:849,y:183,ev:"P"},
{name:"Cherry Hill",state:"NJ",x:836,y:197,ev:"Q"},
{name:"Clark",state:"NJ",x:847,y:183,ev:"Q"},
{name:"Clifton",state:"NJ",x:850,y:178,ev:"Q"},
{name:"Clifton",state:"NJ",x:850,y:178,ev:"Q"},
{name:"Dividing Creek",state:"NJ",x:834,y:209,ev:"Q"},
{name:"Fair Lawn",state:"NJ",x:850,y:177,ev:"P"},
{name:"Garwood",state:"NJ",x:847,y:182,ev:"P"},
{name:"Glen Rock",state:"NJ",x:850,y:176,ev:"Q"},
{name:"Green Brook",state:"NJ",x:844,y:183,ev:"Q"},
{name:"Hamilton Township",state:"NJ",x:840,y:204,ev:"Q"},
{name:"Hillside",state:"NJ",x:849,y:181,ev:"Q"},
{name:"Ho-Ho-Kus",state:"NJ",x:851,y:176,ev:"P"},
{name:"Levittown/Willingboro",state:"NJ",x:838,y:195,ev:"C"},
{name:"Llewellyn Park",state:"NJ",x:848,y:180,ev:"Q"},
{name:"Long Valley",state:"NJ",x:839,y:181,ev:"Q"},
{name:"Mahwah",state:"NJ",x:849,y:174,ev:"Q"},
{name:"Mount Laurel",state:"NJ",x:838,y:196,ev:"Q"},
{name:"Ocean Grove",state:"NJ",x:853,y:189,ev:"Q"},
{name:"Radburn",state:"NJ",x:850,y:177,ev:"Q"},
{name:"Ridgewood",state:"NJ",x:850,y:176,ev:"Q"},
{name:"Saddle River",state:"NJ",x:851,y:175,ev:"Q"},
{name:"Seaside Park",state:"NJ",x:851,y:194,ev:"P"},
{name:"Somerset",state:"NJ",x:844,y:185,ev:"Q"},
{name:"Spring Lake",state:"NJ",x:852,y:190,ev:"Q"},
{name:"Tenafly",state:"NJ",x:853,y:177,ev:"Q"},
{name:"Waldwick",state:"NJ",x:850,y:176,ev:"Q"},
{name:"Aztec",state:"NM",x:298,y:274,ev:"Q"},
{name:"Bernalillo",state:"NM",x:325,y:318,ev:"Q"},
{name:"Portales",state:"NM",x:377,y:353,ev:"C"},
{name:"Taos",state:"NM",x:338,y:290,ev:"C"},
{name:"Taos",state:"NM",x:340,y:285,ev:"C"},
{name:"Amherst",state:"NY",x:766,y:149,ev:"Q"},
{name:"Attica",state:"NY",x:775,y:151,ev:"P"},
{name:"Belle Terre",state:"NY",x:868,y:174,ev:"Q"},
{name:"Bennington",state:"NY",x:774,y:152,ev:"Q"},
{name:"Brighton",state:"NY",x:786,y:146,ev:"Q"},
{name:"Bronxville",state:"NY",x:855,y:176,ev:"Q"},
{name:"Cold Spring",state:"NY",x:852,y:168,ev:"P"},
{name:"Cooperstown",state:"NY",x:833,y:149,ev:"Q"},
{name:"Copiague",state:"NY",x:863,y:179,ev:"Q"},
{name:"Cove Neck",state:"NY",x:861,y:176,ev:"Q"},
{name:"Floral Park",state:"NY",x:857,y:179,ev:"P"},
{name:"Floral Park",state:"NY",x:857,y:180,ev:"P"},
{name:"Garden City",state:"NY",x:858,y:179,ev:"Q"},
{name:"Green Island",state:"NY",x:854,y:145,ev:"Q"},
{name:"Irondequoit",state:"NY",x:786,y:145,ev:"Q"},
{name:"Johnsburg",state:"NY",x:845,y:132,ev:"Q"},
{name:"Johnson City",state:"NY",x:844,y:143,ev:"P"},
{name:"Johnson City",state:"NY",x:817,y:161,ev:"P"},
{name:"Levittown",state:"NY",x:861,y:179,ev:"C"},
{name:"Mexico",state:"NY",x:808,y:138,ev:"Q"},
{name:"North Tonawanda",state:"NY",x:764,y:149,ev:"C"},
{name:"Oceanside",state:"NY",x:859,y:181,ev:"Q"},
{name:"Orchard Park",state:"NY",x:768,y:154,ev:"Q"},
{name:"Penfield",state:"NY",x:789,y:145,ev:"Q"},
{name:"Pleasantville",state:"NY",x:856,y:173,ev:"P"},
{name:"Roosevelt",state:"NY",x:859,y:180,ev:"Q"},
{name:"Roscoe",state:"NY",x:835,y:162,ev:"Q"},
{name:"Saratoga Springs",state:"NY",x:852,y:140,ev:"Q"},
{name:"Sayville",state:"NY",x:868,y:177,ev:"Q"},
{name:"Scarsdale",state:"NY",x:856,y:175,ev:"P"},
{name:"Sea Cliff",state:"NY",x:858,y:177,ev:"C"},
{name:"Seaford",state:"NY",x:861,y:180,ev:"Q"},
{name:"Tonawanda",state:"NY",x:764,y:150,ev:"Q"},
{name:"Tuxedo Park",state:"NY",x:848,y:173,ev:"C"},
{name:"Valley Stream",state:"NY",x:857,y:180,ev:"Q"},
{name:"West Elmira",state:"NY",x:802,y:163,ev:"Q"},
{name:"Whitesboro",state:"NY",x:826,y:142,ev:"P"},
{name:"Bakersville",state:"NC",x:715,y:290,ev:"Q"},
{name:"Brasstown",state:"NC",x:684,y:315,ev:"P"},
{name:"Faith",state:"NC",x:741,y:295,ev:"Q"},
{name:"Graham County",state:"NC",x:687,y:308,ev:"C"},
{name:"Hot Springs",state:"NC",x:704,y:295,ev:"Q"},
{name:"King",state:"NC",x:744,y:280,ev:"Q"},
{name:"Kure Beach",state:"NC",x:774,y:319,ev:"Q"},
{name:"Mayodan",state:"NC",x:751,y:276,ev:"Q"},
{name:"Mitchell County",state:"NC",x:715,y:290,ev:"P"},
{name:"Rosman",state:"NC",x:702,y:310,ev:"P"},
{name:"Southern Shores",state:"NC",x:817,y:269,ev:"Q"},
{name:"Spruce Pine",state:"NC",x:716,y:292,ev:"Q"},
{name:"Surf City",state:"NC",x:782,y:309,ev:"Q"},
{name:"Swain County",state:"NC",x:693,y:303,ev:"P"},
{name:"Trent Woods",state:"NC",x:792,y:294,ev:"Q"},
{name:"Wrightsville Beach",state:"NC",x:777,y:314,ev:"Q"},
{name:"Barnes County",state:"ND",x:393,y:55,ev:"Q"},
{name:"Emmons County",state:"ND",x:361,y:62,ev:"Q"},
{name:"Fargo",state:"ND",x:417,y:60,ev:"Q"},
{name:"LaMoure County",state:"ND",x:390,y:64,ev:"Q"},
{name:"McLean County",state:"ND",x:323,y:28,ev:"Q"},
{name:"Rolette County",state:"ND",x:337,y:10,ev:"Q"},
{name:"Traill County",state:"ND",x:404,y:47,ev:"Q"},
{name:"Ada",state:"OH",x:688,y:197,ev:"Q"},
{name:"Alger",state:"OH",x:687,y:198,ev:"P"},
{name:"Amherst",state:"OH",x:713,y:183,ev:"P"},
{name:"Ansonia",state:"OH",x:675,y:208,ev:"P"},
{name:"Antwerp",state:"OH",x:671,y:189,ev:"P"},
{name:"Arcanum",state:"OH",x:677,y:213,ev:"P"},
{name:"Ashville",state:"OH",x:704,y:216,ev:"P"},
{name:"Avon",state:"OH",x:716,y:182,ev:"Q"},
{name:"Avon Lake",state:"OH",x:716,y:181,ev:"P"},
{name:"Bay Village",state:"OH",x:718,y:181,ev:"Q"},
{name:"Bedford",state:"OH",x:725,y:182,ev:"Q"},
{name:"Bellevue",state:"OH",x:703,y:186,ev:"Q"},
{name:"Bethel",state:"OH",x:686,y:233,ev:"Q"},
{name:"Beverly",state:"OH",x:726,y:218,ev:"Q"},
{name:"Blanchester",state:"OH",x:688,y:226,ev:"Q"},
{name:"Bluffton",state:"OH",x:686,y:194,ev:"Q"},
{name:"Bridgetown",state:"OH",x:677,y:230,ev:"Q"},
{name:"Broadview Heights",state:"OH",x:722,y:184,ev:"Q"},
{name:"Brooklyn",state:"OH",x:721,y:182,ev:"Q"},
{name:"Brookville",state:"OH",x:680,y:216,ev:"Q"},
{name:"Brunswick",state:"OH",x:720,y:185,ev:"P"},
{name:"Bryan",state:"OH",x:673,y:183,ev:"Q"},
{name:"Caldwell",state:"OH",x:728,y:214,ev:"P"},
{name:"Canfield",state:"OH",x:738,y:188,ev:"Q"},
{name:"Carey",state:"OH",x:694,y:193,ev:"Q"},
{name:"Carrollton",state:"OH",x:734,y:197,ev:"Q"},
{name:"Celina",state:"OH",x:676,y:202,ev:"P"},
{name:"Chagrin Falls",state:"OH",x:727,y:181,ev:"P"},
{name:"Chardon",state:"OH",x:730,y:178,ev:"Q"},
{name:"Chesapeake",state:"OH",x:713,y:241,ev:"Q"},
{name:"Cheviot",state:"OH",x:677,y:230,ev:"Q"},
{name:"Chippewa Township",state:"OH",x:723,y:191,ev:"P"},
{name:"Clyde",state:"OH",x:700,y:185,ev:"Q"},
{name:"Coal Grove",state:"OH",x:710,y:240,ev:"P"},
{name:"Coldwater",state:"OH",x:675,y:203,ev:"Q"},
{name:"Columbiana",state:"OH",x:740,y:191,ev:"P"},
{name:"Corning",state:"OH",x:719,y:217,ev:"P"},
{name:"Crooksville",state:"OH",x:718,y:214,ev:"Q"},
{name:"Cuyahoga Falls",state:"OH",x:725,y:186,ev:"P"},
{name:"Deer Park",state:"OH",x:681,y:229,ev:"Q"},
{name:"Delphos",state:"OH",x:679,y:196,ev:"Q"},
{name:"Eastlake",state:"OH",x:726,y:177,ev:"Q"},
{name:"Fairborn",state:"OH",x:687,y:216,ev:"Q"},
{name:"Fairview",state:"OH",x:732,y:207,ev:"Q"},
{name:"Fort Recovery",state:"OH",x:672,y:205,ev:"Q"},
{name:"Galion",state:"OH",x:705,y:196,ev:"Q"},
{name:"Garrettsville",state:"OH",x:732,y:184,ev:"Q"},
{name:"Germantown",state:"OH",x:681,y:220,ev:"Q"},
{name:"Gibsonburg",state:"OH",x:694,y:184,ev:"Q"},
{name:"Greenhills",state:"OH",x:679,y:227,ev:"P"},
{name:"Grove City",state:"OH",x:710,y:240,ev:"Q"},
{name:"Grove City",state:"OH",x:683,y:194,ev:"Q"},
{name:"Grove City",state:"OH",x:702,y:214,ev:"Q"},
{name:"Grove City",state:"OH",x:705,y:214,ev:"Q"},
{name:"Grove City",state:"OH",x:676,y:192,ev:"Q"},
{name:"Grove City",state:"OH",x:711,y:218,ev:"Q"},
{name:"Harrison",state:"OH",x:675,y:228,ev:"Q"},
{name:"Hicksville",state:"OH",x:677,y:187,ev:"Q"},
{name:"Hubbard",state:"OH",x:742,y:185,ev:"Q"},
{name:"Hudson",state:"OH",x:727,y:185,ev:"Q"},
{name:"Huron",state:"OH",x:707,y:183,ev:"P"},
{name:"Independence",state:"OH",x:723,y:183,ev:"P"},
{name:"Jefferson",state:"OH",x:737,y:175,ev:"Q"},
{name:"Johnstown",state:"OH",x:708,y:208,ev:"Q"},
{name:"Kettering",state:"OH",x:684,y:218,ev:"Q"},
{name:"Lakemore",state:"OH",x:727,y:189,ev:"Q"},
{name:"Lakewood",state:"OH",x:720,y:181,ev:"Q"},
{name:"Loudonville",state:"OH",x:715,y:198,ev:"P"},
{name:"Louisville",state:"OH",x:731,y:192,ev:"P"},
{name:"Lynchburg",state:"OH",x:691,y:227,ev:"P"},
{name:"Lyndhurst",state:"OH",x:725,y:180,ev:"Q"},
{name:"Mariemont",state:"OH",x:681,y:230,ev:"Q"},
{name:"Mayfield",state:"OH",x:726,y:179,ev:"Q"},
{name:"Mayfield Heights",state:"OH",x:726,y:180,ev:"Q"},
{name:"McDonald",state:"OH",x:739,y:186,ev:"Q"},
{name:"Miamisburg",state:"OH",x:683,y:220,ev:"P"},
{name:"Middletown",state:"OH",x:681,y:222,ev:"Q"},
{name:"Millersburg",state:"OH",x:720,y:199,ev:"Q"},
{name:"Minerva",state:"OH",x:733,y:194,ev:"Q"},
{name:"Mogadore",state:"OH",x:728,y:189,ev:"P"},
{name:"Montpelier",state:"OH",x:672,y:181,ev:"Q"},
{name:"Mount Gilead",state:"OH",x:705,y:200,ev:"P"},
{name:"Mount Sterling",state:"OH",x:699,y:217,ev:"P"},
{name:"Napoleon",state:"OH",x:681,y:185,ev:"P"},
{name:"Neffs",state:"OH",x:739,y:207,ev:"P"},
{name:"New Boston",state:"OH",x:705,y:236,ev:"P"},
{name:"New Lexington",state:"OH",x:717,y:215,ev:"P"},
{name:"Newburgh Heights",state:"OH",x:722,y:181,ev:"P"},
{name:"Newton Falls",state:"OH",x:735,y:185,ev:"Q"},
{name:"Niles",state:"OH",x:738,y:185,ev:"P"},
{name:"North Baltimore",state:"OH",x:689,y:188,ev:"P"},
{name:"North Olmsted",state:"OH",x:718,y:182,ev:"Q"},
{name:"Norwood",state:"OH",x:680,y:230,ev:"Q"},
{name:"Oak Harbor",state:"OH",x:697,y:182,ev:"P"},
{name:"Oakwood",state:"OH",x:684,y:218,ev:"Q"},
{name:"Ottawa",state:"OH",x:683,y:192,ev:"Q"},
{name:"Ottawa Hills",state:"OH",x:688,y:179,ev:"Q"},
{name:"Parma",state:"OH",x:721,y:183,ev:"C"},
{name:"Parma Heights",state:"OH",x:721,y:183,ev:"Q"},
{name:"Poland",state:"OH",x:741,y:188,ev:"Q"},
{name:"Reading",state:"OH",x:680,y:228,ev:"P"},
{name:"Reynoldsburg",state:"OH",x:707,y:211,ev:"Q"},
{name:"Rittman",state:"OH",x:721,y:191,ev:"P"},
{name:"Rocky River",state:"OH",x:719,y:181,ev:"Q"},
{name:"Seven Hills",state:"OH",x:722,y:183,ev:"Q"},
{name:"Shadyside",state:"OH",x:741,y:208,ev:"P"},
{name:"Shawnee",state:"OH",x:675,y:230,ev:"P"},
{name:"Sheffield Lake",state:"OH",x:715,y:181,ev:"Q"},
{name:"Shelby",state:"OH",x:707,y:193,ev:"P"},
{name:"Silver Lake",state:"OH",x:727,y:187,ev:"P"},
{name:"Solon",state:"OH",x:726,y:182,ev:"Q"},
{name:"South Amherst",state:"OH",x:713,y:184,ev:"Q"},
{name:"South Lebanon",state:"OH",x:684,y:225,ev:"P"},
{name:"St. Bernard",state:"OH",x:679,y:229,ev:"Q"},
{name:"St. Marys",state:"OH",x:679,y:202,ev:"Q"},
{name:"Stow",state:"OH",x:727,y:186,ev:"Q"},
{name:"Strasburg",state:"OH",x:727,y:197,ev:"P"},
{name:"Strongsville",state:"OH",x:720,y:184,ev:"Q"},
{name:"Sylvania",state:"OH",x:687,y:178,ev:"P"},
{name:"Syracuse",state:"OH",x:721,y:229,ev:"C"},
{name:"Tallmadge",state:"OH",x:727,y:188,ev:"Q"},
{name:"Tipp City",state:"OH",x:683,y:213,ev:"Q"},
{name:"Trenton",state:"OH",x:680,y:223,ev:"Q"},
{name:"University Heights",state:"OH",x:724,y:180,ev:"Q"},
{name:"Upper Arlington",state:"OH",x:702,y:210,ev:"Q"},
{name:"Upper Sandusky",state:"OH",x:697,y:195,ev:"P"},
{name:"Utica",state:"OH",x:712,y:206,ev:"Q"},
{name:"Vermilion",state:"OH",x:711,y:183,ev:"Q"},
{name:"Wapakoneta",state:"OH",x:682,y:201,ev:"P"},
{name:"Warrensville Heights",state:"OH",x:725,y:181,ev:"Q"},
{name:"Wauseon",state:"OH",x:680,y:182,ev:"P"},
{name:"West Liberty",state:"OH",x:690,y:207,ev:"P"},
{name:"West Milton",state:"OH",x:681,y:213,ev:"Q"},
{name:"West Portsmouth",state:"OH",x:704,y:236,ev:"Q"},
{name:"Westlake",state:"OH",x:718,y:182,ev:"Q"},
{name:"Wheelersburg",state:"OH",x:707,y:236,ev:"Q"},
{name:"Williamsburg",state:"OH",x:687,y:231,ev:"P"},
{name:"Willowick",state:"OH",x:725,y:178,ev:"Q"},
{name:"Woodsfield",state:"OH",x:735,y:213,ev:"P"},
{name:"Allen",state:"OK",x:487,y:336,ev:"P"},
{name:"Alva",state:"OK",x:450,y:288,ev:"P"},
{name:"Apache",state:"OK",x:456,y:336,ev:"P"},
{name:"Arkoma",state:"OK",x:519,y:324,ev:"Q"},
{name:"Barnsdall",state:"OK",x:491,y:294,ev:"C"},
{name:"Bixby",state:"OK",x:496,y:309,ev:"Q"},
{name:"Blackwell",state:"OK",x:472,y:288,ev:"C"},
{name:"Blair",state:"OK",x:441,y:338,ev:"P"},
{name:"Boise City",state:"OK",x:388,y:286,ev:"P"},
{name:"Broken Arrow",state:"OK",x:497,y:307,ev:"P"},
{name:"Caddo",state:"OK",x:488,y:355,ev:"P"},
{name:"Carnegie",state:"OK",x:452,y:330,ev:"P"},
{name:"Cherokee",state:"OK",x:455,y:289,ev:"P"},
{name:"Cleveland",state:"OK",x:486,y:300,ev:"Q"},
{name:"Collinsville",state:"OK",x:496,y:299,ev:"P"},
{name:"Colony",state:"OK",x:451,y:324,ev:"Q"},
{name:"Comanche",state:"OK",x:462,y:349,ev:"P"},
{name:"Commerce",state:"OK",x:512,y:285,ev:"P"},
{name:"Durant",state:"OK",x:486,y:358,ev:"Q"},
{name:"Edmond",state:"OK",x:471,y:316,ev:"P"},
{name:"Erick",state:"OK",x:432,y:327,ev:"P"},
{name:"Gore",state:"OK",x:508,y:319,ev:"Q"},
{name:"Greer County",state:"OK",x:437,y:334,ev:"P"},
{name:"Grove",state:"OK",x:513,y:294,ev:"Q"},
{name:"Haileyville",state:"OK",x:500,y:336,ev:"P"},
{name:"Healdton",state:"OK",x:469,y:352,ev:"P"},
{name:"Henryetta",state:"OK",x:494,y:322,ev:"C"},
{name:"Hinton",state:"OK",x:456,y:320,ev:"P"},
{name:"Hooker",state:"OK",x:409,y:284,ev:"P"},
{name:"Jenks",state:"OK",x:494,y:308,ev:"P"},
{name:"Lawton",state:"OK",x:455,y:343,ev:"Q"},
{name:"Lexington",state:"OK",x:472,y:332,ev:"C"},
{name:"Lindsay",state:"OK",x:468,y:337,ev:"P"},
{name:"Madill",state:"OK",x:480,y:356,ev:"P"},
{name:"Marlow",state:"OK",x:462,y:342,ev:"C"},
{name:"Marshall",state:"OK",x:468,y:304,ev:"Q"},
{name:"Medford",state:"OK",x:465,y:288,ev:"P"},
{name:"Morris",state:"OK",x:496,y:318,ev:"P"},
{name:"Norman",state:"OK",x:472,y:327,ev:"C"},
{name:"Okeene",state:"OK",x:457,y:305,ev:"P"},
{name:"Okemah",state:"OK",x:489,y:322,ev:"P"},
{name:"Ottawa County",state:"OK",x:513,y:288,ev:"Q"},
{name:"Paden",state:"OK",x:485,y:320,ev:"Q"},
{name:"Purcell",state:"OK",x:472,y:332,ev:"Q"},
{name:"Sapulpa",state:"OK",x:492,y:308,ev:"P"},
{name:"Skiatook",state:"OK",x:495,y:300,ev:"Q"},
{name:"Stilwell",state:"OK",x:516,y:312,ev:"P"},
{name:"Stroud",state:"OK",x:484,y:314,ev:"C"},
{name:"Taft",state:"OK",x:501,y:314,ev:"Q"},
{name:"Walters",state:"OK",x:456,y:349,ev:"Q"},
{name:"Welch",state:"OK",x:508,y:287,ev:"P"},
{name:"Ashland",state:"OR",x:7,y:62,ev:"P"},
{name:"Grants Pass",state:"OR",x:-7,y:51,ev:"C"},
{name:"Jacksonville",state:"OR",x:1,y:56,ev:"Q"},
{name:"La Grande",state:"OR",x:49,y:2,ev:"Q"},
{name:"Medford",state:"OR",x:2,y:56,ev:"C"},
{name:"Milton",state:"OR",x:35,y:-16,ev:"C"},
{name:"Oakridge",state:"OR",x:-9,y:18,ev:"P"},
{name:"Pendleton",state:"OR",x:31,y:-12,ev:"Q"},
{name:"Roseburg",state:"OR",x:-18,y:27,ev:"P"},
{name:"Bradford",state:"PA",x:772,y:168,ev:"Q"},
{name:"Camp Hill",state:"PA",x:804,y:196,ev:"P"},
{name:"Canadensis",state:"PA",x:831,y:175,ev:"C"},
{name:"Clymer",state:"PA",x:769,y:192,ev:"P"},
{name:"Coatesville",state:"PA",x:823,y:198,ev:"Q"},
{name:"Conestoga",state:"PA",x:814,y:200,ev:"P"},
{name:"Corry",state:"PA",x:755,y:170,ev:"P"},
{name:"Elizabethtown",state:"PA",x:809,y:197,ev:"C"},
{name:"Everett",state:"PA",x:780,y:203,ev:"Q"},
{name:"Folcroft",state:"PA",x:832,y:198,ev:"P"},
{name:"Folcroft",state:"PA",x:832,y:198,ev:"P"},
{name:"Hanover",state:"PA",x:745,y:197,ev:"P"},
{name:"Hatboro",state:"PA",x:834,y:193,ev:"Q"},
{name:"Hershey",state:"PA",x:809,y:194,ev:"Q"},
{name:"Irwin",state:"PA",x:758,y:200,ev:"Q"},
{name:"Jim Thorpe",state:"PA",x:823,y:182,ev:"Q"},
{name:"Johnston",state:"PA",x:791,y:206,ev:"Q"},
{name:"Johnstown",state:"PA",x:771,y:198,ev:"Q"},
{name:"Lansford",state:"PA",x:821,y:183,ev:"Q"},
{name:"Levittown",state:"PA",x:839,y:192,ev:"Q"},
{name:"Locust Gap",state:"PA",x:812,y:185,ev:"Q"},
{name:"Manheim",state:"PA",x:813,y:196,ev:"Q"},
{name:"Mechanicsburg",state:"PA",x:803,y:196,ev:"Q"},
{name:"Millvale",state:"PA",x:753,y:197,ev:"Q"},
{name:"Mount Lebanon",state:"PA",x:752,y:199,ev:"Q"},
{name:"Nazareth",state:"PA",x:830,y:183,ev:"Q"},
{name:"Nesquehoning",state:"PA",x:822,y:182,ev:"Q"},
{name:"New Bethlehem",state:"PA",x:763,y:186,ev:"Q"},
{name:"New Holland",state:"PA",x:818,y:196,ev:"P"},
{name:"Royersford",state:"PA",x:827,y:193,ev:"Q"},
{name:"Selingsgrove",state:"PA",x:804,y:186,ev:"Q"},
{name:"Shenandoah",state:"PA",x:816,y:184,ev:"P"},
{name:"Stoneboro",state:"PA",x:749,y:182,ev:"Q"},
{name:"Susquehanna",state:"PA",x:805,y:194,ev:"Q"},
{name:"Warren",state:"PA",x:764,y:171,ev:"Q"},
{name:"Shandon",state:"SC",x:726,y:330,ev:"Q"},
{name:"Adams",state:"PA",x:774,y:199,ev:"Q"},
{name:"Albany",state:"PA",x:811,y:170,ev:"Q"},
{name:"Allegheny",state:"PA",x:778,y:195,ev:"Q"},
{name:"Alsace",state:"PA",x:822,y:191,ev:"Q"},
{name:"Amity",state:"PA",x:824,y:192,ev:"Q"},
{name:"Archbald",state:"PA",x:825,y:170,ev:"Q"},
{name:"Ashland",state:"PA",x:758,y:182,ev:"Q"},
{name:"Bellwood",state:"PA",x:780,y:192,ev:"Q"},
{name:"Boyertown",state:"PA",x:825,y:191,ev:"Q"},
{name:"Cumberland",state:"RI",x:894,y:153,ev:"Q"},
{name:"Woonsocket",state:"RI",x:893,y:152,ev:"Q"},
{name:"Ellenton",state:"SC",x:713,y:344,ev:"Q"},
{name:"Folly Beach",state:"SC",x:734,y:355,ev:"Q"},
{name:"Hamburg",state:"SC",x:709,y:344,ev:"Q"},
{name:"Isle of Palms",state:"SC",x:739,y:351,ev:"Q"},
{name:"Moncks Corner",state:"SC",x:737,y:344,ev:"C"},
{name:"Princeton",state:"SC",x:708,y:323,ev:"Q"},
{name:"Salem",state:"SC",x:699,y:316,ev:"Q"},
{name:"Belle Fourche",state:"SD",x:314,y:87,ev:"Q"},
{name:"Canton",state:"SD",x:455,y:137,ev:"Q"},
{name:"Delmont",state:"SD",x:428,y:135,ev:"Q"},
{name:"Doland",state:"SD",x:414,y:99,ev:"Q"},
{name:"Lead",state:"SD",x:319,y:94,ev:"P"},
{name:"Spink County",state:"SD",x:410,y:98,ev:"Q"},
{name:"Baxter",state:"TN",x:660,y:295,ev:"Q"},
{name:"Celina",state:"TN",x:663,y:286,ev:"Q"},
{name:"Cookeville",state:"TN",x:662,y:295,ev:"Q"},
{name:"Copperhill",state:"TN",x:677,y:317,ev:"P"},
{name:"Crossville",state:"TN",x:669,y:298,ev:"P"},
{name:"Ducktown",state:"TN",x:677,y:317,ev:"P"},
{name:"Dunlap",state:"TN",x:662,y:311,ev:"P"},
{name:"East Ridge",state:"TN",x:664,y:319,ev:"Q"},
{name:"Englewood",state:"TN",x:677,y:308,ev:"P"},
{name:"Erwin",state:"TN",x:711,y:288,ev:"P"},
{name:"Fairview",state:"TN",x:636,y:301,ev:"Q"},
{name:"Gatlinburg",state:"TN",x:693,y:300,ev:"P"},
{name:"Greenbrier",state:"TN",x:642,y:291,ev:"Q"},
{name:"Jamestown",state:"TN",x:672,y:287,ev:"P"},
{name:"Lafayette",state:"TN",x:654,y:287,ev:"P"},
{name:"Lenoir City",state:"TN",x:681,y:300,ev:"Q"},
{name:"Monterey",state:"TN",x:666,y:294,ev:"P"},
{name:"Norris",state:"TN",x:685,y:290,ev:"P"},
{name:"North Chattanooga",state:"TN",x:663,y:318,ev:"C"},
{name:"Oneida",state:"TN",x:679,y:285,ev:"P"},
{name:"Palmer",state:"TN",x:660,y:312,ev:"P"},
{name:"Signal Mountain",state:"TN",x:663,y:316,ev:"P"},
{name:"Soddy-Daisy",state:"TN",x:665,y:313,ev:"Q"},
{name:"Tracy City",state:"TN",x:656,y:315,ev:"P"},
{name:"Waynesboro",state:"TN",x:625,y:317,ev:"P"},
{name:"Alamo",state:"TX",x:417,y:571,ev:"Q"},
{name:"Alba",state:"TX",x:495,y:388,ev:"C"},
{name:"Archer City",state:"TX",x:450,y:369,ev:"P"},
{name:"Armstrong County",state:"TX",x:408,y:333,ev:"Q"},
{name:"Aubrey",state:"TX",x:476,y:376,ev:"P"},
{name:"Benavides",state:"TX",x:425,y:531,ev:"Q"},
{name:"Bevil Oaks",state:"TX",x:503,y:454,ev:"Q"},
{name:"Big Spring",state:"TX",x:403,y:406,ev:"P"},
{name:"Boerne",state:"TX",x:435,y:471,ev:"Q"},
{name:"Bowie",state:"TX",x:463,y:370,ev:"P"},
{name:"Briscoe County",state:"TX",x:411,y:345,ev:"Q"},
{name:"Canadian",state:"TX",x:423,y:309,ev:"P"},
{name:"Canyon",state:"TX",x:399,y:332,ev:"Q"},
{name:"Carson County",state:"TX",x:408,y:321,ev:"Q"},
{name:"Castro County",state:"TX",x:394,y:344,ev:"Q"},
{name:"Childress County",state:"TX",x:427,y:345,ev:"Q"},
{name:"Collingsworth County",state:"TX",x:426,y:333,ev:"Q"},
{name:"Comanche",state:"TX",x:446,y:414,ev:"C"},
{name:"Comanche County",state:"TX",x:447,y:412,ev:"C"},
{name:"Copperas Cove",state:"TX",x:454,y:434,ev:"P"},
{name:"Cotulla",state:"TX",x:419,y:509,ev:"Q"},
{name:"Cumby",state:"TX",x:493,y:379,ev:"P"},
{name:"Cut and Shoot",state:"TX",x:488,y:451,ev:"Q"},
{name:"Dalhart",state:"TX",x:389,y:303,ev:"Q"},
{name:"Dallam County",state:"TX",x:387,y:297,ev:"P"},
{name:"De Leon",state:"TX",x:448,y:408,ev:"C"},
{name:"Deaf Smith",state:"TX",x:388,y:333,ev:"Q"},
{name:"Deaf Smith County",state:"TX",x:388,y:333,ev:"Q"},
{name:"Donley County",state:"TX",x:417,y:333,ev:"Q"},
{name:"Donna",state:"TX",x:418,y:571,ev:"Q"},
{name:"Dumas",state:"TX",x:398,y:309,ev:"Q"},
{name:"Edcouch",state:"TX",x:420,y:567,ev:"Q"},
{name:"Evadale",state:"TX",x:508,y:449,ev:"Q"},
{name:"Everman",state:"TX",x:469,y:394,ev:"Q"},
{name:"Fremont",state:"TX",x:427,y:537,ev:"Q"},
{name:"Glen Rose",state:"TX",x:461,y:404,ev:"Q"},
{name:"Goldthwaite",state:"TX",x:445,y:426,ev:"Q"},
{name:"Grand Saline",state:"TX",x:493,y:391,ev:"C"},
{name:"Gray County",state:"TX",x:417,y:322,ev:"Q"},
{name:"Hall County",state:"TX",x:421,y:347,ev:"Q"},
{name:"Hamilton",state:"TX",x:453,y:419,ev:"Q"},
{name:"Hamilton County",state:"TX",x:453,y:418,ev:"C"},
{name:"Hansford County",state:"TX",x:407,y:299,ev:"Q"},
{name:"Hartley County",state:"TX",x:388,y:309,ev:"Q"},
{name:"Hemphill County",state:"TX",x:425,y:311,ev:"Q"},
{name:"Hereford",state:"TX",x:392,y:336,ev:"Q"},
{name:"Hico",state:"TX",x:455,y:411,ev:"Q"},
{name:"Highland Park",state:"TX",x:477,y:388,ev:"C"},
{name:"Highlands",state:"TX",x:490,y:465,ev:"Q"},
{name:"Hillcrest",state:"TX",x:484,y:476,ev:"Q"},
{name:"Holliday",state:"TX",x:450,y:363,ev:"P"},
{name:"Hutchinson County",state:"TX",x:408,y:310,ev:"Q"},
{name:"Iowa Park",state:"TX",x:450,y:360,ev:"Q"},
{name:"Irving",state:"TX",x:475,y:387,ev:"P"},
{name:"Jacinto City",state:"TX",x:487,y:466,ev:"Q"},
{name:"Killeen",state:"TX",x:456,y:435,ev:"Q"},
{name:"Kirvin",state:"TX",x:481,y:415,ev:"P"},
{name:"Lake Jackson",state:"TX",x:479,y:486,ev:"Q"},
{name:"Lakeview",state:"TX",x:419,y:341,ev:"Q"},
{name:"Lipscomb County",state:"TX",x:425,y:300,ev:"Q"},
{name:"Lumberton",state:"TX",x:505,y:451,ev:"Q"},
{name:"Montague County",state:"TX",x:465,y:367,ev:"P"},
{name:"Moore County",state:"TX",x:399,y:310,ev:"Q"},
{name:"Moulton",state:"TX",x:457,y:475,ev:"P"},
{name:"Nederland",state:"TX",x:506,y:458,ev:"Q"},
{name:"Oak Knoll",state:"TX",x:469,y:390,ev:"Q"},
{name:"Ochiltree County",state:"TX",x:416,y:299,ev:"Q"},
{name:"Oldham County",state:"TX",x:388,y:320,ev:"Q"},
{name:"Orange",state:"TX",x:511,y:454,ev:"Q"},
{name:"Paradise",state:"TX",x:464,y:380,ev:"Q"},
{name:"Parmer County",state:"TX",x:386,y:343,ev:"Q"},
{name:"Pasadena",state:"TX",x:487,y:469,ev:"Q"},
{name:"Perryton",state:"TX",x:416,y:296,ev:"P"},
{name:"Pharr",state:"TX",x:416,y:571,ev:"Q"},
{name:"Phillips",state:"TX",x:408,y:314,ev:"Q"},
{name:"Pinewood Estates",state:"TX",x:503,y:454,ev:"Q"},
{name:"Port Neches",state:"TX",x:507,y:459,ev:"Q"},
{name:"Porter Heights",state:"TX",x:488,y:456,ev:"Q"},
{name:"Potter County",state:"TX",x:400,y:321,ev:"Q"},
{name:"Randall County",state:"TX",x:400,y:333,ev:"Q"},
{name:"Rio Grande City",state:"TX",x:409,y:566,ev:"Q"},
{name:"River Oaks",state:"TX",x:468,y:390,ev:"Q"},
{name:"Robert Lee",state:"TX",x:418,y:415,ev:"Q"},
{name:"Roberts County",state:"TX",x:416,y:310,ev:"Q"},
{name:"San Diego",state:"TX",x:429,y:526,ev:"Q"},
{name:"San Juan",state:"TX",x:416,y:570,ev:"Q"},
{name:"Santa Fe",state:"TX",x:486,y:476,ev:"P"},
{name:"Scurry County",state:"TX",x:413,y:392,ev:"P"},
{name:"Shamrock",state:"TX",x:426,y:327,ev:"P"},
{name:"Sherman County",state:"TX",x:399,y:298,ev:"Q"},
{name:"Slocum",state:"TX",x:493,y:418,ev:"Q"},
{name:"Spearman",state:"TX",x:410,y:301,ev:"Q"},
{name:"Stinnett",state:"TX",x:406,y:310,ev:"Q"},
{name:"Sunnyvale",state:"TX",x:481,y:389,ev:"C"},
{name:"Swisher County",state:"TX",x:402,y:344,ev:"Q"},
{name:"Throckmorton",state:"TX",x:441,y:380,ev:"C"},
{name:"Throckmorton County",state:"TX",x:441,y:380,ev:"C"},
{name:"Tioga",state:"TX",x:477,y:372,ev:"P"},
{name:"Vidor",state:"TX",x:507,y:454,ev:"C"},
{name:"West Orange",state:"TX",x:511,y:455,ev:"Q"},
{name:"Wheeler County",state:"TX",x:426,y:322,ev:"C"},
{name:"White Deer",state:"TX",x:411,y:321,ev:"P"},
{name:"White Settlement",state:"TX",x:467,y:390,ev:"Q"},
{name:"Whitesboro",state:"TX",x:478,y:367,ev:"P"},
{name:"Winnie",state:"TX",x:500,y:463,ev:"Q"},
{name:"Bingham",state:"UT",x:207,y:160,ev:"Q"},
{name:"Blanding",state:"UT",x:270,y:248,ev:"Q"},
{name:"Bluffdale",state:"UT",x:211,y:163,ev:"Q"},
{name:"Brigham City",state:"UT",x:200,y:135,ev:"Q"},
{name:"Carbon",state:"UT",x:240,y:189,ev:"Q"},
{name:"Corinne",state:"UT",x:199,y:133,ev:"P"},
{name:"Eagle Mountain",state:"UT",x:211,y:167,ev:"Q"},
{name:"Murray",state:"UT",x:210,y:158,ev:"P"},
{name:"Price",state:"UT",x:237,y:191,ev:"C"},
{name:"Bellows Falls",state:"VT",x:874,y:137,ev:"Q"},
{name:"Colchester",state:"VT",x:856,y:116,ev:"Q"},
{name:"Morrisville",state:"VT",x:867,y:115,ev:"P"},
{name:"Poultney",state:"VT",x:860,y:132,ev:"Q"},
{name:"Swanton",state:"VT",x:856,y:110,ev:"Q"},
{name:"Tunbridge",state:"VT",x:871,y:125,ev:"P"},
{name:"Waterbury",state:"VT",x:865,y:118,ev:"Q"},
{name:"Buchanan County",state:"VA",x:719,y:264,ev:"P"},
{name:"Chincoteague",state:"VA",x:829,y:233,ev:"Q"},
{name:"Clintwood",state:"VA",x:713,y:267,ev:"P"},
{name:"Colonial Heights",state:"VA",x:794,y:253,ev:"P"},
{name:"Elkton",state:"VA",x:776,y:234,ev:"Q"},
{name:"Fieldale",state:"VA",x:752,y:271,ev:"Q"},
{name:"Grundy",state:"VA",x:719,y:264,ev:"C"},
{name:"Narrows",state:"VA",x:739,y:260,ev:"Q"},
{name:"Poquoson",state:"VA",x:811,y:252,ev:"Q"},
{name:"Richlands",state:"VA",x:723,y:267,ev:"P"},
{name:"Weber City",state:"VA",x:710,y:279,ev:"Q"},
{name:"Wise",state:"VA",x:710,y:271,ev:"P"},
{name:"Walla Walla",state:"WA",x:34,y:-20,ev:"Q"},
{name:"Belington",state:"WV",x:755,y:225,ev:"Q"},
{name:"Chester",state:"WV",x:743,y:196,ev:"P"},
{name:"Davy",state:"WV",x:726,y:259,ev:"Q"},
{name:"Eleanor",state:"WV",x:722,y:238,ev:"C"},
{name:"Follansbee",state:"WV",x:743,y:201,ev:"P"},
{name:"Kenova",state:"WV",x:711,y:242,ev:"Q"},
{name:"Lincoln County",state:"WV",x:720,y:246,ev:"Q"},
{name:"Marlinton",state:"WV",x:752,y:241,ev:"Q"},
{name:"Marmet",state:"WV",x:728,y:243,ev:"Q"},
{name:"McMechen",state:"WV",x:741,y:208,ev:"Q"},
{name:"Milton",state:"WV",x:718,y:241,ev:"Q"},
{name:"New Martinsville",state:"WV",x:739,y:215,ev:"P"},
{name:"Nitro",state:"WV",x:724,y:241,ev:"Q"},
{name:"Oak Hill",state:"WV",x:734,y:248,ev:"Q"},
{name:"Shannondale",state:"WV",x:790,y:217,ev:"Q"},
{name:"St. Marys",state:"WV",x:734,y:220,ev:"Q"},
{name:"Abbotsford",state:"WI",x:553,y:113,ev:"Q"},
{name:"Adams",state:"WI",x:569,y:133,ev:"Q"},
{name:"Adams",state:"WI",x:569,y:134,ev:"Q"},
{name:"Algoma",state:"WI",x:606,y:122,ev:"Q"},
{name:"Alma",state:"WI",x:529,y:123,ev:"Q"},
{name:"Altoona",state:"WI",x:534,y:114,ev:"Q"},
{name:"Amery",state:"WI",x:513,y:103,ev:"Q"},
{name:"Antigo",state:"WI",x:572,y:110,ev:"Q"},
{name:"Appleton",state:"WI",x:592,y:128,ev:"C"},
{name:"Arcadia",state:"WI",x:537,y:125,ev:"Q"},
{name:"Ashland",state:"WI",x:528,y:80,ev:"P"},
{name:"Augusta",state:"WI",x:541,y:117,ev:"Q"},
{name:"Baldwin",state:"WI",x:516,y:110,ev:"Q"},
{name:"Baraboo",state:"WI",x:574,y:143,ev:"Q"},
{name:"Barron",state:"WI",x:521,y:102,ev:"Q"},
{name:"Barton",state:"WI",x:600,y:144,ev:"Q"},
{name:"Bayside",state:"WI",x:607,y:150,ev:"Q"},
{name:"Beaver Dam",state:"WI",x:590,y:144,ev:"P"},
{name:"Berlin",state:"WI",x:584,y:134,ev:"Q"},
{name:"Black River Falls",state:"WI",x:548,y:125,ev:"Q"},
{name:"Bloomer",state:"WI",x:530,y:108,ev:"Q"},
{name:"Boscobel",state:"WI",x:559,y:149,ev:"Q"},
{name:"Brillion",state:"WI",x:598,y:130,ev:"Q"},
{name:"Brodhead",state:"WI",x:585,y:161,ev:"Q"},
{name:"Brookfield",state:"WI",x:604,y:152,ev:"Q"},
{name:"Brown Deer",state:"WI",x:606,y:150,ev:"Q"},
{name:"Brown Deer",state:"WI",x:606,y:150,ev:"Q"},
{name:"Burlington",state:"WI",x:604,y:160,ev:"Q"},
{name:"Butler",state:"WI",x:605,y:151,ev:"Q"},
{name:"Campbellsport",state:"WI",x:598,y:142,ev:"Q"},
{name:"Campbellsport",state:"WI",x:598,y:142,ev:"Q"},
{name:"Cassville",state:"WI",x:557,y:157,ev:"Q"},
{name:"Cedar Grove",state:"WI",x:607,y:139,ev:"Q"},
{name:"Cedarburg",state:"WI",x:605,y:148,ev:"Q"},
{name:"Chetek",state:"WI",x:526,y:104,ev:"Q"},
{name:"Chilton",state:"WI",x:598,y:133,ev:"Q"},
{name:"Chippewa Falls",state:"WI",x:534,y:112,ev:"Q"},
{name:"Clinton",state:"WI",x:521,y:102,ev:"Q"},
{name:"Clinton",state:"WI",x:519,y:101,ev:"Q"},
{name:"Clintonville",state:"WI",x:583,y:121,ev:"Q"},
{name:"Colby",state:"WI",x:553,y:114,ev:"Q"},
{name:"Columbus",state:"WI",x:587,y:146,ev:"Q"},
{name:"Combined Locks",state:"WI",x:593,y:128,ev:"P"},
{name:"Combined Locks",state:"WI",x:593,y:128,ev:"P"},
{name:"Cornell",state:"WI",x:536,y:107,ev:"Q"},
{name:"Cottage Grove",state:"WI",x:585,y:151,ev:"Q"},
{name:"Cottage Grove (town)",state:"WI",x:586,y:152,ev:"Q"},
{name:"Crandon",state:"WI",x:573,y:102,ev:"Q"},
{name:"Cross Plains",state:"WI",x:578,y:150,ev:"Q"},
{name:"Cuba City",state:"WI",x:567,y:160,ev:"Q"},
{name:"Cudahy",state:"WI",x:609,y:155,ev:"Q"},
{name:"Cumberland",state:"WI",x:517,y:99,ev:"Q"},
{name:"Darlington",state:"WI",x:572,y:159,ev:"Q"},
{name:"De Forest",state:"WI",x:582,y:148,ev:"Q"},
{name:"De Pere",state:"WI",x:596,y:125,ev:"Q"},
{name:"Delafield",state:"WI",x:600,y:152,ev:"Q"},
{name:"Delavan Lake",state:"WI",x:598,y:161,ev:"Q"},
{name:"Denmark",state:"WI",x:601,y:127,ev:"Q"},
{name:"Dodgeville",state:"WI",x:570,y:153,ev:"Q"},
{name:"Durand",state:"WI",x:526,y:117,ev:"Q"},
{name:"Eagle River",state:"WI",x:563,y:95,ev:"Q"},
{name:"East Troy",state:"WI",x:602,y:158,ev:"Q"},
{name:"Eau Claire",state:"WI",x:533,y:114,ev:"Q"},
{name:"Edgerton",state:"WI",x:589,y:156,ev:"Q"},
{name:"Elkhorn",state:"WI",x:599,y:160,ev:"Q"},
{name:"Ellsworth",state:"WI",x:517,y:114,ev:"Q"},
{name:"Elm Grove",state:"WI",x:605,y:153,ev:"Q"},
{name:"Elm Grove",state:"WI",x:605,y:153,ev:"Q"},
{name:"Elroy",state:"WI",x:563,y:137,ev:"Q"},
{name:"Evansville",state:"WI",x:586,y:157,ev:"P"},
{name:"Fennimore",state:"WI",x:561,y:152,ev:"Q"},
{name:"Fond du Lac",state:"WI",x:594,y:138,ev:"Q"},
{name:"Fontana on Geneva Lake",state:"WI",x:600,y:163,ev:"Q"},
{name:"Fontana on Geneva Lake",state:"WI",x:600,y:163,ev:"Q"},
{name:"Fort Atkinson",state:"WI",x:593,y:155,ev:"Q"},
{name:"Galesville",state:"WI",x:541,y:129,ev:"Q"},
{name:"Genoa City",state:"WI",x:604,y:163,ev:"Q"},
{name:"Gillett",state:"WI",x:589,y:116,ev:"Q"},
{name:"Glendale",state:"WI",x:607,y:151,ev:"Q"},
{name:"Grafton",state:"WI",x:606,y:147,ev:"Q"},
{name:"Grand Rapids",state:"WI",x:567,y:125,ev:"Q"},
{name:"Green Bay",state:"WI",x:597,y:124,ev:"Q"},
{name:"Greendale",state:"WI",x:607,y:155,ev:"Q"},
{name:"Greendale",state:"WI",x:607,y:155,ev:"Q"},
{name:"Greenfield",state:"WI",x:607,y:154,ev:"Q"},
{name:"Greenwood",state:"WI",x:549,y:116,ev:"Q"},
{name:"Hales Corners",state:"WI",x:606,y:155,ev:"Q"},
{name:"Hales Corners",state:"WI",x:606,y:155,ev:"Q"},
{name:"Hartford",state:"WI",x:598,y:147,ev:"Q"},
{name:"Hartland",state:"WI",x:600,y:151,ev:"Q"},
{name:"Hayward",state:"WI",x:522,y:90,ev:"Q"},
{name:"Hillsboro",state:"WI",x:562,y:139,ev:"Q"},
{name:"Horicon",state:"WI",x:593,y:144,ev:"Q"},
{name:"Hortonville",state:"WI",x:587,y:127,ev:"Q"},
{name:"Hortonville",state:"WI",x:587,y:127,ev:"Q"},
{name:"Howard",state:"WI",x:595,y:123,ev:"Q"},
{name:"Hudson",state:"WI",x:510,y:109,ev:"Q"},
{name:"Hurley",state:"WI",x:541,y:84,ev:"Q"},
{name:"Janesville",state:"WI",x:591,y:159,ev:"C"},
{name:"Jefferson",state:"WI",x:593,y:153,ev:"Q"},
{name:"Juneau",state:"WI",x:592,y:145,ev:"Q"},
{name:"Kaukauna",state:"WI",x:594,y:128,ev:"Q"},
{name:"Kewaskum",state:"WI",x:594,y:138,ev:"Q"},
{name:"Kewaunee",state:"WI",x:606,y:125,ev:"P"},
{name:"Kiel",state:"WI",x:601,y:135,ev:"Q"},
{name:"Kimberly",state:"WI",x:593,y:128,ev:"Q"},
{name:"Kimberly",state:"WI",x:593,y:128,ev:"Q"},
{name:"Kohler",state:"WI",x:607,y:139,ev:"Q"},
{name:"La Crosse",state:"WI",x:545,y:134,ev:"Q"},
{name:"Ladysmith",state:"WI",x:534,y:102,ev:"Q"},
{name:"Lake Geneva",state:"WI",x:602,y:162,ev:"P"},
{name:"Lake Mills",state:"WI",x:591,y:152,ev:"Q"},
{name:"Lancaster",state:"WI",x:561,y:155,ev:"Q"},
{name:"Lannon",state:"WI",x:603,y:150,ev:"Q"},
{name:"Lannon",state:"WI",x:604,y:150,ev:"Q"},
{name:"Little Chute",state:"WI",x:593,y:128,ev:"Q"},
{name:"Little Chute",state:"WI",x:593,y:128,ev:"Q"},
{name:"Lodi",state:"WI",x:578,y:146,ev:"Q"},
{name:"Loyal",state:"WI",x:551,y:117,ev:"Q"},
{name:"Manawa",state:"WI",x:581,y:124,ev:"Q"},
{name:"Manitowoc",state:"WI",x:606,y:132,ev:"P"},
{name:"Maple Bluff",state:"WI",x:582,y:151,ev:"Q"},
{name:"Maple Bluff",state:"WI",x:582,y:151,ev:"Q"},
{name:"Marathon",state:"WI",x:564,y:113,ev:"Q"},
{name:"Marathon",state:"WI",x:561,y:114,ev:"Q"},
{name:"Marinette",state:"WI",x:599,y:113,ev:"P"},
{name:"Marion",state:"WI",x:580,y:120,ev:"Q"},
{name:"Markesan",state:"WI",x:585,y:139,ev:"Q"},
{name:"Marshfield",state:"WI",x:557,y:119,ev:"Q"},
{name:"Mauston",state:"WI",x:565,y:136,ev:"Q"},
{name:"Mayville",state:"WI",x:594,y:143,ev:"Q"},
{name:"Mazomanie",state:"WI",x:575,y:149,ev:"Q"},
{name:"McFarland",state:"WI",x:584,y:153,ev:"Q"},
{name:"McFarland",state:"WI",x:584,y:153,ev:"Q"},
{name:"Medford",state:"WI",x:551,y:109,ev:"Q"},
{name:"Mellen",state:"WI",x:534,y:85,ev:"Q"},
{name:"Menasha",state:"WI",x:592,y:129,ev:"P"},
{name:"Menomonee Falls",state:"WI",x:604,y:150,ev:"Q"},
{name:"Menomonee Falls",state:"WI",x:604,y:150,ev:"Q"},
{name:"Menomonie",state:"WI",x:525,y:112,ev:"Q"},
{name:"Mequon",state:"WI",x:605,y:149,ev:"C"},
{name:"Merrill",state:"WI",x:562,y:109,ev:"Q"},
{name:"Middleton",state:"WI",x:580,y:151,ev:"Q"},
{name:"Milton",state:"WI",x:592,y:158,ev:"Q"},
{name:"Mineral Point",state:"WI",x:570,y:155,ev:"Q"},
{name:"Mondovi",state:"WI",x:532,y:119,ev:"Q"},
{name:"Monona",state:"WI",x:583,y:152,ev:"Q"},
{name:"Monroe",state:"WI",x:581,y:161,ev:"Q"},
{name:"Montello",state:"WI",x:579,y:137,ev:"Q"},
{name:"Montreal",state:"WI",x:541,y:84,ev:"Q"},
{name:"Mosinee",state:"WI",x:565,y:117,ev:"Q"},
{name:"Mount Horeb",state:"WI",x:577,y:153,ev:"Q"},
{name:"Mount Horeb",state:"WI",x:577,y:153,ev:"Q"},
{name:"Mukwonago",state:"WI",x:602,y:158,ev:"Q"},
{name:"Muskego",state:"WI",x:605,y:156,ev:"Q"},
{name:"Neenah",state:"WI",x:591,y:130,ev:"Q"},
{name:"Neillsville",state:"WI",x:551,y:120,ev:"Q"},
{name:"Nekoosa",state:"WI",x:565,y:126,ev:"Q"},
{name:"Nekoosa",state:"WI",x:564,y:126,ev:"Q"},
{name:"New Berlin",state:"WI",x:605,y:154,ev:"Q"},
{name:"New Glarus",state:"WI",x:579,y:157,ev:"Q"},
{name:"New Holstein",state:"WI",x:599,y:135,ev:"Q"},
{name:"New Lisbon",state:"WI",x:563,y:135,ev:"Q"},
{name:"New London",state:"WI",x:585,y:125,ev:"Q"},
{name:"New Richmond",state:"WI",x:512,y:106,ev:"Q"},
{name:"Niagara",state:"WI",x:587,y:99,ev:"Q"},
{name:"North Fond du Lac",state:"WI",x:593,y:137,ev:"P"},
{name:"North Fond du Lac",state:"WI",x:593,y:137,ev:"P"},
{name:"North Hudson",state:"WI",x:509,y:108,ev:"Q"},
{name:"North Hudson",state:"WI",x:509,y:108,ev:"Q"},
{name:"Oconomowoc",state:"WI",x:598,y:151,ev:"Q"},
{name:"Oconto",state:"WI",x:596,y:117,ev:"Q"},
{name:"Oconto Falls",state:"WI",x:592,y:117,ev:"P"},
{name:"Okauchee Lake",state:"WI",x:598,y:151,ev:"Q"},
{name:"Omro",state:"WI",x:587,y:132,ev:"Q"},
{name:"Onalaska",state:"WI",x:545,y:133,ev:"Q"},
{name:"Oostburg",state:"WI",x:607,y:139,ev:"Q"},
{name:"Oostburg",state:"WI",x:606,y:139,ev:"Q"},
{name:"Oregon",state:"WI",x:583,y:155,ev:"Q"},
{name:"Oshkosh",state:"WI",x:591,y:133,ev:"Q"},
{name:"Osseo",state:"WI",x:540,y:119,ev:"Q"},
{name:"Owen",state:"WI",x:548,y:113,ev:"Q"},
{name:"Palmyra (town)",state:"WI",x:597,y:156,ev:"Q"},
{name:"Palmyra (village)",state:"WI",x:597,y:156,ev:"Q"},
{name:"Pardeeville",state:"WI",x:581,y:142,ev:"Q"},
{name:"Pardeeville",state:"WI",x:581,y:142,ev:"Q"},
{name:"Park Falls",state:"WI",x:542,y:93,ev:"Q"},
{name:"Peshtigo",state:"WI",x:597,y:113,ev:"Q"},
{name:"Pewaukee",state:"WI",x:602,y:152,ev:"Q"},
{name:"Phillips",state:"WI",x:545,y:98,ev:"Q"},
{name:"Platteville",state:"WI",x:566,y:158,ev:"Q"},
{name:"Plymouth",state:"WI",x:603,y:139,ev:"Q"},
{name:"Port Edwards",state:"WI",x:566,y:124,ev:"Q"},
{name:"Port Edwards",state:"WI",x:565,y:125,ev:"Q"},
{name:"Port Washington",state:"WI",x:607,y:146,ev:"P"},
{name:"Portage",state:"WI",x:578,y:142,ev:"Q"},
{name:"Poynette",state:"WI",x:580,y:145,ev:"Q"},
{name:"Poynette",state:"WI",x:580,y:145,ev:"Q"},
{name:"Prairie du Chien",state:"WI",x:552,y:151,ev:"Q"},
{name:"Prairie du Sac",state:"WI",x:574,y:147,ev:"Q"},
{name:"Prescott",state:"WI",x:510,y:113,ev:"Q"},
{name:"Princeton",state:"WI",x:582,y:136,ev:"Q"},
{name:"Pulaski",state:"WI",x:592,y:121,ev:"Q"},
{name:"Randolph",state:"WI",x:585,y:141,ev:"Q"},
{name:"Reedsburg",state:"WI",x:569,y:142,ev:"Q"},
{name:"Rhinelander",state:"WI",x:563,y:100,ev:"Q"},
{name:"Rice Lake",state:"WI",x:523,y:100,ev:"Q"},
{name:"Richland Center",state:"WI",x:563,y:145,ev:"Q"},
{name:"Ripon",state:"WI",x:587,y:136,ev:"P"},
{name:"River Falls",state:"WI",x:512,y:111,ev:"Q"},
{name:"River Hills",state:"WI",x:607,y:150,ev:"Q"},
{name:"Rothschild",state:"WI",x:566,y:115,ev:"Q"},
{name:"Rothschild",state:"WI",x:566,y:115,ev:"Q"},
{name:"Sauk City",state:"WI",x:574,y:147,ev:"Q"},
{name:"Saukville",state:"WI",x:605,y:145,ev:"Q"},
{name:"Schofield",state:"WI",x:565,y:114,ev:"Q"},
{name:"Seymour",state:"WI",x:591,y:123,ev:"Q"},
{name:"Sharon",state:"WI",x:578,y:142,ev:"Q"},
{name:"Sharon",state:"WI",x:571,y:120,ev:"Q"},
{name:"Shawano",state:"WI",x:585,y:118,ev:"Q"},
{name:"Sheboygan",state:"WI",x:607,y:139,ev:"Q"},
{name:"Sheboygan Falls",state:"WI",x:605,y:139,ev:"P"},
{name:"Shell Lake",state:"WI",x:517,y:95,ev:"Q"},
{name:"Shorewood",state:"WI",x:608,y:152,ev:"Q"},
{name:"Shullsburg",state:"WI",x:571,y:161,ev:"Q"},
{name:"Slinger",state:"WI",x:600,y:147,ev:"P"},
{name:"Slinger",state:"WI",x:600,y:147,ev:"P"},
{name:"South Milwaukee",state:"WI",x:610,y:155,ev:"P"},
{name:"Sparta",state:"WI",x:552,y:133,ev:"Q"},
{name:"Spooner",state:"WI",x:517,y:93,ev:"Q"},
{name:"Spring Green",state:"WI",x:569,y:148,ev:"Q"},
{name:"St. Croix Falls",state:"WI",x:507,y:100,ev:"Q"},
{name:"St. Francis",state:"WI",x:609,y:154,ev:"Q"},
{name:"Stanley",state:"WI",x:541,y:112,ev:"Q"},
{name:"Stevens Point",state:"WI",x:569,y:122,ev:"P"},
{name:"Stoughton",state:"WI",x:586,y:155,ev:"Q"},
{name:"Stratford",state:"WI",x:558,y:116,ev:"Q"},
{name:"Stratford",state:"WI",x:558,y:116,ev:"Q"},
{name:"Sturgeon Bay",state:"WI",x:606,y:118,ev:"P"},
{name:"Sturtevant",state:"WI",x:610,y:160,ev:"Q"},
{name:"Sturtevant",state:"WI",x:610,y:160,ev:"Q"},
{name:"Sun Prairie",state:"WI",x:584,y:149,ev:"Q"},
{name:"Sussex",state:"WI",x:602,y:151,ev:"Q"},
{name:"Thiensville",state:"WI",x:606,y:149,ev:"Q"},
{name:"Thiensville",state:"WI",x:606,y:149,ev:"Q"},
{name:"Thorp",state:"WI",x:544,y:112,ev:"Q"},
{name:"Tomah",state:"WI",x:557,y:132,ev:"Q"},
{name:"Tomahawk",state:"WI",x:559,y:103,ev:"Q"},
{name:"Twin Lakes",state:"WI",x:605,y:163,ev:"Q"},
{name:"Twin Lakes",state:"WI",x:605,y:163,ev:"Q"},
{name:"Two Rivers",state:"WI",x:607,y:131,ev:"Q"},
{name:"Union Grove",state:"WI",x:608,y:160,ev:"Q"},
{name:"Union Grove",state:"WI",x:608,y:160,ev:"Q"},
{name:"Verona",state:"WI",x:580,y:153,ev:"Q"},
{name:"Viroqua",state:"WI",x:553,y:140,ev:"Q"},
{name:"Walworth",state:"WI",x:599,y:163,ev:"Q"},
{name:"Washburn",state:"WI",x:526,y:78,ev:"Q"},
{name:"Waterford",state:"WI",x:604,y:158,ev:"Q"},
{name:"Waterloo",state:"WI",x:589,y:149,ev:"Q"},
{name:"Watertown",state:"WI",x:593,y:149,ev:"Q"},
{name:"Waunakee",state:"WI",x:581,y:149,ev:"Q"},
{name:"Waupaca",state:"WI",x:579,y:126,ev:"Q"},
{name:"Wausau",state:"WI",x:564,y:113,ev:"P"},
{name:"Wautoma",state:"WI",x:577,y:131,ev:"Q"},
{name:"Wauwatosa",state:"WI",x:606,y:152,ev:"Q"},
{name:"West Allis",state:"WI",x:606,y:153,ev:"Q"},
{name:"West Bend",state:"WI",x:601,y:145,ev:"P"},
{name:"West Milwaukee",state:"WI",x:607,y:153,ev:"Q"},
{name:"West Milwaukee",state:"WI",x:607,y:153,ev:"Q"},
{name:"West Salem",state:"WI",x:547,y:133,ev:"Q"},
{name:"West Salem",state:"WI",x:547,y:133,ev:"Q"},
{name:"Weston",state:"WI",x:564,y:113,ev:"Q"},
{name:"Weston",state:"WI",x:567,y:114,ev:"Q"},
{name:"Weyauwega",state:"WI",x:582,y:127,ev:"Q"},
{name:"Whitefish Bay",state:"WI",x:608,y:151,ev:"Q"},
{name:"Whitefish Bay",state:"WI",x:608,y:151,ev:"Q"},
{name:"Whitehall",state:"WI",x:539,y:123,ev:"Q"},
{name:"Whitewater",state:"WI",x:595,y:157,ev:"Q"},
{name:"Whiting",state:"WI",x:570,y:123,ev:"Q"},
{name:"Whiting",state:"WI",x:570,y:123,ev:"Q"},
{name:"Williams Bay",state:"WI",x:602,y:162,ev:"Q"},
{name:"Williams Bay",state:"WI",x:598,y:162,ev:"Q"},
{name:"Wind Lake",state:"WI",x:605,y:157,ev:"Q"},
{name:"Winneconne",state:"WI",x:588,y:132,ev:"Q"},
{name:"Wisconsin Dells",state:"WI",x:572,y:140,ev:"Q"},
{name:"Wisconsin Rapids",state:"WI",x:566,y:124,ev:"P"},
{name:"Green River",state:"WY",x:245,y:145,ev:"P"},
{name:"Laramie",state:"WY",x:314,y:163,ev:"P"},
{name:"Powell",state:"WY",x:225,y:65,ev:"Q"},
{name:"Rock Springs",state:"WY",x:249,y:143,ev:"Q"},
{name:"Avondale Estates",state:"GA",x:674,y:344,ev:"Q"},
{name:"Banks County",state:"GA",x:689,y:329,ev:"Q"},
{name:"Blairsville",state:"GA",x:683,y:319,ev:"Q"},
{name:"Blue Ridge",state:"GA",x:678,y:320,ev:"P"},
{name:"Chamblee",state:"GA",x:674,y:342,ev:"P"},
{name:"Ashton",state:"ID",x:185,y:70,ev:"P"},
{name:"Addison",state:"IL",x:612,y:175,ev:"Q"},
{name:"Addison",state:"IL",x:613,y:175,ev:"Q"},
{name:"Albers",state:"IL",x:596,y:247,ev:"C"},
{name:"Albion",state:"IL",x:622,y:250,ev:"C"},
{name:"Altamont",state:"IL",x:609,y:235,ev:"Q"},
{name:"Alto Pass",state:"IL",x:602,y:268,ev:"C"},
{name:"Anna",state:"IL",x:603,y:271,ev:"C"}
];

// Travel corridor danger scores (5-mi corridor radius)
// Source: Sundown towns dataset x Seamheads schedule routes
var ROUTES = [
  {
    "a": "Indianapolis, IN",
    "b": "Cincinnati, OH",
    "danger": 1.0,
    "upper": 1.0,
    "towns": 17
  },
  {
    "a": "Baltimore, MD",
    "b": "Washington, D.C.",
    "danger": 1.0,
    "upper": 1.0,
    "towns": 5
  },
  {
    "a": "Chicago, IL",
    "b": "Indianapolis, IN",
    "danger": 0.883,
    "upper": 1.0,
    "towns": 15
  },
  {
    "a": "Chicago, IL",
    "b": "St. Louis, MO",
    "danger": 0.674,
    "upper": 1.0,
    "towns": 20
  },
  {
    "a": "Cincinnati, OH",
    "b": "Pittsburgh, PA",
    "danger": 0.493,
    "upper": 1.0,
    "towns": 20
  },
  {
    "a": "Philadelphia, PA",
    "b": "Newark, NJ",
    "danger": 0.488,
    "upper": 1.0,
    "towns": 6
  },
  {
    "a": "Cleveland, OH",
    "b": "Pittsburgh, PA",
    "danger": 0.452,
    "upper": 1.0,
    "towns": 8
  },
  {
    "a": "Kansas City, MO",
    "b": "Chicago, IL",
    "danger": 0.376,
    "upper": 0.939,
    "towns": 19
  },
  {
    "a": "Newark, NJ",
    "b": "New York, NY",
    "danger": 0.334,
    "upper": 0.834,
    "towns": 1
  },
  {
    "a": "St. Louis, MO",
    "b": "Memphis, TN",
    "danger": 0.244,
    "upper": 0.61,
    "towns": 8
  },
  {
    "a": "New York, NY",
    "b": "Baltimore, MD",
    "danger": 0.211,
    "upper": 0.528,
    "towns": 6
  },
  {
    "a": "Detroit, MI",
    "b": "Cleveland, OH",
    "danger": 0.151,
    "upper": 0.377,
    "towns": 2
  },
  {
    "a": "Pittsburgh, PA",
    "b": "Philadelphia, PA",
    "danger": 0.145,
    "upper": 0.363,
    "towns": 6
  },
  {
    "a": "Kansas City, MO",
    "b": "St. Louis, MO",
    "danger": 0.136,
    "upper": 0.341,
    "towns": 5
  },
  {
    "a": "Birmingham, AL",
    "b": "Atlanta, GA",
    "danger": 0.036,
    "upper": 0.089,
    "towns": 1
  },
  {
    "a": "Memphis, TN",
    "b": "Birmingham, AL",
    "danger": 0.0,
    "upper": 0.0,
    "towns": 0
  }
];

// Case studies -- sourced to Loewen/Berrey Database and primary documents
var CASES = [
  {tag:"Case -- 01",name:"Anna, Illinois",sub:"Pop. 4,300 -- Documented sundown town -- Confirmed",route:"On the Chicago to Cairo barnstorm corridor used by Midwest Negro Leagues teams.",body:"Anna\'s reputation was so persistent the town\'s name was used locally as an acronym for the slur its residents would shout at Black travelers. Documented in the Loewen database with primary-source enforcement evidence into the 1960s. The Pittsburgh Crawfords\' 1936 swing through Cairo passed within 8 miles of Anna at twilight, per Seamheads schedule data.",source:"Loewen Sundown Towns Database, entry: Anna, IL, Confirmed. Seamheads NLB Database."},
  {tag:"Case -- 02",name:"Martinsville, Indiana",sub:"Pop. 7,200 -- Confirmed -- Documented enforcement 1968",route:"On the Indianapolis to Bloomington stretch traveled by the Indianapolis Clowns.",body:"The town\'s sundown reputation was documented for decades and enforced as late as 1968, when Carol Jenkins, a young Black woman, was murdered by a Martinsville resident. The Indianapolis Clowns\' 1947 Indiana swing routed past Martinsville more than a dozen times.",source:"Loewen Sundown Towns Database. Indianapolis Recorder (1968 coverage)."},
  {tag:"Case -- 03",name:"Pierce City, Missouri",sub:"Pop. 1,400 -- Confirmed",route:"On the Kansas City to Joplin to Tulsa route used by the Monarchs.",body:"Pierce City expelled its entire Black population on August 20, 1901, after a lynching. The town remained a documented sundown town through the 1940s. The Kansas City Monarchs\' 1942 mid-summer swing passed within 6 miles of Pierce City on the leg from Joplin to Springfield.",source:"Loewen, \'Sundown Towns\' (2005), Pierce City entry."},
  {tag:"Case -- 04",name:"Hillsboro, Ohio",sub:"Pop. 5,300 -- Confirmed",route:"On the Cincinnati to Columbus route used by the Cleveland Buckeyes.",body:"Hillsboro\'s segregated schools were the subject of a 1954 NAACP suit. The town is documented in multiple primary sources as a sundown town through the 1940s. The Buckeyes\' 1944 route from Cincinnati to Columbus passed Hillsboro at distances under 10 miles on at least four documented road trips.",source:"Loewen Database. NAACP records. \'Clemons v. Hillsboro\' (1956)."}
];

var AGGREGATE = {
  tag:"Case -- 05",
  name:"The aggregate -- a typical 1942 season",
  sub:"All teams -- documented exposure",
  route:"Not a town. The number.",
  body:"Across the 1942 season, the average Negro Leagues team passed through or within five miles of 47 documented sundown towns on its road trips, and that is the lower bound. Adjusted to the Illinois documentation rate, the estimated true exposure is between 78 and 140 documented-or-probable sundown towns per team-season.",
  source:"Scientific Data (2025) join, this chapter\'s CC0 dataset"
};

var HEADLINE = {
  documented:2298,
  confirmedCount:359,
  probableCount:724,
  possibleCount:1215,
  illinoisShare:0.70,
  routes:16,
  avgExposure:47,
  lowerBound:78,
  upperBound:140,
  confirmedShare:0.16
};

// ==========================================================================
// M1 Model Output: Team-Season Danger Scores, Corridor Analysis,
// and Counterfactual Route Analysis
// ==========================================================================
// Source: Scientific Data (2025), DOI: 10.1038/s41597-024-04330-9
// Schedule: Seamheads Negro Leagues Database, 1936-1948
// Locations: Seamheads + SABR Ballparks Database
// Confidence: Modeled -- all values are model outputs with uncertainty bounds
// Generated: 2026-05-25
// ==========================================================================

// 116 team-season records, sorted by danger_score descending
// Each record: distance-weighted average danger across all travel corridors
// Normalization: 8.0 weighted towns per 100 route miles = danger score 1.0
var TEAM_SEASON_DANGER = [
  {
    "team": "Birmingham Black Barons",
    "season": 1940,
    "danger_score": 0.42,
    "danger_lower_bound": 0.19,
    "danger_upper_bound": 0.78,
    "total_route_miles": 10213.0,
    "road_segments_analyzed": 24,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 478,
    "towns_confirmed": 155,
    "towns_probable": 197,
    "towns_possible": 126,
    "weighted_town_exposure": 343.3,
    "away_games": 27,
    "confidence": "Modeled"
  },
  {
    "team": "Kansas City Monarchs",
    "season": 1941,
    "danger_score": 0.414,
    "danger_lower_bound": 0.191,
    "danger_upper_bound": 0.775,
    "total_route_miles": 10598.0,
    "road_segments_analyzed": 24,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 480,
    "towns_confirmed": 162,
    "towns_probable": 207,
    "towns_possible": 111,
    "weighted_town_exposure": 351.3,
    "away_games": 27,
    "confidence": "Modeled"
  },
  {
    "team": "Birmingham Black Barons",
    "season": 1944,
    "danger_score": 0.412,
    "danger_lower_bound": 0.133,
    "danger_upper_bound": 0.858,
    "total_route_miles": 10293.0,
    "road_segments_analyzed": 24,
    "high_danger_segments": 4,
    "sundown_towns_encountered": 518,
    "towns_confirmed": 110,
    "towns_probable": 219,
    "towns_possible": 189,
    "weighted_town_exposure": 338.9,
    "away_games": 27,
    "confidence": "Modeled"
  },
  {
    "team": "Birmingham Black Barons",
    "season": 1942,
    "danger_score": 0.41,
    "danger_lower_bound": 0.174,
    "danger_upper_bound": 0.803,
    "total_route_miles": 9664.0,
    "road_segments_analyzed": 23,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 447,
    "towns_confirmed": 135,
    "towns_probable": 191,
    "towns_possible": 121,
    "weighted_town_exposure": 317.1,
    "away_games": 29,
    "confidence": "Modeled"
  },
  {
    "team": "Birmingham Black Barons",
    "season": 1936,
    "danger_score": 0.407,
    "danger_lower_bound": 0.179,
    "danger_upper_bound": 0.748,
    "total_route_miles": 8368.0,
    "road_segments_analyzed": 23,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 386,
    "towns_confirmed": 120,
    "towns_probable": 153,
    "towns_possible": 113,
    "weighted_town_exposure": 272.3,
    "away_games": 26,
    "confidence": "Modeled"
  },
  {
    "team": "Baltimore Elite Giants",
    "season": 1945,
    "danger_score": 0.403,
    "danger_lower_bound": 0.089,
    "danger_upper_bound": 0.916,
    "total_route_miles": 2116.0,
    "road_segments_analyzed": 22,
    "high_danger_segments": 1,
    "sundown_towns_encountered": 114,
    "towns_confirmed": 15,
    "towns_probable": 50,
    "towns_possible": 49,
    "weighted_town_exposure": 69.6,
    "away_games": 24,
    "confidence": "Modeled"
  },
  {
    "team": "Kansas City Monarchs",
    "season": 1942,
    "danger_score": 0.384,
    "danger_lower_bound": 0.163,
    "danger_upper_bound": 0.766,
    "total_route_miles": 9524.0,
    "road_segments_analyzed": 22,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 406,
    "towns_confirmed": 124,
    "towns_probable": 186,
    "towns_possible": 96,
    "weighted_town_exposure": 292.6,
    "away_games": 27,
    "confidence": "Modeled"
  },
  {
    "team": "Birmingham Black Barons",
    "season": 1947,
    "danger_score": 0.38,
    "danger_lower_bound": 0.105,
    "danger_upper_bound": 0.82,
    "total_route_miles": 10222.0,
    "road_segments_analyzed": 27,
    "high_danger_segments": 4,
    "sundown_towns_encountered": 488,
    "towns_confirmed": 86,
    "towns_probable": 212,
    "towns_possible": 190,
    "weighted_town_exposure": 310.4,
    "away_games": 29,
    "confidence": "Modeled"
  },
  {
    "team": "Birmingham Black Barons",
    "season": 1948,
    "danger_score": 0.38,
    "danger_lower_bound": 0.111,
    "danger_upper_bound": 0.814,
    "total_route_miles": 9425.0,
    "road_segments_analyzed": 20,
    "high_danger_segments": 3,
    "sundown_towns_encountered": 453,
    "towns_confirmed": 84,
    "towns_probable": 183,
    "towns_possible": 186,
    "weighted_town_exposure": 286.5,
    "away_games": 26,
    "confidence": "Modeled"
  },
  {
    "team": "Birmingham Black Barons",
    "season": 1938,
    "danger_score": 0.373,
    "danger_lower_bound": 0.162,
    "danger_upper_bound": 0.686,
    "total_route_miles": 8322.0,
    "road_segments_analyzed": 25,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 358,
    "towns_confirmed": 108,
    "towns_probable": 133,
    "towns_possible": 117,
    "weighted_town_exposure": 247.9,
    "away_games": 27,
    "confidence": "Modeled"
  },
  {
    "team": "Birmingham Black Barons",
    "season": 1946,
    "danger_score": 0.37,
    "danger_lower_bound": 0.103,
    "danger_upper_bound": 0.823,
    "total_route_miles": 11640.0,
    "road_segments_analyzed": 25,
    "high_danger_segments": 2,
    "sundown_towns_encountered": 547,
    "towns_confirmed": 96,
    "towns_probable": 226,
    "towns_possible": 225,
    "weighted_town_exposure": 344.2,
    "away_games": 26,
    "confidence": "Modeled"
  },
  {
    "team": "Birmingham Black Barons",
    "season": 1941,
    "danger_score": 0.366,
    "danger_lower_bound": 0.144,
    "danger_upper_bound": 0.736,
    "total_route_miles": 8614.0,
    "road_segments_analyzed": 21,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 361,
    "towns_confirmed": 99,
    "towns_probable": 161,
    "towns_possible": 101,
    "weighted_town_exposure": 252.1,
    "away_games": 27,
    "confidence": "Modeled"
  },
  {
    "team": "Birmingham Black Barons",
    "season": 1945,
    "danger_score": 0.366,
    "danger_lower_bound": 0.101,
    "danger_upper_bound": 0.785,
    "total_route_miles": 11661.0,
    "road_segments_analyzed": 28,
    "high_danger_segments": 3,
    "sundown_towns_encountered": 541,
    "towns_confirmed": 94,
    "towns_probable": 229,
    "towns_possible": 218,
    "weighted_town_exposure": 341.5,
    "away_games": 28,
    "confidence": "Modeled"
  },
  {
    "team": "Kansas City Monarchs",
    "season": 1936,
    "danger_score": 0.359,
    "danger_lower_bound": 0.167,
    "danger_upper_bound": 0.654,
    "total_route_miles": 7098.0,
    "road_segments_analyzed": 22,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 289,
    "towns_confirmed": 95,
    "towns_probable": 104,
    "towns_possible": 90,
    "weighted_town_exposure": 203.8,
    "away_games": 26,
    "confidence": "Modeled"
  },
  {
    "team": "Newark Eagles",
    "season": 1940,
    "danger_score": 0.352,
    "danger_lower_bound": 0.083,
    "danger_upper_bound": 0.78,
    "total_route_miles": 2407.0,
    "road_segments_analyzed": 21,
    "high_danger_segments": 3,
    "sundown_towns_encountered": 115,
    "towns_confirmed": 16,
    "towns_probable": 54,
    "towns_possible": 45,
    "weighted_town_exposure": 71.8,
    "away_games": 25,
    "confidence": "Modeled"
  },
  {
    "team": "Birmingham Black Barons",
    "season": 1943,
    "danger_score": 0.351,
    "danger_lower_bound": 0.153,
    "danger_upper_bound": 0.725,
    "total_route_miles": 9951.0,
    "road_segments_analyzed": 25,
    "high_danger_segments": 3,
    "sundown_towns_encountered": 390,
    "towns_confirmed": 122,
    "towns_probable": 166,
    "towns_possible": 102,
    "weighted_town_exposure": 279.0,
    "away_games": 27,
    "confidence": "Modeled"
  },
  {
    "team": "Kansas City Monarchs",
    "season": 1939,
    "danger_score": 0.35,
    "danger_lower_bound": 0.166,
    "danger_upper_bound": 0.64,
    "total_route_miles": 7530.0,
    "road_segments_analyzed": 22,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 295,
    "towns_confirmed": 100,
    "towns_probable": 109,
    "towns_possible": 86,
    "weighted_town_exposure": 210.7,
    "away_games": 25,
    "confidence": "Modeled"
  },
  {
    "team": "Baltimore Elite Giants",
    "season": 1946,
    "danger_score": 0.349,
    "danger_lower_bound": 0.062,
    "danger_upper_bound": 0.812,
    "total_route_miles": 2415.0,
    "road_segments_analyzed": 21,
    "high_danger_segments": 1,
    "sundown_towns_encountered": 117,
    "towns_confirmed": 12,
    "towns_probable": 49,
    "towns_possible": 56,
    "weighted_town_exposure": 68.7,
    "away_games": 23,
    "confidence": "Modeled"
  },
  {
    "team": "Kansas City Monarchs",
    "season": 1940,
    "danger_score": 0.345,
    "danger_lower_bound": 0.141,
    "danger_upper_bound": 0.714,
    "total_route_miles": 10261.0,
    "road_segments_analyzed": 24,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 396,
    "towns_confirmed": 116,
    "towns_probable": 185,
    "towns_possible": 95,
    "weighted_town_exposure": 283.5,
    "away_games": 28,
    "confidence": "Modeled"
  },
  {
    "team": "Kansas City Monarchs",
    "season": 1946,
    "danger_score": 0.344,
    "danger_lower_bound": 0.13,
    "danger_upper_bound": 0.725,
    "total_route_miles": 11188.0,
    "road_segments_analyzed": 26,
    "high_danger_segments": 3,
    "sundown_towns_encountered": 452,
    "towns_confirmed": 116,
    "towns_probable": 191,
    "towns_possible": 145,
    "weighted_town_exposure": 307.7,
    "away_games": 28,
    "confidence": "Modeled"
  },
  {
    "team": "St. Louis Stars",
    "season": 1936,
    "danger_score": 0.343,
    "danger_lower_bound": 0.138,
    "danger_upper_bound": 0.723,
    "total_route_miles": 7854.0,
    "road_segments_analyzed": 19,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 308,
    "towns_confirmed": 87,
    "towns_probable": 134,
    "towns_possible": 87,
    "weighted_town_exposure": 215.6,
    "away_games": 25,
    "confidence": "Modeled"
  },
  {
    "team": "Kansas City Monarchs",
    "season": 1945,
    "danger_score": 0.342,
    "danger_lower_bound": 0.113,
    "danger_upper_bound": 0.72,
    "total_route_miles": 10693.0,
    "road_segments_analyzed": 25,
    "high_danger_segments": 2,
    "sundown_towns_encountered": 447,
    "towns_confirmed": 97,
    "towns_probable": 185,
    "towns_possible": 165,
    "weighted_town_exposure": 292.5,
    "away_games": 27,
    "confidence": "Modeled"
  },
  {
    "team": "Birmingham Black Barons",
    "season": 1937,
    "danger_score": 0.338,
    "danger_lower_bound": 0.12,
    "danger_upper_bound": 0.717,
    "total_route_miles": 6984.0,
    "road_segments_analyzed": 21,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 281,
    "towns_confirmed": 67,
    "towns_probable": 120,
    "towns_possible": 94,
    "weighted_town_exposure": 188.6,
    "away_games": 25,
    "confidence": "Modeled"
  },
  {
    "team": "Cleveland Buckeyes",
    "season": 1948,
    "danger_score": 0.337,
    "danger_lower_bound": 0.119,
    "danger_upper_bound": 0.736,
    "total_route_miles": 9426.0,
    "road_segments_analyzed": 22,
    "high_danger_segments": 3,
    "sundown_towns_encountered": 371,
    "towns_confirmed": 90,
    "towns_probable": 172,
    "towns_possible": 109,
    "weighted_town_exposure": 254.0,
    "away_games": 28,
    "confidence": "Modeled"
  },
  {
    "team": "Kansas City Monarchs",
    "season": 1937,
    "danger_score": 0.337,
    "danger_lower_bound": 0.148,
    "danger_upper_bound": 0.67,
    "total_route_miles": 8184.0,
    "road_segments_analyzed": 23,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 316,
    "towns_confirmed": 97,
    "towns_probable": 121,
    "towns_possible": 98,
    "weighted_town_exposure": 220.9,
    "away_games": 27,
    "confidence": "Modeled"
  },
  {
    "team": "Kansas City Monarchs",
    "season": 1943,
    "danger_score": 0.337,
    "danger_lower_bound": 0.139,
    "danger_upper_bound": 0.709,
    "total_route_miles": 9027.0,
    "road_segments_analyzed": 24,
    "high_danger_segments": 3,
    "sundown_towns_encountered": 340,
    "towns_confirmed": 100,
    "towns_probable": 157,
    "towns_possible": 83,
    "weighted_town_exposure": 243.1,
    "away_games": 28,
    "confidence": "Modeled"
  },
  {
    "team": "Kansas City Monarchs",
    "season": 1938,
    "danger_score": 0.335,
    "danger_lower_bound": 0.147,
    "danger_upper_bound": 0.662,
    "total_route_miles": 7323.0,
    "road_segments_analyzed": 21,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 281,
    "towns_confirmed": 86,
    "towns_probable": 108,
    "towns_possible": 87,
    "weighted_town_exposure": 196.4,
    "away_games": 25,
    "confidence": "Modeled"
  },
  {
    "team": "Memphis Red Sox",
    "season": 1948,
    "danger_score": 0.335,
    "danger_lower_bound": 0.082,
    "danger_upper_bound": 0.76,
    "total_route_miles": 8979.0,
    "road_segments_analyzed": 21,
    "high_danger_segments": 2,
    "sundown_towns_encountered": 382,
    "towns_confirmed": 59,
    "towns_probable": 174,
    "towns_possible": 149,
    "weighted_town_exposure": 240.4,
    "away_games": 26,
    "confidence": "Modeled"
  },
  {
    "team": "Birmingham Black Barons",
    "season": 1939,
    "danger_score": 0.333,
    "danger_lower_bound": 0.122,
    "danger_upper_bound": 0.679,
    "total_route_miles": 6879.0,
    "road_segments_analyzed": 20,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 269,
    "towns_confirmed": 67,
    "towns_probable": 118,
    "towns_possible": 84,
    "weighted_town_exposure": 183.2,
    "away_games": 26,
    "confidence": "Modeled"
  },
  {
    "team": "Memphis Red Sox",
    "season": 1945,
    "danger_score": 0.333,
    "danger_lower_bound": 0.093,
    "danger_upper_bound": 0.727,
    "total_route_miles": 10464.0,
    "road_segments_analyzed": 24,
    "high_danger_segments": 3,
    "sundown_towns_encountered": 435,
    "towns_confirmed": 78,
    "towns_probable": 193,
    "towns_possible": 164,
    "weighted_town_exposure": 278.7,
    "away_games": 27,
    "confidence": "Modeled"
  },
  {
    "team": "Memphis Red Sox",
    "season": 1947,
    "danger_score": 0.331,
    "danger_lower_bound": 0.082,
    "danger_upper_bound": 0.762,
    "total_route_miles": 9350.0,
    "road_segments_analyzed": 23,
    "high_danger_segments": 2,
    "sundown_towns_encountered": 391,
    "towns_confirmed": 61,
    "towns_probable": 183,
    "towns_possible": 147,
    "weighted_town_exposure": 247.9,
    "away_games": 28,
    "confidence": "Modeled"
  },
  {
    "team": "St. Louis Stars",
    "season": 1939,
    "danger_score": 0.33,
    "danger_lower_bound": 0.119,
    "danger_upper_bound": 0.722,
    "total_route_miles": 8944.0,
    "road_segments_analyzed": 21,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 341,
    "towns_confirmed": 85,
    "towns_probable": 163,
    "towns_possible": 93,
    "weighted_town_exposure": 236.3,
    "away_games": 27,
    "confidence": "Modeled"
  },
  {
    "team": "Memphis Red Sox",
    "season": 1944,
    "danger_score": 0.322,
    "danger_lower_bound": 0.081,
    "danger_upper_bound": 0.707,
    "total_route_miles": 10915.0,
    "road_segments_analyzed": 26,
    "high_danger_segments": 4,
    "sundown_towns_encountered": 443,
    "towns_confirmed": 71,
    "towns_probable": 205,
    "towns_possible": 167,
    "weighted_town_exposure": 281.3,
    "away_games": 27,
    "confidence": "Modeled"
  },
  {
    "team": "Kansas City Monarchs",
    "season": 1947,
    "danger_score": 0.319,
    "danger_lower_bound": 0.094,
    "danger_upper_bound": 0.683,
    "total_route_miles": 8600.0,
    "road_segments_analyzed": 21,
    "high_danger_segments": 3,
    "sundown_towns_encountered": 338,
    "towns_confirmed": 65,
    "towns_probable": 152,
    "towns_possible": 121,
    "weighted_town_exposure": 219.8,
    "away_games": 25,
    "confidence": "Modeled"
  },
  {
    "team": "Baltimore Elite Giants",
    "season": 1941,
    "danger_score": 0.317,
    "danger_lower_bound": 0.046,
    "danger_upper_bound": 0.707,
    "total_route_miles": 2173.0,
    "road_segments_analyzed": 19,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 92,
    "towns_confirmed": 8,
    "towns_probable": 45,
    "towns_possible": 39,
    "weighted_town_exposure": 55.1,
    "away_games": 23,
    "confidence": "Modeled"
  },
  {
    "team": "Cleveland Buckeyes",
    "season": 1947,
    "danger_score": 0.316,
    "danger_lower_bound": 0.127,
    "danger_upper_bound": 0.627,
    "total_route_miles": 11234.0,
    "road_segments_analyzed": 27,
    "high_danger_segments": 3,
    "sundown_towns_encountered": 405,
    "towns_confirmed": 114,
    "towns_probable": 178,
    "towns_possible": 113,
    "weighted_town_exposure": 283.8,
    "away_games": 28,
    "confidence": "Modeled"
  },
  {
    "team": "Kansas City Monarchs",
    "season": 1944,
    "danger_score": 0.316,
    "danger_lower_bound": 0.109,
    "danger_upper_bound": 0.714,
    "total_route_miles": 10825.0,
    "road_segments_analyzed": 24,
    "high_danger_segments": 1,
    "sundown_towns_encountered": 416,
    "towns_confirmed": 94,
    "towns_probable": 171,
    "towns_possible": 151,
    "weighted_town_exposure": 274.1,
    "away_games": 27,
    "confidence": "Modeled"
  },
  {
    "team": "Indianapolis Clowns",
    "season": 1945,
    "danger_score": 0.313,
    "danger_lower_bound": 0.079,
    "danger_upper_bound": 0.728,
    "total_route_miles": 10772.0,
    "road_segments_analyzed": 23,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 432,
    "towns_confirmed": 68,
    "towns_probable": 188,
    "towns_possible": 176,
    "weighted_town_exposure": 270.0,
    "away_games": 28,
    "confidence": "Modeled"
  },
  {
    "team": "Indianapolis Clowns",
    "season": 1944,
    "danger_score": 0.311,
    "danger_lower_bound": 0.08,
    "danger_upper_bound": 0.694,
    "total_route_miles": 9594.0,
    "road_segments_analyzed": 22,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 377,
    "towns_confirmed": 61,
    "towns_probable": 170,
    "towns_possible": 146,
    "weighted_town_exposure": 238.4,
    "away_games": 28,
    "confidence": "Modeled"
  },
  {
    "team": "Indianapolis Clowns",
    "season": 1946,
    "danger_score": 0.311,
    "danger_lower_bound": 0.091,
    "danger_upper_bound": 0.726,
    "total_route_miles": 9602.0,
    "road_segments_analyzed": 21,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 372,
    "towns_confirmed": 70,
    "towns_probable": 160,
    "towns_possible": 142,
    "weighted_town_exposure": 238.8,
    "away_games": 27,
    "confidence": "Modeled"
  },
  {
    "team": "Chicago American Giants",
    "season": 1947,
    "danger_score": 0.306,
    "danger_lower_bound": 0.085,
    "danger_upper_bound": 0.712,
    "total_route_miles": 10892.0,
    "road_segments_analyzed": 23,
    "high_danger_segments": 1,
    "sundown_towns_encountered": 426,
    "towns_confirmed": 74,
    "towns_probable": 172,
    "towns_possible": 180,
    "weighted_town_exposure": 266.4,
    "away_games": 26,
    "confidence": "Modeled"
  },
  {
    "team": "Baltimore Elite Giants",
    "season": 1947,
    "danger_score": 0.304,
    "danger_lower_bound": 0.04,
    "danger_upper_bound": 0.717,
    "total_route_miles": 2206.0,
    "road_segments_analyzed": 17,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 98,
    "towns_confirmed": 7,
    "towns_probable": 34,
    "towns_possible": 57,
    "weighted_town_exposure": 53.6,
    "away_games": 25,
    "confidence": "Modeled"
  },
  {
    "team": "Cleveland Buckeyes",
    "season": 1945,
    "danger_score": 0.302,
    "danger_lower_bound": 0.119,
    "danger_upper_bound": 0.651,
    "total_route_miles": 10888.0,
    "road_segments_analyzed": 24,
    "high_danger_segments": 1,
    "sundown_towns_encountered": 376,
    "towns_confirmed": 104,
    "towns_probable": 166,
    "towns_possible": 106,
    "weighted_town_exposure": 262.6,
    "away_games": 26,
    "confidence": "Modeled"
  },
  {
    "team": "St. Louis Stars",
    "season": 1937,
    "danger_score": 0.3,
    "danger_lower_bound": 0.103,
    "danger_upper_bound": 0.677,
    "total_route_miles": 8349.0,
    "road_segments_analyzed": 19,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 293,
    "towns_confirmed": 69,
    "towns_probable": 140,
    "towns_possible": 84,
    "weighted_town_exposure": 200.6,
    "away_games": 26,
    "confidence": "Modeled"
  },
  {
    "team": "Kansas City Monarchs",
    "season": 1948,
    "danger_score": 0.298,
    "danger_lower_bound": 0.087,
    "danger_upper_bound": 0.629,
    "total_route_miles": 8446.0,
    "road_segments_analyzed": 25,
    "high_danger_segments": 5,
    "sundown_towns_encountered": 312,
    "towns_confirmed": 59,
    "towns_probable": 138,
    "towns_possible": 115,
    "weighted_town_exposure": 201.6,
    "away_games": 27,
    "confidence": "Modeled"
  },
  {
    "team": "Cleveland Buckeyes",
    "season": 1944,
    "danger_score": 0.297,
    "danger_lower_bound": 0.095,
    "danger_upper_bound": 0.674,
    "total_route_miles": 8919.0,
    "road_segments_analyzed": 21,
    "high_danger_segments": 1,
    "sundown_towns_encountered": 317,
    "towns_confirmed": 68,
    "towns_probable": 147,
    "towns_possible": 102,
    "weighted_town_exposure": 211.7,
    "away_games": 26,
    "confidence": "Modeled"
  },
  {
    "team": "Memphis Red Sox",
    "season": 1942,
    "danger_score": 0.297,
    "danger_lower_bound": 0.097,
    "danger_upper_bound": 0.715,
    "total_route_miles": 11068.0,
    "road_segments_analyzed": 22,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 388,
    "towns_confirmed": 86,
    "towns_probable": 187,
    "towns_possible": 115,
    "weighted_town_exposure": 262.9,
    "away_games": 27,
    "confidence": "Modeled"
  },
  {
    "team": "St. Louis Stars",
    "season": 1938,
    "danger_score": 0.297,
    "danger_lower_bound": 0.097,
    "danger_upper_bound": 0.68,
    "total_route_miles": 9967.0,
    "road_segments_analyzed": 22,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 348,
    "towns_confirmed": 77,
    "towns_probable": 170,
    "towns_possible": 101,
    "weighted_town_exposure": 236.4,
    "away_games": 25,
    "confidence": "Modeled"
  },
  {
    "team": "Indianapolis Clowns",
    "season": 1948,
    "danger_score": 0.296,
    "danger_lower_bound": 0.072,
    "danger_upper_bound": 0.697,
    "total_route_miles": 14072.0,
    "road_segments_analyzed": 27,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 528,
    "towns_confirmed": 81,
    "towns_probable": 244,
    "towns_possible": 203,
    "weighted_town_exposure": 333.0,
    "away_games": 28,
    "confidence": "Modeled"
  },
  {
    "team": "Indianapolis Clowns",
    "season": 1943,
    "danger_score": 0.293,
    "danger_lower_bound": 0.105,
    "danger_upper_bound": 0.638,
    "total_route_miles": 9882.0,
    "road_segments_analyzed": 23,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 335,
    "towns_confirmed": 83,
    "towns_probable": 158,
    "towns_possible": 94,
    "weighted_town_exposure": 231.2,
    "away_games": 28,
    "confidence": "Modeled"
  },
  {
    "team": "Baltimore Elite Giants",
    "season": 1948,
    "danger_score": 0.29,
    "danger_lower_bound": 0.059,
    "danger_upper_bound": 0.698,
    "total_route_miles": 3178.0,
    "road_segments_analyzed": 20,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 128,
    "towns_confirmed": 15,
    "towns_probable": 45,
    "towns_possible": 68,
    "weighted_town_exposure": 73.7,
    "away_games": 24,
    "confidence": "Modeled"
  },
  {
    "team": "Memphis Red Sox",
    "season": 1946,
    "danger_score": 0.288,
    "danger_lower_bound": 0.08,
    "danger_upper_bound": 0.656,
    "total_route_miles": 11140.0,
    "road_segments_analyzed": 26,
    "high_danger_segments": 2,
    "sundown_towns_encountered": 394,
    "towns_confirmed": 71,
    "towns_probable": 188,
    "towns_possible": 135,
    "weighted_town_exposure": 256.6,
    "away_games": 27,
    "confidence": "Modeled"
  },
  {
    "team": "Indianapolis Clowns",
    "season": 1947,
    "danger_score": 0.285,
    "danger_lower_bound": 0.076,
    "danger_upper_bound": 0.683,
    "total_route_miles": 13692.0,
    "road_segments_analyzed": 27,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 487,
    "towns_confirmed": 83,
    "towns_probable": 225,
    "towns_possible": 179,
    "weighted_town_exposure": 312.1,
    "away_games": 26,
    "confidence": "Modeled"
  },
  {
    "team": "Baltimore Elite Giants",
    "season": 1943,
    "danger_score": 0.279,
    "danger_lower_bound": 0.039,
    "danger_upper_bound": 0.66,
    "total_route_miles": 2566.0,
    "road_segments_analyzed": 19,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 104,
    "towns_confirmed": 8,
    "towns_probable": 36,
    "towns_possible": 60,
    "weighted_town_exposure": 57.2,
    "away_games": 24,
    "confidence": "Modeled"
  },
  {
    "team": "Memphis Red Sox",
    "season": 1943,
    "danger_score": 0.279,
    "danger_lower_bound": 0.099,
    "danger_upper_bound": 0.605,
    "total_route_miles": 11658.0,
    "road_segments_analyzed": 26,
    "high_danger_segments": 4,
    "sundown_towns_encountered": 378,
    "towns_confirmed": 92,
    "towns_probable": 180,
    "towns_possible": 106,
    "weighted_town_exposure": 260.4,
    "away_games": 27,
    "confidence": "Modeled"
  },
  {
    "team": "Memphis Red Sox",
    "season": 1938,
    "danger_score": 0.277,
    "danger_lower_bound": 0.111,
    "danger_upper_bound": 0.605,
    "total_route_miles": 9128.0,
    "road_segments_analyzed": 23,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 299,
    "towns_confirmed": 81,
    "towns_probable": 114,
    "towns_possible": 104,
    "weighted_town_exposure": 202.4,
    "away_games": 27,
    "confidence": "Modeled"
  },
  {
    "team": "Baltimore Elite Giants",
    "season": 1942,
    "danger_score": 0.276,
    "danger_lower_bound": 0.042,
    "danger_upper_bound": 0.665,
    "total_route_miles": 2959.0,
    "road_segments_analyzed": 21,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 117,
    "towns_confirmed": 10,
    "towns_probable": 42,
    "towns_possible": 65,
    "weighted_town_exposure": 65.4,
    "away_games": 23,
    "confidence": "Modeled"
  },
  {
    "team": "Philadelphia Stars",
    "season": 1943,
    "danger_score": 0.276,
    "danger_lower_bound": 0.033,
    "danger_upper_bound": 0.685,
    "total_route_miles": 3456.0,
    "road_segments_analyzed": 19,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 142,
    "towns_confirmed": 9,
    "towns_probable": 47,
    "towns_possible": 86,
    "weighted_town_exposure": 76.3,
    "away_games": 25,
    "confidence": "Modeled"
  },
  {
    "team": "Memphis Red Sox",
    "season": 1936,
    "danger_score": 0.275,
    "danger_lower_bound": 0.117,
    "danger_upper_bound": 0.575,
    "total_route_miles": 9860.0,
    "road_segments_analyzed": 23,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 317,
    "towns_confirmed": 92,
    "towns_probable": 117,
    "towns_possible": 108,
    "weighted_town_exposure": 217.1,
    "away_games": 25,
    "confidence": "Modeled"
  },
  {
    "team": "Chicago American Giants",
    "season": 1946,
    "danger_score": 0.274,
    "danger_lower_bound": 0.066,
    "danger_upper_bound": 0.664,
    "total_route_miles": 9352.0,
    "road_segments_analyzed": 19,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 328,
    "towns_confirmed": 49,
    "towns_probable": 149,
    "towns_possible": 130,
    "weighted_town_exposure": 205.3,
    "away_games": 26,
    "confidence": "Modeled"
  },
  {
    "team": "Baltimore Elite Giants",
    "season": 1944,
    "danger_score": 0.27,
    "danger_lower_bound": 0.03,
    "danger_upper_bound": 0.654,
    "total_route_miles": 3301.0,
    "road_segments_analyzed": 23,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 131,
    "towns_confirmed": 8,
    "towns_probable": 47,
    "towns_possible": 76,
    "weighted_town_exposure": 71.3,
    "away_games": 25,
    "confidence": "Modeled"
  },
  {
    "team": "Philadelphia Stars",
    "season": 1941,
    "danger_score": 0.269,
    "danger_lower_bound": 0.048,
    "danger_upper_bound": 0.63,
    "total_route_miles": 2350.0,
    "road_segments_analyzed": 19,
    "high_danger_segments": 2,
    "sundown_towns_encountered": 93,
    "towns_confirmed": 9,
    "towns_probable": 36,
    "towns_possible": 48,
    "weighted_town_exposure": 53.4,
    "away_games": 24,
    "confidence": "Modeled"
  },
  {
    "team": "Cleveland Buckeyes",
    "season": 1946,
    "danger_score": 0.267,
    "danger_lower_bound": 0.094,
    "danger_upper_bound": 0.588,
    "total_route_miles": 10538.0,
    "road_segments_analyzed": 27,
    "high_danger_segments": 1,
    "sundown_towns_encountered": 330,
    "towns_confirmed": 79,
    "towns_probable": 151,
    "towns_possible": 100,
    "weighted_town_exposure": 224.7,
    "away_games": 28,
    "confidence": "Modeled"
  },
  {
    "team": "Chicago American Giants",
    "season": 1948,
    "danger_score": 0.266,
    "danger_lower_bound": 0.079,
    "danger_upper_bound": 0.65,
    "total_route_miles": 12799.0,
    "road_segments_analyzed": 27,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 423,
    "towns_confirmed": 81,
    "towns_probable": 181,
    "towns_possible": 161,
    "weighted_town_exposure": 272.1,
    "away_games": 27,
    "confidence": "Modeled"
  },
  {
    "team": "Chicago American Giants",
    "season": 1944,
    "danger_score": 0.264,
    "danger_lower_bound": 0.06,
    "danger_upper_bound": 0.593,
    "total_route_miles": 9837.0,
    "road_segments_analyzed": 25,
    "high_danger_segments": 1,
    "sundown_towns_encountered": 332,
    "towns_confirmed": 47,
    "towns_probable": 157,
    "towns_possible": 128,
    "weighted_town_exposure": 208.1,
    "away_games": 27,
    "confidence": "Modeled"
  },
  {
    "team": "Philadelphia Stars",
    "season": 1946,
    "danger_score": 0.264,
    "danger_lower_bound": 0.041,
    "danger_upper_bound": 0.643,
    "total_route_miles": 2771.0,
    "road_segments_analyzed": 17,
    "high_danger_segments": 1,
    "sundown_towns_encountered": 108,
    "towns_confirmed": 9,
    "towns_probable": 38,
    "towns_possible": 61,
    "weighted_town_exposure": 60.0,
    "away_games": 24,
    "confidence": "Modeled"
  },
  {
    "team": "Memphis Red Sox",
    "season": 1940,
    "danger_score": 0.262,
    "danger_lower_bound": 0.079,
    "danger_upper_bound": 0.655,
    "total_route_miles": 10969.0,
    "road_segments_analyzed": 22,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 344,
    "towns_confirmed": 69,
    "towns_probable": 170,
    "towns_possible": 105,
    "weighted_town_exposure": 230.0,
    "away_games": 28,
    "confidence": "Modeled"
  },
  {
    "team": "Newark Eagles",
    "season": 1945,
    "danger_score": 0.26,
    "danger_lower_bound": 0.046,
    "danger_upper_bound": 0.604,
    "total_route_miles": 2961.0,
    "road_segments_analyzed": 19,
    "high_danger_segments": 1,
    "sundown_towns_encountered": 110,
    "towns_confirmed": 11,
    "towns_probable": 41,
    "towns_possible": 58,
    "weighted_town_exposure": 62.9,
    "away_games": 24,
    "confidence": "Modeled"
  },
  {
    "team": "Newark Eagles",
    "season": 1946,
    "danger_score": 0.26,
    "danger_lower_bound": 0.046,
    "danger_upper_bound": 0.629,
    "total_route_miles": 3272.0,
    "road_segments_analyzed": 21,
    "high_danger_segments": 1,
    "sundown_towns_encountered": 124,
    "towns_confirmed": 12,
    "towns_probable": 42,
    "towns_possible": 70,
    "weighted_town_exposure": 69.4,
    "away_games": 25,
    "confidence": "Modeled"
  },
  {
    "team": "Newark Eagles",
    "season": 1942,
    "danger_score": 0.258,
    "danger_lower_bound": 0.055,
    "danger_upper_bound": 0.578,
    "total_route_miles": 2967.0,
    "road_segments_analyzed": 21,
    "high_danger_segments": 3,
    "sundown_towns_encountered": 113,
    "towns_confirmed": 13,
    "towns_probable": 41,
    "towns_possible": 59,
    "weighted_town_exposure": 65.3,
    "away_games": 24,
    "confidence": "Modeled"
  },
  {
    "team": "Newark Eagles",
    "season": 1943,
    "danger_score": 0.257,
    "danger_lower_bound": 0.041,
    "danger_upper_bound": 0.569,
    "total_route_miles": 3316.0,
    "road_segments_analyzed": 22,
    "high_danger_segments": 2,
    "sundown_towns_encountered": 125,
    "towns_confirmed": 11,
    "towns_probable": 48,
    "towns_possible": 66,
    "weighted_town_exposure": 71.0,
    "away_games": 25,
    "confidence": "Modeled"
  },
  {
    "team": "Chicago American Giants",
    "season": 1945,
    "danger_score": 0.255,
    "danger_lower_bound": 0.074,
    "danger_upper_bound": 0.594,
    "total_route_miles": 11959.0,
    "road_segments_analyzed": 25,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 380,
    "towns_confirmed": 71,
    "towns_probable": 164,
    "towns_possible": 145,
    "weighted_town_exposure": 243.8,
    "away_games": 26,
    "confidence": "Modeled"
  },
  {
    "team": "Homestead Grays",
    "season": 1941,
    "danger_score": 0.254,
    "danger_lower_bound": 0.036,
    "danger_upper_bound": 0.621,
    "total_route_miles": 2463.0,
    "road_segments_analyzed": 21,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 98,
    "towns_confirmed": 7,
    "towns_probable": 22,
    "towns_possible": 69,
    "weighted_town_exposure": 50.0,
    "away_games": 25,
    "confidence": "Modeled"
  },
  {
    "team": "Newark Eagles",
    "season": 1944,
    "danger_score": 0.254,
    "danger_lower_bound": 0.041,
    "danger_upper_bound": 0.607,
    "total_route_miles": 3362.0,
    "road_segments_analyzed": 22,
    "high_danger_segments": 1,
    "sundown_towns_encountered": 121,
    "towns_confirmed": 11,
    "towns_probable": 49,
    "towns_possible": 61,
    "weighted_town_exposure": 69.7,
    "away_games": 24,
    "confidence": "Modeled"
  },
  {
    "team": "Memphis Red Sox",
    "season": 1937,
    "danger_score": 0.252,
    "danger_lower_bound": 0.094,
    "danger_upper_bound": 0.571,
    "total_route_miles": 9035.0,
    "road_segments_analyzed": 23,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 272,
    "towns_confirmed": 68,
    "towns_probable": 109,
    "towns_possible": 95,
    "weighted_town_exposure": 182.3,
    "away_games": 25,
    "confidence": "Modeled"
  },
  {
    "team": "Baltimore Elite Giants",
    "season": 1940,
    "danger_score": 0.251,
    "danger_lower_bound": 0.032,
    "danger_upper_bound": 0.613,
    "total_route_miles": 2354.0,
    "road_segments_analyzed": 17,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 89,
    "towns_confirmed": 6,
    "towns_probable": 27,
    "towns_possible": 56,
    "weighted_town_exposure": 47.3,
    "away_games": 23,
    "confidence": "Modeled"
  },
  {
    "team": "Homestead Grays",
    "season": 1947,
    "danger_score": 0.246,
    "danger_lower_bound": 0.018,
    "danger_upper_bound": 0.591,
    "total_route_miles": 2788.0,
    "road_segments_analyzed": 22,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 111,
    "towns_confirmed": 4,
    "towns_probable": 27,
    "towns_possible": 80,
    "weighted_town_exposure": 54.9,
    "away_games": 24,
    "confidence": "Modeled"
  },
  {
    "team": "Memphis Red Sox",
    "season": 1941,
    "danger_score": 0.246,
    "danger_lower_bound": 0.073,
    "danger_upper_bound": 0.615,
    "total_route_miles": 12124.0,
    "road_segments_analyzed": 24,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 358,
    "towns_confirmed": 71,
    "towns_probable": 176,
    "towns_possible": 111,
    "weighted_town_exposure": 238.6,
    "away_games": 29,
    "confidence": "Modeled"
  },
  {
    "team": "Homestead Grays",
    "season": 1942,
    "danger_score": 0.245,
    "danger_lower_bound": 0.022,
    "danger_upper_bound": 0.592,
    "total_route_miles": 2311.0,
    "road_segments_analyzed": 21,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 91,
    "towns_confirmed": 4,
    "towns_probable": 22,
    "towns_possible": 65,
    "weighted_town_exposure": 45.4,
    "away_games": 25,
    "confidence": "Modeled"
  },
  {
    "team": "Philadelphia Stars",
    "season": 1948,
    "danger_score": 0.244,
    "danger_lower_bound": 0.036,
    "danger_upper_bound": 0.577,
    "total_route_miles": 3094.0,
    "road_segments_analyzed": 18,
    "high_danger_segments": 2,
    "sundown_towns_encountered": 112,
    "towns_confirmed": 9,
    "towns_probable": 43,
    "towns_possible": 60,
    "weighted_town_exposure": 63.1,
    "away_games": 24,
    "confidence": "Modeled"
  },
  {
    "team": "Philadelphia Stars",
    "season": 1947,
    "danger_score": 0.243,
    "danger_lower_bound": 0.026,
    "danger_upper_bound": 0.607,
    "total_route_miles": 3385.0,
    "road_segments_analyzed": 22,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 123,
    "towns_confirmed": 7,
    "towns_probable": 41,
    "towns_possible": 75,
    "weighted_town_exposure": 65.7,
    "away_games": 25,
    "confidence": "Modeled"
  },
  {
    "team": "Homestead Grays",
    "season": 1940,
    "danger_score": 0.242,
    "danger_lower_bound": 0.024,
    "danger_upper_bound": 0.593,
    "total_route_miles": 2580.0,
    "road_segments_analyzed": 20,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 101,
    "towns_confirmed": 5,
    "towns_probable": 22,
    "towns_possible": 74,
    "weighted_town_exposure": 50.0,
    "away_games": 24,
    "confidence": "Modeled"
  },
  {
    "team": "Homestead Grays",
    "season": 1945,
    "danger_score": 0.241,
    "danger_lower_bound": 0.021,
    "danger_upper_bound": 0.587,
    "total_route_miles": 2939.0,
    "road_segments_analyzed": 20,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 109,
    "towns_confirmed": 5,
    "towns_probable": 34,
    "towns_possible": 70,
    "weighted_town_exposure": 56.8,
    "away_games": 24,
    "confidence": "Modeled"
  },
  {
    "team": "Newark Eagles",
    "season": 1947,
    "danger_score": 0.237,
    "danger_lower_bound": 0.026,
    "danger_upper_bound": 0.587,
    "total_route_miles": 3400.0,
    "road_segments_analyzed": 20,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 116,
    "towns_confirmed": 7,
    "towns_probable": 46,
    "towns_possible": 63,
    "weighted_town_exposure": 64.4,
    "away_games": 25,
    "confidence": "Modeled"
  },
  {
    "team": "Philadelphia Stars",
    "season": 1940,
    "danger_score": 0.234,
    "danger_lower_bound": 0.04,
    "danger_upper_bound": 0.518,
    "total_route_miles": 2839.0,
    "road_segments_analyzed": 21,
    "high_danger_segments": 3,
    "sundown_towns_encountered": 100,
    "towns_confirmed": 9,
    "towns_probable": 40,
    "towns_possible": 51,
    "weighted_town_exposure": 57.4,
    "away_games": 25,
    "confidence": "Modeled"
  },
  {
    "team": "Homestead Grays",
    "season": 1939,
    "danger_score": 0.23,
    "danger_lower_bound": 0.026,
    "danger_upper_bound": 0.568,
    "total_route_miles": 2431.0,
    "road_segments_analyzed": 21,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 90,
    "towns_confirmed": 5,
    "towns_probable": 19,
    "towns_possible": 66,
    "weighted_town_exposure": 44.7,
    "away_games": 25,
    "confidence": "Modeled"
  },
  {
    "team": "Homestead Grays",
    "season": 1943,
    "danger_score": 0.228,
    "danger_lower_bound": 0.02,
    "danger_upper_bound": 0.564,
    "total_route_miles": 2484.0,
    "road_segments_analyzed": 22,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 88,
    "towns_confirmed": 4,
    "towns_probable": 26,
    "towns_possible": 58,
    "weighted_town_exposure": 45.4,
    "away_games": 24,
    "confidence": "Modeled"
  },
  {
    "team": "Homestead Grays",
    "season": 1948,
    "danger_score": 0.226,
    "danger_lower_bound": 0.027,
    "danger_upper_bound": 0.564,
    "total_route_miles": 2277.0,
    "road_segments_analyzed": 15,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 78,
    "towns_confirmed": 5,
    "towns_probable": 23,
    "towns_possible": 50,
    "weighted_town_exposure": 41.1,
    "away_games": 24,
    "confidence": "Modeled"
  },
  {
    "team": "Newark Eagles",
    "season": 1941,
    "danger_score": 0.226,
    "danger_lower_bound": 0.032,
    "danger_upper_bound": 0.552,
    "total_route_miles": 3857.0,
    "road_segments_analyzed": 24,
    "high_danger_segments": 1,
    "sundown_towns_encountered": 132,
    "towns_confirmed": 10,
    "towns_probable": 41,
    "towns_possible": 81,
    "weighted_town_exposure": 71.1,
    "away_games": 24,
    "confidence": "Modeled"
  },
  {
    "team": "Homestead Grays",
    "season": 1946,
    "danger_score": 0.225,
    "danger_lower_bound": 0.015,
    "danger_upper_bound": 0.548,
    "total_route_miles": 2429.0,
    "road_segments_analyzed": 19,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 89,
    "towns_confirmed": 3,
    "towns_probable": 21,
    "towns_possible": 65,
    "weighted_town_exposure": 43.7,
    "away_games": 25,
    "confidence": "Modeled"
  },
  {
    "team": "Memphis Red Sox",
    "season": 1939,
    "danger_score": 0.225,
    "danger_lower_bound": 0.079,
    "danger_upper_bound": 0.529,
    "total_route_miles": 7876.0,
    "road_segments_analyzed": 21,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 215,
    "towns_confirmed": 50,
    "towns_probable": 86,
    "towns_possible": 79,
    "weighted_town_exposure": 141.8,
    "away_games": 25,
    "confidence": "Modeled"
  },
  {
    "team": "Philadelphia Stars",
    "season": 1944,
    "danger_score": 0.216,
    "danger_lower_bound": 0.025,
    "danger_upper_bound": 0.541,
    "total_route_miles": 2528.0,
    "road_segments_analyzed": 18,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 84,
    "towns_confirmed": 5,
    "towns_probable": 24,
    "towns_possible": 55,
    "weighted_town_exposure": 43.8,
    "away_games": 24,
    "confidence": "Modeled"
  },
  {
    "team": "Homestead Grays",
    "season": 1944,
    "danger_score": 0.208,
    "danger_lower_bound": 0.0,
    "danger_upper_bound": 0.496,
    "total_route_miles": 2070.0,
    "road_segments_analyzed": 17,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 69,
    "towns_confirmed": 0,
    "towns_probable": 23,
    "towns_possible": 46,
    "weighted_town_exposure": 34.5,
    "away_games": 25,
    "confidence": "Modeled"
  },
  {
    "team": "Chicago American Giants",
    "season": 1943,
    "danger_score": 0.196,
    "danger_lower_bound": 0.074,
    "danger_upper_bound": 0.471,
    "total_route_miles": 10329.0,
    "road_segments_analyzed": 26,
    "high_danger_segments": 1,
    "sundown_towns_encountered": 236,
    "towns_confirmed": 61,
    "towns_probable": 103,
    "towns_possible": 72,
    "weighted_town_exposure": 161.9,
    "away_games": 27,
    "confidence": "Modeled"
  },
  {
    "team": "Baltimore Elite Giants",
    "season": 1939,
    "danger_score": 0.193,
    "danger_lower_bound": 0.014,
    "danger_upper_bound": 0.46,
    "total_route_miles": 3648.0,
    "road_segments_analyzed": 22,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 120,
    "towns_confirmed": 4,
    "towns_probable": 20,
    "towns_possible": 96,
    "weighted_town_exposure": 56.4,
    "away_games": 24,
    "confidence": "Modeled"
  },
  {
    "team": "Philadelphia Stars",
    "season": 1942,
    "danger_score": 0.192,
    "danger_lower_bound": 0.016,
    "danger_upper_bound": 0.466,
    "total_route_miles": 3026.0,
    "road_segments_analyzed": 19,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 90,
    "towns_confirmed": 4,
    "towns_probable": 27,
    "towns_possible": 59,
    "weighted_town_exposure": 46.5,
    "away_games": 24,
    "confidence": "Modeled"
  },
  {
    "team": "Chicago American Giants",
    "season": 1939,
    "danger_score": 0.186,
    "danger_lower_bound": 0.056,
    "danger_upper_bound": 0.408,
    "total_route_miles": 7813.0,
    "road_segments_analyzed": 21,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 178,
    "towns_confirmed": 35,
    "towns_probable": 80,
    "towns_possible": 63,
    "weighted_town_exposure": 116.2,
    "away_games": 27,
    "confidence": "Modeled"
  },
  {
    "team": "Homestead Grays",
    "season": 1936,
    "danger_score": 0.168,
    "danger_lower_bound": 0.017,
    "danger_upper_bound": 0.409,
    "total_route_miles": 2990.0,
    "road_segments_analyzed": 18,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 84,
    "towns_confirmed": 4,
    "towns_probable": 14,
    "towns_possible": 66,
    "weighted_town_exposure": 40.2,
    "away_games": 23,
    "confidence": "Modeled"
  },
  {
    "team": "Chicago American Giants",
    "season": 1936,
    "danger_score": 0.166,
    "danger_lower_bound": 0.039,
    "danger_upper_bound": 0.381,
    "total_route_miles": 8932.0,
    "road_segments_analyzed": 23,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 186,
    "towns_confirmed": 28,
    "towns_probable": 92,
    "towns_possible": 66,
    "weighted_town_exposure": 118.8,
    "away_games": 28,
    "confidence": "Modeled"
  },
  {
    "team": "Philadelphia Stars",
    "season": 1945,
    "danger_score": 0.165,
    "danger_lower_bound": 0.009,
    "danger_upper_bound": 0.412,
    "total_route_miles": 4078.0,
    "road_segments_analyzed": 21,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 112,
    "towns_confirmed": 3,
    "towns_probable": 24,
    "towns_possible": 85,
    "weighted_town_exposure": 53.8,
    "away_games": 25,
    "confidence": "Modeled"
  },
  {
    "team": "Chicago American Giants",
    "season": 1942,
    "danger_score": 0.164,
    "danger_lower_bound": 0.051,
    "danger_upper_bound": 0.338,
    "total_route_miles": 8662.0,
    "road_segments_analyzed": 21,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 171,
    "towns_confirmed": 35,
    "towns_probable": 80,
    "towns_possible": 56,
    "weighted_town_exposure": 113.4,
    "away_games": 27,
    "confidence": "Modeled"
  },
  {
    "team": "Newark Eagles",
    "season": 1939,
    "danger_score": 0.159,
    "danger_lower_bound": 0.01,
    "danger_upper_bound": 0.392,
    "total_route_miles": 3630.0,
    "road_segments_analyzed": 20,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 95,
    "towns_confirmed": 3,
    "towns_probable": 21,
    "towns_possible": 71,
    "weighted_town_exposure": 46.1,
    "away_games": 25,
    "confidence": "Modeled"
  },
  {
    "team": "Chicago American Giants",
    "season": 1937,
    "danger_score": 0.155,
    "danger_lower_bound": 0.035,
    "danger_upper_bound": 0.372,
    "total_route_miles": 8912.0,
    "road_segments_analyzed": 25,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 176,
    "towns_confirmed": 25,
    "towns_probable": 83,
    "towns_possible": 68,
    "weighted_town_exposure": 110.3,
    "away_games": 27,
    "confidence": "Modeled"
  },
  {
    "team": "Chicago American Giants",
    "season": 1938,
    "danger_score": 0.154,
    "danger_lower_bound": 0.031,
    "danger_upper_bound": 0.385,
    "total_route_miles": 7347.0,
    "road_segments_analyzed": 21,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 146,
    "towns_confirmed": 18,
    "towns_probable": 71,
    "towns_possible": 57,
    "weighted_town_exposure": 90.5,
    "away_games": 26,
    "confidence": "Modeled"
  },
  {
    "team": "Homestead Grays",
    "season": 1938,
    "danger_score": 0.154,
    "danger_lower_bound": 0.006,
    "danger_upper_bound": 0.382,
    "total_route_miles": 3902.0,
    "road_segments_analyzed": 21,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 102,
    "towns_confirmed": 2,
    "towns_probable": 21,
    "towns_possible": 79,
    "weighted_town_exposure": 48.3,
    "away_games": 24,
    "confidence": "Modeled"
  },
  {
    "team": "Philadelphia Stars",
    "season": 1939,
    "danger_score": 0.15,
    "danger_lower_bound": 0.01,
    "danger_upper_bound": 0.377,
    "total_route_miles": 2595.0,
    "road_segments_analyzed": 16,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 67,
    "towns_confirmed": 2,
    "towns_probable": 11,
    "towns_possible": 54,
    "weighted_town_exposure": 31.3,
    "away_games": 22,
    "confidence": "Modeled"
  },
  {
    "team": "Homestead Grays",
    "season": 1937,
    "danger_score": 0.147,
    "danger_lower_bound": 0.014,
    "danger_upper_bound": 0.367,
    "total_route_miles": 2683.0,
    "road_segments_analyzed": 15,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 66,
    "towns_confirmed": 3,
    "towns_probable": 11,
    "towns_possible": 52,
    "weighted_town_exposure": 31.5,
    "away_games": 23,
    "confidence": "Modeled"
  },
  {
    "team": "Baltimore Elite Giants",
    "season": 1938,
    "danger_score": 0.145,
    "danger_lower_bound": 0.006,
    "danger_upper_bound": 0.354,
    "total_route_miles": 4263.0,
    "road_segments_analyzed": 20,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 104,
    "towns_confirmed": 2,
    "towns_probable": 22,
    "towns_possible": 80,
    "weighted_town_exposure": 49.4,
    "away_games": 24,
    "confidence": "Modeled"
  },
  {
    "team": "Newark Eagles",
    "season": 1938,
    "danger_score": 0.142,
    "danger_lower_bound": 0.013,
    "danger_upper_bound": 0.357,
    "total_route_miles": 4859.0,
    "road_segments_analyzed": 22,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 120,
    "towns_confirmed": 5,
    "towns_probable": 15,
    "towns_possible": 100,
    "weighted_town_exposure": 55.5,
    "away_games": 24,
    "confidence": "Modeled"
  },
  {
    "team": "Newark Eagles",
    "season": 1936,
    "danger_score": 0.138,
    "danger_lower_bound": 0.009,
    "danger_upper_bound": 0.345,
    "total_route_miles": 5786.0,
    "road_segments_analyzed": 24,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 142,
    "towns_confirmed": 4,
    "towns_probable": 16,
    "towns_possible": 122,
    "weighted_town_exposure": 64.0,
    "away_games": 25,
    "confidence": "Modeled"
  },
  {
    "team": "Chicago American Giants",
    "season": 1940,
    "danger_score": 0.137,
    "danger_lower_bound": 0.039,
    "danger_upper_bound": 0.307,
    "total_route_miles": 8645.0,
    "road_segments_analyzed": 20,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 146,
    "towns_confirmed": 27,
    "towns_probable": 67,
    "towns_possible": 52,
    "weighted_town_exposure": 94.7,
    "away_games": 27,
    "confidence": "Modeled"
  },
  {
    "team": "Philadelphia Stars",
    "season": 1938,
    "danger_score": 0.13,
    "danger_lower_bound": 0.0,
    "danger_upper_bound": 0.326,
    "total_route_miles": 4540.0,
    "road_segments_analyzed": 22,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 108,
    "towns_confirmed": 0,
    "towns_probable": 14,
    "towns_possible": 94,
    "weighted_town_exposure": 47.4,
    "away_games": 23,
    "confidence": "Modeled"
  },
  {
    "team": "Newark Eagles",
    "season": 1937,
    "danger_score": 0.128,
    "danger_lower_bound": 0.008,
    "danger_upper_bound": 0.321,
    "total_route_miles": 4544.0,
    "road_segments_analyzed": 17,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 104,
    "towns_confirmed": 3,
    "towns_probable": 11,
    "towns_possible": 90,
    "weighted_town_exposure": 46.7,
    "away_games": 23,
    "confidence": "Modeled"
  },
  {
    "team": "Chicago American Giants",
    "season": 1941,
    "danger_score": 0.118,
    "danger_lower_bound": 0.025,
    "danger_upper_bound": 0.294,
    "total_route_miles": 8216.0,
    "road_segments_analyzed": 20,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 124,
    "towns_confirmed": 16,
    "towns_probable": 60,
    "towns_possible": 48,
    "weighted_town_exposure": 77.2,
    "away_games": 27,
    "confidence": "Modeled"
  },
  {
    "team": "Philadelphia Stars",
    "season": 1937,
    "danger_score": 0.116,
    "danger_lower_bound": 0.005,
    "danger_upper_bound": 0.291,
    "total_route_miles": 4670.0,
    "road_segments_analyzed": 19,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 102,
    "towns_confirmed": 2,
    "towns_probable": 5,
    "towns_possible": 95,
    "weighted_town_exposure": 43.5,
    "away_games": 25,
    "confidence": "Modeled"
  },
  {
    "team": "Philadelphia Stars",
    "season": 1936,
    "danger_score": 0.111,
    "danger_lower_bound": 0.0,
    "danger_upper_bound": 0.275,
    "total_route_miles": 3849.0,
    "road_segments_analyzed": 16,
    "high_danger_segments": 0,
    "sundown_towns_encountered": 80,
    "towns_confirmed": 0,
    "towns_probable": 8,
    "towns_possible": 72,
    "weighted_town_exposure": 34.4,
    "away_games": 24,
    "confidence": "Modeled"
  }
];

// 34 city-pair corridors with full spatial analysis
// Each corridor: sundown towns within 5mi of great-circle route
// Evidence weights: Confirmed=1.0, Probable=0.7, Possible=0.4
var CORRIDORS_FULL = [
  {
    "from": "Baltimore, MD",
    "to": "Washington, D.C.",
    "route_distance_miles": 34.1,
    "danger_score": 1.0,
    "danger_lower_bound": 0.734,
    "danger_upper_bound": 1.0,
    "towns_within_5mi": 5,
    "towns_confirmed": 2,
    "towns_probable": 3,
    "towns_possible": 0,
    "weighted_count": 4.1,
    "nearby_towns": [
      {
        "name": "University Park",
        "state": "MD",
        "evidence": "Probable",
        "distance_miles": 0.6
      },
      {
        "name": "Mount Rainier",
        "state": "MD",
        "evidence": "Probable",
        "distance_miles": 1.0
      },
      {
        "name": "Brentwood",
        "state": "MD",
        "evidence": "Probable",
        "distance_miles": 1.3
      },
      {
        "name": "Savage",
        "state": "MD",
        "evidence": "Confirmed",
        "distance_miles": 1.9
      },
      {
        "name": "Greenbelt",
        "state": "MD",
        "evidence": "Confirmed",
        "distance_miles": 2.1
      }
    ]
  },
  {
    "from": "Chicago, IL",
    "to": "Indianapolis, IN",
    "route_distance_miles": 161.4,
    "danger_score": 0.883,
    "danger_lower_bound": 0.387,
    "danger_upper_bound": 1.0,
    "towns_within_5mi": 15,
    "towns_confirmed": 5,
    "towns_probable": 8,
    "towns_possible": 2,
    "weighted_count": 11.4,
    "nearby_towns": [
      {
        "name": "Frankfort",
        "state": "IN",
        "evidence": "Confirmed",
        "distance_miles": 0.5
      },
      {
        "name": "Crown Point",
        "state": "IN",
        "evidence": "Probable",
        "distance_miles": 0.6
      },
      {
        "name": "Rossville",
        "state": "IN",
        "evidence": "Probable",
        "distance_miles": 0.7
      },
      {
        "name": "Zionsville",
        "state": "IN",
        "evidence": "Confirmed",
        "distance_miles": 1.0
      },
      {
        "name": "Highland",
        "state": "IN",
        "evidence": "Possible",
        "distance_miles": 1.4
      },
      {
        "name": "Whiting",
        "state": "IN",
        "evidence": "Confirmed",
        "distance_miles": 2.2
      },
      {
        "name": "Monon",
        "state": "IN",
        "evidence": "Probable",
        "distance_miles": 2.6
      },
      {
        "name": "Merrillville",
        "state": "IN",
        "evidence": "Possible",
        "distance_miles": 2.7
      },
      {
        "name": "Schererville",
        "state": "IN",
        "evidence": "Probable",
        "distance_miles": 2.8
      },
      {
        "name": "Delphi",
        "state": "IN",
        "evidence": "Probable",
        "distance_miles": 3.0
      },
      {
        "name": "Hebron",
        "state": "IN",
        "evidence": "Probable",
        "distance_miles": 3.1
      },
      {
        "name": "Munster",
        "state": "IN",
        "evidence": "Probable",
        "distance_miles": 3.6
      },
      {
        "name": "Whitestown",
        "state": "IN",
        "evidence": "Probable",
        "distance_miles": 3.6
      },
      {
        "name": "Monticello",
        "state": "IN",
        "evidence": "Confirmed",
        "distance_miles": 3.8
      },
      {
        "name": "Speedway",
        "state": "IN",
        "evidence": "Confirmed",
        "distance_miles": 4.3
      }
    ]
  },
  {
    "from": "Chicago, IL",
    "to": "Memphis, TN",
    "route_distance_miles": 480.3,
    "danger_score": 0.656,
    "danger_lower_bound": 0.364,
    "danger_upper_bound": 1.0,
    "towns_within_5mi": 33,
    "towns_confirmed": 14,
    "towns_probable": 12,
    "towns_possible": 7,
    "weighted_count": 25.2,
    "nearby_towns": [
      {
        "name": "Manteno",
        "state": "IL",
        "evidence": "Probable",
        "distance_miles": 0.0
      },
      {
        "name": "Elco",
        "state": "IL",
        "evidence": "Confirmed",
        "distance_miles": 0.2
      },
      {
        "name": "Zeigler",
        "state": "IL",
        "evidence": "Confirmed",
        "distance_miles": 0.2
      },
      {
        "name": "Iuka",
        "state": "IL",
        "evidence": "Probable",
        "distance_miles": 0.3
      },
      {
        "name": "Buckner",
        "state": "IL",
        "evidence": "Possible",
        "distance_miles": 0.4
      },
      {
        "name": "Carterville",
        "state": "IL",
        "evidence": "Confirmed",
        "distance_miles": 0.9
      },
      {
        "name": "Peotone",
        "state": "IL",
        "evidence": "Probable",
        "distance_miles": 0.9
      },
      {
        "name": "Onarga",
        "state": "IL",
        "evidence": "Probable",
        "distance_miles": 1.3
      },
      {
        "name": "Christopher",
        "state": "IL",
        "evidence": "Confirmed",
        "distance_miles": 1.4
      },
      {
        "name": "Paxton",
        "state": "IL",
        "evidence": "Probable",
        "distance_miles": 1.4
      },
      {
        "name": "Anna",
        "state": "IL",
        "evidence": "Confirmed",
        "distance_miles": 1.4
      },
      {
        "name": "Rantoul",
        "state": "IL",
        "evidence": "Probable",
        "distance_miles": 1.6
      },
      {
        "name": "Tolono",
        "state": "IL",
        "evidence": "Probable",
        "distance_miles": 1.8
      },
      {
        "name": "Valier",
        "state": "IL",
        "evidence": "Probable",
        "distance_miles": 1.8
      },
      {
        "name": "Buckley",
        "state": "IL",
        "evidence": "Probable",
        "distance_miles": 2.1
      },
      {
        "name": "Crainville",
        "state": "IL",
        "evidence": "Confirmed",
        "distance_miles": 2.5
      },
      {
        "name": "Jonesboro",
        "state": "IL",
        "evidence": "Confirmed",
        "distance_miles": 2.8
      },
      {
        "name": "Royalton",
        "state": "IL",
        "evidence": "Confirmed",
        "distance_miles": 2.8
      },
      {
        "name": "Herrin",
        "state": "IL",
        "evidence": "Confirmed",
        "distance_miles": 3.1
      },
      {
        "name": "Effingham",
        "state": "IL",
        "evidence": "Confirmed",
        "distance_miles": 3.2
      },
      {
        "name": "Sesser",
        "state": "IL",
        "evidence": "Confirmed",
        "distance_miles": 3.5
      },
      {
        "name": "Orient",
        "state": "IL",
        "evidence": "Possible",
        "distance_miles": 3.6
      },
      {
        "name": "Arthur",
        "state": "IL",
        "evidence": "Possible",
        "distance_miles": 3.7
      },
      {
        "name": "West City",
        "state": "IL",
        "evidence": "Possible",
        "distance_miles": 3.7
      },
      {
        "name": "Oak Lawn",
        "state": "IL",
        "evidence": "Probable",
        "distance_miles": 3.9
      },
      {
        "name": "East Prairie",
        "state": "MO",
        "evidence": "Probable",
        "distance_miles": 3.9
      },
      {
        "name": "Mulkeytown",
        "state": "IL",
        "evidence": "Confirmed",
        "distance_miles": 4.4
      },
      {
        "name": "Dongola",
        "state": "IL",
        "evidence": "Probable",
        "distance_miles": 4.5
      },
      {
        "name": "Neoga",
        "state": "IL",
        "evidence": "Confirmed",
        "distance_miles": 4.6
      },
      {
        "name": "Tuscola",
        "state": "IL",
        "evidence": "Possible",
        "distance_miles": 4.8
      },
      {
        "name": "Atwood",
        "state": "IL",
        "evidence": "Possible",
        "distance_miles": 5.0
      },
      {
        "name": "Benton",
        "state": "IL",
        "evidence": "Confirmed",
        "distance_miles": 5.0
      },
      {
        "name": "West City",
        "state": "IL",
        "evidence": "Possible",
        "distance_miles": 5.0
      }
    ]
  },
  {
    "from": "Chicago, IL",
    "to": "St. Louis, MO",
    "route_distance_miles": 259.5,
    "danger_score": 0.607,
    "danger_lower_bound": 0.337,
    "danger_upper_bound": 1.0,
    "towns_within_5mi": 18,
    "towns_confirmed": 7,
    "towns_probable": 4,
    "towns_possible": 7,
    "weighted_count": 12.6,
    "nearby_towns": [
      {
        "name": "Granite City",
        "state": "IL",
        "evidence": "Confirmed",
        "distance_miles": 0.4
      },
      {
        "name": "Granite City",
        "state": "IL",
        "evidence": "Confirmed",
        "distance_miles": 0.8
      },
      {
        "name": "Roxana",
        "state": "IL",
        "evidence": "Possible",
        "distance_miles": 0.8
      },
      {
        "name": "Manhattan",
        "state": "IL",
        "evidence": "Probable",
        "distance_miles": 0.9
      },
      {
        "name": "Roxana",
        "state": "IL",
        "evidence": "Possible",
        "distance_miles": 1.0
      },
      {
        "name": "Gillespie",
        "state": "IL",
        "evidence": "Confirmed",
        "distance_miles": 1.2
      },
      {
        "name": "Oak Lawn",
        "state": "IL",
        "evidence": "Probable",
        "distance_miles": 1.2
      },
      {
        "name": "Madison",
        "state": "IL",
        "evidence": "Possible",
        "distance_miles": 1.9
      },
      {
        "name": "Orland Park",
        "state": "IL",
        "evidence": "Possible",
        "distance_miles": 2.2
      },
      {
        "name": "Le Roy",
        "state": "IL",
        "evidence": "Possible",
        "distance_miles": 2.9
      },
      {
        "name": "Kenney",
        "state": "IL",
        "evidence": "Possible",
        "distance_miles": 3.3
      },
      {
        "name": "Wood River",
        "state": "IL",
        "evidence": "Possible",
        "distance_miles": 3.6
      },
      {
        "name": "Niantic",
        "state": "IL",
        "evidence": "Probable",
        "distance_miles": 4.0
      },
      {
        "name": "Warrensburg",
        "state": "IL",
        "evidence": "Probable",
        "distance_miles": 4.0
      },
      {
        "name": "Staunton",
        "state": "IL",
        "evidence": "Confirmed",
        "distance_miles": 4.3
      },
      {
        "name": "Bunker Hill",
        "state": "IL",
        "evidence": "Confirmed",
        "distance_miles": 4.4
      },
      {
        "name": "Glen Carbon",
        "state": "IL",
        "evidence": "Confirmed",
        "distance_miles": 4.8
      },
      {
        "name": "Mount Olive",
        "state": "IL",
        "evidence": "Confirmed",
        "distance_miles": 5.0
      }
    ]
  },
  {
    "from": "Philadelphia, PA",
    "to": "Washington, D.C.",
    "route_distance_miles": 120.4,
    "danger_score": 0.54,
    "danger_lower_bound": 0.104,
    "danger_upper_bound": 1.0,
    "towns_within_5mi": 7,
    "towns_confirmed": 1,
    "towns_probable": 6,
    "towns_possible": 0,
    "weighted_count": 5.2,
    "nearby_towns": [
      {
        "name": "Mount Rainier",
        "state": "MD",
        "evidence": "Probable",
        "distance_miles": 0.0
      },
      {
        "name": "Brentwood",
        "state": "MD",
        "evidence": "Probable",
        "distance_miles": 0.1
      },
      {
        "name": "Greenbelt",
        "state": "MD",
        "evidence": "Confirmed",
        "distance_miles": 0.6
      },
      {
        "name": "University Park",
        "state": "MD",
        "evidence": "Probable",
        "distance_miles": 1.1
      },
      {
        "name": "Folcroft",
        "state": "PA",
        "evidence": "Probable",
        "distance_miles": 2.1
      },
      {
        "name": "Folcroft",
        "state": "PA",
        "evidence": "Probable",
        "distance_miles": 2.1
      },
      {
        "name": "Crofton",
        "state": "MD",
        "evidence": "Probable",
        "distance_miles": 4.7
      }
    ]
  },
  {
    "from": "Newark, NJ",
    "to": "Philadelphia, PA",
    "route_distance_miles": 76.8,
    "danger_score": 0.488,
    "danger_lower_bound": 0.0,
    "danger_upper_bound": 1.0,
    "towns_within_5mi": 6,
    "towns_confirmed": 0,
    "towns_probable": 2,
    "towns_possible": 4,
    "weighted_count": 3.0,
    "nearby_towns": [
      {
        "name": "Levittown",
        "state": "PA",
        "evidence": "Possible",
        "distance_miles": 0.7
      },
      {
        "name": "Clark",
        "state": "NJ",
        "evidence": "Possible",
        "distance_miles": 0.8
      },
      {
        "name": "Hillside",
        "state": "NJ",
        "evidence": "Possible",
        "distance_miles": 1.1
      },
      {
        "name": "Garwood",
        "state": "NJ",
        "evidence": "Probable",
        "distance_miles": 2.7
      },
      {
        "name": "Somerset",
        "state": "NJ",
        "evidence": "Possible",
        "distance_miles": 2.8
      },
      {
        "name": "Carteret",
        "state": "NJ",
        "evidence": "Probable",
        "distance_miles": 4.4
      }
    ]
  },
  {
    "from": "Cleveland, OH",
    "to": "Kansas City, MO",
    "route_distance_miles": 699.9,
    "danger_score": 0.452,
    "danger_lower_bound": 0.089,
    "danger_upper_bound": 1.0,
    "towns_within_5mi": 43,
    "towns_confirmed": 5,
    "towns_probable": 17,
    "towns_possible": 21,
    "weighted_count": 25.3,
    "nearby_towns": [
      {
        "name": "Ashland",
        "state": "IL",
        "evidence": "Confirmed",
        "distance_miles": 0.0
      },
      {
        "name": "Westlake",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 0.0
      },
      {
        "name": "Kenney",
        "state": "IL",
        "evidence": "Possible",
        "distance_miles": 0.2
      },
      {
        "name": "Bellevue",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 0.2
      },
      {
        "name": "Buckner",
        "state": "MO",
        "evidence": "Possible",
        "distance_miles": 0.4
      },
      {
        "name": "Mansfield",
        "state": "IL",
        "evidence": "Possible",
        "distance_miles": 0.6
      },
      {
        "name": "Lakewood",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 0.6
      },
      {
        "name": "Rocky River",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 0.6
      },
      {
        "name": "Avon",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 0.7
      },
      {
        "name": "Athens",
        "state": "IL",
        "evidence": "Confirmed",
        "distance_miles": 0.8
      },
      {
        "name": "Amherst",
        "state": "OH",
        "evidence": "Probable",
        "distance_miles": 0.9
      },
      {
        "name": "Meredosia",
        "state": "IL",
        "evidence": "Probable",
        "distance_miles": 1.1
      },
      {
        "name": "Arenzville",
        "state": "IL",
        "evidence": "Probable",
        "distance_miles": 2.0
      },
      {
        "name": "Walton",
        "state": "IN",
        "evidence": "Probable",
        "distance_miles": 2.0
      },
      {
        "name": "Ashland",
        "state": "IL",
        "evidence": "Confirmed",
        "distance_miles": 2.1
      },
      {
        "name": "Potomac",
        "state": "IL",
        "evidence": "Possible",
        "distance_miles": 2.1
      },
      {
        "name": "Rantoul",
        "state": "IL",
        "evidence": "Probable",
        "distance_miles": 2.1
      },
      {
        "name": "Delphi",
        "state": "IN",
        "evidence": "Probable",
        "distance_miles": 2.1
      },
      {
        "name": "Ottawa",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 2.1
      },
      {
        "name": "Vermilion",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 2.1
      },
      {
        "name": "Camden",
        "state": "IN",
        "evidence": "Probable",
        "distance_miles": 2.2
      },
      {
        "name": "Flora",
        "state": "IN",
        "evidence": "Probable",
        "distance_miles": 2.3
      },
      {
        "name": "Mahomet",
        "state": "IL",
        "evidence": "Probable",
        "distance_miles": 2.4
      },
      {
        "name": "North Olmsted",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 2.5
      },
      {
        "name": "Bay Village",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 2.6
      },
      {
        "name": "Ossian",
        "state": "IN",
        "evidence": "Probable",
        "distance_miles": 2.7
      },
      {
        "name": "South Amherst",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 3.1
      },
      {
        "name": "Cantrall",
        "state": "IL",
        "evidence": "Possible",
        "distance_miles": 3.2
      },
      {
        "name": "Brooklyn",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 3.3
      },
      {
        "name": "Newburgh Heights",
        "state": "OH",
        "evidence": "Probable",
        "distance_miles": 3.3
      },
      {
        "name": "Williamsville",
        "state": "IL",
        "evidence": "Possible",
        "distance_miles": 3.5
      },
      {
        "name": "Clyde",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 3.5
      },
      {
        "name": "Grove City",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 3.5
      },
      {
        "name": "Decatur",
        "state": "IN",
        "evidence": "Confirmed",
        "distance_miles": 3.6
      },
      {
        "name": "Sugar Creek",
        "state": "MO",
        "evidence": "Possible",
        "distance_miles": 3.6
      },
      {
        "name": "De Land",
        "state": "IL",
        "evidence": "Probable",
        "distance_miles": 3.8
      },
      {
        "name": "DeLand",
        "state": "IL",
        "evidence": "Probable",
        "distance_miles": 3.8
      },
      {
        "name": "North Baltimore",
        "state": "OH",
        "evidence": "Probable",
        "distance_miles": 4.0
      },
      {
        "name": "West Lafayette",
        "state": "IN",
        "evidence": "Probable",
        "distance_miles": 4.1
      },
      {
        "name": "Avon Lake",
        "state": "OH",
        "evidence": "Probable",
        "distance_miles": 4.1
      },
      {
        "name": "Huron",
        "state": "OH",
        "evidence": "Probable",
        "distance_miles": 4.6
      },
      {
        "name": "Farmer City",
        "state": "IL",
        "evidence": "Confirmed",
        "distance_miles": 4.7
      },
      {
        "name": "Sheffield Lake",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 4.7
      }
    ]
  },
  {
    "from": "Cleveland, OH",
    "to": "Indianapolis, IN",
    "route_distance_miles": 262.2,
    "danger_score": 0.419,
    "danger_lower_bound": 0.0,
    "danger_upper_bound": 1.0,
    "towns_within_5mi": 16,
    "towns_confirmed": 0,
    "towns_probable": 8,
    "towns_possible": 8,
    "weighted_count": 8.8,
    "nearby_towns": [
      {
        "name": "North Olmsted",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 0.5
      },
      {
        "name": "Farmland",
        "state": "IN",
        "evidence": "Probable",
        "distance_miles": 1.0
      },
      {
        "name": "Fortville",
        "state": "IN",
        "evidence": "Possible",
        "distance_miles": 1.7
      },
      {
        "name": "Lakewood",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 2.0
      },
      {
        "name": "Wapakoneta",
        "state": "OH",
        "evidence": "Probable",
        "distance_miles": 2.0
      },
      {
        "name": "Brooklyn",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 2.3
      },
      {
        "name": "Rocky River",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 2.6
      },
      {
        "name": "Alger",
        "state": "OH",
        "evidence": "Probable",
        "distance_miles": 2.7
      },
      {
        "name": "Middletown",
        "state": "IN",
        "evidence": "Probable",
        "distance_miles": 2.8
      },
      {
        "name": "Parker City",
        "state": "IN",
        "evidence": "Probable",
        "distance_miles": 2.8
      },
      {
        "name": "Westlake",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 3.0
      },
      {
        "name": "Newburgh Heights",
        "state": "OH",
        "evidence": "Probable",
        "distance_miles": 3.3
      },
      {
        "name": "Upper Sandusky",
        "state": "OH",
        "evidence": "Probable",
        "distance_miles": 3.5
      },
      {
        "name": "South Amherst",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 3.9
      },
      {
        "name": "Avon",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 4.5
      },
      {
        "name": "Pendleton",
        "state": "IN",
        "evidence": "Probable",
        "distance_miles": 5.0
      }
    ]
  },
  {
    "from": "New York, NY",
    "to": "Philadelphia, PA",
    "route_distance_miles": 91.3,
    "danger_score": 0.397,
    "danger_lower_bound": 0.137,
    "danger_upper_bound": 0.993,
    "towns_within_5mi": 5,
    "towns_confirmed": 1,
    "towns_probable": 1,
    "towns_possible": 3,
    "weighted_count": 2.9,
    "nearby_towns": [
      {
        "name": "Levittown",
        "state": "PA",
        "evidence": "Possible",
        "distance_miles": 0.4
      },
      {
        "name": "Carteret",
        "state": "NJ",
        "evidence": "Probable",
        "distance_miles": 1.2
      },
      {
        "name": "Clark",
        "state": "NJ",
        "evidence": "Possible",
        "distance_miles": 4.0
      },
      {
        "name": "Hillside",
        "state": "NJ",
        "evidence": "Possible",
        "distance_miles": 4.6
      },
      {
        "name": "Levittown/Willingboro",
        "state": "NJ",
        "evidence": "Confirmed",
        "distance_miles": 4.6
      }
    ]
  },
  {
    "from": "Chicago, IL",
    "to": "Cleveland, OH",
    "route_distance_miles": 307.9,
    "danger_score": 0.374,
    "danger_lower_bound": 0.0,
    "danger_upper_bound": 0.934,
    "towns_within_5mi": 17,
    "towns_confirmed": 0,
    "towns_probable": 8,
    "towns_possible": 9,
    "weighted_count": 9.2,
    "nearby_towns": [
      {
        "name": "Lakewood",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 1.3
      },
      {
        "name": "Avon Lake",
        "state": "OH",
        "evidence": "Probable",
        "distance_miles": 1.4
      },
      {
        "name": "Bay Village",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 1.5
      },
      {
        "name": "Sheffield Lake",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 2.1
      },
      {
        "name": "Rocky River",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 2.2
      },
      {
        "name": "Long Beach",
        "state": "IN",
        "evidence": "Probable",
        "distance_miles": 2.9
      },
      {
        "name": "Newburgh Heights",
        "state": "OH",
        "evidence": "Probable",
        "distance_miles": 3.3
      },
      {
        "name": "Fremont",
        "state": "IN",
        "evidence": "Possible",
        "distance_miles": 3.4
      },
      {
        "name": "Middlebury",
        "state": "IN",
        "evidence": "Probable",
        "distance_miles": 3.5
      },
      {
        "name": "LaGrange",
        "state": "IN",
        "evidence": "Probable",
        "distance_miles": 4.0
      },
      {
        "name": "New Carlisle",
        "state": "IN",
        "evidence": "Probable",
        "distance_miles": 4.1
      },
      {
        "name": "Ottawa Hills",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 4.2
      },
      {
        "name": "Westlake",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 4.2
      },
      {
        "name": "Brooklyn",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 4.5
      },
      {
        "name": "Avon",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 4.7
      },
      {
        "name": "Mishawaka",
        "state": "IN",
        "evidence": "Probable",
        "distance_miles": 4.9
      },
      {
        "name": "Oak Harbor",
        "state": "OH",
        "evidence": "Probable",
        "distance_miles": 5.0
      }
    ]
  },
  {
    "from": "Newark, NJ",
    "to": "Washington, D.C.",
    "route_distance_miles": 196.0,
    "danger_score": 0.37,
    "danger_lower_bound": 0.064,
    "danger_upper_bound": 0.925,
    "towns_within_5mi": 10,
    "towns_confirmed": 1,
    "towns_probable": 4,
    "towns_possible": 5,
    "weighted_count": 5.8,
    "nearby_towns": [
      {
        "name": "Greenbelt",
        "state": "MD",
        "evidence": "Confirmed",
        "distance_miles": 0.1
      },
      {
        "name": "Somerset",
        "state": "NJ",
        "evidence": "Possible",
        "distance_miles": 0.1
      },
      {
        "name": "Mount Rainier",
        "state": "MD",
        "evidence": "Probable",
        "distance_miles": 0.2
      },
      {
        "name": "Brentwood",
        "state": "MD",
        "evidence": "Probable",
        "distance_miles": 0.4
      },
      {
        "name": "Clark",
        "state": "NJ",
        "evidence": "Possible",
        "distance_miles": 0.5
      },
      {
        "name": "University Park",
        "state": "MD",
        "evidence": "Probable",
        "distance_miles": 0.7
      },
      {
        "name": "Hillside",
        "state": "NJ",
        "evidence": "Possible",
        "distance_miles": 0.7
      },
      {
        "name": "Garwood",
        "state": "NJ",
        "evidence": "Probable",
        "distance_miles": 1.6
      },
      {
        "name": "Hatboro",
        "state": "PA",
        "evidence": "Possible",
        "distance_miles": 2.8
      },
      {
        "name": "Green Brook",
        "state": "NJ",
        "evidence": "Possible",
        "distance_miles": 4.5
      }
    ]
  },
  {
    "from": "Chicago, IL",
    "to": "Kansas City, MO",
    "route_distance_miles": 412.6,
    "danger_score": 0.364,
    "danger_lower_bound": 0.121,
    "danger_upper_bound": 0.909,
    "towns_within_5mi": 18,
    "towns_confirmed": 4,
    "towns_probable": 8,
    "towns_possible": 6,
    "weighted_count": 12.0,
    "nearby_towns": [
      {
        "name": "Romeoville",
        "state": "IL",
        "evidence": "Confirmed",
        "distance_miles": 0.9
      },
      {
        "name": "Sugar Creek",
        "state": "MO",
        "evidence": "Possible",
        "distance_miles": 1.0
      },
      {
        "name": "Carthage",
        "state": "IL",
        "evidence": "Probable",
        "distance_miles": 1.2
      },
      {
        "name": "Lemont",
        "state": "IL",
        "evidence": "Probable",
        "distance_miles": 1.4
      },
      {
        "name": "Henry",
        "state": "IL",
        "evidence": "Probable",
        "distance_miles": 1.5
      },
      {
        "name": "Burr Ridge",
        "state": "IL",
        "evidence": "Possible",
        "distance_miles": 2.0
      },
      {
        "name": "Warsaw",
        "state": "IL",
        "evidence": "Probable",
        "distance_miles": 2.3
      },
      {
        "name": "Bolingbrook",
        "state": "IL",
        "evidence": "Possible",
        "distance_miles": 2.8
      },
      {
        "name": "Plainfield",
        "state": "IL",
        "evidence": "Probable",
        "distance_miles": 2.8
      },
      {
        "name": "Darien",
        "state": "IL",
        "evidence": "Probable",
        "distance_miles": 3.4
      },
      {
        "name": "Lyons",
        "state": "IL",
        "evidence": "Probable",
        "distance_miles": 3.5
      },
      {
        "name": "Cicero",
        "state": "IL",
        "evidence": "Confirmed",
        "distance_miles": 4.0
      },
      {
        "name": "Oak Lawn",
        "state": "IL",
        "evidence": "Probable",
        "distance_miles": 4.3
      },
      {
        "name": "Woodridge",
        "state": "IL",
        "evidence": "Possible",
        "distance_miles": 4.4
      },
      {
        "name": "Berwyn",
        "state": "IL",
        "evidence": "Confirmed",
        "distance_miles": 4.7
      },
      {
        "name": "Buckner",
        "state": "MO",
        "evidence": "Possible",
        "distance_miles": 4.7
      },
      {
        "name": "Western Springs",
        "state": "IL",
        "evidence": "Confirmed",
        "distance_miles": 4.9
      },
      {
        "name": "North Kansas City",
        "state": "MO",
        "evidence": "Possible",
        "distance_miles": 4.9
      }
    ]
  },
  {
    "from": "New York, NY",
    "to": "Washington, D.C.",
    "route_distance_miles": 210.8,
    "danger_score": 0.362,
    "danger_lower_bound": 0.059,
    "danger_upper_bound": 0.904,
    "towns_within_5mi": 10,
    "towns_confirmed": 1,
    "towns_probable": 5,
    "towns_possible": 4,
    "weighted_count": 6.1,
    "nearby_towns": [
      {
        "name": "Greenbelt",
        "state": "MD",
        "evidence": "Confirmed",
        "distance_miles": 0.0
      },
      {
        "name": "Mount Rainier",
        "state": "MD",
        "evidence": "Probable",
        "distance_miles": 0.2
      },
      {
        "name": "Brentwood",
        "state": "MD",
        "evidence": "Probable",
        "distance_miles": 0.4
      },
      {
        "name": "University Park",
        "state": "MD",
        "evidence": "Probable",
        "distance_miles": 0.7
      },
      {
        "name": "Clark",
        "state": "NJ",
        "evidence": "Possible",
        "distance_miles": 1.7
      },
      {
        "name": "Somerset",
        "state": "NJ",
        "evidence": "Possible",
        "distance_miles": 1.9
      },
      {
        "name": "Hillside",
        "state": "NJ",
        "evidence": "Possible",
        "distance_miles": 3.0
      },
      {
        "name": "Carteret",
        "state": "NJ",
        "evidence": "Probable",
        "distance_miles": 3.3
      },
      {
        "name": "Garwood",
        "state": "NJ",
        "evidence": "Probable",
        "distance_miles": 3.7
      },
      {
        "name": "Hatboro",
        "state": "PA",
        "evidence": "Possible",
        "distance_miles": 4.4
      }
    ]
  },
  {
    "from": "Birmingham, AL",
    "to": "Chicago, IL",
    "route_distance_miles": 575.9,
    "danger_score": 0.358,
    "danger_lower_bound": 0.109,
    "danger_upper_bound": 0.895,
    "towns_within_5mi": 24,
    "towns_confirmed": 5,
    "towns_probable": 13,
    "towns_possible": 6,
    "weighted_count": 16.5,
    "nearby_towns": [
      {
        "name": "Fairview Park",
        "state": "IN",
        "evidence": "Possible",
        "distance_miles": 0.2
      },
      {
        "name": "Cullman County",
        "state": "AL",
        "evidence": "Confirmed",
        "distance_miles": 0.3
      },
      {
        "name": "Good Hope",
        "state": "AL",
        "evidence": "Probable",
        "distance_miles": 0.3
      },
      {
        "name": "Farmersburg",
        "state": "IN",
        "evidence": "Probable",
        "distance_miles": 0.3
      },
      {
        "name": "Crete",
        "state": "IL",
        "evidence": "Probable",
        "distance_miles": 0.5
      },
      {
        "name": "Cayuga",
        "state": "IN",
        "evidence": "Possible",
        "distance_miles": 1.0
      },
      {
        "name": "Petersburg",
        "state": "IN",
        "evidence": "Probable",
        "distance_miles": 1.0
      },
      {
        "name": "Bicknell",
        "state": "IN",
        "evidence": "Confirmed",
        "distance_miles": 1.1
      },
      {
        "name": "Crete",
        "state": "IL",
        "evidence": "Probable",
        "distance_miles": 1.5
      },
      {
        "name": "Shelburn",
        "state": "IN",
        "evidence": "Probable",
        "distance_miles": 1.5
      },
      {
        "name": "Cullman",
        "state": "AL",
        "evidence": "Confirmed",
        "distance_miles": 1.6
      },
      {
        "name": "Beecher",
        "state": "IL",
        "evidence": "Probable",
        "distance_miles": 1.6
      },
      {
        "name": "West Terre Haute",
        "state": "IN",
        "evidence": "Confirmed",
        "distance_miles": 2.9
      },
      {
        "name": "Grant Park",
        "state": "IL",
        "evidence": "Confirmed",
        "distance_miles": 3.2
      },
      {
        "name": "Montezuma",
        "state": "IN",
        "evidence": "Probable",
        "distance_miles": 3.2
      },
      {
        "name": "Willowbrook",
        "state": "IL",
        "evidence": "Possible",
        "distance_miles": 3.3
      },
      {
        "name": "Livermore",
        "state": "KY",
        "evidence": "Possible",
        "distance_miles": 3.6
      },
      {
        "name": "Hymera",
        "state": "IN",
        "evidence": "Probable",
        "distance_miles": 3.8
      },
      {
        "name": "Covington",
        "state": "IN",
        "evidence": "Probable",
        "distance_miles": 3.9
      },
      {
        "name": "Winslow",
        "state": "IN",
        "evidence": "Probable",
        "distance_miles": 4.2
      },
      {
        "name": "Kentland",
        "state": "IN",
        "evidence": "Probable",
        "distance_miles": 4.3
      },
      {
        "name": "Fairview",
        "state": "TN",
        "evidence": "Possible",
        "distance_miles": 4.6
      },
      {
        "name": "Dyer",
        "state": "IN",
        "evidence": "Possible",
        "distance_miles": 4.7
      },
      {
        "name": "Morocco",
        "state": "IN",
        "evidence": "Probable",
        "distance_miles": 4.9
      }
    ]
  },
  {
    "from": "New York, NY",
    "to": "Newark, NJ",
    "route_distance_miles": 15.0,
    "danger_score": 0.334,
    "danger_lower_bound": 0.0,
    "danger_upper_bound": 0.834,
    "towns_within_5mi": 1,
    "towns_confirmed": 0,
    "towns_probable": 0,
    "towns_possible": 1,
    "weighted_count": 0.4,
    "nearby_towns": [
      {
        "name": "Hillside",
        "state": "NJ",
        "evidence": "Possible",
        "distance_miles": 3.4
      }
    ]
  },
  {
    "from": "Indianapolis, IN",
    "to": "Kansas City, MO",
    "route_distance_miles": 452.9,
    "danger_score": 0.298,
    "danger_lower_bound": 0.138,
    "danger_upper_bound": 0.745,
    "towns_within_5mi": 15,
    "towns_confirmed": 5,
    "towns_probable": 6,
    "towns_possible": 4,
    "weighted_count": 10.8,
    "nearby_towns": [
      {
        "name": "Danville",
        "state": "IN",
        "evidence": "Probable",
        "distance_miles": 0.5
      },
      {
        "name": "Fairview Park",
        "state": "IN",
        "evidence": "Possible",
        "distance_miles": 0.7
      },
      {
        "name": "Assumption",
        "state": "IL",
        "evidence": "Confirmed",
        "distance_miles": 0.9
      },
      {
        "name": "Speedway",
        "state": "IN",
        "evidence": "Confirmed",
        "distance_miles": 1.4
      },
      {
        "name": "Girard",
        "state": "IL",
        "evidence": "Probable",
        "distance_miles": 1.5
      },
      {
        "name": "White Hall",
        "state": "IL",
        "evidence": "Confirmed",
        "distance_miles": 1.7
      },
      {
        "name": "Sullivan",
        "state": "IL",
        "evidence": "Probable",
        "distance_miles": 1.8
      },
      {
        "name": "Farmer City",
        "state": "IL",
        "evidence": "Confirmed",
        "distance_miles": 2.6
      },
      {
        "name": "Oakland",
        "state": "IL",
        "evidence": "Probable",
        "distance_miles": 2.6
      },
      {
        "name": "Virden",
        "state": "IL",
        "evidence": "Probable",
        "distance_miles": 2.6
      },
      {
        "name": "Buckner",
        "state": "MO",
        "evidence": "Possible",
        "distance_miles": 3.1
      },
      {
        "name": "Blue Springs",
        "state": "MO",
        "evidence": "Possible",
        "distance_miles": 4.7
      },
      {
        "name": "Thayer",
        "state": "IL",
        "evidence": "Probable",
        "distance_miles": 4.8
      },
      {
        "name": "Brownsburg",
        "state": "IN",
        "evidence": "Confirmed",
        "distance_miles": 4.9
      },
      {
        "name": "Sugar Creek",
        "state": "MO",
        "evidence": "Possible",
        "distance_miles": 4.9
      }
    ]
  },
  {
    "from": "Cleveland, OH",
    "to": "Memphis, TN",
    "route_distance_miles": 630.7,
    "danger_score": 0.287,
    "danger_lower_bound": 0.079,
    "danger_upper_bound": 0.718,
    "towns_within_5mi": 25,
    "towns_confirmed": 4,
    "towns_probable": 7,
    "towns_possible": 14,
    "weighted_count": 14.5,
    "nearby_towns": [
      {
        "name": "Shawnee",
        "state": "OH",
        "evidence": "Probable",
        "distance_miles": 0.3
      },
      {
        "name": "Sellersburg",
        "state": "IN",
        "evidence": "Probable",
        "distance_miles": 0.6
      },
      {
        "name": "Brooklyn",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 0.6
      },
      {
        "name": "Aurora",
        "state": "IN",
        "evidence": "Confirmed",
        "distance_miles": 1.0
      },
      {
        "name": "Greendale",
        "state": "IN",
        "evidence": "Probable",
        "distance_miles": 2.1
      },
      {
        "name": "Petersburg",
        "state": "KY",
        "evidence": "Confirmed",
        "distance_miles": 2.1
      },
      {
        "name": "Centertown",
        "state": "KY",
        "evidence": "Probable",
        "distance_miles": 2.2
      },
      {
        "name": "Middletown",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 2.2
      },
      {
        "name": "Parma Heights",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 2.8
      },
      {
        "name": "Newburgh Heights",
        "state": "OH",
        "evidence": "Probable",
        "distance_miles": 3.1
      },
      {
        "name": "Fairborn",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 3.5
      },
      {
        "name": "Clarksville",
        "state": "IN",
        "evidence": "Possible",
        "distance_miles": 3.6
      },
      {
        "name": "Strongsville",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 3.6
      },
      {
        "name": "Kettering",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 3.7
      },
      {
        "name": "Mount Gilead",
        "state": "OH",
        "evidence": "Probable",
        "distance_miles": 3.7
      },
      {
        "name": "Galion",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 3.8
      },
      {
        "name": "Greenhills",
        "state": "OH",
        "evidence": "Probable",
        "distance_miles": 3.8
      },
      {
        "name": "Lakewood",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 3.8
      },
      {
        "name": "Parma",
        "state": "OH",
        "evidence": "Confirmed",
        "distance_miles": 4.0
      },
      {
        "name": "Dillsboro",
        "state": "IN",
        "evidence": "Possible",
        "distance_miles": 4.2
      },
      {
        "name": "Corydon",
        "state": "IN",
        "evidence": "Confirmed",
        "distance_miles": 4.7
      },
      {
        "name": "Galena",
        "state": "IN",
        "evidence": "Possible",
        "distance_miles": 4.8
      },
      {
        "name": "North Olmsted",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 4.9
      },
      {
        "name": "Trenton",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 4.9
      },
      {
        "name": "Bridgetown",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 5.0
      }
    ]
  },
  {
    "from": "Indianapolis, IN",
    "to": "Memphis, TN",
    "route_distance_miles": 385.5,
    "danger_score": 0.259,
    "danger_lower_bound": 0.13,
    "danger_upper_bound": 0.649,
    "towns_within_5mi": 11,
    "towns_confirmed": 4,
    "towns_probable": 4,
    "towns_possible": 3,
    "weighted_count": 8.0,
    "nearby_towns": [
      {
        "name": "Ellettsville",
        "state": "IN",
        "evidence": "Possible",
        "distance_miles": 0.6
      },
      {
        "name": "Brooklyn",
        "state": "IN",
        "evidence": "Possible",
        "distance_miles": 1.0
      },
      {
        "name": "Martinsville",
        "state": "IN",
        "evidence": "Confirmed",
        "distance_miles": 1.1
      },
      {
        "name": "Petersburg",
        "state": "IN",
        "evidence": "Probable",
        "distance_miles": 2.3
      },
      {
        "name": "Odon",
        "state": "IN",
        "evidence": "Probable",
        "distance_miles": 2.4
      },
      {
        "name": "Calvert City",
        "state": "KY",
        "evidence": "Possible",
        "distance_miles": 2.4
      },
      {
        "name": "Mooresville",
        "state": "IN",
        "evidence": "Confirmed",
        "distance_miles": 3.2
      },
      {
        "name": "Cave-in-Rock",
        "state": "IL",
        "evidence": "Confirmed",
        "distance_miles": 3.6
      },
      {
        "name": "Lamb",
        "state": "IL",
        "evidence": "Confirmed",
        "distance_miles": 4.0
      },
      {
        "name": "Stinesville",
        "state": "IN",
        "evidence": "Probable",
        "distance_miles": 4.5
      },
      {
        "name": "Haubstadt",
        "state": "IN",
        "evidence": "Probable",
        "distance_miles": 4.7
      }
    ]
  },
  {
    "from": "Memphis, TN",
    "to": "St. Louis, MO",
    "route_distance_miles": 240.8,
    "danger_score": 0.244,
    "danger_lower_bound": 0.0,
    "danger_upper_bound": 0.61,
    "towns_within_5mi": 8,
    "towns_confirmed": 0,
    "towns_probable": 5,
    "towns_possible": 3,
    "weighted_count": 4.7,
    "nearby_towns": [
      {
        "name": "Monroe County",
        "state": "IL",
        "evidence": "Probable",
        "distance_miles": 0.0
      },
      {
        "name": "Waterloo",
        "state": "IL",
        "evidence": "Possible",
        "distance_miles": 1.5
      },
      {
        "name": "Columbia",
        "state": "IL",
        "evidence": "Probable",
        "distance_miles": 1.6
      },
      {
        "name": "Dupo",
        "state": "IL",
        "evidence": "Probable",
        "distance_miles": 1.6
      },
      {
        "name": "Campbell",
        "state": "MO",
        "evidence": "Possible",
        "distance_miles": 1.6
      },
      {
        "name": "St. Francis",
        "state": "AR",
        "evidence": "Probable",
        "distance_miles": 2.2
      },
      {
        "name": "Senath",
        "state": "MO",
        "evidence": "Possible",
        "distance_miles": 4.0
      },
      {
        "name": "Manila",
        "state": "AR",
        "evidence": "Probable",
        "distance_miles": 4.8
      }
    ]
  },
  {
    "from": "Baltimore, MD",
    "to": "New York, NY",
    "route_distance_miles": 177.6,
    "danger_score": 0.211,
    "danger_lower_bound": 0.0,
    "danger_upper_bound": 0.528,
    "towns_within_5mi": 6,
    "towns_confirmed": 0,
    "towns_probable": 2,
    "towns_possible": 4,
    "weighted_count": 3.0,
    "nearby_towns": [
      {
        "name": "Somerset",
        "state": "NJ",
        "evidence": "Possible",
        "distance_miles": 0.3
      },
      {
        "name": "Clark",
        "state": "NJ",
        "evidence": "Possible",
        "distance_miles": 0.6
      },
      {
        "name": "Hatboro",
        "state": "PA",
        "evidence": "Possible",
        "distance_miles": 1.1
      },
      {
        "name": "Hillside",
        "state": "NJ",
        "evidence": "Possible",
        "distance_miles": 2.2
      },
      {
        "name": "Garwood",
        "state": "NJ",
        "evidence": "Probable",
        "distance_miles": 2.7
      },
      {
        "name": "Carteret",
        "state": "NJ",
        "evidence": "Probable",
        "distance_miles": 4.2
      }
    ]
  },
  {
    "from": "Pittsburgh, PA",
    "to": "Washington, D.C.",
    "route_distance_miles": 191.2,
    "danger_score": 0.209,
    "danger_lower_bound": 0.065,
    "danger_upper_bound": 0.523,
    "towns_within_5mi": 5,
    "towns_confirmed": 1,
    "towns_probable": 2,
    "towns_possible": 2,
    "weighted_count": 3.2,
    "nearby_towns": [
      {
        "name": "Irwin",
        "state": "PA",
        "evidence": "Possible",
        "distance_miles": 2.3
      },
      {
        "name": "Chevy Chase",
        "state": "MD",
        "evidence": "Confirmed",
        "distance_miles": 3.1
      },
      {
        "name": "Millvale",
        "state": "PA",
        "evidence": "Possible",
        "distance_miles": 3.2
      },
      {
        "name": "Mount Rainier",
        "state": "MD",
        "evidence": "Probable",
        "distance_miles": 3.6
      },
      {
        "name": "Brentwood",
        "state": "MD",
        "evidence": "Probable",
        "distance_miles": 4.0
      }
    ]
  },
  {
    "from": "Baltimore, MD",
    "to": "Newark, NJ",
    "route_distance_miles": 162.7,
    "danger_score": 0.207,
    "danger_lower_bound": 0.0,
    "danger_upper_bound": 0.519,
    "towns_within_5mi": 6,
    "towns_confirmed": 0,
    "towns_probable": 1,
    "towns_possible": 5,
    "weighted_count": 2.7,
    "nearby_towns": [
      {
        "name": "Hatboro",
        "state": "PA",
        "evidence": "Possible",
        "distance_miles": 0.0
      },
      {
        "name": "Hillside",
        "state": "NJ",
        "evidence": "Possible",
        "distance_miles": 0.6
      },
      {
        "name": "Clark",
        "state": "NJ",
        "evidence": "Possible",
        "distance_miles": 0.9
      },
      {
        "name": "Somerset",
        "state": "NJ",
        "evidence": "Possible",
        "distance_miles": 1.1
      },
      {
        "name": "Garwood",
        "state": "NJ",
        "evidence": "Probable",
        "distance_miles": 1.2
      },
      {
        "name": "Green Brook",
        "state": "NJ",
        "evidence": "Possible",
        "distance_miles": 3.7
      }
    ]
  },
  {
    "from": "Baltimore, MD",
    "to": "Philadelphia, PA",
    "route_distance_miles": 88.1,
    "danger_score": 0.199,
    "danger_lower_bound": 0.0,
    "danger_upper_bound": 0.496,
    "towns_within_5mi": 2,
    "towns_confirmed": 0,
    "towns_probable": 2,
    "towns_possible": 0,
    "weighted_count": 1.4,
    "nearby_towns": [
      {
        "name": "Folcroft",
        "state": "PA",
        "evidence": "Probable",
        "distance_miles": 1.5
      },
      {
        "name": "Folcroft",
        "state": "PA",
        "evidence": "Probable",
        "distance_miles": 1.5
      }
    ]
  },
  {
    "from": "Birmingham, AL",
    "to": "Cleveland, OH",
    "route_distance_miles": 618.0,
    "danger_score": 0.196,
    "danger_lower_bound": 0.02,
    "danger_upper_bound": 0.49,
    "towns_within_5mi": 16,
    "towns_confirmed": 1,
    "towns_probable": 9,
    "towns_possible": 6,
    "weighted_count": 9.7,
    "nearby_towns": [
      {
        "name": "Jamestown",
        "state": "TN",
        "evidence": "Probable",
        "distance_miles": 0.0
      },
      {
        "name": "Parma Heights",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 0.2
      },
      {
        "name": "Loudonville",
        "state": "OH",
        "evidence": "Probable",
        "distance_miles": 0.3
      },
      {
        "name": "Mount Vernon",
        "state": "KY",
        "evidence": "Probable",
        "distance_miles": 0.4
      },
      {
        "name": "Brooklyn",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 1.2
      },
      {
        "name": "Brunswick",
        "state": "OH",
        "evidence": "Probable",
        "distance_miles": 1.4
      },
      {
        "name": "Parma",
        "state": "OH",
        "evidence": "Confirmed",
        "distance_miles": 1.4
      },
      {
        "name": "Strongsville",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 1.4
      },
      {
        "name": "Oneonta",
        "state": "AL",
        "evidence": "Probable",
        "distance_miles": 2.0
      },
      {
        "name": "Newburgh Heights",
        "state": "OH",
        "evidence": "Probable",
        "distance_miles": 2.5
      },
      {
        "name": "Utica",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 2.5
      },
      {
        "name": "Palmer",
        "state": "TN",
        "evidence": "Probable",
        "distance_miles": 3.0
      },
      {
        "name": "Tracy City",
        "state": "TN",
        "evidence": "Probable",
        "distance_miles": 3.6
      },
      {
        "name": "Burnside",
        "state": "KY",
        "evidence": "Probable",
        "distance_miles": 3.8
      },
      {
        "name": "Seven Hills",
        "state": "OH",
        "evidence": "Possible",
        "distance_miles": 4.1
      },
      {
        "name": "Jeffersonville",
        "state": "KY",
        "evidence": "Possible",
        "distance_miles": 4.4
      }
    ]
  },
  {
    "from": "Birmingham, AL",
    "to": "Indianapolis, IN",
    "route_distance_miles": 434.1,
    "danger_score": 0.173,
    "danger_lower_bound": 0.058,
    "danger_upper_bound": 0.432,
    "towns_within_5mi": 9,
    "towns_confirmed": 2,
    "towns_probable": 4,
    "towns_possible": 3,
    "weighted_count": 6.0,
    "nearby_towns": [
      {
        "name": "Campbellsburg",
        "state": "IN",
        "evidence": "Probable",
        "distance_miles": 0.1
      },
      {
        "name": "Hanceville",
        "state": "AL",
        "evidence": "Probable",
        "distance_miles": 1.1
      },
      {
        "name": "Milltown",
        "state": "IN",
        "evidence": "Probable",
        "distance_miles": 1.2
      },
      {
        "name": "Leavenworth",
        "state": "IN",
        "evidence": "Confirmed",
        "distance_miles": 2.0
      },
      {
        "name": "Marengo",
        "state": "IN",
        "evidence": "Possible",
        "distance_miles": 2.6
      },
      {
        "name": "Greenwood",
        "state": "IN",
        "evidence": "Possible",
        "distance_miles": 3.1
      },
      {
        "name": "Beech Grove",
        "state": "IN",
        "evidence": "Possible",
        "distance_miles": 3.6
      },
      {
        "name": "Morgantown",
        "state": "IN",
        "evidence": "Confirmed",
        "distance_miles": 3.6
      },
      {
        "name": "New Whiteland",
        "state": "IN",
        "evidence": "Probable",
        "distance_miles": 3.8
      }
    ]
  },
  {
    "from": "Kansas City, MO",
    "to": "Memphis, TN",
    "route_distance_miles": 368.1,
    "danger_score": 0.16,
    "danger_lower_bound": 0.0,
    "danger_upper_bound": 0.399,
    "towns_within_5mi": 8,
    "towns_confirmed": 0,
    "towns_probable": 5,
    "towns_possible": 3,
    "weighted_count": 4.7,
    "nearby_towns": [
      {
        "name": "Williford",
        "state": "AR",
        "evidence": "Probable",
        "distance_miles": 0.9
      },
      {
        "name": "Black Rock",
        "state": "AR",
        "evidence": "Probable",
        "distance_miles": 2.6
      },
      {
        "name": "Hardy",
        "state": "AR",
        "evidence": "Probable",
        "distance_miles": 2.7
      },
      {
        "name": "Portia",
        "state": "AR",
        "evidence": "Probable",
        "distance_miles": 3.1
      },
      {
        "name": "Mountain Grove",
        "state": "MO",
        "evidence": "Possible",
        "distance_miles": 3.9
      },
      {
        "name": "Imboden",
        "state": "AR",
        "evidence": "Probable",
        "distance_miles": 4.2
      },
      {
        "name": "Deepwater",
        "state": "MO",
        "evidence": "Possible",
        "distance_miles": 4.6
      },
      {
        "name": "Thayer",
        "state": "MO",
        "evidence": "Possible",
        "distance_miles": 4.6
      }
    ]
  },
  {
    "from": "Philadelphia, PA",
    "to": "Pittsburgh, PA",
    "route_distance_miles": 258.3,
    "danger_score": 0.145,
    "danger_lower_bound": 0.0,
    "danger_upper_bound": 0.363,
    "towns_within_5mi": 6,
    "towns_confirmed": 0,
    "towns_probable": 2,
    "towns_possible": 4,
    "weighted_count": 3.0,
    "nearby_towns": [
      {
        "name": "Johnstown",
        "state": "PA",
        "evidence": "Possible",
        "distance_miles": 0.1
      },
      {
        "name": "Coatesville",
        "state": "PA",
        "evidence": "Possible",
        "distance_miles": 0.3
      },
      {
        "name": "Adams",
        "state": "PA",
        "evidence": "Possible",
        "distance_miles": 1.5
      },
      {
        "name": "Folcroft",
        "state": "PA",
        "evidence": "Probable",
        "distance_miles": 2.2
      },
      {
        "name": "Folcroft",
        "state": "PA",
        "evidence": "Probable",
        "distance_miles": 2.2
      },
      {
        "name": "Millvale",
        "state": "PA",
        "evidence": "Possible",
        "distance_miles": 2.7
      }
    ]
  },
  {
    "from": "Kansas City, MO",
    "to": "St. Louis, MO",
    "route_distance_miles": 238.1,
    "danger_score": 0.136,
    "danger_lower_bound": 0.0,
    "danger_upper_bound": 0.341,
    "towns_within_5mi": 5,
    "towns_confirmed": 0,
    "towns_probable": 2,
    "towns_possible": 3,
    "weighted_count": 2.6,
    "nearby_towns": [
      {
        "name": "Blue Springs",
        "state": "MO",
        "evidence": "Possible",
        "distance_miles": 0.7
      },
      {
        "name": "Creve Coeur",
        "state": "MO",
        "evidence": "Probable",
        "distance_miles": 1.0
      },
      {
        "name": "Concordia",
        "state": "MO",
        "evidence": "Possible",
        "distance_miles": 2.3
      },
      {
        "name": "Hermann",
        "state": "MO",
        "evidence": "Probable",
        "distance_miles": 3.2
      },
      {
        "name": "Shrewsbury",
        "state": "MO",
        "evidence": "Possible",
        "distance_miles": 3.4
      }
    ]
  },
  {
    "from": "Birmingham, AL",
    "to": "St. Louis, MO",
    "route_distance_miles": 400.1,
    "danger_score": 0.131,
    "danger_lower_bound": 0.062,
    "danger_upper_bound": 0.328,
    "towns_within_5mi": 6,
    "towns_confirmed": 2,
    "towns_probable": 2,
    "towns_possible": 2,
    "weighted_count": 4.2,
    "nearby_towns": [
      {
        "name": "Wolf Lake",
        "state": "IL",
        "evidence": "Confirmed",
        "distance_miles": 0.6
      },
      {
        "name": "Elco",
        "state": "IL",
        "evidence": "Confirmed",
        "distance_miles": 2.4
      },
      {
        "name": "Red Bud",
        "state": "IL",
        "evidence": "Probable",
        "distance_miles": 4.2
      },
      {
        "name": "Dupo",
        "state": "IL",
        "evidence": "Probable",
        "distance_miles": 4.7
      },
      {
        "name": "Evansville",
        "state": "IL",
        "evidence": "Possible",
        "distance_miles": 4.7
      },
      {
        "name": "Chester",
        "state": "IL",
        "evidence": "Possible",
        "distance_miles": 4.8
      }
    ]
  },
  {
    "from": "New York, NY",
    "to": "Pittsburgh, PA",
    "route_distance_miles": 320.1,
    "danger_score": 0.109,
    "danger_lower_bound": 0.0,
    "danger_upper_bound": 0.273,
    "towns_within_5mi": 7,
    "towns_confirmed": 0,
    "towns_probable": 0,
    "towns_possible": 7,
    "weighted_count": 2.8,
    "nearby_towns": [
      {
        "name": "Nazareth",
        "state": "PA",
        "evidence": "Possible",
        "distance_miles": 0.2
      },
      {
        "name": "Long Valley",
        "state": "NJ",
        "evidence": "Possible",
        "distance_miles": 0.4
      },
      {
        "name": "Llewellyn Park",
        "state": "NJ",
        "evidence": "Possible",
        "distance_miles": 1.4
      },
      {
        "name": "Millvale",
        "state": "PA",
        "evidence": "Possible",
        "distance_miles": 2.2
      },
      {
        "name": "Clifton",
        "state": "NJ",
        "evidence": "Possible",
        "distance_miles": 3.3
      },
      {
        "name": "Clifton",
        "state": "NJ",
        "evidence": "Possible",
        "distance_miles": 3.3
      },
      {
        "name": "Bellwood",
        "state": "PA",
        "evidence": "Possible",
        "distance_miles": 3.3
      }
    ]
  },
  {
    "from": "Birmingham, AL",
    "to": "Kansas City, MO",
    "route_distance_miles": 577.5,
    "danger_score": 0.093,
    "danger_lower_bound": 0.022,
    "danger_upper_bound": 0.233,
    "towns_within_5mi": 7,
    "towns_confirmed": 1,
    "towns_probable": 3,
    "towns_possible": 3,
    "weighted_count": 4.3,
    "nearby_towns": [
      {
        "name": "Belmont",
        "state": "MS",
        "evidence": "Possible",
        "distance_miles": 0.8
      },
      {
        "name": "Nauvoo",
        "state": "AL",
        "evidence": "Confirmed",
        "distance_miles": 1.2
      },
      {
        "name": "Manila",
        "state": "AR",
        "evidence": "Probable",
        "distance_miles": 1.4
      },
      {
        "name": "Oak Grove Heights",
        "state": "AR",
        "evidence": "Probable",
        "distance_miles": 1.4
      },
      {
        "name": "Warsaw",
        "state": "MO",
        "evidence": "Possible",
        "distance_miles": 3.2
      },
      {
        "name": "Leachville",
        "state": "AR",
        "evidence": "Probable",
        "distance_miles": 3.4
      },
      {
        "name": "Lake Lotawana",
        "state": "MO",
        "evidence": "Possible",
        "distance_miles": 4.3
      }
    ]
  },
  {
    "from": "Newark, NJ",
    "to": "Pittsburgh, PA",
    "route_distance_miles": 307.0,
    "danger_score": 0.077,
    "danger_lower_bound": 0.0,
    "danger_upper_bound": 0.193,
    "towns_within_5mi": 4,
    "towns_confirmed": 0,
    "towns_probable": 1,
    "towns_possible": 3,
    "weighted_count": 1.9,
    "nearby_towns": [
      {
        "name": "Hillside",
        "state": "NJ",
        "evidence": "Possible",
        "distance_miles": 1.4
      },
      {
        "name": "Millvale",
        "state": "PA",
        "evidence": "Possible",
        "distance_miles": 2.3
      },
      {
        "name": "Garwood",
        "state": "NJ",
        "evidence": "Probable",
        "distance_miles": 4.1
      },
      {
        "name": "Allegheny",
        "state": "PA",
        "evidence": "Possible",
        "distance_miles": 4.5
      }
    ]
  },
  {
    "from": "Baltimore, MD",
    "to": "Pittsburgh, PA",
    "route_distance_miles": 196.6,
    "danger_score": 0.076,
    "danger_lower_bound": 0.0,
    "danger_upper_bound": 0.191,
    "towns_within_5mi": 3,
    "towns_confirmed": 0,
    "towns_probable": 0,
    "towns_possible": 3,
    "weighted_count": 1.2,
    "nearby_towns": [
      {
        "name": "Irwin",
        "state": "PA",
        "evidence": "Possible",
        "distance_miles": 1.0
      },
      {
        "name": "Millvale",
        "state": "PA",
        "evidence": "Possible",
        "distance_miles": 3.1
      },
      {
        "name": "Johnston",
        "state": "PA",
        "evidence": "Possible",
        "distance_miles": 5.0
      }
    ]
  },
  {
    "from": "Birmingham, AL",
    "to": "Memphis, TN",
    "route_distance_miles": 216.4,
    "danger_score": 0.0,
    "danger_lower_bound": 0.0,
    "danger_upper_bound": 0.0,
    "towns_within_5mi": 0,
    "towns_confirmed": 0,
    "towns_probable": 0,
    "towns_possible": 0,
    "weighted_count": 0.0,
    "nearby_towns": []
  }
];

// 20 high-danger corridors with counterfactual route analysis
// Model output: does not claim historical actors considered these alternatives
// Safer threshold: max segment danger below 50% of direct route danger
var COUNTERFACTUAL_ROUTES = [
  {
    "from": "Baltimore, MD",
    "to": "Washington, D.C.",
    "direct_danger": 1.0,
    "direct_miles": 34.1,
    "direct_towns": 5,
    "safer_alternative_exists": true,
    "alternatives_found": 13,
    "best_alternative": {
      "type": "1-stop",
      "route": [
        "Baltimore, MD",
        "Memphis, TN",
        "Washington, D.C."
      ],
      "max_segment_danger": 0.059,
      "total_miles": 1555.4,
      "additional_miles": 1521.3,
      "mile_increase_pct": 4461.0,
      "total_towns_encountered": 13,
      "segments": [
        {
          "from": "Baltimore, MD",
          "to": "Memphis, TN",
          "danger": 0.058,
          "miles": 791.7,
          "towns": 7
        },
        {
          "from": "Memphis, TN",
          "to": "Washington, D.C.",
          "danger": 0.059,
          "miles": 763.7,
          "towns": 6
        }
      ]
    },
    "all_alternatives": [
      {
        "type": "1-stop",
        "route": [
          "Baltimore, MD",
          "Memphis, TN",
          "Washington, D.C."
        ],
        "max_segment_danger": 0.059,
        "total_miles": 1555.4,
        "additional_miles": 1521.3,
        "mile_increase_pct": 4461.0,
        "total_towns_encountered": 13,
        "segments": [
          {
            "from": "Baltimore, MD",
            "to": "Memphis, TN",
            "danger": 0.058,
            "miles": 791.7,
            "towns": 7
          },
          {
            "from": "Memphis, TN",
            "to": "Washington, D.C.",
            "danger": 0.059,
            "miles": 763.7,
            "towns": 6
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Baltimore, MD",
          "Birmingham, AL",
          "Washington, D.C."
        ],
        "max_segment_danger": 0.087,
        "total_miles": 1351.7,
        "additional_miles": 1317.6,
        "mile_increase_pct": 3864.0,
        "total_towns_encountered": 11,
        "segments": [
          {
            "from": "Baltimore, MD",
            "to": "Birmingham, AL",
            "danger": 0.061,
            "miles": 691.9,
            "towns": 4
          },
          {
            "from": "Birmingham, AL",
            "to": "Washington, D.C.",
            "danger": 0.087,
            "miles": 659.8,
            "towns": 7
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Baltimore, MD",
          "Atlanta, GA",
          "Washington, D.C."
        ],
        "max_segment_danger": 0.091,
        "total_miles": 1119.1,
        "additional_miles": 1085.0,
        "mile_increase_pct": 3182.0,
        "total_towns_encountered": 11,
        "segments": [
          {
            "from": "Baltimore, MD",
            "to": "Atlanta, GA",
            "danger": 0.091,
            "miles": 576.2,
            "towns": 6
          },
          {
            "from": "Atlanta, GA",
            "to": "Washington, D.C.",
            "danger": 0.067,
            "miles": 542.9,
            "towns": 5
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Baltimore, MD",
          "Indianapolis, IN",
          "Washington, D.C."
        ],
        "max_segment_danger": 0.197,
        "total_miles": 999.7,
        "additional_miles": 965.6,
        "mile_increase_pct": 2832.0,
        "total_towns_encountered": 22,
        "segments": [
          {
            "from": "Baltimore, MD",
            "to": "Indianapolis, IN",
            "danger": 0.197,
            "miles": 508.5,
            "towns": 14
          },
          {
            "from": "Indianapolis, IN",
            "to": "Washington, D.C.",
            "danger": 0.127,
            "miles": 491.2,
            "towns": 8
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Baltimore, MD",
          "Pittsburgh, PA",
          "Washington, D.C."
        ],
        "max_segment_danger": 0.209,
        "total_miles": 387.8,
        "additional_miles": 353.7,
        "mile_increase_pct": 1037.0,
        "total_towns_encountered": 8,
        "segments": [
          {
            "from": "Baltimore, MD",
            "to": "Pittsburgh, PA",
            "danger": 0.076,
            "miles": 196.6,
            "towns": 3
          },
          {
            "from": "Pittsburgh, PA",
            "to": "Washington, D.C.",
            "danger": 0.209,
            "miles": 191.2,
            "towns": 5
          }
        ]
      }
    ],
    "confidence": "Modeled",
    "danger_reduction": 0.941,
    "danger_reduction_pct": 94.0,
    "feasibility": "Theoretically possible but impractical"
  },
  {
    "from": "Cincinnati, OH",
    "to": "Indianapolis, IN",
    "direct_danger": 1.0,
    "direct_miles": 99.2,
    "direct_towns": 17,
    "safer_alternative_exists": true,
    "alternatives_found": 9,
    "best_alternative": {
      "type": "1-stop",
      "route": [
        "Cincinnati, OH",
        "New York, NY",
        "Indianapolis, IN"
      ],
      "max_segment_danger": 0.207,
      "total_miles": 1220.0,
      "additional_miles": 1120.8,
      "mile_increase_pct": 1130.0,
      "total_towns_encountered": 38,
      "segments": [
        {
          "from": "Cincinnati, OH",
          "to": "New York, NY",
          "danger": 0.203,
          "miles": 572.5,
          "towns": 18
        },
        {
          "from": "New York, NY",
          "to": "Indianapolis, IN",
          "danger": 0.207,
          "miles": 647.5,
          "towns": 20
        }
      ]
    },
    "all_alternatives": [
      {
        "type": "1-stop",
        "route": [
          "Cincinnati, OH",
          "New York, NY",
          "Indianapolis, IN"
        ],
        "max_segment_danger": 0.207,
        "total_miles": 1220.0,
        "additional_miles": 1120.8,
        "mile_increase_pct": 1130.0,
        "total_towns_encountered": 38,
        "segments": [
          {
            "from": "Cincinnati, OH",
            "to": "New York, NY",
            "danger": 0.203,
            "miles": 572.5,
            "towns": 18
          },
          {
            "from": "New York, NY",
            "to": "Indianapolis, IN",
            "danger": 0.207,
            "miles": 647.5,
            "towns": 20
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Cincinnati, OH",
          "Baltimore, MD",
          "Indianapolis, IN"
        ],
        "max_segment_danger": 0.24,
        "total_miles": 930.9,
        "additional_miles": 831.7,
        "mile_increase_pct": 838.0,
        "total_towns_encountered": 29,
        "segments": [
          {
            "from": "Cincinnati, OH",
            "to": "Baltimore, MD",
            "danger": 0.24,
            "miles": 422.4,
            "towns": 15
          },
          {
            "from": "Baltimore, MD",
            "to": "Indianapolis, IN",
            "danger": 0.197,
            "miles": 508.5,
            "towns": 14
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Cincinnati, OH",
          "Philadelphia, PA",
          "Indianapolis, IN"
        ],
        "max_segment_danger": 0.247,
        "total_miles": 1082.8,
        "additional_miles": 983.6,
        "mile_increase_pct": 992.0,
        "total_towns_encountered": 34,
        "segments": [
          {
            "from": "Cincinnati, OH",
            "to": "Philadelphia, PA",
            "danger": 0.247,
            "miles": 500.7,
            "towns": 18
          },
          {
            "from": "Philadelphia, PA",
            "to": "Indianapolis, IN",
            "danger": 0.208,
            "miles": 582.1,
            "towns": 16
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Cincinnati, OH",
          "Newark, NJ",
          "Indianapolis, IN"
        ],
        "max_segment_danger": 0.266,
        "total_miles": 1193.1,
        "additional_miles": 1093.9,
        "mile_increase_pct": 1103.0,
        "total_towns_encountered": 39,
        "segments": [
          {
            "from": "Cincinnati, OH",
            "to": "Newark, NJ",
            "danger": 0.266,
            "miles": 558.7,
            "towns": 23
          },
          {
            "from": "Newark, NJ",
            "to": "Indianapolis, IN",
            "danger": 0.185,
            "miles": 634.4,
            "towns": 16
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Cincinnati, OH",
          "Birmingham, AL",
          "Indianapolis, IN"
        ],
        "max_segment_danger": 0.274,
        "total_miles": 840.5,
        "additional_miles": 741.3,
        "mile_increase_pct": 747.0,
        "total_towns_encountered": 26,
        "segments": [
          {
            "from": "Cincinnati, OH",
            "to": "Birmingham, AL",
            "danger": 0.274,
            "miles": 406.4,
            "towns": 17
          },
          {
            "from": "Birmingham, AL",
            "to": "Indianapolis, IN",
            "danger": 0.173,
            "miles": 434.1,
            "towns": 9
          }
        ]
      }
    ],
    "confidence": "Modeled",
    "danger_reduction": 0.793,
    "danger_reduction_pct": 79.0,
    "feasibility": "Theoretically possible but impractical"
  },
  {
    "from": "Indianapolis, IN",
    "to": "St. Louis, MO",
    "direct_danger": 1.0,
    "direct_miles": 230.9,
    "direct_towns": 24,
    "safer_alternative_exists": true,
    "alternatives_found": 10,
    "best_alternative": {
      "type": "1-stop",
      "route": [
        "Indianapolis, IN",
        "Birmingham, AL",
        "St. Louis, MO"
      ],
      "max_segment_danger": 0.173,
      "total_miles": 834.2,
      "additional_miles": 603.3,
      "mile_increase_pct": 261.0,
      "total_towns_encountered": 15,
      "segments": [
        {
          "from": "Indianapolis, IN",
          "to": "Birmingham, AL",
          "danger": 0.173,
          "miles": 434.1,
          "towns": 9
        },
        {
          "from": "Birmingham, AL",
          "to": "St. Louis, MO",
          "danger": 0.131,
          "miles": 400.1,
          "towns": 6
        }
      ]
    },
    "all_alternatives": [
      {
        "type": "1-stop",
        "route": [
          "Indianapolis, IN",
          "Birmingham, AL",
          "St. Louis, MO"
        ],
        "max_segment_danger": 0.173,
        "total_miles": 834.2,
        "additional_miles": 603.3,
        "mile_increase_pct": 261.0,
        "total_towns_encountered": 15,
        "segments": [
          {
            "from": "Indianapolis, IN",
            "to": "Birmingham, AL",
            "danger": 0.173,
            "miles": 434.1,
            "towns": 9
          },
          {
            "from": "Birmingham, AL",
            "to": "St. Louis, MO",
            "danger": 0.131,
            "miles": 400.1,
            "towns": 6
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Indianapolis, IN",
          "New York, NY",
          "St. Louis, MO"
        ],
        "max_segment_danger": 0.212,
        "total_miles": 1524.0,
        "additional_miles": 1293.1,
        "mile_increase_pct": 560.0,
        "total_towns_encountered": 43,
        "segments": [
          {
            "from": "Indianapolis, IN",
            "to": "New York, NY",
            "danger": 0.207,
            "miles": 647.5,
            "towns": 20
          },
          {
            "from": "New York, NY",
            "to": "St. Louis, MO",
            "danger": 0.212,
            "miles": 876.5,
            "towns": 23
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Indianapolis, IN",
          "Newark, NJ",
          "St. Louis, MO"
        ],
        "max_segment_danger": 0.213,
        "total_miles": 1497.4,
        "additional_miles": 1266.5,
        "mile_increase_pct": 549.0,
        "total_towns_encountered": 37,
        "segments": [
          {
            "from": "Indianapolis, IN",
            "to": "Newark, NJ",
            "danger": 0.185,
            "miles": 634.4,
            "towns": 16
          },
          {
            "from": "Newark, NJ",
            "to": "St. Louis, MO",
            "danger": 0.213,
            "miles": 863.0,
            "towns": 21
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Indianapolis, IN",
          "Memphis, TN",
          "St. Louis, MO"
        ],
        "max_segment_danger": 0.259,
        "total_miles": 626.3,
        "additional_miles": 395.4,
        "mile_increase_pct": 171.0,
        "total_towns_encountered": 19,
        "segments": [
          {
            "from": "Indianapolis, IN",
            "to": "Memphis, TN",
            "danger": 0.259,
            "miles": 385.5,
            "towns": 11
          },
          {
            "from": "Memphis, TN",
            "to": "St. Louis, MO",
            "danger": 0.244,
            "miles": 240.8,
            "towns": 8
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Indianapolis, IN",
          "Baltimore, MD",
          "St. Louis, MO"
        ],
        "max_segment_danger": 0.296,
        "total_miles": 1238.5,
        "additional_miles": 1007.6,
        "mile_increase_pct": 436.0,
        "total_towns_encountered": 37,
        "segments": [
          {
            "from": "Indianapolis, IN",
            "to": "Baltimore, MD",
            "danger": 0.197,
            "miles": 508.5,
            "towns": 14
          },
          {
            "from": "Baltimore, MD",
            "to": "St. Louis, MO",
            "danger": 0.296,
            "miles": 730.0,
            "towns": 23
          }
        ]
      }
    ],
    "confidence": "Modeled",
    "danger_reduction": 0.827,
    "danger_reduction_pct": 83.0,
    "feasibility": "Theoretically possible but impractical"
  },
  {
    "from": "Chicago, IL",
    "to": "Indianapolis, IN",
    "direct_danger": 0.883,
    "direct_miles": 161.4,
    "direct_towns": 15,
    "safer_alternative_exists": true,
    "alternatives_found": 10,
    "best_alternative": {
      "type": "1-stop",
      "route": [
        "Chicago, IL",
        "Baltimore, MD",
        "Indianapolis, IN"
      ],
      "max_segment_danger": 0.224,
      "total_miles": 1112.0,
      "additional_miles": 950.6,
      "mile_increase_pct": 589.0,
      "total_towns_encountered": 29,
      "segments": [
        {
          "from": "Chicago, IL",
          "to": "Baltimore, MD",
          "danger": 0.224,
          "miles": 603.5,
          "towns": 15
        },
        {
          "from": "Baltimore, MD",
          "to": "Indianapolis, IN",
          "danger": 0.197,
          "miles": 508.5,
          "towns": 14
        }
      ]
    },
    "all_alternatives": [
      {
        "type": "1-stop",
        "route": [
          "Chicago, IL",
          "Baltimore, MD",
          "Indianapolis, IN"
        ],
        "max_segment_danger": 0.224,
        "total_miles": 1112.0,
        "additional_miles": 950.6,
        "mile_increase_pct": 589.0,
        "total_towns_encountered": 29,
        "segments": [
          {
            "from": "Chicago, IL",
            "to": "Baltimore, MD",
            "danger": 0.224,
            "miles": 603.5,
            "towns": 15
          },
          {
            "from": "Baltimore, MD",
            "to": "Indianapolis, IN",
            "danger": 0.197,
            "miles": 508.5,
            "towns": 14
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Chicago, IL",
          "Newark, NJ",
          "Indianapolis, IN"
        ],
        "max_segment_danger": 0.308,
        "total_miles": 1336.9,
        "additional_miles": 1175.5,
        "mile_increase_pct": 728.0,
        "total_towns_encountered": 48,
        "segments": [
          {
            "from": "Chicago, IL",
            "to": "Newark, NJ",
            "danger": 0.308,
            "miles": 702.5,
            "towns": 32
          },
          {
            "from": "Newark, NJ",
            "to": "Indianapolis, IN",
            "danger": 0.185,
            "miles": 634.4,
            "towns": 16
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Chicago, IL",
          "New York, NY",
          "Indianapolis, IN"
        ],
        "max_segment_danger": 0.31,
        "total_miles": 1361.3,
        "additional_miles": 1199.9,
        "mile_increase_pct": 743.0,
        "total_towns_encountered": 53,
        "segments": [
          {
            "from": "Chicago, IL",
            "to": "New York, NY",
            "danger": 0.31,
            "miles": 713.8,
            "towns": 33
          },
          {
            "from": "New York, NY",
            "to": "Indianapolis, IN",
            "danger": 0.207,
            "miles": 647.5,
            "towns": 20
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Chicago, IL",
          "Atlanta, GA",
          "Indianapolis, IN"
        ],
        "max_segment_danger": 0.333,
        "total_miles": 1012.5,
        "additional_miles": 851.1,
        "mile_increase_pct": 527.0,
        "total_towns_encountered": 44,
        "segments": [
          {
            "from": "Chicago, IL",
            "to": "Atlanta, GA",
            "danger": 0.333,
            "miles": 585.1,
            "towns": 24
          },
          {
            "from": "Atlanta, GA",
            "to": "Indianapolis, IN",
            "danger": 0.33,
            "miles": 427.4,
            "towns": 20
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Chicago, IL",
          "Philadelphia, PA",
          "Indianapolis, IN"
        ],
        "max_segment_danger": 0.339,
        "total_miles": 1246.1,
        "additional_miles": 1084.7,
        "mile_increase_pct": 672.0,
        "total_towns_encountered": 43,
        "segments": [
          {
            "from": "Chicago, IL",
            "to": "Philadelphia, PA",
            "danger": 0.339,
            "miles": 664.0,
            "towns": 27
          },
          {
            "from": "Philadelphia, PA",
            "to": "Indianapolis, IN",
            "danger": 0.208,
            "miles": 582.1,
            "towns": 16
          }
        ]
      }
    ],
    "confidence": "Modeled",
    "danger_reduction": 0.659,
    "danger_reduction_pct": 75.0,
    "feasibility": "Theoretically possible but impractical"
  },
  {
    "from": "Chicago, IL",
    "to": "Cincinnati, OH",
    "direct_danger": 0.845,
    "direct_miles": 249.9,
    "direct_towns": 28,
    "safer_alternative_exists": true,
    "alternatives_found": 7,
    "best_alternative": {
      "type": "1-stop",
      "route": [
        "Chicago, IL",
        "Baltimore, MD",
        "Cincinnati, OH"
      ],
      "max_segment_danger": 0.24,
      "total_miles": 1025.9,
      "additional_miles": 776.0,
      "mile_increase_pct": 311.0,
      "total_towns_encountered": 30,
      "segments": [
        {
          "from": "Chicago, IL",
          "to": "Baltimore, MD",
          "danger": 0.224,
          "miles": 603.5,
          "towns": 15
        },
        {
          "from": "Baltimore, MD",
          "to": "Cincinnati, OH",
          "danger": 0.24,
          "miles": 422.4,
          "towns": 15
        }
      ]
    },
    "all_alternatives": [
      {
        "type": "1-stop",
        "route": [
          "Chicago, IL",
          "Baltimore, MD",
          "Cincinnati, OH"
        ],
        "max_segment_danger": 0.24,
        "total_miles": 1025.9,
        "additional_miles": 776.0,
        "mile_increase_pct": 311.0,
        "total_towns_encountered": 30,
        "segments": [
          {
            "from": "Chicago, IL",
            "to": "Baltimore, MD",
            "danger": 0.224,
            "miles": 603.5,
            "towns": 15
          },
          {
            "from": "Baltimore, MD",
            "to": "Cincinnati, OH",
            "danger": 0.24,
            "miles": 422.4,
            "towns": 15
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Chicago, IL",
          "Newark, NJ",
          "Cincinnati, OH"
        ],
        "max_segment_danger": 0.308,
        "total_miles": 1261.2,
        "additional_miles": 1011.3,
        "mile_increase_pct": 405.0,
        "total_towns_encountered": 55,
        "segments": [
          {
            "from": "Chicago, IL",
            "to": "Newark, NJ",
            "danger": 0.308,
            "miles": 702.5,
            "towns": 32
          },
          {
            "from": "Newark, NJ",
            "to": "Cincinnati, OH",
            "danger": 0.266,
            "miles": 558.7,
            "towns": 23
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Chicago, IL",
          "New York, NY",
          "Cincinnati, OH"
        ],
        "max_segment_danger": 0.31,
        "total_miles": 1286.3,
        "additional_miles": 1036.4,
        "mile_increase_pct": 415.0,
        "total_towns_encountered": 51,
        "segments": [
          {
            "from": "Chicago, IL",
            "to": "New York, NY",
            "danger": 0.31,
            "miles": 713.8,
            "towns": 33
          },
          {
            "from": "New York, NY",
            "to": "Cincinnati, OH",
            "danger": 0.203,
            "miles": 572.5,
            "towns": 18
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Chicago, IL",
          "Philadelphia, PA",
          "Cincinnati, OH"
        ],
        "max_segment_danger": 0.339,
        "total_miles": 1164.7,
        "additional_miles": 914.8,
        "mile_increase_pct": 366.0,
        "total_towns_encountered": 45,
        "segments": [
          {
            "from": "Chicago, IL",
            "to": "Philadelphia, PA",
            "danger": 0.339,
            "miles": 664.0,
            "towns": 27
          },
          {
            "from": "Philadelphia, PA",
            "to": "Cincinnati, OH",
            "danger": 0.247,
            "miles": 500.7,
            "towns": 18
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Chicago, IL",
          "Washington, D.C.",
          "Cincinnati, OH"
        ],
        "max_segment_danger": 0.347,
        "total_miles": 995.7,
        "additional_miles": 745.8,
        "mile_increase_pct": 298.0,
        "total_towns_encountered": 42,
        "segments": [
          {
            "from": "Chicago, IL",
            "to": "Washington, D.C.",
            "danger": 0.347,
            "miles": 593.5,
            "towns": 24
          },
          {
            "from": "Washington, D.C.",
            "to": "Cincinnati, OH",
            "danger": 0.326,
            "miles": 402.2,
            "towns": 18
          }
        ]
      }
    ],
    "confidence": "Modeled",
    "danger_reduction": 0.605,
    "danger_reduction_pct": 72.0,
    "feasibility": "Theoretically possible but impractical"
  },
  {
    "from": "Cincinnati, OH",
    "to": "St. Louis, MO",
    "direct_danger": 0.821,
    "direct_miles": 307.6,
    "direct_towns": 31,
    "safer_alternative_exists": true,
    "alternatives_found": 10,
    "best_alternative": {
      "type": "1-stop",
      "route": [
        "Cincinnati, OH",
        "New York, NY",
        "St. Louis, MO"
      ],
      "max_segment_danger": 0.212,
      "total_miles": 1449.0,
      "additional_miles": 1141.4,
      "mile_increase_pct": 371.0,
      "total_towns_encountered": 41,
      "segments": [
        {
          "from": "Cincinnati, OH",
          "to": "New York, NY",
          "danger": 0.203,
          "miles": 572.5,
          "towns": 18
        },
        {
          "from": "New York, NY",
          "to": "St. Louis, MO",
          "danger": 0.212,
          "miles": 876.5,
          "towns": 23
        }
      ]
    },
    "all_alternatives": [
      {
        "type": "1-stop",
        "route": [
          "Cincinnati, OH",
          "New York, NY",
          "St. Louis, MO"
        ],
        "max_segment_danger": 0.212,
        "total_miles": 1449.0,
        "additional_miles": 1141.4,
        "mile_increase_pct": 371.0,
        "total_towns_encountered": 41,
        "segments": [
          {
            "from": "Cincinnati, OH",
            "to": "New York, NY",
            "danger": 0.203,
            "miles": 572.5,
            "towns": 18
          },
          {
            "from": "New York, NY",
            "to": "St. Louis, MO",
            "danger": 0.212,
            "miles": 876.5,
            "towns": 23
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Cincinnati, OH",
          "Newark, NJ",
          "St. Louis, MO"
        ],
        "max_segment_danger": 0.266,
        "total_miles": 1421.7,
        "additional_miles": 1114.1,
        "mile_increase_pct": 362.0,
        "total_towns_encountered": 44,
        "segments": [
          {
            "from": "Cincinnati, OH",
            "to": "Newark, NJ",
            "danger": 0.266,
            "miles": 558.7,
            "towns": 23
          },
          {
            "from": "Newark, NJ",
            "to": "St. Louis, MO",
            "danger": 0.213,
            "miles": 863.0,
            "towns": 21
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Cincinnati, OH",
          "Birmingham, AL",
          "St. Louis, MO"
        ],
        "max_segment_danger": 0.274,
        "total_miles": 806.5,
        "additional_miles": 498.9,
        "mile_increase_pct": 162.0,
        "total_towns_encountered": 23,
        "segments": [
          {
            "from": "Cincinnati, OH",
            "to": "Birmingham, AL",
            "danger": 0.274,
            "miles": 406.4,
            "towns": 17
          },
          {
            "from": "Birmingham, AL",
            "to": "St. Louis, MO",
            "danger": 0.131,
            "miles": 400.1,
            "towns": 6
          }
        ]
      },
      {
        "type": "2-stop",
        "route": [
          "Cincinnati, OH",
          "Birmingham, AL",
          "Memphis, TN",
          "St. Louis, MO"
        ],
        "max_segment_danger": 0.274,
        "total_miles": 863.6,
        "additional_miles": 556.0,
        "mile_increase_pct": 181.0,
        "total_towns_encountered": 25,
        "segments": [
          {
            "from": "Cincinnati, OH",
            "to": "Birmingham, AL",
            "danger": 0.274,
            "miles": 406.4,
            "towns": 17
          },
          {
            "from": "Birmingham, AL",
            "to": "Memphis, TN",
            "danger": 0.0,
            "miles": 216.4,
            "towns": 0
          },
          {
            "from": "Memphis, TN",
            "to": "St. Louis, MO",
            "danger": 0.244,
            "miles": 240.8,
            "towns": 8
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Cincinnati, OH",
          "Baltimore, MD",
          "St. Louis, MO"
        ],
        "max_segment_danger": 0.296,
        "total_miles": 1152.4,
        "additional_miles": 844.8,
        "mile_increase_pct": 275.0,
        "total_towns_encountered": 38,
        "segments": [
          {
            "from": "Cincinnati, OH",
            "to": "Baltimore, MD",
            "danger": 0.24,
            "miles": 422.4,
            "towns": 15
          },
          {
            "from": "Baltimore, MD",
            "to": "St. Louis, MO",
            "danger": 0.296,
            "miles": 730.0,
            "towns": 23
          }
        ]
      }
    ],
    "confidence": "Modeled",
    "danger_reduction": 0.609,
    "danger_reduction_pct": 74.0,
    "feasibility": "Theoretically possible but impractical"
  },
  {
    "from": "Cleveland, OH",
    "to": "St. Louis, MO",
    "direct_danger": 0.816,
    "direct_miles": 491.5,
    "direct_towns": 51,
    "safer_alternative_exists": true,
    "alternatives_found": 56,
    "best_alternative": {
      "type": "2-stop",
      "route": [
        "Cleveland, OH",
        "Detroit, MI",
        "Atlanta, GA",
        "St. Louis, MO"
      ],
      "max_segment_danger": 0.174,
      "total_miles": 1154.9,
      "additional_miles": 663.4,
      "mile_increase_pct": 135.0,
      "total_towns_encountered": 15,
      "segments": [
        {
          "from": "Cleveland, OH",
          "to": "Detroit, MI",
          "danger": 0.151,
          "miles": 91.1,
          "towns": 2
        },
        {
          "from": "Detroit, MI",
          "to": "Atlanta, GA",
          "danger": 0.08,
          "miles": 597.4,
          "towns": 5
        },
        {
          "from": "Atlanta, GA",
          "to": "St. Louis, MO",
          "danger": 0.174,
          "miles": 466.4,
          "towns": 8
        }
      ]
    },
    "all_alternatives": [
      {
        "type": "2-stop",
        "route": [
          "Cleveland, OH",
          "Detroit, MI",
          "Atlanta, GA",
          "St. Louis, MO"
        ],
        "max_segment_danger": 0.174,
        "total_miles": 1154.9,
        "additional_miles": 663.4,
        "mile_increase_pct": 135.0,
        "total_towns_encountered": 15,
        "segments": [
          {
            "from": "Cleveland, OH",
            "to": "Detroit, MI",
            "danger": 0.151,
            "miles": 91.1,
            "towns": 2
          },
          {
            "from": "Detroit, MI",
            "to": "Atlanta, GA",
            "danger": 0.08,
            "miles": 597.4,
            "towns": 5
          },
          {
            "from": "Atlanta, GA",
            "to": "St. Louis, MO",
            "danger": 0.174,
            "miles": 466.4,
            "towns": 8
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Cleveland, OH",
          "Birmingham, AL",
          "St. Louis, MO"
        ],
        "max_segment_danger": 0.196,
        "total_miles": 1018.1,
        "additional_miles": 526.6,
        "mile_increase_pct": 107.0,
        "total_towns_encountered": 22,
        "segments": [
          {
            "from": "Cleveland, OH",
            "to": "Birmingham, AL",
            "danger": 0.196,
            "miles": 618.0,
            "towns": 16
          },
          {
            "from": "Birmingham, AL",
            "to": "St. Louis, MO",
            "danger": 0.131,
            "miles": 400.1,
            "towns": 6
          }
        ]
      },
      {
        "type": "2-stop",
        "route": [
          "Cleveland, OH",
          "Birmingham, AL",
          "Atlanta, GA",
          "St. Louis, MO"
        ],
        "max_segment_danger": 0.196,
        "total_miles": 1224.1,
        "additional_miles": 732.6,
        "mile_increase_pct": 149.0,
        "total_towns_encountered": 25,
        "segments": [
          {
            "from": "Cleveland, OH",
            "to": "Birmingham, AL",
            "danger": 0.196,
            "miles": 618.0,
            "towns": 16
          },
          {
            "from": "Birmingham, AL",
            "to": "Atlanta, GA",
            "danger": 0.036,
            "miles": 139.7,
            "towns": 1
          },
          {
            "from": "Atlanta, GA",
            "to": "St. Louis, MO",
            "danger": 0.174,
            "miles": 466.4,
            "towns": 8
          }
        ]
      },
      {
        "type": "2-stop",
        "route": [
          "Cleveland, OH",
          "Birmingham, AL",
          "Kansas City, MO",
          "St. Louis, MO"
        ],
        "max_segment_danger": 0.196,
        "total_miles": 1433.6,
        "additional_miles": 942.1,
        "mile_increase_pct": 192.0,
        "total_towns_encountered": 28,
        "segments": [
          {
            "from": "Cleveland, OH",
            "to": "Birmingham, AL",
            "danger": 0.196,
            "miles": 618.0,
            "towns": 16
          },
          {
            "from": "Birmingham, AL",
            "to": "Kansas City, MO",
            "danger": 0.093,
            "miles": 577.5,
            "towns": 7
          },
          {
            "from": "Kansas City, MO",
            "to": "St. Louis, MO",
            "danger": 0.136,
            "miles": 238.1,
            "towns": 5
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Cleveland, OH",
          "New York, NY",
          "St. Louis, MO"
        ],
        "max_segment_danger": 0.212,
        "total_miles": 1282.6,
        "additional_miles": 791.1,
        "mile_increase_pct": 161.0,
        "total_towns_encountered": 34,
        "segments": [
          {
            "from": "Cleveland, OH",
            "to": "New York, NY",
            "danger": 0.154,
            "miles": 406.1,
            "towns": 11
          },
          {
            "from": "New York, NY",
            "to": "St. Louis, MO",
            "danger": 0.212,
            "miles": 876.5,
            "towns": 23
          }
        ]
      }
    ],
    "confidence": "Modeled",
    "danger_reduction": 0.642,
    "danger_reduction_pct": 79.0,
    "feasibility": "Theoretically possible but impractical"
  },
  {
    "from": "Cincinnati, OH",
    "to": "Detroit, MI",
    "direct_danger": 0.741,
    "direct_miles": 236.2,
    "direct_towns": 26,
    "safer_alternative_exists": true,
    "alternatives_found": 7,
    "best_alternative": {
      "type": "1-stop",
      "route": [
        "Cincinnati, OH",
        "New York, NY",
        "Detroit, MI"
      ],
      "max_segment_danger": 0.203,
      "total_miles": 1055.1,
      "additional_miles": 818.9,
      "mile_increase_pct": 347.0,
      "total_towns_encountered": 22,
      "segments": [
        {
          "from": "Cincinnati, OH",
          "to": "New York, NY",
          "danger": 0.203,
          "miles": 572.5,
          "towns": 18
        },
        {
          "from": "New York, NY",
          "to": "Detroit, MI",
          "danger": 0.073,
          "miles": 482.6,
          "towns": 4
        }
      ]
    },
    "all_alternatives": [
      {
        "type": "1-stop",
        "route": [
          "Cincinnati, OH",
          "New York, NY",
          "Detroit, MI"
        ],
        "max_segment_danger": 0.203,
        "total_miles": 1055.1,
        "additional_miles": 818.9,
        "mile_increase_pct": 347.0,
        "total_towns_encountered": 22,
        "segments": [
          {
            "from": "Cincinnati, OH",
            "to": "New York, NY",
            "danger": 0.203,
            "miles": 572.5,
            "towns": 18
          },
          {
            "from": "New York, NY",
            "to": "Detroit, MI",
            "danger": 0.073,
            "miles": 482.6,
            "towns": 4
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Cincinnati, OH",
          "Baltimore, MD",
          "Detroit, MI"
        ],
        "max_segment_danger": 0.24,
        "total_miles": 818.6,
        "additional_miles": 582.4,
        "mile_increase_pct": 247.0,
        "total_towns_encountered": 24,
        "segments": [
          {
            "from": "Cincinnati, OH",
            "to": "Baltimore, MD",
            "danger": 0.24,
            "miles": 422.4,
            "towns": 15
          },
          {
            "from": "Baltimore, MD",
            "to": "Detroit, MI",
            "danger": 0.123,
            "miles": 396.2,
            "towns": 9
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Cincinnati, OH",
          "Philadelphia, PA",
          "Detroit, MI"
        ],
        "max_segment_danger": 0.247,
        "total_miles": 943.6,
        "additional_miles": 707.4,
        "mile_increase_pct": 299.0,
        "total_towns_encountered": 22,
        "segments": [
          {
            "from": "Cincinnati, OH",
            "to": "Philadelphia, PA",
            "danger": 0.247,
            "miles": 500.7,
            "towns": 18
          },
          {
            "from": "Philadelphia, PA",
            "to": "Detroit, MI",
            "danger": 0.079,
            "miles": 442.9,
            "towns": 4
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Cincinnati, OH",
          "Newark, NJ",
          "Detroit, MI"
        ],
        "max_segment_danger": 0.266,
        "total_miles": 1031.1,
        "additional_miles": 794.9,
        "mile_increase_pct": 337.0,
        "total_towns_encountered": 28,
        "segments": [
          {
            "from": "Cincinnati, OH",
            "to": "Newark, NJ",
            "danger": 0.266,
            "miles": 558.7,
            "towns": 23
          },
          {
            "from": "Newark, NJ",
            "to": "Detroit, MI",
            "danger": 0.085,
            "miles": 472.4,
            "towns": 5
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Cincinnati, OH",
          "Birmingham, AL",
          "Detroit, MI"
        ],
        "max_segment_danger": 0.274,
        "total_miles": 1049.0,
        "additional_miles": 812.8,
        "mile_increase_pct": 344.0,
        "total_towns_encountered": 42,
        "segments": [
          {
            "from": "Cincinnati, OH",
            "to": "Birmingham, AL",
            "danger": 0.274,
            "miles": 406.4,
            "towns": 17
          },
          {
            "from": "Birmingham, AL",
            "to": "Detroit, MI",
            "danger": 0.265,
            "miles": 642.6,
            "towns": 25
          }
        ]
      }
    ],
    "confidence": "Modeled",
    "danger_reduction": 0.538,
    "danger_reduction_pct": 73.0,
    "feasibility": "Theoretically possible but impractical"
  },
  {
    "from": "Cincinnati, OH",
    "to": "Cleveland, OH",
    "direct_danger": 0.658,
    "direct_miles": 222.3,
    "direct_towns": 21,
    "safer_alternative_exists": true,
    "alternatives_found": 6,
    "best_alternative": {
      "type": "1-stop",
      "route": [
        "Cincinnati, OH",
        "New York, NY",
        "Cleveland, OH"
      ],
      "max_segment_danger": 0.203,
      "total_miles": 978.6,
      "additional_miles": 756.3,
      "mile_increase_pct": 340.0,
      "total_towns_encountered": 29,
      "segments": [
        {
          "from": "Cincinnati, OH",
          "to": "New York, NY",
          "danger": 0.203,
          "miles": 572.5,
          "towns": 18
        },
        {
          "from": "New York, NY",
          "to": "Cleveland, OH",
          "danger": 0.154,
          "miles": 406.1,
          "towns": 11
        }
      ]
    },
    "all_alternatives": [
      {
        "type": "1-stop",
        "route": [
          "Cincinnati, OH",
          "New York, NY",
          "Cleveland, OH"
        ],
        "max_segment_danger": 0.203,
        "total_miles": 978.6,
        "additional_miles": 756.3,
        "mile_increase_pct": 340.0,
        "total_towns_encountered": 29,
        "segments": [
          {
            "from": "Cincinnati, OH",
            "to": "New York, NY",
            "danger": 0.203,
            "miles": 572.5,
            "towns": 18
          },
          {
            "from": "New York, NY",
            "to": "Cleveland, OH",
            "danger": 0.154,
            "miles": 406.1,
            "towns": 11
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Cincinnati, OH",
          "Baltimore, MD",
          "Cleveland, OH"
        ],
        "max_segment_danger": 0.253,
        "total_miles": 729.1,
        "additional_miles": 506.8,
        "mile_increase_pct": 228.0,
        "total_towns_encountered": 29,
        "segments": [
          {
            "from": "Cincinnati, OH",
            "to": "Baltimore, MD",
            "danger": 0.24,
            "miles": 422.4,
            "towns": 15
          },
          {
            "from": "Baltimore, MD",
            "to": "Cleveland, OH",
            "danger": 0.253,
            "miles": 306.7,
            "towns": 14
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Cincinnati, OH",
          "Philadelphia, PA",
          "Cleveland, OH"
        ],
        "max_segment_danger": 0.262,
        "total_miles": 859.1,
        "additional_miles": 636.8,
        "mile_increase_pct": 286.0,
        "total_towns_encountered": 33,
        "segments": [
          {
            "from": "Cincinnati, OH",
            "to": "Philadelphia, PA",
            "danger": 0.247,
            "miles": 500.7,
            "towns": 18
          },
          {
            "from": "Philadelphia, PA",
            "to": "Cleveland, OH",
            "danger": 0.262,
            "miles": 358.4,
            "towns": 15
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Cincinnati, OH",
          "Newark, NJ",
          "Cleveland, OH"
        ],
        "max_segment_danger": 0.266,
        "total_miles": 953.4,
        "additional_miles": 731.1,
        "mile_increase_pct": 329.0,
        "total_towns_encountered": 37,
        "segments": [
          {
            "from": "Cincinnati, OH",
            "to": "Newark, NJ",
            "danger": 0.266,
            "miles": 558.7,
            "towns": 23
          },
          {
            "from": "Newark, NJ",
            "to": "Cleveland, OH",
            "danger": 0.196,
            "miles": 394.7,
            "towns": 14
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Cincinnati, OH",
          "Birmingham, AL",
          "Cleveland, OH"
        ],
        "max_segment_danger": 0.274,
        "total_miles": 1024.4,
        "additional_miles": 802.1,
        "mile_increase_pct": 361.0,
        "total_towns_encountered": 33,
        "segments": [
          {
            "from": "Cincinnati, OH",
            "to": "Birmingham, AL",
            "danger": 0.274,
            "miles": 406.4,
            "towns": 17
          },
          {
            "from": "Birmingham, AL",
            "to": "Cleveland, OH",
            "danger": 0.196,
            "miles": 618.0,
            "towns": 16
          }
        ]
      }
    ],
    "confidence": "Modeled",
    "danger_reduction": 0.455,
    "danger_reduction_pct": 69.0,
    "feasibility": "Theoretically possible but impractical"
  },
  {
    "from": "Chicago, IL",
    "to": "Memphis, TN",
    "direct_danger": 0.656,
    "direct_miles": 480.3,
    "direct_towns": 33,
    "safer_alternative_exists": true,
    "alternatives_found": 11,
    "best_alternative": {
      "type": "2-stop",
      "route": [
        "Chicago, IL",
        "Detroit, MI",
        "Atlanta, GA",
        "Memphis, TN"
      ],
      "max_segment_danger": 0.131,
      "total_miles": 1171.3,
      "additional_miles": 691.0,
      "mile_increase_pct": 144.0,
      "total_towns_encountered": 10,
      "segments": [
        {
          "from": "Chicago, IL",
          "to": "Detroit, MI",
          "danger": 0.131,
          "miles": 237.7,
          "towns": 4
        },
        {
          "from": "Detroit, MI",
          "to": "Atlanta, GA",
          "danger": 0.08,
          "miles": 597.4,
          "towns": 5
        },
        {
          "from": "Atlanta, GA",
          "to": "Memphis, TN",
          "danger": 0.037,
          "miles": 336.2,
          "towns": 1
        }
      ]
    },
    "all_alternatives": [
      {
        "type": "2-stop",
        "route": [
          "Chicago, IL",
          "Detroit, MI",
          "Atlanta, GA",
          "Memphis, TN"
        ],
        "max_segment_danger": 0.131,
        "total_miles": 1171.3,
        "additional_miles": 691.0,
        "mile_increase_pct": 144.0,
        "total_towns_encountered": 10,
        "segments": [
          {
            "from": "Chicago, IL",
            "to": "Detroit, MI",
            "danger": 0.131,
            "miles": 237.7,
            "towns": 4
          },
          {
            "from": "Detroit, MI",
            "to": "Atlanta, GA",
            "danger": 0.08,
            "miles": 597.4,
            "towns": 5
          },
          {
            "from": "Atlanta, GA",
            "to": "Memphis, TN",
            "danger": 0.037,
            "miles": 336.2,
            "towns": 1
          }
        ]
      },
      {
        "type": "2-stop",
        "route": [
          "Chicago, IL",
          "Detroit, MI",
          "Baltimore, MD",
          "Memphis, TN"
        ],
        "max_segment_danger": 0.131,
        "total_miles": 1425.6,
        "additional_miles": 945.3,
        "mile_increase_pct": 197.0,
        "total_towns_encountered": 20,
        "segments": [
          {
            "from": "Chicago, IL",
            "to": "Detroit, MI",
            "danger": 0.131,
            "miles": 237.7,
            "towns": 4
          },
          {
            "from": "Detroit, MI",
            "to": "Baltimore, MD",
            "danger": 0.123,
            "miles": 396.2,
            "towns": 9
          },
          {
            "from": "Baltimore, MD",
            "to": "Memphis, TN",
            "danger": 0.058,
            "miles": 791.7,
            "towns": 7
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Chicago, IL",
          "Baltimore, MD",
          "Memphis, TN"
        ],
        "max_segment_danger": 0.224,
        "total_miles": 1395.2,
        "additional_miles": 914.9,
        "mile_increase_pct": 190.0,
        "total_towns_encountered": 22,
        "segments": [
          {
            "from": "Chicago, IL",
            "to": "Baltimore, MD",
            "danger": 0.224,
            "miles": 603.5,
            "towns": 15
          },
          {
            "from": "Baltimore, MD",
            "to": "Memphis, TN",
            "danger": 0.058,
            "miles": 791.7,
            "towns": 7
          }
        ]
      },
      {
        "type": "2-stop",
        "route": [
          "Chicago, IL",
          "Detroit, MI",
          "Washington, D.C.",
          "Memphis, TN"
        ],
        "max_segment_danger": 0.225,
        "total_miles": 1396.3,
        "additional_miles": 916.0,
        "mile_increase_pct": 191.0,
        "total_towns_encountered": 24,
        "segments": [
          {
            "from": "Chicago, IL",
            "to": "Detroit, MI",
            "danger": 0.131,
            "miles": 237.7,
            "towns": 4
          },
          {
            "from": "Detroit, MI",
            "to": "Washington, D.C.",
            "danger": 0.225,
            "miles": 394.9,
            "towns": 14
          },
          {
            "from": "Washington, D.C.",
            "to": "Memphis, TN",
            "danger": 0.059,
            "miles": 763.7,
            "towns": 6
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Chicago, IL",
          "Detroit, MI",
          "Memphis, TN"
        ],
        "max_segment_danger": 0.228,
        "total_miles": 861.6,
        "additional_miles": 381.3,
        "mile_increase_pct": 79.0,
        "total_towns_encountered": 22,
        "segments": [
          {
            "from": "Chicago, IL",
            "to": "Detroit, MI",
            "danger": 0.131,
            "miles": 237.7,
            "towns": 4
          },
          {
            "from": "Detroit, MI",
            "to": "Memphis, TN",
            "danger": 0.228,
            "miles": 623.9,
            "towns": 18
          }
        ]
      }
    ],
    "confidence": "Modeled",
    "danger_reduction": 0.525,
    "danger_reduction_pct": 80.0,
    "feasibility": "Theoretically possible but impractical"
  },
  {
    "from": "Chicago, IL",
    "to": "St. Louis, MO",
    "direct_danger": 0.607,
    "direct_miles": 259.5,
    "direct_towns": 18,
    "safer_alternative_exists": true,
    "alternatives_found": 1,
    "best_alternative": {
      "type": "1-stop",
      "route": [
        "Chicago, IL",
        "Baltimore, MD",
        "St. Louis, MO"
      ],
      "max_segment_danger": 0.296,
      "total_miles": 1333.5,
      "additional_miles": 1074.0,
      "mile_increase_pct": 414.0,
      "total_towns_encountered": 38,
      "segments": [
        {
          "from": "Chicago, IL",
          "to": "Baltimore, MD",
          "danger": 0.224,
          "miles": 603.5,
          "towns": 15
        },
        {
          "from": "Baltimore, MD",
          "to": "St. Louis, MO",
          "danger": 0.296,
          "miles": 730.0,
          "towns": 23
        }
      ]
    },
    "all_alternatives": [
      {
        "type": "1-stop",
        "route": [
          "Chicago, IL",
          "Baltimore, MD",
          "St. Louis, MO"
        ],
        "max_segment_danger": 0.296,
        "total_miles": 1333.5,
        "additional_miles": 1074.0,
        "mile_increase_pct": 414.0,
        "total_towns_encountered": 38,
        "segments": [
          {
            "from": "Chicago, IL",
            "to": "Baltimore, MD",
            "danger": 0.224,
            "miles": 603.5,
            "towns": 15
          },
          {
            "from": "Baltimore, MD",
            "to": "St. Louis, MO",
            "danger": 0.296,
            "miles": 730.0,
            "towns": 23
          }
        ]
      }
    ],
    "confidence": "Modeled",
    "danger_reduction": 0.311,
    "danger_reduction_pct": 51.0,
    "feasibility": "Theoretically possible but impractical"
  },
  {
    "from": "Cincinnati, OH",
    "to": "Kansas City, MO",
    "direct_danger": 0.572,
    "direct_miles": 540.2,
    "direct_towns": 37,
    "safer_alternative_exists": true,
    "alternatives_found": 13,
    "best_alternative": {
      "type": "1-stop",
      "route": [
        "Cincinnati, OH",
        "New York, NY",
        "Kansas City, MO"
      ],
      "max_segment_danger": 0.224,
      "total_miles": 1671.1,
      "additional_miles": 1130.9,
      "mile_increase_pct": 209.0,
      "total_towns_encountered": 50,
      "segments": [
        {
          "from": "Cincinnati, OH",
          "to": "New York, NY",
          "danger": 0.203,
          "miles": 572.5,
          "towns": 18
        },
        {
          "from": "New York, NY",
          "to": "Kansas City, MO",
          "danger": 0.224,
          "miles": 1098.6,
          "towns": 32
        }
      ]
    },
    "all_alternatives": [
      {
        "type": "1-stop",
        "route": [
          "Cincinnati, OH",
          "New York, NY",
          "Kansas City, MO"
        ],
        "max_segment_danger": 0.224,
        "total_miles": 1671.1,
        "additional_miles": 1130.9,
        "mile_increase_pct": 209.0,
        "total_towns_encountered": 50,
        "segments": [
          {
            "from": "Cincinnati, OH",
            "to": "New York, NY",
            "danger": 0.203,
            "miles": 572.5,
            "towns": 18
          },
          {
            "from": "New York, NY",
            "to": "Kansas City, MO",
            "danger": 0.224,
            "miles": 1098.6,
            "towns": 32
          }
        ]
      },
      {
        "type": "2-stop",
        "route": [
          "Cincinnati, OH",
          "Baltimore, MD",
          "Memphis, TN",
          "Kansas City, MO"
        ],
        "max_segment_danger": 0.24,
        "total_miles": 1582.2,
        "additional_miles": 1042.0,
        "mile_increase_pct": 193.0,
        "total_towns_encountered": 30,
        "segments": [
          {
            "from": "Cincinnati, OH",
            "to": "Baltimore, MD",
            "danger": 0.24,
            "miles": 422.4,
            "towns": 15
          },
          {
            "from": "Baltimore, MD",
            "to": "Memphis, TN",
            "danger": 0.058,
            "miles": 791.7,
            "towns": 7
          },
          {
            "from": "Memphis, TN",
            "to": "Kansas City, MO",
            "danger": 0.16,
            "miles": 368.1,
            "towns": 8
          }
        ]
      },
      {
        "type": "2-stop",
        "route": [
          "Cincinnati, OH",
          "Baltimore, MD",
          "Philadelphia, PA",
          "Kansas City, MO"
        ],
        "max_segment_danger": 0.24,
        "total_miles": 1545.5,
        "additional_miles": 1005.3,
        "mile_increase_pct": 186.0,
        "total_towns_encountered": 43,
        "segments": [
          {
            "from": "Cincinnati, OH",
            "to": "Baltimore, MD",
            "danger": 0.24,
            "miles": 422.4,
            "towns": 15
          },
          {
            "from": "Baltimore, MD",
            "to": "Philadelphia, PA",
            "danger": 0.199,
            "miles": 88.1,
            "towns": 2
          },
          {
            "from": "Philadelphia, PA",
            "to": "Kansas City, MO",
            "danger": 0.22,
            "miles": 1035.0,
            "towns": 26
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Cincinnati, OH",
          "Philadelphia, PA",
          "Kansas City, MO"
        ],
        "max_segment_danger": 0.247,
        "total_miles": 1535.7,
        "additional_miles": 995.5,
        "mile_increase_pct": 184.0,
        "total_towns_encountered": 44,
        "segments": [
          {
            "from": "Cincinnati, OH",
            "to": "Philadelphia, PA",
            "danger": 0.247,
            "miles": 500.7,
            "towns": 18
          },
          {
            "from": "Philadelphia, PA",
            "to": "Kansas City, MO",
            "danger": 0.22,
            "miles": 1035.0,
            "towns": 26
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Cincinnati, OH",
          "Newark, NJ",
          "Kansas City, MO"
        ],
        "max_segment_danger": 0.266,
        "total_miles": 1644.5,
        "additional_miles": 1104.3,
        "mile_increase_pct": 204.0,
        "total_towns_encountered": 55,
        "segments": [
          {
            "from": "Cincinnati, OH",
            "to": "Newark, NJ",
            "danger": 0.266,
            "miles": 558.7,
            "towns": 23
          },
          {
            "from": "Newark, NJ",
            "to": "Kansas City, MO",
            "danger": 0.223,
            "miles": 1085.8,
            "towns": 32
          }
        ]
      }
    ],
    "confidence": "Modeled",
    "danger_reduction": 0.348,
    "danger_reduction_pct": 61.0,
    "feasibility": "Theoretically possible but impractical"
  },
  {
    "from": "Detroit, MI",
    "to": "St. Louis, MO",
    "direct_danger": 0.572,
    "direct_miles": 454.6,
    "direct_towns": 28,
    "safer_alternative_exists": true,
    "alternatives_found": 18,
    "best_alternative": {
      "type": "2-stop",
      "route": [
        "Detroit, MI",
        "Atlanta, GA",
        "Birmingham, AL",
        "St. Louis, MO"
      ],
      "max_segment_danger": 0.131,
      "total_miles": 1137.2,
      "additional_miles": 682.6,
      "mile_increase_pct": 150.0,
      "total_towns_encountered": 12,
      "segments": [
        {
          "from": "Detroit, MI",
          "to": "Atlanta, GA",
          "danger": 0.08,
          "miles": 597.4,
          "towns": 5
        },
        {
          "from": "Atlanta, GA",
          "to": "Birmingham, AL",
          "danger": 0.036,
          "miles": 139.7,
          "towns": 1
        },
        {
          "from": "Birmingham, AL",
          "to": "St. Louis, MO",
          "danger": 0.131,
          "miles": 400.1,
          "towns": 6
        }
      ]
    },
    "all_alternatives": [
      {
        "type": "2-stop",
        "route": [
          "Detroit, MI",
          "Atlanta, GA",
          "Birmingham, AL",
          "St. Louis, MO"
        ],
        "max_segment_danger": 0.131,
        "total_miles": 1137.2,
        "additional_miles": 682.6,
        "mile_increase_pct": 150.0,
        "total_towns_encountered": 12,
        "segments": [
          {
            "from": "Detroit, MI",
            "to": "Atlanta, GA",
            "danger": 0.08,
            "miles": 597.4,
            "towns": 5
          },
          {
            "from": "Atlanta, GA",
            "to": "Birmingham, AL",
            "danger": 0.036,
            "miles": 139.7,
            "towns": 1
          },
          {
            "from": "Birmingham, AL",
            "to": "St. Louis, MO",
            "danger": 0.131,
            "miles": 400.1,
            "towns": 6
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Detroit, MI",
          "Atlanta, GA",
          "St. Louis, MO"
        ],
        "max_segment_danger": 0.174,
        "total_miles": 1063.8,
        "additional_miles": 609.2,
        "mile_increase_pct": 134.0,
        "total_towns_encountered": 13,
        "segments": [
          {
            "from": "Detroit, MI",
            "to": "Atlanta, GA",
            "danger": 0.08,
            "miles": 597.4,
            "towns": 5
          },
          {
            "from": "Atlanta, GA",
            "to": "St. Louis, MO",
            "danger": 0.174,
            "miles": 466.4,
            "towns": 8
          }
        ]
      },
      {
        "type": "2-stop",
        "route": [
          "Detroit, MI",
          "Cleveland, OH",
          "Birmingham, AL",
          "St. Louis, MO"
        ],
        "max_segment_danger": 0.196,
        "total_miles": 1109.2,
        "additional_miles": 654.6,
        "mile_increase_pct": 144.0,
        "total_towns_encountered": 24,
        "segments": [
          {
            "from": "Detroit, MI",
            "to": "Cleveland, OH",
            "danger": 0.151,
            "miles": 91.1,
            "towns": 2
          },
          {
            "from": "Cleveland, OH",
            "to": "Birmingham, AL",
            "danger": 0.196,
            "miles": 618.0,
            "towns": 16
          },
          {
            "from": "Birmingham, AL",
            "to": "St. Louis, MO",
            "danger": 0.131,
            "miles": 400.1,
            "towns": 6
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Detroit, MI",
          "New York, NY",
          "St. Louis, MO"
        ],
        "max_segment_danger": 0.212,
        "total_miles": 1359.1,
        "additional_miles": 904.5,
        "mile_increase_pct": 199.0,
        "total_towns_encountered": 27,
        "segments": [
          {
            "from": "Detroit, MI",
            "to": "New York, NY",
            "danger": 0.073,
            "miles": 482.6,
            "towns": 4
          },
          {
            "from": "New York, NY",
            "to": "St. Louis, MO",
            "danger": 0.212,
            "miles": 876.5,
            "towns": 23
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Detroit, MI",
          "Newark, NJ",
          "St. Louis, MO"
        ],
        "max_segment_danger": 0.213,
        "total_miles": 1335.4,
        "additional_miles": 880.8,
        "mile_increase_pct": 194.0,
        "total_towns_encountered": 26,
        "segments": [
          {
            "from": "Detroit, MI",
            "to": "Newark, NJ",
            "danger": 0.085,
            "miles": 472.4,
            "towns": 5
          },
          {
            "from": "Newark, NJ",
            "to": "St. Louis, MO",
            "danger": 0.213,
            "miles": 863.0,
            "towns": 21
          }
        ]
      }
    ],
    "confidence": "Modeled",
    "danger_reduction": 0.441,
    "danger_reduction_pct": 77.0,
    "feasibility": "Theoretically possible but impractical"
  },
  {
    "from": "Philadelphia, PA",
    "to": "Washington, D.C.",
    "direct_danger": 0.54,
    "direct_miles": 120.4,
    "direct_towns": 7,
    "safer_alternative_exists": true,
    "alternatives_found": 7,
    "best_alternative": {
      "type": "1-stop",
      "route": [
        "Philadelphia, PA",
        "Memphis, TN",
        "Washington, D.C."
      ],
      "max_segment_danger": 0.059,
      "total_miles": 1641.8,
      "additional_miles": 1521.4,
      "mile_increase_pct": 1264.0,
      "total_towns_encountered": 12,
      "segments": [
        {
          "from": "Philadelphia, PA",
          "to": "Memphis, TN",
          "danger": 0.047,
          "miles": 878.1,
          "towns": 6
        },
        {
          "from": "Memphis, TN",
          "to": "Washington, D.C.",
          "danger": 0.059,
          "miles": 763.7,
          "towns": 6
        }
      ]
    },
    "all_alternatives": [
      {
        "type": "1-stop",
        "route": [
          "Philadelphia, PA",
          "Memphis, TN",
          "Washington, D.C."
        ],
        "max_segment_danger": 0.059,
        "total_miles": 1641.8,
        "additional_miles": 1521.4,
        "mile_increase_pct": 1264.0,
        "total_towns_encountered": 12,
        "segments": [
          {
            "from": "Philadelphia, PA",
            "to": "Memphis, TN",
            "danger": 0.047,
            "miles": 878.1,
            "towns": 6
          },
          {
            "from": "Memphis, TN",
            "to": "Washington, D.C.",
            "danger": 0.059,
            "miles": 763.7,
            "towns": 6
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Philadelphia, PA",
          "Atlanta, GA",
          "Washington, D.C."
        ],
        "max_segment_danger": 0.07,
        "total_miles": 1206.1,
        "additional_miles": 1085.7,
        "mile_increase_pct": 902.0,
        "total_towns_encountered": 12,
        "segments": [
          {
            "from": "Philadelphia, PA",
            "to": "Atlanta, GA",
            "danger": 0.07,
            "miles": 663.2,
            "towns": 7
          },
          {
            "from": "Atlanta, GA",
            "to": "Washington, D.C.",
            "danger": 0.067,
            "miles": 542.9,
            "towns": 5
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Philadelphia, PA",
          "Birmingham, AL",
          "Washington, D.C."
        ],
        "max_segment_danger": 0.135,
        "total_miles": 1439.8,
        "additional_miles": 1319.4,
        "mile_increase_pct": 1096.0,
        "total_towns_encountered": 19,
        "segments": [
          {
            "from": "Philadelphia, PA",
            "to": "Birmingham, AL",
            "danger": 0.135,
            "miles": 780.0,
            "towns": 12
          },
          {
            "from": "Birmingham, AL",
            "to": "Washington, D.C.",
            "danger": 0.087,
            "miles": 659.8,
            "towns": 7
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Philadelphia, PA",
          "Indianapolis, IN",
          "Washington, D.C."
        ],
        "max_segment_danger": 0.208,
        "total_miles": 1073.3,
        "additional_miles": 952.9,
        "mile_increase_pct": 791.0,
        "total_towns_encountered": 24,
        "segments": [
          {
            "from": "Philadelphia, PA",
            "to": "Indianapolis, IN",
            "danger": 0.208,
            "miles": 582.1,
            "towns": 16
          },
          {
            "from": "Indianapolis, IN",
            "to": "Washington, D.C.",
            "danger": 0.127,
            "miles": 491.2,
            "towns": 8
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Philadelphia, PA",
          "Pittsburgh, PA",
          "Washington, D.C."
        ],
        "max_segment_danger": 0.209,
        "total_miles": 449.5,
        "additional_miles": 329.1,
        "mile_increase_pct": 273.0,
        "total_towns_encountered": 11,
        "segments": [
          {
            "from": "Philadelphia, PA",
            "to": "Pittsburgh, PA",
            "danger": 0.145,
            "miles": 258.3,
            "towns": 6
          },
          {
            "from": "Pittsburgh, PA",
            "to": "Washington, D.C.",
            "danger": 0.209,
            "miles": 191.2,
            "towns": 5
          }
        ]
      }
    ],
    "confidence": "Modeled",
    "danger_reduction": 0.481,
    "danger_reduction_pct": 89.0,
    "feasibility": "Theoretically possible but impractical"
  },
  {
    "from": "Cincinnati, OH",
    "to": "Pittsburgh, PA",
    "direct_danger": 0.493,
    "direct_miles": 256.1,
    "direct_towns": 20,
    "safer_alternative_exists": true,
    "alternatives_found": 2,
    "best_alternative": {
      "type": "1-stop",
      "route": [
        "Cincinnati, OH",
        "New York, NY",
        "Pittsburgh, PA"
      ],
      "max_segment_danger": 0.203,
      "total_miles": 892.6,
      "additional_miles": 636.5,
      "mile_increase_pct": 249.0,
      "total_towns_encountered": 25,
      "segments": [
        {
          "from": "Cincinnati, OH",
          "to": "New York, NY",
          "danger": 0.203,
          "miles": 572.5,
          "towns": 18
        },
        {
          "from": "New York, NY",
          "to": "Pittsburgh, PA",
          "danger": 0.109,
          "miles": 320.1,
          "towns": 7
        }
      ]
    },
    "all_alternatives": [
      {
        "type": "1-stop",
        "route": [
          "Cincinnati, OH",
          "New York, NY",
          "Pittsburgh, PA"
        ],
        "max_segment_danger": 0.203,
        "total_miles": 892.6,
        "additional_miles": 636.5,
        "mile_increase_pct": 249.0,
        "total_towns_encountered": 25,
        "segments": [
          {
            "from": "Cincinnati, OH",
            "to": "New York, NY",
            "danger": 0.203,
            "miles": 572.5,
            "towns": 18
          },
          {
            "from": "New York, NY",
            "to": "Pittsburgh, PA",
            "danger": 0.109,
            "miles": 320.1,
            "towns": 7
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Cincinnati, OH",
          "Baltimore, MD",
          "Pittsburgh, PA"
        ],
        "max_segment_danger": 0.24,
        "total_miles": 619.0,
        "additional_miles": 362.9,
        "mile_increase_pct": 142.0,
        "total_towns_encountered": 18,
        "segments": [
          {
            "from": "Cincinnati, OH",
            "to": "Baltimore, MD",
            "danger": 0.24,
            "miles": 422.4,
            "towns": 15
          },
          {
            "from": "Baltimore, MD",
            "to": "Pittsburgh, PA",
            "danger": 0.076,
            "miles": 196.6,
            "towns": 3
          }
        ]
      }
    ],
    "confidence": "Modeled",
    "danger_reduction": 0.29,
    "danger_reduction_pct": 59.0,
    "feasibility": "Theoretically possible but impractical"
  },
  {
    "from": "Detroit, MI",
    "to": "Indianapolis, IN",
    "direct_danger": 0.491,
    "direct_miles": 239.3,
    "direct_towns": 13,
    "safer_alternative_exists": true,
    "alternatives_found": 5,
    "best_alternative": {
      "type": "1-stop",
      "route": [
        "Detroit, MI",
        "Newark, NJ",
        "Indianapolis, IN"
      ],
      "max_segment_danger": 0.185,
      "total_miles": 1106.8,
      "additional_miles": 867.5,
      "mile_increase_pct": 363.0,
      "total_towns_encountered": 21,
      "segments": [
        {
          "from": "Detroit, MI",
          "to": "Newark, NJ",
          "danger": 0.085,
          "miles": 472.4,
          "towns": 5
        },
        {
          "from": "Newark, NJ",
          "to": "Indianapolis, IN",
          "danger": 0.185,
          "miles": 634.4,
          "towns": 16
        }
      ]
    },
    "all_alternatives": [
      {
        "type": "1-stop",
        "route": [
          "Detroit, MI",
          "Newark, NJ",
          "Indianapolis, IN"
        ],
        "max_segment_danger": 0.185,
        "total_miles": 1106.8,
        "additional_miles": 867.5,
        "mile_increase_pct": 363.0,
        "total_towns_encountered": 21,
        "segments": [
          {
            "from": "Detroit, MI",
            "to": "Newark, NJ",
            "danger": 0.085,
            "miles": 472.4,
            "towns": 5
          },
          {
            "from": "Newark, NJ",
            "to": "Indianapolis, IN",
            "danger": 0.185,
            "miles": 634.4,
            "towns": 16
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Detroit, MI",
          "Baltimore, MD",
          "Indianapolis, IN"
        ],
        "max_segment_danger": 0.197,
        "total_miles": 904.7,
        "additional_miles": 665.4,
        "mile_increase_pct": 278.0,
        "total_towns_encountered": 23,
        "segments": [
          {
            "from": "Detroit, MI",
            "to": "Baltimore, MD",
            "danger": 0.123,
            "miles": 396.2,
            "towns": 9
          },
          {
            "from": "Baltimore, MD",
            "to": "Indianapolis, IN",
            "danger": 0.197,
            "miles": 508.5,
            "towns": 14
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Detroit, MI",
          "New York, NY",
          "Indianapolis, IN"
        ],
        "max_segment_danger": 0.207,
        "total_miles": 1130.1,
        "additional_miles": 890.8,
        "mile_increase_pct": 372.0,
        "total_towns_encountered": 24,
        "segments": [
          {
            "from": "Detroit, MI",
            "to": "New York, NY",
            "danger": 0.073,
            "miles": 482.6,
            "towns": 4
          },
          {
            "from": "New York, NY",
            "to": "Indianapolis, IN",
            "danger": 0.207,
            "miles": 647.5,
            "towns": 20
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Detroit, MI",
          "Philadelphia, PA",
          "Indianapolis, IN"
        ],
        "max_segment_danger": 0.208,
        "total_miles": 1025.0,
        "additional_miles": 785.7,
        "mile_increase_pct": 328.0,
        "total_towns_encountered": 20,
        "segments": [
          {
            "from": "Detroit, MI",
            "to": "Philadelphia, PA",
            "danger": 0.079,
            "miles": 442.9,
            "towns": 4
          },
          {
            "from": "Philadelphia, PA",
            "to": "Indianapolis, IN",
            "danger": 0.208,
            "miles": 582.1,
            "towns": 16
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Detroit, MI",
          "Washington, D.C.",
          "Indianapolis, IN"
        ],
        "max_segment_danger": 0.225,
        "total_miles": 886.1,
        "additional_miles": 646.8,
        "mile_increase_pct": 270.0,
        "total_towns_encountered": 22,
        "segments": [
          {
            "from": "Detroit, MI",
            "to": "Washington, D.C.",
            "danger": 0.225,
            "miles": 394.9,
            "towns": 14
          },
          {
            "from": "Washington, D.C.",
            "to": "Indianapolis, IN",
            "danger": 0.127,
            "miles": 491.2,
            "towns": 8
          }
        ]
      }
    ],
    "confidence": "Modeled",
    "danger_reduction": 0.306,
    "danger_reduction_pct": 62.0,
    "feasibility": "Theoretically possible but impractical"
  },
  {
    "from": "Newark, NJ",
    "to": "Philadelphia, PA",
    "direct_danger": 0.488,
    "direct_miles": 76.8,
    "direct_towns": 6,
    "safer_alternative_exists": true,
    "alternatives_found": 8,
    "best_alternative": {
      "type": "1-stop",
      "route": [
        "Newark, NJ",
        "Memphis, TN",
        "Philadelphia, PA"
      ],
      "max_segment_danger": 0.073,
      "total_miles": 1823.6,
      "additional_miles": 1746.8,
      "mile_increase_pct": 2274.0,
      "total_towns_encountered": 16,
      "segments": [
        {
          "from": "Newark, NJ",
          "to": "Memphis, TN",
          "danger": 0.073,
          "miles": 945.5,
          "towns": 10
        },
        {
          "from": "Memphis, TN",
          "to": "Philadelphia, PA",
          "danger": 0.047,
          "miles": 878.1,
          "towns": 6
        }
      ]
    },
    "all_alternatives": [
      {
        "type": "1-stop",
        "route": [
          "Newark, NJ",
          "Memphis, TN",
          "Philadelphia, PA"
        ],
        "max_segment_danger": 0.073,
        "total_miles": 1823.6,
        "additional_miles": 1746.8,
        "mile_increase_pct": 2274.0,
        "total_towns_encountered": 16,
        "segments": [
          {
            "from": "Newark, NJ",
            "to": "Memphis, TN",
            "danger": 0.073,
            "miles": 945.5,
            "towns": 10
          },
          {
            "from": "Memphis, TN",
            "to": "Philadelphia, PA",
            "danger": 0.047,
            "miles": 878.1,
            "towns": 6
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Newark, NJ",
          "Detroit, MI",
          "Philadelphia, PA"
        ],
        "max_segment_danger": 0.085,
        "total_miles": 915.3,
        "additional_miles": 838.5,
        "mile_increase_pct": 1092.0,
        "total_towns_encountered": 9,
        "segments": [
          {
            "from": "Newark, NJ",
            "to": "Detroit, MI",
            "danger": 0.085,
            "miles": 472.4,
            "towns": 5
          },
          {
            "from": "Detroit, MI",
            "to": "Philadelphia, PA",
            "danger": 0.079,
            "miles": 442.9,
            "towns": 4
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Newark, NJ",
          "Atlanta, GA",
          "Philadelphia, PA"
        ],
        "max_segment_danger": 0.1,
        "total_miles": 1402.1,
        "additional_miles": 1325.3,
        "mile_increase_pct": 1726.0,
        "total_towns_encountered": 18,
        "segments": [
          {
            "from": "Newark, NJ",
            "to": "Atlanta, GA",
            "danger": 0.1,
            "miles": 738.9,
            "towns": 11
          },
          {
            "from": "Atlanta, GA",
            "to": "Philadelphia, PA",
            "danger": 0.07,
            "miles": 663.2,
            "towns": 7
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Newark, NJ",
          "Birmingham, AL",
          "Philadelphia, PA"
        ],
        "max_segment_danger": 0.135,
        "total_miles": 1633.9,
        "additional_miles": 1557.1,
        "mile_increase_pct": 2027.0,
        "total_towns_encountered": 22,
        "segments": [
          {
            "from": "Newark, NJ",
            "to": "Birmingham, AL",
            "danger": 0.089,
            "miles": 853.9,
            "towns": 10
          },
          {
            "from": "Birmingham, AL",
            "to": "Philadelphia, PA",
            "danger": 0.135,
            "miles": 780.0,
            "towns": 12
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Newark, NJ",
          "Pittsburgh, PA",
          "Philadelphia, PA"
        ],
        "max_segment_danger": 0.145,
        "total_miles": 565.3,
        "additional_miles": 488.5,
        "mile_increase_pct": 636.0,
        "total_towns_encountered": 10,
        "segments": [
          {
            "from": "Newark, NJ",
            "to": "Pittsburgh, PA",
            "danger": 0.077,
            "miles": 307.0,
            "towns": 4
          },
          {
            "from": "Pittsburgh, PA",
            "to": "Philadelphia, PA",
            "danger": 0.145,
            "miles": 258.3,
            "towns": 6
          }
        ]
      }
    ],
    "confidence": "Modeled",
    "danger_reduction": 0.415,
    "danger_reduction_pct": 85.0,
    "feasibility": "Theoretically possible but impractical"
  },
  {
    "from": "Cleveland, OH",
    "to": "Kansas City, MO",
    "direct_danger": 0.452,
    "direct_miles": 699.9,
    "direct_towns": 43,
    "safer_alternative_exists": true,
    "alternatives_found": 18,
    "best_alternative": {
      "type": "2-stop",
      "route": [
        "Cleveland, OH",
        "Detroit, MI",
        "Atlanta, GA",
        "Kansas City, MO"
      ],
      "max_segment_danger": 0.151,
      "total_miles": 1362.5,
      "additional_miles": 662.6,
      "mile_increase_pct": 95.0,
      "total_towns_encountered": 11,
      "segments": [
        {
          "from": "Cleveland, OH",
          "to": "Detroit, MI",
          "danger": 0.151,
          "miles": 91.1,
          "towns": 2
        },
        {
          "from": "Detroit, MI",
          "to": "Atlanta, GA",
          "danger": 0.08,
          "miles": 597.4,
          "towns": 5
        },
        {
          "from": "Atlanta, GA",
          "to": "Kansas City, MO",
          "danger": 0.03,
          "miles": 674.0,
          "towns": 4
        }
      ]
    },
    "all_alternatives": [
      {
        "type": "2-stop",
        "route": [
          "Cleveland, OH",
          "Detroit, MI",
          "Atlanta, GA",
          "Kansas City, MO"
        ],
        "max_segment_danger": 0.151,
        "total_miles": 1362.5,
        "additional_miles": 662.6,
        "mile_increase_pct": 95.0,
        "total_towns_encountered": 11,
        "segments": [
          {
            "from": "Cleveland, OH",
            "to": "Detroit, MI",
            "danger": 0.151,
            "miles": 91.1,
            "towns": 2
          },
          {
            "from": "Detroit, MI",
            "to": "Atlanta, GA",
            "danger": 0.08,
            "miles": 597.4,
            "towns": 5
          },
          {
            "from": "Atlanta, GA",
            "to": "Kansas City, MO",
            "danger": 0.03,
            "miles": 674.0,
            "towns": 4
          }
        ]
      },
      {
        "type": "2-stop",
        "route": [
          "Cleveland, OH",
          "New York, NY",
          "Atlanta, GA",
          "Kansas City, MO"
        ],
        "max_segment_danger": 0.154,
        "total_miles": 1833.9,
        "additional_miles": 1134.0,
        "mile_increase_pct": 162.0,
        "total_towns_encountered": 28,
        "segments": [
          {
            "from": "Cleveland, OH",
            "to": "New York, NY",
            "danger": 0.154,
            "miles": 406.1,
            "towns": 11
          },
          {
            "from": "New York, NY",
            "to": "Atlanta, GA",
            "danger": 0.116,
            "miles": 753.8,
            "towns": 13
          },
          {
            "from": "Atlanta, GA",
            "to": "Kansas City, MO",
            "danger": 0.03,
            "miles": 674.0,
            "towns": 4
          }
        ]
      },
      {
        "type": "2-stop",
        "route": [
          "Cleveland, OH",
          "New York, NY",
          "Birmingham, AL",
          "Kansas City, MO"
        ],
        "max_segment_danger": 0.154,
        "total_miles": 1852.5,
        "additional_miles": 1152.6,
        "mile_increase_pct": 165.0,
        "total_towns_encountered": 28,
        "segments": [
          {
            "from": "Cleveland, OH",
            "to": "New York, NY",
            "danger": 0.154,
            "miles": 406.1,
            "towns": 11
          },
          {
            "from": "New York, NY",
            "to": "Birmingham, AL",
            "danger": 0.092,
            "miles": 868.9,
            "towns": 10
          },
          {
            "from": "Birmingham, AL",
            "to": "Kansas City, MO",
            "danger": 0.093,
            "miles": 577.5,
            "towns": 7
          }
        ]
      },
      {
        "type": "2-stop",
        "route": [
          "Cleveland, OH",
          "New York, NY",
          "Memphis, TN",
          "Kansas City, MO"
        ],
        "max_segment_danger": 0.16,
        "total_miles": 1734.3,
        "additional_miles": 1034.4,
        "mile_increase_pct": 148.0,
        "total_towns_encountered": 30,
        "segments": [
          {
            "from": "Cleveland, OH",
            "to": "New York, NY",
            "danger": 0.154,
            "miles": 406.1,
            "towns": 11
          },
          {
            "from": "New York, NY",
            "to": "Memphis, TN",
            "danger": 0.077,
            "miles": 960.1,
            "towns": 11
          },
          {
            "from": "Memphis, TN",
            "to": "Kansas City, MO",
            "danger": 0.16,
            "miles": 368.1,
            "towns": 8
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Cleveland, OH",
          "Birmingham, AL",
          "Kansas City, MO"
        ],
        "max_segment_danger": 0.196,
        "total_miles": 1195.5,
        "additional_miles": 495.6,
        "mile_increase_pct": 71.0,
        "total_towns_encountered": 23,
        "segments": [
          {
            "from": "Cleveland, OH",
            "to": "Birmingham, AL",
            "danger": 0.196,
            "miles": 618.0,
            "towns": 16
          },
          {
            "from": "Birmingham, AL",
            "to": "Kansas City, MO",
            "danger": 0.093,
            "miles": 577.5,
            "towns": 7
          }
        ]
      }
    ],
    "confidence": "Modeled",
    "danger_reduction": 0.301,
    "danger_reduction_pct": 67.0,
    "feasibility": "Theoretically possible but impractical"
  },
  {
    "from": "Cleveland, OH",
    "to": "Indianapolis, IN",
    "direct_danger": 0.419,
    "direct_miles": 262.2,
    "direct_towns": 16,
    "safer_alternative_exists": true,
    "alternatives_found": 3,
    "best_alternative": {
      "type": "1-stop",
      "route": [
        "Cleveland, OH",
        "Birmingham, AL",
        "Indianapolis, IN"
      ],
      "max_segment_danger": 0.196,
      "total_miles": 1052.1,
      "additional_miles": 789.9,
      "mile_increase_pct": 301.0,
      "total_towns_encountered": 25,
      "segments": [
        {
          "from": "Cleveland, OH",
          "to": "Birmingham, AL",
          "danger": 0.196,
          "miles": 618.0,
          "towns": 16
        },
        {
          "from": "Birmingham, AL",
          "to": "Indianapolis, IN",
          "danger": 0.173,
          "miles": 434.1,
          "towns": 9
        }
      ]
    },
    "all_alternatives": [
      {
        "type": "1-stop",
        "route": [
          "Cleveland, OH",
          "Birmingham, AL",
          "Indianapolis, IN"
        ],
        "max_segment_danger": 0.196,
        "total_miles": 1052.1,
        "additional_miles": 789.9,
        "mile_increase_pct": 301.0,
        "total_towns_encountered": 25,
        "segments": [
          {
            "from": "Cleveland, OH",
            "to": "Birmingham, AL",
            "danger": 0.196,
            "miles": 618.0,
            "towns": 16
          },
          {
            "from": "Birmingham, AL",
            "to": "Indianapolis, IN",
            "danger": 0.173,
            "miles": 434.1,
            "towns": 9
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Cleveland, OH",
          "Newark, NJ",
          "Indianapolis, IN"
        ],
        "max_segment_danger": 0.196,
        "total_miles": 1029.1,
        "additional_miles": 766.9,
        "mile_increase_pct": 292.0,
        "total_towns_encountered": 30,
        "segments": [
          {
            "from": "Cleveland, OH",
            "to": "Newark, NJ",
            "danger": 0.196,
            "miles": 394.7,
            "towns": 14
          },
          {
            "from": "Newark, NJ",
            "to": "Indianapolis, IN",
            "danger": 0.185,
            "miles": 634.4,
            "towns": 16
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Cleveland, OH",
          "New York, NY",
          "Indianapolis, IN"
        ],
        "max_segment_danger": 0.207,
        "total_miles": 1053.6,
        "additional_miles": 791.4,
        "mile_increase_pct": 302.0,
        "total_towns_encountered": 31,
        "segments": [
          {
            "from": "Cleveland, OH",
            "to": "New York, NY",
            "danger": 0.154,
            "miles": 406.1,
            "towns": 11
          },
          {
            "from": "New York, NY",
            "to": "Indianapolis, IN",
            "danger": 0.207,
            "miles": 647.5,
            "towns": 20
          }
        ]
      }
    ],
    "confidence": "Modeled",
    "danger_reduction": 0.223,
    "danger_reduction_pct": 53.0,
    "feasibility": "Theoretically possible but impractical"
  },
  {
    "from": "Cleveland, OH",
    "to": "Pittsburgh, PA",
    "direct_danger": 0.408,
    "direct_miles": 113.5,
    "direct_towns": 7,
    "safer_alternative_exists": true,
    "alternatives_found": 3,
    "best_alternative": {
      "type": "1-stop",
      "route": [
        "Cleveland, OH",
        "New York, NY",
        "Pittsburgh, PA"
      ],
      "max_segment_danger": 0.154,
      "total_miles": 726.2,
      "additional_miles": 612.7,
      "mile_increase_pct": 540.0,
      "total_towns_encountered": 18,
      "segments": [
        {
          "from": "Cleveland, OH",
          "to": "New York, NY",
          "danger": 0.154,
          "miles": 406.1,
          "towns": 11
        },
        {
          "from": "New York, NY",
          "to": "Pittsburgh, PA",
          "danger": 0.109,
          "miles": 320.1,
          "towns": 7
        }
      ]
    },
    "all_alternatives": [
      {
        "type": "1-stop",
        "route": [
          "Cleveland, OH",
          "New York, NY",
          "Pittsburgh, PA"
        ],
        "max_segment_danger": 0.154,
        "total_miles": 726.2,
        "additional_miles": 612.7,
        "mile_increase_pct": 540.0,
        "total_towns_encountered": 18,
        "segments": [
          {
            "from": "Cleveland, OH",
            "to": "New York, NY",
            "danger": 0.154,
            "miles": 406.1,
            "towns": 11
          },
          {
            "from": "New York, NY",
            "to": "Pittsburgh, PA",
            "danger": 0.109,
            "miles": 320.1,
            "towns": 7
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Cleveland, OH",
          "Birmingham, AL",
          "Pittsburgh, PA"
        ],
        "max_segment_danger": 0.196,
        "total_miles": 1225.4,
        "additional_miles": 1111.9,
        "mile_increase_pct": 980.0,
        "total_towns_encountered": 27,
        "segments": [
          {
            "from": "Cleveland, OH",
            "to": "Birmingham, AL",
            "danger": 0.196,
            "miles": 618.0,
            "towns": 16
          },
          {
            "from": "Birmingham, AL",
            "to": "Pittsburgh, PA",
            "danger": 0.134,
            "miles": 607.4,
            "towns": 11
          }
        ]
      },
      {
        "type": "1-stop",
        "route": [
          "Cleveland, OH",
          "Newark, NJ",
          "Pittsburgh, PA"
        ],
        "max_segment_danger": 0.196,
        "total_miles": 701.7,
        "additional_miles": 588.2,
        "mile_increase_pct": 518.0,
        "total_towns_encountered": 18,
        "segments": [
          {
            "from": "Cleveland, OH",
            "to": "Newark, NJ",
            "danger": 0.196,
            "miles": 394.7,
            "towns": 14
          },
          {
            "from": "Newark, NJ",
            "to": "Pittsburgh, PA",
            "danger": 0.077,
            "miles": 307.0,
            "towns": 4
          }
        ]
      }
    ],
    "confidence": "Modeled",
    "danger_reduction": 0.254,
    "danger_reduction_pct": 62.0,
    "feasibility": "Theoretically possible but impractical"
  }
];

// Counterfactual aggregate summary
var COUNTERFACTUAL_AGGREGATE = {
  "total_high_danger_corridors": 20,
  "safer_alternative_exists_count": 20,
  "no_safer_alternative_count": 0,
  "percent_with_alternatives": 100.0
};
