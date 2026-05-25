"""
Batch Whisper transcription for Negro Leagues oral history audio files.
Saves transcripts to chapters/13-the-voice/data/ as JSON.
"""

import whisper
import json
import os
import time

AUDIO_DIR = os.path.dirname(os.path.abspath(__file__)) + "/audio"
DATA_DIR = os.path.dirname(os.path.abspath(__file__)) + "/data"

# Metadata for each audio file: source, rights, speaker info
AUDIO_METADATA = {
    # UBalt NLOH Collection
    "ernest-burke.mp3": {
        "speaker": "Ernest Burke",
        "interviewer": "Unknown (UBalt student)",
        "date": "November 24, 1998",
        "institution": "University of Baltimore",
        "collection": "Negro League Oral History Collection (R0089)",
        "source_url": "https://archive.org/details/R0089_NLOH_B02_Burke_Ernest",
        "rights": "University of Baltimore, educational and research use",
    },
    "geraldine-day-p1.mp3": {
        "speaker": "Geraldine Day",
        "interviewer": "Unknown (UBalt student)",
        "date": "December 5, 1998",
        "institution": "University of Baltimore",
        "collection": "Negro League Oral History Collection (R0089)",
        "source_url": "https://archive.org/details/R0089_NLOH_B02_Day_Geraldine",
        "rights": "University of Baltimore, educational and research use",
        "note": "Wife of Leon Day, Hall of Famer. Part 1 of 3.",
    },
    "geraldine-day-p2.mp3": {
        "speaker": "Geraldine Day",
        "interviewer": "Unknown (UBalt student)",
        "date": "December 5, 1998",
        "institution": "University of Baltimore",
        "collection": "Negro League Oral History Collection (R0089)",
        "source_url": "https://archive.org/details/R0089_NLOH_B02_Day_Geraldine",
        "rights": "University of Baltimore, educational and research use",
        "note": "Wife of Leon Day, Hall of Famer. Part 2 of 3.",
    },
    "geraldine-day-p3.mp3": {
        "speaker": "Geraldine Day",
        "interviewer": "Unknown (UBalt student)",
        "date": "December 5, 1998",
        "institution": "University of Baltimore",
        "collection": "Negro League Oral History Collection (R0089)",
        "source_url": "https://archive.org/details/R0089_NLOH_B02_Day_Geraldine",
        "rights": "University of Baltimore, educational and research use",
        "note": "Wife of Leon Day, Hall of Famer. Part 3 of 3.",
    },
    "mamie-johnson.mp3": {
        "speaker": "Mamie 'Peanut' Johnson Goodman",
        "interviewer": "Unknown (UBalt student)",
        "date": "November 28, 1998",
        "institution": "University of Baltimore",
        "collection": "Negro League Oral History Collection (R0089)",
        "source_url": "https://archive.org/details/R0089_NLOH_B02_Goodman_Mamie_Johnson",
        "rights": "University of Baltimore, educational and research use",
        "note": "One of three women to play in the Negro Leagues.",
    },
    "robert-hieronimus-p1.mp3": {
        "speaker": "Robert Hieronimus",
        "interviewer": "Unknown (UBalt student)",
        "date": "December 4, 1998",
        "institution": "University of Baltimore",
        "collection": "Negro League Oral History Collection (R0089)",
        "source_url": "https://archive.org/details/R0089_NLOH_B02_Hieronimus_Robert",
        "rights": "University of Baltimore, educational and research use",
        "note": "Part 1 of 3.",
    },
    "robert-hieronimus-p2.mp3": {
        "speaker": "Robert Hieronimus",
        "interviewer": "Unknown (UBalt student)",
        "date": "December 4, 1998",
        "institution": "University of Baltimore",
        "collection": "Negro League Oral History Collection (R0089)",
        "source_url": "https://archive.org/details/R0089_NLOH_B02_Hieronimus_Robert",
        "rights": "University of Baltimore, educational and research use",
        "note": "Part 2 of 3.",
    },
    "robert-hieronimus-p3.mp3": {
        "speaker": "Robert Hieronimus",
        "interviewer": "Unknown (UBalt student)",
        "date": "December 4, 1998",
        "institution": "University of Baltimore",
        "collection": "Negro League Oral History Collection (R0089)",
        "source_url": "https://archive.org/details/R0089_NLOH_B02_Hieronimus_Robert",
        "rights": "University of Baltimore, educational and research use",
        "note": "Part 3 of 3.",
    },
    "gordon-hopkins-p1.mp3": {
        "speaker": "Gordon D. Hopkins",
        "interviewer": "Unknown (UBalt student)",
        "date": "December 7, 1998",
        "institution": "University of Baltimore",
        "collection": "Negro League Oral History Collection (R0089)",
        "source_url": "https://archive.org/details/R0089_NLOH_B02_Hopkins_Gordon_D",
        "rights": "University of Baltimore, educational and research use",
        "note": "Part 1 of 2.",
    },
    "gordon-hopkins-p2.mp3": {
        "speaker": "Gordon D. Hopkins",
        "interviewer": "Unknown (UBalt student)",
        "date": "December 7, 1998",
        "institution": "University of Baltimore",
        "collection": "Negro League Oral History Collection (R0089)",
        "source_url": "https://archive.org/details/R0089_NLOH_B02_Hopkins_Gordon_D",
        "rights": "University of Baltimore, educational and research use",
        "note": "Part 2 of 2.",
    },
    "robert-leffler.mp3": {
        "speaker": "Robert Leffler",
        "interviewer": "Unknown (UBalt student)",
        "date": "December 4, 1998",
        "institution": "University of Baltimore",
        "collection": "Negro League Oral History Collection (R0089)",
        "source_url": "https://archive.org/details/R0089_NLOH_B02_Leffler_Robert",
        "rights": "University of Baltimore, educational and research use",
    },
    # Monte Irvin interview
    "monte-irvin.mp3": {
        "speaker": "Monte Irvin",
        "interviewer": "Jimmy Scott",
        "date": "January 3, 2010",
        "institution": "Jimmy Scott's High & Tight podcast",
        "source_url": "https://archive.org/details/JimmyScottJimmyScott_sHigh_Tight_TheMonteIrvinInterview",
        "rights": "CC BY 2.5, Copyright 2010 David Philp",
        "note": "Hall of Famer. Discusses Negro Leagues, NY Giants, WWII, Jackie Robinson.",
    },
    # Bob Kendrick interview
    "bob-kendrick.mp3": {
        "speaker": "Bob Kendrick",
        "interviewer": "Amiri Tulloch (JG Sports Talk)",
        "date": "April 19, 2014",
        "institution": "JG Sports Talk",
        "source_url": "https://archive.org/details/BobKendrickIntvw",
        "rights": "Internet Archive opensource_audio collection, no explicit license",
        "note": "President of the Negro Leagues Baseball Museum.",
    },
    # Buck O'Neil tribute
    "buck-oneil-tribute.mp3": {
        "speaker": "Chuck Freeman (host), tribute to Buck O'Neil",
        "interviewer": "N/A",
        "date": "December 22, 2006",
        "institution": "Soul Talk Radio",
        "source_url": "https://archive.org/details/TheBuckStartsHereSoulTalkRadio",
        "rights": "CC BY-SA 2.5",
        "note": "Spiritual tribute to Buck O'Neil after his death at 91 in October 2006.",
    },
    # Joe Madison / Bob Kendrick
    "joe-madison-bob-kendrick.mp3": {
        "speaker": "Bob Kendrick",
        "interviewer": "Joe Madison (SiriusXM)",
        "date": "July 20, 2018",
        "institution": "SiriusXM News & Issues",
        "source_url": "https://archive.org/details/soundcloud-474398520",
        "rights": "No explicit license stated",
        "note": "Discusses Negro Leagues history and vandalism at Buck O'Neil Research Center.",
    },
    # Kirkland Hall
    "kirkland-hall.mp3": {
        "speaker": "Kirkland Hall",
        "interviewer": "Nabb Research Center interviewer",
        "date": "November 15, 2019",
        "institution": "Edward H. Nabb Research Center for Delmarva History and Culture",
        "source_url": "https://archive.org/details/ncoh001000002",
        "rights": "CC BY-NC-ND 4.0, Copyright Nabb Research Center",
        "note": "Curator at Oaksville Baseball museum. Discusses Negro League influence on Eastern Shore.",
    },
    # William Miles
    "william-miles-p1.mp3": {
        "speaker": "William T. Miles",
        "interviewer": "Nabb Research Center interviewer",
        "date": "July 12, 2004",
        "institution": "Edward H. Nabb Research Center for Delmarva History and Culture",
        "source_url": "https://archive.org/details/miles.william2",
        "rights": "CC BY-NC-ND 4.0, Copyright Nabb Research Center",
        "note": "Retired teacher. Discusses segregated baseball, Eastern Shore. Part 1 of 2.",
    },
    "william-miles-p2.mp3": {
        "speaker": "William T. Miles",
        "interviewer": "Nabb Research Center interviewer",
        "date": "July 12, 2004",
        "institution": "Edward H. Nabb Research Center for Delmarva History and Culture",
        "source_url": "https://archive.org/details/miles.william2",
        "rights": "CC BY-NC-ND 4.0, Copyright Nabb Research Center",
        "note": "Part 2 of 2.",
    },
    # Leroy Muir
    "leroy-muir-p1.mp3": {
        "speaker": "Jennings Leroy Muir",
        "interviewer": "Nabb Research Center interviewer",
        "date": "July 14, 2004",
        "institution": "Edward H. Nabb Research Center for Delmarva History and Culture",
        "source_url": "https://archive.org/details/muir.leroy1",
        "rights": "CC BY-NC-ND 4.0, Copyright Nabb Research Center",
        "note": "Discusses Eastern Shore minor leagues and African Americans in baseball. Part 1 of 2.",
    },
    "leroy-muir-p2.mp3": {
        "speaker": "Jennings Leroy Muir",
        "interviewer": "Nabb Research Center interviewer",
        "date": "July 14, 2004",
        "institution": "Edward H. Nabb Research Center for Delmarva History and Culture",
        "source_url": "https://archive.org/details/muir.leroy1",
        "rights": "CC BY-NC-ND 4.0, Copyright Nabb Research Center",
        "note": "Part 2 of 2.",
    },
    # Ivy Reid Lewis
    "ivy-reid-lewis-a.m4a": {
        "speaker": "Ivy Reid Lewis and Charles Rogers Reid",
        "interviewer": "Susan Cole",
        "date": "January 25, 1980",
        "institution": "African American Museum and Library at Oakland",
        "source_url": "https://archive.org/details/caricmh_000763",
        "rights": "Copyright status unknown. Contact AAMLO for permissions.",
        "note": "Charles Rogers Reid was a Negro League baseball player. Side A.",
    },
    "ivy-reid-lewis-b.m4a": {
        "speaker": "Ivy Reid Lewis and Charles Rogers Reid",
        "interviewer": "Susan Cole",
        "date": "January 25, 1980",
        "institution": "African American Museum and Library at Oakland",
        "source_url": "https://archive.org/details/caricmh_000763",
        "rights": "Copyright status unknown. Contact AAMLO for permissions.",
        "note": "Side B.",
    },
    # Carlis Wright Robinson
    "carlis-robinson-p1.mp3": {
        "speaker": "Carlis Wright Robinson",
        "interviewer": "Bruce R. Magee and Stephen Payne",
        "date": "January 31, 2025",
        "institution": "Louisiana Anthology Podcast",
        "source_url": "https://archive.org/details/611-carlis-wright-robinson-part-1",
        "rights": "CC BY-NC-SA 4.0",
        "note": "Daughter of Johnny Wright, Negro Leagues player who co-pioneered integration. Part 1 of 2.",
    },
    "carlis-robinson-p2.mp3": {
        "speaker": "Carlis Wright Robinson",
        "interviewer": "Bruce R. Magee and Stephen Payne",
        "date": "February 7, 2025",
        "institution": "Louisiana Anthology Podcast",
        "source_url": "https://archive.org/details/612-carlis-wright-robinson-part-2",
        "rights": "CC BY-NC-SA 4.0",
        "note": "Part 2 of 2.",
    },
}

# Skip charles-winner.mp3 since it's already transcribed
SKIP = {"charles-winner.mp3"}


def transcript_path(audio_filename):
    base = os.path.splitext(audio_filename)[0]
    return os.path.join(DATA_DIR, f"transcript-{base}.json")


def main():
    os.makedirs(DATA_DIR, exist_ok=True)

    # Check which files still need transcription
    todo = []
    for filename in sorted(AUDIO_METADATA.keys()):
        if filename in SKIP:
            continue
        out_path = transcript_path(filename)
        if os.path.exists(out_path):
            print(f"SKIP (already done): {filename}")
            continue
        audio_path = os.path.join(AUDIO_DIR, filename)
        if not os.path.exists(audio_path):
            print(f"SKIP (file missing): {filename}")
            continue
        if os.path.getsize(audio_path) < 1000:
            print(f"SKIP (file too small, likely failed download): {filename}")
            continue
        todo.append(filename)

    print(f"\n{len(todo)} files to transcribe.\n")
    if not todo:
        return

    print("Loading Whisper base model...")
    model = whisper.load_model("base")
    print("Model loaded.\n")

    for i, filename in enumerate(todo, 1):
        audio_path = os.path.join(AUDIO_DIR, filename)
        out_path = transcript_path(filename)
        meta = AUDIO_METADATA[filename]

        print(f"[{i}/{len(todo)}] Transcribing: {filename}")
        t0 = time.time()

        result = model.transcribe(audio_path, language="en")
        elapsed = time.time() - t0

        transcript = {
            "speaker": meta["speaker"],
            "interviewer": meta.get("interviewer", "Unknown"),
            "date": meta.get("date", "Unknown"),
            "institution": meta.get("institution", "Unknown"),
            "collection": meta.get("collection", ""),
            "source_url": meta["source_url"],
            "rights": meta["rights"],
            "whisper_model": "base",
            "language": "en",
            "duration_seconds": round(result["segments"][-1]["end"], 1) if result["segments"] else 0,
            "text": result["text"],
            "segments": [
                {
                    "start": round(s["start"], 2),
                    "end": round(s["end"], 2),
                    "text": s["text"],
                }
                for s in result["segments"]
            ],
        }

        if "note" in meta:
            transcript["note"] = meta["note"]

        with open(out_path, "w") as f:
            json.dump(transcript, f, indent=2, ensure_ascii=False)

        print(f"  Done in {elapsed:.1f}s, {transcript['duration_seconds']:.0f}s audio, {len(result['segments'])} segments")
        print(f"  Saved: {out_path}\n")

    print("All transcriptions complete.")


if __name__ == "__main__":
    main()
