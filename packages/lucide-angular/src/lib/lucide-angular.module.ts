import { LUCIDE_ICONS, LucideIconProvider } from './lucide-icon.provider';
import { ModuleWithProviders, NgModule, Optional } from '@angular/core';

import { Icons } from './icons.provider';
import { LucideAngularComponent } from './lucide-angular.component';
import { LucideIcons } from '../icons/types';

const legacyIconProviderFactory = (icons?: LucideIcons) => {
  return new LucideIconProvider(icons ?? {});
};

@NgModule({
  declarations: [LucideAngularComponent],
  imports: [],
  exports: [LucideAngularComponent],
})
export class LucideAngularModule {
  static pick(icons: LucideIcons): ModuleWithProviders<LucideAngularModule> {
    return {
      ngModule: LucideAngularModule,
      providers: [
        { provide: LUCIDE_ICONS, multi: true, useValue: new LucideIconProvider(icons) },
        {
          provide: LUCIDE_ICONS,
          multi: true,
          useFactory: legacyIconProviderFactory,
          deps: [[new Optional(), Icons]],
        },
      ],
    };
  }
}
