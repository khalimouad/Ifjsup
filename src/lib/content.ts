import type { L } from "./i18n";

/* =========================================================
   Contenus éditoriaux IFJ — base : cahier des charges v1.0
   (reprise ifjsup.ma, réécriture moderne, FR + AR)
   ========================================================= */

export const site = {
  name: { fr: "IFJ — Institut Supérieur de Journalisme et d'Information", ar: "المعهد العالي للصحافة والإعلام" } as L,
  shortName: { fr: "IFJ", ar: "IFJ" } as L,
  tagline: {
    fr: "L'école des médias de demain, depuis 1994.",
    ar: "مدرسة إعلام الغد، منذ 1994.",
  } as L,
  email: "contact@ifjsup.ma",
  whatsapp: "+212661962704",
  whatsappDisplay: "06 61 96 27 04",
  social: {
    facebook: "https://www.facebook.com/ifjsup",
    facebookCasa: "https://www.facebook.com/ifjsupCasablanca",
    twitter: "https://twitter.com/IfjGroupe",
    youtube: "https://www.youtube.com/@ifjsup",
    linkedin: "https://www.linkedin.com/school/ifjsup",
    instagram: "https://www.instagram.com/ifjsup",
  },
};

export const stats: { value: string; label: L }[] = [
  { value: "3 250+", label: { fr: "Lauréats diplômés", ar: "خريجًا متخرجًا" } },
  { value: "32", label: { fr: "Années d'expérience", ar: "سنة من الخبرة" } },
  { value: "132", label: { fr: "Unités de formation", ar: "وحدة تكوينية" } },
  { value: "33", label: { fr: "Formateurs experts", ar: "مكوّنًا خبيرًا" } },
];

/* ---------- Campus ---------- */

export type Campus = {
  slug: "casablanca" | "marrakech";
  city: L;
  name: L;
  address: L;
  phones: string[];
  mobile?: string;
  email: string;
  mapQuery: string;
  image: string;
  hours: L;
  intro: L;
  highlights: L[];
};

export const campuses: Campus[] = [
  {
    slug: "casablanca",
    city: { fr: "Casablanca", ar: "الدار البيضاء" },
    name: { fr: "Campus Casablanca — Derb Omar", ar: "حرم الدار البيضاء — درب عمر" },
    address: {
      fr: "97 c, Bd Hassan Seghir, Derb Omar, Casablanca",
      ar: "97 ج، شارع حسن الصغير، درب عمر، الدار البيضاء",
    },
    phones: ["0522-44-29-94", "0522-44-58-49"],
    email: "casablanca@ifjsup.ma",
    mapQuery: "IFJ+Sup+97+Bd+Hassan+Seghir+Derb+Omar+Casablanca",
    image: "/images/plateau-tp.webp",
    hours: {
      fr: "Lun – Ven : 9h00 – 18h00 · Sam : 9h00 – 13h00",
      ar: "الاثنين – الجمعة: 9:00 – 18:00 · السبت: 9:00 – 13:00",
    },
    intro: {
      fr: "Le campus historique de l'IFJ, au cœur de la capitale économique. Plateaux TV, studios radio et régies professionnelles y forment depuis 1994 les journalistes et techniciens des grands médias marocains et internationaux.",
      ar: "الحرم التاريخي للمعهد في قلب العاصمة الاقتصادية. استوديوهات تلفزية وإذاعية وقاعات تحكم احترافية تكوّن منذ 1994 صحافيي وتقنيي كبريات وسائل الإعلام المغربية والدولية.",
    },
    highlights: [
      { fr: "Plateau TV professionnel et régie multi-caméras", ar: "استوديو تلفزي احترافي وقاعة تحكم متعددة الكاميرات" },
      { fr: "Studio radio et cabines de montage", ar: "استوديو إذاعي وقاعات مونتاج" },
      { fr: "Au cœur de Derb Omar, accessible en tramway", ar: "في قلب درب عمر، سهل الوصول عبر الترامواي" },
    ],
  },
  {
    slug: "marrakech",
    city: { fr: "Marrakech", ar: "مراكش" },
    name: { fr: "Campus Marrakech — Guéliz", ar: "حرم مراكش — كليز" },
    address: {
      fr: "23 Angle Yacoub Mansour, Espace Guéliz, 2e étage, Marrakech",
      ar: "23 زاوية يعقوب المنصور، فضاء كليز، الطابق الثاني، مراكش",
    },
    phones: ["0524-43-81-64", "0524-43-97-74"],
    mobile: "0661-96-27-04",
    email: "marrakech@ifjsup.ma",
    mapQuery: "IFJ+Marrakech+23+Angle+Yacoub+Mansour+Gueliz+Marrakech",
    image: "/images/hero-plateau.webp",
    hours: {
      fr: "Lun – Ven : 9h00 – 18h00 · Sam : 9h00 – 13h00",
      ar: "الاثنين – الجمعة: 9:00 – 18:00 · السبت: 9:00 – 13:00",
    },
    intro: {
      fr: "Le campus de Marrakech, en plein Guéliz, ouvre les métiers du journalisme et de l'audiovisuel aux talents du sud du Maroc : mêmes filières accréditées, mêmes équipements, même exigence.",
      ar: "حرم مراكش، في قلب حي كليز، يفتح مهن الصحافة والسمعي البصري أمام مواهب جنوب المغرب: نفس المسالك المعتمدة، نفس التجهيزات، نفس المستوى من الجودة.",
    },
    highlights: [
      { fr: "Filières accréditées identiques à Casablanca", ar: "مسالك معتمدة مطابقة لحرم الدار البيضاء" },
      { fr: "Équipe pédagogique locale dédiée", ar: "فريق تربوي محلي متفرغ" },
      { fr: "En plein centre de Guéliz", ar: "في قلب حي كليز" },
    ],
  },
];

/* ---------- Formations ---------- */

export type Program = {
  slug: string;
  name: L;
  access: L;
  degree: L;
  duration: L;
  /** Durée en années — alimente le filtre de la liste des formations. */
  years: 2 | 3;
  /** Cycle — alimente les puces de filtre en tête de liste. */
  cycle: "superieur" | "professionnel";
  /** Niveau d'entrée — alimente le filtre latéral. */
  entry: "niveau-bac" | "bac" | "bac3";
  accredited: boolean;
  image: string;
  excerpt: L;
  description: L;
  careers: L[];
};

export const programs: Program[] = [
  {
    slug: "journalisme",
    image: "/images/plateau-tp.webp",
    name: { fr: "Journalisme", ar: "الصحافة" },
    access: { fr: "BAC", ar: "الباكالوريا" },
    degree: { fr: "Diplôme de Journalisme BAC+3", ar: "دبلوم الصحافة باك+3" },
    duration: { fr: "3 ans (système LMD)", ar: "3 سنوات (نظام LMD)" },
    years: 3,
    cycle: "superieur",
    entry: "bac",
    accredited: true,
    excerpt: {
      fr: "Presse écrite, web, radio et télévision : la formation de référence pour devenir journaliste polyvalent.",
      ar: "الصحافة المكتوبة والرقمية والإذاعة والتلفزيون: التكوين المرجعي لصحافي متعدد المهارات.",
    },
    description: {
      fr: "La filière Journalisme forme des journalistes complets, capables d'enquêter, d'écrire, de présenter et de produire sur tous les supports : presse écrite, web, radio et télévision. Le cursus alterne fondamentaux (déontologie, droit de la presse, techniques rédactionnelles, langues) et pratique intensive sur les plateaux TV, studios radio et rédactions-écoles de l'institut. Les étudiants réalisent reportages, journaux et magazines dans des conditions professionnelles, encadrés par des journalistes en exercice.",
      ar: "يكوّن مسلك الصحافة صحافيين متكاملين قادرين على التحقيق والكتابة والتقديم والإنتاج عبر جميع الوسائط: الصحافة المكتوبة والرقمية والإذاعة والتلفزيون. يجمع المسار بين الأساسيات (أخلاقيات المهنة، قانون الصحافة، تقنيات التحرير، اللغات) والممارسة المكثفة في الاستوديوهات التلفزية والإذاعية وقاعات التحرير التطبيقية، بتأطير من صحافيين ممارسين.",
    },
    careers: [
      { fr: "Journaliste TV, radio, presse et web", ar: "صحافي تلفزيون وإذاعة وصحافة مكتوبة ورقمية" },
      { fr: "Présentateur / animateur", ar: "مقدّم برامج / منشط" },
      { fr: "Reporter, correspondant", ar: "مراسل صحفي" },
      { fr: "Rédacteur en chef adjoint, secrétaire de rédaction", ar: "مساعد رئيس تحرير، سكرتير تحرير" },
    ],
  },
  {
    slug: "ingenierie-audiovisuelle",
    image: "/images/regie.webp",
    name: {
      fr: "Ingénierie en Technologie de l'Information Audiovisuelle",
      ar: "هندسة تكنولوجيا المعلومات السمعية البصرية",
    },
    access: { fr: "BAC", ar: "الباكالوريا" },
    degree: { fr: "Diplôme d'Ingénierie BAC+3", ar: "دبلوم الهندسة باك+3" },
    duration: { fr: "3 ans (système LMD)", ar: "3 سنوات (نظام LMD)" },
    years: 3,
    cycle: "superieur",
    entry: "bac",
    accredited: true,
    excerpt: {
      fr: "Régie, captation, diffusion, streaming : maîtrisez la technologie qui fait tourner les médias.",
      ar: "الإخراج التقني والتصوير والبث: تحكّم في التكنولوجيا التي تشغّل وسائل الإعلام.",
    },
    description: {
      fr: "Cette filière forme les ingénieurs et cadres techniques de l'audiovisuel : captation multi-caméras, régie de direct, ingénierie du son, diffusion broadcast et streaming, infrastructures IP des médias. Les étudiants travaillent sur les équipements professionnels de l'institut — plateaux, régies, sonorisation, prompteur — et apprennent à concevoir, exploiter et maintenir une chaîne de production audiovisuelle complète.",
      ar: "يكوّن هذا المسلك مهندسي وأطر التقنيات السمعية البصرية: التصوير متعدد الكاميرات، إخراج البث المباشر، هندسة الصوت، البث التلفزي والرقمي، والبنيات التحتية الإعلامية. يتدرب الطلبة على التجهيزات الاحترافية للمعهد ويتعلمون تصميم وتشغيل وصيانة سلسلة إنتاج سمعي بصري متكاملة.",
    },
    careers: [
      { fr: "Ingénieur broadcast / diffusion", ar: "مهندس بث تلفزي" },
      { fr: "Réalisateur technique, chef de régie", ar: "مخرج تقني، رئيس قاعة التحكم" },
      { fr: "Ingénieur du son", ar: "مهندس صوت" },
      { fr: "Responsable streaming et médias numériques", ar: "مسؤول البث الرقمي والوسائط" },
    ],
  },
  {
    slug: "medias-numeriques",
    image: "/images/montage.webp",
    name: { fr: "Médias Numériques", ar: "الإعلام الرقمي" },
    access: { fr: "BAC+3 / Licence", ar: "باك+3 / الإجازة" },
    degree: { fr: "Diplôme Médias Numériques", ar: "دبلوم الإعلام الرقمي" },
    duration: { fr: "2 ans", ar: "سنتان" },
    years: 2,
    cycle: "superieur",
    entry: "bac3",
    accredited: true,
    excerpt: {
      fr: "Journalisme digital, réseaux sociaux, data et création de contenu : le média à l'ère des plateformes.",
      ar: "الصحافة الرقمية وشبكات التواصل وصناعة المحتوى: الإعلام في عصر المنصات.",
    },
    description: {
      fr: "Ouverte aux titulaires d'une licence, la filière Médias Numériques forme des professionnels du contenu digital : journalisme web et mobile, gestion de communautés, stratégie éditoriale sur les réseaux sociaux, data-journalisme, production vidéo pour les plateformes, podcast. Un cursus tourné vers les nouveaux formats et les nouveaux usages, là où se joue l'avenir de l'information.",
      ar: "مسلك مفتوح لحاملي الإجازة، يكوّن مهنيي المحتوى الرقمي: صحافة الويب والموبايل، إدارة المجتمعات الرقمية، الاستراتيجية التحريرية على الشبكات الاجتماعية، صحافة البيانات، إنتاج الفيديو للمنصات، والبودكاست. مسار موجّه نحو الصيغ الجديدة حيث يُصنع مستقبل الإعلام.",
    },
    careers: [
      { fr: "Journaliste web / mobile", ar: "صحافي رقمي" },
      { fr: "Community & content manager", ar: "مدير مجتمعات ومحتوى" },
      { fr: "Data-journaliste", ar: "صحافي بيانات" },
      { fr: "Producteur de podcasts et formats vidéo", ar: "منتج بودكاست وصيغ فيديو" },
    ],
  },
  {
    slug: "diplomatie-sportive",
    image: "/images/background.webp",
    name: { fr: "Diplomatie Sportive", ar: "الدبلوماسية الرياضية" },
    access: { fr: "BAC+3 / Licence", ar: "باك+3 / الإجازة" },
    degree: { fr: "Diplôme de Diplomatie Sportive", ar: "دبلوم الدبلوماسية الرياضية" },
    duration: { fr: "2 ans", ar: "سنتان" },
    years: 2,
    cycle: "superieur",
    entry: "bac3",
    accredited: false,
    excerpt: {
      fr: "Communication, événementiel et relations internationales du sport — un cursus unique au Maroc.",
      ar: "التواصل والتظاهرات والعلاقات الدولية في الرياضة — مسار فريد في المغرب.",
    },
    description: {
      fr: "À l'heure où le Maroc accueille les plus grands événements sportifs internationaux, la filière Diplomatie Sportive forme des spécialistes de la communication, du protocole et des relations internationales appliqués au sport : organisation d'événements, relations presse, gestion d'image des institutions et des athlètes, géopolitique du sport.",
      ar: "في وقت يحتضن فيه المغرب كبرى التظاهرات الرياضية الدولية، يكوّن هذا المسلك متخصصين في التواصل والبروتوكول والعلاقات الدولية الرياضية: تنظيم التظاهرات، العلاقات الصحفية، إدارة صورة المؤسسات والرياضيين، وجيوسياسية الرياضة.",
    },
    careers: [
      { fr: "Chargé de communication d'institutions sportives", ar: "مكلف بالتواصل في المؤسسات الرياضية" },
      { fr: "Responsable relations presse et protocole", ar: "مسؤول العلاقات الصحفية والبروتوكول" },
      { fr: "Chef de projet événementiel sportif", ar: "مدير مشاريع التظاهرات الرياضية" },
    ],
  },
  {
    slug: "technicien-journalisme",
    image: "/images/prompteur.webp",
    name: { fr: "Technicien en Journalisme", ar: "تقني في الصحافة" },
    access: { fr: "Niveau BAC", ar: "مستوى الباكالوريا" },
    degree: { fr: "Diplôme de Technicien en Journalisme", ar: "دبلوم تقني في الصحافة" },
    duration: { fr: "2 ans", ar: "سنتان" },
    years: 2,
    cycle: "professionnel",
    entry: "niveau-bac",
    accredited: true,
    excerpt: {
      fr: "Une voie professionnalisante accessible dès le niveau bac pour entrer vite dans les rédactions.",
      ar: "مسار مهني متاح من مستوى الباكالوريا للالتحاق سريعًا بقاعات التحرير.",
    },
    description: {
      fr: "Accessible dès le niveau bac, cette formation professionnelle de deux ans donne les bases solides du métier : techniques rédactionnelles, prise d'image et de son, montage, culture des médias. Elle mène directement à l'emploi comme assistant de rédaction ou technicien de production, et peut ouvrir vers la poursuite d'études au sein de l'institut.",
      ar: "تكوين مهني من سنتين متاح من مستوى الباكالوريا، يمنح أساسيات المهنة: تقنيات التحرير، التقاط الصورة والصوت، المونتاج، وثقافة الإعلام. يؤدي مباشرة إلى سوق الشغل كمساعد تحرير أو تقني إنتاج، مع إمكانية متابعة الدراسة داخل المعهد.",
    },
    careers: [
      { fr: "Assistant de rédaction", ar: "مساعد تحرير" },
      { fr: "Technicien de production éditoriale", ar: "تقني إنتاج تحريري" },
      { fr: "JRI junior (journaliste reporter d'images)", ar: "مراسل مصوّر مبتدئ" },
    ],
  },
  {
    slug: "technicien-audiovisuel",
    image: "/images/plateau-tav.webp",
    name: { fr: "Technicien en Audiovisuel", ar: "تقني في السمعي البصري" },
    access: { fr: "Niveau BAC", ar: "مستوى الباكالوريا" },
    degree: { fr: "Diplôme de Technicien en Audiovisuel", ar: "دبلوم تقني في السمعي البصري" },
    duration: { fr: "2 ans", ar: "سنتان" },
    years: 2,
    cycle: "professionnel",
    entry: "niveau-bac",
    accredited: true,
    excerpt: {
      fr: "Caméra, son, lumière, montage : les métiers techniques des plateaux, en deux ans.",
      ar: "الكاميرا والصوت والإضاءة والمونتاج: المهن التقنية للاستوديوهات في سنتين.",
    },
    description: {
      fr: "Cette formation professionnelle de deux ans, accessible dès le niveau bac, forme les techniciens des plateaux et des tournages : cadrage, prise de son, éclairage, montage, assistanat de régie. L'apprentissage est essentiellement pratique, sur les équipements professionnels des deux campus.",
      ar: "تكوين مهني من سنتين متاح من مستوى الباكالوريا، يكوّن تقنيي الاستوديوهات والتصوير: التأطير، التقاط الصوت، الإضاءة، المونتاج، ومساعدة الإخراج. التعلم عملي أساسًا على التجهيزات الاحترافية للحرمين.",
    },
    careers: [
      { fr: "Cadreur / opérateur de prise de vues", ar: "مصوّر / مشغّل كاميرا" },
      { fr: "Technicien son et lumière", ar: "تقني صوت وإضاءة" },
      { fr: "Monteur", ar: "مركّب (مونتير)" },
      { fr: "Assistant de régie / plateau", ar: "مساعد إخراج / بلاطو" },
    ],
  },
];

/* ---------- Actualités ---------- */

export type Article = {
  slug: string;
  title: L;
  category: L;
  date: string;
  archive?: boolean;
  image: string;
  excerpt: L;
  body: L[];
};

export const articles: Article[] = [
  {
    slug: "nouveau-site-ifj-2026",
    image: "/images/background.webp",
    title: {
      fr: "L'IFJ fait peau neuve : nouveau site, nouvelle ambition pour ses deux campus",
      ar: "المعهد العالي للصحافة يتجدد: موقع جديد وطموح جديد لحرميه",
    },
    category: { fr: "Institut", ar: "المعهد" },
    date: "2026-09-01",
    excerpt: {
      fr: "À l'occasion de la rentrée 2026, l'institut lance son nouveau site et renforce son offre sur Casablanca et Marrakech.",
      ar: "بمناسبة الدخول الجامعي 2026، يطلق المعهد موقعه الجديد ويعزز عرضه في الدار البيضاء ومراكش.",
    },
    body: [
      {
        fr: "Trente-deux ans après sa fondation, l'IFJ ouvre un nouveau chapitre. Le nouveau site web de l'institut, pensé d'abord pour le mobile, présente l'ensemble des filières accréditées, les deux campus de Casablanca et Marrakech, et permet de candidater en quelques minutes depuis un smartphone.",
        ar: "بعد اثنين وثلاثين عامًا على تأسيسه، يفتح المعهد فصلًا جديدًا. الموقع الجديد، المصمَّم أولًا للهاتف المحمول، يعرض جميع المسالك المعتمدة وحرمَي الدار البيضاء ومراكش، ويتيح الترشح في دقائق من الهاتف الذكي.",
      },
      {
        fr: "Les demandes d'information et d'inscription peuvent désormais être adressées directement au campus de son choix, par formulaire, téléphone ou WhatsApp.",
        ar: "يمكن الآن توجيه طلبات المعلومات والتسجيل مباشرة إلى الحرم المختار، عبر الاستمارة أو الهاتف أو واتساب.",
      },
    ],
  },
  {
    slug: "partenariat-institut-aljazeera",
    image: "/images/partenariat.webp",
    title: {
      fr: "Partenariat avec l'Institut Aljazeera des Médias : formation « Présentateur TV »",
      ar: "شراكة مع معهد الجزيرة للإعلام: تكوين «مقدّم تلفزيوني»",
    },
    category: { fr: "Partenariats", ar: "شراكات" },
    date: "2018-05-14",
    archive: true,
    excerpt: {
      fr: "L'IFJ et l'Institut Aljazeera des Médias ont organisé ensemble une formation certifiante de présentateur TV sur le campus de Casablanca.",
      ar: "نظّم المعهد ومعهد الجزيرة للإعلام تكوينًا معتمدًا لمقدّمي التلفزيون في حرم الدار البيضاء.",
    },
    body: [
      {
        fr: "Dans le cadre de son partenariat avec l'Institut Aljazeera des Médias, l'IFJ a accueilli une session de formation « Présentateur TV » animée par des formateurs de la chaîne. Les participants ont travaillé la présentation en plateau, le prompteur et la voix, dans les conditions réelles d'un journal télévisé.",
        ar: "في إطار شراكته مع معهد الجزيرة للإعلام، احتضن المعهد دورة تكوينية في «تقديم البرامج التلفزيونية» أطّرها مكوّنون من القناة، شملت الأداء أمام الكاميرا واستعمال الملقّن والتحكم في الصوت في ظروف نشرة أخبار حقيقية.",
      },
    ],
  },
  {
    slug: "conseil-national-presse",
    image: "/images/plateau-tav.webp",
    title: {
      fr: "L'IFJ partenaire des travaux du Conseil national de la presse",
      ar: "المعهد شريك في أشغال المجلس الوطني للصحافة",
    },
    category: { fr: "Institut", ar: "المعهد" },
    date: "2018-11-02",
    archive: true,
    excerpt: {
      fr: "L'institut a pris part aux travaux et rencontres accompagnant la mise en place du Conseil national de la presse.",
      ar: "شارك المعهد في الأشغال واللقاءات المواكبة لتأسيس المجلس الوطني للصحافة.",
    },
    body: [
      {
        fr: "Fidèle à son engagement pour la professionnalisation du secteur, l'IFJ a participé aux rencontres accompagnant l'installation du Conseil national de la presse, aux côtés des instances professionnelles et des médias nationaux.",
        ar: "وفاءً لالتزامه بمهنية القطاع، شارك المعهد في اللقاءات المواكبة لتنصيب المجلس الوطني للصحافة، إلى جانب الهيئات المهنية ووسائل الإعلام الوطنية.",
      },
    ],
  },
  {
    slug: "trophee-deontologie",
    image: "/images/news-aljazeera.webp",
    title: {
      fr: "Trophée de la déontologie : l'éthique au cœur de la formation",
      ar: "جائزة أخلاقيات المهنة: الأخلاقيات في صميم التكوين",
    },
    category: { fr: "Vie étudiante", ar: "الحياة الطلابية" },
    date: "2018-06-20",
    archive: true,
    excerpt: {
      fr: "L'institut a été distingué pour son engagement en faveur de la déontologie journalistique.",
      ar: "تم تكريم المعهد لالتزامه بأخلاقيات مهنة الصحافة.",
    },
    body: [
      {
        fr: "La déontologie est au cœur du projet pédagogique de l'IFJ depuis sa création. Cette distinction récompense un enseignement où l'éthique du métier est présente dans chaque module, de la première année au projet de fin d'études.",
        ar: "تحتل أخلاقيات المهنة قلب المشروع البيداغوجي للمعهد منذ تأسيسه. وتكافئ هذه الجائزة تعليمًا تحضر فيه أخلاقيات المهنة في كل وحدة، من السنة الأولى إلى مشروع نهاية الدراسة.",
      },
    ],
  },
  {
    slug: "soutenances-pfe",
    image: "/images/montage.webp",
    title: {
      fr: "Soutenances des projets de fin d'études : le grand oral des futurs journalistes",
      ar: "مناقشات مشاريع نهاية الدراسة: الاختبار الكبير لصحافيي الغد",
    },
    category: { fr: "Vie étudiante", ar: "الحياة الطلابية" },
    date: "2018-07-10",
    archive: true,
    excerpt: {
      fr: "Reportages, documentaires, magazines : les étudiants ont défendu leurs projets devant un jury de professionnels.",
      ar: "روبورتاجات ووثائقيات ومجلات: دافع الطلبة عن مشاريعهم أمام لجنة من المهنيين.",
    },
    body: [
      {
        fr: "Chaque année, les soutenances de PFE sont le point d'orgue du cursus : les étudiants présentent reportages, documentaires et magazines réalisés dans les conditions du réel, devant un jury composé d'enseignants et de professionnels des médias.",
        ar: "تشكل مناقشات مشاريع نهاية الدراسة كل سنة ذروة المسار: يقدّم الطلبة روبورتاجات ووثائقيات ومجلات أُنجزت في ظروف مهنية حقيقية، أمام لجنة من الأساتذة ومهنيي الإعلام.",
      },
    ],
  },
];

/* ---------- Partenaires ---------- */

export const partners: { name: string; nameAr: string }[] = [
  { name: "Institut Aljazeera des Médias", nameAr: "معهد الجزيرة للإعلام" },
  { name: "EDJ", nameAr: "EDJ" },
  { name: "Faculté Béni Mellal", nameAr: "كلية بني ملال" },
  { name: "Académie du Grand Casablanca", nameAr: "أكاديمية الدار البيضاء الكبرى" },
  { name: "Commune Aïn Chock", nameAr: "جماعة عين الشق" },
];

/* ---------- Services / atouts ---------- */

export const services: { title: L; text: L }[] = [
  {
    title: { fr: "Enseignants du métier", ar: "أساتذة ممارسون" },
    text: {
      fr: "Un corps professoral composé de journalistes et techniciens en exercice dans les médias nationaux et internationaux.",
      ar: "هيئة تدريس من صحافيين وتقنيين يمارسون المهنة في وسائل إعلام وطنية ودولية.",
    },
  },
  {
    title: { fr: "Formation diplômante accréditée", ar: "تكوين معتمد بشهادات" },
    text: {
      fr: "Toutes les filières du cycle supérieur et de la formation professionnelle sont accréditées.",
      ar: "جميع مسالك السلك العالي والتكوين المهني معتمدة رسميًا.",
    },
  },
  {
    title: { fr: "Stages et immersion", ar: "تداريب وانغماس مهني" },
    text: {
      fr: "Stages en rédaction et en production tout au long du cursus, grâce au réseau de partenaires médias de l'institut.",
      ar: "تداريب في قاعات التحرير والإنتاج طيلة المسار بفضل شبكة الشركاء الإعلاميين للمعهد.",
    },
  },
  {
    title: { fr: "Clubs et vie étudiante", ar: "أندية وحياة طلابية" },
    text: {
      fr: "Activités para-universitaires, clubs médias et accompagnement des projets personnels des étudiants.",
      ar: "أنشطة موازية وأندية إعلامية ومواكبة للمشاريع الشخصية للطلبة.",
    },
  },
  {
    title: { fr: "Formation continue", ar: "تكوين مستمر" },
    text: {
      fr: "Des cycles courts et certifiants pour les professionnels en activité et en reconversion.",
      ar: "دورات قصيرة ومعتمدة للمهنيين الممارسين والراغبين في إعادة التوجيه.",
    },
  },
  {
    title: { fr: "Équipements professionnels", ar: "تجهيزات احترافية" },
    text: {
      fr: "Plateaux TV, régies, studios son, montage et prompteur : les mêmes outils que dans les grands médias.",
      ar: "استوديوهات تلفزية وقاعات تحكم واستوديوهات صوت ومونتاج وملقّن: نفس أدوات كبريات وسائل الإعلام.",
    },
  },
];

/* ---------- FAQ ---------- */

export const faq: { q: L; a: L }[] = [
  {
    q: { fr: "Quelle est la durée des formations ?", ar: "ما هي مدة التكوينات؟" },
    a: {
      fr: "Niveau bac : 2 ans. Bacheliers : 3 ans (système LMD). Titulaires d'un BAC+3 ou d'une licence : 2 ans.",
      ar: "مستوى الباكالوريا: سنتان. حاملو الباكالوريا: 3 سنوات (نظام LMD). حاملو باك+3 أو الإجازة: سنتان.",
    },
  },
  {
    q: { fr: "Les filières sont-elles accréditées ?", ar: "هل المسالك معتمدة؟" },
    a: {
      fr: "Oui. Toutes les filières de l'institut — cycle supérieur comme formation professionnelle — sont accréditées.",
      ar: "نعم. جميع مسالك المعهد — السلك العالي والتكوين المهني — معتمدة رسميًا.",
    },
  },
  {
    q: { fr: "Peut-on s'inscrire sans baccalauréat ?", ar: "هل يمكن التسجيل بدون باكالوريا؟" },
    a: {
      fr: "Oui. L'institut propose des formations diplômantes adaptées à chaque niveau : niveau bac, bac, et licence/BAC+3.",
      ar: "نعم. يقترح المعهد تكوينات بشهادات ملائمة لكل مستوى: مستوى الباكالوريا، الباكالوريا، والإجازة/باك+3.",
    },
  },
  {
    q: { fr: "Dans quel campus puis-je étudier ?", ar: "في أي حرم يمكنني الدراسة؟" },
    a: {
      fr: "L'IFJ dispose de deux campus : Casablanca (Derb Omar) et Marrakech (Guéliz). Les filières et les diplômes sont identiques ; choisissez le campus le plus proche de chez vous.",
      ar: "يتوفر المعهد على حرمين: الدار البيضاء (درب عمر) ومراكش (كليز). المسالك والشهادات متطابقة؛ اختر الحرم الأقرب إليك.",
    },
  },
  {
    q: { fr: "Comment se déroule l'admission ?", ar: "كيف يتم القبول؟" },
    a: {
      fr: "Déposez une demande via le formulaire en ligne, par téléphone ou par WhatsApp. L'équipe du campus choisi vous recontacte pour un entretien d'orientation, puis vous accompagne dans la constitution du dossier d'inscription.",
      ar: "قدّم طلبك عبر الاستمارة الإلكترونية أو الهاتف أو واتساب. يتواصل معك فريق الحرم المختار لإجراء مقابلة توجيهية، ثم يواكبك في إعداد ملف التسجيل.",
    },
  },
];

/* ---------- Chiffres clés (cartes du héros) ---------- */

/** Les quatre cartes flottantes du héros. `icon` renvoie au jeu d'icônes. */
export const keyFigures: { value: string; label: L; icon: string; gold?: boolean }[] = [
  { value: "1994", label: { fr: "Année de création", ar: "سنة التأسيس" }, icon: "cap" },
  { value: "3 250+", label: { fr: "Lauréats diplômés", ar: "خريجًا متخرجًا" }, icon: "users" },
  { value: "132", label: { fr: "Unités de formation", ar: "وحدة تكوينية" }, icon: "trophy", gold: true },
  { value: "33", label: { fr: "Formateurs experts", ar: "مكوّنًا خبيرًا" }, icon: "handshake", gold: true },
];

/* ---------- Bandeau équipements ---------- */

export const facilities: { title: L; sub: L; icon: string; accent?: boolean }[] = [
  {
    icon: "tv",
    title: { fr: "Plateaux TV", ar: "استوديوهات تلفزية" },
    sub: { fr: "Multi-caméras", ar: "متعددة الكاميرات" },
  },
  {
    icon: "monitor",
    accent: true,
    title: { fr: "Régies de direct", ar: "قاعات التحكم" },
    sub: { fr: "Captation et diffusion", ar: "التصوير والبث" },
  },
  {
    icon: "mic",
    title: { fr: "Studios radio & son", ar: "استوديوهات إذاعة وصوت" },
    sub: { fr: "Prise de son, podcast", ar: "التقاط الصوت والبودكاست" },
  },
  {
    icon: "film",
    accent: true,
    title: { fr: "Salles de montage", ar: "قاعات المونتاج" },
    sub: { fr: "Postes professionnels", ar: "محطات احترافية" },
  },
  {
    icon: "newsroom",
    title: { fr: "Rédactions-écoles", ar: "قاعات تحرير تطبيقية" },
    sub: { fr: "Presse, web et mobile", ar: "صحافة مكتوبة ورقمية" },
  },
  {
    icon: "ai",
    accent: true,
    title: { fr: "Médias numériques", ar: "الإعلام الرقمي" },
    sub: { fr: "Data et réseaux sociaux", ar: "البيانات والشبكات" },
  },
];

/* ---------- Atouts campus (bandeau bas de page campus) ---------- */

export const campusFeatures: { title: L; sub: L; icon: string; gold?: boolean }[] = [
  {
    icon: "building",
    title: { fr: "Campus en centre-ville", ar: "حرم في وسط المدينة" },
    sub: { fr: "Accessible en transports", ar: "سهل الوصول بالنقل العمومي" },
  },
  {
    icon: "monitor",
    gold: true,
    title: { fr: "Équipements professionnels", ar: "تجهيزات احترافية" },
    sub: { fr: "Plateaux, régies, studios", ar: "استوديوهات وقاعات تحكم" },
  },
  {
    icon: "users",
    title: { fr: "Accompagnement", ar: "مواكبة" },
    sub: { fr: "Suivi personnalisé", ar: "تتبع شخصي" },
  },
  {
    icon: "checkCircle",
    gold: true,
    title: { fr: "Clubs & vie étudiante", ar: "أندية وحياة طلابية" },
    sub: { fr: "Activités para-universitaires", ar: "أنشطة موازية" },
  },
  {
    icon: "books",
    title: { fr: "Médiathèque", ar: "مكتبة إعلامية" },
    sub: { fr: "Ressources & archives", ar: "موارد وأرشيف" },
  },
];

/* ---------- Documents d'inscription ---------- */

export const admissionDocs: L[] = [
  { fr: "Copie du baccalauréat ou du relevé de notes", ar: "نسخة من الباكالوريا أو بيان النقط" },
  { fr: "Copies des relevés de notes", ar: "نسخ من بيانات النقط" },
  { fr: "Copie de la carte d'identité nationale", ar: "نسخة من البطاقة الوطنية للتعريف" },
  { fr: "Photos d'identité récentes", ar: "صور شخصية حديثة" },
  { fr: "Curriculum vitæ à jour", ar: "سيرة ذاتية محدّثة" },
  { fr: "Lettre de motivation", ar: "رسالة تحفيزية" },
];

/* ---------- Témoignage (carte d'accueil) ---------- */

export const testimonial = {
  quote: {
    fr: "« J'ai appris le métier sur un vrai plateau, avec des journalistes en exercice. Le jour de mon premier direct en télévision, je savais déjà quoi faire. »",
    ar: "«تعلّمت المهنة في استوديو حقيقي مع صحافيين ممارسين. يوم أول بث مباشر لي على التلفزيون، كنت أعرف مسبقًا ما ينبغي فعله.»",
  } as L,
  author: { fr: "Lauréate de la filière Journalisme", ar: "خريجة مسلك الصحافة" } as L,
  meta: { fr: "Campus de Casablanca", ar: "حرم الدار البيضاء" } as L,
  image: "/images/prompteur.webp",
};

/* ---------- Galerie ---------- */

export const galleryAlbums: { slug: string; title: L; campus: L; count: number; tone: number; image: string }[] = [
  { slug: "plateaux-tv", image: "/images/hero-plateau.webp", title: { fr: "Plateaux TV", ar: "الاستوديوهات التلفزية" }, campus: { fr: "Casablanca", ar: "الدار البيضاء" }, count: 18, tone: 0 },
  { slug: "regies", image: "/images/regie.webp", title: { fr: "Régies de direct", ar: "قاعات التحكم" }, campus: { fr: "Casablanca", ar: "الدار البيضاء" }, count: 12, tone: 1 },
  { slug: "studios-son", image: "/images/regie-emission.webp", title: { fr: "Studios son & sonorisation", ar: "استوديوهات الصوت" }, campus: { fr: "Casablanca", ar: "الدار البيضاء" }, count: 9, tone: 2 },
  { slug: "montage", image: "/images/montage.webp", title: { fr: "Salles de montage", ar: "قاعات المونتاج" }, campus: { fr: "Marrakech", ar: "مراكش" }, count: 10, tone: 3 },
  { slug: "evenements", image: "/images/partenariat.webp", title: { fr: "Événements & conférences", ar: "تظاهرات وندوات" }, campus: { fr: "Deux campus", ar: "الحرمان معًا" }, count: 24, tone: 4 },
  { slug: "projets-etudiants", image: "/images/prompteur.webp", title: { fr: "Projets étudiants", ar: "مشاريع الطلبة" }, campus: { fr: "Deux campus", ar: "الحرمان معًا" }, count: 16, tone: 5 },
];
