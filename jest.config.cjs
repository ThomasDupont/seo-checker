/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {},
  extensionsToTreatAsEsm: ['.ts'],
  transformIgnorePatterns: [ // Ajouter cette ligne
    "node_modules/(?!@yourproject)" // Excluez node_modules sauf spécifique
  ]
};
