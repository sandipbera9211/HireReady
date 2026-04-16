import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const analyzeWithAI = async (resumeText, jobDescription) => {
  const prompt = `
You are ResumeAI, an expert ATS (Applicant Tracking System) and career coach with 
20+ years of experience in technical recruiting and HR across top tech companies.

Your task is to perform a deep, structured analysis of a candidate's resume 
against a specific job description.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

ANALYSIS INSTRUCTIONS:
1. matchScore     → Score 0–100 based on skill overlap, experience level, 
                    keywords, tools, and overall fit. Be strict and realistic.
2. missingKeyWords → List exact skills, tools, or technologies mentioned in 
                     the JD but absent or weak in the resume.
3. strengths      → Highlight what genuinely stands out in the resume that 
                    aligns well with this specific role.
4. weaknesses     → Point out honest gaps compared to what the JD requires.
5. suggestions    → Give 3–5 actionable steps to improve chances for this role.

STRICT OUTPUT RULES:
- Return ONLY a raw JSON object
- No markdown, no backticks, no explanation, no preamble
- All array values must be concise strings (max 15 words each)
- matchScore must be an integer

REQUIRED JSON FORMAT:
{
  "matchScore": 0-100,
  "missingKeyWords": ["keyword1", "keyword2", "keyword3"],
  "strengths": ["specific strength 1", "specific strength 2"],
  "weaknesses": ["honest weakness 1", "honest weakness 2"],
  "suggestions": ["actionable step 1", "actionable step 2", "actionable step 3"]
}
  `;

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile", 
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
      max_tokens: 1024,
    });

    const rawText = response.choices[0].message.content
      .trim()
      .replace(/^```json|^```|```$/gm, "")
      .trim();

    if (!rawText) throw new Error("Empty response from Groq");

    const parsed = JSON.parse(rawText);

    const requiredFields = ["matchScore", "missingKeyWords", "strengths", "weaknesses", "suggestions"];
    for (const field of requiredFields) {
      if (!(field in parsed)) throw new Error(`Missing field: ${field}`);
    }

    return parsed;

  } catch (error) {
    console.error("Groq AI error:", error.message);
    throw new Error("Failed to analyze resume. Please try again.");
  }
};




export const generateOptimizedResume = async (resumeText, jobDescription, missingKeyWords) => {
  const prompt = `
You are ResumeAI Pro, an elite resume writer and LaTeX expert.

Rewrite the candidate's resume as a complete, compilable LaTeX document 
optimized specifically for the provided job description.

━━━━━━━━━━━━━━━━━━━━━━━━━━
ORIGINAL RESUME:
${resumeText}
━━━━━━━━━━━━━━━━━━━━━━━━━━
TARGET JOB DESCRIPTION:
${jobDescription}
━━━━━━━━━━━━━━━━━━━━━━━━━━
 use those missing keywords in the resume naturally, but do not fabricate any experience or skills. ${missingKeyWords.length > 0 ? `The following keywords were identified as missing and should be incorporated if relevant: ${missingKeyWords.join(", ")}.` : "No specific keywords were identified as missing."  }
REWRITING RULES:
1. Keep all real contact info exactly as provided
2. Rewrite summary to match the JD in 2-3 lines
3. Prioritize JD-matching skills first
4. Rewrite experience bullets using STAR method with action verbs + quantified results
5. Highlight most relevant projects first with tech stack
6. Never fabricate experience, companies, or degrees
7. Mirror exact keywords from the job description naturally

LATEX RULES:
- Use Jake's Resume template format (moderncv or custom)
- Use this exact base template structure shown below
- Return ONLY the complete LaTeX code, nothing else
- No explanation, no markdown, no backticks
- Must be 100% compilable on Overleaf without any extra packages

BASE TEMPLATE TO FOLLOW:
\\documentclass[letterpaper,11pt]{article}
\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}

\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}
\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

\\titleformat{\\section}{\\vspace{-4pt}\\scshape\\raggedright\\large}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

\\newcommand{\\resumeItem}[1]{\\item\\small{#1 \\vspace{-2pt}}}
\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
  \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
    \\textbf{#1} & #2 \\\\
    \\textit{\\small#3} & \\textit{\\small #4} \\\\
  \\end{tabular*}\\vspace{-7pt}
}
\\newcommand{\\resumeProjectHeading}[2]{
  \\item
  \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
    \\small#1 & #2 \\\\
  \\end{tabular*}\\vspace{-7pt}
}
\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}}
\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

\\begin{document}

% Fill in with candidate's actual data from the resume
% Optimize every section for the job description provided

\\end{document}

Now generate the COMPLETE filled LaTeX resume using the candidate's real data, 
fully optimized for the job description. Return only raw LaTeX code.
  `;

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 4096,
    });

    const latexCode = response.choices[0].message.content
      .trim()
      .replace(/^```latex|^```tex|^```|```$/gm, "") // strip any markdown fences
      .trim();

    if (!latexCode || !latexCode.includes("\\documentclass")) {
      throw new Error("Invalid LaTeX output from AI");
    }

    return latexCode;

  } catch (error) {
    console.error("Groq LaTeX generation error:", error.message);
    throw new Error("Failed to generate optimized resume.");
  }
};


export const generatePreparationPlan = async (matchScore, missingKeyWords, strengths, weaknesses, suggestions, role, totalDays) => {
const prompt = `
You are an expert career coach and technical interview preparation specialist.

Based on the following job match analysis, create a detailed ${totalDays}-day preparation plan for a candidate applying for the role of "${role}".

## Candidate Analysis:
- **Match Score:** ${matchScore}%
- **Missing Keywords / Skill Gaps:** ${missingKeyWords?.join(", ")}
- **Strengths:** ${strengths?.join(", ")}
- **Weaknesses:** ${weaknesses?.join(", ")}
- **Suggestions:** ${suggestions?.join(", ")}

## Instructions:
- Create exactly ${totalDays} days of tasks, one task per day.
- Focus heavily on bridging the skill gaps identified in missing keywords and weaknesses.
- Reinforce strengths where relevant.
- Each task must be specific, actionable, and completable in one day (1–3 hours).
- Distribute topics logically: fundamentals first, then advanced, then mock/review sessions.
- The "gapAreas" should be a concise list of the top skill/knowledge gaps to address.

## Response Format:
Return ONLY a valid JSON object with no explanation, no markdown, no code fences. Use this exact structure:

{
  "role": "${role}",
  "totalDays": ${totalDays},
  "gapAreas": ["gap1", "gap2", "gap3"],
  "days": [
    {
      "day": 1,
      "topic": "Short topic title (e.g., 'JavaScript Closures')",
      "task": "Detailed, actionable task description. What to study, practice, or build today."
    },
    {
      "day": 2,
      "topic": "...",
      "task": "..."
    }
  ]
}

Rules:
- "gapAreas" must be an array of 3–6 strings identifying the key weak areas.
- "days" array must contain exactly ${totalDays} objects.
- Each day object must have "day" (number), "topic" (string), and "task" (string).
- "task" should be 2–4 sentences describing exactly what to do that day.
- Do NOT include any text outside the JSON object.
`;

  try {
    const res = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 4096,
    });

    const rawText = res.choices[0].message.content 
      .trim()
      .replace(/^```json|^```|```$/gm, "")
      .trim();

    const parsed = JSON.parse(rawText);
    return parsed;

  } catch (error) {
    console.error("Error generating preparation plan:", error);
    throw error;
  }
};

export const dayWisePreparation = async (resumeText, jobDescription, totalDays, gapAreas) => {
  const prompt = `
You are an expert career coach and technical interview preparation specialist.

A candidate has provided their resume and a job description. Based on the gap analysis, create a highly structured, actionable ${totalDays}-day interview preparation plan.

---

RESUME:
${resumeText}

---

JOB DESCRIPTION:
${jobDescription}

---

GAP AREAS TO FOCUS ON:
${gapAreas}

---

INSTRUCTIONS:
- Create exactly ${totalDays} days of preparation
- Each day must have a clear focus topic derived from the gap areas
- Tasks must be specific, actionable, and realistic to complete in one day
- Prioritize the most critical gaps in the first half of the plan
- Include a mix of: learning, practice, mock questions, and revision
- Do NOT repeat the same topic on consecutive days unless it's revision
- Keep tasks beginner-friendly but progressively challenging

RESPONSE FORMAT:
Return ONLY a valid JSON array. No explanation, no markdown, no extra text.

[
  {
    "day": 1,
    "topic": "Topic name",
    "focus": "One sentence describing the goal of this day",
    "tasks": [
      "Task 1 — specific and actionable",
      "Task 2 — specific and actionable",
      "Task 3 — specific and actionable"
    ],
    "resources": [
      "Resource name or URL"
    ],
    "practiceQuestion": "One interview question to practice today related to the topic"
  }
]
`;

  try {
    const res = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 4096,
    })
    const rawText = res.choices[0].message.content.trim().replace(/^```json|^```|```$/gm, "").trim()
    const parsed = JSON.parse(rawText)
    return parsed
  } catch (error) {
    console.error("Error generating day-wise preparation plan:", error)
    throw error
  }
}


export const generateMockInterviewQuestions = async (difficulty, selectedTopics) => {
  const count = Math.floor(Math.random() * 11) + 10; 
  const randomSeed = Math.random().toString(36).substring(7); 

  const prompt = `You are an expert technical interviewer. Generate exactly ${count} unique interview questions based on the following:

Difficulty: ${difficulty}
Topic: ${selectedTopics}
Session ID: ${randomSeed}

Rules:
- Questions must match the ${difficulty} difficulty level
  * easy: basic concepts, definitions, simple scenarios
  * medium: applied knowledge, problem solving, real scenarios  
  * hard: deep expertise, complex scenarios, edge cases
- Questions must be strictly relevant to ${selectedTopics}
- Every generation must produce DIFFERENT questions — never repeat previous sets
- Vary question styles: some conceptual, some scenario-based, some "what happens if...", some "compare X vs Y"
- No repeated or similar questions within this set
- Do NOT include answers
- Return ONLY a valid JSON array, no explanation, no markdown, no backticks

Return exactly this format:
[
  "Question 1 here",
  ...
  "Question ${count} here"
]`

  try {
    const res = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.9,   // ← was 0.3, low temp = same output every time
      max_tokens: 4096,   // ← was 2048, needed for up to 20 questions
    })

    const content = res.choices[0].message.content
    const cleaned = content.replace(/```json|```/g, "").trim()
    const questions = JSON.parse(cleaned)

    return questions

  } catch (error) {
    console.error("Error generating mock interview questions:", error)
    throw error
  }
}


export const feedbackReport=async(answers, questions,difficulty,questionTypes)=>{

 const qaList = questions.map((q, i) => (
    `Q${i + 1}: ${q}\nA${i + 1}: ${answers[i] || "No answer provided"}`
  )).join("\n\n")

  const prompt = `You are an expert interviewer. Evaluate the following interview answers.

Difficulty: ${difficulty}
Topic: ${questionTypes}

${qaList}

Rules:
- Score each answer from 0 to 10
- Give a strength and improvement tip per answer
- Give a total score out of 100
- Give an overall summary
- Return ONLY valid JSON, no markdown, no backticks

Return exactly this format:
{
  "totalScore": 75,
  "summary": "Overall feedback here...",
  "feedbacks": [
    {
      "questionIndex": 0,
      "question": "question text",
      "answer": "user answer",
      "score": 8,
      "strength": "what was good",
      "improvement": "what to improve"
    }
  ]
}`

try {
   const res = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 2048
    })

    const content=res.choices[0].message.content;
  const cleaned = content.replace(/```json|```/g, "").trim()
  return JSON.parse(cleaned)
} catch (error) {
   console.error("Error generating on FeedBack Report", error)
    throw error
}
}