import { Component } from '@angular/core';
import { PostService } from './services/post.service';
import * as ace from 'ace-builds';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'getstream-algorithm-custom-ranking-score-visualizer';

  posts : any[];

  constructor(private postService: PostService) {
    this.posts = this.postService.posts;  
  }

  ngOnInit() {
    this.orderPosts();
    
  }

  orderPosts() {
    this.postService.updateScores();
    this.posts.sort((a, b) => this.sortF(b,a));
    console.log('done');
  }

  sortF(ob1:any,ob2:any) {
    if (ob1.score > ob2.score) {
        return 1;
    } else if (ob1.score < ob2.score) { 
        return -1;
    }

    // Else go to the 2nd item
    if (ob1.date < ob2.date) { 
        return -1;
    } else if (ob1.date > ob2.date) {
        return 1
    } else { // nothing to split them
        return 0;
    }
}

ngAfterViewInit() {
  const element = document.getElementById('editor');
  if (element){
    const editor = ace.edit(element);

    editor.setTheme('ace/theme/monokai');
    editor.session.setMode('ace/mode/javascript');


    const objString = JSON.stringify(this.postService.score_function, null, 2);
    editor.session.setValue(objString);

    editor.session.on('change', () => {
      // Get the current value of the editor
      const editorContent = editor.session.getValue();
  
      // Try to parse the content as JSON
      try {
        const parsedObj = JSON.parse(editorContent);
        // If parsing was successful, do something with the object
        this.postService.score_function = parsedObj;
        this.orderPosts();
      } catch (e) {
        // If parsing failed, handle the error (e.g., show a message to the user)
        console.error('The editor content is not valid JSON.');
      }
    });
  }
  
}
}
