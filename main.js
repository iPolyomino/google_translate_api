const BadRequest = {
  code : 400,
  text : "Bad Request"
};

const InternalServerError = {
  code : 500,
  text : "Internal Server Error"
};

const OK = (text) => {
  return { code: 200, text: text }
};

const doGet =
    (e) => {
      const param = e.parameter;
      const text = param.text || "";
      const source = param.source || "ja";
      const target = param.target || "en";

      if (text === "") {
        return createResponse(BadRequest);
      }

      try {
        const translatedText = LanguageApp.translate(text, source, target);
        return createResponse(OK(translatedText));
      } catch (error) {
        return createResponse(BadRequest);
      }

      return createResponse(InternalServerError);
    }

const createResponse = (body) => {
  const response = ContentService.createTextOutput();
  response.setMimeType(ContentService.MimeType.JSON);
  response.setContent(JSON.stringify(body));

  return response;
}
