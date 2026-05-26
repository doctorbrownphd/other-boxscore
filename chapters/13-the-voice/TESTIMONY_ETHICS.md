# Testimony Ethics
## Chapter 13 -- The Voice
### The Other Box Score

**Version:** 1.0
**Date:** 2026-05-25
**Owner:** Jeremy Haynes
**Review:** Extended agent roster (Oscar, Elias, Vera, Ida, Gates)

---

## Purpose

This document establishes the editorial and ethical posture for Chapter 13's presentation of Negro Leagues oral history testimony. The chapter operates under constraints the statistical chapters do not. Testimony is not data. It carries the speaker's authority, the speaker's intention, and the speaker's dignity. The platform's responsibility is to present it faithfully, not to reprocess it.

Every decision described here serves one principle: the speakers are the authority. The platform is the frame.

---

## 1. Speaker Primacy

The speaker's voice precedes the platform's analysis. Always.

- When a testimony excerpt is presented, the excerpt comes first. Editorial framing is brief, factual, and positioned after the excerpt, not before it.
- The platform does not introduce an excerpt with an interpretive summary that tells the reader what to think before they hear the speaker. The speaker speaks. Then, if necessary, the platform provides minimal context: who the speaker is, when the recording was made, where it is held.
- No excerpt is trimmed to serve a platform argument. The excerpt selection process (documented in PERMISSION_PROTOCOL.md) ensures that excerpts are representative of the speaker's full statement, not isolated to support editorial convenience.
- The platform does not paraphrase testimony when the testimony itself is available. If the recording or transcript is accessible and permissions allow, the speaker's own words are used.
- Speaker names are presented with full biographical respect. No nicknames without documented speaker preference. No diminutive framing.

---

## 2. Institutional Respect

The oral history record exists because institutions collected it. SABR's Oral History Committee, the University of Baltimore Special Collections, the State Historical Society of Missouri, the Negro Leagues Baseball Museum, the National Baseball Hall of Fame Library, NPR, and dozens of smaller collections did the work of recording, preserving, and cataloguing testimony while there was time.

The platform respects these institutions absolutely:

- The platform does not host recordings or transcripts that belong to institutional collections unless explicit, documented permission has been granted by the holding institution.
- The platform links to institutional access points. Every recording in the archive index includes the host institution's name, collection identifier, and access pathway.
- Where an institution's access policy restricts public availability, the platform documents the restriction and directs readers to the institution's own contact channels. The platform does not circumvent access restrictions.
- Institutional attribution appears at the point of every excerpt, not buried in an endnote. The reader always knows who collected the testimony.
- The platform does not characterize institutional policies as obstacles. Restricted access is the institution's prerogative. The platform documents the status and moves on.

---

## 3. Rights Compliance

No audio recording, no transcript excerpt, and no quoted testimony appears in this chapter without documented permission from the rights holder.

- Permission status is recorded per recording in `data/permission-ledger.json`. The ledger is the chapter's primary compliance artifact.
- "Rights holder" means the entity or individual with legal authority over the recording. For institutional collections, this is typically the holding institution. For independently recorded material, this may be the interviewer, the speaker's estate, or both.
- Permission is never assumed. "Publicly accessible" does not mean "available for republication." The platform obtains explicit permission for every excerpt it presents.
- Where permission has not yet been sought, the recording appears in the archive index with its metadata but no excerpt material is included. The index entry links to the institutional access point.
- Where permission has been declined, the recording remains in the archive index with full metadata. All excerpt material is removed. The reader is directed to the holding institution. See PERMISSION_PROTOCOL.md for the full declined-permission pathway.
- Permission records include: rights holder identity, date of request, date of response, scope of permission granted, any conditions or restrictions, and the name of the person who obtained the permission.

---

## 4. Gap Acknowledgment

The oral history record is incomplete. The chapter does not pretend otherwise.

- Players who died before systematic oral history collection began have no testimony in the record. The chapter notes their absence explicitly. Josh Gibson, who died in January 1947, gave few if any recorded interviews. The chapter states this. It does not fill the gap with contemporary reconstruction or speculative narration.
- Players who were alive during collection periods but were never interviewed are documented in `data/gap-record.json`. The gap record notes what is known about the absence: whether outreach was attempted, whether the player declined, whether the player was simply not reached.
- The chapter does not use secondary testimony (contemporaries describing an absent player) as a substitute for the absent player's own voice. Secondary testimony is labeled as secondary testimony. "Buck Leonard described Josh Gibson as..." is not Josh Gibson's testimony. It is Buck Leonard's testimony about Josh Gibson. The distinction is maintained.
- Absence is presented as absence. The chapter does not speculate about what a player might have said. It does not use statistical profiles, biographical records, or contemporary accounts to construct a synthetic voice. What is missing is stated as missing.
- The gap analysis is itself a finding. The chapter presents it as one of the five original findings because the shape of the gap tells a story the platform is obligated to document honestly.

---

## 5. Editorial Restraint

The platform's editorial voice is subordinate to the testimony.

- Excerpt selection is reviewed for fairness. No speaker is represented by a single excerpt chosen for its dramatic quality if that excerpt is unrepresentative of the speaker's broader testimony. The selection process is documented in PERMISSION_PROTOCOL.md.
- The platform does not interpret testimony. It does not tell the reader what a speaker "really meant" or what a statement "reveals about" the Negro Leagues experience. The speaker said what they said. The reader can engage with it directly.
- Editorial connective tissue between excerpts is minimal and factual. It provides chronological context, identifies speakers, and describes the circumstances of the recording. It does not editorialize.
- The platform does not rank testimony. No speaker's account is presented as more authoritative or more important than another's. The three featured speakers (Buck O'Neil, Mamie "Peanut" Johnson, and the third speaker selected through the editorial process) receive more space because their testimony records are more extensive, not because the platform judges their voices as more significant.
- The chapter's topic model output is presented as a navigational tool, not an analytical conclusion. The topic model helps readers find testimony on specific subjects. It does not claim to reveal the "themes" of Negro Leagues testimony in an authoritative sense. Computational topic modeling applied to oral testimony has documented limitations, and the chapter states them at the point of use.

---

## 6. Living Speakers

This chapter's primary sources are historical recordings, most featuring speakers who are no longer living. Where the chapter references or includes testimony from a living speaker, additional requirements apply:

- No testimony from a living speaker is included without the speaker's explicit, documented approval. Approval is obtained through direct contact, not through institutional intermediaries alone.
- The speaker is offered the opportunity to review the excerpt selection and the editorial context in which their testimony will appear before publication.
- The speaker may withdraw approval at any time. If approval is withdrawn after publication, the excerpt is removed within 48 hours and replaced with a notation that the testimony was available but has been withdrawn at the speaker's request.
- The speaker's contact information is never published or stored in any public-facing file. Contact records are maintained in the permission ledger's non-public fields.
- Living speakers are not contacted for promotional purposes. The only outreach is for permission and review.

---

## 7. AI-Generated Transcripts

The chapter uses automatic speech recognition (ASR) to generate transcripts of recordings where no human-produced transcript exists and where institutional permission allows transcription. These AI-generated transcripts are subject to strict disclosure requirements:

- Every AI-generated transcript is labeled as AI-generated at the point of display. The label is visually distinct and cannot be missed. It reads: "Transcript generated by automatic speech recognition. Not reviewed or approved by the speaker or the holding institution. May contain errors."
- AI-generated transcripts are never presented as authoritative. They are navigational aids that help readers identify relevant portions of a recording. The recording itself, where accessible, is the authoritative source.
- Where a human-produced transcript exists (whether from the holding institution, from a published source, or from a credentialed transcription effort), the human-produced transcript takes precedence. AI-generated transcripts are used only to fill gaps, not to replace existing work.
- AI-generated transcripts undergo editorial review before publication. The review checks for obvious misrecognitions, particularly of proper nouns (player names, team names, city names) that ASR systems frequently mishandle. Corrections are documented in the transcript file's metadata.
- The ASR model, version, and processing date are recorded in the transcript file's metadata header. The methodology section documents the full transcription pipeline.
- AI-generated transcripts are never quoted as direct speech in the chapter's editorial text. If the chapter's connective tissue references a statement from a recording, and the only transcript is AI-generated, the reference is attributed as: "In a [year] recording held by [institution], [speaker] discussed [topic]" -- not as a direct quotation.

---

## Signature

This document governs the editorial and ethical posture of Chapter 13 for the duration of the chapter's presence on the platform. It is reviewed annually or when new testimony sources are added to the chapter.

**Project Owner:** Jeremy Haynes
**Date:** 2026-05-25
**Version:** 1.0
