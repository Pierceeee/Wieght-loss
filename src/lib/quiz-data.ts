import { QuizQuestion } from "@/types/quiz";

export const femaleQuizQuestions: QuizQuestion[] = [
  {
    id: "age-range",
    step: 1,
    type: "single-select",
    question: "PCOS Plan",
    subtitle: "According to your age",
    options: [
      { id: "18-25", label: "18-25", image: "/images/icons/papaya-1.avif" },
      { id: "26-35", label: "26-35", image: "/images/icons/papaya-2.avif" },
      { id: "36-45", label: "36-45", image: "/images/icons/papaya-3.avif" },
      { id: "46+", label: "46+", image: "/images/icons/papaya-4.avif" },
    ],
    required: true,
  },
  {
    id: "symptoms",
    step: 2,
    type: "multi-select",
    question: "Do you experience any of these symptoms?",
    options: [
      { id: "irregular-periods", label: "Irregular or missing periods", image: "/images/icons/blood-drop.avif" },
      { id: "weight-gain", label: "Weight gain", image: "/images/icons/balance-scale.avif" },
      { id: "acne", label: "Acne or oily skin", image: "/images/icons/acne.avif" },
      { id: "hair-thinning", label: "Hair thinning or hair loss", image: "/images/icons/haircut.avif" },
      { id: "fatigue", label: "Fatigue", image: "/images/icons/tired-face.avif" },
      { id: "mood-swings", label: "Mood swings", image: "/images/icons/crying.avif" },
      { id: "difficulty-losing-weight", label: "Difficulty losing weight", image: "/images/icons/weary.avif" },
      { id: "sugar-cravings", label: "Sugar cravings", image: "/images/icons/candy.avif" },
      { id: "other", label: "Other", image: "/images/icons/person-shrugging.avif" },
      { id: "none", label: "None", image: "/images/icons/prohibited.avif" },
    ],
    required: true,
  },
  {
    id: "period-regularity",
    step: 3,
    type: "single-select",
    question: "How regular are your periods?",
    options: [
      { id: "rarely", label: "I rarely get a period", image: "/images/icons/crying.avif" },
      { id: "irregular", label: "My cycle is all over the place", image: "/images/icons/anxious-with-sweat.avif" },
      { id: "somewhat-regular", label: "Somewhat regular but inconsistent", image: "/images/icons/unamused.avif" },
      { id: "very-regular", label: "Very regular", image: "/images/icons/smiling.avif" },
    ],
    required: true,
  },
  {
    id: "mood-issues",
    step: 4,
    type: "single-select",
    question: "Do you experience mood swings, stress, or anxiety?",
    options: [
      { id: "yes-often", label: "Yes, I feel anxious or overwhelmed often", image: "/images/icons/anxious-with-sweat.avif" },
      { id: "sometimes", label: "I have some mood swings but manage them", image: "/images/icons/unamused.avif" },
      { id: "no", label: "Not really", image: "/images/icons/slightly-smiling-face.avif" },
    ],
    required: true,
  },
  {
    id: "weight-loss-history",
    step: 5,
    type: "single-select",
    question: "Have you struggled with losing weight despite diet and exercise?",
    options: [
      { id: "yes-nothing-works", label: "Yes, nothing works!", image: "/images/icons/loudly-crying.avif" },
      { id: "comes-back", label: "I lose a little, but it always comes back", image: "/images/icons/crying-1.avif" },
      { id: "havent-tried", label: "I haven't tried much yet", image: "/images/icons/unamused-2.avif" },
    ],
    required: true,
  },
  {
    id: "energy-levels",
    step: 6,
    type: "single-select",
    question: "How would you describe your energy levels?",
    options: [
      { id: "always-exhausted", label: "Always exhausted, even after sleeping", image: "/images/icons/tired-face.avif" },
      { id: "afternoon-crashes", label: "I get afternoon crashes", image: "/images/icons/sleeping-face.avif" },
      { id: "inconsistent", label: "I have energy, but it's inconsistent", image: "/images/icons/unamused-1.avif" },
      { id: "fine", label: "I feel fine most of the time", image: "/images/icons/smiling-2.avif" },
    ],
    required: true,
  },

  // Phase 2: Goals & Biometrics (Steps 7-13)
  {
    id: "motivation-1",
    step: 7,
    type: "interstitial",
    content: {
      title: "We're Here to Help You Take Control of PCOS",
      description: "Our personalized plan is designed to:",
      highlight: "9 out of 10 women saw improved PCOS symptoms",
      image: "/images/interstitial-help.avif",
    },
    benefits: [
      "Balance hormones",
      "Boost metabolism",
      "Reduce cravings",
      "Increase weight loss",
    ],
  },
  {
    id: "goals",
    step: 8,
    type: "multi-select",
    question: "What is your goal?",
    options: [
      { id: "lose-weight", label: "Lose weight", image: "/images/icons/balance-scale.avif" },
      { id: "get-fit", label: "Get fit", image: "/images/icons/man-running.avif" },
      { id: "boost-metabolism", label: "Boost metabolism", image: "/images/icons/flexed-biceps.avif" },
      { id: "improve-energy", label: "Improve energy levels", image: "/images/icons/lighting.avif" },
      { id: "stabilize-mood", label: "Stabilize mood", image: "/images/icons/relieved-face.avif" },
      { id: "hormonal-balance", label: "Achieve hormonal balance", image: "/images/icons/half-moon.avif" },
      { id: "reduce-cravings", label: "Reduce cravings", image: "/images/icons/chocolate-bar.avif" },
    ],
    required: true,
  },
  {
    id: "body-type",
    step: 9,
    type: "visual-select",
    question: "Choose your body type",
    options: [
      { id: "regular", label: "Regular", image: "/images/body-type-regular.avif" },
      { id: "plump", label: "Plump", image: "/images/body-type-plump.avif" },
      { id: "extra", label: "Extra", image: "/images/body-type-extra.avif" },
    ],
    required: true,
  },
  {
    id: "height",
    step: 10,
    type: "height-input",
    question: "What is your height?",
    subtitle: "Height helps us calculate your BMI.",
    required: true,
  },
  {
    id: "current-weight",
    step: 11,
    type: "numeric-input",
    question: "What is your current weight?",
    subtitle: "Weight helps us calculate your BMI.",
    unit: "lbs",
    validation: { min: 70, max: 600 },
    required: true,
  },
  {
    id: "target-weight",
    step: 12,
    type: "numeric-input",
    question: "What is your desired weight?",
    unit: "lbs",
    validation: { min: 70, max: 600 },
    required: true,
  },
  {
    id: "age",
    step: 13,
    type: "numeric-input",
    question: "What is your age?",
    validation: { min: 18, max: 100 },
    required: true,
  },

  // Phase 3: Lifestyle & Habits (Steps 14-18)
  {
    id: "motivation-2",
    step: 14,
    type: "interstitial",
    content: {
      title: "Keep It Healthy",
      description:
        "Women in Your 20s, take note: Improving your habits to achieve and maintain a weight range of 112lbs to 128lbs can speed up your journey toward a healthy, strong body.",
      image: "/images/female-20s.avif",
    },
  },
  {
    id: "activity-level",
    step: 15,
    type: "single-select",
    question: "What does your day-to-day look like?",
    subtitle: "Select which fits your routine the best",
    options: [
      { id: "desk-job", label: "Desk job", image: "/images/icons/laptop.avif" },
      { id: "moving-a-lot", label: "Moving a lot", image: "/images/icons/woman-walking.avif" },
      { id: "always-working-out", label: "Always working out", image: "/images/icons/emoji-person-lifting-weights.avif" },
      { id: "home", label: "Spending time at home", image: "/images/icons/house.avif" },
    ],
    required: true,
  },
  {
    id: "exercise-preference",
    step: 16,
    type: "single-select",
    question: "Do you enjoy exercising?",
    subtitle: "A great way to quicken your results is by working out.",
    options: [
      { id: "no", label: "No", image: "/images/icons/person-gesturing-no.avif" },
      { id: "try-to-stay-active", label: "No, but I try to stay active", image: "/images/icons/man-walking.avif" },
      { id: "occasionally", label: "Yes, occasionally", image: "/images/icons/slightly-smiling-face-1.avif" },
      { id: "regularly", label: "Yes, regularly", image: "/images/icons/flexed-biceps.avif" },
    ],
    required: true,
  },
  {
    id: "hydration",
    step: 17,
    type: "single-select",
    question: "How much water do you drink daily?",
    subtitle: "We mean clean water, excluding coffee, tea and other drinks",
    options: [
      { id: "only-coffee-tea", label: "Only coffee or tea", image: "/images/icons/hot-beverage.avif" },
      { id: "less-than-2", label: "Less than 16 oz (Less than 2 glasses)", image: "/images/icons/droplet.avif" },
      { id: "2-6-glasses", label: "16 oz - 48 oz (2 - 6 glasses)", image: "/images/icons/cup-with-straw.avif" },
      { id: "7-10-glasses", label: "56 oz - 80 oz (7 - 10 glasses)", image: "/images/icons/potable-water.avif" },
      { id: "dont-count", label: "Don't count, it depends", image: "/images/icons/person-shrugging.avif" },
    ],
    required: true,
  },
  {
    id: "bad-habits",
    step: 18,
    type: "multi-select",
    question: "Select all that you tend to do:",
    options: [
      { id: "eat-late", label: "I eat late at night", image: "/images/icons/crescent-moon.avif" },
      { id: "sweets", label: "I can't give up eating sweets", image: "/images/icons/candy.avif" },
      { id: "soft-drinks", label: "I love soft drinks", image: "/images/icons/cup-with-straw.avif" },
      { id: "alcohol", label: "I consume hard drinks from time to time", image: "/images/icons/martini.avif" },
      { id: "fatty-salty", label: "I love fatty or salty foods", image: "/images/icons/french-fries.avif" },
      { id: "none", label: "None of the above", image: "/images/icons/prohibited.avif" },
    ],
    required: true,
  },

  // Phase 4: Trust, Processing & Results (Steps 19-22)
  {
    id: "ingredients",
    step: 19,
    type: "ingredient-select",
    question: "What ingredients should we add to your personalised meal plans?",
    categories: [
      {
        id: "greens",
        title: "Greens",
        options: [
          { id: "tomato", label: "Tomato" },
          { id: "cucumber", label: "Cucumber" },
          { id: "bell-pepper", label: "Bell pepper" },
          { id: "onion", label: "Onion" },
          { id: "spinach", label: "Spinach" },
          { id: "mushrooms", label: "Mushrooms" },
          { id: "cocktail-tomatoes", label: "Cocktail tomatoes" },
          { id: "lettuce", label: "Lettuce" },
          { id: "avocado", label: "Avocado" },
          { id: "carrots", label: "Carrots" },
        ],
      },
      {
        id: "fiber-grains",
        title: "Fiber & Grains",
        options: [
          { id: "rice", label: "Rice" },
          { id: "spaghetti", label: "Spaghetti" },
          { id: "whole-grain-bread", label: "Whole grain bread" },
          { id: "couscous", label: "Couscous" },
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
          { id: "chicken-sausage", label: "Chicken sausage" },
          { id: "chicken-liver", label: "Chicken liver" },
          { id: "smoked-chicken", label: "Smoked chicken" },
        ],
      },
      {
        id: "seafood",
        title: "Seafood",
        options: [
          { id: "salmon", label: "Salmon" },
          { id: "canned-tuna", label: "Canned tuna" },
          { id: "mackerel", label: "Mackerel" },
          { id: "smoked-mackerel", label: "Smoked mackerel" },
          { id: "shrimps", label: "Shrimps" },
          { id: "ocean-trout-fillet", label: "Ocean trout fillet" },
        ],
      },
      {
        id: "dairy",
        title: "Dairy",
        options: [
          { id: "tofu", label: "Tofu" },
          { id: "feta-cheese", label: "Feta cheese" },
          { id: "cheese", label: "Cheese" },
          { id: "cooked-parmesan", label: "Cooked parmesan" },
          { id: "mozzarella", label: "Mozzarella" },
          { id: "cream-cheese-philadelphia-light", label: "Cream cheese Philadelphia light" },
          { id: "greek-yogurt", label: "Greek yogurt" },
          { id: "half-and-half-cream", label: "Half-and-half cream" },
        ],
      },
      {
        id: "fresh-fruits",
        title: "Fresh fruits",
        options: [
          { id: "avocado-fruit", label: "Avocado" },
          { id: "apple", label: "Apple" },
          { id: "pear", label: "Pear" },
          { id: "bananas", label: "Bananas" },
          { id: "forest-berries", label: "Forest berries" },
          { id: "mango", label: "Mango" },
          { id: "orange", label: "Orange" },
        ],
      },
    ],
    required: true,
  },
  {
    id: "science-trust",
    step: 20,
    type: "science-list",
    question: "The science behind your personalised weight loss plan",
  },
  {
    id: "goal-projection",
    step: 21,
    type: "goal-projection",
    question: "With PCOS Plan, you will reach your desired weight of",
  },
  {
    id: "personal-summary",
    step: 22,
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
