import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostService } from '../services/post.service';
import { ModalDeleteComponent } from './modal-delete.component';

describe('ModalDeleteComponent', () => {
  let component: ModalDeleteComponent;
  let fixture: ComponentFixture<ModalDeleteComponent>;
  // let dh: DOMHelper

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDeleteComponent ],
      providers: [
        { provide: PostService, useClass: PostServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class PostServiceStub {

}
