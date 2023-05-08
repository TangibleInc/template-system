<?php
namespace Tests\Template\Tags;

/**
 * Data tags: Map/Key, List/Item
 */
class Data_Tags extends \WP_UnitTestCase {

  function test_data_tags() {

    $html = tangible_template();

    // String

    $string_list = "<List><Item>1</Item><Item>2</Item></List>";
    $string_list_value = ["1", "2"];

    $this->assertEquals(
      json_encode($string_list_value),
      $html->render($string_list)
    );

    // Number

    $number_list_items = "<Item type=number>1</Item><Item type=number>2</Item>";
    $number_list = "<List>{$number_list_items}</List>";
    $number_list_value = [1, 2];

    $this->assertEquals(
      json_encode($number_list_value),
      $html->render($number_list)
    );

    // Boolean

    $boolean_list = "<List><Item type=boolean>true</Item><Item type=boolean>false</Item></List>";
    $boolean_list_value = [true, false];

    $this->assertEquals(
      json_encode($boolean_list_value),
      $html->render($boolean_list)
    );

    // Wrapped item

    $this->assertEquals(
      json_encode([
        $string_list_value
      ]),
      $html->render("<List><Item>{$string_list}</Item></List>")
    );

    // Nested list

    $this->assertEquals(
      json_encode([
        $string_list_value,
        $number_list_value,
        $boolean_list_value
      ]),
      $html->render("<List>{$string_list}{$number_list}{$boolean_list}</List>")
    );

    // Nested list with mix of wrapped and non-wrapped items

    $nested_list = "<List><Item>{$string_list}</Item>{$number_list}<Item>{$boolean_list}</Item></List>";
    $nested_list_value = [
      $string_list_value,
      $number_list_value,
      $boolean_list_value
    ];

    $this->assertEquals(
      json_encode($nested_list_value),
      $html->render($nested_list)
    );

    // Mixed values

    $this->assertEquals(
      json_encode([
        "1" => "one",
        "2" => 2,
        "3" => true,
        "4" => false,
        "string_list" => $string_list_value,
        'number_list' => $number_list_value,
        'nested_list' => $nested_list_value,
      ]),
      $html->render("<Map><Key 1>one</Key><Key 2 type=number>2</Key><Key 3 type=boolean>true</Key><Key 4 type=boolean>false</Key><Key string_list>{$string_list}</Key><List number_list>{$number_list_items}</List><Key nested_list>{$nested_list}</Key></Map>")
    );

  }

}
