import { ChakraInfo, Question } from './types';

export const CHAKRAS: ChakraInfo[] = [
  {
    id: 'root',
    name: 'Root',
    sanskritName: 'Muladhara',
    color: '#FF0000',
    element: 'Earth',
    location: 'Base of Spine',
    symbol: '🔴',
    description: 'Foundation, security, and stability.'
  },
  {
    id: 'sacral',
    name: 'Sacral',
    sanskritName: 'Svadhisthana',
    color: '#FF7F00',
    element: 'Water',
    location: 'Lower Abdomen',
    symbol: '🟠',
    description: 'Creativity, sexuality, and emotions.'
  },
  {
    id: 'solar',
    name: 'Solar Plexus',
    sanskritName: 'Manipura',
    color: '#FFFF00',
    element: 'Fire',
    location: 'Upper Abdomen',
    symbol: '🟡',
    description: 'Confidence, power, and self-esteem.'
  },
  {
    id: 'heart',
    name: 'Heart',
    sanskritName: 'Anahata',
    color: '#00FF00',
    element: 'Air',
    location: 'Center of Chest',
    symbol: '🟢',
    description: 'Love, compassion, and connection.'
  },
  {
    id: 'throat',
    name: 'Throat',
    sanskritName: 'Vishuddha',
    color: '#0000FF',
    element: 'Ether',
    location: 'Throat',
    symbol: '🔵',
    description: 'Communication, truth, and expression.'
  },
  {
    id: 'third-eye',
    name: 'Third Eye',
    sanskritName: 'Ajna',
    color: '#4B0082',
    element: 'Light',
    location: 'Between Eyebrows',
    symbol: '🟣',
    description: 'Intuition, imagination, and wisdom.'
  },
  {
    id: 'crown',
    name: 'Crown',
    sanskritName: 'Sahasrara',
    color: '#9400D3',
    element: 'Thought',
    location: 'Top of Head',
    symbol: '⚪',
    description: 'Spirituality, enlightenment, and cosmic consciousness.'
  }
];

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "It's a Sunday morning. Your relative calls to say they're 'just passing by' and will be at your house in 10 minutes. Your reaction?",
    options: [
      { text: "Panic! Start cleaning like a whirlwind while yelling at everyone.", impact: { solar: 2, root: -1 } },
      { text: "Warmly welcome them, even if the house is a mess. Chai is always ready.", impact: { heart: 2, root: 1 } },
      { text: "Pretend you're not home. Silence the doorbell.", impact: { root: 2, throat: -1 } },
      { text: "Tell them exactly why it's a bad time. Boundaries are key.", impact: { throat: 2, solar: 1 } }
    ]
  },
  {
    id: 2,
    text: "You see a beautiful silk saree in a shop window. What goes through your mind?",
    options: [
      { text: "I deserve this. It will make me feel like a queen.", impact: { solar: 2, sacral: 1 } },
      { text: "Can I find a similar one for half the price in Chandni Chowk?", impact: { root: 2 } },
      { text: "I'll buy it for my daughter/sister. She'd look lovely in it.", impact: { heart: 2 } },
      { text: "I wonder about the weaver's story and the history of this pattern.", impact: { thirdEye: 2, crown: 1 } }
    ]
  },
  {
    id: 3,
    text: "When you're in a heated argument with your mother-in-law or a boss, you usually:",
    options: [
      { text: "Stay silent but fume inside. My eyes say it all.", impact: { throat: -2, solar: 1 } },
      { text: "Speak my truth clearly and respectfully.", impact: { throat: 2, heart: 1 } },
      { text: "Cry. It's just too much emotion.", impact: { sacral: 2, heart: 1 } },
      { text: "Logic my way out of it. I have a point for everything.", impact: { solar: 2, thirdEye: 1 } }
    ]
  },
  {
    id: 4,
    text: "Your favorite way to spend a rainy afternoon is:",
    options: [
      { text: "Dancing in the rain like a Bollywood star.", impact: { sacral: 2, heart: 1 } },
      { text: "Curled up with a book and ginger chai.", impact: { root: 2, thirdEye: 1 } },
      { text: "Meditating or journaling about my dreams.", impact: { crown: 2, thirdEye: 2 } },
      { text: "Cooking a feast for the whole family.", impact: { heart: 2, root: 1 } }
    ]
  },
  {
    id: 5,
    text: "How often do you trust your 'gut feeling' about a person?",
    options: [
      { text: "Always. My intuition has never failed me.", impact: { thirdEye: 2, crown: 1 } },
      { text: "Rarely. I need facts and evidence.", impact: { solar: 2, root: 1 } },
      { text: "I try to, but I often overthink it.", impact: { thirdEye: 1, solar: -1 } },
      { text: "What gut feeling? I just go with the flow.", impact: { sacral: 2 } }
    ]
  },
  {
    id: 6,
    text: "When you look in the mirror, what's the first thing you notice?",
    options: [
      { text: "My flaws. I need to fix so many things.", impact: { solar: -2, root: -1 } },
      { text: "My strength. I've survived a lot.", impact: { solar: 2, root: 2 } },
      { text: "My kindness. I see a good soul.", impact: { heart: 2 } },
      { text: "My sparkle. I'm ready to take on the world.", impact: { sacral: 2, solar: 1 } }
    ]
  },
  {
    id: 7,
    text: "How do you feel about your financial independence?",
    options: [
      { text: "It's my top priority. I need to be secure.", impact: { root: 2, solar: 1 } },
      { text: "I'm happy sharing resources with my family.", impact: { heart: 2, root: 1 } },
      { text: "I feel restricted and want more freedom.", impact: { solar: -1, sacral: 1 } },
      { text: "Money is just energy; it comes and goes.", impact: { crown: 2, sacral: 1 } }
    ]
  },
  {
    id: 8,
    text: "Your idea of a perfect 'Me Time' is:",
    options: [
      { text: "A spa day or a long hot bath.", impact: { sacral: 2, root: 1 } },
      { text: "Learning a new skill or hobby.", impact: { solar: 2, thirdEye: 1 } },
      { text: "Volunteering or helping someone in need.", impact: { heart: 2, crown: 1 } },
      { text: "Sitting in silence, doing absolutely nothing.", impact: { crown: 2, root: 1 } }
    ]
  },
  {
    id: 9,
    text: "When you have a big dream, you:",
    options: [
      { text: "Keep it to myself. People might give me 'nazar'.", impact: { throat: -1, thirdEye: 1 } },
      { text: "Tell everyone! I want the world to know.", impact: { throat: 2, solar: 1 } },
      { text: "Make a detailed plan and start working.", impact: { solar: 2, root: 2 } },
      { text: "Trust the universe to make it happen.", impact: { crown: 2, heart: 1 } }
    ]
  },
  {
    id: 10,
    text: "How do you handle a mistake you made at work or home?",
    options: [
      { text: "Beat myself up for days.", impact: { solar: -2, root: -1 } },
      { text: "Own it, apologize, and move on.", impact: { throat: 2, solar: 1 } },
      { text: "Try to hide it or find someone else to blame.", impact: { root: -1, solar: -1 } },
      { text: "See it as a lesson from the divine.", impact: { crown: 2, thirdEye: 1 } }
    ]
  }
];
