from googletrans import Translator

def translate_text(text, target_language):
    translator = Translator()
    result = translator.translate(text, dest=target_language)
    return result.text
