import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFonction } from '../fonction.model';
import { FonctionService } from '../service/fonction.service';
import { FonctionDeleteDialogComponent } from '../delete/fonction-delete-dialog.component';

@Component({
  selector: 'jhi-fonction',
  templateUrl: './fonction.component.html',
})
export class FonctionComponent implements OnInit {
  fonctions?: IFonction[];
  isLoading = false;

  constructor(protected fonctionService: FonctionService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.fonctionService.query().subscribe({
      next: (res: HttpResponse<IFonction[]>) => {
        this.isLoading = false;
        this.fonctions = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IFonction): number {
    return item.id!;
  }

  delete(fonction: IFonction): void {
    const modalRef = this.modalService.open(FonctionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.fonction = fonction;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
