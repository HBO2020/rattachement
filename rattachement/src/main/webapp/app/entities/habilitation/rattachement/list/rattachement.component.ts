import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRattachement } from '../rattachement.model';
import { RattachementService } from '../service/rattachement.service';
import { RattachementDeleteDialogComponent } from '../delete/rattachement-delete-dialog.component';

@Component({
  selector: 'jhi-rattachement',
  templateUrl: './rattachement.component.html',
})
export class RattachementComponent implements OnInit {
  rattachements?: IRattachement[];
  isLoading = false;

  constructor(protected rattachementService: RattachementService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.rattachementService.query().subscribe({
      next: (res: HttpResponse<IRattachement[]>) => {
        this.isLoading = false;
        this.rattachements = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IRattachement): number {
    return item.id!;
  }

  delete(rattachement: IRattachement): void {
    const modalRef = this.modalService.open(RattachementDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.rattachement = rattachement;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
