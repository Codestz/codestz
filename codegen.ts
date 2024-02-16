import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://api.8base.com/clsnznmms000g0aju7a3fag2u',
  generates: {
    'libs/core/src/definitions/graphql.types.ts': {
      plugins: ['typescript'],
      config: {
        skipTypename: true,
      },
    },
    'schema.graphql': {
      plugins: ['schema-ast'],
    },
  },
};

export default config;
