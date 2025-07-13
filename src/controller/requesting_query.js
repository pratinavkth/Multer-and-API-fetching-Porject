const ApiError = require("../utils/ApiError");
const genAI = require("@google/genai");

const fs = require("node:fs");
exports.request_query = async(req,res,next)=>{
   try{
    const prompt = req.body.prompt;
     if (!prompt) {
            throw new ApiError(400, "Prompt is required in the request body");
        }

    const AI = new genAI.GoogleGenAI({
        apiKey:process.env.GEMINIAPIKEY
    });
        const response = await AI.models.generateContent({
            model: "models/gemini-1.5-flash-latest",
            // model: "gemini-2.5-flash",
            contents:[{text:prompt}],
        });
       
        // console.log(response.text);
         const responseText = response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini";

        res.status(200).json({
            success: true,
            result: responseText
        });
   }catch(e){
    next(e instanceof ApiError ? e : new ApiError(500, e.message, e.stack));
   } 
}

exports.sendingpdf = async(req,res,next)=>{
    try{
     if (!req.file) {
            throw new ApiError(400, 'No file uploaded');
        }

        const buffer = req.file.buffer;
        const ai = new genAI.GoogleGenAI({ apiKey: process.env.GEMINIAPIKEY});

    const contents = [
        { text: "Summarize this document" },
        {
            inlineData: {
                mimeType: 'application/pdf',
                data: buffer.toString("base64")
            }
        }
    ];


    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents
    });
    // console.log(response.text);
    const result = response?.candidates?.[0]?.content?.parts?.[0]?.text || "No summary generated";

        res.status(200).json({
            success: true,
            summary: result
        });


    }
    catch(e){
        next(e instanceof ApiError ? e : new ApiError(500, e.message, e.stack));
    }
}




exports.sendingimage = async(req,res)=>{
    try{
    
     if (!req.file) {
            throw new ApiError(400, 'No file uploaded');
        }

        const buffer = req.file.buffer;

    const ai = new genAI.GoogleGenAI({
        apiKey:process.env.GEMINIAPIKEY
    });
    const base64ImageFile = buffer.toString("base64");
    

    const contents = [
      {
       inlineData: {
       mimeType: "image/jpeg",
       data: base64ImageFile,
       },
      },
      { text: "Caption this image." }, 
    ];

    const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: contents,
    });
    // console.log(response.text);
    const result = response?.candidates?.[0]?.content?.parts?.[0]?.text || "No summary generated";

        res.status(200).json({
            success: true,
            summary: result
        });

    }
    catch(e){
        next(e instanceof ApiError ? e : new ApiError(500, e.message, e.stack));
    }
}