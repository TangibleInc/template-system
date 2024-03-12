<?php
/**
 * HTML module 
 */

require_once __DIR__.'/Elements.php';
require_once __DIR__.'/Entities.php';
require_once __DIR__.'/Exception.php';
require_once __DIR__.'/InstructionProcessor.php';

// Parser

require_once __DIR__.'/parser/CharacterReference.php';
require_once __DIR__.'/parser/DOMTreeBuilder.php';
require_once __DIR__.'/parser/EventHandler.php';
require_once __DIR__.'/parser/FileInputStream.php';
require_once __DIR__.'/parser/InputStream.php';
require_once __DIR__.'/parser/ParseError.php';
require_once __DIR__.'/parser/Scanner.php';
require_once __DIR__.'/parser/StringInputStream.php';
require_once __DIR__.'/parser/Tokenizer.php';
require_once __DIR__.'/parser/TreeBuildingRules.php';
require_once __DIR__.'/parser/UTF8Utils.php';

// Serializer

require_once __DIR__.'/serializer/OutputRules.php';
require_once __DIR__.'/serializer/RulesInterface.php';
require_once __DIR__.'/serializer/Traverser.php';

require_once __DIR__.'/HTML.php';
