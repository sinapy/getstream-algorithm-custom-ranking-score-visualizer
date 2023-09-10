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

    return decayScore * reactionScore;
  }

  reactionScore(post: any) {
    let initial = 1
    for (let reaction in post.reaction_count) {
      post.reaction_count[reaction] = post.reaction_count[reaction] || 0;
      initial += this.score_function.reaction_score.reaction_multiplier * post.reaction_count[reaction];
    }
    return initial;
  }


  linearDecayFunction(date: Date) {
    const now = new Date();
    const dayDiff = Math.ceil((now.getTime() - date.getTime()) / (1000 * 3600 * 24));
    let decayScore = 0;
    if (dayDiff < this.score_function.linear_decay.skip) {
      decayScore = 1;
    }
    else if (dayDiff < this.score_function.linear_decay.duraction_to_reach_decay + this.score_function.linear_decay.skip) {
      decayScore = 1 - (1 - this.score_function.linear_decay.decay) * (dayDiff - this.score_function.linear_decay.skip) / this.score_function.linear_decay.duraction_to_reach_decay;
    }
    else {
      decayScore = this.score_function.linear_decay.decay;
    }

    return decayScore;
  }

  constructor() { }

  public score_function = {
    "linear_decay": {
      "decay": 0.05,
      "duraction_to_reach_decay": 6,
      "skip": 1,
    },
    "reaction_decay": {
      "decay": 1,
      "duraction_to_reach_decay": 1,
      "skip": 0,
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
    }
  ]


}
