import { Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';

/**
 * Translate columns label for view presentation
 */
export function useTranslatedColumns<T extends { title: string }>(
  columns: T[]
) {
  return (injector?: Injector | null) => {
    if (injector) {
      const translate = injector.get(TranslateService);
      return translate
        ? translate.get(columns.map((column) => column.title)).pipe(
            map((values) => {
              return columns.map((column) => ({
                ...column,
                title: values[column.title] ?? column.title,
              }));
            })
          )
        : columns;
    }
    return columns;
  };
}
