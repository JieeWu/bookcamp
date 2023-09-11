【專案需要下載套件】
npm i
(初期建檔需要)
npx create-next-app@latest  
選擇NYNNNN

<!-- ------------------------------------------------------ -->

老師檔案-額外下載
npm install -D eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y prettier eslint-plugin-prettier eslint-config-prettier eslint-import-resolver-alias eslint-plugin-import react-icons firebase
購物車-額外下載
npm i bootstrap axios react-bootstrap sweetalert2

<!-- ------------------------------------------------------ -->

VScode需要下載
Babel JavaScript
ESLint
Prettier - Code formatter
Chinese (Traditional) Language Pack
styled-jsx
ES7+ React/Redux/React-Native snippets(⽤片段縮寫快速建立程式碼樣版，對照表)

<!-- ------------------------------------------------------ -->

自行建檔
.vscode ---> 針對VScode setting做設定
檔案名稱：settings.json
{
"workbench.colorCustomizations": {
"activityBar.background": "#332C2D",
"titleBar.activeBackground": "#483D3F",
"titleBar.activeForeground": "#FBFAFA"
},
"editor.defaultFormatter": "esbenp.prettier-vscode",
"prettier.configPath": ".prettierrc.json",
"editor.formatOnSave": false,
"editor.codeActionsOnSave": [
"source.formatDocument",
"source.fixAll.eslint"
]
}

↓
檔案名稱：.prettierrc.json
{
"singleQuote": true,
"semi": false,
"endOfLine": "auto",
"jsxSingleQuote": true
}

<!-- ------------------------------------------------------ -->
