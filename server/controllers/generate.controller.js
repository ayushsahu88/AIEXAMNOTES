import Notes from "../models/notes.model.js";
import UserModel from "../models/user.model.js";
import { generateGeminiResponse } from "../services/gemini.services.js";
import { buildPrompt } from "../utils/promptBuilder.js";

export const generateNotes = async (req, res) => {
  try {
    const {
      topic,
      classLevel,
      examType,
      revisionMode = false,
      includeDiagram = false,
      includeChart = false,
    } = req.body;

    // 🔐 Auth check
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // 🧾 Validation
    if (!topic) {
      return res.status(400).json({ message: "Topic is required" });
    }

    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // 💳 Credits check
    if (user.credits < 10) {
      user.isCreditAvailable = false;
      await user.save();

      return res.status(403).json({
        message: "Insufficient credits",
      });
    }

    // 🧠 Prompt
    const prompt = buildPrompt({
      topic,
      classLevel,
      examType,
      revisionMode,
      includeDiagram,
      includeChart,
    });

    // 🤖 Gemini Call
    let aiResponse = await generateGeminiResponse(prompt);

    // 🔥 ✅ DIAGRAM FIX (ONLY CHANGE ADDED)
    try {
      const parsed = JSON.parse(aiResponse);

      if (parsed.diagram && parsed.diagram.data) {
        let d = parsed.diagram.data;

        let nodeIndex = 0;
        d = d.replace(/\[(.*?)\]/g, (match, label) => {
          nodeIndex++;
          return `N${nodeIndex}[${label}]`;
        });

        if (!d.trim().startsWith("graph")) {
          d = `graph TD\n${d}`;
        }

        parsed.diagram.data = d;
      }

      aiResponse = JSON.stringify(parsed);
    } catch (e) {
      // ignore if not JSON
    }

    // 🚨 Safety check
    if (!aiResponse || aiResponse.trim() === "") {
      return res.status(500).json({
        message: "AI failed to generate content",
      });
    }

    // 💾 Save Notes
    const notes = await Notes.create({
      user: user._id,
      topic,
      classLevel,
      examType,
      revisionMode,
      includeDiagram,
      includeChart,
      content: aiResponse,
    });

    // 💳 Deduct credits
    user.credits -= 10;

    if (user.credits <= 0) {
      user.isCreditAvailable = false;
    }

    if (!Array.isArray(user.notes)) {
      user.notes = [];
    }

    user.notes.push(notes._id);

    await user.save();

    // ✅ Response
    return res.status(200).json({
      data: aiResponse,
      noteId: notes._id,
      creditsLeft: user.credits,
    });
  } catch (error) {
    console.error("❌ CONTROLLER ERROR:", error.message);

    return res.status(500).json({
      error: "AI generation failed",
      message: error.message,
    });
  }
};
