import Notes from "../models/notes.model.js";

export const getMyNotes = async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.userId })
      .select(
        "topic classLevel examType revisionMode includeDiagram includeChart createdAt",
      )
      .sort({ createdAt: -1 });

    // ✅ correct check
    if (notes.length === 0) {
      return res.status(404).json({ message: "No notes found" });
    }

    return res.status(200).json({
      success: true,
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    console.error("getMyNotes Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getSingleNotes = async (req, res) => {
  try {
    const notes = await Notes.findOne({
      _id: req.params.id,
      user: req.userId,
    });
    if (!notes) {
      return res.status(404).json({ error: "Notes not found" });
    }
    return res.json({
      content: notes.content,
      topic: notes.topic,
      createdAt: notes.createdAt,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "getSingle notes error" });
  }
};
