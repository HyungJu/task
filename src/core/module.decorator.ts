import { Module, ModuleMetadata } from '@nestjs/common';

export type GqlModuleMetadata = ModuleMetadata & {
  resolvers?: any[];
  usecases?: any[];
};

export function GqlModule(
  this: any,
  metadata: GqlModuleMetadata,
): ClassDecorator {
  return Module.call(this, {
    imports: metadata.imports,
    controllers: metadata.controllers,
    providers: [
      // @ts-ignore
      ...metadata.resolvers,
      // @ts-ignore
      ...metadata.usecases,
      // @ts-ignore
      ...metadata.providers,
    ],
    exports: metadata.exports,
  });
}
