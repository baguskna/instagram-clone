import { TestBed } from '@angular/core/testing';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageModule, AngularFireStorage } from '@angular/fire/storage';
import { of } from 'rxjs';

import { PostService } from './post.service';
import { Post } from '../interface/Post';

describe('PostService', () => {
  let service: PostService;
  let angularFirestoreMock: any;
  let angularFireStorageMock: any;
  let fsCollectionMock: any;

  beforeEach(() => {
    angularFirestoreMock = jasmine.createSpyObj('AngularFirestore', ['collection']);
    fsCollectionMock = jasmine.createSpyObj('collection', ['snapshotChanges', 'valueChanges']);
    angularFirestoreMock.collection.and.returnValue(fsCollectionMock);
    fsCollectionMock.snapshotChanges.and.returnValue(of([]));

    angularFireStorageMock = jasmine.createSpyObj('AngularFireStorage', ['storage']);

    TestBed.configureTestingModule({
      imports: [
        AngularFireStorageModule,
        AngularFirestoreModule
      ],
      providers: [
        { provide: AngularFirestore, useValue: angularFirestoreMock },
        { provide: AngularFireStorage, useValue: angularFireStorageMock }
      ]
    });
    service = TestBed.inject(PostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPost call', () => {
    beforeEach(() => {
      service.getPosts();
    });

    it('should call collection 1 time on AngularFirestore service', () => {
      expect(angularFirestoreMock.collection).toHaveBeenCalledTimes(1);
    });

    it('should call snapshotChanges 1 time on AngularFirestore service', () => {
      expect(fsCollectionMock.snapshotChanges).toHaveBeenCalledTimes(1);
    });
  });

  describe('addPost call', () => {
    beforeEach(() => {
      const post: Post = {
        caption: 'string',
        imageUrl: 'string',
        timestamp: 'any',
        owner: 'string',
        ownerPhotoUrl:' string',
        uid: 'string',
        likes: 0
      }
      service.addPost(post);
    });
  });
});
