import { QuizQuestion } from "@/types/quiz";

export const femaleQuizQuestions: QuizQuestion[] = [
  {
    id: "symptoms",
    step: 1,
    type: "multi-select",
    question: "Do you experience any of these symptoms?",
    options: [
      { id: "irregular-periods", label: "Irregular or missing periods", icon: "🗓️" },
      { id: "weight-gain", label: "Weight gain", icon: "⚖️" },
      { id: "acne", label: "Acne or oily skin", icon: "✨" },
      { id: "hair-thinning", label: "Hair thinning or hair loss", icon: "💇" },
      { id: "fatigue", label: "Fatigue", icon: "😴" },
      { id: "mood-swings", label: "Mood swings", icon: "🎭" },
      { id: "difficulty-losing-weight", label: "Difficulty losing weight", icon: "📉" },
      { id: "sugar-cravings", label: "Sugar cravings", icon: "🍬" },
      { id: "other", label: "Other", icon: "📝" },
      { id: "none", label: "None", icon: "🚫" },
    ],
    required: true,
  },
  {
    id: "period-regularity",
    step: 2,
    type: "single-select",
    question: "How regular are your periods?",
    options: [
      { id: "rarely", label: "I rarely get a period" },
      { id: "irregular", label: "My cycle is all over the place" },
      { id: "somewhat-regular", label: "Somewhat regular but inconsistent" },
      { id: "very-regular", label: "Very regular" },
    ],
    required: true,
  },
  {
    id: "mood-issues",
    step: 3,
    type: "single-select",
    question: "Do you experience mood swings, stress, or anxiety?",
    options: [
      { id: "yes-often", label: "Yes, I feel anxious or overwhelmed often" },
      { id: "sometimes", label: "I have some mood swings but manage them" },
      { id: "no", label: "Not really" },
    ],
    required: true,
  },
  {
    id: "weight-loss-history",
    step: 4,
    type: "single-select",
    question: "Have you struggled with losing weight despite diet and exercise?",
    options: [
      { id: "yes-nothing-works", label: "Yes, nothing works!" },
      { id: "comes-back", label: "I lose a little, but it always comes back" },
      { id: "havent-tried", label: "I haven't tried much yet" },
    ],
    required: true,
  },
  {
    id: "energy-levels",
    step: 5,
    type: "single-select",
    question: "How would you describe your energy levels?",
    options: [
      { id: "always-exhausted", label: "Always exhausted, even after sleeping" },
      { id: "afternoon-crashes", label: "I get afternoon crashes" },
      { id: "inconsistent", label: "I have energy, but it's inconsistent" },
      { id: "fine", label: "I feel fine most of the time" },
    ],
    required: true,
  },

  // Phase 2: Goals & Biometrics (Steps 6-12)
  {
    id: "motivation-1",
    step: 6,
    type: "interstitial",
    content: {
      title: "We're Here to Help You Take Control of PCOS",
      description: "Our personalized plan is designed to:",
      highlight: "9 out of 10 women saw improved PCOS symptoms",
    },
  },
  {
    id: "goals",
    step: 7,
    type: "multi-select",
    question: "What is your goal?",
    options: [
      { id: "lose-weight", label: "Lose weight", icon: "⚖️" },
      { id: "get-fit", label: "Get fit", icon: "🏃" },
      { id: "boost-metabolism", label: "Boost metabolism", icon: "🔥" },
      { id: "improve-energy", label: "Improve energy levels", icon: "⚡" },
      { id: "stabilize-mood", label: "Stabilize mood", icon: "😊" },
      { id: "hormonal-balance", label: "Achieve hormonal balance", icon: "🧬" },
      { id: "reduce-cravings", label: "Reduce cravings", icon: "🍫" },
    ],
    required: true,
  },
  {
    id: "body-type",
    step: 8,
    type: "visual-select",
    question: "Choose your body type",
    options: [
      { id: "regular", label: "Regular", image: "/images/body-type-regular.svg" },
      { id: "plump", label: "Plump", image: "/images/body-type-plump.svg" },
      { id: "extra", label: "Extra", image: "/images/body-type-extra.svg" },
    ],
    required: true,
  },
  {
    id: "height",
    step: 9,
    type: "height-input",
    question: "What is your height?",
    subtitle: "Height helps us calculate your BMI.",
    required: true,
  },
  {
    id: "current-weight",
    step: 10,
    type: "numeric-input",
    question: "What is your current weight?",
    subtitle: "Weight helps us calculate your BMI.",
    unit: "lbs",
    validation: { min: 70, max: 600 },
    required: true,
  },
  {
    id: "target-weight",
    step: 11,
    type: "numeric-input",
    question: "What is your desired weight?",
    unit: "lbs",
    validation: { min: 70, max: 600 },
    required: true,
  },
  {
    id: "age",
    step: 12,
    type: "numeric-input",
    question: "What is your age?",
    validation: { min: 18, max: 100 },
    required: true,
  },

  // Phase 3: Lifestyle & Habits (Steps 13-17)
  {
    id: "motivation-2",
    step: 13,
    type: "interstitial",
    content: {
      title: "Keep It Healthy",
      description:
        "Women in your 20s, take note: Improving your habits to achieve and maintain a healthy weight range can speed up your journey toward a healthy, strong body.",
    },
  },
  {
    id: "activity-level",
    step: 14,
    type: "single-select",
    question: "What does your day-to-day look like?",
    subtitle: "Select which fits your routine the best",
    options: [
      { id: "desk-job", label: "Desk job", icon: "💻" },
      { id: "moving-a-lot", label: "Moving a lot", icon: "🚶" },
      { id: "always-working-out", label: "Always working out", icon: "🏋️" },
      { id: "home", label: "Spending time at home", icon: "🏠" },
    ],
    required: true,
  },
  {
    id: "exercise-preference",
    step: 15,
    type: "single-select",
    question: "Do you enjoy exercising?",
    subtitle: "A great way to quicken your results is by working out.",
    options: [
      { id: "no", label: "No" },
      { id: "try-to-stay-active", label: "No, but I try to stay active" },
      { id: "occasionally", label: "Yes, occasionally" },
      { id: "regularly", label: "Yes, regularly" },
    ],
    required: true,
  },
  {
    id: "hydration",
    step: 16,
    type: "single-select",
    question: "How much water do you drink daily?",
    subtitle: "We mean clean water, excluding coffee, tea and other drinks",
    options: [
      { id: "only-coffee-tea", label: "Only coffee or tea" },
      { id: "less-than-2", label: "Less than 16 oz (Less than 2 glasses)" },
      { id: "2-6-glasses", label: "16 oz - 48 oz (2 - 6 glasses)" },
      { id: "7-10-glasses", label: "56 oz - 80 oz (7 - 10 glasses)" },
      { id: "dont-count", label: "Don't count, it depends" },
    ],
    required: true,
  },
  {
    id: "bad-habits",
    step: 17,
    type: "multi-select",
    question: "Select all that you tend to do:",
    options: [
      { id: "eat-late", label: "I eat late at night", icon: "🌙" },
      { id: "sweets", label: "I can't give up eating sweets", icon: "🍬" },
      { id: "soft-drinks", label: "I love soft drinks", icon: "🥤" },
      { id: "alcohol", label: "I consume hard drinks from time to time", icon: "🍸" },
      { id: "fatty-salty", label: "I love fatty or salty foods", icon: "🍟" },
      { id: "none", label: "None of the above", icon: "🚫" },
    ],
    required: true,
  },

  // Phase 4: Trust, Processing & Results (Steps 18-20)
  {
    id: "ingredients",
    step: 18,
    type: "ingredient-select",
    question: "What ingredients should we add to your personalised meal plan?",
    categories: [
      {
        id: "greens",
        title: "Greens",
        options: [
          { id: "tomato", label: "Tomato" },
          { id: "spinach", label: "Spinach" },
          { id: "mushrooms", label: "Mushrooms" },
          { id: "onion", label: "Onion" },
          { id: "cucumber", label: "Cucumber" },
          { id: "lettuce", label: "Lettuce" },
          { id: "avocado", label: "Avocado" },
          { id: "carrots", label: "Carrots" },
        ],
      },
      {
        id: "fiber-grains",
        title: "Fiber & Grains",
        options: [
          { id: "oats", label: "Oats" },
          { id: "spaghetti", label: "Spaghetti" },
          { id: "whole-grain-bread", label: "Whole grain bread" },
          { id: "buckwheat", label: "Buckwheat" },
          { id: "quick-cooking-oats", label: "Quick cooking oats" },
          { id: "quinoa", label: "Quinoa" },
        ],
      },
      {
        id: "protein",
        title: "Protein",
        options: [
          { id: "eggs", label: "Eggs" },
          { id: "chicken-breast", label: "Chicken breast" },
          { id: "turkey-breast", label: "Turkey breast" },
          { id: "meat", label: "Meat" },
          { id: "chicken-wings", label: "Chicken wings" },
          { id: "chicken-liver", label: "Chicken liver" },
          { id: "canned-salmon", label: "Canned salmon" },
        ],
      },
      {
        id: "seafood",
        title: "Seafood",
        options: [
          { id: "lox", label: "Lox" },
          { id: "canned-tuna", label: "Canned tuna" },
          { id: "salmon", label: "Salmon" },
          { id: "shrimps", label: "Shrimps" },
          { id: "mackerel-filet", label: "Mackerel filet" },
        ],
      },
      {
        id: "dairy",
        title: "Dairy",
        options: [
          { id: "yogurt", label: "Yogurt" },
          { id: "feta-cheese", label: "Feta cheese" },
          { id: "cheese", label: "Cheese" },
          { id: "cottage-cheese", label: "Cottage cheese" },
          { id: "mozzarella", label: "Mozzarella" },
          { id: "philadelphia-light", label: "Cream cheese Philadelphia light" },
          { id: "greek-yogurt", label: "Greek yogurt" },
          { id: "and-what-i-not-crave", label: "and what not I crave" },
        ],
      },
      {
        id: "fresh-fruits",
        title: "Fresh fruits",
        options: [
          { id: "raspberry", label: "Raspberry" },
          { id: "apple", label: "Apple" },
          { id: "orange", label: "Orange" },
          { id: "sweet-berries", label: "Sweet berries" },
          { id: "mango", label: "Mango" },
          { id: "grapes", label: "Grapes" },
        ],
      },
    ],
    required: true,
  },
  {
    id: "science-trust",
    step: 19,
    type: "science-list",
    question: "The science behind your personalised weight loss plan",
  },
  {
    id: "goal-projection",
    step: 20,
    type: "goal-projection",
    question: "With PCOS Plan, you will reach your desired weight",
  },
  {
    id: "personal-summary",
    step: 21,
    type: "personal-summary",
    question: "Your personal summary",
  },
];

export const maleQuizQuestions: QuizQuestion[] = femaleQuizQuestions;

// Legacy export for backwards compatibility
export const quizQuestions = femaleQuizQuestions;

export const TOTAL_STEPS = femaleQuizQuestions.length;

export function getQuestionByStep(step: number, gender: "male" | "female" = "female"): QuizQuestion | undefined {
  const questions = gender === "male" ? maleQuizQuestions : femaleQuizQuestions;
  return questions.find((q) => q.step === step);
}

export function getTotalSteps(gender: "male" | "female" = "female"): number {
  const questions = gender === "male" ? maleQuizQuestions : femaleQuizQuestions;
  return questions.length;
}

export function getNextStep(currentStep: number): number | null {
  const nextStep = currentStep + 1;
  return nextStep <= TOTAL_STEPS ? nextStep : null;
}

export function getPreviousStep(currentStep: number): number | null {
  const prevStep = currentStep - 1;
  return prevStep >= 1 ? prevStep : null;
}
