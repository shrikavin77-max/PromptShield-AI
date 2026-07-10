from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate
from reportlab.platypus import Paragraph
from reportlab.lib.styles import getSampleStyleSheet


def create_pdf(result, filename):

    styles = getSampleStyleSheet()

    doc = SimpleDocTemplate(filename, pagesize=letter)

    story = []

    story.append(Paragraph("<b>PromptShield AI Report</b>", styles["Title"]))

    story.append(Paragraph(f"<b>Risk Level:</b> {result['risk_level']}", styles["BodyText"]))

    story.append(Paragraph(f"<b>Risk Score:</b> {result['risk_score']}%", styles["BodyText"]))

    story.append(Paragraph(f"<b>Privacy Level:</b> {result['privacy_level']}", styles["BodyText"]))

    story.append(Paragraph("<b>Detected Data</b>", styles["Heading2"]))

    if len(result["findings"]) == 0:

        story.append(Paragraph("No sensitive data detected.", styles["BodyText"]))

    else:

        for item in result["findings"]:

            story.append(Paragraph(item, styles["BodyText"]))

    story.append(Paragraph("<b>Masked Prompt</b>", styles["Heading2"]))

    story.append(Paragraph(result["masked_prompt"], styles["BodyText"]))

    story.append(Paragraph("<b>AI Response</b>", styles["Heading2"]))

    story.append(Paragraph(result["response"], styles["BodyText"]))

    doc.build(story)