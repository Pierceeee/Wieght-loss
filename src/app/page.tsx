import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  Zap,
  Scale,
  Brain,
  CheckCircle2,
  Star,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">PCOS Plan</span>
            </div>
            <Button asChild>
              <Link href="/quiz">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-orange-50 to-background dark:from-orange-950/20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary">
              <Sparkles className="w-4 h-4" />
              Personalized for your body
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Take Control of{" "}
              <span className="text-primary">PCOS</span> with a Plan Made for You
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Get a personalized diet and lifestyle plan designed specifically for
              women with PCOS. Balance hormones, boost metabolism, and achieve
              sustainable weight loss.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="h-14 px-8 text-lg">
                <Link href="/quiz">
                  Start Your Free Quiz
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Takes only 3 minutes • No credit card required
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 border-b">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-primary border-2 border-background"
                  />
                ))}
              </div>
              <span className="text-sm font-medium">50,000+ women helped</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-sm font-medium">4.9/5 rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-24">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why PCOS Plan Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our science-backed approach addresses the root causes of PCOS, not
              just the symptoms.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Heart,
                title: "Balance Hormones",
                description:
                  "Reduce insulin resistance and balance androgens naturally through targeted nutrition.",
              },
              {
                icon: Zap,
                title: "Boost Metabolism",
                description:
                  "Optimize your metabolic health with PCOS-specific meal timing and macros.",
              },
              {
                icon: Scale,
                title: "Sustainable Weight Loss",
                description:
                  "Lose weight without extreme dieting using anti-inflammatory foods.",
              },
              {
                icon: Brain,
                title: "Reduce Cravings",
                description:
                  "Stabilize blood sugar to eliminate cravings and mood swings.",
              },
            ].map((benefit, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-24 bg-muted/50">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get your personalized plan in just 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Take the Quiz",
                description:
                  "Answer questions about your symptoms, lifestyle, and goals. It only takes 3 minutes.",
              },
              {
                step: "02",
                title: "Get Your Plan",
                description:
                  "Receive a personalized meal plan and recommendations based on your unique profile.",
              },
              {
                step: "03",
                title: "See Results",
                description:
                  "Follow your plan and track your progress. Most women see improvements within 4 weeks.",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-primary/20 mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Real Results from Real Women
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of women who have transformed their health with PCOS
              Plan
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah M.",
                result: "Lost 25 lbs in 3 months",
                quote:
                  "After years of struggling with PCOS, this plan finally helped me understand what my body needs. I've never felt better!",
              },
              {
                name: "Emily R.",
                result: "Regular periods after 2 months",
                quote:
                  "The personalized approach made all the difference. My periods are regular for the first time in years.",
              },
              {
                name: "Jessica T.",
                result: "More energy, less cravings",
                quote:
                  "I was skeptical at first, but the meal plans are easy to follow and I no longer have afternoon crashes.",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-card">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-primary">{testimonial.result}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 sm:py-24 bg-muted/50">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                What&apos;s Included
              </h2>
            </div>

            <div className="space-y-4">
              {[
                "Personalized weekly meal plans tailored to PCOS",
                "Grocery shopping lists for easy meal prep",
                "PCOS-friendly recipes with nutritional info",
                "Progress tracking and adjustments",
                "Educational content about managing PCOS",
                "Community support from other women with PCOS",
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-background rounded-xl"
                >
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-primary text-primary-foreground">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Take Control of Your PCOS?
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Start your personalized journey today. The quiz takes only 3 minutes
            and you&apos;ll get instant insights into your PCOS profile.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="h-14 px-8 text-lg"
          >
            <Link href="/quiz">
              Start Your Free Quiz
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">PCOS Plan</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Personalized nutrition and lifestyle plans for women with PCOS.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/quiz" className="hover:text-foreground">
                    Take the Quiz
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Reviews
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Help & Support
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} PCOS Plan. All rights reserved.
            </p>
            <p className="mt-2">
              Disclaimer: This app is for informational purposes only and is not
              a substitute for professional medical advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
