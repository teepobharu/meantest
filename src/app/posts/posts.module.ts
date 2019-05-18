import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material.module';

@NgModule({
    declarations: [
        PostCreateComponent,
        PostListComponent,
    ],
    imports: [
        AngularMaterialModule,
        ReactiveFormsModule,
        RouterModule,
        CommonModule
    ]

})

export class PostsModule { }