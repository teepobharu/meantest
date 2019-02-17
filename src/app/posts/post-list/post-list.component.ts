import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.

  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public postsService: PostsService) {

  }
  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
  onDelete(postID: string) {
    this.postsService.deletePost(postID);
  }
  //posts = [
  // { title: 'First Post', content: "This is first post" },
  // { title: 'Second Post', content: "This is first post" },
  // { title: 'Third Post', content: "This is first post" }
  //]
}
