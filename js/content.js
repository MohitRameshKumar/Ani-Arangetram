/**
 * CONTENT.JS — edit this file to update the website. Nothing else needs to change.
 *
 * This is the one place all the real facts about the evening live: the date, venue,
 * bios, photos, the song list, and the guestbook wishes. Every page reads from the
 * `CONTENT` object below and builds itself around it, so you can add a song, swap a
 * bio, or change the venue address here and it will show up correctly everywhere the
 * fact appears (nav bar, hero, program page, footer, etc). You do not need to know
 * HTML or CSS to edit this file — just replace the text inside the quotes ("...").
 * Keep the quotes and commas exactly where they are. Anything written as
 * [bracketed instructions like this] is a placeholder telling you what to put there —
 * delete the brackets and instructions once you fill it in. Text wrapped in
 * {{DOUBLE_BRACES}} marks a spot that lives directly in an .html file instead of here
 * (search the .html files for that exact token to find and replace it).
 * If you break the file's punctuation by accident, ask whoever set this site up
 * for help, or compare against a backup copy before saving.
 */

const CONTENT = {

  // ---------------------------------------------------------------------
  // THE EVENT'S NAME. See README.md — "On the concept title" — before
  // finalizing. Confirm the exact wording and meaning with Ani's guru first.
  // ---------------------------------------------------------------------
  theme: {
    title: "Layāñjali",
    titleDisplay: "LAYĀÑJALI",
    subtitle: "An Offering of Rhythm",
    glossLine: "laya (rhythmic flow) + añjali (an offering made with cupped hands)",
    confirmNote: "{{CONFIRM_TITLE_WITH_GURU}} — the family should confirm this title's wording and connotation with Ani's guru before it is printed on invitations.",
  },

  performer: {
    name: "Ani",
    fullName: "[Ani's full name, as it should appear on formal materials]",
  },

  // ---------------------------------------------------------------------
  // EVENT DETAILS — fill these in as soon as they're locked.
  // ---------------------------------------------------------------------
  event: {
    dateDisplay: "[Date to be finalized — e.g. \"Saturday, March 14, 2026\"]",
    seatingTime: "[Seating time — e.g. \"5:30 PM, program begins 6:00 PM sharp\"]",
    venue: {
      name: "[Venue name — e.g. \"Sri Krishna Temple Auditorium\"]",
      addressLine1: "[Street address]",
      addressLine2: "[City, State, ZIP]",
      mapUrl: "https://maps.google.com/?q={{VENUE_ADDRESS_URL_ENCODED}}",
    },
    chiefGuests: [
      "[Chief Guest name and one-line credential]",
      "[Guest of Honor name and one-line credential]",
    ],
    livestreamUrl: "{{LIVESTREAM_URL}}",
    livestreamNote: "[Livestream goes live 15 minutes before seating — link becomes active on the day.]",
  },

  // ---------------------------------------------------------------------
  // HERO CAROUSEL — 4 slides, each with a genuinely different angle.
  // The event strip (date/time/venue/livestream) is NOT part of the
  // slides — it renders once, persistently, underneath them.
  // ---------------------------------------------------------------------
  heroSlides: [
    {
      image: "assets/images/ani-hero-cutout-1.png",
      alt: "[Cutout photo of Ani seated at the mridangam, right hand mid-strike on the valanthalai — transparent background]",
      headline: "Two hands, two skins, one cycle.",
      subtitle: "Tonight, Ani keeps the beat the whole room stands on.",
    },
    {
      image: "assets/images/ani-hero-cutout-2.png",
      alt: "[Cutout photo of Ani, three-quarter view, hands raised just off the drumhead — transparent background]",
      headline: "Nine years of counting under the breath.",
      subtitle: "[Replace with the real number of years Ani has trained.]",
    },
    {
      image: "assets/images/ani-hero-cutout-3.png",
      alt: "[Cutout photo of Ani with guru's hand resting on the mridangam's tension rings — transparent background]",
      headline: "Handed down, rope by rope, beat by beat.",
      subtitle: "A tradition passed from guru to student, one arangetram at a time.",
    },
    {
      image: "assets/images/ani-hero-cutout-4.png",
      alt: "[Cutout photo of Ani looking directly at camera, seated, instrument in lap — transparent background]",
      headline: "You're invited to sit close and listen hard.",
      subtitle: "This is the night the counting becomes a concert.",
    },
  ],

  // ---------------------------------------------------------------------
  // WHAT IS AN ARANGETRAM (home page teaser — About page has the full text)
  // ---------------------------------------------------------------------
  arangetramTeaser: {
    paragraph1: "Arangetram means, plainly, \"ascending the stage\" — from the Tamil arangam (stage) and etram (ascent). It is the evening a guru formally presents a student to the public for the first time, after years spent learning in private. Traditionally it marks a beginning, not a graduation: the point at which a student is ready to offer the art on their own.",
    paragraph2: "[Name the number of years] years ago, Ani sat down at a mridangam for the first time. Tonight is the first time Ani sits down at one in front of an audience that isn't a teacher, a parent, or a rehearsal hall.",
    linkText: "Read more about the mridangam and the arangetram",
  },

  // ---------------------------------------------------------------------
  // WELCOME NOTE FROM ANI'S PARENTS — the emotional center of the home page.
  // Write this in two voices, not brochure copy. Name a specific memory.
  // ---------------------------------------------------------------------
  parentsWelcome: {
    photo: "assets/images/welcome-parents.jpg",
    photoAlt: "[Family photo of Ani with both parents, informal, not posed for a program]",
    paragraphs: [
      "[Open with the specific moment you knew this was Ani's thing — an age, a piece of furniture drummed on, a song that stopped Ani cold. Not \"we always knew Ani had rhythm\" — the actual table, the actual song.]",
      "[One paragraph about what the training actually looked like from your side of it — the early wake-ups for class, the recital that went sideways, the week before a big lesson. Specific and a little funny is better than reverent.]",
      "[Close with what tonight means to you, in your own words. It's fine if it's short.]",
    ],
    signOff: "With so much love,\n[Parent Name] & [Parent Name]",
  },

  // ---------------------------------------------------------------------
  // BLESSINGS — seeded wishes shown as a preview on the home page and in
  // full on blessings.html. Vary length and voice; these should read like
  // different people actually wrote them.
  // ---------------------------------------------------------------------
  blessings: [
    {
      name: "Lakshmi Krishnan",
      relation: "Ani's first mridangam teacher, ages 6–9",
      message: "I still remember Ani showing up to the second lesson having already memorized the exercise I gave — most kids need three tries just to sit cross-legged that long. Go get 'em tonight.",
    },
    {
      name: "The Ramaswamy Family",
      relation: "neighbors",
      message: "We have heard every single one of these talams through our shared wall for four years. We wouldn't trade it for anything. So proud of you, Ani!",
    },
    {
      name: "Priya",
      relation: "cousin",
      message: "you're gonna do amazing tonight. also please let me hold the mridangam after, just once, i promise i'll be careful",
    },
    {
      name: "Dr. and Mrs. Subramaniam",
      relation: "family friends",
      message: "From the first arangetram we attended in this community to Ani's tonight — watching this tradition continue, generation after generation, is a privilege. Warmest congratulations to Ani and the whole family.",
    },
    {
      name: "[Guest Name]",
      relation: "[relation to Ani]",
      message: "[This is a placeholder — real wishes submitted through the guestbook form will replace entries like this one after a family member reviews and approves them. See README.md, \"Blessings form & moderation.\"]",
    },
  ],

  // ---------------------------------------------------------------------
  // ABOUT PAGE — Ani's own training story. Keep it concrete: ages, names
  // of teachers, specific pieces or moments, not generic devotion language.
  // ---------------------------------------------------------------------
  aniStory: {
    paragraphs: [
      "[Age] is how old Ani was when [specific starting moment — a family member's mridangam left out after a gathering, a class a sibling was already taking, a video watched on repeat]. The first teacher was [name], who [one specific detail about the early lessons — what the first exercise was, how long lessons ran, where they happened].",
      "[Describe the middle years of training — how practice fit around school, a memorable performance or setback, when Ani started learning under the current guru if that's a change from the first teacher].",
      "[Close with where things stand now — how many years of training total, what a typical week of practice looks like leading up to tonight, and what Ani is most looking forward to playing.]",
    ],
  },

  // ---------------------------------------------------------------------
  // ARTISTS — Ani plus every accompanying musician performing tonight.
  // Add or remove entries freely; the page rebuilds itself from this list.
  // ---------------------------------------------------------------------
  artists: [
    {
      name: "Ani",
      instrument: "Mridangam",
      role: "Performer",
      photo: "assets/images/artist-ani.jpg",
      photoAlt: "[Formal portrait of Ani with the mridangam]",
      bio: "[2–3 sentences: how long Ani has studied, under whom, and one specific thing about how Ani approaches the instrument.]",
    },
    {
      name: "[Vocalist Name]",
      instrument: "Vocal",
      role: "Accompanying Artist",
      photo: "assets/images/artist-vocal.jpg",
      photoAlt: "[Portrait of the vocal accompanist]",
      bio: "[2–3 sentences on training and performing history.]",
    },
    {
      name: "[Violinist Name]",
      instrument: "Violin",
      role: "Accompanying Artist",
      photo: "assets/images/artist-violin.jpg",
      photoAlt: "[Portrait of the violin accompanist]",
      bio: "[2–3 sentences on training and performing history.]",
    },
    {
      name: "[Ghatam Artist Name — optional, delete this entry if not performing]",
      instrument: "Ghatam",
      role: "Accompanying Artist",
      photo: "assets/images/artist-ghatam.jpg",
      photoAlt: "[Portrait of the ghatam accompanist]",
      bio: "[2–3 sentences on training and performing history.]",
    },
  ],

  // ---------------------------------------------------------------------
  // GURU PAGE — this page carries real weight. Do not shorten it to a
  // card. Include the guru's own words about Ani if at all possible.
  // ---------------------------------------------------------------------
  guru: {
    name: "[Guru's full name, with any honorific they use]",
    photo: "assets/images/guru.jpg",
    photoAlt: "[Formal portrait of Ani's guru, ideally with a mridangam]",
    lineageParagraph: "[Describe the guru's own training lineage — who they learned from, and theirs before that, as far back as it's known. This tradition is passed hand to hand, and naming that chain matters.]",
    teachingParagraph: "[Describe how long the guru has taught, roughly how many students have had arangetrams under them, and what the guru is known for emphasizing in teaching.]",
    wordsAboutStudentHeading: "In the guru's words",
    wordsAboutStudent: "[Space for the guru to write directly about Ani, in their own words — how Ani started, what has changed over the years of training, what the guru wants the audience to listen for tonight. This should not be paraphrased by the family; ask the guru to write or dictate it directly.]",
  },

  // ---------------------------------------------------------------------
  // CHIEF GUEST / GUEST OF HONOR PAGE
  // ---------------------------------------------------------------------
  chiefGuestProfiles: [
    {
      role: "Chief Guest",
      name: "[Chief Guest full name]",
      photo: "assets/images/chief-guest-1.jpg",
      photoAlt: "[Portrait of the Chief Guest]",
      bio: "[2–4 sentences: who they are, their connection to Carnatic music or to Ani's family, and why they were invited to this role.]",
    },
    {
      role: "Guest of Honor",
      name: "[Guest of Honor full name]",
      photo: "assets/images/chief-guest-2.jpg",
      photoAlt: "[Portrait of the Guest of Honor]",
      bio: "[2–4 sentences: who they are and their connection to Ani or the family.]",
    },
  ],

  // ---------------------------------------------------------------------
  // PROGRAM — order of the evening, then the song list. Add, remove, or
  // reorder pieces freely; set isThani: true on exactly one piece (Ani's
  // featured solo).
  // ---------------------------------------------------------------------
  programOrder: [
    { time: "", item: "Welcome & introductions", note: "Master of ceremonies opens the evening." },
    { time: "", item: "Invocation", note: "An opening prayer to Ganesha, remover of obstacles." },
    { time: "", item: "Artist introductions", note: "Ani and the accompanying musicians are introduced." },
    { time: "", item: "Concert, part one", note: "" },
    { time: "", item: "Chief guest's remarks", note: "" },
    { time: "", item: "Guru's remarks", note: "" },
    { time: "", item: "Concert, part two", note: "Includes Ani's thani avarthanam — the featured mridangam solo." },
    { time: "", item: "A note of thanks", note: "From Ani and the family." },
    { time: "", item: "Meet and greet", note: "" },
    { time: "", item: "Dinner", note: "" },
  ],

  programPieces: [
    {
      title: "[Invocation piece — e.g. \"Vatapi Ganapatim\"]",
      ragam: "[Ragam]",
      thalam: "Adi",
      composer: "[Composer]",
      note: "The concert traditionally opens with a prayer to Ganesha, the remover of obstacles, before anything else is offered.",
      lyricLine: "[One translated line of lyrics, if available]",
      isThani: false,
    },
    {
      title: "[Piece 2 title]",
      ragam: "[Ragam]",
      thalam: "Rupakam",
      composer: "[Composer]",
      note: "[Plain-English note: what is this piece about, and what should a first-time listener listen for?]",
      lyricLine: "[Optional translated lyric line]",
      isThani: false,
    },
    {
      title: "[Piece 3 title]",
      ragam: "[Ragam]",
      thalam: "Misra Chapu",
      composer: "[Composer]",
      note: "[Plain-English note on the piece.]",
      lyricLine: "",
      isThani: false,
    },
    {
      title: "Thani Avarthanam",
      ragam: "—",
      thalam: "Adi",
      composer: "Traditional",
      note: "Ani's featured solo — the moment the mridangam steps forward on its own, without the melody, to develop and resolve a rhythmic idea across the full 8-beat cycle.",
      lyricLine: "",
      isThani: true,
    },
    {
      title: "[Piece 5 title — e.g. a Ragam Tanam Pallavi]",
      ragam: "[Ragam]",
      thalam: "Khanda Chapu",
      composer: "[Composer, or \"Traditional / improvised\"]",
      note: "[If this is a Ragam Tanam Pallavi, note that it's the most technically demanding item on the program, largely improvised in three movements.]",
      lyricLine: "",
      isThani: false,
    },
    {
      title: "Pavamana",
      ragam: "[Ragam]",
      thalam: "[Thalam]",
      composer: "Traditional",
      note: "The concert traditionally closes with this benediction.",
      lyricLine: "",
      isThani: false,
    },
  ],

  gratitude: "[Space for a closing acknowledgements paragraph — thanking the guru, accompanying artists, venue staff, family members who helped organize, and anyone who traveled to attend.]",

  // ---------------------------------------------------------------------
  // GALLERY — training and rehearsal photos. Add or remove freely.
  // ---------------------------------------------------------------------
  gallery: [
    { image: "assets/images/gallery-1.jpg", alt: "[Rehearsal photo — describe what's happening]" },
    { image: "assets/images/gallery-2.jpg", alt: "[Rehearsal photo — describe what's happening]" },
    { image: "assets/images/gallery-3.jpg", alt: "[Rehearsal photo — describe what's happening]" },
    { image: "assets/images/gallery-4.jpg", alt: "[Rehearsal photo — describe what's happening]" },
    { image: "assets/images/gallery-5.jpg", alt: "[Rehearsal photo — describe what's happening]" },
    { image: "assets/images/gallery-6.jpg", alt: "[Rehearsal photo — describe what's happening]" },
  ],

  // ---------------------------------------------------------------------
  // CONTACT PAGE
  // ---------------------------------------------------------------------
  contact: {
    email: "[family-contact@email.com]",
    parkingNote: "[Describe parking — lot location, street parking rules, overflow options.]",
    accessibilityNote: "[Describe accessibility: step-free entrance, accessible restrooms, reserved seating, hearing assistance if available.]",
    directionsNote: "[Any notes on the drive/transit that a map link won't cover — which entrance to use, nearby landmarks.]",
  },

  // ---------------------------------------------------------------------
  // FOOTER SIGN-OFF, in Ani's own voice.
  // ---------------------------------------------------------------------
  footerSignOff: "Thank you for being here for this one. — Ani",
};
