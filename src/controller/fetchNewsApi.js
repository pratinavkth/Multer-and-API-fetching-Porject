const ApiError= require("@google/genai");

exports.newsApi = async(req,res)=>{
    try {
        const response = await fetch(process.env.NEWS_URL);

        if (!response.ok) {
            throw new ApiError(response.status, 'Failed to fetch news');
        }

        const data = await response.json();
        const filteredResults = (data.results || []).map(article => ({
            title: article.title,
            description: article.description
        }));

        res.status(200).json({
            success: true,
            news: filteredResults
        });
    } catch (error) {
        next(error instanceof ApiError ? error : new ApiError(500, error.message, error.stack));
    }

}