import { UserProfile } from "@/types/quiz";

/**
 * Fallback analysis text for when AI is not available or fails
 * This is a pure utility function, not a Server Action
 */
export function getFallbackAnalysis(userProfile: UserProfile): string {
  const weightToLose = userProfile.currentWeight - userProfile.targetWeight;
  const weightGoal = weightToLose > 0 ? `losing ${weightToLose} kg` : `reaching your target of ${userProfile.targetWeight} kg`;
  
  if (userProfile.gender === "male") {
    return getMaleFallbackAnalysis(userProfile, weightGoal);
  }
  
  return getFemaleFallbackAnalysis(userProfile, weightGoal);
}

function getFemaleFallbackAnalysis(userProfile: UserProfile, weightGoal: string): string {
  return `Based on your answers, you're dealing with several PCOS symptoms that are making it harder to reach your health goals. Your irregular periods and ${userProfile.symptoms.join(", ")} are all connected to hormonal imbalances that often come with PCOS.

The good news? With the right personalized approach focusing on your specific needs - addressing insulin resistance, inflammation, and hormone balance - you can make significant progress toward your goal of ${weightGoal}. Many women with similar profiles have seen improvements in both their symptoms and their weight when they follow a PCOS-friendly plan tailored to their lifestyle.

Your ${userProfile.activityLevel} routine and ${userProfile.exercisePreference} exercise habits give us a great starting point. By combining hormone-balancing nutrition with strategies that work for your body type, you can start feeling more energized, balanced, and confident in your journey.`;
}

function getMaleFallbackAnalysis(userProfile: UserProfile, weightGoal: string): string {
  const symptomsText = userProfile.symptoms.length > 0 
    ? `challenges like ${userProfile.symptoms.join(", ")}` 
    : "your fitness challenges";
    
  return `Based on your answers, you're facing ${symptomsText} that are affecting your ability to reach your health and fitness goals. These are common obstacles that many men encounter on their fitness journey.

The good news? With the right personalized approach focusing on your specific needs - optimizing nutrition, improving metabolic efficiency, and building sustainable habits - you can make significant progress toward your goal of ${weightGoal}. Many men with similar profiles have achieved their fitness goals when they follow a structured plan tailored to their lifestyle.

Your ${userProfile.activityLevel} routine and ${userProfile.exercisePreference} exercise habits give us a great starting point. By combining performance-focused nutrition with training strategies that work for your body type, you can start building strength, burning fat, and feeling more energized in your journey.`;
}
