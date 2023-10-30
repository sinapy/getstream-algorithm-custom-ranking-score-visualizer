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
      if (reaction === 'click')
      {
        initial += this.score_function.click_score.click_multiplier * post.reaction_count[reaction];
      }
      else if (reaction === 'watchtime')
      {
        initial += this.score_function.watch_time_score.watch_time_multiplier * post.reaction_count[reaction];
      }
      else if (reaction === 'postduration')
      {
        initial += this.score_function.post_duration_time_score.post_duration_time_multiplier * post.reaction_count[reaction];
      }
      else 
      {
        initial += this.score_function.reaction_score.reaction_multiplier * post.reaction_count[reaction];
      }
    }
    return initial;
  }


  linearDecayFunction(date: Date, function_name: string = 'linear_decay') {
    const now = new Date();
    const dayDiff = Math.ceil((now.getTime() - date.getTime()) / (1000 * 3600 * 24));
    let decayScore = 0;
    if (dayDiff < this.score_function[function_name].skip_days_before_starting_to_decay) {
      decayScore = 1;
    }
    else if (dayDiff < this.score_function[function_name].days_to_reach_final_score + this.score_function[function_name].skip_days_before_starting_to_decay) {
      decayScore = 1 - (1 - this.score_function[function_name].decay_final_score) * (dayDiff - this.score_function[function_name].skip_days_before_starting_to_decay) / this.score_function[function_name].days_to_reach_final_score;
    }
    else {
      decayScore = this.score_function[function_name].decay_final_score;
    }

    return decayScore;
  }


  this_day : string; 
  this_month : string;
  this_year : string;
  
  constructor() { 
    this.this_day = new Date().getDate().toString();
    this.this_month = (new Date().getMonth() + 1).toString();
    this.this_year = new Date().getFullYear().toString();

    this. posts = [
      {
      reaction_count: {} as any,
      image: 'https://dummyimage.com/300x300/cca/000&text=Post%201',
      date: new Date(this.this_year + '-' + this.this_month + '-' + (new Date()).getDate() + 'T19:15:47.000Z')
      },
      {
        reaction_count: {} as any,
        image: 'https://dummyimage.com/300x300/cc1/333&text=Post%202',
        date: new Date(this.this_year + '-' + this.this_month + '-' + (new Date()).getDate() + 'T19:15:48.000Z')
      },
      {
        reaction_count: {} as any,
        image: 'https://dummyimage.com/300x300/1cc/333&text=Post%203',
        date: new Date(this.this_year + '-' + this.this_month + '-' + (new Date()).getDate() + 'T19:15:49.000Z')
      },
      {
        reaction_count: {} as any,
        image: 'https://dummyimage.com/300x300/4ad/333&text=Post%204',
        date: new Date(this.this_year + '-' + this.this_month + '-' + (new Date()).getDate() + 'T19:15:50.000Z')
      },
      {
        reaction_count: {} as any,
        image: 'https://dummyimage.com/300x300/7ad/333&text=Post%205',
        date: new Date(this.this_year + '-' + this.this_month + '-' + (new Date()).getDate() + 'T19:15:51.000Z')
      }
  ]
  }

  public score_function : any = {
    "linear_decay": {
      "decay_final_score": 0.05,
      "days_to_reach_final_score": 6,
      "skip_days_before_starting_to_decay": 1,
    },
    "reaction_decay": {
      "decay_final_score": 1,
      "days_to_reach_final_score": 1,
      "skip_days_before_starting_to_decay": 0,
    },
    "reaction_score": {
      "reaction_multiplier": 0.005,
    },
    "click_score": {
      "click_multiplier": 0.001,
    },
    "watch_time_score": {
      "watch_time_multiplier": 0.00001,
    },
    "post_duration_time_score": {
      "post_duration_time_multiplier": 0.00001,
    }

  }

  public posts : any[] = []


}
