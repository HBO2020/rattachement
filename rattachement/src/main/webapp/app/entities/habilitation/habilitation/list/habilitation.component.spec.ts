import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { HabilitationService } from '../service/habilitation.service';

import { HabilitationComponent } from './habilitation.component';

describe('Habilitation Management Component', () => {
  let comp: HabilitationComponent;
  let fixture: ComponentFixture<HabilitationComponent>;
  let service: HabilitationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HabilitationComponent],
    })
      .overrideTemplate(HabilitationComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(HabilitationComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(HabilitationService);

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
    expect(comp.habilitations?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
