import { GoogleGenAI, Type } from "@google/genai";
import { Theme, QuizQuestion } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateTestQuestion = async (
  themes: Theme[],
): Promise<string> => {
  if (themes.length === 0) {
    return "Please select at least one theme to generate a question.";
  }

  const themeDetails = themes
    .map((t) => `- Theme: ${t.title}\n  - Importance: ${t.why}`)
    .join("\n\n");

  const prompt = `
    You are a Senior QA Manager responsible for creating skill assessment tests for your team.
    Your goal is to help them think critically.

    Based on the following selected themes and their descriptions, generate a single, new, and challenging real-world scenario question for a QA engineer.
    The question must be in Thai.
    Do not simply repeat or slightly modify the example scenarios provided in the theme descriptions. Create a unique situation that synthesizes the core ideas of the selected themes.

    Selected Themes:
    ${themeDetails}

    The question should be practical and force the test-taker to make decisions, justify them, and consider multiple perspectives (technical, business, user).

    **Formatting Instructions:**
    - Use Markdown formatting to make the output structured and readable.
    - Use **bold** for key terms or emphasis.
    - Use headings (###) for sections like "Situation", "Problem", "Question".
    - Use lists (bullet points or numbered lists) where appropriate.

    Generate the Thai language question now.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating test question:", error);
    throw new Error(
      "Failed to generate a question from the AI. Please check your API key and try again.",
    );
  }
};

export const getFeedbackOnAnswer = async (
  question: string,
  answer: string,
): Promise<string> => {
  const prompt = `
    You are an expert QA Mentor providing constructive feedback. A QA engineer was given a question and provided an answer.
    Your task is to evaluate the answer and provide feedback in Thai, using Markdown for clear formatting.

    The feedback should be structured as follows:

    ### จุดแข็ง (Strengths)
    * Acknowledge what the engineer answered well. Be specific.

    ### จุดที่ควรปรับปรุง (Areas for Improvement)
    * Point out what could be better, what they missed, or any gaps in their reasoning.

    ### ข้อเสนอแนะ (Concrete Suggestions)
    * Provide actionable advice on how they could have approached the problem better. Suggest specific techniques, tools, or communication strategies.

    The feedback should be professional, encouraging, and aimed at helping the engineer grow their skills.
    Use **bold** for emphasis where appropriate.

    ---
    **Question Given:**
    ${question}

    ---
    **Engineer's Answer:**
    ${answer}
    ---

    Provide the detailed feedback in Thai now.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error getting feedback:", error);
    throw new Error(
      "Failed to get feedback from the AI. Please check your API key and try again.",
    );
  }
};

export const generateQuizQuestions = async (): Promise<QuizQuestion[]> => {
  const prompt = `
    You are a Senior QA Manager creating a challenging multiple-choice quiz for your team.
    The quiz must focus on the category "Core QA Fundamentals & Strategy".
    Generate exactly 5 complex, strategic, real-world scenario-based questions in Thai.
    For each question, provide 4 distinct, plausible options.
    For each question, indicate the correct answer index (0-3) and provide a concise rationale in Thai explaining why it's the best choice and why the others are less ideal.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: {
                type: Type.STRING,
                description: "The quiz question in Thai.",
              },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "An array of 4 possible answers in Thai.",
              },
              correctAnswerIndex: {
                type: Type.INTEGER,
                description:
                  "The 0-based index of the correct answer in the options array.",
              },
              rationale: {
                type: Type.STRING,
                description:
                  "A detailed explanation in Thai for why the correct answer is the best choice.",
              },
            },
            required: [
              "question",
              "options",
              "correctAnswerIndex",
              "rationale",
            ],
          },
        },
      },
    });

    const jsonText = response.text.trim();
    const quizData = JSON.parse(jsonText);

    if (!Array.isArray(quizData) || quizData.length === 0) {
      throw new Error("AI returned invalid quiz data format.");
    }

    return quizData as QuizQuestion[];
  } catch (error) {
    console.error("Error generating quiz questions:", error);
    if (error instanceof SyntaxError) {
      throw new Error(
        "Failed to parse the quiz data from the AI. The response was not valid JSON.",
      );
    }
    throw new Error(
      "Failed to generate a quiz from the AI. Please check your API key and try again.",
    );
  }
};
