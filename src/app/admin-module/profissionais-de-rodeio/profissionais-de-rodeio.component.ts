import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { concatMap, finalize, forkJoin, from, map, Observable, of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { AbstractBaseComponent } from 'src/app/abstract-base/abstract-base.component';
import { ISaveChanges } from 'src/app/shared/interfaces/iSave-changes.interface';
import { RowInfo } from 'src/app/shared/interfaces/rowInfo.interface';
import { DialogComponent } from 'src/app/shared/modals/dialog/dialog.component';
import { PageInfo } from 'src/app/shared/pagination/interfaces/page-info.interface';
import { IPagination } from 'src/app/shared/pagination/pagination.component';
import { SearchFilter } from 'src/app/shared/search/models/search-filter.model';
import { ISearch } from 'src/app/shared/search/search.component';
import { ToastService } from 'src/app/shared/toasts/services/toast.service';

import { ProfissionaisDeRodeioAdminDataService } from './data/profissionais-de-rodeio-admin-data.service';
import { AdminProfissionalDeRodeio } from './models/admin-profissional-de-rodeio.model copy';
import { ProfissionalAdminFilter } from './models/profissional-de-rodeio-admin-filter';

@Component({
  selector: 'app-profissionais-de-rodeio',
  templateUrl: './profissionais-de-rodeio.component.html',
  styleUrls: ['./profissionais-de-rodeio.component.css'],
})
export class ProfissionaisDeRodeioComponent
  extends AbstractBaseComponent
  implements OnInit, IPagination, ISaveChanges, ISearch
{
  private pageChanged = new Subject<PageInfo>();

  public profissionaisDeRodeio: Array<AdminProfissionalDeRodeio>;
  public searchFilter: SearchFilter;
  public totalPerPage = 10;
  public rowChanges = new Array<RowInfo>();
  public totalDeProfissionais = 0;
  public newProfissional = new AdminProfissionalDeRodeio();
  public isLoading: boolean = true;
  public isUserPaging: boolean = false;

  constructor(
    private modalService: NgbModal,
    private profissionalSettingsData: ProfissionaisDeRodeioAdminDataService,
    private toastService: ToastService
  ) {
    super();
  }

  ngOnInit() {
    const filter = new ProfissionalAdminFilter();

    if (this.searchFilter) {
      filter.currentPage = 1;
    }

    this.profissionalSettingsData
      .getTotalAdmin(filter)
      .pipe(
        concatMap((totalDeProfissionais) => {
          filter.totalPerPage = this.totalPerPage;

          return this.profissionalSettingsData.getPageAdmin(filter).pipe(
            map((profissionaisDeRodeio) => ({
              totalDeProfissionais,
              profissionaisDeRodeio,
            }))
          );
        }),
        takeUntil(this.destroy),
        finalize(() => (this.isLoading = false))
      )
      .subscribe((x) => {
        this.profissionaisDeRodeio = x.profissionaisDeRodeio;
        this.profissionaisDeRodeio = x.profissionaisDeRodeio;

        this.isLoading = false;
      });

    this.paging();
  }

  private paging(): void {
    // Paging
    this.pageChanged
      .pipe(
        switchMap((pageInfo) => {
          this.isLoading = true;
          this.isUserPaging = true;

          if (this.areThereUnsavedChanges()) {
            return from(
              this.modalService.open(DialogComponent, { centered: true }).result
            ).pipe(
              concatMap((isYes) => {
                if (isYes === true) {
                  return this.saveChanges().pipe(
                    map((m) => ({
                      changesSaved: !m.includes(false),
                      ...pageInfo,
                    }))
                  );
                } else {
                  return of({ changesSaved: true, ...pageInfo });
                }
              })
            );
          } else {
            return of({ changesSaved: true, ...pageInfo });
          }
        }),
        concatMap((item) => {
          if (item) {
            const filter = new ProfissionalAdminFilter();

            if (this.searchFilter) {
              filter.searchText = this.searchFilter.searchText;
              filter.startedOn = this.searchFilter.fromDate;
              filter.endedOn = this.searchFilter.toDate;
            }

            return this.profissionalSettingsData.getTotalAdmin(filter).pipe(
              concatMap((totalResults) => {
                filter.totalPerPage = item.totalPerPage;
                filter.currentPage = item.pageNumber;

                return this.profissionalSettingsData.getPageAdmin(filter).pipe(
                  map((profissionaisDeRodeio) => ({
                    totalResults,
                    profissionaisDeRodeio,
                    totalPerPage: item.totalPerPage,
                    changesSaved: item.changesSaved,
                  }))
                );
              })
            );
          } else {
            return of({
              totalResults: 0,
              profissionaisDeRodeio: Array<AdminProfissionalDeRodeio>(),
              totalPerPage: this.totalPerPage,
              changesSaved: true,
            });
          }
        }),
        takeUntil(this.destroy),
        finalize(() => {
          this.isLoading = false;
          this.isUserPaging = false;
        })
      )
      .subscribe((items) => {
        if (items) {
          this.totalDeProfissionais = items.totalResults;
          this.profissionaisDeRodeio = items.profissionaisDeRodeio;
          this.totalPerPage = items.totalPerPage;

          if (items.changesSaved) {
            // Clear changes on No
            this.rowChanges = new Array<RowInfo>();
          }
        }

        this.isLoading = false;
        this.isUserPaging = false;
      });
  }

  public isAddFormValid(): boolean {
    return (
      !!this.newProfissional.contato.cpf &&
      !!this.newProfissional.contato.nome &&
      !!this.newProfissional.contato.sobrenome
    );
  }

  public onAdd(): void {
    // Although isE2G is set to false, the only purpose is to notify the user
    this.newProfissional.criado = new Date();

    this.profissionalSettingsData
      .insert(this.newProfissional)
      .pipe(takeUntil(this.destroy))
      .subscribe((newId) => {
        if (newId) {
          // Set the new Id from the database to the existing videos
          this.newProfissional.id = newId;

          this.totalDeProfissionais++;

          // Push to the top of the list of videos
          this.profissionaisDeRodeio.unshift(this.newProfissional);

          this.toastService.toasts.next({
            httpStatusCode: 200,
            header: 'Successo',
            body: 'Profissional de Rodeio criado.',
            delay: 3000,
          });
        }

        this.newProfissional = new AdminProfissionalDeRodeio();
      });

    // Close modal
    this.modalService.dismissAll();
  }

  public onSearch(searchFilter: SearchFilter): void {
    if (searchFilter) {
      this.searchFilter = searchFilter;

      // Force Pagination to go back to 1, and search for the items
      this.pageChanged.next({ pageNumber: 1, totalPerPage: this.totalPerPage });
    }
  }

  public onPageChange(pageInfo: PageInfo): void {
    this.pageChanged.next(pageInfo);
  }

  public areThereUnsavedChanges(): boolean {
    return this.rowChanges.filter((x) => x.isValid).length > 0;
  }

  public saveChanges(): Observable<boolean[]> {
    // Collect all items that haven't been saved
    return forkJoin(
      this.rowChanges
        .filter((rowChange) => !rowChange.isSaved && rowChange.isValid)
        .map((rowChange) =>
          this.profissionalSettingsData.update(rowChange.row).pipe(
            tap((isSaved) => {
              if (isSaved === true) {
                // Remove from the array
                rowChange.isSaved = true;
                this.onRowChanges(rowChange);
              }
            })
          )
        )
    ).pipe(takeUntil(this.destroy));
  }

  public onRowChanges(change: RowInfo) {
    if (change) {
      if (change.isSaved) {
        this.rowChanges = this.rowChanges.filter(
          (x) => x.row.id !== change.row.id
        );
      } else {
        // If there are not unsaved Ids
        if (!this.rowChanges.some((x) => x.row.id === change.row.id)) {
          this.rowChanges.push(change);
        }
      }
    }
  }

  public onRowRemoved(id: number): void {
    this.profissionaisDeRodeio = this.profissionaisDeRodeio.filter(
      (x) => x.id !== id
    );
    // Reduce the total number of items, until the new data is picked up again
    this.totalDeProfissionais--;
  }

  public openModal(template: TemplateRef<any>) {
    this.modalService.open(template, { centered: true, size: 'xl' });
  }
}
