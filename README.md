https://www.youtube.com/watch?v=jMNzE_QCrd8

# NodeJS, TypsScript y MongoDB
`npm init -y`

Express: Framework web para Node.js que facilita la creación de aplicaciones web y APIs.

Morgan:  Captura y análisis de solicitudes y respuestas HTTP. Muestra logs de la solicitudes por consola.

Dotenv: Manejar variables de entorno.

`npm i express morgan dotenv`

Typescript: Tipado estático, para el desarrollo de aplicaciones Node.js.

Ts-node-dev: Mantener el servidor corriendo mientras hacemos cambios. Hot Reload.

Tsconfig-path: Para que Node.js respete los alias que construimos.

`npm i -D typescript @types/express @types/morgan ts-node-dev tsconfig-paths`

## Inicializar TypeScript
`tsc --init`

Configuración tsconfig.json
```
{
  "compilerOptions": {
    "target": "ES2021",
    "outDir": "./dist", // Carpeta de salida
    "rootDir": "./src", // Carpeta raíz de código fuente
    "strict": true,
    "esModuleInterop": true,
    "moduleResolution": "node",
    "module": "CommonJS",
    "baseUrl": "./src", // Base para los alias
    "paths": {
      "@controllers/*": ["controllers/*"],
      "@services/*": ["services/*"],
      "@repositories/*": ["repositories/*"],
      "@models/*": ["models/*"],
      "@routes/*": ["routes/*"],
      "@server/*": ["server/*"],
      "@config/*": ["config/*"]
    },
    "typeRoots": ["@types", "./node_modules/@types"]
  },
  "include": ["src"],
  "exclude": ["node_modules"],
  "ts-node": {
    "require": ["tsconfig-paths/register"]
  }
}
```

## Correr API
Configurar package.json
```
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only -r tsconfig-paths/register src/app.ts"
}
```

`npm run dev`

## Despliegue

### Configurar tsconfig.json
```
"compilerOptions": {
  "target": "ES2021",
  "module": "CommonJS",
}
```

### Configurar package.json
Sin alias configurados en tsconfig.json
```
"main": "dist/app.js",
"scripts": {
  ...,
  "build": "tsc",
  "start": "node ./dist/app.js"
}
```

Con alias configurados: Producción
- `npm i module-alias`

- Agregar propiedad a package.json
```
"_moduleAliases": {
  "@server": "dist/server",
  "@config": "dist/config",
  "@controllers": "dist/controllers",
  "@services": "dist/services",
  "@repositories": "dist/repositories",
  "@models": "dist/models",
  "@routes": "dist/routes",
  "@middlewares": "dist/middlewares"
}
```

- Agregar dependencia en app.ts  
`import "module-alias/register";`



