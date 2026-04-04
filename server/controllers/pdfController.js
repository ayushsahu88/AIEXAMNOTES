import PDFDocument from "pdfkit";

export const pdfDownload = async (req, res) => {
  try {
    const { result } = req.body;

    if (!result) {
      return res.status(400).json({ error: "No content provided" });
    }

    // 🔥 DEBUG
    console.log("RAW RESULT:", result);
    console.log("TYPE OF CONTENT:", typeof result?.content);

    // ✅ STEP 1: initial parse
    let parsedResult;

    if (result?.content) {
      parsedResult =
        typeof result.content === "string"
          ? JSON.parse(result.content)
          : result.content;
    } else {
      parsedResult = result;
    }

    // ✅ STEP 2: DOUBLE PARSE FIX (very important)
    if (typeof parsedResult === "string") {
      parsedResult = JSON.parse(parsedResult);
    }

    // 🔥 FINAL DEBUG
    console.log("FINAL PARSED DATA:", parsedResult);

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=ExamNotesAI.pdf",
    );

    doc.pipe(res);

    // 🎨 TITLE
    doc
      .fontSize(20)
      .fillColor("blue")
      .text("ExamNotes AI", { align: "center" })
      .fillColor("black");

    doc.moveDown();

    // ✅ IMPORTANCE
    doc.fontSize(14).text(`Importance: ${parsedResult?.importance || "N/A"}`);

    doc.moveDown();

    // ✅ SUB TOPICS
    doc.fontSize(16).text("Sub Topics");
    doc.moveDown(0.5);

    Object.entries(parsedResult?.subTopics || {}).forEach(([star, topics]) => {
      doc.moveDown(0.5);
      doc.fontSize(13).text(`${star} Topics:`);

      topics.forEach((t) => {
        doc.fontSize(12).text(`• ${t}`);
      });
    });

    doc.moveDown();

    // ✅ NOTES
    doc.fontSize(16).text("Notes");
    doc.moveDown(0.5);

    doc
      .fontSize(12)
      .text(
        (parsedResult?.notes || "No Notes Available").replace(/[#*]/g, ""),
        {
          lineGap: 4,
        },
      );

    doc.moveDown();

    // ✅ REVISION POINTS
    doc.fontSize(16).text("Revision Points");
    doc.moveDown(0.5);

    (parsedResult?.revisionPoints || []).forEach((p) => {
      doc.fontSize(12).text(`• ${p}`);
    });

    doc.moveDown();

    // ✅ QUESTIONS
    doc.fontSize(16).text("Important Questions");
    doc.moveDown(0.5);

    doc.fontSize(13).text("Short Questions:");
    (parsedResult?.questions?.short || []).forEach((q) => {
      doc.fontSize(12).text(`• ${q}`);
    });

    doc.moveDown(0.5);

    doc.fontSize(13).text("Long Questions:");
    (parsedResult?.questions?.long || []).forEach((q) => {
      doc.fontSize(12).text(`• ${q}`);
    });

    // ❌ DEBUG PAGE (REMOVE AFTER TESTING)
    if (!parsedResult?.importance) {
      doc.addPage();
      doc.fontSize(12).text("⚠ DEBUG DATA:");
      doc.text(JSON.stringify(parsedResult, null, 2));
    }

    doc.end();
  } catch (error) {
    console.log("❌ PDF ERROR:", error);
    return res.status(500).json({ message: "Pdf Download Error" });
  }
};
