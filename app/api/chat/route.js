import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

export async function POST(request) {
    try {
        const { message } = await request.json();
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{ role: "user", content: message }],
        });
        return Response.json({
            response: completion.choices[0].message.content
        });
    } catch (error) {
        console.error("OpenAI API error:", error);
        return Response.json({
            error: 'An error occurred while processing your request.',
        }, { status: 500 });
    }
}