import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const compat = new FlatCompat({ baseDirectory: __dirname, })

const eslintConfig = [
  ...compat.config({
    extends: [ 'next/core-web-vitals', 'next/typescript' ],
    rules: {  
      "@typescript-eslint/no-require-imports": 'off',
      '@next/next/no-page-custom-font': 'off',
      'no-unused-vars': 'error',
      "comma-dangle": 'off',
      "no-console": 'warn',
      "semi": [ "error", "never" ],

      "indent": [ "error", 2 ],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "key-spacing": [ "error", { "afterColon": true } ],
      "object-curly-spacing": [ "error", "always" ],
      "array-bracket-spacing": [ "error", "always" ],
    },
  }),
]

export default eslintConfig