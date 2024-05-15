import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { UtilityService } from "./utility.service"
import { Client } from "../interfaces/client.interface";

export const clientResolver: ResolveFn<Object> = (route, state) => {
    const clientId = route.paramMap.get('id');
    return inject(UtilityService).getData<Client>(`clients/${clientId}`)
}