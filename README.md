&lt;attr-helpers&gt;
====

Install
----

Polyfill tags if you need them. This will include ShadowDOM and Custom Elements support.

```
<script src="https://unpkg.com/@webcomponents/webcomponentsjs@latest/webcomponents-sd-ce.js"></script>
```

Loading this component. It would be a good idea to use a specific version instead of `latest`.

```
<script src="https://unpkg.com/attr-helpers@latest/dist/attr-helpers.min.js"></script>
```

Usage
----

```
  <attr-helpers one="Some value"></attr-helpers>

  <attr-helpers two="Some value"></attr-helpers>

  <attr-helpers three="Some value"></attr-helpers>

  <attr-helpers four="Some value"></attr-helpers>

  <attr-helpers five="Some value"></attr-helpers>

  <attr-helpers>Slot content</attr-helpers>
```

License
----

AttrHelpers is released under an MIT license.

Built, tested, and published with [Nutmeg](https://nutmeg.tools).
