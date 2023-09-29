import { BaseCommand } from './base.command';

export class JokeCommand extends BaseCommand<any> {
  constructor() {
    super({
      name: 'joke',
      description: 'Tells a random joke',
      options: [],
    });
  }

  async execute(input: any): Promise<string> {
    const jokes = [
      "Why don't scientists trust atoms? Because they make up everything!",
      'Why did the chicken go to the seance? To talk to the other side!',
      "Why don't some fish play piano? Because you can't tuna fish!",
      'Why did the scarecrow win an award? Because he was outstanding in his field!',
      "Why don't skeletons fight each other? They don't have the guts!",
      'Why did the bicycle fall over? Because it was two tired!',
      'Why do we tell actors to break a leg? Because every play has a cast!',
      'Why did the tomato turn red? Because it saw the salad dressing!',
      'Why did the golfer bring two pairs of pants? In case he got a hole in one!',
      "Why don't basketball players get sunburned? Because they always stay in the shade!",
      'Why did the math book look sad? Because it had too many problems!',
      "Why can't you give Elsa a balloon? Because she will let it go!",
      'Why did the teddy bear say no to dessert? Because she was already stuffed!',
      'Why do bees have sticky hair? Because they use honey combs!',
      "Why can't you trust the king of the jungle? Because he is always lion!",
      'Why did the belt go to jail? Because it was holding up a pair of pants!',
      'Why did the cookie go to the doctor? Because it felt crummy!',
      'Why did the banker switch careers? Because he lost interest!',
      "Why don't we see elephants hiding in trees? Because they're really good at it!",
      'Why did the tomato turn red? Because it saw the salad dressing!',
      "Why don't some fish play piano? Because you can't tuna fish!",
      'Why did the scarecrow win an award? Because he was outstanding in his field!',
      "Why don't skeletons fight each other? They don't have the guts!",
      'Why did the bicycle fall over? Because it was two tired!',
      'Why do we tell actors to break a leg? Because every play has a cast!',
      'Why did the tomato turn red? Because it saw the salad dressing!',
      'Why did the golfer bring two pairs of pants? In case he got a hole in one!',
      "Why don't basketball players get sunburned? Because they always stay in the shade!",
      'Why did the math book look sad? Because it had too many problems!',
      "Why can't you give Elsa a balloon? Because she will let it go!",
      'Why did the teddy bear say no to dessert? Because she was already stuffed!',
      'Why do bees have sticky hair? Because they use honey combs!',
      "Why can't you trust the king of the jungle? Because he is always lion!",
      'Why did the belt go to jail? Because it was holding up a pair of pants!',
      'Why did the cookie go to the doctor? Because it felt crummy!',
      'Why did the banker switch careers? Because he lost interest!',
      "Why don't we see elephants hiding in trees? Because they're really good at it!",
    ];
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    return joke;
  }
}
