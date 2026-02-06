# PCOS Plan - Personalized Weight Loss Web App

A modern web application for women with PCOS (Polycystic Ovary Syndrome) to get personalized diet and lifestyle plans. Built with Next.js 14+, TypeScript, Tailwind CSS, and AI-powered meal plan generation.

## Features

- **21-Step Onboarding Quiz**: Comprehensive assessment of symptoms, lifestyle, and goals
- **Personalized Summary**: BMI calculation, health risks, and projected timeline
- **AI-Powered Meal Plans**: Supports both OpenAI and Google Gemini for meal plan generation
- **Subscription Management**: Stripe integration for recurring payments
- **User Dashboard**: View and regenerate meal plans, track progress

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payments**: Stripe
- **AI Providers**: OpenAI GPT-4o / Google Gemini 1.5 Pro

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Stripe account
- OpenAI or Google AI API key

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Configure your `.env.local` file with your API keys.

5. Set up the Supabase database (see Database Setup below)

6. Run the development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_MONTHLY_PRICE_ID=price_...
STRIPE_YEARLY_PRICE_ID=price_...
STRIPE_LIFETIME_PRICE_ID=price_...

# AI Provider: "openai" or "gemini"
AI_PROVIDER=openai

# OpenAI (required if AI_PROVIDER=openai)
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o  # optional, defaults to gpt-4o

# Google Gemini (required if AI_PROVIDER=gemini)
GOOGLE_AI_API_KEY=AIza...
GEMINI_MODEL=gemini-1.5-pro  # optional, defaults to gemini-1.5-pro

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Database Setup

Run the following SQL in your Supabase SQL Editor:

```sql
-- Users table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Quiz responses
CREATE TABLE quiz_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  session_id TEXT NOT NULL,
  responses JSONB NOT NULL,
  bmi DECIMAL,
  target_weight DECIMAL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Subscriptions (synced from Stripe)
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  status TEXT,
  plan TEXT,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Generated meal plans
CREATE TABLE meal_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  plan_data JSONB NOT NULL,
  week_number INT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_plans ENABLE ROW LEVEL SECURITY;

-- Policies (customize as needed)
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
```

## Stripe Setup

1. Create products and prices in Stripe Dashboard:
   - Monthly subscription ($19.99/month)
   - Yearly subscription ($119.88/year)
   - Lifetime access ($199 one-time)

2. Set up a webhook endpoint pointing to `/api/webhooks/stripe`

3. Enable the following webhook events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`

## Project Structure

```
pcos-plan/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── generate-plan/      # AI meal plan generation
│   │   │   └── webhooks/stripe/    # Stripe webhook handler
│   │   ├── dashboard/              # User dashboard
│   │   ├── email/                  # Email capture
│   │   ├── offer/                  # Subscription plans
│   │   ├── quiz/[step]/            # Dynamic quiz steps
│   │   ├── summary/                # Personal summary
│   │   └── page.tsx                # Landing page
│   ├── components/
│   │   ├── quiz/                   # Quiz components
│   │   └── ui/                     # shadcn/ui components
│   ├── hooks/
│   │   └── useQuizState.ts         # Zustand quiz state
│   ├── lib/
│   │   ├── ai/                     # AI provider abstraction
│   │   ├── bmi.ts                  # BMI calculations
│   │   ├── quiz-data.ts            # Quiz questions
│   │   ├── stripe.ts               # Stripe utilities
│   │   ├── supabase.ts             # Supabase client
│   │   └── utils.ts                # Utility functions
│   └── types/
│       ├── quiz.ts                 # Quiz types
│       └── user.ts                 # User types
├── .env.example
├── package.json
└── README.md
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add all environment variables
4. Deploy

### Environment Variables in Vercel

Make sure to add all environment variables from `.env.example` to your Vercel project settings.

## Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## License

MIT

## Support

For support, email support@pcosplan.com or open an issue on GitHub.
