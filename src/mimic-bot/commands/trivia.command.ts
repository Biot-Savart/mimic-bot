import { triviaQuestions } from '../data/trivia-questions';
import { OpenAiClientService } from '../mimic-bot/services/openAiClient.service';
import { BaseCommand, IOptionResponse } from './base.command';

interface ITriviaCommandArguments {
  args: IOptionResponse[];
  client: OpenAiClientService;
  channelId: string;
  user: string;
}

interface ITriviaQuestion {
  question: string;
  answer: string;
}

// TriviaCommand class
export class TriviaCommand extends BaseCommand<ITriviaCommandArguments> {
  private lastTriviaQuestionPerChannel: Record<number, ITriviaQuestion> = {};
  private userTriviaScorePerChannel: Record<number, string> = {};

  constructor() {
    super({
      name: 'trivia',
      description: 'Starts a trivia game',
      options: [
        // {
        //   name: 'subject',
        //   type: 3,
        //   description: 'Subject for the trivia question',
        //   required: false,
        // },
        {
          name: 'answer',
          type: 3,
          description: 'Answer to the trivia question',
          required: false,
        },
      ],
    });
  }

  async execute(input: ITriviaCommandArguments): Promise<string> {
    try {
      // Implement trivia logic here
      //   if (input.args[0].name === 'subject') {
      //     const triviaQuestion = await input.client.generateResponse(
      //       `Give me a very easy trivia question about ${input.args[0].value}, followed by the answer. Separate the question and answer`,
      //       input.channelId,
      //     );
      //     this.lastTriviaQuestionPerChannel[input.channelId] = triviaQuestion;
      //     return `Trivia Question: ${triviaQuestion}`;
      //   }

      if (input.args.length && input.args[0].name === 'answer') {
        if (!this.userTriviaScorePerChannel[input.user])
          this.userTriviaScorePerChannel[input.user] = 0;

        const triviaQuestion: ITriviaQuestion =
          this.lastTriviaQuestionPerChannel[input.channelId];
        // const triviaAnswer = await input.client.generateResponse(
        //   `Is the correct answer to the trivia question, ${triviaQuestion}= ${input.args[0].value}`,
        //   input.channelId,
        // );

        if (
          triviaQuestion.answer.toLowerCase() ===
          input.args[0].value.toString().toLowerCase()
        ) {
          this.userTriviaScorePerChannel[input.user]++;
        }

        return `Trivia Answer: ${triviaQuestion.answer}, Score for ${
          input.user
        }: ${this.userTriviaScorePerChannel[input.user]}`;
      }

      const triviaQuestion = await this.fetchRandomQuestion();
      this.lastTriviaQuestionPerChannel[input.channelId] = triviaQuestion;
      return `Trivia Question: ${triviaQuestion.question}`;
    } catch (error) {
      console.log(error);
      return `Error: ${error}`;
    }
  }

  private async fetchRandomQuestion(): Promise<ITriviaQuestion> {
    try {
      const questions = triviaQuestions;
      const randomIndex = Math.floor(Math.random() * questions.length);
      return questions[randomIndex];
    } catch (error) {
      console.error('Error fetching question:', error);
      return null;
    }
  }
}
