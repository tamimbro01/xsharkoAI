const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const generateResponse = async (prompt, retries = 5) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const res = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-goog-api-key': process.env.GEMINI_API_KEY,
                    },
                    body: JSON.stringify({
                        contents: [
                            {
                                parts: [{ text: prompt }],
                            },
                        ],
                        generationConfig: {
                            temperature: 0.2,
                        },
                    }),
                }
            );

            // If 503 (overloaded) or 429 (rate limit) and retries left, wait and retry
            if ((res.status === 503 || res.status === 429) && attempt < retries) {
                const waitMs = attempt * 3000; // 3s, 6s, 9s, 12s, 15s
                console.log(`Gemini ${res.status} - retrying in ${waitMs / 1000}s... (attempt ${attempt}/${retries})`);
                await sleep(waitMs);
                continue;
            }

            if (!res.ok) {
                const err = await res.text();

                // If last attempt failed, throw error
                if (attempt === retries) {
                    throw new Error('Gemini API Error: ' + err);
                }

                // Otherwise retry after wait
                console.log(`Gemini error - retrying in ${attempt * 3000 / 1000}s... (attempt ${attempt}/${retries})`);
                await sleep(attempt * 3000);
                continue;
            }

            const data = await res.json();
            return data.candidates[0].content.parts[0].text;

        } catch (error) {
            // If last attempt, throw the error
            if (attempt === retries) {
                throw error;
            }
            // Otherwise wait and retry
            console.log(`Network error - retrying in ${attempt * 3000 / 1000}s... (attempt ${attempt}/${retries})`);
            await sleep(attempt * 3000);
        }
    }
};

module.exports = generateResponse;




















// const generateResponse = async (prompt) => {
//     const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
//         method: 'POST',
//         headers: {
//             Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             model: 'deepseek/deepseek-v3.2',
//             messages: [
//                 {
//                     role: 'system',
//                     content: 'you must only valid row json ',

//                 },
//                 {
//                     role: 'user',
//                     content: prompt,
//                 },
//             ],
//             temperature: 0.2
//         }),
//     });

//     if(!res.ok){
//         const err = await res.text();
//         throw new Error("Open ROuter Error" + err);

//     }

//     const data = await res.json();

//     return data.choices[0].message.content;


// }

// module.exports = generateResponse;