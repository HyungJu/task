import { Module, ModuleMetadata } from '@nestjs/common';

export type GqlModuleMetadata = ModuleMetadata & {
  resolvers?: any[];
  usecases?: any[];
};

export function GqlModule(metadata: GqlModuleMetadata): ClassDecorator {
  return Module.call(this, {
    imports: metadata.imports,
    controllers: metadata.controllers,
    providers: [
      ...metadata.resolvers,
      ...metadata.usecases,
      ...metadata.providers,
    ],
    exports: metadata.exports,
  });
}
