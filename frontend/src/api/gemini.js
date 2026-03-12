export const callGeminiAPI = async (prompt, systemInstruction = "") => {
  const apiKey = ""; // Add your actual API key here locally
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
 
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
  };
 
  if (systemInstruction) {
    payload.systemInstruction = { parts: [{ text: systemInstruction }] };
  }
 
  const maxRetries = 5;
  const delays = [1000, 2000, 4000, 8000, 16000];
  let retries = 0;
 
  while (retries <= maxRetries) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
 
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return (
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response generated."
      );
    } catch (error) {
      if (retries === maxRetries) {
        console.error("Gemini API failed after max retries", error);
        return "An error occurred while generating AI feedback. Please try again later.";
      }
      await new Promise((r) => setTimeout(r, delays[retries]));
      retries++;
    }
  }
};