# Data Access Report
## Chapters 05, 09, and 14: Data Availability and Access Pathways

**Prepared:** May 24, 2026
**Status:** Research complete, no data downloaded
**Purpose:** Catalog what exists, where it lives, and how to get it

---

## Chapter 05: The Winter Map
### Multi-League Roster Data for Name Resolution

The Ch 05 name resolution model needs roster data from multiple leagues to match the same player across different spellings and leagues. The centerpiece map requires player-season-city granularity across Cuban, Mexican, Puerto Rican, Venezuelan, and Dominican leagues.

### Source 1: Seamheads Negro Leagues Database

**URL:** https://www.seamheads.com/NegroLgs/
**Access:** Free, web-based. No API. Contact gary@seamheads.com for bulk data requests.
**Coverage:** 1886-1948 (US leagues), Cuban League (1899/1900-1927/28), Mexican League (1940s)

**What it has:**
- Cross-league coverage is explicitly part of their mission. Their homepage states: "As Black American players often played in Latin American leagues, and Black players from Latin America played in the Negro leagues in the U.S., we cover Cuban and Mexican baseball of the era, and plan to cover Puerto Rico, the Dominican Republic, and Venezuela in the future."
- Cuban League seasons from 1899/1900 through 1927/28 are included.
- Mexican League data from the 1940s is included.
- Player pages show cross-league appearances. Monte Irvin's page, for example, shows his 1942 season with Azules de Veracruz (Mexican League), with full batting stats (.397 BA, .563 wOBA, 287 PA).
- Season-by-season batting stats include: Year, Team, League, Age, Position, G, PA, AB, R, H, 2B, 3B, HR, RBI, SB, CS, BB, K, IBB, HBP, SH, SF, DP, BA, OBP, SLG, OPS, OPS+, wOBA, BB%, K%, BB/K, HR%, ISO.
- Database built from game-level box scores, newspaper articles, and scoresheets.

**What it does not have (yet):**
- Puerto Rican Winter League data (planned but not yet built)
- Venezuelan League data (planned but not yet built)
- Dominican League data (planned but not yet built)
- No public API or data export mechanism

**Assessment for Ch 05:** Seamheads is the primary source for Cuban and Mexican cross-league data. The Cuban data gap (coverage ends at 1927/28) is a problem: the Cuban League's golden age of integrated play extended through the 1950s, and the 1920s-1940s are the core years for the chapter. The Mexican League data (1940s) aligns well with the chapter's needs. Puerto Rican, Venezuelan, and Dominican data will need to come from other sources or from direct collaboration with the Seamheads team.

**Action required:** Contact Gary Ashwill (gary@seamheads.com) to ask about: (1) the timeline for Puerto Rican and Venezuelan data, (2) whether bulk data access is available for research purposes, (3) whether additional Cuban data beyond 1927/28 exists in their pipeline.

---

### Source 2: Baseball Reference Register

**URL:** https://www.baseball-reference.com/register/
**Access:** Free web access. 403 errors on programmatic fetches, indicating bot protection. Manual access required.

**What it has:**
- League index pages for Cuban Winter League (code: CuWL) and Mexican League (code: MxL).
- Individual player pages with cross-league career data.
- The register format includes foreign league appearances.

**What it does not have:**
- Could not confirm date ranges or roster completeness due to 403 blocks on automated access.
- No bulk export or API.

**Assessment for Ch 05:** Useful as a secondary cross-reference for verification, not as a primary data extraction source. Manual research required.

---

### Source 3: Wikipedia League Articles (Background, Not Data)

Wikipedia articles on the relevant leagues provide context but no structured data.

**Cuban League (1878-1961):** Integrated in 1900. Key Negro Leagues players documented as playing in Cuba: Satchel Paige, Cool Papa Bell, Oscar Charleston, John Henry Lloyd, Josh Gibson, Ray Brown, Willie Wells. The 1920s were the peak era of integrated play. No digitized roster databases referenced.

**Mexican Baseball League (1930s-1940s):** Martin Dihigo, Lazaro Salazar, and other Cuban players documented. The 1946 Jorge Pasquel recruitment campaign brought 22 MLB players plus additional Negro Leagues stars. No roster databases referenced.

**Puerto Rican Winter League (est. 1938):** Satchel Paige (1940 MVP), Josh Gibson (batting titles in early 1940s), Emilio Navarro documented. Wikipedia notes: "Players of the Negro leagues preferred it due to lack of racism towards the players." No roster databases referenced.

**Venezuelan League (est. 1945/46):** Roy Campanella, Sam Jethroe, Satchel Paige, Martin Dihigo documented. League formally established December 27, 1945. No roster databases referenced.

---

### Source 4: SABR BioProject

**URL:** https://sabr.org/bioproj
**Access:** Free. Individual biographical articles.

**What it has:** Individual player biographies that often include cross-league career details. Useful for building the anchor player profiles and validating name resolution against known cases.

**What it does not have:** No structured data. No bulk access. Each biography is a narrative article.

---

### Source 5: Center for Negro League Baseball Research (CNLBR)

**URL:** https://cnlbr.org/
**Access:** Nonprofit research organization, Carrollton, TX. Phone: 469-951-8156.

**What it has:** Research library, player interviews documenting full playing careers (including winter league play), historical artifacts. Their mission explicitly includes "Locating and interviewing former Negro League baseball players to document their entire playing careers."

**What it does not have:** No visible structured database or digital data access. Focused on artifacts and oral history.

**Assessment for Ch 05:** Potentially valuable for verifying cross-league career paths, especially for less-documented players. Worth contacting for research collaboration.

---

### Ch 05 Data Gap Summary

| League | Best Source | Coverage | Gap |
|--------|-----------|----------|-----|
| Cuban Winter League | Seamheads | 1899/1900-1927/28 | Missing 1928-1961 (the richest integrated era) |
| Mexican League | Seamheads | 1940s | Missing 1930s |
| Puerto Rican Winter League | None structured | N/A | No structured digital source identified |
| Venezuelan League | None structured | N/A | No structured digital source identified |
| Dominican League (1937) | Secondary sources | 1937 season only | Well-documented single season, but scattered across secondary sources |

**Critical blocker:** Puerto Rican and Venezuelan roster data have no identified structured digital source. The chapter spec acknowledges this ("If a league's data is too sparse to support honest visualization, it is excluded from the centerpiece and noted in METHODOLOGY.md"). Elias needs to make the inclusion/exclusion call based on what Seamheads has in pipeline.

**Path forward:** The strongest data path is through direct collaboration with the Seamheads team. They are the only organization actively building cross-league structured data. Secondary paths include manual extraction from SABR biographies and academic sources.

---

## Chapter 09: The Last Team
### Season-Level WAR and Owner/Manager Data

The Ch 09 survival analysis needs: (1) season-by-season WAR for Negro Leagues players (for the forfeited WAR calculation), (2) MLB franchise ownership history 1947-1959, (3) MLB manager history 1947-1959.

### WAR Data

#### Seamheads WAR

**URL:** https://www.seamheads.com/NegroLgs/
**Access:** Free, web-based.

**What it has:**
- The homepage explicitly lists "Baseball Gauge Wins Above Replacement (gWAR)" as an available metric, with options for Careers, Seasons, and per-162-game views.
- The season-by-season batting pages exist (confirmed for Monte Irvin, 1938-1948, with full stat lines per season).
- WAR leader pages exist, organized by careers and seasons.

**What is uncertain:**
- Individual player season pages show extensive batting/pitching stats but WAR was not visible in the batting season tables I could access. The WAR data may live on separate WAR-specific pages (the navigation references a "Wins Above Replacement" section).
- The WAR leader pages returned 404 errors on the specific URL patterns attempted, suggesting the URL structure may have changed or requires specific parameters.

**Assessment for Ch 09:** Seamheads is the primary source. The Ch 09 spec explicitly states "Seamheads Negro Leagues Database integrated record. Per player-season WAR for every documented Negro Leagues player." This confirms the data exists. Access pathway needs manual investigation or contact with Seamheads.

#### Baseball Reference Negro Leagues

**URL:** https://www.baseball-reference.com/negro-leagues/
**Access:** Free web access, bot-protected.

**Assessment:** Could not confirm season-level WAR availability due to 403 blocks. The Ch 05 spec (The Other Box Score) lists "Baseball Reference Negro Leagues integration" as a data source for "Integrated database. All career and season leaders." Baseball Reference incorporated Negro Leagues stats into their main database following the May 2024 MLB integration. Season-level WAR should be available on individual player pages.

#### FanGraphs

**URL:** https://www.fangraphs.com/
**Access:** Free for basic, registered user for extended queries.

**What was found:**
- The league dropdown includes "Negro American League" and "Negro National League II" as selectable options.
- However, querying these leagues returned "No data available" with a note that registered users are required for queries spanning more than 10 years.
- A registered (free) account may unlock Negro Leagues WAR leaderboards.

**Assessment:** FanGraphs likely has season-level Negro Leagues WAR for registered users, but this could not be confirmed. The Ch 05 spec lists "FanGraphs Negro Leagues data" as a source for "WAR calculations and rate statistics." Worth testing with a registered account.

---

### Integration Timeline Data (First Black Player per Franchise)

The event-timing data for the survival model. The Ch 09 spec lists four sources:

#### MLB Official First Black Player List
**Status:** The August 2020 MLB compilation exists. Available through MLB.com historical archives.

#### SABR Bio Project Baseball Integration 1947-1986
**URL:** https://sabr.org/bioproj/topic/baseball-integration-1947-1986/
**What it has:** The canonical 933-player list and per-team integration milestones. This is the most comprehensive source. The article focuses on statistical analysis of integration's effects on gameplay, with team-by-team data.

#### Partial Integration Timeline (from Wikipedia and other sources)

The following is confirmed from research:

| Team | First Black Player | Date | Owner | Notes |
|------|-------------------|------|-------|-------|
| Brooklyn Dodgers | Jackie Robinson | Apr 15, 1947 | Branch Rickey (GM) | First in MLB |
| Cleveland Indians | Larry Doby | Jul 5, 1947 | Bill Veeck | First in AL |
| St. Louis Browns | Hank Thompson & Willard Brown | Jul 17, 1947 | Richard Muckerman | Third team |
| Philadelphia Phillies | John Kennedy | 1957 | | Last NL team |
| Boston Red Sox | Pumpsie Green | Jul 21, 1959 | Tom Yawkey | Last MLB team |

The remaining 11 teams' integration dates are documented in the SABR source but could not be extracted via web fetch due to access issues. This data exists and is accessible through SABR's published research.

---

### Ownership and Manager Data (1947-1959)

#### Baseball Reference Team Pages

**URL pattern:** https://www.baseball-reference.com/teams/[TEAM]/[YEAR].shtml
**Access:** Free web, bot-protected (403 on automated access).

**What it has:** Every team page includes manager name, and team pages typically show front office information. For 16 teams across 13 years (1947-1959), this is 208 page lookups. Manual extraction is feasible but tedious.

#### Tom Yawkey (Boston Red Sox)

**Ownership timeline confirmed from Wikipedia:**
- Purchased Red Sox: February 25, 1933, for $1.25 million
- Owned until death: July 9, 1976 (43 years)
- Red Sox were the last MLB team to integrate: Pumpsie Green, July 21, 1959
- 1945: Held a "farce tryout" for Jackie Robinson, who "was subjected to racial epithets by management"
- Red Sox did not sign any Black free agents between 1976 and 1993

This is the anchor case for Ch 09's argument about persistent institutional resistance.

#### SABR Business of Baseball Research Committee

The Ch 09 spec lists this as a source for "franchise ownership history and market data." SABR maintains this as a research committee with published articles. Access is through SABR membership or their published research.

---

### Ch 09 Data Gap Summary

| Data Need | Best Source | Status | Gap |
|-----------|-----------|--------|-----|
| Season-level Negro Leagues WAR | Seamheads | Exists, access pathway unclear | Need to confirm WAR page URLs or contact Seamheads |
| Season-level Negro Leagues WAR (backup) | Baseball Reference | Likely available | Bot-protected, manual access needed |
| Season-level Negro Leagues WAR (backup) | FanGraphs | Likely available for registered users | Needs registered account test |
| Integration event dates (all 16 teams) | SABR Bio Project | Documented, accessible | Need to extract from SABR article |
| Franchise ownership 1947-1959 | Baseball Reference + SABR | Exists across sources | Manual extraction from 208 team pages |
| Manager tenure 1947-1959 | Baseball Reference | Exists | Manual extraction from team pages |
| US Census Black population by metro | Census.gov | Public data | Need 1940, 1950, 1960 decadal data |

**Critical blocker:** None. All required data exists and has identified access pathways. The work is extraction and assembly, not discovery. The season-level WAR data is the highest-priority item to confirm access for.

---

## Chapter 14: The Courier Archive
### Black Press Corpus Access Pathways

The Ch 14 corpus spans 1920-1995 across ten major Black press publications. The chapter needs digitized full-text access for corpus indexing, NLP analysis, and box score recovery.

### Source 1: Chronicling America (Library of Congress)

**URL:** https://www.loc.gov/chroniclingamerica/
**Access:** Completely free, open access
**Format:** Digitized newspaper page images with OCR full-text search
**Date coverage:** 1690-1963
**Total scope:** Nearly 24 million pages as of April 2026

**Black newspaper titles:** The collection includes newspapers from all states, and the NDNP (National Digital Newspaper Program) has digitized content from 38+ states. However, the specific Black newspaper titles included could not be confirmed through automated access (the search interface returned 403 errors on title searches).

**Known Black press content:**
- The Chicago Defender's scanned open-access archives from 1909-1915 are available through the Center for Research Libraries (CRL), which partners with Chronicling America.
- The Norfolk Journal and Guide is referenced in LOC holdings.

**Assessment for Ch 14:** Chronicling America is the primary free pathway. Its limitation is that coverage of the major Black papers (Courier, Defender, Afro-American) may be partial or absent, because many of those papers are still under copyright and their digitization was done by commercial vendors (ProQuest, Newspapers.com) rather than the NDNP. The 1963 cutoff date also excludes the later years of the Ch 14 corpus.

**Action required:** Search Chronicling America's title directory manually for each of the ten in-scope publications.

---

### Source 2: ProQuest Historical Black Newspapers

**URL:** Institutional access through ProQuest databases
**Access:** Subscription/institutional only. Available through university library subscriptions.
**Format:** Full-text searchable with page images

**Known titles (from the Ch 14 spec and secondary sources):**
- Chicago Defender
- Pittsburgh Courier
- Baltimore Afro-American
- Atlanta Daily World (archives 1931-2003 confirmed through Wikipedia)
- New York Amsterdam News
- Norfolk Journal and Guide
- Cleveland Call and Post
- Philadelphia Tribune

**Assessment for Ch 14:** ProQuest is the most comprehensive digital archive of historical Black newspapers. The Ch 14 spec explicitly lists it as a primary source: "The most comprehensive digital archive of historical Black newspapers. Institutional access required. The chapter's research accesses through academic institution; public-access pathways are documented."

**Access model:** Requires institutional subscription. Most university libraries with research collections subscribe. No individual subscription option. No known free trial for researchers without institutional affiliation.

**Action required:** Confirm institutional access. Identify which university library subscriptions include all ten target publications. Document the specific ProQuest product name (likely "ProQuest Historical Newspapers: Black Newspapers").

---

### Source 3: Readex/NewsBank African American Newspapers

**URL:** https://www.readex.com/products/african-american-newspapers-1827-1998
**Access:** Institutional subscription
**Format:** Full-text searchable digital archive

**Coverage confirmed:**
- **Series 1 (1827-1998):** 280 US newspaper titles from 35+ states
- **Series 2 (1835-1956):** 75+ additional titles
- **African American Periodicals (1825-1995):** 170+ periodicals from 26 states
- **Total:** 355+ newspaper titles plus 170+ periodicals

**Assessment for Ch 14:** The largest collection by title count. With 355+ titles, this likely includes all ten target publications plus dozens of regional papers that covered Negro Leagues baseball locally. The date ranges (through 1998 for Series 1) cover the full Ch 14 corpus span.

**Access model:** Institutional subscription. Available through many research university libraries.

**Action required:** Confirm which of the ten target publications are in the Readex collection. The title count suggests comprehensive coverage, but the specific titles need verification.

---

### Source 4: Newspapers.com

**URL:** https://www.newspapers.com/
**Access:** Individual subscription (~$13/month basic, ~$30/month publisher extra)
**Format:** Page images with OCR search

**Assessment for Ch 14:** The Ch 14 spec lists this as "The most accessible digitized archive of Black press coverage, with documented Courier, Defender, and other outlet articles." The individual subscription model makes it the most accessible pathway for a researcher without institutional affiliation. Bot-protected (403 on automated access).

**Action required:** Confirm which of the ten target publications are available. Search the title directory for each.

---

### Source 5: GenealogyBank

**URL:** https://www.genealogybank.com/
**Access:** Individual subscription (~$20/month)
**Format:** Page images with OCR search

**Assessment for Ch 14:** Listed in the Ch 14 spec as "Additional digitized coverage." Could not confirm specific Black newspaper title coverage due to 403 errors. GenealogyBank's collection focus is genealogical research, which means their newspaper holdings tend toward local papers, obituaries, and vital records coverage.

**Action required:** Confirm coverage of the ten target publications with a trial account or direct inquiry.

---

### Source 6: Accessible Archives / Coherent Digital

**URL:** https://coherentdigital.net/collections/african-american-newspapers/ (redirected from accessible-archives.com)
**Access:** Institutional subscription
**Format:** Full-text searchable

**Assessment for Ch 14:** Listed in the Ch 14 spec as "Additional digitized coverage." The redirect to Coherent Digital suggests a platform migration. The specific titles and date ranges could not be confirmed (404 on the redirected URL).

**Action required:** Contact Coherent Digital for current title list and access model.

---

### Source 7: Center for Research Libraries (CRL)

**URL:** https://dds.crl.edu/
**Access:** Free (open access for some collections), institutional for others

**Known holdings:**
- Chicago Defender scanned archives, 1909-1915 (confirmed via Wikipedia)

**Assessment:** Limited date range for the Defender, but the open-access model is valuable. CRL may have additional Black press microfilm holdings that have been digitized.

---

### Source 8: Institutional Archives

**National Baseball Hall of Fame PASTIME Archive**
- URL: collection.baseballhall.org
- Holdings: Wendell Smith's papers, digitized
- Access: Free online for digitized portions
- Assessment: Critical for the Wendell Smith featured writer section

**University of Pittsburgh**
- Holdings: Pittsburgh Courier archival finding aids
- Assessment: The Courier's institutional home. Potential source for non-digitized materials.

**Emory University (Stuart A. Rose Library)**
- Holdings: Atlanta Daily World archives, 1931-2003
- Assessment: Confirmed through Wikipedia.

**New York Amsterdam News**
- Digital edition available at amsterdamnews.com (since 2009)
- Historical archive access pathway unclear

---

### Source 9: Internet Archive

**URL:** https://archive.org/details/newspapers
**Access:** Free
**Format:** Variable (page images, some OCR)

**Assessment:** Could not confirm specific Black newspaper holdings. The Internet Archive's newspaper collection requires JavaScript rendering and could not be assessed through automated fetch. Worth manual investigation.

---

### Source 10: DigitalNC (North Carolina)

**URL:** https://www.digitalnc.org/newspapers/
**Access:** Free

**Confirmed Black press titles:**
- Africo-American Presbyterian (Wilmington, NC), 707 issues, 1880-1938
- African Expositor (Raleigh, NC), 3 issues, 1886-1887

**Assessment:** These are regional papers, not among the ten target publications. Minimal relevance for Ch 14's core corpus, but potentially useful for regional coverage gaps.

---

### The Ten Target Publications: Access Matrix

| Publication | Founded | Peak Circ. | ProQuest | Readex | Newspapers.com | Chron. America | Open Access |
|------------|---------|-----------|----------|--------|----------------|----------------|-------------|
| Pittsburgh Courier | 1907 | 357,000 (1947) | Likely | Likely | Likely | Unknown | No |
| Chicago Defender | 1905 | High (4-5x readership multiplier) | Likely | Likely | Likely | Partial (1909-1915 via CRL) | Partial |
| Baltimore Afro-American | 1892 | Unknown | Likely | Likely | Likely | Partial (1902-1917 noted) | Partial |
| NY Amsterdam News | 1909 | 100,000 (1940s) | Likely | Likely | Unknown | Unknown | No |
| Kansas City Call | 1919 | Unknown | Unknown | Likely | Unknown | Unknown | No |
| Atlanta Daily World | 1928 | 20,000+ (1960s) | Yes (1931-2003) | Likely | Unknown | Unknown | No |
| Norfolk Journal and Guide | 1900 | 80,000-100,000 (WWII) | Likely | Likely | Unknown | Referenced | No |
| Michigan Chronicle | 1936 | Unknown | Unknown | Likely | Unknown | Unknown | No |
| Philadelphia Tribune | 1884 | 31,544 (2020) | Unknown | Likely | Unknown | Unknown | No |
| Cleveland Call and Post | 1928 | Unknown | Unknown | Likely | Unknown | Unknown | No |

**"Likely" means:** The source's collection size (ProQuest covers major Black papers, Readex has 355+ titles) makes inclusion probable but not confirmed.

---

### Ch 14 Data Gap Summary

**The good news:** The corpus exists. Multiple commercial vendors have digitized the major Black newspapers. The total digitized pool across all vendors likely covers all ten target publications with substantial date ranges.

**The bad news:** Almost all comprehensive access is behind institutional paywalls. The free/open access landscape is sparse:
- Chronicling America: free but Black newspaper coverage is limited (copyright issues)
- CRL: free for Chicago Defender 1909-1915 only
- Hall of Fame PASTIME: free for Wendell Smith papers
- Everything else: subscription or institutional access required

**The critical question:** Does the project have institutional library access? Without it, the primary pathway is Newspapers.com ($13-30/month individual subscription), which has the most accessible pricing but may not cover all ten target publications.

**Action required:**
1. Confirm institutional library access (university affiliation) for ProQuest and Readex
2. If no institutional access, test Newspapers.com with a trial subscription to confirm title coverage
3. Search Chronicling America's title directory manually for each of the ten publications
4. Contact the Hall of Fame about PASTIME archive scope for Negro Leagues journalism beyond Smith's papers
5. Contact Readex for a specific title list to confirm all ten publications are included in their 355+ title collection

---

## Cross-Chapter Dependencies

Several data needs overlap across chapters:

1. **Seamheads contact (gary@seamheads.com):** Needed for Ch 05 (cross-league roster data, bulk access) and Ch 09 (season-level WAR access confirmation). Single outreach covers both.

2. **Institutional library access:** Needed for Ch 14 (ProQuest, Readex) and Ch 05 spec's "Chicago Defender historical archive" reference (ProQuest). One institutional subscription unlocks multiple chapters.

3. **Baseball Reference manual access:** Needed for Ch 09 (ownership/manager data) and Ch 05 (cross-reference verification). Bot protection blocks automated access; manual extraction is the path.

4. **SABR membership:** Useful for Ch 09 (integration timeline, Business of Baseball Committee) and Ch 05 (BioProject cross-league career data). SABR membership is $65/year.

---

## Priority Actions

### Immediate (this week)
1. Email gary@seamheads.com requesting: (a) bulk data access for research, (b) status of Puerto Rican/Venezuelan/Dominican data pipeline, (c) confirmation of season-level WAR availability and access
2. Confirm institutional library access for ProQuest Historical Black Newspapers
3. Create a free FanGraphs account and test Negro Leagues WAR leaderboard access

### Short-term (this month)
4. Extract the full 16-team integration timeline from SABR Bio Project (manual)
5. Test Newspapers.com trial for Ch 14 target publication coverage
6. Search Chronicling America title directory for all ten Ch 14 target publications
7. Begin manual extraction of ownership/manager data from Baseball Reference (16 teams, 13 years)

### Medium-term (before build)
8. If Seamheads bulk access is available, build the cross-league player-season dataset for Ch 05
9. Assemble the covariate dataset for Ch 09 Cox model (Census data, attendance, ownership tenure)
10. Build the Ch 14 corpus index framework and begin populating from whichever access pathway is confirmed
