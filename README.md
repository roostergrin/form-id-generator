# Form ID Generator ... BETA

iterates through a form, replaces any existing IDs, names, etc with sequential

## Instructions

Copy / paste the js to a script tag in head, or

```
<script
  type="text/javascript"
  src="https://cdn.jsdelivr.net/gh/roostergrin/form-id-generator@0.0.1/form-id-generator.js"
></script>
```

To generate a new form html with sequential IDs:

- open your form in a browser
- open the console
- run `generateIDs.run()`

The new file will automatically download to your default location!

## Warnings

1. Sometimes we have scripts at the closing body tag that target elements by ID. Obviously, those will break. Try:

   - refactor to not use specific IDs (these closing scripts are often not DRY anyway)

   - use `data-X` attributes instead of ID

2. The ID generator doesn't yet handle `<select>` elements.
