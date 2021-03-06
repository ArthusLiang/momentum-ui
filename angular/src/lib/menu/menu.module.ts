import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { IconModule } from '../icon/icon.module';
import { ListItemModule } from '../list-item/list-item.module';
import { MenuComponent } from './menu.component';
import { MenuContentComponent } from './menu-content.component';
import { MenuItemComponent } from './menu-item.component';
import { MenuTriggerDirective } from './menu-trigger.directive';


@NgModule({
  imports: [
    CommonModule,
    IconModule,
    ListItemModule,
    OverlayModule,
  ],
  declarations: [
    MenuComponent,
    MenuContentComponent,
    MenuItemComponent,
    MenuTriggerDirective,
  ],
  exports: [
    MenuComponent,
    MenuContentComponent,
    MenuItemComponent,
    MenuTriggerDirective,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MenuModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MenuModule,
      providers: [],
    };
  }
}
