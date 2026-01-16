# Face Recognition App (React + TypeScript + Vite)

Projeto utilizando React + TypeScript com face-api.js para detecção e reconhecimento facial através de imagens e vídeo em tempo real.

Este é um projeto simples, com o intuito de aprender mais sobre reconhecimento facial. Ideias e contribuições serão bem vindas!

# Instalar dependências
npm install

# Rodar em ambiente de desenvolvimento
npm run dev

Aplicação acessível (normalmente) em:
http://localhost:5173/

# Gerar build de produção
npm run build

# Visualizar build
npm run preview



# Estado de desenvolvimento

| Funcionalidade                          | Status             |
| -------------------------------         | ------------------ |
| Detecção facial em imagem               | Implementado       |
| Captura via webcam                      | Implementado       |
| Comparação de descritores               | Implementado       |
| Monitoramento contínuo em vídeo         | Implementado       |
| MVP em prod usando Vercel               | Implementado       |
| Detecção e comparacão múltiplas         | Em breve           |
| Integração com fotos salvas previamente | Em breve           |

# Screenshots

<img width="750" height="574" alt="image1" src="https://github.com/user-attachments/assets/395b8ba5-8265-4f31-93c3-04c6ff62592f" />
<img width="373" height="697" alt="image2" src="https://github.com/user-attachments/assets/3df7001c-c81a-4763-b6dc-f5150a454d4a" />
<img width="373" height="697" alt="image3" src="https://github.com/user-attachments/assets/a7ccef0d-6b72-41ff-9cc8-d5acbbe7b5e7" />


-----


Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
