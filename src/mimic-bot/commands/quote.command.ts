import { BaseCommand } from './base.command';

export class QuoteCommand extends BaseCommand<any> {
  constructor() {
    super({
      name: 'quote',
      description: 'Shares a random inspirational quote',
      options: [],
    });
  }

  async execute(input: any): Promise<string> {
    const quotes = [
      'The only way to do great work is to love what you do. - Steve Jobs',
      'The purpose of our lives is to be happy. - Dalai Lama',
      "Life is what happens when you're busy making other plans. - John Lennon",
      "Don't let yesterday take up too much of today. - Will Rogers",
      'You only live once, but if you do it right, once is enough. - Mae West',
      "In the end, it's not the years in your life that count. It's the life in your years. - Abraham Lincoln",
      'Life is either a daring adventure or nothing at all. - Helen Keller',
      'The best way to predict the future is to create it. - Peter Drucker',
      'Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill',
      'Life is like riding a bicycle. To keep your balance, you must keep moving. - Albert Einstein',
      'The only thing necessary for the triumph of evil is for good men to do nothing. - Edmund Burke',
      'You miss 100% of the shots you don’t take. - Wayne Gretzky',
      'In three words I can sum up everything I’ve learned about life: it goes on. - Robert Frost',
      'To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment. - Ralph Waldo Emerson',
      'The biggest risk is not taking any risk. In a world that’s changing quickly, the only strategy that is guaranteed to fail is not taking risks. - Mark Zuckerberg',
      'The only thing standing between you and your goal is the story you keep telling yourself as to why you can’t achieve it. - Jordan Belfort',
      'It does not matter how slowly you go as long as you do not stop. - Confucius',
      'You are never too old to set another goal or to dream a new dream. - C.S. Lewis',
      'Life is 10% what happens to us and 90% how we react to it. - Charles R. Swindoll',
      'The best revenge is massive success. - Frank Sinatra',
      'If you want to lift yourself up, lift up someone else. - Booker T. Washington',
      'I find that the harder I work, the more luck I seem to have. - Thomas Jefferson',
      'The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt',
      'Don’t watch the clock; do what it does. Keep going. - Sam Levenson',
      'The only thing we have to fear is fear itself. - Franklin D. Roosevelt',
      'A person who never made a mistake never tried anything new. - Albert Einstein',
      'Believe you can and you’re halfway there. -Theodore Roosevelt',
      'The way to get started is to quit talking and begin doing. - Walt Disney',
      'If you can dream it, you can achieve it. - Zig Ziglar',
      'I can’t change the direction of the wind, but I can adjust my sails to always reach my destination. - Jimmy Dean',
      'It’s not whether you get knocked down, it’s whether you get up. - Vince Lombardi',
      'The best revenge is massive success. - Frank Sinatra',
      'Your time is limited, don’t waste it living someone else’s life. - Steve Jobs',
      'The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt',
      'The only thing standing between you and your goal is the story you keep telling yourself as to why you can’t achieve it. - Jordan Belfort',
      'The harder you work for something, the greater you’ll feel when you achieve it. - Unknown',
      'If you can dream it, you can achieve it. - Zig Ziglar',
      'Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill',
      'It always seems impossible until it’s done. - Nelson Mandela',
      'Don’t count the days, make the days count. - Muhammad Ali',
      'You don’t have to be great to start, but you have to start to be great. - Zig Ziglar',
      'You miss 100% of the shots you don’t take. - Wayne Gretzky',
      'In three words I can sum up everything I’ve learned about life: it goes on. - Robert Frost',
      'To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment. - Ralph Waldo Emerson',
      'The biggest risk is not taking any risk. In a world that’s changing quickly, the only strategy that is guaranteed to fail is not taking risks. - Mark Zuckerberg',
      'The only thing standing between you and your goal is the story you keep telling yourself as to why you can’t achieve it. - Jordan Belfort',
      'It does not matter how slowly you go as long as you do not stop. - Confucius',
      'You are never too old to set another goal or to dream a new dream. - C.S. Lewis',
      'Life is 10% what happens to us and 90% how we react to it. - Charles R. Swindoll',
      'The best revenge is massive success. - Frank Sinatra',
      'If you want to lift yourself up, lift up someone else. - Booker T. Washington',
      'I find that the harder I work, the more luck I seem to have. - Thomas Jefferson',
      'The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt',
      'Don’t watch the clock; do what it does. Keep going. - Sam Levenson',
      'The only thing we have to fear is fear itself. - Franklin D. Roosevelt',
      'A person who never made a mistake never tried anything new. - Albert Einstein',
      'Believe you can and you’re halfway there. -Theodore Roosevelt',
      'The way to get started is to quit talking and begin doing. - Walt Disney',
      'If you can dream it, you can achieve it. - Zig Ziglar',
      'I can’t change the direction of the wind, but I can adjust my sails to always reach my destination. - Jimmy Dean',
      'It’s not whether you get knocked down, it’s whether you get up. - Vince Lombardi',
      'The best revenge is massive success. - Frank Sinatra',
      'Your time is limited, don’t waste it living someone else’s life. - Steve Jobs',
      'The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt',
      'The only thing standing between you and your goal is the story you keep telling yourself as to why you can’t achieve it. - Jordan Belfort',
      'The harder you work for something, the greater you’ll feel when you achieve it. - Unknown',
    ];
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    return quote;
  }
}
