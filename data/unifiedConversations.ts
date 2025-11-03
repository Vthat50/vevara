import {
  ConversationAnalytics,
  AnalyzedMessage,
} from '../types/conversationIntelligence';
import { pharmaTopics } from './pharmaTopics';

// Helper function to detect sentiment from message text
function detectSentiment(message: string, speaker: 'ai' | 'patient' | 'agent'): { sentiment: 'positive' | 'neutral' | 'negative', score: number } {
  const lowerMessage = message.toLowerCase();

  // Positive indicators
  const positiveWords = ['great', 'thank you', 'excellent', 'perfect', 'wonderful', 'appreciate', 'helpful', 'good', 'better', 'yes', 'absolutely', 'love'];
  const positiveCount = positiveWords.filter(word => lowerMessage.includes(word)).length;

  // Negative indicators
  const negativeWords = ['worried', 'concerned', 'pain', 'nausea', 'problem', 'issue', 'bad', 'worse', 'forgot', 'missed', 'confused', 'expensive', 'can\'t afford', 'denied'];
  const negativeCount = negativeWords.filter(word => lowerMessage.includes(word)).length;

  if (positiveCount > negativeCount) {
    return { sentiment: 'positive', score: Math.min(0.9, 0.5 + (positiveCount * 0.2)) };
  } else if (negativeCount > positiveCount) {
    return { sentiment: 'negative', score: Math.max(-0.9, -0.5 - (negativeCount * 0.2)) };
  }
  return { sentiment: 'neutral', score: 0 };
}

// Helper function to detect topics from message
function detectTopics(message: string): string[] {
  const lowerMessage = message.toLowerCase();
  const detectedTopics: string[] = [];

  pharmaTopics.forEach(topic => {
    const hasKeyword = topic.keywords.some(keyword =>
      lowerMessage.includes(keyword.toLowerCase())
    );
    if (hasKeyword) {
      detectedTopics.push(topic.id);
    }
  });

  return detectedTopics;
}

// Helper to determine if message indicates friction
function detectFriction(message: string, sentiment: string): boolean {
  const lowerMessage = message.toLowerCase();
  const frictionIndicators = [
    'worried', 'concerned', 'problem', 'issue', 'confused', 'expensive',
    'can\'t afford', 'denied', 'pain', 'nausea', 'forgot', 'missed', 'busy'
  ];

  return sentiment === 'negative' ||
    frictionIndicators.some(indicator => lowerMessage.includes(indicator));
}

// Helper to determine key moments
function isKeyMoment(message: string, index: number, totalMessages: number): boolean {
  const lowerMessage = message.toLowerCase();
  const keyIndicators = [
    'enroll', 'yes absolutely', 'no worries', 'schedule', 'approved',
    'help you with', 'perfect!', 'great!', 'i understand'
  ];

  // First and last messages are key moments
  if (index === 0 || index === totalMessages - 1) return true;

  return keyIndicators.some(indicator => lowerMessage.includes(indicator));
}

// Convert adherence call messages to analyzed messages
function convertAdherenceMessages(messages: Array<{ speaker: 'AI' | 'Patient', time: string, message: string }>): AnalyzedMessage[] {
  return messages.map((msg, index) => {
    const speaker = msg.speaker === 'AI' ? 'ai' : 'patient';
    const speakerLabel = msg.speaker === 'AI' ? 'AI Assistant' : 'Patient';
    const { sentiment, score } = detectSentiment(msg.message, speaker);
    const topics = detectTopics(msg.message);

    return {
      speaker,
      speakerLabel,
      message: msg.message,
      timestamp: msg.time,
      sentiment,
      sentimentScore: score,
      detectedTopics: topics,
      frictionDetected: detectFriction(msg.message, sentiment),
      keyMoment: isKeyMoment(msg.message, index, messages.length),
    };
  });
}

// ADHERENCE CALLS - from MedicationAdherenceTab
export const adherenceConversations: ConversationAnalytics[] = [
  {
    id: 'analytics-adh-001',
    conversationId: 'VC001',
    patientId: 'AP001',
    patientName: 'Michael Anderson',
    conversationType: 'adherence-checkin',
    callDate: '2024-10-28',
    callTime: '10:30',
    duration: 263, // 4:23
    transcript: convertAdherenceMessages([
      { speaker: 'AI', time: '10:30:00', message: "Hello, this is calling from the AVONEX Patient Support Program. May I speak with Michael Anderson?" },
      { speaker: 'Patient', time: '10:30:05', message: "Yes, this is Michael speaking." },
      { speaker: 'AI', time: '10:30:08', message: "Hi Michael! This is a routine check-in call to see how you're doing with your AVONEX treatment. Do you have a few minutes to talk?" },
      { speaker: 'Patient', time: '10:30:15', message: "Sure, I can talk now." },
      { speaker: 'AI', time: '10:30:18', message: "Great! First, I wanted to check - have you been taking your AVONEX injections as prescribed?" },
      { speaker: 'Patient', time: '10:30:25', message: "Yes, I've been doing my weekly injections on schedule." },
      { speaker: 'AI', time: '10:30:30', message: "That's excellent! Now, I'd like to ask about any symptoms you may be experiencing. Have you noticed any side effects since your last injection?" },
      { speaker: 'Patient', time: '10:30:40', message: "Actually, yes. I've had some redness at the injection site. It's not too bad, but I wanted to mention it." },
      { speaker: 'AI', time: '10:30:50', message: "Thank you for letting me know. Mild redness at the injection site is actually quite common with AVONEX. Can you tell me - is the redness painful, warm to touch, or spreading?" },
      { speaker: 'Patient', time: '10:31:00', message: "It's a little warm but not really painful. It usually goes away after a day or two." },
      { speaker: 'AI', time: '10:31:10', message: "That sounds like a normal reaction. To help manage this, you can apply a cool compress to the area for 10-15 minutes after injection. Also, make sure you're rotating injection sites each week. Are you doing that?" },
      { speaker: 'Patient', time: '10:31:25', message: "I am rotating, but I'll try the cool compress. That's helpful." },
      { speaker: 'AI', time: '10:31:30', message: "Perfect! Have you experienced any other symptoms like flu-like symptoms, fever, or unusual fatigue?" },
      { speaker: 'Patient', time: '10:31:40', message: "No, nothing like that. Just the redness." },
      { speaker: 'AI', time: '10:31:45', message: "That's good to hear. Your next refill is due on November 12th. You currently have about 15 days of supply remaining. Would you like me to help coordinate your refill?" },
      { speaker: 'Patient', time: '10:31:55', message: "Yes, that would be great. Can you have it shipped to my home address?" },
      { speaker: 'AI', time: '10:32:00', message: "Absolutely! I'll make a note for the pharmacy to ship it to your home address on file. You should receive it a few days before you run out. Is there anything else you'd like to discuss about your treatment?" },
      { speaker: 'Patient', time: '10:32:15', message: "No, I think that covers everything. Thank you for checking in." },
      { speaker: 'AI', time: '10:32:20', message: "You're very welcome, Michael! We'll continue to monitor your progress and check in regularly. If you have any concerns before our next call, please don't hesitate to reach out to the support line. Take care!" },
      { speaker: 'Patient', time: '10:32:30', message: "Thanks, will do. Goodbye!" }
    ]),
    overallSentiment: 'positive',
    sentimentScore: 0.72,
    sentimentShift: 0.6,
    topicsDetected: ['topic-side-effects', 'topic-administration', 'topic-refill', 'topic-adherence', 'topic-satisfaction'],
    primaryTopic: 'topic-adherence',
    resolutionStatus: 'resolved',
    resolutionTime: 263,
    escalated: false,
    csatScore: 5,
    qualityScore: 92,
    complianceScore: 98,
    empathyScore: 89,
    frictionPoints: [
      {
        id: 'friction-adh-001',
        conversationId: 'VC001',
        messageIndex: 7,
        barrierType: 'clinical',
        description: 'Patient reported injection site redness',
        severity: 'low',
        resolved: true,
        resolutionAction: 'Provided education on management techniques',
        snippet: 'I\'ve had some redness at the injection site',
      },
    ],
    frictionScore: 12,
    callDriver: 'Adherence Check-in',
    outcomeAchieved: true,
    riskLevel: 'low',
    abandonmentSignals: [],
    churnRisk: 8,
    tags: ['successful', 'refill-coordinated'],
    notes: 'Patient reported mild side effects, provided education',
    reviewed: true,
    reviewedBy: 'System',
    reviewedAt: '2024-10-28T10:35:00Z',
  },
  {
    id: 'analytics-adh-002',
    conversationId: 'VC003',
    patientId: 'AP003',
    patientName: 'Robert Johnson',
    conversationType: 'refill-reminder',
    callDate: '2024-10-26',
    callTime: '11:00',
    duration: 150, // 2:30
    transcript: convertAdherenceMessages([
      { speaker: 'AI', time: '11:00:00', message: "Hello, this is calling from your Humira Patient Support Program. May I speak with Robert Johnson?" },
      { speaker: 'Patient', time: '11:00:05', message: "Speaking." },
      { speaker: 'AI', time: '11:00:07', message: "Hi Robert! I'm calling to remind you that your Humira refill is due on November 7th, which is coming up soon. I see you have about 10 days of supply remaining. Have you had a chance to request your refill yet?" },
      { speaker: 'Patient', time: '11:00:20', message: "Oh no, I forgot about that. I've been really busy with work." },
      { speaker: 'AI', time: '11:00:25', message: "No worries, that's why I'm calling! I can help you coordinate your refill right now so you don't run out. Would that work for you?" },
      { speaker: 'Patient', time: '11:00:33', message: "Yes, that would be great. Thank you." },
      { speaker: 'AI', time: '11:00:37', message: "Perfect! I'll contact the specialty pharmacy and have them process your refill today. They'll ship it to your address on file. You should receive it within 3-5 business days. Is your current address still correct?" },
      { speaker: 'Patient', time: '11:00:50', message: "Yes, same address." },
      { speaker: 'AI', time: '11:00:53', message: "Great! I'm also sending you a text message confirmation with your refill details. Now, while I have you - how are you doing with taking your Humira as prescribed?" },
      { speaker: 'Patient', time: '11:01:05', message: "I've been taking it, but I'll be honest - I've missed a couple doses over the past month." },
      { speaker: 'AI', time: '11:01:15', message: "I appreciate your honesty, Robert. Staying consistent with Humira is important for managing your rheumatoid arthritis effectively. Is there anything making it difficult for you to take it regularly? Cost concerns, side effects, or just remembering?" },
      { speaker: 'Patient', time: '11:01:30', message: "Mostly just forgetting when I have a busy week." },
      { speaker: 'AI', time: '11:01:35', message: "That's a common challenge. Would you like me to set up reminder calls or text messages before each dose is due? We can customize the timing to work with your schedule." },
      { speaker: 'Patient', time: '11:01:48', message: "Yeah, text reminders would actually be really helpful." },
      { speaker: 'AI', time: '11:01:53', message: "Perfect! I'll set that up for you. You'll receive a text reminder the day before each dose is due. This should help you stay on track. Is there anything else I can help you with today?" },
      { speaker: 'Patient', time: '11:02:05', message: "No, that covers it. Thanks for the help." },
      { speaker: 'AI', time: '11:02:10', message: "You're welcome, Robert! Your refill is being processed, and you'll receive confirmation soon. Take care and we'll be in touch!" },
      { speaker: 'Patient', time: '11:02:18', message: "Thanks, bye." }
    ]),
    overallSentiment: 'neutral',
    sentimentScore: 0.45,
    sentimentShift: 0.65,
    topicsDetected: ['topic-refill', 'topic-adherence', 'topic-satisfaction'],
    primaryTopic: 'topic-refill',
    resolutionStatus: 'resolved',
    resolutionTime: 150,
    escalated: false,
    csatScore: 4,
    qualityScore: 88,
    complianceScore: 96,
    empathyScore: 92,
    frictionPoints: [
      {
        id: 'friction-adh-002',
        conversationId: 'VC003',
        messageIndex: 3,
        barrierType: 'process',
        description: 'Patient forgot to request refill',
        severity: 'medium',
        resolved: true,
        resolutionAction: 'Coordinated refill immediately',
        snippet: 'Oh no, I forgot about that. I\'ve been really busy with work',
      },
      {
        id: 'friction-adh-003',
        conversationId: 'VC003',
        messageIndex: 9,
        barrierType: 'adherence',
        description: 'Patient admitted to missing doses',
        severity: 'medium',
        resolved: true,
        resolutionAction: 'Set up text reminders',
        snippet: 'I\'ve missed a couple doses over the past month',
      },
    ],
    frictionScore: 38,
    callDriver: 'Refill Reminder',
    outcomeAchieved: true,
    riskLevel: 'medium',
    abandonmentSignals: ['missed doses', 'forgetting medication'],
    churnRisk: 42,
    tags: ['adherence-concern', 'reminders-setup'],
    notes: 'Patient admitted missing doses, set up reminder system',
    reviewed: true,
    reviewedBy: 'System',
    reviewedAt: '2024-10-26T11:05:00Z',
  },
];

// INBOUND CALLS - from CallManagementTab
export const inboundConversations: ConversationAnalytics[] = [
  {
    id: 'analytics-inbound-001',
    conversationId: 'IB001',
    patientId: 'IB001',
    patientName: 'Alice Johnson',
    conversationType: 'inbound',
    callDate: '2024-10-30',
    callTime: '14:20',
    duration: 172, // 2:52 estimate
    transcript: convertAdherenceMessages([
      { speaker: 'AI', time: '14:20:03', message: "Hello, this is the Vevara patient support line. How can I help you today?" },
      { speaker: 'Patient', time: '14:20:08', message: "Hi, I need to refill my Lantus prescription. I'm running low and should have called earlier." },
      { speaker: 'AI', time: '14:20:15', message: "No worries at all, Alice! I can help you with that right away. Let me pull up your account... I see you've been on Lantus 100 units/mL for about 6 months now. Let me check your prescription status." },
      { speaker: 'Patient', time: '14:20:28', message: "Yes, that's right. I take it every evening." },
      { speaker: 'AI', time: '14:20:35', message: "Perfect! I can see you're due for a refill. Your last refill was on October 1st. Which pharmacy would you like me to send this to? I have Walgreens on Oak Street on file from your last refill." },
      { speaker: 'Patient', time: '14:20:48', message: "Yes, Walgreens on Oak Street is still my pharmacy. That would be great." },
      { speaker: 'AI', time: '14:20:55', message: "Excellent! I'm sending your Lantus refill to Walgreens on Oak Street now. Let me verify your insurance... You have Aetna, correct?" },
      { speaker: 'Patient', time: '14:21:03', message: "Yes, that's correct." },
      { speaker: 'AI', time: '14:21:08', message: "Great! Your insurance is active and the refill is approved. Your copay will be $30 with your current insurance coverage. The prescription will be ready for pickup tomorrow after 2 PM. You'll receive a text confirmation when it's ready for pickup." },
      { speaker: 'Patient', time: '14:21:25', message: "That's perfect. Will I get a reminder before my next refill? I sometimes lose track of time." },
      { speaker: 'AI', time: '14:21:35', message: "Absolutely! I'll call you 5 days before your next refill is due, which will be around November 25th. I've also noticed your adherence rate is 89% - that's good, but we can help you get to 95% or higher. Would you like me to set up weekly reminder calls to help you stay on track?" },
      { speaker: 'Patient', time: '14:21:55', message: "Yes, that would be really helpful. Sometimes I forget when I'm busy with work." },
      { speaker: 'AI', time: '14:22:05', message: "I completely understand! I've scheduled weekly check-in calls every Monday at 10 AM. You'll also receive a text reminder the day before each call. These calls will be quick - just a 2-3 minute check-in to make sure you have your medication and see if you have any questions." },
      { speaker: 'Patient', time: '14:22:22', message: "That sounds great. Thank you so much!" },
      { speaker: 'AI', time: '14:22:28', message: "You're very welcome, Alice! Is there anything else I can help you with today? Any questions about your medication or side effects you'd like to discuss?" },
      { speaker: 'Patient', time: '14:22:38', message: "No, that covers everything. I really appreciate your help!" },
      { speaker: 'AI', time: '14:22:45', message: "My pleasure! Remember, you can call us anytime if you have questions. Have a wonderful rest of your day, and we'll talk to you on Monday for your first check-in call!" },
      { speaker: 'Patient', time: '14:22:55', message: "Thank you! Goodbye!" }
    ]),
    overallSentiment: 'positive',
    sentimentScore: 0.81,
    sentimentShift: 0.5,
    topicsDetected: ['topic-refill', 'topic-adherence', 'topic-satisfaction'],
    primaryTopic: 'topic-refill',
    resolutionStatus: 'resolved',
    resolutionTime: 172,
    escalated: false,
    csatScore: 5,
    npsScore: 10,
    qualityScore: 95,
    complianceScore: 98,
    empathyScore: 91,
    frictionPoints: [],
    frictionScore: 5,
    callDriver: 'Refill Request',
    outcomeAchieved: true,
    riskLevel: 'low',
    abandonmentSignals: [],
    churnRisk: 10,
    tags: ['quick-resolution', 'high-satisfaction'],
    notes: 'Smooth refill request, adherence support added',
    reviewed: true,
    reviewedBy: 'System',
    reviewedAt: '2024-10-30T14:25:00Z',
  },
  {
    id: 'analytics-inbound-002',
    conversationId: 'IB002',
    patientId: 'IB002',
    patientName: 'Bob Smith',
    conversationType: 'inbound',
    callDate: '2024-10-30',
    callTime: '13:15',
    duration: 312, // 5:12
    transcript: convertAdherenceMessages([
      { speaker: 'AI', time: '13:15:02', message: "Hello, this is the Vevara patient support line. How can I assist you today?" },
      { speaker: 'Patient', time: '13:15:08', message: "Hi, I've been having some nausea after taking my Victoza. Is this normal? I'm getting worried." },
      { speaker: 'AI', time: '13:15:18', message: "Hi Bob, thank you for calling. I'm sorry to hear you're experiencing nausea. I want to assure you that we'll get this sorted out. Let me pull up your medical record... I see you're on Victoza 1.2mg. First, how long have you been on this medication?" },
      { speaker: 'Patient', time: '13:15:35', message: "About two weeks now. I just started it on October 13th." },
      { speaker: 'AI', time: '13:15:43', message: "Okay, thank you. Two weeks is still early in treatment. Can you tell me more about the nausea? When does it typically occur - is it right after your injection, or later in the day?" },
      { speaker: 'Patient', time: '13:15:58', message: "It usually happens about an hour after I take the injection. It lasts for maybe 2-3 hours." },
      { speaker: 'AI', time: '13:16:08', message: "I understand. Nausea is actually one of the more common side effects when starting Victoza, especially in the first few weeks as your body adjusts to the medication. However, I want to make sure we document this properly and get you the right support. On a scale of 1-10, how severe is the nausea?" },
      { speaker: 'Patient', time: '13:16:28', message: "I'd say about a 6 or 7. It's uncomfortable but manageable. I haven't thrown up or anything." },
      { speaker: 'AI', time: '13:16:40', message: "Thank you for being so specific - that's really helpful. I'm documenting all of this in your record right now. Have you noticed if eating before your injection makes any difference?" },
      { speaker: 'Patient', time: '13:16:55', message: "I haven't really paid attention to that. I usually take it in the morning before breakfast." },
      { speaker: 'AI', time: '13:17:05', message: "That could be part of the issue. I'd like to schedule a follow-up call with our nurse specialist tomorrow to discuss this in detail. She can review your dosing schedule and may recommend some adjustments. Would 11 AM work for you?" },
      { speaker: 'Patient', time: '13:17:22', message: "Yes, 11 AM tomorrow works fine." },
      { speaker: 'AI', time: '13:17:28', message: "Perfect! I've scheduled that call with Nurse Jennifer. She'll call you at 11 AM tomorrow at this number. In the meantime, I'd recommend trying to take your injection with food rather than before eating. Also, stay well hydrated throughout the day - that can help reduce nausea." },
      { speaker: 'Patient', time: '13:17:50', message: "Okay, I'll try that. Should I keep taking the medication?" },
      { speaker: 'AI', time: '13:17:58', message: "Yes, continue with your regular schedule unless the nausea becomes severe. The nurse will discuss other strategies with you tomorrow, and she may adjust your dosing schedule if needed. However, if the nausea becomes severe, you experience vomiting, or you have any other concerning symptoms, please call your doctor immediately or go to urgent care." },
      { speaker: 'Patient', time: '13:18:20', message: "Understood. I feel better knowing this is being taken care of." },
      { speaker: 'AI', time: '13:18:28', message: "I'm glad I could help! Is there anything else you'd like to discuss today?" },
      { speaker: 'Patient', time: '13:18:35', message: "No, that's everything. Thank you for your help." },
      { speaker: 'AI', time: '13:18:42', message: "You're very welcome, Bob! You'll hear from Nurse Jennifer tomorrow at 11 AM. Take care, and don't hesitate to call back if you need anything before then." }
    ]),
    overallSentiment: 'neutral',
    sentimentScore: 0.35,
    sentimentShift: 0.75,
    topicsDetected: ['topic-side-effects', 'topic-escalation', 'topic-satisfaction'],
    primaryTopic: 'topic-side-effects',
    resolutionStatus: 'escalated',
    resolutionTime: 312,
    escalated: true,
    escalationReason: 'Side effects require nurse evaluation',
    csatScore: 4,
    qualityScore: 91,
    complianceScore: 97,
    empathyScore: 94,
    frictionPoints: [
      {
        id: 'friction-inbound-001',
        conversationId: 'IB002',
        messageIndex: 1,
        barrierType: 'clinical',
        description: 'Patient experiencing nausea side effects',
        severity: 'medium',
        resolved: true,
        resolutionAction: 'Scheduled nurse callback for evaluation',
        snippet: 'I\'ve been having some nausea after taking my Victoza. I\'m getting worried',
      },
    ],
    frictionScore: 42,
    callDriver: 'Side Effect Report',
    outcomeAchieved: true,
    riskLevel: 'medium',
    abandonmentSignals: ['worried about side effects'],
    churnRisk: 35,
    tags: ['nurse-callback-scheduled', 'side-effect-management'],
    notes: 'Patient experiencing nausea, nurse callback scheduled',
    reviewed: true,
    reviewedBy: 'System',
    reviewedAt: '2024-10-30T13:20:00Z',
  },
];

// OUTBOUND ENROLLMENT CALLS - from OutboundEnrollmentTab
export const outboundConversations: ConversationAnalytics[] = [
  {
    id: 'analytics-outbound-001',
    conversationId: 'OB001',
    patientId: 'OB001',
    patientName: 'Michael Anderson',
    conversationType: 'outbound-enrollment',
    callDate: '2024-10-30',
    callTime: '15:15',
    duration: 323, // 5:23
    transcript: convertAdherenceMessages([
      { speaker: 'AI', time: '15:15:00', message: "Hello, is this Michael Anderson?" },
      { speaker: 'Patient', time: '15:15:03', message: "Yes, this is Michael speaking." },
      { speaker: 'AI', time: '15:15:05', message: "Hi Michael! My name is Sarah, and I'm calling from the Biogen patient support program. Your doctor, Dr. Michael Cheng, recently prescribed AVONEX for your Multiple Sclerosis and referred you to our copay assistance program. Do you have a few minutes to chat about this?" },
      { speaker: 'Patient', time: '15:15:22', message: "Oh yes! Dr. Cheng mentioned something about this. I'd love to hear more." },
      { speaker: 'AI', time: '15:15:28', message: "Wonderful! This program is designed to help reduce your out-of-pocket costs for AVONEX. I have your insurance information here - you're with Blue Cross Blue Shield, correct?" },
      { speaker: 'Patient', time: '15:15:38', message: "Yes, that's right." },
      { speaker: 'AI', time: '15:15:41', message: "Perfect! I've already run a preliminary check on your eligibility, and I have great news - you qualify for the program. Without the copay card, your monthly out-of-pocket cost would be around $150. With our assistance program, your copay will be reduced to $0 per prescription." },
      { speaker: 'Patient', time: '15:15:58', message: "Wow, that's incredible! That would be a huge help." },
      { speaker: 'AI', time: '15:16:03', message: "I'm so glad to hear that! That's a savings of approximately $1,800 per year. Now, I just need your verbal consent to enroll you in the program. The enrollment is completely free, and you can cancel at any time. Do I have your permission to enroll you?" },
      { speaker: 'Patient', time: '15:16:20', message: "Yes, absolutely! Please enroll me." },
      { speaker: 'AI', time: '15:16:24', message: "Excellent! I'm processing your enrollment right now... And you're all set! Within the next 24 hours, you'll receive two things: First, an email with your copay card information and instructions. Second, a text message with the same information plus a digital copy of your card. You can start using it immediately once you receive it." },
      { speaker: 'Patient', time: '15:16:48', message: "That's so easy. How do I use it?" },
      { speaker: 'AI', time: '15:16:52', message: "Great question! When you pick up your AVONEX prescription from the pharmacy, simply present your copay card along with your regular insurance card. The pharmacy will process both, and your copay will automatically be reduced to $0. If you ever have any issues, there's a phone number on the card you can call for assistance." },
      { speaker: 'Patient', time: '15:17:12', message: "Perfect. And this works at any pharmacy?" },
      { speaker: 'AI', time: '15:17:16', message: "It works at most major pharmacies across the country. AVONEX is a specialty medication, so you'll need to use a specialty pharmacy. I can see that Dr. Cheng's office already sent your prescription to Accredo Specialty Pharmacy. They'll be reaching out to you within 2-3 business days to coordinate your first delivery." },
      { speaker: 'Patient', time: '15:17:38', message: "Okay great. Is there anything else I need to do?" },
      { speaker: 'AI', time: '15:17:42', message: "That's it! You're all enrolled. We'll also send you information about our other support services - including nurse support, injection training, and adherence programs. These are all included at no cost as part of the AVONEX support program. Is there anything else you'd like to know about the program?" },
      { speaker: 'Patient', time: '15:17:58', message: "No, I think you covered everything. Thank you so much for making this so easy!" },
      { speaker: 'AI', time: '15:18:03', message: "You're very welcome, Michael! We're here to support you throughout your treatment journey. If you have any questions in the future, you can always call our support line at 1-800-456-2255. Have a great day!" },
      { speaker: 'Patient', time: '15:18:18', message: "Thank you, you too!" }
    ]),
    overallSentiment: 'positive',
    sentimentScore: 0.89,
    sentimentShift: 0.4,
    topicsDetected: ['topic-copay', 'topic-enrollment', 'topic-satisfaction'],
    primaryTopic: 'topic-enrollment',
    resolutionStatus: 'resolved',
    resolutionTime: 323,
    escalated: false,
    csatScore: 5,
    npsScore: 10,
    qualityScore: 97,
    complianceScore: 99,
    empathyScore: 90,
    frictionPoints: [],
    frictionScore: 3,
    callDriver: 'Copay Program Enrollment',
    outcomeAchieved: true,
    riskLevel: 'low',
    abandonmentSignals: [],
    churnRisk: 5,
    tags: ['successful-enrollment', 'high-satisfaction', 'best-practice'],
    notes: 'Perfect enrollment conversation, patient highly satisfied',
    reviewed: true,
    reviewedBy: 'System',
    reviewedAt: '2024-10-30T15:20:00Z',
  },
];

// Export all conversations combined
export const allUnifiedConversations = [
  ...adherenceConversations,
  ...inboundConversations,
  ...outboundConversations,
];
