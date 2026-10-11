/* SculptBySep — the real application flow, captured from the live /apply form.
   One definition, used by index.html, apply.html and transformation.html.
   Change a question here and it changes on every page. */

/* ---------------------------------------------------------------------------
   WHERE APPLICATIONS GO

   Applications are emailed by Web3Forms. Get a free access key at
   https://web3forms.com — enter sculptbysep@gmail.com, they email you the key.
   Paste it between the quotes below and every form on the site starts working.

   The key is designed to be public, so it is safe in this file and in the repo.
   It only ever delivers to the address it was issued for — nobody can redirect
   your applications with it.

   Until it is set, forms complete for the applicant but nothing is sent.
   --------------------------------------------------------------------------- */
SculptQuiz.accessKey = '5f49d271-ebc2-4acd-a599-34bded5c0e61';
SculptQuiz.notify = 'New coaching application';

var SCULPT_APPLICATION = [
  {
    label: 'Question 01',
    title: "Where you're stuck",
    sub: 'Pick the one that hits closest to home.',
    q: 'What are you struggling with most right now?',
    opts: [
      'Stubborn body fat that won’t shift',
      'Building muscle despite training hard',
      'Staying consistent with training',
      'Nutrition — what and how much to eat',
      'Time — fitting it around work',
      'Motivation and accountability',
      'Injuries, pain or poor technique',
      'Alcohol, socialising and eating out',
      'Other — I’ll explain'
    ]
  },
  {
    label: 'Question 02',
    title: "What's in the way",
    sub: 'Be honest — this is what shapes your plan.',
    q: 'What usually stops you from getting the results you want?',
    opts: [
      'Work hours and travel',
      'Motivation drops after a few weeks',
      'No clear plan to follow',
      'Nobody holding me accountable',
      'Social events, drinking, eating out',
      'Stress, poor sleep and recovery',
      'Chasing quick fixes then starting over',
      'Injuries or pain',
      'Other — I’ll explain'
    ]
  },
  {
    label: 'Question 03',
    title: 'How long',
    sub: 'No judgement. Most men who apply have been at this a while.',
    q: 'How long have you been trying to achieve this goal?',
    opts: [
      'Less than 3 months',
      '3 – 6 months',
      '6 – 12 months',
      '1 – 3 years',
      'More than 3 years — on and off'
    ]
  },
  {
    label: 'Question 04',
    title: 'Why now',
    sub: 'The reason matters more than the plan.',
    q: 'Why is achieving this goal important to you right now?',
    opts: [
      'I’m not happy with how I look and feel',
      'My confidence has taken a hit',
      'Health markers or energy are declining',
      'I want my body to match my ambition',
      'A specific event or deadline is coming',
      'I’m tired of starting over',
      'Other — I’ll explain'
    ]
  },
  {
    label: 'Almost there',
    title: 'Your name',
    sub: 'So Sep knows who he’s reading about.',
    q: 'What should Sep call you?',
    fields: [
      { id: 'ap-name', label: 'Full name', type: 'text', autocomplete: 'name' }
    ]
  },
  {
    label: 'Last step',
    title: 'How to reach you',
    sub: 'Submit and you can book your call straight away.',
    q: 'Where should Sep reach you?',
    fields: [
      { id: 'ap-phone', label: 'Contact number', type: 'tel', autocomplete: 'tel' },
      { id: 'ap-email', label: 'Email address', type: 'email', autocomplete: 'email' }
    ]
  }
];

/* Landing-page variant: deliberately short for cold ad traffic — two questions
   then contact details. Uses "Where you're stuck" and "How long", skipping
   "What's in the way" and "Why now", which the full /apply form still asks. */
var SCULPT_APPLICATION_SHORT = [SCULPT_APPLICATION[0], SCULPT_APPLICATION[2]].concat([
  {
    label: 'Last step',
    title: 'How to reach you',
    sub: 'Sep reviews every application personally and replies within 24 hours.',
    q: 'Where should Sep reach you?',
    fields: [
      { id: 'lp-name', label: 'Full name', type: 'text', autocomplete: 'name' },
      { id: 'lp-phone', label: 'Contact number', type: 'tel', autocomplete: 'tel' },
      { id: 'lp-email', label: 'Email address', type: 'email', autocomplete: 'email' }
    ]
  }
]);
