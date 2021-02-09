import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss']
})
export class ModalDeleteComponent implements OnInit {
  @Input() id: string;
  @Input() imageUrl: string;
  @Output() close = new EventEmitter<void>();

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  delete(): void {
    this.postService.deletePost(this.id, this.imageUrl);
    this.onClose();
  }

  onClose(): void {
    this.close.emit();
  }
}
