
import { Configuration, OpenAIApi } from 'openai';




// Create a configuration instance
const config = new Configuration({
    apiKey: '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',
    organization: "org-cAt40S6WGpxhkNN7F3Xne1hP", 
});

const openai = new OpenAIApi(config);

export default openai;