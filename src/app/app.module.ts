import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AppComponent } from './app.component';
import { PostComponent } from './components/post/post.component';
import { NgJsonEditorModule } from 'ang-jsoneditor';
@NgModule({
  declarations: [
     AppComponent,
     PostComponent
   ],
   imports: [
    BrowserModule,
    EditorModule
   ],
   providers: [],
   bootstrap: [AppComponent]
 })
 export class AppModule { }