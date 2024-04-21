import { OpenAI } from 'openai';

const openaiApiKey = 'sk-proj-3RTM3OOjak0r35BO7vfCT3BlbkFJC5lwLAIDELM4Sq7WRTkE';

const openaiClient = new OpenAI({
    apiKey: openaiApiKey,
    dangerouslyAllowBrowser: true,
});

export async function interpretDream(dreamText) {
    try {
        const response = await openaiClient.chat.completions.create({
            model: 'gpt-3.5-turbo',
            prompt: `Your dream: "${dreamText}" Interpret the dream's symbolism to uncover underlying emotions, fears, or conflicts the dreamer may be experiencing.`,
            max_tokens: 150,
            n: 1,
            stop: null,
        });

        const interpretation = response.data.choices[0].text.trim();
        const [title, description] = interpretation.split('\n\n', 2);

        return { title, description };
    } catch (error) {
        console.error('Error interpreting dream:', error);
        return { title: 'Error', description: 'Failed to interpret the dream.' };
    }
}
