


const extractJson = (text) => {
    try {
        if (!text) {
            return null;
        }

        // Remove markdown code blocks
        let cleanText = text.replace(/(```|''')[\w-]*\n?/g, "").trim();

        // Try multiple extraction strategies

        // Strategy 1: Find JSON between first { and last }
        let openBracket = cleanText.indexOf("{");
        let closeBracket = cleanText.lastIndexOf("}");

        if (openBracket === -1 || closeBracket === -1) return null;

        let jsonString = cleanText.slice(openBracket, closeBracket + 1);

        // Strategy 2: If parsing fails, try to find the JSON by looking for "message" and "code" keys
        try {
            return JSON.parse(jsonString);
        } catch (firstError) {
            console.log("First parse attempt failed, trying alternative extraction...");

            // Look for pattern: {"message":"...","code":"..."}
            const messageMatch = cleanText.match(/"message"\s*:\s*"([^"]+)"/);
            const codeMatch = cleanText.match(/"code"\s*:\s*"([\s\S]+?)"\s*}/);

            if (messageMatch && codeMatch) {
                return {
                    message: messageMatch[1],
                    code: codeMatch[1].replace(/\\"/g, '"').replace(/\\n/g, '\n')
                };
            }

            // Strategy 3: Try to extract and fix common JSON issues
            // Remove potential trailing commas
            jsonString = jsonString.replace(/,(\s*[}\]])/g, '$1');

            try {
                return JSON.parse(jsonString);
            } catch (secondError) {
                console.log("Error Extracting JSON:", secondError);
                return null;
            }
        }

    } catch (error) {
        console.log("Error Extracting JSON:", error);
        return null;
    }
};

module.exports = extractJson;