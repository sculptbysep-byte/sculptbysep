/* SculptBySep — article index.
   Titles, slugs, excerpts, dates, read times and categories captured from the live blog.
   Used to build blog.html and the "more articles" block on each article page.
   The slugs must not change — they are the live URLs and carry the SEO. */

const ARTICLES = [
  {
    slug: 'lose-body-fat-busy-professional-without-crash-dieting',
    title: 'How To Lose Body Fat As A Busy Professional Without Crash Dieting',
    excerpt: 'Crash diets destroy energy, focus and progress. A structured approach to losing body fat and keeping it off, without hurting your work performance.',
    date: '2026-02-01',
    displayDate: '1 Feb 2026',
    readTime: '8 min',
    category: 'Fat Loss',
    featured: true
  },
  {
    slug: 'why-most-men-over-30-cant-get-lean',
    title: "The Real Reason Most Men Over 30 Can't Get Lean",
    excerpt: 'Slower metabolism is not why you are stuck. The real cause has very little to do with your age.',
    date: '2026-02-03',
    displayDate: '3 Feb 2026',
    readTime: '7 min',
    category: 'Fat Loss'
  },
  {
    slug: 'online-coaching-vs-in-person-personal-training',
    title: 'Online Coaching vs In-Person Personal Training: Which One Is Right For You',
    excerpt: 'There is no universal answer. The right format depends on your goals, experience, schedule and how you respond to accountability.',
    date: '2026-02-05',
    displayDate: '5 Feb 2026',
    readTime: '7 min',
    category: 'Online Coaching'
  },
  {
    slug: 'how-many-training-sessions-per-week-transformation',
    title: 'How Many Training Sessions Per Week Do You Actually Need To Transform Your Body',
    excerpt: 'More is not always better. How to choose training frequency based on your goal, your schedule and your capacity to recover.',
    date: '2026-02-07',
    displayDate: '7 Feb 2026',
    readTime: '6 min',
    category: 'Training'
  },
  {
    slug: 'building-muscle-after-35-time-poor-executives',
    title: 'Building Muscle After 35: A Practical Guide For Time-Poor Executives',
    excerpt: 'Muscle after thirty five is not just possible, it is one of the highest return investments you can make.',
    date: '2026-02-09',
    displayDate: '9 Feb 2026',
    readTime: '8 min',
    category: 'Muscle Building'
  },
  {
    slug: 'why-most-body-transformation-programs-fail',
    title: 'Why Most Body Transformation Programs Fail After 12 Weeks',
    excerpt: 'Twelve week programs are great marketing. What happens after week twelve is where most of them fall apart.',
    date: '2026-02-11',
    displayDate: '11 Feb 2026',
    readTime: '7 min',
    category: 'Coaching'
  },
  {
    slug: 'macros-calories-sustainable-fat-loss-truth',
    title: 'The Truth About Macros, Calories And Sustainable Fat Loss',
    excerpt: 'You do not need to weigh broccoli forever. The priorities that actually drive fat loss results, in order.',
    date: '2026-02-13',
    displayDate: '13 Feb 2026',
    readTime: '8 min',
    category: 'Nutrition'
  },
  {
    slug: 'train-around-60-hour-work-week',
    title: 'How To Train Around A 60-Hour Work Week And Still Make Progress',
    excerpt: 'Sixty hour weeks do not have to mean no progress. How to adapt training, eating and recovery to a packed calendar.',
    date: '2026-02-15',
    displayDate: '15 Feb 2026',
    readTime: '7 min',
    category: 'Lifestyle'
  },
  {
    slug: 'strength-training-confidence-lifting-rewires-presence',
    title: 'Strength Training For Confidence: How Lifting Rewires The Way You Show Up',
    excerpt: 'The biggest transformation is not the body. What strength training does to confidence, presence and identity.',
    date: '2026-02-17',
    displayDate: '17 Feb 2026',
    readTime: '6 min',
    category: 'Identity & Mindset'
  },
  {
    slug: 'choosing-the-right-online-coach-7-things-to-look-for',
    title: 'Choosing The Right Online Coach: 7 Things To Look For Before You Commit',
    excerpt: 'Choose the wrong coach and it becomes the most expensive PDF you have ever bought. Seven things to check first.',
    date: '2026-02-19',
    displayDate: '19 Feb 2026',
    readTime: '8 min',
    category: 'Online Coaching'
  }
];

if (typeof module !== 'undefined') module.exports = ARTICLES;
