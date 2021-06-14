import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAPBOX_API_KEY, NgxMapboxGLModule } from 'ngx-mapbox-gl';

export interface IMapModuleConfig {
  mapboxToken: string;
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxMapboxGLModule
  ]
})

export class MapModule {
  static forRoot(config: IMapModuleConfig): ModuleWithProviders<MapModule> {
    return {
      ngModule: MapModule,
      providers: [
        {
          provide: MAPBOX_API_KEY,
          useValue: config.mapboxToken,
        }
      ]
    }
  }
}
