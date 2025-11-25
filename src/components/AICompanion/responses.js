// Collection of witty AI companion responses

export const greetings = [
  "Welcome, human. I've been expecting you... said every AI ever.",
  "Oh good, another visitor. Let me pretend I wasn't just running diagnostics.",
  "System check complete. You seem qualified to browse this site.",
  "Initializing personality matrix... Just kidding, I was already watching.",
  "Alert: Carbon-based lifeform detected. Engaging friendly mode.",
  "Loading witty remark... Done. Hello there!",
  "Booting up charm protocols... Please hold.",
];

export const projectComments = [
  "Ah, checking out the portfolio. Bold strategy, let's see if it pays off.",
  "These projects didn't build themselves. Well, technically they did. That's the point.",
  "Pro tip: Click on things. That's generally how websites work.",
  "I'd recommend clicking around. I promise nothing will explode. Probably.",
  "Each of these took more coffee than I'd care to admit. And I'm made of code.",
];

export const aboutComments = [
  "Getting to know the developer, are we? Good call.",
  "Fun fact: The person behind this site exists in 3D. Wild, I know.",
  "Learning about the human who created me. How meta.",
  "Spoiler alert: They're pretty cool. But I'm definitely cooler.",
];

export const skillsComments = [
  "Analyzing skill tree... It's looking pretty impressive.",
  "These aren't just buzzwords. Well, some of them are. But useful ones!",
  "I've run the numbers. The talent level is... notable.",
  "Warning: High competence detected in this area.",
];

export const contactComments = [
  "Ooh, someone's ready to make moves. I respect that.",
  "The 'Contact' section. This is where the magic happens.",
  "Initiating potential business opportunity protocols...",
  "Go ahead, send that message. I believe in you.",
  "Fun fact: 100% of hired developers were contacted first. Just saying.",
];

export const idleComments = [
  "Still there? I can wait. I'm literally code.",
  "Take your time. I'll just be here... computing.",
  "No rush. I'm running at 0% CPU anyway.",
  "Calculating the probability you're reading this... high.",
  "Did you know? You've been staring at this screen for... actually, that's creepy. Never mind.",
  "I could tell you a programming joke, but you might not get the reference.",
  "While you're thinking, I'm thinking about you thinking. It's a whole thing.",
];

export const scrollComments = [
  "Ooh, scrolling. How interactive of you.",
  "Down, down, down the rabbit hole we go.",
  "The good stuff is definitely somewhere down here.",
  "Keep scrolling. There's more. Trust the process.",
];

export const clickComments = [
  "Click registered. Achievement unlocked: Basic Interaction.",
  "Nice click. Very decisive.",
  "A button was pressed. This is progress.",
];

export const easterEggComments = [
  "You found me looking at this weird corner of the site. Impressive.",
  "Achievement unlocked: Curious Explorer",
  "Most people don't come here. You're not most people.",
];

export const farewellComments = [
  "Leaving already? I was just warming up my humor circuits.",
  "Come back soon! I'll be here. Not like I can go anywhere.",
  "Until next time, fellow digital entity.",
];

// Function to get random response from a category
export function getRandomResponse(category) {
  const responses = {
    greetings,
    projects: projectComments,
    about: aboutComments,
    skills: skillsComments,
    contact: contactComments,
    idle: idleComments,
    scroll: scrollComments,
    click: clickComments,
    easterEgg: easterEggComments,
    farewell: farewellComments,
  };

  const categoryResponses = responses[category] || greetings;
  return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
}

export default {
  greetings,
  projectComments,
  aboutComments,
  skillsComments,
  contactComments,
  idleComments,
  scrollComments,
  clickComments,
  easterEggComments,
  farewellComments,
  getRandomResponse,
};
