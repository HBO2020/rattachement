import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { FonctionService } from '../service/fonction.service';

import { FonctionComponent } from './fonction.component';

describe('Fonction Management Component', () => {
  let comp: FonctionComponent;
  let fixture: ComponentFixture<FonctionComponent>;
  let service: FonctionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [FonctionComponent],
    })
      .overrideTemplate(FonctionComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FonctionComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(FonctionService);

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
    expect(comp.fonctions?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
