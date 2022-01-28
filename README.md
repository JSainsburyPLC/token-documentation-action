# token-documentation-action

Action that enumerate secrets, finds Github Tokens and generates documentation using Mustache templates.

Example workflow:

```yaml
- uses: JSainsburyPLC/token-documentation-action@v1
  with:
	secrets: ${{ toJson(secrets) }}
	file-name: TOKENS.md
	template: |
	 # Tokens
	 This document is generated automatically.
	 | Secret Name | User Name | Token Hash |
	 | ----------- | --------- | ---------- |
	 {{#tokenInfo}}
		| {{name}} | [{{user}}](https://documentation.com/machine-users.html#{{user}}) | {{hash}} |
	 {{/tokenInfo}}

	 [//]: # ({{json}})
```
