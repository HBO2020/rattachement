import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IHabilitation } from '../habilitation.model';
import { HabilitationService } from '../service/habilitation.service';
import { HabilitationDeleteDialogComponent } from '../delete/habilitation-delete-dialog.component';

@Component({
  selector: 'jhi-habilitation',
  templateUrl: './habilitation.component.html',
})
export class HabilitationComponent implements OnInit {
  habilitations?: IHabilitation[];
  isLoading = false;

  constructor(protected habilitationService: HabilitationService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.habilitationService.query().subscribe({
      next: (res: HttpResponse<IHabilitation[]>) => {
        this.isLoading = false;
        this.habilitations = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IHabilitation): number {
    return item.id!;
  }

  delete(habilitation: IHabilitation): void {
    const modalRef = this.modalService.open(HabilitationDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.habilitation = habilitation;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
