import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/storage';
import { ReactiveFormsModule } from '@angular/forms';
import { PostService } from '../services/post.service';

import { AddComponent } from './add.component';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;
  let angularFireStorageMock: any;

  beforeEach(async(() => {
    angularFireStorageMock = jasmine.createSpyObj('AngularFireStorage', ['storage']);

    TestBed.configureTestingModule({
      declarations: [ AddComponent ],
      imports: [ ReactiveFormsModule, AngularFireStorageModule ],
      providers: [
        { provide: AngularFireStorage, useValue: angularFireStorageMock },
        { provide: PostService, useValue: PostServiceStub }
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class PostServiceStub {}
