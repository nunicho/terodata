
//sk-myVx3dHlFEukZhTlSY5k-dATzkq6sZ1_-g3xv0viPLT3BlbkFJ388ZC5UTyvFqHtCmxADDuigA7TMiSqQLi_VPyR-yEA


const apiKey = "YOUR_API_KEY"; // Reemplaza con tu clave API

async function fetchChatGPTResponse(prompt) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo", // Puedes cambiar al modelo que prefieras
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok: " + response.statusText);
  }

  const data = await response.json();
  return data.choices[0].message.content; // Devuelve el texto de la respuesta
}

// Ejemplo de uso
fetchChatGPTResponse("¿Cuáles son los beneficios de usar APIs?")
  .then((response) => {
    console.log("Respuesta de ChatGPT:", response);
  })
  .catch((error) => {
    console.error("Error:", error);
  });