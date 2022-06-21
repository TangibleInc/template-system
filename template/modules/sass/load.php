<?php

if ( ! class_exists( 'Tangible\ScssPhp\Version', false ) ) {

  // Based on: https://github.com/leafo/scssphp
  include __DIR__ . '/scssphp/Base/Range.php';
  include __DIR__ . '/scssphp/Block.php';
  include __DIR__ . '/scssphp/Colors.php';
  include __DIR__ . '/scssphp/Compiler.php';
  include __DIR__ . '/scssphp/Compiler/Environment.php';
  include __DIR__ . '/scssphp/Exception/CompilerException.php';
  include __DIR__ . '/scssphp/Exception/ParserException.php';
  include __DIR__ . '/scssphp/Exception/RangeException.php';
  include __DIR__ . '/scssphp/Exception/ServerException.php';
  include __DIR__ . '/scssphp/Formatter.php';
  include __DIR__ . '/scssphp/Formatter/Compact.php';
  include __DIR__ . '/scssphp/Formatter/Compressed.php';
  include __DIR__ . '/scssphp/Formatter/Crunched.php';
  include __DIR__ . '/scssphp/Formatter/Debug.php';
  include __DIR__ . '/scssphp/Formatter/Expanded.php';
  include __DIR__ . '/scssphp/Formatter/Nested.php';
  include __DIR__ . '/scssphp/Formatter/OutputBlock.php';
  include __DIR__ . '/scssphp/Node.php';
  include __DIR__ . '/scssphp/Node/Number.php';
  include __DIR__ . '/scssphp/Parser.php';
  include __DIR__ . '/scssphp/SourceMap/Base64.php';
  include __DIR__ . '/scssphp/SourceMap/Base64VLQ.php';
  include __DIR__ . '/scssphp/SourceMap/SourceMapGenerator.php';
  include __DIR__ . '/scssphp/Type.php';
  include __DIR__ . '/scssphp/Util.php';
  include __DIR__ . '/scssphp/Version.php';
}

if ( ! class_exists( 'Sabberworm\CSS\Parser', false ) ) {

  // https://github.com/sabberworm/PHP-CSS-Parser
  include __DIR__ . '/php-css-parser/Renderable.php';
  include __DIR__ . '/php-css-parser/Settings.php';
  include __DIR__ . '/php-css-parser/OutputFormat.php';
  include __DIR__ . '/php-css-parser/Parser.php';
  include __DIR__ . '/php-css-parser/Value/Value.php';
  include __DIR__ . '/php-css-parser/Value/PrimitiveValue.php';
  include __DIR__ . '/php-css-parser/Value/URL.php';
  include __DIR__ . '/php-css-parser/Value/ValueList.php';
  include __DIR__ . '/php-css-parser/Value/CSSFunction.php';
  include __DIR__ . '/php-css-parser/Value/CalcFunction.php';
  include __DIR__ . '/php-css-parser/Value/RuleValueList.php';
  include __DIR__ . '/php-css-parser/Value/CalcRuleValueList.php';
  include __DIR__ . '/php-css-parser/Value/CSSString.php';
  include __DIR__ . '/php-css-parser/Value/LineName.php';
  include __DIR__ . '/php-css-parser/Value/Color.php';
  include __DIR__ . '/php-css-parser/Value/Size.php';
  include __DIR__ . '/php-css-parser/Comment/Commentable.php';
  include __DIR__ . '/php-css-parser/Comment/Comment.php';
  include __DIR__ . '/php-css-parser/Rule/Rule.php';
  include __DIR__ . '/php-css-parser/Property/Selector.php';
  include __DIR__ . '/php-css-parser/Property/AtRule.php';
  include __DIR__ . '/php-css-parser/Property/Charset.php';
  include __DIR__ . '/php-css-parser/Property/CSSNamespace.php';
  include __DIR__ . '/php-css-parser/Property/Import.php';
  include __DIR__ . '/php-css-parser/RuleSet/RuleSet.php';
  include __DIR__ . '/php-css-parser/RuleSet/AtRuleSet.php';
  include __DIR__ . '/php-css-parser/RuleSet/DeclarationBlock.php';
  include __DIR__ . '/php-css-parser/CSSList/CSSList.php';
  include __DIR__ . '/php-css-parser/CSSList/KeyFrame.php';
  include __DIR__ . '/php-css-parser/CSSList/CSSBlockList.php';
  include __DIR__ . '/php-css-parser/CSSList/AtRuleBlockList.php';
  include __DIR__ . '/php-css-parser/CSSList/Document.php';
  include __DIR__ . '/php-css-parser/Parsing/ParserState.php';
  include __DIR__ . '/php-css-parser/Parsing/SourceException.php';
  include __DIR__ . '/php-css-parser/Parsing/OutputException.php';
  include __DIR__ . '/php-css-parser/Parsing/UnexpectedTokenException.php';
}

if ( ! class_exists( 'Padaliyajay\PHPAutoprefixer\Autoprefixer', false ) ) {

  // https://github.com/padaliyajay/php-autoprefixer
  include __DIR__ . '/php-autoprefixer/Autoprefixer.php';

  include __DIR__ . '/php-autoprefixer/Vendor.php';
  include __DIR__ . '/php-autoprefixer/Vendor/Vendor.php';
  include __DIR__ . '/php-autoprefixer/Vendor/IE.php';
  include __DIR__ . '/php-autoprefixer/Vendor/Mozilla.php';
  include __DIR__ . '/php-autoprefixer/Vendor/Webkit.php';

  include __DIR__ . '/php-autoprefixer/Parse/Property.php';
  include __DIR__ . '/php-autoprefixer/Parse/Rule.php';
  include __DIR__ . '/php-autoprefixer/Parse/Selector.php';
  include __DIR__ . '/php-autoprefixer/Compile/AtRule.php';
  include __DIR__ . '/php-autoprefixer/Compile/RuleSet.php';
  include __DIR__ . '/php-autoprefixer/Compile/DeclarationBlock.php';
}
