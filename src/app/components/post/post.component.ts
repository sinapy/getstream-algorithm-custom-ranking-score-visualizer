import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  @Input() post: any;
  @Output() updatePosts = new EventEmitter<boolean>();

  emojis = [
    {id: 1, name: 'smile', icon: '😀'},
    {id: 2, name: 'laugh', icon: '😂'},
    {id: 3, name: 'heart', icon: '❤️'},
    {id: 4, name: 'star', icon: '⭐'},
    {id: 5, name: 'rocket', icon: '🚀'},
    {id: 6, name: 'tada', icon: '🎉'},
  ]

  constructor() {
    
  }

  ngOnInit() {
  }

  add100Reaction(reactionName: string){
    const reaction = this.emojis.find(emoji => emoji.name === reactionName);
    if (reaction){
      this.post.reaction_count[reaction.name] = this.post.reaction_count[reaction.name] || 0;
      this.post.reaction_count[reaction.name] += 100;
      this.updatePosts.emit(true);
    }
    else {
      console.log('reaction not found');
    }
  }

  addReaction(reactionName: string) {
    const reaction = this.emojis.find(emoji => emoji.name === reactionName);
    if (reaction){
      this.post.reaction_count[reaction.name] = this.post.reaction_count[reaction.name] || 0;
      this.post.reaction_count[reaction.name] += 1;
      this.updatePosts.emit(true);
    }
    else {
      console.log('reaction not found');
    }
  }

  reduceReaction(reactionName: string) {
    const reaction = this.emojis.find(emoji => emoji.name === reactionName);
    if (reaction){
      this.post.reaction_count[reaction.name] = this.post.reaction_count[reaction.name] || 0;
      if (this.post.reaction_count[reaction.name] > 0)
      {
        this.post.reaction_count[reaction.name] -= 1;
        this.updatePosts.emit(true);
      }
    }
    else {
      console.log('reaction not found');
    }
  }

  addADayToDate() { 
    if (this.date1IsEarlierThanDate2(this.post.date, new Date())) {
      const date = new Date(this.post.date);
      date.setDate(this.post.date.getDate() + 1);
      date.setHours(this.post.date.getHours());
      date.setMinutes(this.post.date.getMinutes());
      date.setSeconds(this.post.date.getSeconds());
      this.post.date = date;
      this.updatePosts.emit(true);
    }
  }

  reduceADayFromDate() {
    const date = new Date(this.post.date);
      date.setDate(this.post.date.getDate() - 1);
      date.setHours(this.post.date.getHours());
      date.setMinutes(this.post.date.getMinutes());
      date.setSeconds(this.post.date.getSeconds());
      this.post.date = date;
    this.updatePosts.emit(true);
  }

  date1IsEarlierThanDate2(date1: Date, date2: Date) : boolean {
    const day1 = date1.getDate();
    const month1 = date1.getMonth();
    const year1 = date1.getFullYear();
    
    const day2 = date2.getDate();
    const month2 = date2.getMonth();
    const year2 = date2.getFullYear();
    
    if (year1 === year2 && month1 === month2 && day1 === day2) {
      return false;
    } else if (year1 < year2 || (year1 === year2 && month1 < month2) || (year1 === year2 && month1 === month2 && day1 < day2)) {
      return true;
    } else {
      return false;
    }
  }
}
