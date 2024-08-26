import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { UI_STATE_CONTROLLER } from "../components/ui-action";
import { UIStateController } from "../components/ui-action/ui-state-controller";

@Injectable({
  providedIn: "root",
})
export class RequesterService {
  constructor(
    private httpClient: HttpClient,
    @Inject(UI_STATE_CONTROLLER) ui_controller: UIStateController
  ) {}
}
