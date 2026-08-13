/**
 * CONTENT.JS — edit this file to update the website. Nothing else needs to change.
 *
 * This is the one place all the real facts about the evening live: the date, venue,
 * bios, photos, the song list, and the guestbook wishes. Every page reads from the
 * `CONTENT` object below and builds itself around it, so you can add a song, swap a
 * bio, or change the venue address here and it will show up correctly everywhere the
 * fact appears (nav bar, hero, program page, footer, etc). You do not need to know
 * HTML or CSS to edit this file — just replace the text inside the quotes ("...").
 * Keep the quotes and commas exactly where they are.
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
    confirmNote: "",
  },

  performer: {
    name: "Ani",
    fullName: "Aniruth Kannan",
  },

  // ---------------------------------------------------------------------
  // EVENT DETAILS — fill these in as soon as they're locked.
  // ---------------------------------------------------------------------
  event: {
    dateDisplay: "Saturday, August 22, 2026",
    seatingTime: "Seating from 2:30 PM · Program begins at 3:00 PM",
    venue: {
      name: "Mt. Pleasant High School",
      addressLine1: "1750 South White Road",
      addressLine2: "San Jose, CA 95127",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Mt.+Pleasant+High+School%2C+1750+South+White+Road%2C+San+Jose%2C+CA+95127",
    },
    chiefGuests: [],
    livestreamUrl: "",
    livestreamNote: "",
  },

  // ---------------------------------------------------------------------
  // HERO CAROUSEL — 4 slides, each with a genuinely different angle.
  // The event strip (date/time/venue/livestream) is NOT part of the
  // slides — it renders once, persistently, underneath them.
  // ---------------------------------------------------------------------
  heroSlides: [
    {
      image: "assets/images/ani-hero-cutout-1-wide.png",
      alt: "Ani seated at the mridangam",
      wide: true,
      width: 1406,
      height: 1119,
      headline: "Two hands, two skins, one cycle.",
      subtitle: "Tonight, Ani keeps the beat the whole room stands on.",
    },
    {
      image: "assets/images/ani-hero-cutout-2.png",
      alt: "Ani performing on stage",
      wide: true,
      width: 1630,
      height: 965,
      headline: "A journey that began at six.",
      subtitle: "Years of listening, practice, and patient guidance lead to this stage.",
    },
    {
      image: "assets/images/ani-hero-cutout-3.png",
      alt: "Ani with his guru and mridangam",
      wide: true,
      width: 1672,
      height: 941,
      headline: "Handed down, rope by rope, beat by beat.",
      subtitle: "A tradition passed from guru to student, one arangetram at a time.",
    },
    {
      image: "assets/images/ani-hero-cutout-4.png",
      alt: "Ani with his mentor",
      wide: true,
      width: 1672,
      height: 941,
      headline: "You're invited to sit close and listen hard.",
      subtitle: "This is the night the counting becomes a concert.",
    },
  ],

  // ---------------------------------------------------------------------
  // WHAT IS AN ARANGETRAM (home page teaser — About page has the full text)
  // ---------------------------------------------------------------------
  arangetramTeaser: {
    paragraph1: "Arangetram means, plainly, \"ascending the stage\" — from the Tamil arangam (stage) and etram (ascent). It is the evening a guru formally presents a student to the public for the first time, after years spent learning in private. Traditionally it marks a beginning, not a graduation: the point at which a student is ready to offer the art on their own.",
    paragraph2: "Ani first sat down at a mridangam at age six. On August 22, he brings years of learning, listening, and performance to this milestone concert.",
    linkText: "Read more about the mridangam and the arangetram",
  },

  // ---------------------------------------------------------------------
  // WELCOME NOTE FROM ANI'S PARENTS — the emotional center of the home page.
  // Write this in two voices, not brochure copy. Name a specific memory.
  // ---------------------------------------------------------------------
  parentsWelcome: {
    photo: "images/Ani family pic.png",
    photoAlt: "Ani with his family",
    paragraphs: [
      "Ani began learning the mridangam at age six as a way to stay engaged and connected to Indian culture. In time, those early lessons grew into a genuine love for Carnatic music.",
      "We have watched him balance school, scouting, sports, and music while learning to listen closely, adapt in the moment, and find his own voice in rhythm.",
      "This arangetram is a joyful milestone in Ani's journey. We are deeply grateful to his guru, the accompanying artists, and every friend and family member gathered to celebrate with him.",
    ],
    signOff: "With love and pride,\nAni's family",
  },

  // ---------------------------------------------------------------------
  // BLESSINGS — seeded wishes shown as a preview on the home page and in
  // full on blessings.html. Vary length and voice; these should read like
  // different people actually wrote them.
  // ---------------------------------------------------------------------
  blessings: [
    {
      name: "Gina Aunty (Big Giiiii)",
      message: "I have had the joy of watching you grow since first grade, and over the years, I have watched those little fingers turn into what I can only describe as a beautiful, perfectly coordinated dance on the mridangam. I may have zero musical knowledge, but I have always been amazed by your magic. What I admire even more is that you are never shy about playing whenever we ask, even when you are tired. Your passion, patience, and dedication have always been wonderful to watch. As you celebrate this very special milestone, I wish you continued success and many more years of making music and sharing your talent with others. May you always play with the same joy and enthusiasm I have seen in you since you were little. You will always have my love, blessings, and very best wishes for a bright and successful future.",
    },
  ],

  // ---------------------------------------------------------------------
  // ABOUT PAGE — Ani's own training story. Keep it concrete: ages, names
  // of teachers, specific pieces or moments, not generic devotion language.
  // ---------------------------------------------------------------------
  aniStory: {
    paragraphs: [
      "Ani began learning the mridangam at age six under the guidance of his guru, Gopi Lakshminarayanan. What started as a way to keep him engaged while staying connected to Indian culture soon grew into a true love for music.",
      "With Carnatic music running through his family, Ani developed a natural appreciation for rhythm and melody. His guru recognized his excellent kala pramanam — his instinctive command of tempo — early on. As Ani progressed from playful lessons to accompanying singers on stage, he learned to listen carefully, adapt in the moment, and grow as a musician.",
      "Some of his treasured experiences include seeing Sudha Ragunathan and Sanjay Subrahmanyan perform live, playing for the Epic Choir at the Cleveland Thyagaraja Festival, and participating in Silicon Andhra's Guinness World Record event for the largest ensemble of drummers.",
      "While balancing school, scouting, sports, and music, Ani continues to flourish. On August 22, he looks forward to performing some of his favorite songs and celebrating an important milestone in his musical journey.",
    ],
  },

  // ---------------------------------------------------------------------
  // ARTISTS — Ani plus every accompanying musician performing tonight.
  // Add or remove entries freely; the page rebuilds itself from this list.
  // ---------------------------------------------------------------------
  artists: [
    {
      name: "Chi. Aniruth Kannan",
      instrument: "Mridangam",
      role: "Performer",
      photo: "images/ani-artist-portrait-sharp.jpg",
      photoAlt: "Portrait of Aniruth Kannan with the mridangam",
      bio: "Ani began studying the mridangam at age six with Guru Gopi Lakshminarayanan. Known for his strong kala pramanam, he has grown from early lessons to accompanying vocalists on stage with attentive, responsive musicianship.",
    },
    {
      name: "Vidwan Dr. Shivkumar Bhat",
      instrument: "Vocal",
      role: "Accompanying Artist",
      photo: "images/sivakumar sir.jpeg",
      photoAlt: "Portrait of vocalist Vidwan Dr. Shivkumar Bhat",
      bio: "Vidwan Dr. Shivkumar Bhat leads the melodic voice of tonight's Carnatic concert, shaping the ragam and lyrical expression to which the ensemble responds.",
    },
    {
      name: "Vidwan VV Ravi",
      instrument: "Violin",
      role: "Accompanying Artist",
      photo: "images/violin.jpg",
      photoAlt: "Portrait of violinist Vidwan VV Ravi",
      bio: "Vidwan VV Ravi joins on violin, echoing and extending the vocalist's melodic ideas through the improvisational conversation at the heart of Carnatic music.",
    },
    {
      name: "Vidwan Ajay Gopi",
      instrument: "Kanjira",
      role: "Accompanying Artist",
      photo: "images/ajay-gopi-portrait.jpg",
      photoAlt: "Portrait of kanjira artist Vidwan Ajay Gopi",
      bio: "Vidwan Ajay Gopi brings the kanjira's crisp, expressive voice to the percussion dialogue, complementing Ani's mridangam throughout the evening.",
    },
  ],

  // ---------------------------------------------------------------------
  // GURU PAGE — this page carries real weight. Do not shorten it to a
  // card. Include the guru's own words about Ani if at all possible.
  // ---------------------------------------------------------------------
  guru: {
    name: "Vidwan Sri Gopi Lakshminarayanan",
    photo: "images/guru-ani-portrait.jpg",
    photoAlt: "Guru Gopi Lakshminarayanan with Ani and a fellow student",
    photo2: "images/guru.jpg",
    photo2Alt: "Guru Gopi Lakshminarayanan on stage",
    lineageParagraph: "Sri Gopi Lakshminarayanan is a disciple of the late Sri Kumbakonam Narayanaswamy Iyer and continues his advanced learning with Sri Thanjavur Ramdoss, a disciple of Sri Palghat Mani Iyer. Through this lineage, the guru–shishya tradition carries Carnatic rhythm from one generation to the next through close listening, demonstration, correction, and trust.",
    teachingParagraph: "Gopi leads the Sharadha School of Thala Vadhya in Fremont and has taught young percussionists in the Bay Area for more than a decade. From Ani's earliest playful lessons to his work accompanying singers on stage, he has helped Ani develop discipline, adaptability, and a strong sense of kala pramanam — the steady command of tempo that anchors an ensemble.",
    wordsAboutStudentHeading: "A journey shaped by guidance",
    wordsAboutStudent: "Tonight celebrates not only a performance, but years of patient learning between guru and student. Every phrase Ani plays carries that shared work forward.",
  },

  // Ani's other guru, shown beneath his primary guru on the Guru page.
  secondaryGurus: [
    {
      name: "Sri Ajay Gopi",
      photo: "images/Ajay.jpg",
      photoAlt: "Portrait of Sri Ajay Gopi",
      bioParagraphs: [
        "Ajay is a disciple of his father, Sri Gopi Lakshminarayanan, and Sri Kallidaikurichi Sivakumar. He frequently accompanies established musicians on the mridangam at renowned venues across the USA and India, and also received foundational training in the kanjira from Sri Papanasam Sethuraman. In addition to his work as an accompanist, Ajay is a passionate Carnatic vocalist and currently trains under the guidance of Sri Kolkata Vijayaraghavan.",
        "A graduate of UC Berkeley, Ajay is also the founder of Laya of Berkeley and RagaN, organizations dedicated to fostering a deeper appreciation of Carnatic music among diverse audiences. He has been training Aniruth for his mridangam arangetram and is a great pillar of support for him.",
      ],
    },
  ],

  // ---------------------------------------------------------------------
  // CHIEF GUEST / GUEST OF HONOR PAGE
  // ---------------------------------------------------------------------
  chiefGuestProfiles: [],

  // ---------------------------------------------------------------------
  // PROGRAM — order of the evening, then the song list. Add, remove, or
  // reorder pieces freely.
  // ---------------------------------------------------------------------
  programOrder: [
    { time: "2:30 PM", item: "Seating begins", note: "Doors open for guests." },
    { time: "3:00 PM", item: "Welcome and introduction", note: "The program begins." },
    { time: "", item: "Concert", note: "Twelve musical selections performed by Ani and the accompanying artists." },
    { time: "", item: "Mangalam", note: "The evening closes with an auspicious benediction." },
  ],

  programPieces: [
    {
      title: "Reethigowla Ata Tala",
      ragam: "Reethigowla",
      thalam: "Ata Tala",
      composer: "",
      note: "An opening composition that establishes the concert's melodic and rhythmic foundation.",
      lyricLine: "",
      isThani: false,
    },
    {
      title: "Nin Pada Bhajanama",
      ragam: "",
      thalam: "",
      composer: "",
      note: "Listen for the ensemble's balance between melodic phrasing and responsive percussion.",
      lyricLine: "",
      isThani: false,
    },
    {
      title: "Entani Vinavintura",
      ragam: "Urmika",
      thalam: "Adi Tala · Tisra Nadai",
      composer: "Pallavi Sesha Iyer",
      note: "A composition in the rare raga Urmika, carried by the threefold pulse of tisra nadai.",
      lyricLine: "",
      isThani: false,
    },
    {
      title: "Chetasri Balakrishnam",
      ragam: "Dwijavanti",
      thalam: "Rupaka Tala",
      composer: "Muthuswami Dikshitar",
      note: "A lyrical composition in Dwijavanti, a raga known for its reflective, expressive character.",
      lyricLine: "",
      isThani: false,
    },
    {
      title: "Thaniga Valar",
      ragam: "Todi",
      thalam: "",
      composer: "Papanasam Sivan",
      note: "A devotional composition set in the expansive raga Todi.",
      lyricLine: "",
      isThani: false,
    },
    {
      title: "Shobhillu Saptaswara",
      ragam: "Jaganmohini",
      thalam: "Rupaka Tala",
      composer: "Saint Tyagaraja",
      note: "A celebration of the radiance of the seven musical notes.",
      lyricLine: "",
      isThani: false,
    },
    {
      title: "Ragam Tanam Pallavi",
      ragam: "To be announced on stage",
      thalam: "To be announced on stage",
      composer: "Improvised",
      note: "The concert's improvisational centerpiece unfolds through raga exploration, rhythmic tanam, and the composed pallavi line. The percussion dialogue comes fully to the foreground here.",
      lyricLine: "",
      isThani: false,
    },
    {
      title: "Asainthadum Mayil",
      ragam: "Simhendramadhyamam",
      thalam: "Adi Tala",
      composer: "Oothukkadu Venkata Kavi",
      note: "A vivid Tamil composition portraying Krishna through the image of a gracefully dancing peacock.",
      lyricLine: "",
      isThani: false,
    },
    {
      title: "Thillana in Kapi",
      ragam: "Kapi",
      thalam: "",
      composer: "",
      note: "A lively, rhythm-forward thillana brings the concert toward its concluding sequence.",
      lyricLine: "",
      isThani: false,
    },
    {
      title: "Vangakkadal",
      ragam: "Surati",
      thalam: "Misra Chapu",
      composer: "Andal · Tiruppavai",
      note: "The concluding verse of Andal's Tiruppavai, set here to the lilting seven-beat Misra Chapu cycle.",
      lyricLine: "",
      isThani: false,
    },
    {
      title: "Karpagame",
      ragam: "Madhyamavati",
      thalam: "Adi Tala",
      composer: "Papanasam Sivan",
      note: "A prayer to Goddess Karpagambal in the auspicious raga Madhyamavati.",
      lyricLine: "",
      isThani: false,
    },
    {
      title: "Mangalam",
      ragam: "",
      thalam: "",
      composer: "Traditional",
      note: "An auspicious benediction closes the concert.",
      lyricLine: "",
      isThani: false,
    },
  ],

  gratitude: "With heartfelt thanks to Guru Gopi Lakshminarayanan; Vidwan Dr. Shivkumar Bhat, Vidwan V. V. Ravi, and Vidwan Ajay Gopi; and to the family, friends, teachers, and community members whose encouragement made this milestone possible.",

  // ---------------------------------------------------------------------
  // GALLERY — training and rehearsal photos. Add or remove freely.
  // ---------------------------------------------------------------------
  gallery: [
    { image: "images/ani with mentor.jpg", alt: "Ani with his mentor" },
    { image: "images/gallery-practice.jpg", alt: "Ani practicing mridangam alongside his teachers" },
    { image: "images/gallery-performance.jpg", alt: "Ani performing on stage with fellow musicians" },
    { image: "images/practice1.jpg", alt: "Ani practicing mridangam" },
    { image: "images/practice2.jpg", alt: "Ani practicing mridangam" },
    { image: "images/practice3.jpg", alt: "Ani practicing mridangam" },
    { image: "images/practice4.jpg", alt: "Ani practicing mridangam" },
    { image: "images/practice5.jpg", alt: "Ani practicing mridangam" },
    { image: "images/practice6.jpg", alt: "Ani practicing mridangam" },
    { image: "images/practice7.jpg", alt: "Ani practicing mridangam" },
    { image: "images/practice8.jpg", alt: "Ani practicing mridangam" },
    { image: "images/practice9.jpg", alt: "Ani practicing mridangam" },
    { image: "images/practice10.png", alt: "Ani practicing mridangam" },
    { image: "images/practice11.jpg", alt: "Ani practicing mridangam" },
  ],

  // ---------------------------------------------------------------------
  // CONTACT PAGE
  // ---------------------------------------------------------------------
  contact: {
    email: "",
    parkingNote: "Please follow event signage and venue staff directions on arrival. Allow a few extra minutes for parking before seating begins at 2:30 PM.",
    accessibilityNote: "For specific accessibility arrangements, please contact the event hosts directly before the program.",
    directionsNote: "Use the South White Road address below. The program begins at 3:00 PM.",
  },

  // ---------------------------------------------------------------------
  // FOOTER SIGN-OFF, in Ani's own voice.
  // ---------------------------------------------------------------------
  footerSignOff: "Thank you for being here. — Ani",
};
