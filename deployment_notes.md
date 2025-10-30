# Deploy an entire directory

The following `.cpanel.yml` file copies the `images` directory and all of its contents to the `example` account's `public_html` directory:

```yaml
---
deployment:
  tasks:
    - export DEPLOYPATH=/home/example/public_html/
    - /bin/cp -R images $DEPLOYPATH
```

*   Line 1 is the beginning of a YAML file.
*   Lines 2 and 3 add the `deployment` and `tasks` keys, respectively.
*   Lines 4 and 5 specify an array of BASH commands to run during deployment. You can add as many commands to this array as you wish.

**Note:**
To add comments to this file, add a line that begins with the hash character (`#`).
