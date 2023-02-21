import fitz
import re
import spacy


class ResumeExtractor:
    """Extracting keywords from the resume"""

    def __init__(self, resume):
        self.resume = resume
        self.nlp = spacy.load("en_core_web_trf")

    def extract(self):
        """Extracting text from the resume"""
        doc = fitz.Document(self.resume)
        page = doc.load_page(0)
        text = page.get_text()
        headings = re.findall(r"\n\d+.+[ \t][a-zA-Z].+\n", text)
        try:
            idx = 0
            for idx in range(len(headings)):
                if "work" or "experience" in headings[idx].lower():
                    break

            paras = re.split(r"\n\d+.+[ \t][a-zA-Z].+\n", text)
            text = paras[idx + 1]
            return text
        except IndexError:
            return ""

    def extract_keywords(self):
        """Extracting keywords from the resume"""
        text = self.extract()
        if text == "":
            return []
        else:
            doc = self.nlp(text)
            return [x for x in doc.ents if not any(c.text.isdigit() for c in x)]
