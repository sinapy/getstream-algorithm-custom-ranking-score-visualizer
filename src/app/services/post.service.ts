import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  updateScores() {
    for (let post of this.posts) {
      post.score = this.calculateScore(post);
    }
  }

  calculateScore(post: any): any {
    const decayScore = this.linearDecayFunction(post.date);
    const reactionScore = this.reactionScore(post);
    const reactionScoreWithDecay = this.reactionDecayFunction(reactionScore, post.date);

    return decayScore * reactionScoreWithDecay;
  }

  reactionDecayFunction(reactionScore: number, date: any) {
    const reactionDecay = this.linearDecayFunction(date, 'reaction_decay');

    const pureReaction = reactionScore - 1;

    const decayScore = pureReaction * reactionDecay;

    return decayScore + 1;
  }

  reactionScore(post: any) {
    let initial = 1
    for (let reaction in post.reaction_count) {
      post.reaction_count[reaction] = post.reaction_count[reaction] || 0;
      initial += this.score_function.reaction_score.reaction_multiplier * post.reaction_count[reaction];
    }
    return initial;
  }


  linearDecayFunction(date: Date, function_name: string = 'linear_decay') {
    const now = new Date();
    const dayDiff = Math.ceil((now.getTime() - date.getTime()) / (1000 * 3600 * 24));
    let decayScore = 0;
    if (dayDiff < this.score_function[function_name].skipDays) {
      decayScore = 1;
    }
    else if (dayDiff < this.score_function[function_name].duraction_to_reach_decay + this.score_function[function_name].skipDays) {
      decayScore = 1 - (1 - this.score_function[function_name].decay) * (dayDiff - this.score_function[function_name].skipDays) / this.score_function[function_name].duraction_to_reach_decay;
    }
    else {
      decayScore = this.score_function[function_name].decay;
    }

    return decayScore;
  }

  constructor() { }

  public score_function : any = {
    "linear_decay": {
      "decay": 0.05,
      "duraction_to_reach_decay": 6,
      "skipDays": 1,
    },
    "reaction_decay": {
      "decay": 1,
      "duraction_to_reach_decay": 1,
      "skipDays": 0,
    },
    "reaction_score": {
      "reaction_multiplier": 0.005,
    }

  }

  public posts : any[] = [
    {
      reaction_count: {} as any,
      image: 'https://dummyimage.com/300x300&text=Post%201',
      date: new Date('2023-09-' + (new Date()).getDate() + 'T19:15:47.000Z')
    },
    {
      reaction_count: {} as any,
      image: 'https://dummyimage.com/300x300&text=Post%202',
      date: new Date('2023-09-' + (new Date()).getDate() + 'T19:15:48.000Z')
    },
    {
      reaction_count: {} as any,
      image: 'https://dummyimage.com/300x300&text=Post%203',
      date: new Date('2023-09-' + (new Date()).getDate() + 'T19:15:49.000Z')
    },
    {
      reaction_count: {} as any,
      image: 'https://dummyimage.com/300x300&text=Post%204',
      date: new Date('2023-09-' + (new Date()).getDate() + 'T19:15:50.000Z')
    },
    {
      reaction_count: {} as any,
      image: 'https://dummyimage.com/300x300&text=Post%205',
      date: new Date('2023-09-' + (new Date()).getDate() + 'T19:15:51.000Z')
    },
    {
      reaction_count: {} as any,
      image: 'https://dummyimage.com/300x300&text=Post%206',
      date: new Date('2023-09-' + (new Date()).getDate() + 'T19:15:52.000Z')
    },
    {
      reaction_count: {} as any,
      image: 'https://dummyimage.com/300x300&text=Post%207',
      date: new Date('2023-09-' + (new Date()).getDate() + 'T19:15:53.000Z')
    }
  ]

  public user1_posts : any[] = [
    this.posts[0],
    this.posts[1],
    this.posts[2],
    this.posts[5],
    this.posts[6],
  ]

  public user2_posts : any[] = [
    this.posts[3],
    this.posts[4],
    this.posts[1],
    this.posts[6],
  ]


}
