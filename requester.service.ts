import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { UI_STATE_CONTROLLER } from "../components/ui-action";
import { UIStateController } from "../components/ui-action/ui-state-controller";
import { catchError, tap, throwError } from "rxjs";

export type QueryParamType = {
  _columns: string[];
  _query: any;
};

export type QueryPaginationType = {
  page: number;
  per_page: number;
};

@Injectable({
  providedIn: "root",
})
export class RequesterService {
  private url!: string;
  private pagination: QueryPaginationType = {
    page: 1,
    per_page: 5,
  };

  constructor(
    private httpClient: HttpClient,
    @Inject(UI_STATE_CONTROLLER) private ui_controller: UIStateController
  ) {}

  set_url(url: string) {
    this.url = url;
    return this;
  }

  set_pagination(pagination: QueryPaginationType) {
    this.pagination = pagination;
    return this;
  }

  post(data: any, show_ui_controller: boolean = true, url: string = this.url) {
    if (show_ui_controller) this.ui_controller.startAction();
    return this.httpClient.post(url, data).pipe(
      catchError((err) => {
        if (show_ui_controller) this.ui_controller.endAction();
        return throwError(() => err);
      }),
      tap(() => {
        if (show_ui_controller) this.ui_controller.endAction();
      })
    );
  }
  get(params: any, show_ui_controller: boolean = true, url: string = this.url) {
    if (show_ui_controller) this.ui_controller.startAction();
    return this.httpClient
      .get(url, {
        params: {
          ...params,
          page: this.pagination.page,
          per_page: this.pagination.per_page,
        },
      })
      .pipe(
        catchError((err) => {
          if (show_ui_controller) this.ui_controller.endAction();
          return throwError(() => err);
        }),
        tap(() => {
          if (show_ui_controller) this.ui_controller.endAction();
        })
      );
  }
  put(data: any, show_ui_controller: boolean = true, url: string = this.url) {
    if (show_ui_controller) this.ui_controller.startAction();
    return this.httpClient.put(url, data).pipe(
      catchError((err) => {
        if (show_ui_controller) this.ui_controller.endAction();
        return throwError(() => err);
      }),
      tap(() => {
        if (show_ui_controller) this.ui_controller.endAction();
      })
    );
  }
  delete(show_ui_controller: boolean = true, url: string = this.url) {
    if (show_ui_controller) this.ui_controller.startAction();
    return this.httpClient.delete(url).pipe(
      catchError((err) => {
        if (show_ui_controller) this.ui_controller.endAction();
        return throwError(() => err);
      }),
      tap(() => {
        if (show_ui_controller) this.ui_controller.endAction();
      })
    );
  }
}
