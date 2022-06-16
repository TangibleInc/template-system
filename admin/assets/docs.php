<?php

/**
 * Documentation - For template edit screen's "asset" tab (see ./fields.php),
 * and also for reuse in documentation site.
 */
$plugin->render_assets_documentation = function() use ($plugin) {
  ?>
  <h3>Asset name</h3>

  <p>When editing the asset name, please ensure that it is:
  <ul style="list-style-type: disc; margin-left: 2rem">
    <li>Unique in the list of assets</li>
    <li>Includes only alphabet letters, numbers, dash <code>-</code> or underscore <code>_</code></li>
  </ul>
  </p>
  <p>This is needed to use the asset name for a template variable.</p>

  <hr>

  <h3>Use assets from template</h3>

  <p>Assets attached to a template are available as the variable type <code>asset</code>.</p>

  <p>From inside the template, use the <code>Get</code> tag and <code>asset</code> attribute to get asset data.</p>

  <p><pre><code>&lt;Get asset=example field=url /&gt;</code></pre></p>

  <p>The <code>asset</code> attribute is the asset name.</p>

  <p>The optional attribute <code>field</code> is the attachment field to get.</p>

  <p><ul style="margin-left: 1rem">
    <li>id - Attachment ID (default)</li>
    <li>url - URL</li>
    <li>name - Name</li>
    <li>title - Title</li>
    <li>filename - File name</li>
    <li>mime - MIME Type</li>
    <li>alt - Alternative text</li>
    <li>description - Description</li>
    <li>caption - Caption</li>
  </ul></p>

  <p>See <a href="https://loop.tangible.one/tags/loop/attachment" target="_blank">the documentation of the Attachment Loop</a> for more.</p>

  <h4>Attachment loop</h4>

  <p>For some purposes, it might be helpful to create an attachment loop from an asset.</p>

  <p><pre><code>&lt;Loop type=attachment id="{Get asset=example}"&gt;
  &lt;Field title /&gt;
&lt;/Loop&gt;
</code></pre></p>

  <hr>

  <h3>Use assets from stylesheet</h3>

  <p>Each asset is available as a Sass variable, with prefix <code>asset_</code> followed by the asset name.</p>

  <p>If the name is "example", it can be accessed as <code>$asset_example</code>.</p>
  <p>It is a map, so you can use <code>map-get()</code> to get an asset field.</p>

  <p><pre><code>map-get( $asset_example, "url" )</code></pre></p>

  <hr>

  <h3>Use assets from script</h3>

  <p>Each asset is available as a JavaScript variable, with prefix <code>asset_</code> followed by the asset name.</p>

  <p>If the name contains a dash <code>-</code>, it will be replaced with underscore <code>_</code>.</p>

  <p>It is an object, so you can use <code>.</code> to get an asset field.</p>

  <p><pre><code>asset_example.url</code></pre></p>

  <?php
};
