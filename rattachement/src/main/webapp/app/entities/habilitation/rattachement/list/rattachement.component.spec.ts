import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { RattachementService } from '../service/rattachement.service';

import { RattachementComponent } from './rattachement.component';

describe('Rattachement Management Component', () => {
  let comp: RattachementComponent;
  let fixture: ComponentFixture<RattachementComponent>;
  let service: RattachementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RattachementComponent],
    })
      .overrideTemplate(RattachementComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RattachementComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(RattachementService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.rattachements?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
