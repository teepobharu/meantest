import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { PageEvent } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.

  posts: Post[] = [];
  postsPerPage = 2;
  totalPosts = 0;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  isLoading = false;
  userIsAuthenticated = false;
  userId: string;
  private postsSub: Subscription;
  private authStatusSub: Subscription;


  constructor(
    public postsService: PostsService,
    private authService: AuthService) {

  }
  ngOnInit() {
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((postsData: { posts: Post[], postCount: number }) => {
        this.isLoading = false;
        this.posts = postsData.posts;
        this.totalPosts = postsData.postCount;
        // console.log(JSON.stringify(this.posts))
      });
    // Use to fetch when first visit
    this.userIsAuthenticated = this.authService.getIsAuth();
    //Not run after the list have been created : Not fetch new info here just push new info
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }
  onChangePage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
  onDelete(postID: string) {
    this.isLoading = true;
    this.postsService.deletePost(postID).subscribe(() => { //re fetch post
      this.postsService.getPosts(this.postsPerPage, this.currentPage);

    });

  }
  //posts = [
  // { title: 'First Post', content: "This is first post" },
  // { title: 'Second Post', content: "This is first post" },
  // { title: 'Third Post', content: "This is first post" }
  //]
}
