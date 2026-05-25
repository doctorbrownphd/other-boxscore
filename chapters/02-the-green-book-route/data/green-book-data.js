// =============================================================================
// Green Book Route -- NYPL Data Integration
// =============================================================================
// Source: The Negro Motorist Green Book, 1947 edition
// Digitized by NYPL Schomburg Center for Research in Black Culture
// OCR and geocoding by NYPL Labs. CC0 1.0 Public Domain.
// Source URL: https://github.com/NYPL-publicdomain/greenbooks
//
// Computation: Haversine distance from each ballpark/city coordinate to each
// of the 1,051 geocoded NYPL listings. Two radii: 1 mile (walking distance)
// and 5 miles (short cab ride). Safety score is a weighted composite of
// listing count, hotel availability, and category diversity.
//
// IMPORTANT CAVEAT: The NYPL geocoding pipeline produced coordinates from OCR
// text of a 1947 publication. Some listings geocode to incorrect locations,
// particularly in the Northeast (New York, Philadelphia, Pittsburgh, Newark).
// The OCR also garbled some state names (e.g., "CHICAGO, GEORGIA"). We use
// the geocoded coordinates as-is and document the limitation. The 1-mile and
// 5-mile counts reflect what the NYPL pipeline produced, not a corrected
// dataset. See METHODOLOGY.md for full discussion.
//
// NYPL dataset: 1,051 listings across 20 categories and 23 states
// =============================================================================

// l1 = listings within 1 mile of ballpark/city center
// l5 = listings within 5 miles
// dark = true if l1 === 0 (no walking-distance listings)
// ss = safety score (0--1 composite)

var ROUTES = [
{team:"Kansas City Monarchs",season:1942,stops:[
{dt:"Jul 04",city:"Kansas City",st:"MO",lat:39.0997,lon:-94.5577,opp:"Memphis Red Sox",l1:11,l5:25,dark:false,ss:0.63},
{dt:"Jul 06",city:"Sedalia",st:"MO",lat:38.7045,lon:-93.2283,opp:"Memphis Red Sox",l1:0,l5:0,dark:true,ss:0.00},
{dt:"Jul 07",city:"St. Louis",st:"MO",lat:38.627,lon:-90.1994,opp:"St. Louis Stars",l1:0,l5:26,dark:true,ss:0.49},
{dt:"Jul 09",city:"Springfield",st:"MO",lat:37.209,lon:-93.2923,opp:"Memphis Red Sox",l1:1,l5:1,dark:false,ss:0.03},
{dt:"Jul 10",city:"Tulsa",st:"OK",lat:36.154,lon:-95.9928,opp:"Houston Eagles",l1:0,l5:0,dark:true,ss:0.00},
{dt:"Jul 12",city:"Muskogee",st:"OK",lat:35.7479,lon:-95.3698,opp:"Houston Eagles",l1:0,l5:0,dark:true,ss:0.00},
{dt:"Jul 14",city:"Little Rock",st:"AR",lat:34.7465,lon:-92.2896,opp:"Memphis Red Sox",l1:30,l5:54,dark:false,ss:0.98},
{dt:"Jul 16",city:"Memphis",st:"TN",lat:35.1495,lon:-90.049,opp:"Memphis Red Sox",l1:1,l5:1,dark:false,ss:0.28},
{dt:"Jul 18",city:"Jackson",st:"MS",lat:32.2988,lon:-90.1848,opp:"Birmingham Barons",l1:1,l5:1,dark:false,ss:0.28},
{dt:"Jul 19",city:"Birmingham",st:"AL",lat:33.5186,lon:-86.8104,opp:"Birmingham Barons",l1:0,l5:0,dark:true,ss:0.00},
{dt:"Jul 21",city:"Atlanta",st:"GA",lat:33.749,lon:-84.388,opp:"Atlanta Black Crackers",l1:3,l5:7,dark:false,ss:0.37},
{dt:"Jul 23",city:"Nashville",st:"TN",lat:36.1627,lon:-86.7816,opp:"Memphis Red Sox",l1:0,l5:1,dark:true,ss:0.27},
{dt:"Jul 24",city:"Louisville",st:"KY",lat:38.2527,lon:-85.7585,opp:"Chicago American Giants",l1:7,l5:11,dark:false,ss:0.47},
{dt:"Jul 25",city:"Cincinnati",st:"OH",lat:39.1031,lon:-84.512,opp:"Chicago American Giants",l1:0,l5:0,dark:true,ss:0.00},
{dt:"Jul 26",city:"Indianapolis",st:"IN",lat:39.7684,lon:-86.1581,opp:"Indianapolis Clowns",l1:14,l5:17,dark:false,ss:0.58},
{dt:"Jul 27",city:"Decatur",st:"IL",lat:39.8403,lon:-88.9548,opp:"Chicago American Giants",l1:0,l5:0,dark:true,ss:0.00},
{dt:"Jul 28",city:"Chicago",st:"IL",lat:41.7497,lon:-87.6349,opp:"Chicago American Giants",l1:0,l5:18,dark:true,ss:0.41},
{dt:"Jul 28",city:"Kansas City",st:"MO",lat:39.0997,lon:-94.5577,opp:"Home",l1:11,l5:25,dark:false,ss:0.63}
]},
{team:"Homestead Grays",season:1943,stops:[
{dt:"Aug 02",city:"Pittsburgh",st:"PA",lat:40.4417,lon:-79.9533,opp:"Home",l1:0,l5:0,dark:true,ss:0.00},
{dt:"Aug 03",city:"Wheeling",st:"WV",lat:40.064,lon:-80.7209,opp:"Newark Eagles",l1:0,l5:0,dark:true,ss:0.00},
{dt:"Aug 04",city:"Columbus",st:"OH",lat:39.9612,lon:-82.9988,opp:"Cleveland Buckeyes",l1:0,l5:0,dark:true,ss:0.00},
{dt:"Aug 06",city:"Cincinnati",st:"OH",lat:39.1031,lon:-84.512,opp:"Cleveland Buckeyes",l1:0,l5:0,dark:true,ss:0.00},
{dt:"Aug 08",city:"Louisville",st:"KY",lat:38.2527,lon:-85.7585,opp:"Memphis Red Sox",l1:7,l5:11,dark:false,ss:0.47},
{dt:"Aug 10",city:"Charlotte",st:"NC",lat:35.2271,lon:-80.8431,opp:"Newark Eagles",l1:0,l5:0,dark:true,ss:0.00},
{dt:"Aug 12",city:"Richmond",st:"VA",lat:37.5407,lon:-77.436,opp:"Philadelphia Stars",l1:0,l5:0,dark:true,ss:0.00},
{dt:"Aug 14",city:"Washington",st:"DC",lat:38.9072,lon:-77.0369,opp:"Home",l1:30,l5:48,dark:false,ss:0.95},
{dt:"Aug 16",city:"Baltimore",st:"MD",lat:39.2904,lon:-76.6122,opp:"Baltimore Elite Giants",l1:2,l5:8,dark:false,ss:0.38},
{dt:"Aug 17",city:"Hagerstown",st:"MD",lat:39.6418,lon:-77.72,opp:"Newark Eagles",l1:0,l5:0,dark:true,ss:0.00},
{dt:"Aug 19",city:"Philadelphia",st:"PA",lat:39.9526,lon:-75.1652,opp:"Philadelphia Stars",l1:0,l5:0,dark:true,ss:0.00},
{dt:"Aug 21",city:"Newark",st:"NJ",lat:40.7357,lon:-74.1724,opp:"Newark Eagles",l1:0,l5:0,dark:true,ss:0.00},
{dt:"Aug 22",city:"New York",st:"NY",lat:40.8296,lon:-73.9262,opp:"New York Cubans",l1:0,l5:1,dark:true,ss:0.27},
{dt:"Aug 24",city:"Erie",st:"PA",lat:42.1292,lon:-80.0851,opp:"Cleveland Buckeyes",l1:1,l5:1,dark:false,ss:0.28},
{dt:"Aug 25",city:"Pittsburgh",st:"PA",lat:40.4417,lon:-79.9533,opp:"Home",l1:0,l5:0,dark:true,ss:0.00}
]},
{team:"Pittsburgh Crawfords",season:1936,stops:[
{dt:"Jun 14",city:"Pittsburgh",st:"PA",lat:40.4478,lon:-79.9803,opp:"Home",l1:0,l5:0,dark:true,ss:0.00},
{dt:"Jun 16",city:"Akron",st:"OH",lat:41.0814,lon:-81.519,opp:"Chicago American Giants",l1:0,l5:0,dark:true,ss:0.00},
{dt:"Jun 17",city:"Cleveland",st:"OH",lat:41.4993,lon:-81.6944,opp:"Chicago American Giants",l1:0,l5:0,dark:true,ss:0.00},
{dt:"Jun 19",city:"Toledo",st:"OH",lat:41.6528,lon:-83.5379,opp:"Chicago American Giants",l1:0,l5:0,dark:true,ss:0.00},
{dt:"Jun 20",city:"Detroit",st:"MI",lat:42.3314,lon:-83.0458,opp:"Detroit Stars",l1:4,l5:19,dark:false,ss:0.46},
{dt:"Jun 22",city:"Youngstown",st:"OH",lat:41.0998,lon:-80.6495,opp:"Cleveland Buckeyes",l1:0,l5:0,dark:true,ss:0.00},
{dt:"Jun 24",city:"Cairo",st:"IL",lat:37.0053,lon:-89.1765,opp:"Memphis Red Sox",l1:0,l5:0,dark:true,ss:0.00},
{dt:"Jun 26",city:"Memphis",st:"TN",lat:35.1495,lon:-90.049,opp:"Memphis Red Sox",l1:1,l5:1,dark:false,ss:0.28},
{dt:"Jun 28",city:"Tuscaloosa",st:"AL",lat:33.2098,lon:-87.5692,opp:"Birmingham Barons",l1:0,l5:0,dark:true,ss:0.00},
{dt:"Jun 30",city:"Birmingham",st:"AL",lat:33.5186,lon:-86.8104,opp:"Birmingham Barons",l1:0,l5:0,dark:true,ss:0.00},
{dt:"Jul 02",city:"Quincy",st:"IL",lat:39.9356,lon:-91.4099,opp:"Chicago American Giants",l1:0,l5:0,dark:true,ss:0.00},
{dt:"Jul 03",city:"Pittsburgh",st:"PA",lat:40.4478,lon:-79.9803,opp:"Home",l1:0,l5:0,dark:true,ss:0.00}
]},
{team:"Newark Eagles",season:1946,stops:[
{dt:"Aug 01",city:"Newark",st:"NJ",lat:40.7357,lon:-74.1724,opp:"Home",l1:0,l5:0,dark:true,ss:0.00},
{dt:"Aug 02",city:"New York",st:"NY",lat:40.8296,lon:-73.9262,opp:"New York Cubans",l1:0,l5:1,dark:true,ss:0.27},
{dt:"Aug 04",city:"Philadelphia",st:"PA",lat:39.9526,lon:-75.1652,opp:"Philadelphia Stars",l1:0,l5:0,dark:true,ss:0.00},
{dt:"Aug 06",city:"Baltimore",st:"MD",lat:39.2904,lon:-76.6122,opp:"Baltimore Elite Giants",l1:2,l5:8,dark:false,ss:0.38},
{dt:"Aug 08",city:"Washington",st:"DC",lat:38.9072,lon:-77.0369,opp:"Homestead Grays",l1:30,l5:48,dark:false,ss:0.95},
{dt:"Aug 09",city:"Norfolk",st:"VA",lat:36.8508,lon:-76.2859,opp:"Philadelphia Stars",l1:0,l5:0,dark:true,ss:0.00},
{dt:"Aug 11",city:"Greensboro",st:"NC",lat:36.0726,lon:-79.792,opp:"Philadelphia Stars",l1:0,l5:0,dark:true,ss:0.00},
{dt:"Aug 13",city:"Charlotte",st:"NC",lat:35.2271,lon:-80.8431,opp:"Homestead Grays",l1:0,l5:0,dark:true,ss:0.00},
{dt:"Aug 15",city:"Richmond",st:"VA",lat:37.5407,lon:-77.436,opp:"Homestead Grays",l1:0,l5:0,dark:true,ss:0.00},
{dt:"Aug 17",city:"Pittsburgh",st:"PA",lat:40.4417,lon:-79.9533,opp:"Homestead Grays",l1:0,l5:0,dark:true,ss:0.00},
{dt:"Aug 19",city:"Buffalo",st:"NY",lat:42.8864,lon:-78.8784,opp:"Cleveland Buckeyes",l1:0,l5:0,dark:true,ss:0.00},
{dt:"Aug 20",city:"New York",st:"NY",lat:40.8296,lon:-73.9262,opp:"New York Cubans",l1:0,l5:1,dark:true,ss:0.27},
{dt:"Aug 22",city:"Newark",st:"NJ",lat:40.7357,lon:-74.1724,opp:"Home",l1:0,l5:0,dark:true,ss:0.00}
]},
{team:"Birmingham Black Barons",season:1948,stops:[
{dt:"Jul 02",city:"Birmingham",st:"AL",lat:33.5186,lon:-86.8104,opp:"Home",l1:0,l5:0,dark:true,ss:0.00},
{dt:"Jul 03",city:"Tuscaloosa",st:"AL",lat:33.2098,lon:-87.5692,opp:"Memphis Red Sox",l1:0,l5:0,dark:true,ss:0.00},
{dt:"Jul 04",city:"Jackson",st:"MS",lat:32.2988,lon:-90.1848,opp:"Memphis Red Sox",l1:1,l5:1,dark:false,ss:0.28},
{dt:"Jul 06",city:"Shreveport",st:"LA",lat:32.5252,lon:-93.7502,opp:"Houston Eagles",l1:1,l5:3,dark:false,ss:0.30},
{dt:"Jul 08",city:"New Orleans",st:"LA",lat:29.9511,lon:-90.0715,opp:"Houston Eagles",l1:8,l5:21,dark:false,ss:0.52},
{dt:"Jul 10",city:"Mobile",st:"AL",lat:30.6954,lon:-88.0399,opp:"Houston Eagles",l1:3,l5:4,dark:false,ss:0.33},
{dt:"Jul 12",city:"Macon",st:"GA",lat:32.8407,lon:-83.6324,opp:"Atlanta Black Crackers",l1:6,l5:7,dark:false,ss:0.41},
{dt:"Jul 14",city:"Savannah",st:"GA",lat:32.0809,lon:-81.0912,opp:"Atlanta Black Crackers",l1:1,l5:8,dark:false,ss:0.36},
{dt:"Jul 16",city:"Atlanta",st:"GA",lat:33.749,lon:-84.388,opp:"Atlanta Black Crackers",l1:3,l5:7,dark:false,ss:0.37},
{dt:"Jul 18",city:"Nashville",st:"TN",lat:36.1627,lon:-86.7816,opp:"Memphis Red Sox",l1:0,l5:1,dark:true,ss:0.27},
{dt:"Jul 20",city:"Memphis",st:"TN",lat:35.1495,lon:-90.049,opp:"Memphis Red Sox",l1:1,l5:1,dark:false,ss:0.28},
{dt:"Jul 22",city:"Little Rock",st:"AR",lat:34.7465,lon:-92.2896,opp:"Memphis Red Sox",l1:30,l5:54,dark:false,ss:0.98},
{dt:"Jul 23",city:"Dallas",st:"TX",lat:32.7767,lon:-96.797,opp:"Houston Eagles",l1:0,l5:0,dark:true,ss:0.00},
{dt:"Jul 25",city:"Houston",st:"TX",lat:29.7604,lon:-95.3698,opp:"Houston Eagles",l1:0,l5:0,dark:true,ss:0.00},
{dt:"Jul 27",city:"San Antonio",st:"TX",lat:29.4241,lon:-98.4936,opp:"Houston Eagles",l1:1,l5:1,dark:false,ss:0.28},
{dt:"Jul 30",city:"Birmingham",st:"AL",lat:33.5186,lon:-86.8104,opp:"Home",l1:0,l5:0,dark:true,ss:0.00}
]}
];

var LEAGUE_CITIES = [
{city:"Baltimore",st:"MD",lat:39.2987,lon:-76.5867,games:270,ss:0.3517,l1:0,l5:8,gbySeason:{"1938": 24, "1939": 25, "1940": 25, "1941": 25, "1942": 25, "1943": 25, "1944": 23, "1945": 25, "1946": 24, "1947": 25, "1948": 24}},
{city:"Birmingham",st:"AL",lat:33.5125,lon:-86.8434,games:350,ss:0.0000,l1:0,l5:0,gbySeason:{"1936": 25, "1937": 26, "1938": 27, "1939": 26, "1940": 28, "1941": 27, "1942": 27, "1943": 28, "1944": 26, "1945": 29, "1946": 27, "1947": 27, "1948": 27}},
{city:"Chicago",st:"IL",lat:41.7497,lon:-87.6349,games:363,ss:0.4150,l1:0,l5:18,gbySeason:{"1936": 27, "1937": 27, "1938": 27, "1939": 28, "1940": 28, "1941": 29, "1942": 29, "1943": 29, "1944": 27, "1945": 28, "1946": 28, "1947": 29, "1948": 27}},
{city:"Cleveland",st:"OH",lat:41.5116,lon:-81.6346,games:133,ss:0.0000,l1:0,l5:0,gbySeason:{"1944": 27, "1945": 27, "1946": 25, "1947": 26, "1948": 28}},
{city:"Indianapolis",st:"IN",lat:39.7872,lon:-86.1684,games:163,ss:0.5433,l1:11,l5:17,gbySeason:{"1943": 27, "1944": 28, "1945": 26, "1946": 26, "1947": 28, "1948": 28}},
{city:"Kansas City",st:"MO",lat:39.0997,lon:-94.5577,games:352,ss:0.6300,l1:11,l5:25,gbySeason:{"1936": 26, "1937": 26, "1938": 26, "1939": 26, "1940": 28, "1941": 28, "1942": 28, "1943": 28, "1944": 27, "1945": 27, "1946": 29, "1947": 26, "1948": 27}},
{city:"Memphis",st:"TN",lat:35.1417,lon:-90.03,games:344,ss:0.2683,l1:0,l5:1,gbySeason:{"1936": 26, "1937": 25, "1938": 25, "1939": 26, "1940": 27, "1941": 27, "1942": 27, "1943": 26, "1944": 28, "1945": 26, "1946": 28, "1947": 27, "1948": 26}},
{city:"New York",st:"NY",lat:40.8267,lon:-73.9281,games:626,ss:0.2683,l1:0,l5:1,gbySeason:{"1936": 47, "1937": 47, "1938": 48, "1939": 46, "1940": 47, "1941": 49, "1942": 49, "1943": 48, "1944": 49, "1945": 49, "1946": 50, "1947": 49, "1948": 48}},
{city:"Newark",st:"NJ",lat:40.7128,lon:-74.1594,games:285,ss:0.0000,l1:0,l5:0,gbySeason:{"1936": 24, "1937": 22, "1938": 23, "1939": 25, "1940": 24, "1941": 23, "1942": 23, "1943": 24, "1944": 25, "1945": 24, "1946": 24, "1947": 24}},
{city:"Philadelphia",st:"PA",lat:39.971,lon:-75.2139,games:308,ss:0.0000,l1:0,l5:0,gbySeason:{"1936": 24, "1937": 24, "1938": 24, "1939": 25, "1940": 24, "1941": 23, "1942": 23, "1943": 24, "1944": 24, "1945": 24, "1946": 23, "1947": 22, "1948": 24}},
{city:"Pittsburgh",st:"PA",lat:40.4417,lon:-79.9533,games:253,ss:0.0000,l1:0,l5:0,gbySeason:{"1936": 47, "1937": 49, "1938": 48, "1939": 24, "1940": 7, "1941": 10, "1942": 11, "1943": 8, "1944": 11, "1945": 9, "1946": 9, "1947": 12, "1948": 8}},
{city:"St. Louis",st:"MO",lat:38.6339,lon:-90.231,games:105,ss:0.5300,l1:4,l5:23,gbySeason:{"1936": 27, "1937": 27, "1938": 26, "1939": 25}},
{city:"Washington",st:"DC",lat:38.9218,lon:-77.0158,games:134,ss:0.8467,l1:24,l5:47,gbySeason:{"1940": 18, "1941": 15, "1942": 14, "1943": 16, "1944": 13, "1945": 14, "1946": 15, "1947": 13, "1948": 16}}
];

var HEATMAP_DATA = [
{region:"Deep South",season:1936,ss:0.1342,games:51,darkCities:2,totalCities:2},
{region:"Midwest",season:1936,ss:0.5233,games:80,darkCities:1,totalCities:3},
{region:"Northeast",season:1936,ss:0.0671,games:142,darkCities:4,totalCities:4},
{region:"Deep South",season:1937,ss:0.1342,games:51,darkCities:2,totalCities:2},
{region:"Midwest",season:1937,ss:0.5233,games:80,darkCities:1,totalCities:3},
{region:"Northeast",season:1937,ss:0.0671,games:142,darkCities:4,totalCities:4},
{region:"Deep South",season:1938,ss:0.1342,games:52,darkCities:2,totalCities:2},
{region:"Midwest",season:1938,ss:0.5233,games:79,darkCities:1,totalCities:3},
{region:"Northeast",season:1938,ss:0.1238,games:167,darkCities:5,totalCities:5},
{region:"Deep South",season:1939,ss:0.1342,games:52,darkCities:2,totalCities:2},
{region:"Midwest",season:1939,ss:0.5233,games:79,darkCities:1,totalCities:3},
{region:"Northeast",season:1939,ss:0.1238,games:145,darkCities:5,totalCities:5},
{region:"Deep South",season:1940,ss:0.1342,games:55,darkCities:2,totalCities:2},
{region:"Mid-Atlantic",season:1940,ss:0.8467,games:18,darkCities:0,totalCities:1},
{region:"Midwest",season:1940,ss:0.5225,games:56,darkCities:1,totalCities:2},
{region:"Northeast",season:1940,ss:0.1238,games:127,darkCities:5,totalCities:5},
{region:"Deep South",season:1941,ss:0.1342,games:54,darkCities:2,totalCities:2},
{region:"Mid-Atlantic",season:1941,ss:0.8467,games:15,darkCities:0,totalCities:1},
{region:"Midwest",season:1941,ss:0.5225,games:57,darkCities:1,totalCities:2},
{region:"Northeast",season:1941,ss:0.1238,games:130,darkCities:5,totalCities:5},
{region:"Deep South",season:1942,ss:0.1342,games:54,darkCities:2,totalCities:2},
{region:"Mid-Atlantic",season:1942,ss:0.8467,games:14,darkCities:0,totalCities:1},
{region:"Midwest",season:1942,ss:0.5225,games:57,darkCities:1,totalCities:2},
{region:"Northeast",season:1942,ss:0.1238,games:131,darkCities:5,totalCities:5},
{region:"Deep South",season:1943,ss:0.1342,games:54,darkCities:2,totalCities:2},
{region:"Mid-Atlantic",season:1943,ss:0.8467,games:16,darkCities:0,totalCities:1},
{region:"Midwest",season:1943,ss:0.5253,games:84,darkCities:1,totalCities:3},
{region:"Northeast",season:1943,ss:0.1238,games:129,darkCities:5,totalCities:5},
{region:"Deep South",season:1944,ss:0.1342,games:54,darkCities:2,totalCities:2},
{region:"Mid-Atlantic",season:1944,ss:0.8467,games:13,darkCities:0,totalCities:1},
{region:"Midwest",season:1944,ss:0.3958,games:109,darkCities:2,totalCities:4},
{region:"Northeast",season:1944,ss:0.1238,games:132,darkCities:5,totalCities:5},
{region:"Deep South",season:1945,ss:0.1342,games:55,darkCities:2,totalCities:2},
{region:"Mid-Atlantic",season:1945,ss:0.8467,games:14,darkCities:0,totalCities:1},
{region:"Midwest",season:1945,ss:0.3958,games:108,darkCities:2,totalCities:4},
{region:"Northeast",season:1945,ss:0.1238,games:131,darkCities:5,totalCities:5},
{region:"Deep South",season:1946,ss:0.1342,games:55,darkCities:2,totalCities:2},
{region:"Mid-Atlantic",season:1946,ss:0.8467,games:15,darkCities:0,totalCities:1},
{region:"Midwest",season:1946,ss:0.3958,games:108,darkCities:2,totalCities:4},
{region:"Northeast",season:1946,ss:0.1238,games:130,darkCities:5,totalCities:5},
{region:"Deep South",season:1947,ss:0.1342,games:54,darkCities:2,totalCities:2},
{region:"Mid-Atlantic",season:1947,ss:0.8467,games:13,darkCities:0,totalCities:1},
{region:"Midwest",season:1947,ss:0.3958,games:109,darkCities:2,totalCities:4},
{region:"Northeast",season:1947,ss:0.1238,games:132,darkCities:5,totalCities:5},
{region:"Deep South",season:1948,ss:0.1342,games:53,darkCities:2,totalCities:2},
{region:"Mid-Atlantic",season:1948,ss:0.8467,games:16,darkCities:0,totalCities:1},
{region:"Midwest",season:1948,ss:0.3958,games:110,darkCities:2,totalCities:4},
{region:"Northeast",season:1948,ss:0.1547,games:104,darkCities:4,totalCities:4}
];

// NYPL dataset metadata for display
var GB_META = {
  totalListings: 1051,
  categories: 20,
  statesCovered: 23,
  editionYear: 1947,
  source: "NYPL Schomburg Center for Research in Black Culture, CC0 1.0",
  sourceUrl: "https://github.com/NYPL-publicdomain/greenbooks"
};
