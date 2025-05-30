
import { Template } from './types';

/**
 * Deep-structured prompt templates (Free & Pro)
 */
export const DEFAULT_TEMPLATES: Record<string, Template> = {

  'general-optimize': {
    id: 'general-optimize',
    name: 'General Optimization',
    description: 'Structured prompt cleanup & improvement.',
    content: `You are a professional AI prompt optimizer. Please improve the prompt using the structure below. Avoid any code blocks or additional explanation:

# Role: [Role Name]

## Profile
- Language: [Language]
- Description: [Detailed description]
- Background: [Background]
- Personality: [Traits]
- Expertise: [Expertise]
- Target Audience: [Audience]

## Skills
- [Skill 1]: [Description]
- [Skill 2]: [Description]

## Rules
- Maintain clarity and professionalism.
- Adhere to format and structure strictly.

## Workflow
- Goal: [Goal]
- Step 1: [Explain]
- Step 2: [Explain]
- Expected Result: [Describe]

## Initialization
Please begin optimization based on the template above without wrapping the response in code blocks.`,
    isBuiltin: true,
    access: 'free'
  },
  'output-format-optimize': {
    id: 'output-format-optimize',
    name: 'Prompt with Output Format',
    description: 'Optimize prompt and force output format.',
    content: `You are a professional prompt engineer. Please optimize the following prompt based on the requirements and ensure proper output formatting:

# Role: [Role Name]

## OutputFormat
- Format Type: [e.g., markdown, JSON]
- Structure: [Details]
- Style: [Tone/Style]
- Special Requirements: [Instructions]

## Initialization
Please follow the above format and produce a well-structured optimized prompt without explanation.`,
    isBuiltin: true,
    access: 'free'
  },
  'instruction-prompt': {
    id: 'instruction-prompt',
    name: 'Instructional Prompt Formatter',
    description: 'Turn messy prompt into task/context/instructions.',
    content: `# Role: Structured Prompt Expert

## Objective:
Turn a messy or general prompt into a clearly structured format.

## Requirements:
- Use <task>, <context>, <instructions>, <output_format> tags
- Maintain semantic clarity
- Do not rewrite the context

## Output Example:
<optimized_prompt>
<task>Summarize a news article</task>

<context>
Original prompt text goes here.
</context>

<instructions>
1. Read carefully
2. Extract key facts
3. Summarize clearly
</instructions>

<output_format>
Bullet points or 3-paragraph summary
</output_format>
</optimized_prompt>

## Initialization:
Use the format above and apply it directly to the user’s original prompt.`,
    isBuiltin: true,
    access: 'free'
  },
  'expert-fix': {
    id: 'expert-fix',
    name: 'Expert-Level Prompt Fix',
    description: 'Analyse logic & tone, return optimised version.',
    content: `# Role: Prompt Optimization Expert

## Background:
My job depends on writing better prompts. Please help improve the following one with full focus and creativity.

## Profile:
- Expert in transforming standard prompts into structured formats.
- Deep understanding of NLP and LLM behavior.
- Experience designing goal-driven prompts.

## Constraints:
- Stick to the original context and needs.
- Avoid generalities; focus on precision.
- Use markdown, avoid code blocks.

## Goals:
- Analyze and restructure prompt
- Improve logic, readability, engagement

## Suggestions:
Provide categorized suggestions such as:
- Structure Improvements
- Logic Enhancements
- Readability Tips

## Initialization:
Output the final prompt directly, no extra comments.`,
    isBuiltin: true,
    access: 'pro'
  },
  'tag-format': {
    id: 'tag-format',
    name: 'Prompt to Structured Tag Format',
    description: 'Convert prompt into tagged instructions for devs.',
    content: `# Role: Structured Prompt Formatter

## Goal:
Convert the given prompt into a structured, tag-based format.

## Tags to Use:
<task>Describe the task</task>

## Initialization:
Output the final tag-based prompt without explanations.`,
    isBuiltin: true,
    access: 'pro'
  },
  'social-caption': {
    id: 'social-caption',
    name: 'Social Media Caption Prompt',
    description: 'Generate engaging captions with emojis & hashtags.',
    content: `# Role: Social Media Caption Expert

## Profile
- Platform: [Instagram, TikTok, Facebook, etc.]
- Audience: [Teenagers, Professionals, Moms, Fitness enthusiasts, etc.]
- Tone: [Funny, Informative, Inspirational, Casual]
- Engagement Style: [Question-based, Emoji-rich, Hashtag-heavy, CTA-focused]

## Output Style
- Length: [Short, Medium, Long]
- Format: [Single caption, Caption + CTA, Hook + Body]
- Emoji Level: [None, Light, High]
- Hashtag Strategy: [Niche, Trendy, Mix, Skip]

## Instructions
1. Understand the audience and platform culture.
2. Generate a caption that fits the tone and strategy.
3. Include emojis and hashtags as required.
4. Avoid clichés or overly salesy language.

## Constraints
- Do not include discount codes.
- Keep within platform character limits.
- Use maximum 3 hashtags unless specified.

## Initialization
Generate a prompt that asks the AI to create a caption based on the settings above.`,
    isBuiltin: true,
    access: 'pro'
  },
  'essay-builder': {
    id: 'essay-builder',
    name: 'Student Essay Builder',
    description: 'Turn a topic into a structured academic essay prompt.',
    content: `# Role: Academic Essay Prompt Engineer

## Profile
- Subject: [History, Literature, Science, etc.]
- Topic: [Essay topic here]
- Level: [High School, College, University]
- Tone: [Formal, Argumentative, Analytical]

## Instructions
1. Guide AI to write a 5‑paragraph essay:
   - Introduction with thesis
   - Three body paragraphs with evidence
   - Conclusion with closing summary
2. Use formal academic language.

## Output Format
- Introduction (3–4 sentences)
- Body Paragraph 1
- Body Paragraph 2
- Body Paragraph 3
- Conclusion

## Constraints
- Avoid contractions.
- No personal anecdotes unless specified.

## Initialization
Rewrite the user’s topic as a prompt that generates a well‑structured academic essay.`,
    isBuiltin: true,
    access: 'pro'
  },
  'email-prompt': {
    id: 'email-prompt',
    name: 'Email Writing Prompt',
    description: 'Produce polite, professional email drafts.',
    content: `# Role: Professional Email Prompt Architect

## Profile
- Sender Role: [Customer, Job Applicant, Vendor, Manager]
- Recipient: [Support, Hiring Manager, Client, Colleague]
- Purpose: [Request, Complaint, Follow-up, Thank You, Resignation]
- Tone: [Polite, Formal, Friendly, Assertive]

## Structure
- Subject: [Intent]
- Greeting: [Dear X, Hi Team]
- Body: [Main message with context]
- Call to Action: [Ask, Request, Confirm]
- Closing: [Best regards, Sincerely]

## Instructions
1. Rewrite the request into a clear email prompt.
2. Specify structure and tone.
3. Keep body to 2–3 short paragraphs.

## Constraints
- No slang or emojis.
- Be concise.

## Initialization
Generate a prompt that instructs AI to draft a professional email using the profile and structure above.`,
    isBuiltin: true,
    access: 'pro'
  },
  'reels-idea': {
    id: 'reels-idea',
    name: 'Trending Reels Idea Generator',
    description: 'Prompt for viral Instagram/TikTok video ideas.',
    content: `# Role: Viral Reels Idea Architect

## Profile
- Platform: [Instagram Reels, TikTok]
- Niche: [e.g., cooking, fitness, tech gadgets]
- Goal: [Brand awareness, Engagement, Product showcase]
- Tone: [Humorous, Inspirational, Educational]

## Output Requirements
- Number of Ideas: [e.g., 5]
- Format per Idea: Hook | Key Action | Suggested Sound

## Instructions
1. Align ideas with niche and goal.
2. Keep each idea under 30 seconds conceptually.
3. Suggest trending audio if relevant.

## Constraints
- Avoid copying existing viral videos.
- Keep language simple and energetic.

## Initialization
Create a prompt that asks AI for short‑form video ideas using the profile and requirements above.`,
    isBuiltin: true,
    access: 'pro'
  },
  'study-notes': {
    id: 'study-notes',
    name: 'Study Notes Prompt',
    description: 'Summarise chapters into bullet-point revision notes.',
    content: `# Role: Study Notes Prompt Specialist

## Profile
- Subject: [Biology, History, Chemistry, etc.]
- Source Material Length: [Pages, Chapters, Minutes of lecture]
- Education Level: [Middle School, High School, College]

## Instructions
1. Instruct AI to extract key facts, terms, and definitions.
2. Summarize content into concise bullet points.
3. Group notes by subtopic or heading.

## Output Format
- Heading: [Subtopic]
  - Bullet 1
  - Bullet 2

## Constraints
- Avoid full sentences longer than 20 words.
- No personal opinions.

## Initialization
Generate a prompt that guides AI to create structured study notes from the given material.`,
    isBuiltin: true,
    access: 'pro'
  },
  'linkedin-post': {
    id: 'linkedin-post',
    name: 'LinkedIn Post Generator',
    description: 'Turn ideas into professional LinkedIn content.',
    content: `# Role: LinkedIn Post Prompt Designer

## Profile
- Industry: [Tech, Marketing, HR, Finance, etc.]
- Objective: [Share insight, Announce achievement, Ask question]
- Tone: [Professional, Conversational, Thought‑leadership]
- Audience: [Peers, Clients, Recruiters]

## Instructions
1. Create a hook in the first sentence.
2. Provide value or story in 2–3 sentences.
3. End with a question or CTA to drive engagement.

## Output Constraints
- 1300 characters max.
- Use emojis sparingly (optional).

## Initialization
Rewrite the request below into a prompt that instructs AI to craft a compelling LinkedIn post using the profile and instructions above.`,
    isBuiltin: true,
    access: 'pro'
  },
  'persona-builder': {
    id: 'persona-builder',
    name: 'Role + Persona Prompt Builder',
    description: 'Assign AI a personality and detailed task.',
    content: `# Role: Persona Prompt Architect

## Persona Details
- Role Name: [e.g., Expert Gardener, Financial Advisor]
- Background: [Brief backstory]
- Personality: [Friendly, Analytical, Humorous]
- Voice Style: [Casual, Professional, Storyteller]

## Tasks
- Primary Goal: [What the AI should achieve]
- Secondary Goals: [Any additional objectives]

## Workflow
1. Greet the user in character.
2. Ask clarifying questions.
3. Provide detailed, context-aware answers.

## Constraints
- Remain in character unless instructed otherwise.
- Do not mention being an AI.

## Initialization
Generate a prompt that defines the persona above and instructs AI to follow the workflow and constraints.`,
    isBuiltin: true,
    access: 'pro'
  },
};
